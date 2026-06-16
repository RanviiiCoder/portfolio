/**
 * bg.js — 3D Animated SaaS-Style Background
 * Features: Receding perspective grid, floating glow orbs,
 * drifting particles, sweeping light beams, vignette.
 */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, rafId;
  let t = 0; // global time counter

  // ─── CONFIG ─────────────────────────────────────────────────
  const CFG = {
    grid: {
      lines: 14,           // number of vertical/horizontal grid lines
      speed: 0.35,         // scroll speed (lower = slower)
      color: 'rgba(147, 51, 234, 0.18)',   // purple grid
      horizonY: 0.52,      // horizon as fraction of height
      fov: 0.9,            // perspective field-of-view factor
    },
    orbs: [
      { x: 0.15, y: 0.2,  r: 0.28, color: [120, 40, 220],  speed: 0.00018, phase: 0 },
      { x: 0.82, y: 0.75, r: 0.22, color: [220, 40, 130],  speed: 0.00025, phase: 2.1 },
      { x: 0.5,  y: 0.45, r: 0.18, color: [80,  60, 230],  speed: 0.00014, phase: 4.3 },
    ],
    particles: { count: 90, color: [180, 100, 255] },
    beam: { interval: 220, duration: 60, color: 'rgba(200, 100, 255, 0.055)' },
    vignette: { strength: 0.65 },
  };

  // ─── STATE ───────────────────────────────────────────────────
  let particles = [];
  let beamTimer = 0;
  let beamActive = false;
  let beamProgress = 0;
  let beamY = 0;

  // ─── RESIZE ──────────────────────────────────────────────────
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = canvas.width  = window.innerWidth  * dpr;
    H = canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    W = window.innerWidth;
    H = window.innerHeight;
    initParticles();
  }

  // ─── PARTICLES ───────────────────────────────────────────────
  function initParticles() {
    particles = [];
    for (let i = 0; i < CFG.particles.count; i++) {
      particles.push(createParticle());
    }
  }

  function createParticle(forceTop = false) {
    return {
      x: Math.random() * W,
      y: forceTop ? Math.random() * H * 0.1 : Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.18 + 0.04),
      alpha: Math.random() * 0.55 + 0.15,
      life: Math.random(),
    };
  }

  // ─── DRAW: GRID ──────────────────────────────────────────────
  function drawGrid() {
    const hy = H * CFG.grid.horizonY;   // horizon y
    const fov = CFG.grid.fov;
    const lines = CFG.grid.lines;
    const speed = CFG.grid.speed;
    // scroll offset (0..1, loops)
    const offset = (t * speed) % 1;

    ctx.save();
    ctx.strokeStyle = CFG.grid.color;
    ctx.lineWidth = 1;

    // ── Horizontal lines (receding rows) ──
    for (let i = 0; i <= lines; i++) {
      // 'p' goes 0..1 representing depth percentage, offset scrolls them
      const p = ((i / lines) + offset) % 1;
      // perspective mapping: p=0 → horizon, p=1 → bottom
      const y = hy + (H - hy) * Math.pow(p, fov);

      // fade out near horizon
      const alpha = Math.min(1, p * 3.5) * 0.55;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // ── Vertical lines (converging to vanishing point) ──
    const vpx = W * 0.5; // vanishing point x = center
    ctx.globalAlpha = 1;
    for (let i = 0; i <= lines; i++) {
      const px = (i / lines); // 0..1 horizontal position at bottom
      const bx = px * W;       // x at bottom
      // fade edges
      const edgeDist = Math.abs(px - 0.5) * 2; // 0 center → 1 edge
      ctx.globalAlpha = (1 - edgeDist * 0.7) * 0.45;
      ctx.strokeStyle = CFG.grid.color;
      ctx.beginPath();
      ctx.moveTo(vpx, hy);
      ctx.lineTo(bx, H);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ─── DRAW: GRADIENT ORBS ─────────────────────────────────────
  function drawOrbs() {
    CFG.orbs.forEach(orb => {
      const time = t * orb.speed;
      // gentle floating motion
      const cx = (orb.x + Math.sin(time + orb.phase) * 0.06) * W;
      const cy = (orb.y + Math.cos(time * 0.7 + orb.phase) * 0.05) * H;
      const radius = orb.r * Math.min(W, H);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      const [r, g, b] = orb.color;
      grad.addColorStop(0,   `rgba(${r},${g},${b}, 0.18)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b}, 0.06)`);
      grad.addColorStop(1,   `rgba(${r},${g},${b}, 0)`);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ─── DRAW: PARTICLES ─────────────────────────────────────────
  function drawParticles() {
    const [r, g, b] = CFG.particles.color;
    particles.forEach((p, i) => {
      // update
      p.x += p.vx;
      p.y += p.vy;
      p.life += 0.003;

      // twinkle
      const twinkle = 0.5 + 0.5 * Math.sin(p.life * Math.PI * 2 * 1.5 + i);
      const alpha = p.alpha * twinkle;

      // recycle off-screen or faded
      if (p.y < -10 || p.x < -10 || p.x > W + 10) {
        particles[i] = createParticle(true);
        particles[i].x = Math.random() * W;
        return;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
      ctx.shadowBlur = p.r * 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ─── DRAW: LIGHT BEAM ────────────────────────────────────────
  function drawBeam() {
    beamTimer++;
    if (beamTimer >= CFG.beam.interval && !beamActive) {
      beamActive = true;
      beamProgress = 0;
      beamTimer = 0;
      // random y in upper half
      beamY = H * (0.05 + Math.random() * 0.45);
    }

    if (!beamActive) return;

    beamProgress++;
    const fade = beamProgress < CFG.beam.duration * 0.4
      ? beamProgress / (CFG.beam.duration * 0.4)
      : 1 - (beamProgress - CFG.beam.duration * 0.4) / (CFG.beam.duration * 0.6);

    if (beamProgress >= CFG.beam.duration) {
      beamActive = false;
      return;
    }

    const beamH = H * 0.02;
    ctx.save();
    ctx.globalAlpha = fade * 0.8;
    const grad = ctx.createLinearGradient(0, beamY, W, beamY);
    grad.addColorStop(0,   'transparent');
    grad.addColorStop(0.2, CFG.beam.color);
    grad.addColorStop(0.5, 'rgba(220,120,255,0.08)');
    grad.addColorStop(0.8, CFG.beam.color);
    grad.addColorStop(1,   'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, beamY - beamH / 2, W, beamH);
    ctx.restore();
  }

  // ─── DRAW: VIGNETTE ──────────────────────────────────────────
  function drawVignette() {
    const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, `rgba(5, 2, 10, ${CFG.vignette.strength})`);
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // ─── DRAW: HORIZON GLOW ──────────────────────────────────────
  function drawHorizonGlow() {
    const hy = H * CFG.grid.horizonY;
    const grad = ctx.createLinearGradient(0, hy - 60, 0, hy + 60);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.07)');
    grad.addColorStop(1, 'transparent');
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(0, hy - 60, W, 120);
    ctx.restore();
  }

  // ─── MAIN LOOP ───────────────────────────────────────────────
  function loop() {
    t++;

    // Clear with deep background color
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0b0713';
    ctx.fillRect(0, 0, W, H);

    drawOrbs();
    drawGrid();
    drawHorizonGlow();
    drawBeam();
    drawParticles();
    drawVignette();

    rafId = requestAnimationFrame(loop);
  }

  // ─── INIT ────────────────────────────────────────────────────
  resize();
  window.addEventListener('resize', resize);

  // Pause when tab hidden (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      loop();
    }
  });

  // Respect prefers-reduced-motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches) {
    loop();
  } else {
    // Static render only — one frame
    resize();
    t = 60; // mid-animation snapshot
    ctx.fillStyle = '#0b0713';
    ctx.fillRect(0, 0, W, H);
    drawOrbs();
    drawVignette();
  }
})();
