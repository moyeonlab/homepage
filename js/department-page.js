// department-page.js - 학과 소개 페이지 전용
import { departmentInfo } from './department.js';
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();
    renderProfessors();
    initProfessorModal();
});

function renderProfessors() {
    const grid = document.getElementById('professors-grid');
    if (!grid) return;

    grid.innerHTML = departmentInfo.professors.map((prof, index) => `
    <div class="glass-card reveal-up stagger-${index + 1} prof-card" data-prof-index="${index}" style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: start; cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease;">
      <div style="text-align: center;">
        <img src="${prof.image}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(79,110,247,0.4); display: block;">
      </div>
      <div>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.3rem;">${prof.name}</h3>
        <div style="color: var(--accent-purple); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.8rem;">${prof.title}</div>
        <div style="margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span style="background: rgba(79,110,247,0.1); border: 1px solid rgba(79,110,247,0.3); color: #a5b4fc; padding: 0.25rem 0.8rem; border-radius: 4px; font-size: 0.8rem;">소속: ${prof.department}</span>
          <span style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3); color: #c4b5fd; padding: 0.25rem 0.8rem; border-radius: 4px; font-size: 0.8rem;">보직: ${prof.position}</span>
          <span style="background: rgba(79,110,247,0.1); border: 1px solid rgba(79,110,247,0.3); color: #a5b4fc; padding: 0.25rem 0.8rem; border-radius: 4px; font-size: 0.8rem;">연구분야: ${prof.research}</span>
        </div>
        <div style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.8; border-left: 3px solid rgba(124,58,237,0.4); padding-left: 1rem; margin-bottom: 1rem;">
          <div>전화: ${prof.phone}</div>
          <div>이메일: <a href="mailto:${prof.email}" onclick="event.stopPropagation();" style="color: inherit; text-decoration: underline;">${prof.email}</a></div>
        </div>
        <div style="color: var(--accent-blue); font-size: 0.85rem; font-weight: 600;">자세히 보기 →</div>
      </div>
    </div>
  `).join('');

    grid.querySelectorAll('.prof-card').forEach((card) => {
        card.addEventListener('click', () => {
            const i = parseInt(card.getAttribute('data-prof-index'), 10);
            openProfessorModal(departmentInfo.professors[i]);
        });
    });

    setTimeout(() => initScrollAnimations(), 50);
}

function initProfessorModal() {
    const closeBtn = document.getElementById('close-prof-modal');
    const modal = document.getElementById('professor-modal');
    if (!closeBtn || !modal) return;
    closeBtn.addEventListener('click', closeProfessorModal);
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'professor-modal') closeProfessorModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProfessorModal();
    });
}

