import type { Project } from "@/lib/types";

// 출처: 기존 홈페이지·가입 신청서 크롤링 자료 (moyeon_website_crawl.md, 2026-07-29 수집).
// national-pension·milk-price-analysis·library-usage-analysis·mbti-survey의 상세 필드는
// 2026-08-04, 원본 카드뉴스(images/archive/cardnews/, 옛 js/projects-data.js)를 다시 읽어 채움 —
// 임의로 지어내지 않고 카드에 적힌 문장·수치만 옮김.
// anseong-community·internal-data-contest는 대응하는 카드뉴스나 옛 데이터 파일 기록이 없어 비워둠.
// TODO: 두 프로젝트는 담당 학회원에게 상세 내용·이미지·결과물 링크 확보 후 채울 것.
//
// ★ 썸네일 원칙 (2026-08-24) — **AI 생성 이미지를 쓰지 않는다.**
//   전에는 6개 프로젝트가 `images/projects/*.png` 라는 AI 생성 스톡 이미지를 달고 있었다.
//   실제 카드뉴스가 `images/cardnews/` 에 이미 있는데도 그랬다. 데이터로 사실을 다루는
//   학회가 표지만 지어낸 그림을 쓰는 것은 앞뒤가 안 맞는다. 지금은 전부 실물이다:
//     학술정보관 card-33 · 국민연금 card-01 · 우유값 card-08 · 경기침체 card-16 ·
//     MBTI mbti-02-department · 분석대회 contest-2024-poster(2024 모집 공고 원본)
//   실물이 없는 프로젝트는 **비워 둔다** — 채우지 말고 DataGraphic 대체를 쓴다.
export const projects: Project[] = [
  {
    title: "학술정보관 이용률 분석",
    slug: "library-usage-analysis",
    thumbnail: "/images/cardnews/card-33.jpg",
    imageAspect: "square",
    images: [
      "/images/cardnews/card-33.jpg",
      "/images/cardnews/card-34.jpg",
      "/images/cardnews/card-35.jpg",
      "/images/cardnews/card-36.jpg",
      "/images/cardnews/card-37.jpg",
      "/images/cardnews/card-38.jpg",
      "/images/cardnews/card-39.jpg",
      "/images/cardnews/card-40.jpg",
      "/images/cardnews/card-41.jpg",
      "/images/cardnews/card-42.jpg",
    ],
    year: 2023,
    category: "캠퍼스",
    summary:
      "학술정보관 열람석 이용 데이터를 분석해 공간 이용의 불균형과 개선 가능성을 탐구했습니다.",
    status: "게시완료",
    featured: true,
    problem:
      "시험기간에 학술정보관 열람실에 자리가 없어 헛걸음친 경험에서, '학생들이 학술정보관을 많이 이용하는 것인지, 열람석이 적은 것인지'를 데이터로 확인해보고자 했습니다.",
    background:
      "2022년 기준 재학생 수 10,000명 이상이면서 재학생 1인당 도서관 연면적이 0.1㎡ 이상인 전국 61개 대학(한양대 ERICA 포함)을 비교 대상으로 삼았습니다.",
    data: "학술정보통계시스템(2018~2022년), ERICA 학술정보관 애널리틱스(2022~2023년 3~6월) — 재학생 1인당 방문자 수, 총 열람석 수, 시험기간(4·6월) 대비 비시험기간(3·5월) 방문자 수, 2023년 5월 14일~6월 18일 열람실별 일별 방문자 추이.",
    analysis:
      "한양대 ERICA의 재학생 1인당 도서관 방문자 수 순위는 61개교 중 2020년 48위에서 2021·2022년 16위로 크게 올랐지만, 총 열람석수 순위는 2020년 60위, 2021년 57위, 2022년 56위로 하위권에 머물렀습니다. 방문자수 대비 열람석수 순위는 2018년부터 꾸준히 낮아져 2022년엔 61개교 중 56위였습니다. 2023년(3~6월) 학술정보관 방문자수는 전년 대비 20%, 열람실 방문자수는 25% 늘었고, 시험기간(4·6월)이 비시험기간(3·5월)보다 학술정보관 방문자수는 1.52배, 열람실 방문자수는 2.36배 많았습니다.",
    findings:
      "한양대 ERICA는 비교 대상 61개교 중 도서관 방문자수 대비 총 열람석수가 적은 편이고, 2023년 들어 열람실 방문자수까지 늘어 혼잡도가 더 커졌습니다. 시험기간에는 열람실 방문자수가 평상시의 2배 이상입니다.",
    solution:
      "도서관 방문자수 대비 열람석수가 적은 편이므로 효율적인 공간 활용을 통해 열람실 좌석을 늘리고, 특히 시험기간(4·6월) 위주로 탄력적인 운영을 할 필요가 있다고 제안했습니다.",
    resultLinks: [{ label: "인스타그램 게시물", url: "https://www.instagram.com/p/Cy250hkB0VB/" }],
  },
  {
    title: "국민연금 바로 알기 프로젝트",
    slug: "national-pension",
    thumbnail: "/images/cardnews/card-01.jpg",
    imageAspect: "square",
    images: [
      "/images/cardnews/card-01.jpg",
      "/images/cardnews/card-02.jpg",
      "/images/cardnews/card-03.jpg",
      "/images/cardnews/card-04.jpg",
      "/images/cardnews/card-05.jpg",
      "/images/cardnews/card-06.jpg",
      "/images/cardnews/card-07.jpg",
    ],
    year: 2024,
    category: "복지",
    summary: "국민연금 제도와 재정 고갈 논란을 데이터로 살펴본 카드뉴스 프로젝트입니다.",
    status: "게시완료",
    featured: true,
    problem:
      "국민연금은 18세 이상 취업자가 무조건 가입해야 하는 강제성과, 세대 간 보험료율·소득대체율에 대한 입장 차이로 갈등의 소재가 되고 있습니다. 특히 '현 체제로 유지되면 기금이 고갈된다'는 전망이 기정사실화되며 큰 화두가 됐습니다.",
    background:
      "국민연금 제도 도입 논의는 1970년부터 시작돼, 1986년 12월 국민복지연금을 국민연금으로 개편하며 1988년 1월부터 본격 시행됐습니다. 18세 이상 60세 미만 취업자는 무조건 가입해야 하며, 가입자는 2,238만 명입니다.",
    data: "보건복지부(2023), 통계청(2022) 자료를 활용해 저자가 산출한 국민연금 재정수지 및 적립금 추계(보험료율 9% 기준, 2024~2099년).",
    analysis:
      "재정수지·적립금 추계 그래프를 보면 적립금은 2039년경 정점(약 2,000조 원)을 찍은 뒤 급격히 줄어 2050년대 후반 소진되고, 이후 재정수지 적자 폭이 계속 커집니다.",
    findings:
      "그래프상 국민연금은 현 체제를 유지하면 기금이 고갈되는 것을 피할 수 없으며, 수급자와 납부자의 입장 차이로 갈등이 지속될 소지가 있습니다.",
    solution:
      "해결 방안으로 ① '구연금'의 재정부족분을 '신연금'과 분리해 일반재정으로 충당하는 완전적립식 신연금 도입 ② 인구·경제적 요인 변화에 따라 자동으로 대응하도록 지속가능한 연금 삭감 방법을 법에 명시하는 방안을 소개했습니다. 다만 절대적인 해결책은 아니라는 점도 함께 짚었습니다.",
    // ⚠ year 는 2024 로 두었지만 카드뉴스 «게시»는 2025-01-26 이다(인스타 실측).
    //   분석을 2024년 2학기에 하고 이듬해 1월에 올렸을 수 있어 둘 다 말이 된다 —
    //   실제 작업 시기를 아는 사람이 확인하면 그때 고친다. 연혁에는 게시일(2025년 1월)로 실었다.
    resultLinks: [{ label: "인스타그램 게시물", url: "https://www.instagram.com/p/DFSoyTBhzyM/" }],
  },
  {
    title: "우유값 변동 원인 분석",
    slug: "milk-price-analysis",
    thumbnail: "/images/cardnews/card-08.jpg",
    imageAspect: "square",
    images: [
      "/images/cardnews/card-08.jpg",
      "/images/cardnews/card-09.jpg",
      "/images/cardnews/card-10.jpg",
      "/images/cardnews/card-11.jpg",
      "/images/cardnews/card-12.jpg",
      "/images/cardnews/card-13.jpg",
      "/images/cardnews/card-14.jpg",
      "/images/cardnews/card-15.jpg",
    ],
    year: 2024,
    category: "경제",
    summary: "밀크인플레이션 — 원유 가격 결정 구조와 우유값이 계속 오르는 이유를 다룬 카드뉴스입니다.",
    status: "게시완료",
    featured: true,
    problem:
      "밀크인플레이션(원유·유제품 가격이 연쇄적으로 오르는 현상)이 계속되는데, 우유값은 구체적으로 어떻게 결정되고 왜 계속 비싸지는지를 다뤘습니다.",
    background:
      "원유 가격은 '원유가격연동제'로 정해집니다. 낙농가가 유가공업체에 납품하는 원유 수취가격은 전년 원유기본가격에, 생산비 증가율에 따라 1~2년마다 협상하는 증가액, 유성분·위생등급 인센티브를 더해 산정됩니다.",
    data: "2018~2023년 원유 수취가격 추이(2018년 1,084.93원/ℓ → 2023년 1,162.73원/ℓ).",
    analysis:
      "2017년 이후 원유가격이 동결돼 2018·2019년은 비교적 안정적이었습니다. 2020~2021년은 코로나19로 유통이 불안정했음에도 우유값은 안정적이었지만, 2022년엔 글로벌 공급망 문제와 국제 곡물가 상승으로 큰 폭 인상됐고, 2023년에도 오름세가 이어졌습니다(전년 대비 증가폭은 다소 완화).",
    findings:
      "우유값 변화에 영향을 미치는 요인은 크게 네 가지 — 생산비용(사료비·인건비·에너지비), 수요와 공급, 기후 변화(가뭄·홍수), 정부의 농업 정책 및 규제입니다.",
    resultLinks: [{ label: "인스타그램 게시물", url: "https://www.instagram.com/p/DCWOLznhtW6/" }],
  },
  // ★ 2026-08-24 — 원래 「발표 자료 — 경기침체 대비 · 2025년 트렌드 전망」 하나였던 것을
  //   **두 프로젝트로 나눴다.** 서로 다른 발표 두 편(슬라이드 디자인도 남색/보라로 다르다)이
  //   한 갤러리에 17장으로 이어 붙어 있어서, 중간에 주제가 갈아타는 것처럼 보였다.
  //   아래 본문은 나누기 전 문장을 **편별로 갈라 옮긴 것**이다 — 새로 지어낸 문장은 없다.
  //   옛 주소 `/projects/recession-and-2025-trends/` 는 `public/_redirects` 로 넘긴다.
  {
    title: "경기침체, 우리는 어떻게 대비해야 할까?",
    slug: "recession-preparedness",
    thumbnail: "/images/cardnews/card-16.jpg",
    imageAspect: "wide",
    images: [
      "/images/cardnews/card-16.jpg",
      "/images/cardnews/card-17.jpg",
      "/images/cardnews/card-18.jpg",
      "/images/cardnews/card-19.jpg",
      "/images/cardnews/card-20.jpg",
      "/images/cardnews/card-21.jpg",
      "/images/cardnews/card-22.jpg",
      "/images/cardnews/card-23.jpg",
    ],
    year: 2024,
    category: "학회활동",
    summary: "경기침체가 왜 오고 나에게 어떤 영향을 주는지를 사례와 데이터로 정리한 학회 내부 발표 자료입니다.",
    status: "게시완료",
    problem:
      "「경기침체, 우리는 어떻게 대비해야 할까?」를 주제로 학회 내부 발표를 진행했습니다.",
    background:
      "특정 주제에 대해 데이터를 찾아 정리하고 슬라이드로 만들어 발표합니다. 분석 자체만이 아니라 '어떻게 보여줄 것인가'까지 함께 연습하는 자리이고, 이 경험이 이후 모연 매거진의 바탕이 되었습니다.",
    data: "2008년 글로벌 금융위기·1929년 대공황 사례와 2024~2025년 경제성장률·취업자수 전망을 정리했습니다.",
    findings:
      "경기침체는 경기 과열→정점→침체→회복의 순환 구조로 설명하고, 소비자·기업·근로자·국가 각각에 미치는 영향과 정부의 통화·재정 정책 대응을 짚었습니다.",
    solution:
      "개인 차원에서는 금융지식 쌓기·지출 관리·비상자금 마련·추가 소득원 확보를 대응 방향으로 제시했습니다.",
  },
  {
    title: "2025년 트렌드 전망",
    slug: "trends-2025",
    thumbnail: "/images/cardnews/card-24.jpg",
    imageAspect: "wide",
    // ⚠ **card-28 은 원본 슬라이드 자체가 어긋나 있다** — 제목은 「지속가능한 미래: 기술 트렌드」인데
    //   본문은 DeepSeek AI 검색 엔진 설명이다(2026-08-24 확인). 순서를 잘못 넣은 게 아니라
    //   발표 자료를 만들 때 제목을 안 바꾼 것으로 보인다. 원본을 고쳐야 해결된다 —
    //   임의로 빼거나 제목을 지어 붙이지 말 것.
    images: [
      "/images/cardnews/card-24.jpg",
      "/images/cardnews/card-25.jpg",
      "/images/cardnews/card-26.jpg",
      "/images/cardnews/card-27.jpg",
      "/images/cardnews/card-28.jpg",
      "/images/cardnews/card-29.jpg",
      "/images/cardnews/card-30.jpg",
      "/images/cardnews/card-31.jpg",
      "/images/cardnews/card-32.jpg",
    ],
    year: 2024,
    category: "학회활동",
    summary: "AI·자동화, 친환경 기술, 헬스케어, 원격근무 등 2025년에 올 변화를 짚은 학회 내부 발표 자료입니다.",
    status: "게시완료",
    problem: "「2025년 트렌드 전망」을 주제로 학회 내부 발표를 진행했습니다.",
    background:
      "특정 주제에 대해 데이터를 찾아 정리하고 슬라이드로 만들어 발표합니다. 분석 자체만이 아니라 '어떻게 보여줄 것인가'까지 함께 연습하는 자리이고, 이 경험이 이후 모연 매거진의 바탕이 되었습니다.",
    data: "AI·자동화, 친환경 기술, 헬스케어, 원격근무 관련 동향을 정리했습니다.",
    findings:
      "2025년에는 AI·자동화, 친환경 기술, 건강·웰빙, 원격근무 확산이 주요 변화로 꼽혔습니다.",
    solution:
      "다가올 변화에는 유연한 사고와 지속적 학습, 협업 강화를 대응 방향으로 제시했습니다.",
  },
  {
    title: "안성시 지역살리기 기획봉사",
    slug: "anseong-community",
    // 썸네일 없음 — 이 프로젝트만 실제 결과물 이미지가 없다. 비워 두면 ProjectCard 가
    // 자체 그래픽(DataGraphic)으로 대체한다. 담당 학회원에게 사진·산출물을 받으면 넣는다.
    //
    // 성격은 2026-08-24 에 «학회 자신이 쓴 두 기록»으로 확인했다 —
    //   ① 학과 공식 게시판의 2025-2학기 모집 카드뉴스(2025-09-26) 「모연의 이전 활동들」 04번:
    //      "안성시 지역살리기 — 지역 데이터 분석을 통한 지역발전 방안 제시"
    //   ② 2025-2학기 가두모집 구글폼 설명문의 "🏞️ 안성시 지역살리기 기획봉사"
    // → 2025년 9월 이전 활동인 것까지만 확정. **연도·참여자·산출물은 여전히 미확인**이라
    //   status 는 「준비중」 그대로 둔다. 물어볼 사람: 황은성(2025년 1·2학기 회장).
    category: "지역사회",
    summary:
      "지역 데이터 분석을 통해 안성시의 지역발전 방안을 제시한 프로젝트입니다. 상세 기록은 준비 중입니다.",
    status: "준비중",
    featured: true,
  },
  {
    title: "학과별 MBTI 분포 조사",
    slug: "mbti-survey",
    // 2026-08-24 — 옛 인스타(@moyeon_lab, 2023-05-25)에서 카드를 회수해 표지로 썼다.
    //   전에 쓰던 `insta-mbti.jpg` 는 인스타 화면을 잘못 잘라낸 스크린샷이라 제목이
    //   반쯤 잘려 있었다(그래서 목록에서 이상하게 보였다).
    //
    // ⛔ 인스타에서 회수한 카드 4장은 전부 «질문만 적힌 표지»라 갤러리로 쓰지 않는다
    //   (한 번 넣었다가 뺐다 — 똑같은 카드가 네 번 나오는 것처럼 보였다).
    //   답이 되는 데이터 장은 캐러셀 안쪽이라 회수가 안 된다.
    // ★ 대신 **결과 보고서 안에 들어 있던 히트맵**을 꺼내 실었다 (2026-08-24).
    //   구글 문서를 docx 로 내보내면 `word/media/` 에 원본 그림이 들어 있다 —
    //   txt 로 내보내면 그림이 통째로 사라져서 「없다」고 오판하기 쉽다.
    //   이건 표지가 아니라 학회가 직접 만든 «분석 산출물»이라 실을 값어치가 있다.
    thumbnail: "/images/cardnews/mbti-02-department.jpg",
    imageAspect: "square",
    imagesLabel: "조사 결과 자료",
    images: [
      "/images/cardnews/mbti-02-department.jpg",
      "/images/cardnews/mbti-heatmap.png",
    ],
    year: 2023,
    category: "캠퍼스",
    summary: "창립 직후 진행한 첫 활동. 학과별 MBTI 분포를 직접 설문으로 조사했습니다.",
    status: "게시완료",
    problem: "2023년 5월 창립 직후 진행한 학회의 첫 활동으로, '우리 학과에 과연 어떤 MBTI가 제일 많을까?'라는 질문에서 출발했습니다.",
    background:
      "이미 있는 공공데이터가 아니라 직접 설문을 만들어 데이터를 모으는 것부터 시작했습니다. 데이터가 없으면 만들어서라도 본다는 점에서, 이후 활동의 성격이 여기서 정해졌습니다.",
    // 아래 data·analysis·findings 는 학회가 직접 쓴 결과 보고서(구글 문서, 공개)에서
    // 수치와 표현을 그대로 옮긴 것이다 — 지어낸 문장이 없다. 2026-08-24 확인.
    // ⚠ 보고서 (4)절은 학회 이름을 「모두의 연구소」로 잘못 적어 사교육 기업과 헷갈린다 —
    //    인용할 때 그 표기는 쓰지 말 것. 표본 구성 비율도 합계가 안 맞아 인용하지 않았다.
    data: "2023년 5월 5일부터 18일까지 한양대 ERICA 학생 515명(여 259명·남 255명)을 대상으로 에브리타임과 인터넷 링크를 통해 설문했습니다. 참여를 늘리기 위해 댓글 이벤트를 함께 진행했습니다.",
    analysis:
      "응답을 단과대학별·학과별로 나눠 E/I, N/S, F/T, J/P 네 지표의 비율을 비교하고, 학과 만족도와 희망 진로도 함께 물었습니다. 「가장 친한 친구의 MBTI」 응답은 히트맵으로 그려 유형 사이의 실제 친밀도 경향을 확인했습니다.",
    findings:
      "응답자가 30명 이상인 6개 단과대학에서 모두 내향형(I)이 우세했습니다. 소프트웨어융합대학은 I와 P가 각각 70.1%로 가장 큰 격차를 보였고, 디자인대학은 직관형(N)이 91.3%로 압도적이었습니다. 학과별로는 수리데이터사이언스학과(T 67.86%)와 국방정보공학과(T 61.54%)에서 사고형이 감정형보다 많았습니다. 학과 만족도가 가장 높은 유형은 ENFJ(89.29%가 만족), 가장 낮은 유형은 ISFP였습니다. 다만 MBTI와 희망 진로 사이에서는 뚜렷한 연관성이 나오지 않았고, 보고서는 그 이유를 515명이라는 표본의 한계로 짚었습니다.",
    resultLinks: [
      { label: "인스타그램 게시물", url: "https://www.instagram.com/p/Cr45LT2yeVj/" },
      {
        label: "조사 결과 보고서(전문)",
        url: "https://docs.google.com/document/d/19bj0ALjvKUAgbNkBgpF7ZmrhfSeMKe8DPz_VmlOeGZ4/edit",
      },
    ],
  },
  {
    title: "자체 데이터 분석 대회",
    slug: "internal-data-contest",
    // 포스터는 **학과 공식 게시판의 원본**(1587×2245)이다 — 2026-08-24 교체.
    //   전에 쓰던 559×559 짜리는 인스타 화면을 캡처해 자른 것이라 제목 「데이터 활용」이
    //   위로 잘려 나가 「분석 대회」만 보였다. 출처: 학과 게시판 2024-09-22 공고(idx=176).
    // 아래 본문은 그 포스터에 적힌 문구를 옮긴 것이다. 갤러리(images)는 없다 —
    //   출품작·시상 사진이 남아 있지 않다. 접수가 구글폼이었으니 **옛 학회 계정
    //   moyeonhanyang@gmail.com 의 응답 시트에 출품작 PDF 가 통째로 있을 수 있다.**
    thumbnail: "/images/cardnews/contest-2024-poster.png",
    year: 2024,
    category: "기타",
    summary:
      "한양대 재학생을 대상으로 학회가 직접 연 데이터 분석 공모전입니다. 수상팀과 출품작 기록은 준비 중입니다.",
    status: "준비중",
    problem:
      "학회원과 한양대 재학생이 각자 주제를 정해 데이터로 분석하고, 그 결과를 겨루는 자체 대회를 열었습니다.",
    background:
      "2024년 9월 23일부터 11월 13일 18시까지 접수했고, 한양대학교 재학생이면 1인 또는 3인 이내 팀으로 참가할 수 있었습니다.",
    data: "공모 주제는 ① 데이터를 활용한 특정 주제에 대한 분석 ② 데이터 기반 사회문제 해결 아이디어 두 가지였고, PDF 4페이지 이내로 제출받았습니다.",
    findings: "대상 1팀, 우수상 1팀, 장려상 2팀을 시상했습니다.",
  },
];

export const projectCategories = [
  "전체",
  "캠퍼스",
  "경제",
  "복지",
  "지역사회",
  "환경",
  "교육",
  "학회활동",
  "기타",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}
