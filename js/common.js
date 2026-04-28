// 모두의 문제 연구소 - 공통 유틸리티 (non-module)
// 모든 페이지에서 <script src="./js/common.js"> 로 로드됩니다.

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const links = navLinks.querySelectorAll('a');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    function Particle() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
    }
    Particle.prototype.update = function () {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    };
    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,110,247,0.5)';
        ctx.fill();
    };

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(79,110,247,${0.15 - d / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function initScrollAnimations() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.reveal-up,.reveal-fade,.reveal-left,.reveal-right').forEach(function (el) {
        // If element is already in viewport, activate immediately
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        } else {
            observer.observe(el);
        }
    });
}

// Typing Effect
function initTypingEffect(phrases) {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;
    let pIdx = 0, cIdx = 0, isDeleting = false, delay = 100;
    function type() {
        const phrase = phrases[pIdx];
        textElement.textContent = isDeleting ? phrase.substring(0, cIdx - 1) : phrase.substring(0, cIdx + 1);
        if (isDeleting) { cIdx--; delay = 50; } else { cIdx++; delay = 100; }
        if (!isDeleting && cIdx === phrase.length) { isDeleting = true; delay = 2000; }
        else if (isDeleting && cIdx === 0) { isDeleting = false; pIdx = (pIdx + 1) % phrases.length; delay = 500; }
        setTimeout(type, delay);
    }
    setTimeout(type, 1000);
}

// Form submission handler
function initForm(formId, successMsg) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(successMsg);
        form.reset();
    });
}

// Counter Up — animates [data-counter] numeric prefix once on viewport entry
function initCounters() {
    var nodes = document.querySelectorAll('[data-counter]');
    if (!nodes.length) return;

    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

    var run = function (el) {
        var target = parseFloat(el.getAttribute('data-counter'));
        if (isNaN(target)) return;
        var duration = parseInt(el.getAttribute('data-counter-duration') || '1400', 10);
        var start = null;
        var step = function (ts) {
            if (!start) start = ts;
            var p = Math.min(1, (ts - start) / duration);
            var v = Math.round(target * ease(p));
            el.textContent = v;
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                run(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.35 });

    nodes.forEach(function (n) { io.observe(n); });
}

// Magnetic — buttons with [data-magnetic] gently follow cursor
function initMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    var els = document.querySelectorAll('[data-magnetic]');
    var strength = 0.28;
    els.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var r = el.getBoundingClientRect();
            var x = (e.clientX - r.left - r.width / 2) * strength;
            var y = (e.clientY - r.top - r.height / 2) * strength;
            el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        });
        el.addEventListener('mouseleave', function () {
            el.style.transform = '';
        });
    });
}

// Cursor Glow — soft warm radial that trails cursor
function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var gx = mx, gy = my;
    var visible = false;

    document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        if (!visible) { glow.classList.add('active'); visible = true; }
    });
    document.addEventListener('mouseleave', function () {
        glow.classList.remove('active'); visible = false;
    });

    var loop = function () {
        gx += (mx - gx) * 0.12;
        gy += (my - gy) * 0.12;
        glow.style.transform = 'translate(' + (gx - 240) + 'px,' + (gy - 240) + 'px)';
        requestAnimationFrame(loop);
    };
    loop();
}
