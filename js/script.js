/**
 * Cyber Birthday Firewall / Security Awareness Demo
 * Vanilla JS | Client-side only | No tracking | No backend
 * Built by Elie Ishimwe
 */

'use strict';

/* ========== Paths ========== */
const PATHS = {
  audio: 'assets/audio',
  images: 'assets/images'
};

const TYPING_SPEED = 32;
const LINE_DELAY = 280;

/* ========== Mode ========== */
const DEMO_MODE = (() => {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'professional' ? 'professional' : 'birthday';
})();

/* ========== DOM refs ========== */
const terminalOutput = document.getElementById('terminalOutput');
const btnAccess = document.getElementById('btnAccess');
const profileSection = document.getElementById('profileSection');
const footerOutput = document.getElementById('footerOutput');
const terminal = document.getElementById('terminal');
const btnMute = document.getElementById('btnMute');
const btnTheme = document.getElementById('btnTheme');
const tipText = document.getElementById('tipText');
const cyberTips = document.getElementById('cyberTips');
const aboutDemo = document.getElementById('aboutDemo');
const ethicalBadge = document.getElementById('ethicalBadge');
const terminalTitle = document.querySelector('.terminal-title');
const yourInfo = document.getElementById('yourInfo');
const yourInfoContent = document.getElementById('yourInfoContent');
const themeIcon = document.querySelector('.theme-icon');
const themeColorMeta = document.getElementById('themeColor');

if (!terminalOutput || !btnAccess) {
  console.error('Cyber Birthday Firewall: Required DOM elements not found');
}

/* ========== Theme Toggle (Dark/Light) ========== */
const THEMES = { dark: '🌙', light: '☀️' };
let currentTheme = localStorage.getItem('cyber-firewall-theme') || 'dark';

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? THEMES.light : THEMES.dark;
  if (themeColorMeta) themeColorMeta.content = theme === 'dark' ? '#060a0c' : '#e8f4f0';
  localStorage.setItem('cyber-firewall-theme', theme);
}

function initTheme() {
  setTheme(currentTheme);
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const next = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
}

/* ========== Sound + Mute ========== */
let isMuted = false;
let audioContext = null;

function unlockAudio() {
  if (audioContext) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioContext = new Ctx();
    if (audioContext.state === 'suspended') audioContext.resume();
    const buf = audioContext.createBuffer(1, 1, 22050);
    const src = audioContext.createBufferSource();
    src.buffer = buf;
    src.connect(audioContext.destination);
    src.start(0);
  } catch (e) { /* ignore */ }
}

function playSuccessBeep() {
  if (isMuted) return;
  try {
    const beep = new Audio(`${PATHS.audio}/success-beep.mp3`);
    beep.volume = 0.5;
    beep.play().catch(() => playBeepWithWebAudio());
  } catch (e) {
    playBeepWithWebAudio();
  }
}

function playBeepWithWebAudio() {
  try {
    const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => playBeepWithContext(ctx)).catch(() => {});
    } else {
      playBeepWithContext(ctx);
    }
  } catch (e) { /* ignore */ }
}

function playBeepWithContext(ctx) {
  try {
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
  } catch (e) { /* ignore */ }
}

