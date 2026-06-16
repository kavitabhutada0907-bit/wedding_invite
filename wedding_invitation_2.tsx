import { useState, useEffect, useRef } from "react";
import heroPhoto from "./DSC05133.png";
import sealImage from "./seal image.png";
import sealLetterImage from "./seal_letter_image.jpeg";
import venuePhoto from "./Naivedyam_image.jpg";
import wardrobePlanner from "./Wadrobe_planner.jpeg";
import bgMusic from "./Swing-Machine-chosic.com_.mp3";
import pigeonImg from "./—Pngtree—pigeon_183080.png";

const WEDDING_DATE = new Date("2026-07-06T00:00:00");

const FONTS = <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');`}</style>;

const STYLES = <style>{`
* { box-sizing: border-box; margin: 0; padding: 0; }

.invite-root {
font-family: 'EB Garamond', Georgia, serif;
background: #faf6f0;
min-height: 100vh;
overflow-x: hidden;
color: #2c1810;
}

/* ═══════════════════════════════════════
   SCROLL OPENING
═══════════════════════════════════════ */
@keyframes gentle-pulse { 0%,100%{opacity:0.45} 50%{opacity:1} }
@keyframes float-scroll {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-8px); }
}
@keyframes flicker {
  0%,100% { opacity: 1; } 40% { opacity: 0.75; } 60% { opacity: 0.9; }
}

.opening-scene {
  position: fixed; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: radial-gradient(ellipse at 50% 40%, #2a1a0e 0%, #0e0804 100%);
  z-index: 100;
  overflow: hidden;
  transition: opacity 0.6s ease 0.2s, visibility 0.6s ease 0.2s;
}
/* ambient candlelight particles */
.opening-scene::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 70%, rgba(180,100,20,0.13) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 30%, rgba(160,80,10,0.10) 0%, transparent 55%);
  pointer-events: none;
}
.opening-scene.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

/* ── Scroll stage ── */
.scroll-stage {
  position: relative;
  width: min(72vw, 300px);
  max-height: 78vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6vh 0;
  animation: float-scroll 3.6s ease-in-out infinite;
  transition: animation 0.3s, transform 1.1s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease;
}
.opening-scene.opening .scroll-stage {
  animation: none;
}

/* ── Half-open reveal: parchment splits apart vertically, site rises from the gap ── */
.opening-scene.opening .scroll-stage .scroll-rod.top-rod {
  transform: translateY(-46vh);
  transition: transform 1.1s cubic-bezier(0.76,0,0.24,1);
}
.opening-scene.opening .scroll-stage .scroll-rod.bottom-rod {
  transform: translateY(46vh);
  transition: transform 1.1s cubic-bezier(0.76,0,0.24,1);
}
.opening-scene.opening .scroll-stage .scroll-body {
  transform: scaleY(0.05);
  opacity: 0;
  transition: transform 0.9s cubic-bezier(0.6,0,0.3,1) 0.15s, opacity 0.5s ease 0.15s;
}

/* The scroll body — aged parchment, smaller, framed by wooden handles */
.scroll-body {
  position: relative;
  width: 100%;
  min-height: 220px;
  background:
    radial-gradient(ellipse at 25% 20%, rgba(120,80,30,0.18) 0%, transparent 45%),
    radial-gradient(ellipse at 80% 85%, rgba(110,70,25,0.20) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 10%, rgba(140,95,40,0.12) 0%, transparent 40%),
    linear-gradient(135deg, #ecdcb6 0%, #e3cd9d 30%, #ead9ad 60%, #ddc794 100%);
  border-radius: 2px;
  box-shadow:
    0 0 0 1px #b8915a,
    0 0 0 4px #f7ecd2,
    0 0 0 5px #b8915a,
    0 14px 36px rgba(20,8,0,0.55),
    inset 0 0 40px rgba(90,55,15,0.35),
    inset 0 2px 0 rgba(255,255,255,0.25),
    inset 0 -2px 0 rgba(0,0,0,0.18);
  overflow: hidden;
  transform-origin: center center;
  transition: none;
}

/* Aged parchment texture: fibers + foxing spots + vignette */
.scroll-body::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent, transparent 21px,
      rgba(150,110,55,0.08) 21px, rgba(150,110,55,0.08) 22px
    ),
    radial-gradient(circle at 18% 30%, rgba(120,80,30,0.22) 0%, transparent 7%),
    radial-gradient(circle at 75% 60%, rgba(110,70,25,0.18) 0%, transparent 9%),
    radial-gradient(circle at 60% 15%, rgba(130,90,40,0.15) 0%, transparent 6%),
    radial-gradient(circle at 30% 85%, rgba(110,70,25,0.2) 0%, transparent 8%),
    radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(70,40,10,0.28) 100%);
  pointer-events: none;
  z-index: 1;
}

/* inner content area */
.scroll-content {
  position: relative;
  z-index: 2;
  padding: 28px 26px 24px;
  text-align: center;
}
.scroll-ganesh {
  font-family: 'EB Garamond', serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(90,50,10,0.7);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.scroll-names {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(36px, 10vw, 54px);
  color: #5a2800;
  line-height: 1.05;
  text-shadow: 0 2px 6px rgba(90,40,0,0.2);
  opacity: 0;
  transform: translateY(6px) scale(0.95);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
}
.scroll-names.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.scroll-amp {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(22px, 6vw, 32px);
  color: #8b4513;
  display: block;
  margin: -4px 0;
  opacity: 0;
  transition: opacity 0.45s ease 0.12s;
}
.scroll-amp.revealed {
  opacity: 1;
}
.scroll-date {
  margin-top: 12px;
  font-family: 'Playfair Display', serif;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7a4010;
  border-top: 1px solid rgba(150,100,40,0.4);
  border-bottom: 1px solid rgba(150,100,40,0.4);
  padding: 5px 0;
}
/* decorative divider line */
.scroll-divider {
  width: 60%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(150,100,40,0.5), transparent);
  margin: 10px auto;
}

/* ── Wooden handle ends (top + bottom dowels) ── */
.scroll-rod {
  width: calc(100% + 24px);
  height: 18px;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(0,0,0,0.08) 0px, transparent 2px, transparent 6px
    ),
    linear-gradient(180deg,
      #9c6b3e 0%, #b9824f 22%, #8a5c33 50%, #6f4626 78%, #5a371c 100%
    );
  border-radius: 9px;
  box-shadow:
    0 3px 8px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.25),
    inset 0 -2px 3px rgba(0,0,0,0.35);
  position: relative;
  z-index: 5;
  flex-shrink: 0;
}
/* wooden finial knobs */
.scroll-rod::before,
.scroll-rod::after {
  content: '';
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 22px; height: 26px;
  background: radial-gradient(circle at 35% 30%, #c79a63 0%, #8a5c33 55%, #5a371c 100%);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.2);
}
.scroll-rod::before { left: -10px; }
.scroll-rod::after  { right: -10px; }

/* ── Wax seal: click-to-start, sits on top of the parchment ── */
.scroll-seal-btn {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: clamp(86px, 26vw, 130px);
  height: clamp(86px, 26vw, 130px);
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  z-index: 30;
  padding: 0;
  filter: drop-shadow(0 8px 20px rgba(60,15,0,0.6));
  transition: transform 0.3s ease, filter 0.3s ease;
}
.scroll-seal-btn:hover {
  transform: translate(-50%, -50%) scale(1.08);
  filter: drop-shadow(0 12px 28px rgba(60,15,0,0.75));
}
.scroll-seal-btn:active {
  transform: translate(-50%, -50%) scale(0.96);
}
.opening-scene.opening .scroll-seal-btn,
.scroll-seal-btn.broken {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
}
.scroll-seal-img {
  width: 100%; height: 100%;
  display: block; object-fit: contain;
  pointer-events: none;
}

/* ── Opening animation: parchment splits top/bottom, site rises through the gap ── */
/* fade out the whole dark backdrop after the parchment opens */
.opening-scene.opening { pointer-events: none; }

/* hint text */
.open-hint {
  position: relative; z-index: 2;
  text-align: center; margin-top: 18px;
  color: rgba(220,190,130,0.8);
  font-family: 'EB Garamond', serif;
  font-size: 13px; letter-spacing: 0.16em;
  text-transform: uppercase;
  animation: gentle-pulse 2.8s ease-in-out infinite;
  transition: opacity 0.3s ease;
}
.opening-scene.opening .open-hint { opacity: 0; }

/* card entry — pops out from the center of the parchment */
@keyframes pop-from-parchment {
  0%   { opacity: 0; transform: scale(0.05) translateY(0); clip-path: ellipse(8% 8% at 50% 0%); }
  35%  { opacity: 1; clip-path: ellipse(55% 40% at 50% 0%); }
  65%  { transform: scale(1.03) translateY(-10px); clip-path: ellipse(100% 80% at 50% 0%); }
  82%  { transform: scale(0.98) translateY(4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); clip-path: ellipse(200% 200% at 50% 0%); }
}
.invite-card {
  opacity: 0;
  pointer-events: none;
}
.invite-card.visible {
  opacity: 1;
  pointer-events: auto;
  animation: pop-from-parchment 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
.hero {
min-height: 100vh;
position: relative;
display: flex; flex-direction: column;
align-items: center; justify-content: flex-start;
text-align: center;
padding: 110px 24px 120px;
overflow: hidden;
background-color: #5c97d6;
background-image: url('${heroPhoto}');
background-repeat: no-repeat;
background-position: center center;
background-size: cover;
}
.hero::after {
content: '';
position: absolute; inset: 0;
background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
backdrop-filter: saturate(1.3) contrast(1.1) brightness(1.12);
-webkit-backdrop-filter: saturate(1.3) contrast(1.1) brightness(1.12);
z-index: 1;
}
.hero-content {
position: relative; z-index: 3; width: 100%;
display: flex; flex-direction: column; align-items: center;
}
.ganesh-top {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  padding: 20px 0; /* Adjust as needed for spacing from the top edge */
  text-align: center;
  z-index: 4; /* Keeps it above the hero overlay */
}

.ganesh-heading {
  font-family: 'EB Garamond', serif; /* Or use a clean sans-serif if preferred */
  font-size: 14px;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
  
.wedding-date {
margin-bottom: 40px; padding: 8px 18px;
border-top: 1px solid rgba(255,255,255,0.75);
border-bottom: 1px solid rgba(255,255,255,0.75);
font-family: 'Playfair Display', serif;
font-size: clamp(13px, 3.6vw, 17px); font-weight: 600;
letter-spacing: 0.18em; text-transform: uppercase;
color: #ffffff; text-shadow: 0 2px 7px rgba(0,0,0,0.8);
}
.script-name {
font-family: 'Great Vibes', cursive; line-height: 1.1;
color: #ffffff; text-shadow: 0 4px 16px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.8);
}
.groom-name { font-size: clamp(64px, 18vw, 86px); }
.bride-name  { font-size: clamp(64px, 18vw, 86px); }
.ampersand {
font-family: 'Great Vibes', cursive; font-size: clamp(40px, 11vw, 60px);
color: #ffffff; text-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.8);
margin: -10px 0; display: block;
}
.parents-row-hero {
display: flex; gap: 28px; justify-content: center;
margin-top: 50px; flex-wrap: wrap;
position: relative; z-index: 4;
}
.parents-row-hero .parent-block { text-align: center; }
.parents-row-hero .parent-label {
font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
color: rgba(255,255,255,0.9); margin-bottom: 4px;
text-shadow: 0 1px 4px rgba(0,0,0,0.8);
}
.parents-row-hero .parent-names {
font-family: 'EB Garamond', serif; font-style: italic;
font-size: 15px; color: #ffffff; line-height: 1.4;
text-shadow: 0 2px 8px rgba(0,0,0,0.8);
}

@keyframes scroll-down-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(7px); }
}
.scroll-down-btn {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.65);
  background: rgba(0,0,0,0.18);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}
.scroll-down-btn svg {
  animation: scroll-down-bounce 1.8s ease-in-out infinite;
}
.scroll-down-btn:hover {
  background: rgba(0,0,0,0.32);
  border-color: rgba(255,255,255,0.9);
}
.scroll-down-btn:active {
  transform: translateX(-50%) scale(0.92);
}

/* ═══════════════════════════════════════
   OTHER SECTIONS
═══════════════════════════════════════ */
.parents-message-section { background: #6f1423; padding-top: 32px; padding-bottom: 0; color: #fff; }
.section { padding: 56px 24px 64px; max-width: 480px; margin: 0 auto; }
.parents-message-section .section { padding-top: 76px; padding-bottom: 82px; }
.message-card { padding: 0 8px; position: relative; }
.message-card::before { content: '\\201C'; font-family: 'Great Vibes', cursive; font-size: 88px; color: rgba(255,255,255,0.18); position: absolute; top: -52px; left: 50%; transform: translateX(-50%); line-height: 1; }
.message-heading {
margin-bottom: 24px; font-family: 'Great Vibes', cursive;
font-size: clamp(42px, 11vw, 58px); font-weight: 400; line-height: 1.1;
text-align: center; color: #ffffff; text-shadow: 0 5px 16px rgba(50,0,8,0.3);
}
.message-text { font-family: 'EB Garamond', serif; font-size: 19px; line-height: 1.95; color: #fffaf4; font-style: italic; text-align: center; }
.message-sig { margin-top: 22px; text-align: center; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,242,232,0.82); }
.message-card.reveal { opacity: 1; transform: none; }
.message-card .message-heading,
.message-card .message-text,
.message-card .message-sig {
opacity: 0; transform: translateY(28px);
transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.16,1,0.3,1);
}
.message-card.visible .message-heading { opacity: 1; transform: translateY(0); }
.message-card.visible .message-text { opacity: 1; transform: translateY(0); transition-delay: 0.18s; }
.message-card.visible .message-sig { opacity: 1; transform: translateY(0); transition-delay: 0.38s; }

.countdown-section { background: #ffffff; padding-top: 32px; position: relative; overflow: hidden; }
.section-title {
font-family: 'Great Vibes', cursive; font-size: clamp(42px, 11vw, 58px);
font-weight: 400; line-height: 1.1; text-align: center;
}
.countdown-title { margin-bottom: 32px; color: #8b1a1a; }
.countdown-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 12px; }
.countdown-unit { text-align: center; padding: 8px 2px 4px; }
.countdown-num { font-family: 'Great Vibes', cursive; font-size: clamp(42px, 12vw, 62px); color: #8b1a1a; line-height: 1; display: block; font-weight: 400; text-shadow: 0 8px 18px rgba(139,26,26,0.13); }
.countdown-label { display: block; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #9c4c45; margin-top: 6px; }
.confetti-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

/* ── Schedule Section ── */
.schedule-section { background: #b71c1c; padding-top: 32px; }
.schedule-section .section { max-width: 560px; }
.schedule-title { margin-bottom: 10px; color: #ffffff; text-shadow: 0 5px 16px rgba(80,0,0,0.28); }
.timeline { position: relative; padding: 8px 0 24px; }

/* NO global ::before line — removed intentionally */



/* ── Day group block ── */
.event-day {
  position: relative;
  padding-bottom: 32px;
  margin-bottom: 8px;
}
/* Short vertical line ONLY within each day group */
.event-day::before {
  content: '';
  position: absolute;
  left: calc(36% - 1px);
  top: 68px;       /* starts just below the day heading */
  bottom: 32px;
  width: 2px;
  background: linear-gradient(to bottom, rgba(255,238,220,0.9), rgba(255,238,220,0.2));
  z-index: 1;
}

/* ── Day heading — prominent banner style ── */
.day-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 24px 0 28px;
  padding: 0;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', Arial, sans-serif;
  font-size: clamp(18px, 5vw, 26px);
  font-weight: 600;
  color: #fff4df;
  text-shadow: 0 2px 8px rgba(80,0,0,0.4);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
/* decorative lines flanking the day title */
.day-heading::before,
.day-heading::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255,238,220,0.6));
}
.day-heading::after {
  background: linear-gradient(to left, transparent, rgba(255,238,220,0.6));
}
.day-heading.day-two { margin-top: 4px; }

/* ── Event card flip animation on scroll ── */
@keyframes card-flip-in {
  0%   { opacity: 0; transform: rotateY(-35deg) translateX(-28px) scale(0.94); }
  60%  { opacity: 1; }
  100% { opacity: 1; transform: rotateY(0deg)  translateX(0)      scale(1); }
}
@keyframes card-flip-in-right {
  0%   { opacity: 0; transform: rotateY(35deg)  translateX(28px)  scale(0.94); }
  60%  { opacity: 1; }
  100% { opacity: 1; transform: rotateY(0deg)  translateX(0)      scale(1); }
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 36% 1fr;
  gap: 28px;
  min-height: 72px;
  opacity: 0;
  transform: rotateY(-35deg) translateX(-28px) scale(0.94);
  perspective: 600px;
  transform-style: preserve-3d;
  transition: none; /* animation handles it */
}
.timeline-item:nth-child(even) {
  transform: rotateY(35deg) translateX(28px) scale(0.94);
}
.timeline-item.visible {
  animation: card-flip-in 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}
.timeline-item:nth-child(even).visible {
  animation: card-flip-in-right 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}

.event-time { color: rgba(255,238,220,0.96); font-family: 'Playfair Display', serif; font-size: clamp(17px, 4.5vw, 21px); font-weight: 600; letter-spacing: 0.04em; text-align: right; padding-right: 20px; line-height: 34px; }
.event-details { position: relative; padding-left: 24px; }
.event-details::before { content: ''; position: absolute; left: -5px; top: 12px; width: 10px; height: 10px; border-radius: 50%; background: #fff4df; box-shadow: 0 0 0 4px rgba(255,244,223,0.18); z-index: 2; }
.event-name { font-family: 'Great Vibes', cursive; font-size: 31px; color: #fff; line-height: 1.05; }
/* ── Venue Section with pencil sketch overlay ── */
.venue-section { background: #fdf8f0; padding-top: 32px; }
.venue-photo {
display: block;
width: 100%;
height: clamp(260px, 58vw, 520px);
object-fit: cover;
object-position: center;
margin-bottom: 32px;
}
.venue-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: #3a1010; margin-bottom: 8px; }
.venue-address { font-family: 'EB Garamond', serif; font-size: 16px; color: #6a4040; line-height: 1.75; margin-bottom: 24px; }
.directions-btn { display: inline-flex; align-items: center; gap: 8px; background: #8b1a1a; color: #fdf0e8; font-family: 'EB Garamond', serif; font-size: 14px; letter-spacing: 0.13em; text-transform: uppercase; padding: 13px 28px; border-radius: 2px; border: 1px solid #c0392b; text-decoration: none; transition: background 0.2s, box-shadow 0.2s; cursor: pointer; }
.directions-btn:hover { background: #a82020; box-shadow: 0 4px 18px rgba(139,26,26,0.35); }
.transport-btn { display: inline-flex; align-items: center; gap: 8px; background: #8b1a1a; color: #fdf0e8; font-family: 'EB Garamond', serif; font-size: 14px; letter-spacing: 0.13em; text-transform: uppercase; padding: 13px 28px; border-radius: 2px; border: 1px solid #c0392b; cursor: pointer; transition: background 0.2s, box-shadow 0.2s; }
.transport-btn:hover { background: #a82020; box-shadow: 0 4px 18px rgba(139,26,26,0.35); }
.btn-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }

/* Transport modal */
@keyframes pop-from-center {
  0%   { opacity: 0; transform: scale(0.08) translateY(0); clip-path: ellipse(10% 10% at 50% 50%); }
  40%  { opacity: 1; transform: scale(1.04) translateY(-6px); clip-path: ellipse(60% 60% at 50% 50%); }
  65%  { transform: scale(0.98) translateY(2px); clip-path: ellipse(80% 80% at 50% 50%); }
  100% { opacity: 1; transform: scale(1) translateY(0); clip-path: ellipse(150% 150% at 50% 50%); }
}
.transport-overlay { position: fixed; inset: 0; background: rgba(20,8,0,0.72); z-index: 200; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.25s ease; }
.transport-overlay.open { opacity: 1; pointer-events: auto; }
.transport-modal {
  background: linear-gradient(135deg, #ecdcb6 0%, #e3cd9d 30%, #ead9ad 60%, #ddc794 100%);
  border-radius: 4px;
  box-shadow: 0 0 0 1px #b8915a, 0 0 0 5px #f7ecd2, 0 0 0 6px #b8915a, 0 24px 60px rgba(20,8,0,0.6);
  width: min(90vw, 360px);
  padding: 36px 32px 32px;
  position: relative;
  transform: scale(0.08);
  opacity: 0;
  clip-path: ellipse(10% 10% at 50% 50%);
  transition: none;
}
.transport-overlay.open .transport-modal {
  animation: pop-from-center 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
}
.transport-modal-title { font-family: 'Great Vibes', cursive; font-size: 38px; color: #5a2800; text-align: center; margin-bottom: 6px; }
.transport-modal-sub { font-family: 'EB Garamond', serif; font-size: 11px; letter-spacing: 0.2em; color: rgba(90,50,10,0.65); text-align: center; text-transform: uppercase; margin-bottom: 24px; }
.transport-divider { width: 60%; height: 1px; background: linear-gradient(to right, transparent, rgba(150,100,40,0.5), transparent); margin: 0 auto 22px; }
.transport-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 18px; }
.transport-icon { width: 38px; height: 38px; border-radius: 50%; background: rgba(90,40,0,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; border: 1px solid rgba(150,100,40,0.3); }
.transport-info { flex: 1; }
.transport-mode { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: #5a2800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2px; }
.transport-detail { font-family: 'EB Garamond', serif; font-size: 15px; color: #7a4010; line-height: 1.4; }
.transport-close { position: absolute; top: 12px; right: 14px; background: none; border: none; font-size: 18px; color: rgba(90,50,10,0.55); cursor: pointer; line-height: 1; padding: 4px 6px; }
.transport-close:hover { color: #5a2800; }

/* Venue map placeholder */
.venue-placeholder {
width: 100%; height: 240px;
background: #e8e0d4;
border-radius: 3px; margin-bottom: 24px;
display: flex; align-items: center; justify-content: center;
position: relative; overflow: hidden;
border: 1px solid rgba(100,80,60,0.25);
}

/* ── Pigeon animation ── */
/* Pigeon 1: starts center, flies to top-right, with gentle wing-beat arc */
@keyframes pigeon-fly-1 {
  0%   { transform: translate(0px, 0px)       scale(1)    rotate(-5deg); opacity: 0; }
  8%   { opacity: 1; }
  25%  { transform: translate(60px, -55px)    scale(0.92) rotate(-12deg); }
  50%  { transform: translate(160px, -130px)  scale(0.82) rotate(-8deg); }
  75%  { transform: translate(270px, -210px)  scale(0.68) rotate(-14deg); }
  92%  { opacity: 0.6; }
  100% { transform: translate(360px, -290px)  scale(0.42) rotate(-10deg); opacity: 0; }
}
/* Pigeon 2: starts center slightly offset, slightly delayed, different arc */
@keyframes pigeon-fly-2 {
  0%   { transform: translate(0px, 0px)       scale(0.85) rotate(-3deg); opacity: 0; }
  10%  { opacity: 1; }
  25%  { transform: translate(45px, -40px)    scale(0.78) rotate(-10deg); }
  50%  { transform: translate(130px, -110px)  scale(0.66) rotate(-7deg); }
  75%  { transform: translate(235px, -195px)  scale(0.54) rotate(-12deg); }
  92%  { opacity: 0.5; }
  100% { transform: translate(320px, -270px)  scale(0.32) rotate(-9deg); opacity: 0; }
}
/* Wing-beat bob — makes it feel alive */
@keyframes wing-beat {
  0%,100% { transform: scaleY(1); }
  50%     { transform: scaleY(0.82); }
}

.pigeon-container {
  position: absolute;
  /* Start from horizontal centre, vertically ~60% down */
  left: 50%;
  top: 60%;
  width: 0; height: 0;      /* anchor point only */
  pointer-events: none;
  z-index: 10;
  overflow: visible;
}
.pigeon {
  position: absolute;
  width: clamp(56px, 10vw, 80px);
  transform-origin: center center;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
}
.pigeon img {
  width: 100%;
  height: auto;
  display: block;
  animation: wing-beat 0.38s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25));
}
.pigeon-1 {
  /* slightly left of centre start */
  left: -50px;
  top: -20px;
  animation: pigeon-fly-1 4.2s ease-in-out infinite;
  animation-delay: 0s;
}
.pigeon-2 {
  /* slightly right of centre start */
  left: -20px;
  top: 10px;
  animation: pigeon-fly-2 4.2s ease-in-out infinite;
  animation-delay: 0.6s;
}

.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── Wardrobe Planner Button ── */
.wardrobe-btn-wrap {
  display: flex;
  justify-content: center;
  padding: 32px 24px 48px;
}
.wardrobe-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.12);
  color: #fff4df;
  font-family: 'Playfair Display', serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 14px 30px;
  border-radius: 2px;
  border: 1px solid rgba(255,238,220,0.5);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
}
.wardrobe-btn:hover {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,238,220,0.9);
  transform: translateY(-2px);
}

/* ── Wardrobe Modal Overlay ── */
.wardrobe-overlay {
  position: fixed; inset: 0;
  background: rgba(20,6,6,0.88);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
}
.wardrobe-overlay.open {
  opacity: 1;
  visibility: visible;
}
.wardrobe-modal {
  position: relative;
  max-width: min(92vw, 600px);
  width: 100%;
  background: #1a0808;
  border: 1px solid rgba(196,154,108,0.4);
  border-radius: 4px;
  overflow: hidden;
  transform: scale(0.88) translateY(28px);
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 32px 80px rgba(0,0,0,0.7);
}
.wardrobe-overlay.open .wardrobe-modal {
  transform: scale(1) translateY(0);
}
.wardrobe-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(196,154,108,0.25);
}
.wardrobe-modal-title {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
  color: #fff4df;
  font-weight: 400;
  letter-spacing: 0.02em;
}
.wardrobe-close {
  background: transparent;
  border: 0;
  color: rgba(255,238,220,0.7);
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 2px;
  transition: color 0.2s, background 0.2s;
}
.wardrobe-close:hover { color: #fff; background: rgba(255,255,255,0.1); }
.wardrobe-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 75vh;
  object-fit: contain;
  background: #0d0404;
}

/* ── Music Player ── */
.music-player {
  position: fixed;
  bottom: 22px;
  right: 22px;
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(20,6,6,0.82);
  border: 1px solid rgba(196,154,108,0.45);
  border-radius: 999px;
  padding: 8px 18px 8px 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.45);
}
.music-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: #8b1a1a;
  border: 0;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s, transform 0.15s;
}
.music-btn:hover { background: #a82020; transform: scale(1.08); }
.music-btn:active { transform: scale(0.95); }
.music-label {
  font-family: 'EB Garamond', serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: rgba(255,238,220,0.85);
  text-transform: uppercase;
  white-space: nowrap;
}
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.note-spinning { animation: spin 3s linear infinite; display: inline-block; }

/* Torn Paper Effects */
.torn-bottom { position: relative; }
.torn-bottom::after {
content: ''; position: absolute; bottom: -18px; left: 0; right: 0; height: 36px; background: inherit;
clip-path: polygon(0% 0%, 2.5% 60%, 5% 0%, 7.5% 70%, 10% 10%, 12.5% 55%, 15% 5%, 17.5% 65%, 20% 0%, 22.5% 75%, 25% 15%, 27.5% 50%, 30% 0%, 32.5% 68%, 35% 8%, 37.5% 58%, 40% 0%, 42.5% 72%, 45% 12%, 47.5% 60%, 50% 2%, 52.5% 65%, 55% 0%, 57.5% 70%, 60% 10%, 62.5% 55%, 65% 0%, 67.5% 68%, 70% 5%, 72.5% 60%, 75% 0%, 77.5% 72%, 80% 15%, 82.5% 55%, 85% 5%, 87.5% 68%, 90% 0%, 92.5% 62%, 95% 8%, 97.5% 58%, 100% 0%, 100% 100%, 0% 100%);
z-index: 5;
}
.torn-top { position: relative; }
.torn-top::before {
content: ''; position: absolute; top: -18px; left: 0; right: 0; height: 36px; background: inherit;
clip-path: polygon(0% 100%, 2.5% 40%, 5% 100%, 7.5% 30%, 10% 90%, 12.5% 45%, 15% 95%, 17.5% 35%, 20% 100%, 22.5% 25%, 25% 85%, 27.5% 50%, 30% 100%, 32.5% 32%, 35% 92%, 37.5% 42%, 40% 100%, 42.5% 28%, 45% 88%, 47.5% 40%, 50% 98%, 52.5% 35%, 55% 100%, 57.5% 30%, 60% 90%, 62.5% 45%, 65% 100%, 67.5% 32%, 70% 95%, 72.5% 40%, 75% 100%, 77.5% 28%, 80% 85%, 82.5% 45%, 85% 95%, 87.5% 32%, 90% 100%, 92.5% 38%, 95% 92%, 97.5% 42%, 100% 100%, 100% 0%, 0% 0%);
z-index: 5;
}
`}</style>;

