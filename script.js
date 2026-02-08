/**
 * Cyber Birthday Firewall / Security Awareness Demo
 * Vanilla JS | No tracking | No backend
 * Built by Elie Ishimwe
 */

'use strict';

const TYPING_SPEED = 32;
const LINE_DELAY = 280;

/* ========== Mode: 'birthday' (personal) | 'professional' (client-facing) ========== */
const DEMO_MODE = (() => {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'professional' ? 'professional' : 'birthday';
})();

const terminalOutput = document.getElementById('terminalOutput');
const btnAccess = document.getElementById('btnAccess');
const profileSection = document.getElementById('profileSection');
const footerOutput = document.getElementById('footerOutput');
const terminal = document.getElementById('terminal');
const btnMute = document.getElementById('btnMute');
const tipText = document.getElementById('tipText');
const cyberTips = document.getElementById('cyberTips');
const aboutDemo = document.getElementById('aboutDemo');
const terminalTitle = document.querySelector('.terminal-title');

/* ========== Sound (Beep) + Mute ========== */

let isMuted = false;

function playSuccessBeep() {
  if (isMuted) return;
  try {
    const beep = new Audio('success-beep.mp3');
    beep.volume = 0.5;
    beep.play().catch(() => {
      /* Fallback to Web Audio if file not found */
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    });
  } catch (e) {
    /* Sound not supported */
  }
}

function initMute() {
  if (!btnMute) return;
  const icon = btnMute.querySelector('.mute-icon');
  btnMute.addEventListener('click', () => {
    isMuted = !isMuted;
    btnMute.classList.toggle('muted', isMuted);
    if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
      isMuted = !isMuted;
      btnMute.classList.toggle('muted', isMuted);
      if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
    }
  });
}

/* ========== Confetti ========== */

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  canvas.classList.add('active');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  const colors = ['#00ff9c', '#6eebb8', '#5ee8c4', '#ffd93d', '#ff5a5a'];
  const particles = [];
  const count = 80;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      decay: 0.97
    });
  }

  let frame = 0;
  const maxFrames = 120;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.vx *= p.decay;
      p.vy *= p.decay;
      p.rotation += 5;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 1 - frame / maxFrames;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      canvas.classList.remove('active');
    }
  }

  animate();
}

/* ========== Matrix Background ========== */

function initMatrix() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
  const fontSize = 16;
  let drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = canvas.width / fontSize;
    drops = Array(Math.floor(columns)).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
}

/* ========== Cyber Tips Carousel ========== */

const CYBER_TIPS = [
  '💡 Cyber Tip: Use strong, unique passwords',
  '💡 Cyber Tip: Enable multi-factor authentication',
  '💡 Cyber Tip: Think before clicking unknown links',
  '💡 Cyber Tip: Your curiosity is a superpower 🛡️'
];

let tipIndex = 0;

function showNextTip() {
  if (!tipText || !cyberTips) return;
  tipText.textContent = CYBER_TIPS[tipIndex];
  tipText.classList.remove('fade');
  void tipText.offsetWidth;
  tipText.classList.add('fade');
  tipIndex = (tipIndex + 1) % CYBER_TIPS.length;
}

function startTipsCarousel() {
  cyberTips.classList.add('visible');
  showNextTip();
  setInterval(showNextTip, 4000);
}

/* ========== Utilities ========== */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function appendTyped(element, text, speed = TYPING_SPEED) {
  const prefix = element.textContent ? '\n' : '';
  const full = prefix + text;
  for (let i = 0; i < full.length; i++) {
    element.textContent += full[i];
    await sleep(speed);
  }
}

async function clearTerminal() {
  terminalOutput.textContent = '';
  await sleep(220);
}

function getClientInfo() {
  const ua = navigator.userAgent;
  let os = 'Unknown';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPad')) os = 'iOS';

  let browser = 'Browser';
  if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

  return { device: os, browser, time: new Date().toLocaleString() };
}

/* ========== Flow: Landing (Terminal Boot) ========== */

