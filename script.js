window.addEventListener('wheel', (e) => {
    e.preventDefault();
    window.scrollBy({left: e.deltaY });

}, {passive: false});

const root = document.documentElement;
const earth = document.getElementById('hero-image')
const chart = document.getElementById('chart');
const dropsEl = document.getElementById('drops');
const peopleEl = document.getElementById('people');


function update() {
    const x = window.scrollX || 0;

    const t = Math.min(Math.max(x / window.innerWidth, 0), 1);
    const p = t * t * (3 - 2 * t);
    root.style.setProperty('--p', p);

    const f = Math.min(Math.max((x / window.innerWidth - 1) * 1.5, 0), 1);
    earth.style.opacity = 1 - f;
    root.style.setProperty('--glow', p * (1 - f));
}

window.addEventListener('scroll', update, {passive: true});
window.addEventListener('resize', update);
update();


new IntersectionObserver(([entry]) => {
    chart.classList.toggle('show', entry.isIntersecting);
}, {threshold: 0.6}).observe(chart);

for (let i = 0; i < 200; i++) {
    const d = document.createElement('i');
    d.style.setProperty('--i', i);
    if (i === 137) d.className = 'gold';
    dropsEl.appendChild(d);
}

for (let i = 0; i < 80; i++) {
    const p = document.createElement('i');
    p.style.setProperty('--i', i);
    const k = Math.floor(i / 4);
    if (i % 4 === (k * 3 + 1) % 4) p.className = 'dry';
    peopleEl.appendChild(p);
}

const peopleBox = document.getElementById('people-box');
new IntersectionObserver(([entry]) => {
    peopleBox.classList.toggle('show', entry.isIntersecting);
}, { threshold: 0.6 }).observe(peopleBox);

const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.turn, .intro, .taken').forEach((page) => pageObserver.observe(page));