/* ── White Rose SVG (used in timeline) ── */
function WhiteRose({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M32 58 C30 50 28 44 29 38" stroke="#b8d4a0" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Leaf left */}
      <path d="M29 44 C22 40 20 34 24 32 C25 36 27 40 29 44Z" fill="#b8d4a0" opacity="0.9"/>
      {/* Rose petals — layered from outer to inner */}
      <ellipse cx="32" cy="26" rx="12" ry="10" fill="#fff" stroke="rgba(200,180,160,0.5)" strokeWidth="0.8"/>
      <path d="M20 26 C18 18 24 12 32 12 C40 12 46 18 44 26 C42 20 38 16 32 16 C26 16 22 20 20 26Z" fill="#f9f2ec" stroke="rgba(200,180,160,0.4)" strokeWidth="0.6"/>
      <path d="M24 30 C22 22 26 14 32 14 C38 14 42 22 40 30 C38 24 35 20 32 20 C29 20 26 24 24 30Z" fill="#fff" stroke="rgba(200,180,160,0.5)" strokeWidth="0.6"/>
      {/* Petal right */}
      <path d="M36 18 C42 16 46 20 44 27 C41 22 38 18 36 18Z" fill="#f5edea" stroke="rgba(200,180,160,0.4)" strokeWidth="0.6"/>
      {/* Petal left */}
      <path d="M28 18 C22 16 18 20 20 27 C23 22 26 18 28 18Z" fill="#f5edea" stroke="rgba(200,180,160,0.4)" strokeWidth="0.6"/>
      {/* Inner petals */}
      <path d="M28 28 C27 23 29 18 32 18 C35 18 37 23 36 28 C34 24 30 24 28 28Z" fill="#fff" stroke="rgba(200,180,160,0.3)" strokeWidth="0.5"/>
      {/* Center */}
      <circle cx="32" cy="27" r="3.5" fill="#fdf5ee" stroke="rgba(200,180,160,0.5)" strokeWidth="0.7"/>
      <circle cx="32" cy="27" r="1.5" fill="#f0e0d0" opacity="0.8"/>
    </svg>
  );
}

