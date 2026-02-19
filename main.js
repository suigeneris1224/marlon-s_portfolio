/* ============================================================
   PORTFOLIO — main.js
   ============================================================ */

/* ── Make all reveal elements visible immediately on load ─── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.section-header, .skill-category, .project-card, .spec-card'
  ).forEach(el => el.classList.add('visible'));
});

/* ── Custom Cursor ────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor() {
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '60px';
    ring.style.height      = '60px';
    ring.style.borderColor = 'rgba(0, 240, 255, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width       = '36px';
    ring.style.height      = '36px';
    ring.style.borderColor = 'rgba(0, 240, 255, 0.5)';
  });
});

/* ── Canvas Particle Grid Background ─────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 80 }, () => ({
  x:  Math.random() * innerWidth,
  y:  Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  r:  Math.random() * 1.5 + 0.5,
}));

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(26, 37, 64, 0.4)';
  ctx.lineWidth   = 0.5;
  const gs = 80;

  for (let x = 0; x < canvas.width; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.fill();
  });

  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - d / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawCanvas);
}
drawCanvas();

/* ── Typed Text Effect ────────────────────────────────────── */
const phrases = [
  'WooCommerce stores.',
  'custom WordPress themes.',
  'payment integrations.',
  'eCommerce solutions.',
  'conversion-focused UX.',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed');

function typeEffect() {
  const phrase = phrases[phraseIndex];
  if (!isDeleting) {
    typedEl.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 90);
}
typeEffect();

/* ── Optional scroll animation (enhancement only) ────────── */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.skill-category, .project-card, .spec-card')
    .forEach(el => observer.observe(el));
}