function openProfessorModal(prof) {
    const modal = document.getElementById('professor-modal');
    const body = document.getElementById('prof-modal-body');
    const area = document.getElementById('prof-modal-content-area');
    if (!modal || !body || !area) return;

    const educationHTML = (prof.education || []).map((e) => `
        <li style="display: grid; grid-template-columns: 80px 1fr; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <span style="color: var(--accent-purple); font-weight: 600;">${e.year}</span>
          <span style="color: rgba(255,255,255,0.85);">${e.text}</span>
        </li>`).join('');

    const careerHTML = (prof.career || []).map((c) => `
        <li style="display: grid; grid-template-columns: 220px 1fr; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <span style="color: var(--accent-blue); font-weight: 600; font-size: 0.9rem;">${c.period}</span>
          <span style="color: rgba(255,255,255,0.85);">${c.text}</span>
        </li>`).join('');

    const papersHTML = (prof.papers || []).map((p) => `
        <li style="padding: 0.7rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.3rem; flex-wrap: wrap;">
            <span style="color: var(--accent-blue); font-weight: 600; font-size: 0.85rem;">${p.date}</span>
            <span style="background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); color: #c4b5fd; padding: 0.1rem 0.5rem; border-radius: 3px; font-size: 0.7rem; font-weight: 600;">${p.classification}</span>
          </div>
          <div style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.55;">${p.title}</div>
          <div style="color: var(--text-secondary); font-size: 0.85rem; font-style: italic; margin-top: 0.2rem;">${p.journal}</div>
        </li>`).join('');

    const booksHTML = (prof.books || []).map((b) => `
        <li style="padding: 0.7rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="color: var(--accent-blue); font-weight: 600; font-size: 0.85rem; margin-bottom: 0.3rem;">${b.date}</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.55;">${b.title}</div>
          <div style="color: var(--text-secondary); font-size: 0.85rem; font-style: italic; margin-top: 0.2rem;">${b.publisher}</div>
        </li>`).join('');

    const conferencesHTML = (prof.conferences || []).map((c) => `
        <li style="padding: 0.7rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="color: var(--accent-blue); font-weight: 600; font-size: 0.85rem; margin-bottom: 0.3rem;">${c.date}</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.55;">${c.title}</div>
          <div style="color: var(--text-secondary); font-size: 0.85rem; font-style: italic; margin-top: 0.2rem;">${c.society}</div>
        </li>`).join('');

    const sectionTitle = 'font-size: 1.05rem; margin-bottom: 0.8rem; color: var(--accent-blue); border-bottom: 1px solid rgba(79,110,247,0.3); padding-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: baseline;';
    const sectionCount = 'color: var(--text-secondary); font-size: 0.8rem; font-weight: 400;';
    const sectionWrap = 'margin-bottom: 1.8rem;';

    body.innerHTML = `
      <div style="display: flex; gap: 1.8rem; align-items: center; margin-bottom: 2rem; flex-wrap: wrap;">
        <img src="${prof.image}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(79,110,247,0.4);">
        <div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.3rem;">${prof.name}</h2>
          <div style="color: var(--accent-purple); font-weight: 600; margin-bottom: 0.5rem;">${prof.title}</div>
          <div style="color: var(--text-secondary); font-size: 0.95rem;">${prof.department} · ${prof.position}</div>
        </div>
      </div>
      ${prof.appointment ? `<div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>임용</span></h3><div style="color: rgba(255,255,255,0.85);">${prof.appointment}</div></div>` : ''}
      ${educationHTML ? `<div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>학력</span></h3><ul style="list-style: none; padding: 0; margin: 0;">${educationHTML}</ul></div>` : ''}
      ${careerHTML ? `<div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>경력</span></h3><ul style="list-style: none; padding: 0; margin: 0;">${careerHTML}</ul></div>` : ''}
      <div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>연구분야</span></h3><div style="color: rgba(255,255,255,0.85);">${prof.research}</div></div>
      ${papersHTML ? `<div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>논문</span><span style="${sectionCount}">${prof.papers.length}편</span></h3><ul style="list-style: none; padding: 0; margin: 0;">${papersHTML}</ul></div>` : ''}
      ${booksHTML ? `<div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>저서</span><span style="${sectionCount}">${prof.books.length}권</span></h3><ul style="list-style: none; padding: 0; margin: 0;">${booksHTML}</ul></div>` : ''}
      ${conferencesHTML ? `<div style="${sectionWrap}"><h3 style="${sectionTitle}"><span>학술활동</span><span style="${sectionCount}">${prof.conferences.length}건</span></h3><ul style="list-style: none; padding: 0; margin: 0;">${conferencesHTML}</ul></div>` : ''}
      <div style="${sectionWrap} margin-bottom: 0;"><h3 style="${sectionTitle}"><span>연락처</span></h3><div style="color: rgba(255,255,255,0.85); line-height: 1.9;"><div>전화: ${prof.phone}</div><div>이메일: <a href="mailto:${prof.email}" style="color: inherit; text-decoration: underline;">${prof.email}</a></div></div></div>
    `;

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    area.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
}

function closeProfessorModal() {
    const modal = document.getElementById('professor-modal');
    const area = document.getElementById('prof-modal-content-area');
    if (!modal || !area) return;
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    area.style.transform = 'translateY(20px)';
    document.body.style.overflow = 'auto';
}