function initMute() {
  if (!btnMute) return;
  const icon = btnMute.querySelector('.mute-icon');
  btnMute.addEventListener('click', () => {
    unlockAudio();
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

/* ========== Confetti (Access Granted) ========== */
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  canvas.classList.add('active');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  const colors = ['#00ff9c', '#88f5c8', '#5ee8c4', '#ffd93d', '#ff5a5a'];
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
    if (frame < maxFrames) requestAnimationFrame(animate);
    else canvas.classList.remove('active');
  }
  animate();
}

/* ========== Matrix Background ========== */
function initMatrix() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const fontSize = 16;
  let drops = [];

  function getColor() {
    return document.documentElement.getAttribute('data-theme') === 'light'
      ? '#006b47'
      : '#0F0';
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getColor();
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
}

/* ========== Cyber Tips Carousel (in footer) ========== */
const CYBER_TIPS = [
  '💡 Use strong, unique passwords for each account',
  '💡 Enable multi-factor authentication (MFA)',
  '💡 Think before clicking unknown links',
  '💡 Your curiosity is a superpower—stay secure 🛡️'
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
  if (cyberTips) cyberTips.classList.add('visible');
  showNextTip();
  setInterval(showNextTip, 4500);
}

/* ========== Utilities ========== */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function appendTyped(element, text, speed = TYPING_SPEED) {
  if (!element) return;
  const prefix = element.textContent ? '\n' : '';
  const full = prefix + text;
  for (let i = 0; i < full.length; i++) {
    element.textContent += full[i];
    await sleep(speed);
  }
}

async function clearTerminal() {
  if (terminalOutput) terminalOutput.textContent = '';
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

  return {
    device: os,
    browser,
    time: new Date().toLocaleString(),
    screen: `${screen.width}×${screen.height}`
  };
}

/* ========== Flow: Landing ========== */
async function runLanding() {
  if (terminalTitle) {
    terminalTitle.textContent = DEMO_MODE === 'professional'
      ? 'security_awareness_demo.exe'
      : 'birthday_firewall.exe';
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

  if (btnAccess) btnAccess.classList.add('visible');
}

/* ========== Flow: Scan ========== */
async function runScan() {
  if (btnAccess) btnAccess.disabled = true;
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

/* ========== Flow: Access Granted ========== */
async function runAccessGranted() {
  await clearTerminal();

  await appendTyped(terminalOutput, '> ✅ ACCESS GRANTED');
  await sleep(200);

  playSuccessBeep();
  launchConfetti();
  if (terminal) terminal.classList.add('glitch');
  setTimeout(() => terminal?.classList.remove('glitch'), 400);

  await sleep(LINE_DELAY);
  await appendTyped(terminalOutput, '> Welcome, human 🎉');
  await sleep(LINE_DELAY);

  const info = getClientInfo();
  await appendTyped(terminalOutput, '\n> Your info visible to this page:');
  await sleep(LINE_DELAY);

  if (yourInfo && yourInfoContent) {
    yourInfoContent.textContent = [
      `Device: ${info.device}`,
      `Browser: ${info.browser}`,
      `Screen: ${info.screen}`,
      `Time: ${info.time}`
    ].join('\n');
    yourInfo.classList.add('visible');
  } else {
    await appendTyped(terminalOutput, `>   Device: ${info.device}`);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, `>   Browser: ${info.browser}`);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, `>   Screen: ${info.screen}`);
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, `>   Time: ${info.time}`);
    await sleep(LINE_DELAY);
  }

  await appendTyped(terminalOutput, '> (No personal data collected – ethical demo 👀)');
  await sleep(LINE_DELAY);

  /* Show ethical badge prominently */
  if (ethicalBadge) ethicalBadge.classList.add('visible');
  await sleep(300);

  startTipsCarousel();
  await sleep(400);
  await runBirthdayReveal();
}

/* ========== Flow: Birthday Reveal ========== */
async function runBirthdayReveal() {
  if (DEMO_MODE === 'professional') {
    await appendTyped(terminalOutput, '\n> You experienced a simulated access flow.');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Curiosity is the most exploited human vulnerability.');
    await sleep(LINE_DELAY);
    await appendTyped(terminalOutput, '> Stay curious. Stay secure. 🔐');
  } else {
    if (profileSection) profileSection.classList.add('visible');
    await sleep(400);
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

/* ========== Flow: Footer ========== */
async function runFooter() {
  if (!footerOutput) return;
  const lines = DEMO_MODE === 'professional'
    ? ['Built by Elie Ishimwe | Lead Cybersecurity Consultant', 'Educational demo | No data collected']
    : ['Built by Elie Ishimwe', 'Cybersecurity Enthusiast | Blue Team 🛡️', 'Educational demo · No data collected'];

  for (const line of lines) {
    await appendTyped(footerOutput, footerOutput.textContent ? '\n' + line : line);
    await sleep(LINE_DELAY);
  }
}

/* ========== Profile Image Fallback ========== */
function initProfileImage() {
  const img = document.getElementById('profileImage');
  if (!img) return;

  const sources = [
    `${PATHS.images}/profile.jpg`,
    `${PATHS.images}/ishiel.HEIC`,
    `${PATHS.images}/elie.jpeg`,
    `${PATHS.images}/123.jpg`,
    `${PATHS.images}/123.HEIC`
  ];
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
  if (!terminalOutput || !btnAccess) return;

  initTheme();
  initMatrix();
  initProfileImage();
  initMute();

  if (DEMO_MODE === 'professional') {
    document.title = 'Security Awareness Demo | Elie Ishimwe';
    const appName = document.getElementById('appName');
    const appTagline = document.getElementById('appTagline');
    if (appName) appName.textContent = 'Security Awareness';
    if (appTagline) appTagline.textContent = 'Educational Demo';
  }

  btnAccess.addEventListener('click', () => {
    unlockAudio();
    if (!btnAccess.disabled) runScan();
  });

  btnAccess.addEventListener('touchend', () => unlockAudio(), { passive: true });

  await runLanding();
}

init();