/* ── Venue Pencil Sketch SVG ── */
function VenuePencilSketch() {
  return (
    <div className="venue-placeholder">
      <svg
        viewBox="0 0 400 240"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-label="Naivaidyam Resort venue sketch"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Pencil sketch filter */}
          <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
            <feComposite in="displaced" in2="SourceGraphic" operator="in"/>
          </filter>
          {/* Rough line texture */}
          <filter id="roughen">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {/* Parchment background */}
        <rect width="400" height="240" fill="#f0e8d8"/>
        <rect width="400" height="240" fill="url(#paper-grain)" opacity="0.4"/>

        {/* Sky with pencil hatching */}
        <rect x="0" y="0" width="400" height="110" fill="#e8eff8" filter="url(#sketch)"/>
        {[0,6,12,18,24,30,36,42,48,54].map(y => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#c8d8e8" strokeWidth="0.4" opacity="0.5"/>
        ))}

        {/* Ground */}
        <rect x="0" y="185" width="400" height="55" fill="#d4c8a8"/>
        {/* Ground texture lines */}
        {[188,192,196,200].map(y => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#b8aa88" strokeWidth="0.5" strokeDasharray="3,4" opacity="0.6"/>
        ))}

        {/* Main building body */}
        <g filter="url(#roughen)">
          {/* Central block */}
          <rect x="120" y="70" width="160" height="115" fill="#e8dcc8" stroke="#8a7060" strokeWidth="1.2"/>
          {/* Left wing */}
          <rect x="30" y="90" width="95" height="95" fill="#e2d6c0" stroke="#8a7060" strokeWidth="1"/>
          {/* Right wing */}
          <rect x="275" y="90" width="95" height="95" fill="#e2d6c0" stroke="#8a7060" strokeWidth="1"/>

          {/* Roof central */}
          <path d="M110 70 L200 30 L290 70Z" fill="#c8b898" stroke="#6a5840" strokeWidth="1.2"/>
          {/* Roof left wing */}
          <path d="M22 90 L77 60 L132 90Z" fill="#c0b090" stroke="#6a5840" strokeWidth="1"/>
          {/* Roof right wing */}
          <path d="M268 90 L323 60 L378 90Z" fill="#c0b090" stroke="#6a5840" strokeWidth="1"/>

          {/* Roof tile lines — central */}
          {[40,50,60].map(y => (
            <line key={y} x1={110+(y-30)*1.5} y1={y} x2={290-(y-30)*1.5} y2={y} stroke="#a89070" strokeWidth="0.6" opacity="0.7"/>
          ))}

          {/* Arched windows — central */}
          {[140, 170, 200, 230, 260].map(x => (
            <g key={x}>
              <rect x={x-10} y="105" width="20" height="30" fill="#b8c8d8" stroke="#706050" strokeWidth="0.8"/>
              <path d={`M${x-10} 105 Q${x} 95 ${x+10} 105`} fill="#b8c8d8" stroke="#706050" strokeWidth="0.8"/>
              {/* Window cross */}
              <line x1={x} y1="95" x2={x} y2="135" stroke="#706050" strokeWidth="0.5"/>
              <line x1={x-10} y1="115" x2={x+10} y2="115" stroke="#706050" strokeWidth="0.5"/>
            </g>
          ))}

          {/* Arched windows — left wing */}
          {[55, 82, 109].map(x => (
            <g key={x}>
              <rect x={x-9} y="115" width="18" height="26" fill="#b8c8d8" stroke="#706050" strokeWidth="0.7"/>
              <path d={`M${x-9} 115 Q${x} 107 ${x+9} 115`} fill="#b8c8d8" stroke="#706050" strokeWidth="0.7"/>
              <line x1={x} y1="107" x2={x} y2="141" stroke="#706050" strokeWidth="0.4"/>
              <line x1={x-9} y1="124" x2={x+9} y2="124" stroke="#706050" strokeWidth="0.4"/>
            </g>
          ))}

          {/* Arched windows — right wing */}
          {[291, 318, 345].map(x => (
            <g key={x}>
              <rect x={x-9} y="115" width="18" height="26" fill="#b8c8d8" stroke="#706050" strokeWidth="0.7"/>
              <path d={`M${x-9} 115 Q${x} 107 ${x+9} 115`} fill="#b8c8d8" stroke="#706050" strokeWidth="0.7"/>
              <line x1={x} y1="107" x2={x} y2="141" stroke="#706050" strokeWidth="0.4"/>
              <line x1={x-9} y1="124" x2={x+9} y2="124" stroke="#706050" strokeWidth="0.4"/>
            </g>
          ))}

          {/* Columns — central */}
          {[135, 155, 175, 245, 265].map(x => (
            <rect key={x} x={x} y="110" width="5" height="75" fill="#d8ccb8" stroke="#8a7060" strokeWidth="0.6"/>
          ))}

          {/* Central balcony */}
          <rect x="148" y="142" width="104" height="4" fill="#d0c0a0" stroke="#8a7060" strokeWidth="0.8"/>

          {/* Door */}
          <rect x="183" y="150" width="34" height="35" fill="#908070" stroke="#5a4030" strokeWidth="1"/>
          <path d="M183 150 Q200 140 217 150" fill="#908070" stroke="#5a4030" strokeWidth="0.8"/>
          <circle cx="214" cy="168" r="2" fill="#d4a840"/>

          {/* Entrance steps */}
          <rect x="172" y="183" width="56" height="4" fill="#c8b898" stroke="#8a7060" strokeWidth="0.6"/>
          <rect x="176" y="180" width="48" height="3" fill="#c8b898" stroke="#8a7060" strokeWidth="0.5"/>

          {/* Hatching on walls for pencil effect */}
          {[75,80,85,90].map(y => (
            <line key={y} x1="120" y1={y} x2="280" y2={y} stroke="#a09080" strokeWidth="0.3" opacity="0.4"/>
          ))}
          {[95,100].map(y => (
            <line key={y} x1="30" y1={y} x2="125" y2={y} stroke="#a09080" strokeWidth="0.3" opacity="0.4"/>
          ))}
          {[95,100].map(y => (
            <line key={y} x1="275" y1={y} x2="370" y2={y} stroke="#a09080" strokeWidth="0.3" opacity="0.4"/>
          ))}

          {/* Trees / bushes */}
          <ellipse cx="22" cy="168" rx="18" ry="22" fill="#9ab890" stroke="#6a8860" strokeWidth="0.8"/>
          <ellipse cx="378" cy="168" rx="18" ry="22" fill="#9ab890" stroke="#6a8860" strokeWidth="0.8"/>
          <line x1="22" y1="190" x2="22" y2="208" stroke="#7a6040" strokeWidth="1.5"/>
          <line x1="378" y1="190" x2="378" y2="208" stroke="#7a6040" strokeWidth="1.5"/>
          {/* Bush detail */}
          <path d="M10 170 Q22 155 34 170" fill="none" stroke="#6a8860" strokeWidth="0.6" opacity="0.7"/>
          <path d="M366 170 Q378 155 390 170" fill="none" stroke="#6a8860" strokeWidth="0.6" opacity="0.7"/>

          {/* Path to entrance */}
          <path d="M162 215 Q185 210 200 208 Q215 210 238 215" stroke="#a09070" strokeWidth="1.2" fill="none" strokeDasharray="4,3"/>
        </g>

        {/* Sketch border */}
        <rect x="3" y="3" width="394" height="234" fill="none" stroke="#8a7060" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.5"/>

        {/* Venue label */}
        <text x="200" y="228" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="#6a5840" letterSpacing="2" opacity="0.75">
          NAIVAIDYAM RESORT · AMRAVATI
        </text>
      </svg>
    </div>
  );
}