async function runLanding() {
  if (terminalTitle) {
    terminalTitle.textContent = DEMO_MODE === 'professional' ? 'security_awareness_demo.exe' : 'birthday_firewall.exe';
  }
  if (DEMO_MODE === 'professional' && aboutDemo) aboutDemo.classList.add('visible');

  await appendTyped(terminalOutput, '> 🔐 Booting secure system...');
  await sleep(LINE_DELAY);

  await appendTyped(terminalOutput, '> Verifying access channel...');
  await sleep(LINE_DELAY);

  await appendTyped(terminalOutput, '> Status: LOCKED');
  await sleep(LINE_DELAY);

  if (DEMO_MODE === 'birthday') {
    await appendTyped(terminalOutput, '> Date: 9/Feb');
  } else {
    await appendTyped(terminalOutput, '> Environment: Demo');
  }
  await sleep(450);

  btnAccess.classList.add('visible');
}

/* ========== Flow: Scan Sequence ========== */

async function runScan() {
  btnAccess.disabled = true;
  await clearTerminal();

  if (DEMO_MODE === 'professional') {
    await appendTyped(terminalOutput, '> Initializing security scan...', 26);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Verifying human presence...', 26);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Assessing risk level...', 26);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Threat level: LOW ✓', 26);
  } else {
    await appendTyped(terminalOutput, '> Initializing birthday firewall...', 26);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Checking good vibes...', 26);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Detecting cake packets 🎂...', 26);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Threat level: LOW 😎', 26);
  }
  await sleep(550);

  await runAccessGranted();
}

/* ========== Flow: Access Granted (Confetti + Beep + Glitch) ========== */

async function runAccessGranted() {
  await clearTerminal();

  await appendTyped(terminalOutput, '> ✅ ACCESS GRANTED');
  await sleep(200);

  /* Trigger celebrations */
  playSuccessBeep();
  launchConfetti();
  if (terminal) terminal.classList.add('glitch');
  setTimeout(() => terminal?.classList.remove('glitch'), 400);

  await sleep(LINE_DELAY);

  await appendTyped(terminalOutput, '> Welcome, human 🎉');
  await sleep(LINE_DELAY);

  const info = getClientInfo();
  await appendTyped(terminalOutput, `> Device info visible: ${info.device} / ${info.browser} / ${info.time}`);
  await sleep(LINE_DELAY);

  await appendTyped(terminalOutput, '> (No personal data collected – ethical demo 👀)');
  await sleep(LINE_DELAY);
  await sleep(500);

  await runBirthdayReveal();
}

/* ========== Flow: Birthday Reveal (9/Feb + Profile) ========== */

async function runBirthdayReveal() {
  if (DEMO_MODE === 'professional') {
    await appendTyped(terminalOutput, '\n> You experienced a simulated access flow.');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Curiosity is the most exploited human vulnerability.');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Stay curious. Stay secure. 🔐');
  } else {
    profileSection.classList.add('visible');
    await sleep(350);
    await appendTyped(terminalOutput, '\n> 🎂 HAPPY BIRTHDAY TO ELIE ISHIMWE!');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> You accessed the Cyber Birthday Firewall.');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Built something cyber instead of cutting cake 🎉');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Stay curious. Stay secure 🔐');
  }
  await sleep(400);

  if (DEMO_MODE === 'birthday' && aboutDemo) aboutDemo.classList.add('visible');
  await runFooter();
}

/* ========== Flow: Footer + Share + Tips ========== */

async function runFooter() {
  const lines = DEMO_MODE === 'professional'
    ? ['Built by Elie Ishimwe | Lead Cybersecurity Consultant', 'Educational demo | No data collected']
    : ['Built by Elie Ishimwe', 'Cybersecurity Enthusiast | Blue Team 🛡️', 'Educational demo, no data collected'];

  for (const line of lines) {
    await appendTyped(footerOutput, footerOutput.textContent ? '\n' + line : line);
    await sleep(LINE_DELAY);
  }

  /* Show Cyber Tips after footer */
  startTipsCarousel();
}

/* ========== Profile Image Fallback ========== */

function initProfileImage() {
  const img = document.getElementById('profileImage');
  if (!img) return;

  const sources = ['ishiel.HEIC', 'elie.jpeg', '123.jpg', '123.HEIC', 'profile.jpg'];
  let idx = 0;

  img.onerror = () => {
    idx++;
    if (idx < sources.length) {
      img.src = sources[idx];
    } else {
      img.style.display = 'none';
    }
  };
}

/* ========== Init ========== */

async function init() {
  if (DEMO_MODE === 'professional') {
    document.title = 'Security Awareness Demo | Elie Ishimwe';
  }

  initMatrix();
  initProfileImage();
  initMute();

  btnAccess.addEventListener('click', () => {
    if (!btnAccess.disabled) runScan();
  });

  await runLanding();
}

init();
