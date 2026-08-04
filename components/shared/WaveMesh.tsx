"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 배경용 애니메이션 데이터 메시.
 *
 * 표현 방식
 * - 촘촘한 격자를 원근 투영하고, 파고(波高)에 따라 밝기를 다르게 준다.
 *   마루는 청록~흰빛으로 빛나고 골은 어둡게 가라앉아 물결의 입체감이 생긴다.
 * - 선분을 밝기 8단계로 버킷팅해 Path2D 8개로 묶어 그린다.
 *   (선분마다 strokeStyle을 바꾸면 느려서, 색이 같은 것끼리 한 번에 stroke)
 * - 합성 모드 lighter로 겹치는 선이 더해지며 자연스러운 발광 효과를 만든다.
 *
 * 성능/접근성
 * - prefers-reduced-motion: 정지된 한 프레임만 렌더, 마우스 반응 없음
 * - 화면 밖이거나 탭이 비활성이면 렌더 루프 중단
 * - devicePixelRatio 2로 제한, 화면 폭에 따라 격자 밀도 축소
 */

const BUCKETS = 8;
const DEPTH = 5; // 원근 강도. 클수록 지평선으로 급격히 수렴

/** globals.css의 디자인 토큰(hex)을 rgb 튜플로 읽어온다. */
function readRgb(varName: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const m = /^#([0-9a-f]{6})$/i.exec(raw);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function WaveMesh({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mesh = readRgb("--color-hero-mesh", [96, 214, 232]);
    const dot = readRgb("--color-hero-dot", [176, 205, 255]);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let cols = 112;
    let rows = 38;
    let raf = 0;
    let onScreen = true;

    // 마우스 시차(視差) — 현재값을 목표값으로 부드럽게 따라가게 한다
    let targetX = 0;
    let targetY = 0;
    let shiftX = 0;
    let shiftY = 0;

    let PX = new Float32Array(0);
    let PY = new Float32Array(0);
    let PH = new Float32Array(0); // 파고
    let PB = new Float32Array(0); // 밝기

    const paths: Path2D[] = [];

    const particles = Array.from({ length: 130 }, () => ({
      x: Math.random() * 2.4 - 1.2,
      h: Math.random() * 1.9 + 0.15,
      z: Math.random(),
      r: Math.random() * 1.5 + 0.35,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.8 + 0.5,
    }));

    // 크게 번지는 보케 입자 - 깊이감을 더한다
    const bokeh = Array.from({ length: 10 }, () => ({
      x: Math.random() * 2.2 - 1.1,
      h: Math.random() * 1.6 + 0.3,
      z: Math.random() * 0.5,
      r: Math.random() * 26 + 14,
      phase: Math.random() * Math.PI * 2,
    }));

    function allocate() {
      const n = rows * cols;
      if (PX.length !== n) {
        PX = new Float32Array(n);
        PY = new Float32Array(n);
        PH = new Float32Array(n);
        PB = new Float32Array(n);
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 좁은 화면에서는 격자를 성기게 해 렌더 비용을 줄인다
      cols = width < 640 ? 56 : width < 1024 ? 84 : 112;
      rows = width < 640 ? 22 : width < 1024 ? 30 : 38;
      allocate();
    }

    /** 주기가 다른 파동을 겹쳐 물결이 대각선으로 흐르게 한다. 진폭 합 ≈ 0.87 */
    function waveAt(x: number, z: number, t: number) {
      return (
        Math.sin(x * 2.4 + z * 2.8 + t * 0.62) * 0.3 +
        Math.sin(x * 4.6 - z * 2.2 + t * 0.44) * 0.2 +
        Math.sin(x * 1.2 - z * 4.0 + t * 0.31) * 0.22 +
        Math.cos(x * 7.8 + z * 5.2 - t * 0.52) * 0.09
      );
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);

      // 1) 좌표와 파고 계산 + 이 프레임의 파고 범위 파악
      let hmin = Infinity;
      let hmax = -Infinity;
      let i = 0;
      for (let r = 0; r < rows; r++) {
        const z = r / (rows - 1);
        const p = 1 / (1 + z * DEPTH);
        const rowY = height * -0.05 + p * height * (1.25 + shiftY * 0.05);
        for (let c = 0; c < cols; c++, i++) {
          const x = (c / (cols - 1)) * 2 - 1;
          const h = waveAt(x, z, t);
          PX[i] = width / 2 + (x + shiftX * 0.05) * p * width * 1.15;
          PY[i] = rowY - h * p * height * 0.55;
          PH[i] = h;
          if (h < hmin) hmin = h;
          if (h > hmax) hmax = h;
        }
      }

      // 2) 밝기 = 마루(파고) + 빛을 받는 경사면(기울기).
      //    파고만 쓰면 위상이 어긋난 순간 마루가 화면 밖으로 나가 밋밋해지는데,
      //    경사는 언제나 존재하므로 밝은 띠가 항상 살아있다.
      const span = Math.max(0.3, hmax - hmin);
      const dxStep = 2 / (cols - 1);
      i = 0;
      for (let r = 0; r < rows; r++) {
        const z = r / (rows - 1);
        const p = 1 / (1 + z * DEPTH);
        const depth = 0.45 + 0.55 * Math.pow(p, 0.4); // 먼 곳일수록 옅게
        const base = r * cols;
        for (let c = 0; c < cols; c++, i++) {
          const x = (c / (cols - 1)) * 2 - 1;

          const lift = (PH[i] - hmin) / span; // 0(골) ~ 1(마루)
          const crest = Math.pow(lift, 2.2);

          // 이웃 점과의 차이로 x방향 기울기를 구한다 (이미 계산된 값이라 비용 없음)
          const hl = PH[c === 0 ? base : i - 1];
          const hr = PH[c === cols - 1 ? base + cols - 1 : i + 1];
          const slope = Math.abs((hr - hl) / (2 * dxStep));
          const lit = Math.min(1, slope / 1.5);

          const shade = Math.min(1, 0.5 * crest + 0.75 * Math.pow(lit, 1.3));
          const edge = 1 - Math.pow(Math.abs(x), 3.5) * 0.45; // 좌우 가장자리 페이드
          PB[i] = (0.16 + 0.84 * shade) * depth * edge;
        }
      }

      // 2) 밝기 버킷별로 선분을 모은다
      for (let k = 0; k < BUCKETS; k++) paths[k] = new Path2D();

      for (let r = 0; r < rows; r++) {
        const base = r * cols;
        for (let c = 0; c < cols - 1; c++) {
          const i0 = base + c;
          const i1 = i0 + 1;
          const b = (PB[i0] + PB[i1]) * 0.5;
          if (b < 0.035) continue;
          const k = b >= 1 ? BUCKETS - 1 : (b * BUCKETS) | 0;
          paths[k].moveTo(PX[i0], PY[i0]);
          paths[k].lineTo(PX[i1], PY[i1]);
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const i0 = r * cols + c;
          const i1 = i0 + cols;
          const b = (PB[i0] + PB[i1]) * 0.38; // 세로선은 가로선보다 약하게
          if (b < 0.035) continue;
          const k = b >= 1 ? BUCKETS - 1 : (b * BUCKETS) | 0;
          paths[k].moveTo(PX[i0], PY[i0]);
          paths[k].lineTo(PX[i1], PY[i1]);
        }
      }

      // 3) 버킷 단위로 한 번씩만 stroke
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap = "round";
      for (let k = 0; k < BUCKETS; k++) {
        const f = k / (BUCKETS - 1);
        // 청록을 유지하되 가장 밝은 마루만 살짝 흰빛으로
        const w = Math.pow(f, 2.2) * 0.5;
        const cr = Math.round(mesh[0] + (255 - mesh[0]) * w);
        const cg = Math.round(mesh[1] + (255 - mesh[1]) * w);
        const cb = Math.round(mesh[2] + (255 - mesh[2]) * w);
        ctx!.strokeStyle = `rgba(${cr},${cg},${cb},${(0.05 + Math.pow(f, 1.5) * 0.62).toFixed(3)})`;
        ctx!.lineWidth = 0.45 + Math.pow(f, 1.3) * 1.35;
        ctx!.stroke(paths[k]);
      }
      // 가장 밝은 마루에 넓게 번지는 블룸을 한 겹 더
      ctx!.strokeStyle = `rgba(${mesh[0]},${mesh[1]},${mesh[2]},0.09)`;
      ctx!.lineWidth = 7;
      ctx!.stroke(paths[BUCKETS - 1]);

      // 4) 입자
      for (const s of bokeh) {
        const p = 1 / (1 + s.z * DEPTH);
        const sx = width / 2 + (s.x + shiftX * 0.08) * p * width * 1.15;
        const sy = height * -0.05 + p * height * 1.25 - s.h * p * height * 0.55;
        const a = 0.05 + 0.035 * Math.sin(t * 0.5 + s.phase);
        const g = ctx!.createRadialGradient(sx, sy, 0, sx, sy, s.r);
        g.addColorStop(0, `rgba(${dot[0]},${dot[1]},${dot[2]},${Math.max(0, a).toFixed(3)})`);
        g.addColorStop(1, `rgba(${dot[0]},${dot[1]},${dot[2]},0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const s of particles) {
        const p = 1 / (1 + s.z * DEPTH);
        const sx = width / 2 + (s.x + shiftX * 0.07) * p * width * 1.15;
        if (sx < -20 || sx > width + 20) continue;
        const sy = height * -0.05 + p * height * 1.25 - s.h * p * height * 0.55;
        const a = (0.2 + p * 0.6) * (0.45 + 0.55 * Math.sin(t * s.speed + s.phase));
        if (a <= 0) continue;
        ctx!.fillStyle = `rgba(${dot[0]},${dot[1]},${dot[2]},${a.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(sx, sy, s.r * (0.45 + p), 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    function step(now: number) {
      // 마우스 위치로 부드럽게 수렴
      shiftX += (targetX - shiftX) * 0.045;
      shiftY += (targetY - shiftY) * 0.045;
      draw(now * 0.001);
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (raf) return;
      if (reduceMotion.matches) {
        shiftX = 0;
        shiftY = 0;
        draw(0);
        return;
      }
      raf = requestAnimationFrame(step);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function sync() {
      if (onScreen && !document.hidden) start();
      else stop();
    }

    function onPointerMove(e: PointerEvent) {
      if (reduceMotion.matches || !finePointer.matches) return;
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    }

    function onMotionChange() {
      stop();
      start();
    }

    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion.matches) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
