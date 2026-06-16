import { useState, useEffect, useRef } from "react";

const WEDDING_DATE = new Date("2026-07-06T00:00:00");

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
`;

/* ─────────────────────────────────────────
   TORN PAPER SVG path (reusable clip edge)
   A ragged horizontal tear pointing downward
───────────────────────────────────────── */
const TEAR_PATH =
  "M0,0 L0,18 Q8,6 16,18 Q24,30 32,18 Q40,6 48,18 Q56,30 64,14 Q72,4 80,18 Q88,30 96,16 Q104,4 112,18 Q120,30 128,14 Q136,4 144,18 Q152,30 160,16 Q168,4 176,18 Q184,30 192,14 Q200,4 208,18 Q216,30 224,14 Q232,4 240,18 Q248,30 256,16 Q264,4 272,18 Q280,30 288,14 Q296,4 304,18 Q312,30 320,14 Q328,4 336,18 Q344,30 352,14 Q360,4 368,18 Q376,30 384,14 Q392,4 400,18 L400,0 Z";

const STYLES = `
* { box-sizing: border-box; margin: 0; padding: 0; }

.invite-root {
  font-family: 'EB Garamond', Georgia, serif;
  background: #faf6f0;
  min-height: 100vh;
  overflow-x: hidden;
  color: #2c1810;
}

/* ═══════════════════════════════════════
   ENVELOPE
═══════════════════════════════════════ */
.envelope-scene {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at 50% 40%, #f5ede0 0%, #e8d8c0 100%);
  z-index: 100;
  transition: opacity 0.7s ease, visibility 0.7s ease;
}
.envelope-scene.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

.envelope-wrap { position: relative; width: 320px; perspective: 900px; }

