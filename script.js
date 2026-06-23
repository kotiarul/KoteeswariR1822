// ── PARTICLE CANVAS ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function Particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;
  this.r = Math.random() * 1.5 + 0.3;
  this.sx = (Math.random() - 0.5) * 0.3;
  this.sy = (Math.random() - 0.5) * 0.3;
  this.alpha = Math.random() * 0.6 + 0.1;
}

Particle.prototype.update = function () {
  this.x += this.sx;
  this.y += this.sy;
  if (this.x < 0) this.x = W;
  if (this.x > W) this.x = 0;
  if (this.y < 0) this.y = H;
  if (this.y > H) this.y = 0;
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(99,102,241,${this.alpha})`;
  ctx.fill();
};

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((W * H) / 12000), 120);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { resize(); initParticles(); });
resize();
initParticles();
animate();


// ── TYPING EFFECT ──
const typingEl = document.getElementById('typing-text');
const words = ['Software Engineer', 'ML Enthusiast', 'Problem Solver', 'VIT Student'];
let wi = 0, ci = 0, deleting = false;

function type() {
  const word = words[wi];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();


// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ── NAV ACTIVE ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#C4B5FD' : '';
  });
});