const DAY_ONE_EVENTS = [
  { name: "Haldi",          time: "10:00 AM" },
  { name: "Carnival",       time: "02:00 PM" },
  { name: "Nikasi",         time: "07:00 PM" },
  { name: "Reception",      time: "08:00 PM" },
];

const DAY_TWO_EVENTS = [
  { name: "Chauri",         time: "02:00 AM" },
  { name: "Bride Welcome",  time: "10:00 AM" },
  { name: "Mayera",         time: "12:00 PM" },
];

const EVENT_GROUPS = [
  { label: "06 - July", events: DAY_ONE_EVENTS },
  { label: "07 - July", events: DAY_TWO_EVENTS },
];

function useConfetti(canvasRef, active) {
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#8b1a1a','#c0392b','#d4a840','#f0dfc0','#ffffff','#b8860b','#e8c97a'];
    const SHAPES = ['rect','circle','ribbon'];
    const COUNT = 100;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', resize);

    const pieces = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * W,
      y: -Math.random() * H * 0.6 - 10,
      r: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      vx: (Math.random() - 0.5) * 1.8,
      vy: 1.2 + Math.random() * 2.2,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      opacity: 0.75 + Math.random() * 0.25,
      delay: i * 5,
      tick: 0,
    }));

    let frame;
    let started = false;
    let t = 0;

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);
      pieces.forEach(p => {
        if (t < p.delay) return;
        p.tick++;
        p.x += p.vx + Math.sin(p.tick * 0.04) * 0.5;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > H + 20) {
          p.y = -10; p.x = Math.random() * W; p.tick = 0;
        }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.r, -p.r * 0.45, p.r * 2, p.r * 0.9);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.55, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.r);
          ctx.quadraticCurveTo(p.r, 0, 0, p.r);
          ctx.quadraticCurveTo(-p.r, 0, 0, -p.r);
          ctx.fill();
        }
        ctx.restore();
      });
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [active, canvasRef]);
}

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
  const [opened, setOpened]             = useState(false);
  const [sealBroken, setSealBroken]     = useState(false);
  const [sceneHidden, setSceneHidden]   = useState(false);
  const [cardVisible, setCardVisible]   = useState(false);
  const [wardrobeOpen, setWardrobeOpen] = useState(false);
  const [transportOpen, setTransportOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const confettiCanvasRef = useRef(null);
  const countdownSectionRef = useRef(null);
  const nextSectionRef = useRef(null);
  const time     = useCountdown(WEDDING_DATE.getTime());
  const tlRefs   = useRef([]);
  const revealRefs = useRef([]);
  const audioRef = useRef(null);

  const handleSeal = () => {
    if (opened || sealBroken) return;
    setSealBroken(true);
    // Step 1: Reveal names immediately on seal click
    // Step 2: After 1 second, begin the scroll-opening animation
    setTimeout(() => {
      setOpened(true);
      setTimeout(() => setCardVisible(true), 500);
      setTimeout(() => setSceneHidden(true), 1500);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
        }
      }, 600);
    }, 1000);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const scrollToNext = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useConfetti(confettiCanvasRef, confettiActive);

  useEffect(() => {
    if (!cardVisible || !countdownSectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setConfettiActive(true); },
      { threshold: 0.25 }
    );
    obs.observe(countdownSectionRef.current);
    return () => obs.disconnect();
  }, [cardVisible]);

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
    <div className="invite-root">
      {FONTS}{STYLES}

      {/* ══ SCROLL OPENING ══ */}
      <div className={`opening-scene${opened?' opening':''}${sceneHidden?' hidden':''}`}>

        {/* Parchment scroll preview — splits open top/bottom on seal click */}
        <div className="scroll-stage">
          {/* Top wooden handle */}
          <div className="scroll-rod top-rod"/>

          {/* Scroll body with content + seal */}
          <div className="scroll-body" style={{position:'relative'}}>
            <div className="scroll-content">
              <p className="scroll-ganesh">|| ॐ श्री गणेशाय नमः ||</p>
              <div className="scroll-divider"/>
              <div className={`scroll-names${sealBroken ? ' revealed' : ''}`} style={{transitionDelay: sealBroken ? '0ms' : '0ms'}}>Krishnakant</div>
              <span className={`scroll-amp${sealBroken ? ' revealed' : ''}`}>&amp;</span>
              <div className={`scroll-names${sealBroken ? ' revealed' : ''}`} style={{transitionDelay: sealBroken ? '0.22s' : '0ms'}}>Suruchi</div>
              <div className="scroll-divider"/>
              <p className="scroll-date">06 · July · 2026</p>
            </div>

            {/* Wax seal — sits on top of the parchment, click to begin */}
            <button
              className={`scroll-seal-btn${sealBroken ? ' broken' : ''}`}
              type="button"
              onClick={handleSeal}
              aria-label="Click the seal to open invitation"
            >
              <img className="scroll-seal-img" src={sealImage} alt="Wax seal" />
            </button>
          </div>

          {/* Bottom wooden handle */}
          <div className="scroll-rod bottom-rod"/>
        </div>

        <p className="open-hint">✦ Click the seal to open ✦</p>
      </div>

      {/* ══ INVITATION CARD ══ */}
      <div className={`invite-card${cardVisible?' visible':''}`}>

        {/* ── HERO ── */}
        <section className="hero">

        <div className="pigeon-container">
            <div className="pigeon pigeon-1">
              <img src={pigeonImg} alt="" aria-hidden="true" style={{transform:'scaleX(-2)'}}/>
            </div>
            <div className="pigeon pigeon-2">
              <img src={pigeonImg} alt="" aria-hidden="true" style={{transform:'scaleX(-2)'}}/>
            </div>
          </div>
          <div className="hero-content">
          <div className="ganesh-top">
    <p className="ganesh-heading">|| ॐ श्री गणेशाय नमः ||</p>
  </div>
            <p className="wedding-date">Wedding Date 06-07-2026</p>
            <div className="script-name groom-name">Krishnakant</div>
            <span className="ampersand">&amp;</span>
            <div className="script-name bride-name">Suruchi</div>
            <div className="parents-row-hero">
              <div className="parent-block">
                <p className="parent-label">Groom's Parents</p>
                <p className="parent-names">Manoj &amp; Kavita<br/>Bhutada</p>
              </div>
              <div className="parent-block">
                <p className="parent-label">Bride's Parents</p>
                <p className="parent-names">Balasaheb &amp; Vanita<br/>Bhujbal</p>
              </div>
            </div>
          </div>

          <button
            className="scroll-down-btn"
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to next section"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </section>

        {/* ── PARENTS' MESSAGE ── */}
        <section className="parents-message-section" ref={nextSectionRef} style={{position:'relative',overflow:'hidden'}}>
          <div className="section">
            <div className="message-card reveal" ref={el=>revealRefs.current[0]=el}>
              <h2 className="message-heading">Dear Family and Friends</h2>
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
        <section className="countdown-section" ref={countdownSectionRef}>
          <canvas ref={confettiCanvasRef} className="confetti-canvas" aria-hidden="true" />
          <div className="section reveal" ref={el=>revealRefs.current[1]=el} style={{position:'relative',zIndex:1}}>
            <h2 className="section-title countdown-title">The Celebration Begins In</h2>
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
        <section className="schedule-section">
          <div className="section">
            <h2 className="section-title schedule-title">Schedule of Events</h2>
            <div className="timeline">
              {/* Scrolling white rose */}
              {/* <div className="timeline-rose">
                <WhiteRose size={44}/>
              </div> */}
              {EVENT_GROUPS.map((group, groupIndex) => {
                const offset = groupIndex === 0 ? 0 : DAY_ONE_EVENTS.length;
                return (
                  <div className="event-day" key={group.label}>
                    <h3 className={`day-heading${groupIndex === 1 ? " day-two" : ""}`}>
                      {group.label}
                    </h3>
                    {group.events.map((ev, eventIndex) => {
                      const index = offset + eventIndex;
                      return (
                        <div
                          key={ev.name}
                          className="timeline-item"
                          ref={el=>tlRefs.current[index]=el}
                          style={{ animationDelay: `${eventIndex * 80}ms` }}
                        >
                          <div className="event-time">{ev.time}</div>
                          <div className="event-details">
                            <div className="event-name">{ev.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* ── Wardrobe Planner Button ── */}
            <div className="wardrobe-btn-wrap">
              <button
                className="wardrobe-btn"
                type="button"
                onClick={() => setWardrobeOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
                </svg>
                Wardrobe Planner
              </button>
            </div>
          </div>
        </section>

        {/* ── VENUE ── */}
        <section className="venue-section">
          <img className="venue-photo" src={venuePhoto} alt="Naivaidyam Resort Amravati" />
          <div className="section reveal" ref={el=>revealRefs.current[2]=el}>
            <p className="venue-name">Naivaidyam Resort Amravati</p>
            <p className="venue-address">
              Street name: Amravati<br/>
              City: Amravati<br/>
              State: Maharashtra<br/>
              PIN: 444701<br/>
              India
            </p>
            <div className="btn-row">
            <a
              className="directions-btn"
              href="https://www.google.com/maps/place/Naivaidyam+Resort/@20.8758088,77.7352695,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd6a4a2e3af143b:0xaf78442538bc933e!8m2!3d20.8758088!4d77.7352695!16s%2Fg%2F11gh34bw8b?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
            <button className="transport-btn" type="button" onClick={() => setTransportOpen(true)}>
              🚌 Modes of Transport
            </button>
            </div>
          </div>
        </section>

      </div>

      {/* ══ AUDIO ══ */}
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />

      {/* ══ MUSIC PLAYER ══ */}
      <div className="music-player">
        <button
          className="music-btn"
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>
        <span className="music-label">
          <span className={musicPlaying ? "note-spinning" : ""}>♪</span>
          {musicPlaying ? " Now Playing" : " Play Music"}
        </span>
      </div>

      {/* ══ TRANSPORT MODAL ══ */}
      <div
        className={`transport-overlay${transportOpen ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setTransportOpen(false); }}
        role="dialog"
        aria-modal="true"
        aria-label="Modes of Transport"
      >
        <div className="transport-modal">
          <button className="transport-close" type="button" onClick={() => setTransportOpen(false)} aria-label="Close">✕</button>
          <div className="transport-modal-title">Getting Here</div>
          <div className="transport-modal-sub">Naivaidyam Resort, Amravati</div>
          <div className="transport-divider"/>
          <div className="transport-item">
            <div className="transport-icon">🚂</div>
            <div className="transport-info">
              <div className="transport-mode">Railway</div>
              <div className="transport-detail">3.5 km from Badnera Junction</div>
            </div>
          </div>
          <div className="transport-item">
            <div className="transport-icon">🚌</div>
            <div className="transport-info">
              <div className="transport-mode">Bus</div>
              <div className="transport-detail">8 km from Amravati Bus Stand</div>
            </div>
          </div>
          <div className="transport-item">
            <div className="transport-icon">✈️</div>
            <div className="transport-info">
              <div className="transport-mode">Flight</div>
              <div className="transport-detail">8 km from Amravati Airport</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ WARDROBE MODAL ══ */}
      <div
        className={`wardrobe-overlay${wardrobeOpen ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setWardrobeOpen(false); }}
        role="dialog"
        aria-modal="true"
        aria-label="Wardrobe Planner"
      >
        <div className="wardrobe-modal">
          <div className="wardrobe-modal-header">
            <span className="wardrobe-modal-title">Wardrobe Planner</span>
            <button
              className="wardrobe-close"
              type="button"
              onClick={() => setWardrobeOpen(false)}
              aria-label="Close"
            >✕</button>
          </div>
          <img
            className="wardrobe-img"
            src={wardrobePlanner}
            alt="Wardrobe Planner"
          />
        </div>
      </div>

    </div>
  );
}