.envelope-body {
  width: 320px; height: 220px;
  background: linear-gradient(160deg, #fdfaf5 0%, #f0e5d0 100%);
  border-radius: 4px 4px 10px 10px;
  position: relative;
  box-shadow: 0 24px 64px rgba(100,60,20,0.22), inset 0 1px 0 rgba(255,255,255,0.7);
  overflow: visible;
  border: 1px solid rgba(180,140,80,0.25);
}
.env-side-left {
  position: absolute; bottom: 0; left: 0;
  width: 0; height: 0;
  border-bottom: 110px solid #ead6b0;
  border-right: 160px solid transparent;
  z-index: 2;
}
.env-side-right {
  position: absolute; bottom: 0; right: 0;
  width: 0; height: 0;
  border-bottom: 110px solid #dcc89a;
  border-left: 160px solid transparent;
  z-index: 2;
}
.env-bottom {
  position: absolute; bottom: 0; left: 0; right: 0; height: 110px;
  background: linear-gradient(to bottom, #e8d4a8, #d4bc88);
  clip-path: polygon(0 100%, 50% 0%, 100% 100%);
  z-index: 3;
}
.env-flap {
  position: absolute; top: 0; left: 0; right: 0; height: 130px;
  background: linear-gradient(to bottom, #faf3e4, #eddfc0);
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  transform-origin: top center;
  transform-style: preserve-3d;
  transition: transform 0.85s cubic-bezier(0.4,0,0.2,1);
  z-index: 10;
  border-radius: 4px 4px 0 0;
}
.env-flap.open { transform: rotateX(-162deg); }

/* Golden KS wax seal */
.wax-seal {
  position: absolute; top: 68px; left: 50%;
  transform: translateX(-50%);
  width: 68px; height: 68px;
  background: radial-gradient(circle at 35% 32%, #f0d060, #c8960a 55%, #9a6e04 80%, #7a5202);
  border-radius: 50%;
  z-index: 20; cursor: pointer;
  box-shadow: 0 3px 14px rgba(150,100,0,0.55), inset 0 1px 0 rgba(255,240,160,0.5);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  user-select: none;
}
.wax-seal:hover {
  transform: translateX(-50%) scale(1.06);
  box-shadow: 0 6px 22px rgba(150,100,0,0.65);
}
.wax-seal:active { transform: translateX(-50%) scale(0.97); }

.seal-monogram {
  font-family: 'Great Vibes', cursive;
  font-size: 24px;
  color: #fdf5d8;
  pointer-events: none;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(100,60,0,0.5);
  letter-spacing: -1px;
}

/* decorative ring on seal */
.wax-seal::after {
  content: '';
  position: absolute; inset: 5px;
  border-radius: 50%;
  border: 1px solid rgba(255,240,150,0.35);
}

.env-hint {
  text-align: center; margin-top: 22px;
  color: rgba(140,100,40,0.75);
  font-family: 'EB Garamond', serif;
  font-size: 13px; letter-spacing: 0.14em;
  text-transform: uppercase;
  animation: gentle-pulse 2.8s ease-in-out infinite;
}
@keyframes gentle-pulse { 0%,100%{opacity:0.45} 50%{opacity:1} }

/* card entry */
.invite-card {
  opacity: 0; transform: translateY(70px);
  transition: opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1);
  pointer-events: none;
}
.invite-card.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }

/* ═══════════════════════════════════════
   TORN PAPER TRANSITIONS
   Each section uses a pseudo torn edge
═══════════════════════════════════════ */
.torn-bottom {
  position: relative;
}
.torn-bottom::after {
  content: '';
  position: absolute; bottom: -18px; left: 0; right: 0;
  height: 36px;
  background: inherit;
  clip-path: polygon(
    0% 0%, 2.5% 60%, 5% 0%, 7.5% 70%, 10% 10%, 12.5% 55%, 15% 5%,
    17.5% 65%, 20% 0%, 22.5% 75%, 25% 15%, 27.5% 50%, 30% 0%,
    32.5% 68%, 35% 8%, 37.5% 58%, 40% 0%, 42.5% 72%, 45% 12%,
    47.5% 60%, 50% 2%, 52.5% 65%, 55% 0%, 57.5% 70%, 60% 10%,
    62.5% 55%, 65% 0%, 67.5% 68%, 70% 5%, 72.5% 60%, 75% 0%,
    77.5% 72%, 80% 15%, 82.5% 55%, 85% 5%, 87.5% 68%, 90% 0%,
    92.5% 62%, 95% 8%, 97.5% 58%, 100% 0%, 100% 100%, 0% 100%
  );
  z-index: 5;
}
.torn-top {
  position: relative;
}
.torn-top::before {
  content: '';
  position: absolute; top: -18px; left: 0; right: 0;
  height: 36px;
  background: inherit;
  clip-path: polygon(
    0% 100%, 2.5% 40%, 5% 100%, 7.5% 30%, 10% 90%, 12.5% 45%, 15% 95%,
    17.5% 35%, 20% 100%, 22.5% 25%, 25% 85%, 27.5% 50%, 30% 100%,
    32.5% 32%, 35% 92%, 37.5% 42%, 40% 100%, 42.5% 28%, 45% 88%,
    47.5% 40%, 50% 98%, 52.5% 35%, 55% 100%, 57.5% 30%, 60% 90%,
    62.5% 45%, 65% 100%, 67.5% 32%, 70% 95%, 72.5% 40%, 75% 100%,
    77.5% 28%, 80% 85%, 82.5% 45%, 85% 95%, 87.5% 32%, 90% 100%,
    92.5% 38%, 95% 92%, 97.5% 42%, 100% 100%, 100% 0%, 0% 0%
  );
  z-index: 5;
}

/* ═══════════════════════════════════════
   HERO — sky blue, palace, fountain, roses
═══════════════════════════════════════ */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 60px 24px 100px;
  overflow: hidden;
  background: #e8f4fb;
}

.hero-content { position: relative; z-index: 3; }

.wedding-date-top {
  font-family: 'Playfair Display', serif;
  font-size: clamp(12px, 3.5vw, 15px);
  letter-spacing: 0.3em;
  color: #7b4a4a;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.script-name {
  font-family: 'Great Vibes', cursive;
  line-height: 1.1;
  color: #4a1a1a;
}
.groom-name { font-size: clamp(54px, 15vw, 76px); }
.bride-name  { font-size: clamp(54px, 15vw, 76px); }

.ampersand {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(34px, 9vw, 50px);
  color: #8b1a1a;
  margin: -6px 0;
  display: block;
}

.hero-divider {
  width: 110px; height: 1px;
  background: linear-gradient(to right, transparent, #8b2020, transparent);
  margin: 14px auto;
}

.parents-row {
  display: flex; gap: 28px; justify-content: center;
  margin-top: 22px; flex-wrap: wrap;
}
.parent-block { text-align: center; }
.parent-label {
  font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: #8a5550; margin-bottom: 3px;
}
.parent-names {
  font-family: 'EB Garamond', serif; font-style: italic;
  font-size: 14px; color: #5a2a2a; line-height: 1.5;
}

/* ═══════════════════════════════════════
   PARENTS MESSAGE
═══════════════════════════════════════ */
.parents-message-section {
  background: #fdf8f0;
  padding-top: 32px; padding-bottom: 0;
}
.section {
  padding: 56px 24px 64px;
  max-width: 480px; margin: 0 auto;
}
.section-eyebrow {
  font-size: 10px; letter-spacing: 0.24em;
  text-transform: uppercase; color: #8a4040;
  text-align: center; margin-bottom: 8px;
}
.section-title {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(34px, 8.5vw, 46px);
  color: #3a1010; text-align: center;
  line-height: 1.2; margin-bottom: 20px;
}
.section-divider {
  width: 80px; height: 1px;
  background: linear-gradient(to right, transparent, #8b2020, transparent);
  margin: 0 auto 28px;
}
.message-card {
  background: #fff9f2;
  border: 1px solid rgba(140,60,40,0.2);
  border-left: 3px solid #8b2020;
  border-radius: 2px; padding: 28px 24px;
  position: relative;
}
.message-card::before {
  content: '\201C';
  font-family: 'Great Vibes', cursive;
  font-size: 72px; color: rgba(139,32,32,0.18);
  position: absolute; top: -14px; left: 10px;
  line-height: 1;
}
.message-text {
  font-family: 'EB Garamond', serif;
  font-size: 17px; line-height: 1.9;
  color: #3a2020; font-style: italic; text-align: center;
}
.message-sig {
  margin-top: 18px; text-align: center;
  font-size: 12px; letter-spacing: 0.16em;
  text-transform: uppercase; color: #8a5548;
}

/* ═══════════════════════════════════════
   COUNTDOWN — white bg, wine-red numbers
═══════════════════════════════════════ */
.countdown-section {
  background: #ffffff;
  padding-top: 32px;
}
.countdown-section .section-title { color: #3a1010; }
.countdown-section .section-eyebrow { color: #8a4040; }

.countdown-grid {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 10px; margin-top: 6px;
}
.countdown-unit {
  text-align: center;
  background: #fff;
  border: 1.5px solid #c0392b;
  border-radius: 4px;
  padding: 20px 6px 14px;
  box-shadow: 0 2px 12px rgba(192,57,43,0.1);
}
.countdown-num {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 8.5vw, 42px);
  color: #8b1a1a;
  line-height: 1; display: block; font-weight: 600;
}
.countdown-label {
  display: block; font-size: 9px;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: #c0392b; margin-top: 7px;
}

/* ═══════════════════════════════════════
   SCHEDULE — bright crimson bg, white text
═══════════════════════════════════════ */
.schedule-section {
  background: #b71c1c;
  padding-top: 32px;
}
.schedule-section .section-title { color: #fff; }
.schedule-section .section-eyebrow { color: rgba(255,220,210,0.8); }
.schedule-section .section-divider {
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent);
}

.timeline { position: relative; padding-left: 44px; }
.timeline::before {
  content: '';
  position: absolute; left: 13px; top: 8px; bottom: 8px; width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 6px,
    transparent 6px, transparent 12px
  );
}

.timeline-item {
  position: relative; margin-bottom: 28px;
  opacity: 0; transform: translateX(-22px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.timeline-item.visible { opacity: 1; transform: translateX(0); }
.timeline-item:last-child { margin-bottom: 0; }

.timeline-node {
  position: absolute; left: -38px; top: 6px;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff;
  border: 2px solid rgba(255,255,255,0.6);
  box-shadow: 0 0 10px rgba(255,255,255,0.4);
  display: flex; align-items: center; justify-content: center;
}

/* Mini white rose in node */
.node-rose {
  width: 8px; height: 8px; position: relative;
}
.node-rose::before, .node-rose::after {
  content: '';
  position: absolute; border-radius: 50%;
  background: rgba(255,220,210,0.85);
}
.node-rose::before { width: 6px; height: 6px; top: 1px; left: 1px; }
.node-rose::after  { width: 3px; height: 3px; top: 2.5px; left: 2.5px; background: #fff; }

.event-name {
  font-family: 'Great Vibes', cursive;
  font-size: 28px; color: #fff;
  line-height: 1; margin-bottom: 2px;
}
.event-meta {
  font-family: 'EB Garamond', serif;
  font-size: 13px; color: rgba(255,220,210,0.85);
  letter-spacing: 0.07em;
}

/* White rose scroll decoration — appears when item enters view */
.timeline-item .rose-reveal {
  position: absolute; right: 0; top: 0;
  opacity: 0; transform: scale(0.5) rotate(-15deg);
  transition: opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s;
}
.timeline-item.visible .rose-reveal { opacity: 1; transform: scale(1) rotate(0deg); }

/* ═══════════════════════════════════════
   VENUE
═══════════════════════════════════════ */
.venue-section { background: #fdf8f0; padding-top: 32px; }
.venue-section .section-title { color: #3a1010; }
.venue-section .section-eyebrow { color: #8a4040; }

.venue-placeholder {
  width: 100%; height: 220px;
  background: linear-gradient(160deg, #b8d8f0 0%, #7ab8e0 40%, #4a90c0 70%, #2a6898 100%);
  border-radius: 3px; margin-bottom: 24px;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  border: 1px solid rgba(74,144,192,0.3);
}
.venue-name {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 600; color: #3a1010; margin-bottom: 8px;
}
.venue-address {
  font-family: 'EB Garamond', serif;
  font-size: 16px; color: #6a4040; line-height: 1.75; margin-bottom: 24px;
}
.directions-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: #8b1a1a; color: #fdf0e8;
  font-family: 'EB Garamond', serif; font-size: 14px;
  letter-spacing: 0.13em; text-transform: uppercase;
  padding: 13px 28px; border-radius: 2px;
  border: 1px solid #c0392b;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s; cursor: pointer;
}
.directions-btn:hover { background: #a82020; box-shadow: 0 4px 18px rgba(139,26,26,0.35); }

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
.invite-footer {
  background: #fdf8f0; border-top: 1px solid rgba(139,32,32,0.15);
  text-align: center; padding: 44px 24px 56px;
}
.footer-script {
  font-family: 'Great Vibes', cursive; font-size: 40px; color: #8b1a1a; margin-bottom: 8px;
}
.footer-sub {
  font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #a07060;
}

/* scroll reveal base */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
`;

/* ─────────────────────────────────────────
   HERO SVG BACKGROUND
   Sky-blue sky, palace, fountain, roses
───────────────────────────────────────── */
function HeroBg() {
  return (
    <svg
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1 }}
      viewBox="0 0 400 700"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8e8f8"/>
          <stop offset="40%" stopColor="#a0d0f0"/>
          <stop offset="80%" stopColor="#d0eaf8"/>
          <stop offset="100%" stopColor="#e8f4fb"/>
        </linearGradient>
        <radialGradient id="sunGlow" cx="70%" cy="18%" r="30%">
          <stop offset="0%" stopColor="#fff9e0" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#c8e8f8" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e8f5fc"/>
          <stop offset="100%" stopColor="#b8d8f0"/>
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="400" height="700" fill="url(#skyGrad)"/>
      <rect width="400" height="700" fill="url(#sunGlow)"/>

      {/* Clouds */}
      {[[60,45,55,22],[150,30,70,28],[280,55,60,24],[340,38,45,18]].map(([x,y,w,h],i)=>(
        <ellipse key={i} cx={x} cy={y} rx={w} ry={h} fill="white" opacity="0.65"/>
      ))}
      {[[75,50,35,16],[230,42,50,20],[310,48,38,15]].map(([x,y,w,h],i)=>(
        <ellipse key={"c2"+i} cx={x} cy={y} rx={w} ry={h} fill="white" opacity="0.5"/>
      ))}

      {/* ── PALACE ── */}
      {/* Main body */}
      <rect x="60" y="260" width="280" height="300" fill="#e8ddd0"/>
      <rect x="60" y="260" width="280" height="300" fill="rgba(180,160,130,0.25)"/>
      {/* Side wings */}
      <rect x="20" y="290" width="80" height="270" fill="#ddd0c0"/>
      <rect x="300" y="290" width="80" height="270" fill="#d5c8b5"/>
      {/* Grand central dome */}
      <ellipse cx="200" cy="200" rx="60" ry="70" fill="#e0d4c4"/>
      <ellipse cx="200" cy="200" rx="50" ry="60" fill="#e8ddd0"/>
      <rect x="165" y="200" width="70" height="80" fill="#e8ddd0"/>
      {/* Dome top spire */}
      <polygon points="200,120 195,200 205,200" fill="#c8b898"/>
      <circle cx="200" cy="118" r="5" fill="#d4a820"/>
      {/* Small side domes */}
      <ellipse cx="120" cy="245" rx="30" ry="36" fill="#ddd0c0"/>
      <rect x="100" y="245" width="40" height="50" fill="#ddd0c0"/>
      <polygon points="120,210 116,245 124,245" fill="#c0b090"/>
      <ellipse cx="280" cy="245" rx="30" ry="36" fill="#d5c8b5"/>
      <rect x="260" y="245" width="40" height="50" fill="#d5c8b5"/>
      <polygon points="280,210 276,245 284,245" fill="#b8a880"/>
      {/* Pillars on main facade */}
      {[80,105,130,160,185,215,240,270,295,320].map(x=>(
        <rect key={x} x={x} y="320" width="10" height="240" fill="rgba(180,160,120,0.5)" rx="2"/>
      ))}
      {/* Arch entrance */}
      <path d="M172 560 L172 430 Q200 400 228 430 L228 560Z" fill="#c8b898"/>
      <path d="M178 560 L178 435 Q200 408 222 435 L222 560Z" fill="#1a0a05" opacity="0.7"/>
      {/* Windows palace */}
      {[[90,330],[130,330],[175,330],[225,330],[270,330],[310,330],
        [90,390],[130,390],[175,390],[225,390],[270,390],[310,390],
        [90,450],[310,450]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="22" height="30" rx="10" fill="#f0e8d0" opacity="0.7"/>
      ))}
      {/* Balcony rail */}
      <rect x="145" y="380" width="110" height="5" fill="#c8b898"/>
      {[148,158,168,178,188,198,208,218,228,238,248].map(x=>(
        <rect key={x} x={x} y="358" width="4" height="22" fill="#c8b898" rx="1"/>
      ))}

      {/* ── FOUNTAIN ── */}
      {/* Base pool */}
      <ellipse cx="200" cy="590" rx="70" ry="18" fill="#8cc8e8" opacity="0.55"/>
      <ellipse cx="200" cy="590" rx="60" ry="14" fill="#a0d0f0" opacity="0.4"/>
      {/* Basin */}
      <ellipse cx="200" cy="575" rx="42" ry="10" fill="#b8d8f0" opacity="0.7"/>
      <path d="M160 575 Q162 590 165 592 Q200 600 235 592 Q238 590 240 575Z" fill="#a0cce8" opacity="0.6"/>
      {/* Pedestal */}
      <rect x="196" y="540" width="8" height="38" fill="#d0c0a8" rx="2"/>
      <ellipse cx="200" cy="540" rx="18" ry="6" fill="#ddd0bc"/>
      {/* Tier 2 */}
      <ellipse cx="200" cy="525" rx="28" ry="7" fill="#c8baa8" opacity="0.7"/>
      <path d="M172 525 Q174 537 178 539 Q200 544 222 539 Q226 537 228 525Z" fill="#90b8d0" opacity="0.5"/>
      {/* Water jets */}
      {[[-20,-50],[-10,-58],[0,-62],[10,-58],[20,-50]].map(([dx,dy],i)=>(
        <path key={i}
          d={`M200,522 Q${200+dx*0.5},${522+dy*0.6} ${200+dx},${522+dy}`}
          stroke="#90ccf0" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round"/>
      ))}
      {/* Ripple rings */}
      <ellipse cx="200" cy="590" rx="50" ry="12" fill="none" stroke="#7abce0" strokeWidth="0.8" opacity="0.4"/>
      <ellipse cx="200" cy="590" rx="38" ry="9"  fill="none" stroke="#7abce0" strokeWidth="0.6" opacity="0.3"/>

      {/* ── ROSES at bottom ── */}
      {/* White roses left cluster */}
      {[
        [18,645],[38,635],[58,650],[78,638],[12,665],[42,658],[68,662]
      ].map(([x,y],i)=>(
        <g key={"wr"+i} transform={`translate(${x},${y})`}>
          {[0,51,102,153,204,255,306].map(a=>(
            <ellipse key={a} rx="7" ry="11" fill="white" opacity="0.85"
              transform={`rotate(${a}) translate(0,-7)`}/>
          ))}
          <circle r="4" fill="#f0f0f0"/>
          <circle r="2" fill="#e8e0d0"/>
        </g>
      ))}
      {/* Red roses right cluster */}
      {[
        [322,645],[342,635],[362,650],[382,638],[328,665],[358,658],[388,662]
      ].map(([x,y],i)=>(
        <g key={"rr"+i} transform={`translate(${x},${y})`}>
          {[0,51,102,153,204,255,306].map(a=>(
            <ellipse key={a} rx="7" ry="11" fill="#c0392b" opacity="0.85"
              transform={`rotate(${a}) translate(0,-7)`}/>
          ))}
          <circle r="4" fill="#e74c3c"/>
          <circle r="2" fill="#c0392b"/>
        </g>
      ))}
      {/* Mixed center bottom */}
      {[
        [155,660],[175,648],[195,658],[215,648],[235,658],[255,660]
      ].map(([x,y],i)=>(
        <g key={"mr"+i} transform={`translate(${x},${y})`}>
          {[0,51,102,153,204,255,306].map(a=>(
            <ellipse key={a} rx="6" ry="10"
              fill={i%2===0?"white":"#c0392b"} opacity="0.8"
              transform={`rotate(${a}) translate(0,-6)`}/>
          ))}
          <circle r="3" fill={i%2===0?"#f5f0e8":"#e74c3c"}/>
        </g>
      ))}
      {/* Leaves */}
      {[[30,655],[65,655],[110,658],[155,670],[245,670],[290,658],[335,655],[370,655]].map(([x,y],i)=>(
        <ellipse key={"lf"+i} cx={x} cy={y} rx="12" ry="5"
          fill="#4a8a3a" opacity="0.55" transform={`rotate(${-20+i*5},${x},${y})`}/>
      ))}
    </svg>
  );
}

/* Small white rose SVG for timeline */
function WhiteRose({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {[0,51,102,153,204,255,306].map(a=>(
        <ellipse key={a} cx="20" cy="20" rx="7" ry="12"
          fill="white" opacity="0.8"
          transform={`rotate(${a},20,20) translate(0,-7)`}/>
      ))}
      <circle cx="20" cy="20" r="5" fill="#f5f0ea"/>
      <circle cx="20" cy="20" r="2.5" fill="#ece4da"/>
    </svg>
  );
}

const EVENTS = [
  { name: "Haldi",        time: "Morning Ritual",        note: "Turmeric blessings & joy" },
  { name: "Carnival",     time: "Afternoon Festivities", note: "Colours, music & celebration" },
  { name: "Nikasi",       time: "Groom's Procession",    note: "Baraat & grand arrival" },
  { name: "Reception",    time: "Evening Welcome",       note: "Formal reception of guests" },
  { name: "Chauri",       time: "Sacred Ceremony",       note: "The holy wedding rounds" },
  { name: "Mayera",       time: "Maternal Blessing",     note: "Gifts from the bride's family" },
  { name: "Bahu Welcome", time: "Joyful Homecoming",     note: "Welcoming the new daughter home" },
];

function useCountdown(target) {
  const [time, setTime] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ d:0, h:0, m:0, s:0 }); return; }
      setTime({
        d: Math.floor(diff/86400000),
        h: Math.floor((diff%86400000)/3600000),
        m: Math.floor((diff%3600000)/60000),
        s: Math.floor((diff%60000)/1000),
      });
    };
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  }, [target]);
  return time;
}

export default function WeddingInvitation() {
  const [opened, setOpened]       = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const time   = useCountdown(WEDDING_DATE.getTime());
  const tlRefs = useRef([]);
  const revealRefs = useRef([]);

  const handleSeal = () => {
    setOpened(true);
    setTimeout(() => setCardVisible(true), 650);
  };

  useEffect(() => {
    if (!cardVisible) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    [...tlRefs.current, ...revealRefs.current].forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [cardVisible]);

  const pad = n => String(n).padStart(2,'0');

  return (
    <>
      <style>{FONTS}{STYLES}</style>
      <div className="invite-root">

        {/* ══ ENVELOPE ══ */}
        <div className={`envelope-scene${opened?' hidden':''}`}>
          <div className="envelope-wrap">
            <div className="envelope-body">
              <div className={`env-flap${opened?' open':''}`}/>
              <div className="env-side-left"/>
              <div className="env-side-right"/>
              <div className="env-bottom"/>
              <div className="wax-seal" onClick={handleSeal} role="button" aria-label="Open invitation">
                <span className="seal-monogram">KS</span>
              </div>
            </div>
            <p className="env-hint">Tap the seal to open</p>
          </div>
        </div>

        {/* ══ INVITATION CARD ══ */}
        <div className={`invite-card${cardVisible?' visible':''}`}>

          {/* ── HERO ── */}
          <section className="hero torn-bottom" style={{"--tear-bg":"#e8f4fb"}}>
            <HeroBg/>
            <div className="hero-content">
              <p className="wedding-date-top">Monday · 06 July · 2026</p>
              <div className="hero-divider"/>

              <div className="script-name groom-name">Krishnakant</div>
              <span className="ampersand">&amp;</span>
              <div className="script-name bride-name">Suruchi</div>

              <div className="hero-divider"/>

              <div className="parents-row">
                <div className="parent-block">
                  <p className="parent-label">Groom's Parents</p>
                  <p className="parent-names">
                    Manoj Bhutada<br/>Kavita Bhutada
                  </p>
                </div>
                <div className="parent-block">
                  <p className="parent-label">Bride's Parents</p>
                  <p className="parent-names">
                    Balasaheb Bhujbal<br/>Vanita Bhujbal
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── PARENTS' MESSAGE ── */}
          <section className="parents-message-section torn-bottom torn-top">
            <div className="section">
              <p className="section-eyebrow">With Love &amp; Blessings</p>
              <h2 className="section-title">A Message From<br/>Our Families</h2>
              <div className="section-divider"/>
              <div className="message-card reveal" ref={el=>revealRefs.current[0]=el}>
                <p className="message-text">
                  With hearts overflowing with gratitude and joy, the Bhutada and Bhujbal families
                  warmly invite you to be part of this beautiful union. Your presence will make
                  Krishnakant and Suruchi's celebration truly complete — please grace us with your
                  company as our two families joyfully become one.
                </p>
                <p className="message-sig">— The Bhutada &amp; Bhujbal Families</p>
              </div>
            </div>
          </section>

          {/* ── COUNTDOWN ── */}
          <section className="countdown-section torn-bottom torn-top">
            <div className="section reveal" ref={el=>revealRefs.current[1]=el}>
              <p className="section-eyebrow">The Celebration Begins In</p>
              <h2 className="section-title">Counting Down</h2>
              <div className="section-divider"/>
              <div className="countdown-grid">
                {[[pad(time.d),"Days"],[pad(time.h),"Hours"],[pad(time.m),"Minutes"],[pad(time.s),"Seconds"]].map(([v,l])=>(
                  <div className="countdown-unit" key={l}>
                    <span className="countdown-num">{v}</span>
                    <span className="countdown-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SCHEDULE ── */}
          <section className="schedule-section torn-bottom torn-top">
            <div className="section">
              <p className="section-eyebrow">Programme of Events</p>
              <h2 className="section-title">Schedule of<br/>Celebrations</h2>
              <div className="section-divider"/>
              <div className="timeline">
                {EVENTS.map((ev,i)=>(
                  <div
                    key={ev.name}
                    className="timeline-item"
                    ref={el=>tlRefs.current[i]=el}
                    style={{transitionDelay:`${i*90}ms`}}
                  >
                    <div className="timeline-node">
                      <div className="node-rose"/>
                    </div>
                    <div className="event-name">{ev.name}</div>
                    <div className="event-meta">{ev.time} · {ev.note}</div>
                    <div className="rose-reveal" style={{right:0,top:0}}>
                      <WhiteRose size={26}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── VENUE ── */}
          <section className="venue-section torn-top">
            <div className="section reveal" ref={el=>revealRefs.current[2]=el}>
              <p className="section-eyebrow">Join Us At</p>
              <h2 className="section-title">Venue &amp; Travel</h2>
              <div className="section-divider"/>
              <VenuePlaceholder/>
              <p className="venue-name">[Wedding Venue Name]</p>
              <p className="venue-address">
                [Street Address]<br/>
                [City, State, PIN Code]<br/>
                India
              </p>
              <a
                className="directions-btn"
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Get Directions
              </a>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="invite-footer">
            <div className="footer-script">Krishnakant &amp; Suruchi</div>
            <p className="footer-sub">06 · 07 · 2026 &nbsp;·&nbsp; With Love</p>
          </footer>

        </div>
      </div>
    </>
  );
}

/* ── Venue Placeholder ── */
function VenuePlaceholder() {
  return (
    <div className="venue-placeholder">
      <svg viewBox="0 0 400 220" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} aria-hidden="true">
        <defs>
          <linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8d8f0"/>
            <stop offset="60%" stopColor="#8abcd8"/>
            <stop offset="100%" stopColor="#6098b8"/>
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#vSky)"/>
        {/* Clouds */}
        <ellipse cx="80" cy="35" rx="45" ry="18" fill="white" opacity="0.55"/>
        <ellipse cx="300" cy="28" rx="55" ry="20" fill="white" opacity="0.5"/>
        {/* Palace */}
        <rect x="80" y="100" width="240" height="120" fill="#e8ddd0"/>
        <ellipse cx="200" cy="85" rx="40" ry="48" fill="#e0d4c4"/>
        <rect x="170" y="85" width="60" height="60" fill="#e0d4c4"/>
        <polygon points="200,42 196,85 204,85" fill="#c8b898"/>
        <circle cx="200" cy="40" r="4" fill="#d4a820"/>
        <ellipse cx="130" cy="105" rx="22" ry="26" fill="#d8ccbc"/>
        <rect x="116" y="105" width="28" height="40" fill="#d8ccbc"/>
        <ellipse cx="270" cy="105" rx="22" ry="26" fill="#d0c4b4"/>
        <rect x="256" y="105" width="28" height="40" fill="#d0c4b4"/>
        {[90,115,140,170,195,225,250,275,300].map(x=>(
          <rect key={x} x={x} y="118" width="8" height="102" fill="rgba(180,160,120,0.45)" rx="1"/>
        ))}
        <path d="M180 220 L180 155 Q200 135 220 155 L220 220Z" fill="#b0a090"/>
        {[[98,130],[128,130],[168,130],[212,130],[252,130],[292,130]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="18" height="24" rx="8" fill="#f0e8d0" opacity="0.65"/>
        ))}
        <rect x="0" y="205" width="400" height="15" fill="#4a8a3a" opacity="0.6"/>
        <rect x="0" y="210" width="400" height="10" fill="#3a7a2a" opacity="0.5"/>
      </svg>
    </div>
  );
}