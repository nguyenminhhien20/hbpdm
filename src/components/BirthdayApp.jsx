import React, { useEffect, useRef } from "react";

export default function BirthdayApp() {
  const rootRef = useRef(null);

  useEffect(() => {
    // Inject CSS (original styles kept intact for fidelity)
    const css = `
/* ==== START: injected styles ==== */
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body, #root { height: 100%; }
body { font-family: "Arial", sans-serif; overflow: hidden; background: #000; touch-action: pan-y; }
.container { position: relative; width: 100vw; height: 100vh; background: black; overflow: hidden; }
#flash { position: fixed; inset: 0; background: white; pointer-events: none; z-index: 20; opacity: 0; }
#flash.active { animation: flashAnim 1s forwards; }
@keyframes flashAnim { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }
#birthday-card { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 15; display: none; width: 100%; padding: 20px; }
#birthday-card.show { display: flex; justify-content: center; align-items: center; }
.card-wrapper { cursor: pointer; transition: all 0.5s; -webkit-user-select: none; user-select: none; width: 100%; max-width: 350px; }
.card-wrapper:active { transform: scale(0.95); }
.card-container { position: relative; width: 100%; aspect-ratio: 7/10; max-width: 320px; margin: 0 auto; }
@media (min-width: 640px) { .card-container { max-width: 400px; } }
.card-glow { position: absolute; inset: 0; filter: blur(60px); opacity: 0.6; background: radial-gradient(circle, #ff1493, #ff69b4, #ffd700, transparent); animation: glow-pulse 3s ease-in-out infinite; }
@keyframes glow-pulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.05); } }
.card-main { position: relative; width: 100%; height: 100%; border-radius: 30px; overflow: hidden; background: linear-gradient(135deg, #fff 0%, #ffebf0 30%, #ffd6e0 60%, #ffcdd8 100%); box-shadow: 0 30px 90px rgba(255, 20, 147, 0.5), 0 15px 50px rgba(255, 105, 180, 0.4), inset 0 2px 30px rgba(255, 255, 255, 0.6), inset 0 -2px 20px rgba(255, 192, 203, 0.3); }
.card-border { position: absolute; inset: 12px; border: 3px solid rgba(255, 192, 203, 0.5); border-radius: 25px; pointer-events: none; background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%); }

/* Card pattern overlay */
.card-pattern { position: absolute; inset: 0; opacity: 0.08; background-image: radial-gradient(circle, #ff69b4 1px, transparent 1px); background-size: 20px 20px; }

/* Animation cho các element trong card */
.bunting-animate { animation: slideDown 0.8s ease-out 0.2s backwards; }
.balloon-left-animate { animation: bounceInLeft 1s ease-out 0.5s backwards; }
.balloon-right-animate { animation: bounceInRight 1s ease-out 0.5s backwards; }
.title-animate { animation: zoomIn 0.8s ease-out 0.7s backwards; }
.envelope-animate { animation: dropIn 0.7s ease-out 1s backwards; }
.name-animate { animation: fadeInUp 0.7s ease-out 1.2s backwards; }
.cake-animate { animation: scaleUp 0.9s ease-out 1.4s backwards; }
.decoration-animate-1 { animation: popIn 0.6s ease-out 1.6s backwards; }
.decoration-animate-2 { animation: popIn 0.6s ease-out 1.7s backwards; }
.decoration-animate-3 { animation: popIn 0.6s ease-out 1.8s backwards; }
.decoration-animate-4 { animation: popIn 0.6s ease-out 1.9s backwards; }
.confetti-animate { animation: twinkle 0.7s ease-out backwards; }

@keyframes slideDown { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes bounceInLeft { 0% { opacity: 0; transform: translateX(-50px) scale(0.5); } 60% { transform: translateX(5px) scale(1.05); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
@keyframes bounceInRight { 0% { opacity: 0; transform: translateX(50px) scale(0.5); } 60% { transform: translateX(-5px) scale(1.05); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
@keyframes zoomIn { 0% { opacity: 0; transform: scale(0.4) rotate(-8deg); } 80% { transform: scale(1.05) rotate(2deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
@keyframes dropIn { 0% { opacity: 0; transform: translateY(-50px) scale(0.3) rotate(-180deg); } 70% { transform: translateY(5px) scale(1.15) rotate(10deg); } 100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); } }
@keyframes fadeInUp { 0% { opacity: 0; transform: translateY(25px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes scaleUp { 0% { opacity: 0; transform: translateX(-50%) scale(0.2) rotate(-15deg); } 70% { transform: translateX(-50%) scale(1.15) rotate(5deg); } 100% { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); } }
@keyframes popIn { 0% { opacity: 0; transform: scale(0) rotate(-180deg); } 70% { transform: scale(1.3) rotate(20deg); } 100% { opacity: 1; transform: scale(1) rotate(var(--end-rotate, 0deg)); } }
@keyframes twinkle { 0% { opacity: 0; transform: scale(0); } 50% { transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }

.card-name { color: #db2777; font-size: 16px; font-style: italic; font-weight: 700; text-shadow: 0 2px 4px rgba(219, 39, 119, 0.3); }
@media (min-width: 640px) { .card-name { font-size: 22px; } }
#fireworks-container { position: fixed; inset: 0; z-index: 15; pointer-events: none; overflow: hidden; display: none; background: radial-gradient(circle at center, rgba(139, 0, 139, 0.2), transparent 60%); }
#fireworks-container.show { display: block; animation: fireworks-bg-pulse 2s ease-in-out infinite; }
@keyframes fireworks-bg-pulse { 0%,100% { background: radial-gradient(circle at 30% 40%, rgba(139, 0, 139, 0.15), transparent 50%);} 50% { background: radial-gradient(circle at 70% 60%, rgba(255, 20, 147, 0.2), transparent 50%); } }
.rocket { position: absolute; width: 3px; height: 40px; border-radius: 5px; animation: rocket-launch 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; filter: blur(0.5px); }
.rocket::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; border-radius: 50%; background: inherit; box-shadow: inherit; animation: rocket-glow 0.3s ease-in-out infinite; }
@keyframes rocket-glow { 0%,100% { transform: translateX(-50%) scale(1); opacity: 1; } 50% { transform: translateX(-50%) scale(1.5); opacity: 0.7; } }
@keyframes rocket-launch { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(var(--launch-distance)) scale(0.3); opacity: 0; } }
.explosion-particle { position: absolute; width: 6px; height: 6px; border-radius: 50%; animation: particle-burst 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; filter: blur(0.5px); }
.explosion-particle::before { content: ""; position: absolute; inset: -2px; border-radius: 50%; background: inherit; opacity: 0.5; animation: particle-glow 2.5s ease-out forwards; }
@keyframes particle-glow { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3); opacity: 0; } }
@keyframes particle-burst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--particle-x), var(--particle-y)) scale(0); opacity: 0; } }
.heart-firework { position: absolute; font-size: 40px; animation: heart-burst 2s ease-out forwards; filter: drop-shadow(0 0 20px currentColor); }
@keyframes heart-burst { 0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(calc(-50% + var(--heart-x)), calc(-50% + var(--heart-y))) scale(1.5) rotate(360deg); opacity: 0; } }
.star-burst { position: absolute; font-size: 30px; animation: star-spin 1.5s ease-out forwards; filter: drop-shadow(0 0 15px gold); }
@keyframes star-spin { 0% { transform: scale(0) rotate(0deg); opacity: 0; } 30% { opacity: 1; } 100% { transform: scale(2) rotate(720deg); opacity: 0; } }
.balloon { position: absolute; font-size: 38px; animation: balloon-float ease-out forwards; filter: drop-shadow(0 0 20px currentColor); }
.balloon::before { content: ""; position: absolute; top: 100%; left: 50%; width: 2px; height: 50px; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent); transform: translateX(-50%); }
@media (min-width: 640px) { .balloon { font-size: 48px; } }
@keyframes balloon-float { 0% { transform: translateY(0) rotate(0deg) scale(0.3); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(-120vh) rotate(var(--rotate)) scale(1); opacity: 0; } }
.confetti { position: absolute; width: 10px; height: 10px; animation: confetti-fall 3s linear forwards; }
@keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
.text-burst { position: absolute; font-size: 24px; font-weight: 900; color: white; text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; animation: text-burst-anim 2s ease-out forwards; }
@keyframes text-burst-anim { 0% { transform: scale(0); opacity: 0; } 30% { opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
#ascii-canvas { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; opacity: 0; transition: opacity 0.3s; max-width: 100vw; max-height: 50vh; }
#ascii-canvas.show { opacity: 1; }
#matrix-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; display: none; opacity: 1; transition: opacity 1s; }
#matrix-canvas.show { display: block; }
#matrix-canvas.fade { opacity: 0.2; }
#photo-gallery { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10; opacity: 0; transition: opacity 1.5s; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; padding: 140px 12px 180px 12px; background: radial-gradient(circle at top, rgba(139, 0, 139, 0.15), transparent 70%), radial-gradient(circle at bottom, rgba(255, 20, 147, 0.1), transparent 60%); }
@media (min-width: 640px) { #photo-gallery { padding: 160px 20px 200px 20px; } }
#photo-gallery.show { opacity: 1; }
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-width: 1200px; margin: 0 auto; animation: gallery-fade-in 1.2s ease-out forwards; }
@media (min-width: 640px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
@media (min-width: 1024px) { .gallery-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
@keyframes gallery-fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.photo-item { position: relative; overflow: hidden; border-radius: 20px; aspect-ratio: 1; animation: photo-pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; cursor: pointer; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1); }
@media (min-width: 640px) { .photo-item { border-radius: 24px; } }
.photo-item:hover { transform: scale(1.08) translateY(-8px) rotate(2deg); box-shadow: 0 20px 60px rgba(255, 20, 147, 0.6), 0 0 80px rgba(255, 105, 180, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.3); z-index: 10; }
.photo-item:active { transform: scale(0.95); }
.photo-item:nth-child(1) { animation-delay: 0.1s; }
.photo-item:nth-child(2) { animation-delay: 0.2s; }
.photo-item:nth-child(3) { animation-delay: 0.3s; }
.photo-item:nth-child(4) { animation-delay: 0.4s; }
.photo-item:nth-child(5) { animation-delay: 0.5s; }
.photo-item:nth-child(6) { animation-delay: 0.6s; }
@keyframes photo-pop-in { 0% { opacity: 0; transform: scale(0.3) rotate(-15deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
.photo-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
.photo-item:hover img { transform: scale(1.15); }
.photo-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 20, 147, 0.4), rgba(147, 51, 234, 0.3), rgba(255, 105, 180, 0.4)); opacity: 0; transition: opacity 0.5s; display: flex; align-items: center; justify-content: center; font-size: 50px; backdrop-filter: blur(2px); }
.photo-item:hover .photo-overlay { opacity: 1; }
.photo-overlay-emoji { animation: emoji-bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)); }
@keyframes emoji-bounce-in { 0% { transform: scale(0) rotate(-180deg); } 100% { transform: scale(1) rotate(0deg); } }
.photo-item::before { content: ""; position: absolute; inset: -3px; border-radius: 20px; padding: 3px; background: linear-gradient(135deg, #ff1493, #9333ea, #ff69b4, #ffd700, #ff1493); background-size: 300% 300%; animation: gradient-rotate 3s ease infinite; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.5s; }
@media (min-width: 640px) { .photo-item::before { border-radius: 24px; } }
.photo-item:hover::before { opacity: 1; }
@keyframes gradient-rotate { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.photo-sparkle { position: absolute; font-size: 20px; opacity: 0; transition: all 0.5s; pointer-events: none; }
.photo-sparkle-1 { top: 10px; right: 10px; animation: sparkle-twinkle 1.5s ease-in-out infinite; }
.photo-sparkle-2 { bottom: 10px; left: 10px; animation: sparkle-twinkle 1.5s ease-in-out infinite 0.5s; }
.photo-item:hover .photo-sparkle { opacity: 1; }
@keyframes sparkle-twinkle { 0%,100% { opacity: 1; transform: scale(1) rotate(0deg); } 50% { opacity: 0.5; transform: scale(1.3) rotate(180deg); } }
#photo-caption { position: fixed; top: 40px; left: 50%; transform: translateX(-50%); z-index: 11; opacity: 0; transition: opacity 1.5s; text-align: center; padding: 0 16px; width: 100%; }
@media (min-width: 640px) { #photo-caption { top: 60px; } }
#photo-caption.show { opacity: 1; }
.caption-wrapper { position: relative; display: inline-block; }
.caption-glow { position: absolute; inset: -30px; filter: blur(50px); opacity: 0.8; background: radial-gradient(circle, #ff1493 0%, transparent 70%), radial-gradient(circle, #9d4edd 0%, transparent 70%), radial-gradient(circle, #ffd700 0%, transparent 70%); animation: glow-pulse 2.5s ease-in-out infinite; }
.caption-text { position: relative; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; }
@media (min-width: 640px) { .caption-text { gap: 12px; } }
.caption-word { font-size: 32px; font-weight: 900; background: linear-gradient(135deg, #ff1493 0%, #ff69b4 20%, #ffd700 40%, #9d4edd 60%, #ff69b4 80%, #ff1493 100%); background-size: 400% 400%; animation: gradient-flow 5s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 25px rgba(255, 105, 180, 1)); drop-shadow(0 0 50px rgba(157, 78, 221, 0.6)); animation: text-glow 2.5s ease-in-out infinite, text-float 3s ease-in-out infinite; letter-spacing: 2px; }
@media (min-width: 640px) { .caption-word { font-size: 48px; } }
@media (min-width: 768px) { .caption-word { font-size: 56px; } }
@keyframes gradient-flow { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes text-glow { 0%,100% { filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.8)) drop-shadow(0 0 40px rgba(157, 78, 221, 0.4)); } 50% { filter: drop-shadow(0 0 40px rgba(255, 105, 180, 1)) drop-shadow(0 0 80px rgba(157, 78, 221, 0.8)) drop-shadow(0 0 120px rgba(255, 215, 0, 0.6)); } }
@keyframes text-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
.caption-icon { font-size: 36px; animation: icon-bounce 2s ease-in-out infinite; filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 105, 180, 0.8)); transform-origin: center; }
@media (min-width: 640px) { .caption-icon { font-size: 52px; } }
@media (min-width: 768px) { .caption-icon { font-size: 60px; } }
@keyframes icon-bounce { 0%,100% { transform: translateY(0) scale(1) rotate(0deg); } 25% { transform: translateY(-15px) scale(1.1) rotate(-10deg); } 75% { transform: translateY(-15px) scale(1.1) rotate(10deg); } }
.gallery-message { margin-top: 40px; text-align: center; animation: message-fade-in 1.5s ease-out 1s backwards; }
@media (min-width: 640px) { .gallery-message { margin-top: 60px; } }
@keyframes message-fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.message-box { position: relative; display: inline-block; }
.message-glow { position: absolute; inset: -20px; filter: blur(40px); opacity: 0.7; background: linear-gradient(90deg, #ff1493, #9d4edd, #ff1493); animation: glow-pulse 2s ease-in-out infinite; }
.message-content { position: relative; padding: 16px 32px; border-radius: 50px; background: linear-gradient(135deg, rgba(255, 20, 147, 0.9), rgba(157, 78, 221, 0.9)); backdrop-filter: blur(10px); border: 2px solid rgba(255, 192, 203, 0.4); box-shadow: 0 8px 32px rgba(255, 20, 147, 0.5), 0 0 60px rgba(157, 78, 221, 0.3); color: white; font-size: 15px; font-weight: 600; text-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }
@media (min-width: 640px) { .message-content { padding: 20px 48px; font-size: 20px; } }
#bg-fireworks { position: fixed; inset: 0; z-index: 5; pointer-events: none; display: none; }
#bg-fireworks.show { display: block; }
.bg-firework { position: absolute; animation: bg-burst 2s ease-out infinite; }
@keyframes bg-burst { 0% { transform: scale(0); opacity: 0.8; } 50% { opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
.bg-particle { position: absolute; width: 3px; height: 3px; border-radius: 50%; animation: bg-particle-move 2s ease-out infinite; }
@keyframes bg-particle-move { 0% { transform: rotate(var(--angle)) translateY(0); opacity: 1; } 100% { transform: rotate(var(--angle)) translateY(-120px); opacity: 0; } }
@keyframes gradient-slide { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

/* Photo wish modal */
#photo-wish-modal { position: fixed; inset: 0; z-index: 100; display: none; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); animation: modal-fade-in 0.3s ease-out; }
#photo-wish-modal.show { display: flex; }
@keyframes modal-fade-in { from { opacity: 0; } to { opacity: 1; } }
.wish-content { position: relative; max-width: 90%; width: 500px; padding: 40px 30px; background: linear-gradient(135deg, rgba(255, 20, 147, 0.95), rgba(157, 78, 221, 0.95)); border-radius: 30px; box-shadow: 0 20px 60px rgba(255, 20, 147, 0.6), 0 0 100px rgba(157, 78, 221, 0.4); animation: wish-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes wish-pop-in { 0% { transform: scale(0) rotate(-15deg); opacity: 0; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
.wish-text { color: white; font-size: 20px; font-weight: 600; text-align: center; line-height: 1.6; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); margin-bottom: 30px; }
@media (min-width: 640px) { .wish-text { font-size: 24px; } }
.wish-close { padding: 12px 36px; background: white; color: #ff1493; border: none; border-radius: 50px; font-size: 16px; font-weight: 700; cursor: pointer; box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3); transition: all 0.3s; }
.wish-close:hover { transform: scale(1.05); box-shadow: 0 8px 30px rgba(255, 255, 255, 0.5); }
.wish-close:active { transform: scale(0.95); }
/* ==== END: injected styles ==== */
`;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-injected", "birthday-app");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    // --- Begin logic ported from original script ---
    let particles = [];
    let targetPoints = [];
    let animFrame;
    let matrixInterval;

    const pinkColors = [
      "#ff1493",
      "#ff69b4",
      "#ff85a2",
      "#ffb6c1",
      "#ffc0cb",
      "#ff99cc",
      "#ff77aa",
    ];

    const messages = ["CHÚC MỪNG SINH NHẬT","07.12.2025","21+","PHẠM THỊ TUYẾT MAI"];

    const photos = [
      { url: "images/mei.jpg", emoji: "🎂", wish: "Chúc bạn luôn xinh đẹp, 🌸" },
      { url: "images/mei1.jpg", emoji: "🎈", wish: "Chúc bạn có một năm mới tràn đầy niềm vui" },
      { url: "images/mei3.jpg", emoji: "🎁", wish: "Chúc bạn luôn khỏe mạnh, thành công trong mọi việc làm" },
      { url: "images/mei4.jpg", emoji: "💖", wish: "Chúc bạn tuổi 21 này sẽ có thật nhiều kỷ niệm đẹp" },
      { url: "images/mei2.jpg", emoji: "🎉", wish: "Chúc mừng sinh nhật bạn! Chúc bạn tất cả trừ vất vả " },
      { url: "images/mei5.jpg", emoji: "🥳", wish: "Chúc All" },
    ];

    function showPhotoWish(wish) {
      const modal = rootRef.current.querySelector("#photo-wish-modal");
      const wishText = rootRef.current.querySelector("#wish-text");
      if (modal && wishText) {
        wishText.textContent = wish;
        modal.classList.add("show");
      }
    }

    function hidePhotoWish() {
      const modal = rootRef.current.querySelector("#photo-wish-modal");
      if (modal) {
        modal.classList.remove("show");
      }
    }

    function createPhotoGallery(root) {
      const grid = root.querySelector("#gallery-grid");
      if (!grid) return;
      grid.innerHTML = "";

      photos.forEach((photo, index) => {
        const item = document.createElement("div");
        item.className = "photo-item";

        const img = document.createElement("img");
        img.src = photo.url;
        img.alt = "Birthday photo " + (index + 1);
        img.loading = "lazy";

        const overlay = document.createElement("div");
        overlay.className = "photo-overlay";

        const emoji = document.createElement("div");
        emoji.className = "photo-overlay-emoji";
        emoji.textContent = photo.emoji;
        overlay.appendChild(emoji);

        const sparkle1 = document.createElement("div");
        sparkle1.className = "photo-sparkle photo-sparkle-1";
        sparkle1.textContent = "🎉";

        const sparkle2 = document.createElement("div");
        sparkle2.className = "photo-sparkle photo-sparkle-2";
        sparkle2.textContent = "🎊";

        // Add click handler to show wish
        item.addEventListener("click", () => {
          showPhotoWish(photo.wish);
        });

        item.appendChild(img);
        item.appendChild(overlay);
        item.appendChild(sparkle1);
        item.appendChild(sparkle2);
        grid.appendChild(item);
      });
    }

    function handleCardClick(root) {
      const card = root.querySelector("#birthday-card");
      const flash = root.querySelector("#flash");
      const fireworksContainer = root.querySelector("#fireworks-container");

      if (card) card.classList.remove("show");
      if (flash) flash.classList.add("active");

      setTimeout(() => {
        if (flash) flash.classList.remove("active");
      }, 900);

      if (fireworksContainer) {
        fireworksContainer.classList.add("show");
        createFireworksShow(root);

        setTimeout(() => {
          fireworksContainer.classList.remove("show");
          startAsciiParticles(root);
        }, 5000);
      }
    }

    function createFireworksShow(root) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      container.innerHTML = "";

      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          launchFirework(root);
        }, i * 200);
      }

      const heartColors = ["#ff1493", "#ff69b4", "#ff99cc", "#ffc0cb"];
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const x = 20 + Math.random() * 60;
          const y = 20 + Math.random() * 60;
          createHeartFirework(root, x, y, heartColors[i % heartColors.length]);
        }, 1000 + i * 350);
      }

      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const x = 15 + Math.random() * 70;
          const y = 15 + Math.random() * 70;
          createStarBurst(root, x, y);
        }, 1500 + i * 250);
      }

      const texts = ["HAPPY BIRTHDAY", "PHẠM THỊ TUYẾT MAI", "🎉", "💖"];
      texts.forEach((text, i) => {
        setTimeout(() => {
          const x = 20 + i * 15;
          const y = 30 + (i % 2) * 20;
          createTextBurst(root, text, x, y);
        }, 2000 + i * 400);
      });

      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          createConfetti(root);
        }, i * 50);
      }

      const balloonEmojis = ["🎈", "🎀", "💖", "💝", "🎁"];
      for (let i = 0; i < 40; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        balloon.style.left = Math.random() * 100 + "%";
        balloon.style.bottom = "-50px";
        balloon.style.setProperty("--rotate", Math.random() * 40 - 20 + "deg");
        balloon.style.animationDuration = 4 + Math.random() * 2 + "s";
        balloon.style.animationDelay = Math.random() * 2.5 + "s";
        balloon.style.color = pinkColors[i % pinkColors.length];
        container.appendChild(balloon);
      }
    }

    function createHeartFirework(root, x, y, color) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      const hearts = ["💖", "💕", "💗", "💓", "💝"];

      for (let i = 0; i < 8; i++) {
        const heart = document.createElement("div");
        heart.className = "heart-firework";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + "%";
        heart.style.top = y + "%";
        heart.style.color = color;

        const angle = (360 / 8) * i;
        const distance = 150 + Math.random() * 100;
        const rad = (angle * Math.PI) / 180;
        const dx = Math.cos(rad) * distance;
        const dy = Math.sin(rad) * distance;

        heart.style.setProperty("--heart-x", dx + "px");
        heart.style.setProperty("--heart-y", dy + "px");
        heart.style.animationDelay = Math.random() * 0.3 + "s";

        container.appendChild(heart);

        setTimeout(() => { heart.remove(); }, 2500);
      }
    }

    function createStarBurst(root, x, y) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      const stars = ["🎆", "🎉", "🎇", "🎊"];

      for (let i = 0; i < 5; i++) {
        const star = document.createElement("div");
        star.className = "star-burst";
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        star.style.left = x + "%";
        star.style.top = y + "%";
        star.style.animationDelay = i * 0.1 + "s";

        container.appendChild(star);

        setTimeout(() => { star.remove(); }, 2000);
      }
    }

    function createTextBurst(root, text, x, y) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      const textEl = document.createElement("div");
      textEl.className = "text-burst";
      textEl.textContent = text;
      textEl.style.left = x + "%";
      textEl.style.top = y + "%";
      textEl.style.color = pinkColors[Math.floor(Math.random() * pinkColors.length)];

      container.appendChild(textEl);

      setTimeout(() => { textEl.remove(); }, 2500);
    }

    function createConfetti(root) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-20px";
      confetti.style.background = pinkColors[Math.floor(Math.random() * pinkColors.length)];
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
      confetti.style.animationDelay = Math.random() * 1 + "s";

      if (Math.random() > 0.5) confetti.style.borderRadius = "50%";

      container.appendChild(confetti);

      setTimeout(() => { confetti.remove(); }, 5000);
    }

    function launchFirework(root) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      const startX = 10 + Math.random() * 80;
      const endY = 15 + Math.random() * 60;
      const color = pinkColors[Math.floor(Math.random() * pinkColors.length)];

      const rocket = document.createElement("div");
      rocket.className = "rocket";
      rocket.style.left = startX + "%";
      rocket.style.bottom = "0";
      rocket.style.background = "linear-gradient(to top, " + color + ", transparent)";
      rocket.style.boxShadow = "0 0 25px " + color + ", 0 0 50px " + color;
      rocket.style.setProperty("--launch-distance", "-" + (100 - endY) + "vh");
      container.appendChild(rocket);

      setTimeout(() => { createExplosion(root, startX, endY, color); rocket.remove(); }, 1000);
    }

    function createExplosion(root, x, y, color) {
      const container = root.querySelector("#fireworks-container");
      if (!container) return;
      const explosion = document.createElement("div");
      explosion.style.position = "absolute";
      explosion.style.left = x + "%";
      explosion.style.top = y + "%";

      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (360 / particleCount) * i;
        const distance = 100 + Math.random() * 80;
        const particle = document.createElement("div");
        particle.className = "explosion-particle";
        particle.style.background = color;
        particle.style.boxShadow = "0 0 20px " + color + ", 0 0 40px " + color;

        const rad = (angle * Math.PI) / 180;
        const dx = Math.cos(rad) * distance;
        const dy = Math.sin(rad) * distance;
        particle.style.setProperty("--particle-x", dx + "px");
        particle.style.setProperty("--particle-y", dy + "px");

        explosion.appendChild(particle);
      }

      container.appendChild(explosion);
      setTimeout(() => { explosion.remove(); }, 2500);
    }

    function generatePoints(text, canvas) {
      const offCanvas = document.createElement("canvas");
      const ctx = offCanvas.getContext("2d");
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;

      const fontSize = Math.floor(offCanvas.height * 0.4);
      ctx.font = "bold " + fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.clearRect(0, 0, offCanvas.width, offCanvas.height);
      ctx.fillStyle = "white";
      ctx.fillText(text, offCanvas.width / 2, offCanvas.height / 2);

      const imageData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height).data;
      const points = [];
      const step = window.innerWidth < 640 ? 3 : 3;
      for (let y = 0; y < offCanvas.height; y += step) {
        for (let x = 0; x < offCanvas.width; x += step) {
          const index = (y * offCanvas.width + x) * 4;
          if (imageData[index + 3] > 128) points.push({ x: x, y: y });
        }
      }
      return points;
    }

    function initParticles(canvas) {
      const chars = ["★", "●", "♥", "◆"];
      particles = [];
      const particleCount = window.innerWidth < 640 ? 1500 : 2500;
      for (let i = 0; i < particleCount; i++) {
        particles.push({ 
          x: Math.random() * canvas.width, 
          y: Math.random() * canvas.height, 
          tx: 0, 
          ty: 0, 
          char: chars[Math.floor(Math.random() * chars.length)],
          vx: 0,
          vy: 0
        });
      }
    }

    function morphTo(text, canvas) {
      const chars = ["★", "●", "♥", "◆"];
      targetPoints = generatePoints(text, canvas);

      while (particles.length < targetPoints.length) {
        particles.push({ 
          x: Math.random() * canvas.width, 
          y: Math.random() * canvas.height, 
          tx: 0, 
          ty: 0, 
          char: chars[Math.floor(Math.random() * chars.length)],
          vx: 0,
          vy: 0
        });
      }

      particles.forEach((particle, index) => {
        if (index < targetPoints.length) {
          particle.tx = targetPoints[index].x;
          particle.ty = targetPoints[index].y;
        } else {
          particle.tx = Math.random() * canvas.width;
          particle.ty = canvas.height + 50;
        }
      });
    }

    function drawParticles(canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff69b4";
      const fontSize = window.innerWidth < 640 ? 11 : 12;
      ctx.font = "bold " + fontSize + "px monospace";
      ctx.textAlign = "center";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#ff69b4";

      const easing = 0.15;
      particles.forEach((particle) => {
        particle.vx = (particle.tx - particle.x) * easing;
        particle.vy = (particle.ty - particle.y) * easing;
        particle.x += particle.vx;
        particle.y += particle.vy;
        ctx.fillText(particle.char, particle.x, particle.y);
      });

      animFrame = requestAnimationFrame(() => drawParticles(canvas));
    }

    function startAsciiParticles(root) {
      startMatrixRain(root);

      const canvas = root.querySelector("#ascii-canvas");
      if (!canvas) return;

      const width = Math.min(window.innerWidth * 0.95, 900);
      const height = window.innerWidth < 640 ? 100 : 120;
      canvas.width = width;
      canvas.height = height;

      setTimeout(() => {
        const matrixCanvas = root.querySelector("#matrix-canvas");
        if (matrixCanvas) matrixCanvas.classList.add("fade");
        canvas.classList.add("show");

        initParticles(canvas);
        drawParticles(canvas);

        let delay = 0;
        messages.forEach((msg) => {
          setTimeout(() => { morphTo(msg, canvas); }, delay);
          delay += 3500;
        });

        setTimeout(() => {
          canvas.classList.remove("show");
          const matrixCanvas2 = root.querySelector("#matrix-canvas");
          if (matrixCanvas2) matrixCanvas2.classList.remove("show");
          if (matrixInterval) clearInterval(matrixInterval);

          setTimeout(() => {
            createPhotoGallery(root);
            const pg = root.querySelector("#photo-gallery");
            if (pg) pg.classList.add("show");
            const caption = root.querySelector("#photo-caption");
            if (caption) caption.classList.add("show");
            showBackgroundFireworks(root);
          }, 500);
        }, delay + 500);
      }, 2000);
    }

    function startMatrixRain(root) {
      const canvas = root.querySelector("#matrix-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.classList.add("show");

      const chars = "HAPPYBIRTHDAY";
      const fontSize = window.innerWidth < 768 ? 14 : 18;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);

      function rain() {
        ctx.fillStyle = "rgba(0,0,0,0.07)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff69b4";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) drops[i] = 0;
          drops[i]++;
        }
      }

      matrixInterval = setInterval(rain, 50);
    }

    function showBackgroundFireworks(root) {
      const container = root.querySelector("#bg-fireworks");
      if (!container) return;
      container.classList.add("show");

      for (let i = 0; i < 15; i++) {
        const firework = document.createElement("div");
        firework.className = "bg-firework";
        firework.style.left = 10 + (i % 5) * 20 + "%";
        firework.style.top = 15 + Math.floor(i / 5) * 30 + "%";
        firework.style.animationDelay = i * 0.3 + "s";

        for (let j = 0; j < 16; j++) {
          const particle = document.createElement("div");
          particle.className = "bg-particle";
          const color = pinkColors[j % pinkColors.length];
          particle.style.background = color;
          particle.style.boxShadow = "0 0 10px " + color;
          particle.style.setProperty("--angle", j * 22.5 + "deg");
          particle.style.animationDelay = i * 0.3 + "s";
          firework.appendChild(particle);
        }

        container.appendChild(firework);
      }

      const balloonEmojis = ["🎈", "🎀", "💖", "💝"];
      for (let i = 0; i < 20; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.textContent = balloonEmojis[i % balloonEmojis.length];
        balloon.style.left = i * 5 + "%";
        balloon.style.bottom = "-50px";
        balloon.style.setProperty("--rotate", Math.random() * 40 - 20 + "deg");
        balloon.style.animationDuration = 5 + Math.random() * 3 + "s";
        balloon.style.animationDelay = Math.random() * 4 + "s";
        balloon.style.filter = "drop-shadow(0 0 10px " + pinkColors[i % pinkColors.length] + ")";
        container.appendChild(balloon);
      }
    }

    // Attach event listeners scoped inside component
    const root = rootRef.current;
    const cardWrapper = root.querySelector(".card-wrapper");
    const wishClose = root.querySelector("#wish-close-btn");
    
    if (cardWrapper) {
      const clickHandler = () => handleCardClick(root);
      cardWrapper.addEventListener("click", clickHandler);
    }

    if (wishClose) {
      wishClose.addEventListener("click", hidePhotoWish);
    }

    // Cleanup on unmount
    return () => {
      if (cardWrapper) {
        cardWrapper.removeEventListener("click", handleCardClick);
      }
      if (wishClose) {
        wishClose.removeEventListener("click", hidePhotoWish);
      }
      if (animFrame) cancelAnimationFrame(animFrame);
      if (matrixInterval) clearInterval(matrixInterval);
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  // Render DOM structure
  return (
    <div ref={rootRef} className="container">
      <div id="flash"></div>

      <div id="birthday-card" className="show">
        <div className="card-wrapper">
          <div className="card-container">
            <div className="card-glow"></div>
            <div className="card-main">
              <div className="card-pattern"></div>
              <div className="card-border"></div>
              
              {/* Top bunting flags */}
              <div className="bunting-animate" style={{ 
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '28px',
                letterSpacing: '-2px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}>
                🎊🎉🎊🎉🎊🎉
              </div>

              {/* Left balloons */}
              <div className="balloon-left-animate" style={{
                position: 'absolute',
                left: '15px',
                top: '55px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '48px'
              }}>
                <span style={{ transform: 'rotate(-12deg)', filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.5))' }}>🎈</span>
                <span style={{ marginLeft: '15px', transform: 'rotate(8deg)', filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.5))' }}>🎈</span>
              </div>

              {/* Right balloons */}
              <div className="balloon-right-animate" style={{
                position: 'absolute',
                right: '15px',
                top: '55px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '48px'
              }}>
                <span style={{ transform: 'rotate(12deg)', filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.5))' }}>🎈</span>
                <span style={{ marginRight: '15px', transform: 'rotate(-8deg)', filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.5))' }}>🎈</span>
              </div>

              {/* Main title */}
              <div className="title-animate" style={{
                position: 'absolute',
                top: '70px',
                left: 0,
                right: 0,
                textAlign: 'center',
                padding: '0 20px'
              }}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: '900',
                  fontFamily: 'cursive',
                  background: 'linear-gradient(135deg, #dc2626, #ff1493, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(2px 3px 6px rgba(220, 38, 38, 0.3))',
                  marginBottom: '0',
                  lineHeight: '0.9',
                  letterSpacing: '1px'
                }}>
                  Happy
                </div>
                <div style={{
                  fontSize: '64px',
                  fontWeight: '900',
                  fontFamily: 'cursive',
                  background: 'linear-gradient(135deg, #dc2626, #ff1493, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(2px 3px 6px rgba(220, 38, 38, 0.3))',
                  marginBottom: '10px',
                  lineHeight: '0.9',
                  letterSpacing: '1px'
                }}>
                  Birthday
                </div>
                
                {/* Envelope icon */}
                <div className="envelope-animate" style={{ 
                  fontSize: '48px', 
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 4px 8px rgba(255,215,0,0.5))'
                }}>✉️</div>
                
                <div className="name-animate card-name">Phạm Thị Tuyết Mai</div>
              </div>

              {/* Center cake - positioned in middle without overlapping */}
              <div className="cake-animate" style={{
                position: 'absolute',
                left: '50%',
                top: '63%',
                transform: 'translateX(-50%)',
                fontSize: '100px',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
              }}>
                🎂
              </div>

              {/* Left party popper */}
              <div className="decoration-animate-1" style={{
                position: 'absolute',
                left: '20px',
                top: '60%',
                fontSize: '42px',
                transform: 'rotate(-22deg)',
                filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.4))'
              }}>
                🎉
              </div>

              {/* Right party popper */}
              <div className="decoration-animate-2" style={{
                position: 'absolute',
                right: '20px',
                top: '60%',
                fontSize: '42px',
                transform: 'rotate(22deg)',
                filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.4))'
              }}>
                🎉
              </div>

              {/* Left gift */}
              <div className="decoration-animate-3" style={{
                position: 'absolute',
                left: '18px',
                bottom: '75px',
                fontSize: '40px',
                transform: 'rotate(-12deg)',
                filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.4))'
              }}>
                🎁
              </div>

              {/* Right gift */}
              <div className="decoration-animate-4" style={{
                position: 'absolute',
                right: '18px',
                bottom: '75px',
                fontSize: '40px',
                transform: 'rotate(12deg)',
                filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.4))'
              }}>
                🎁
              </div>

              {/* Confetti dots scattered */}
              <div style={{
                position: 'absolute',
                inset: '65px 20px',
                pointerEvents: 'none'
              }}>
                {[
                  { left: '12%', top: '5%', color: '#fbbf24', delay: 1.9 },
                  { left: '88%', top: '8%', color: '#f59e0b', delay: 2.0 },
                  { left: '18%', top: '18%', color: '#ef4444', delay: 2.1 },
                  { left: '82%', top: '20%', color: '#8b5cf6', delay: 2.2 },
                  { left: '25%', top: '32%', color: '#ec4899', delay: 2.3 },
                  { left: '75%', top: '35%', color: '#3b82f6', delay: 2.4 },
                  { left: '15%', top: '50%', color: '#10b981', delay: 2.5 },
                  { left: '85%', top: '52%', color: '#fbbf24', delay: 2.6 },
                  { left: '30%', top: '12%', color: '#f59e0b', delay: 2.7 },
                  { left: '70%', top: '15%', color: '#ec4899', delay: 2.8 },
                  { left: '40%', top: '28%', color: '#8b5cf6', delay: 2.9 },
                  { left: '60%', top: '30%', color: '#ef4444', delay: 3.0 },
                ].map((conf, i) => (
                  <div 
                    key={i}
                    className="confetti-animate"
                    style={{ 
                      position: 'absolute', 
                      left: conf.left, 
                      top: conf.top, 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: conf.color,
                      boxShadow: `0 0 8px ${conf.color}`,
                      animationDelay: `${conf.delay}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fireworks-container"></div>
      <canvas id="ascii-canvas"></canvas>
      <canvas id="matrix-canvas"></canvas>

      <div id="photo-gallery">
        <div className="gallery-grid" id="gallery-grid"></div>
        <div className="gallery-message">
          <div className="message-box">
            <div className="message-glow"></div>
            <div className="message-content">🎂 Chúc tất cả trừ vất vả 🎂</div>
          </div>
        </div>
      </div>

      <div id="photo-caption">
        <div className="caption-wrapper">
          <div className="caption-glow"></div>
          <div className="caption-text">
            <span className="caption-word">HAPPY</span>
            <span className="caption-icon">🎂</span>
            <span className="caption-word">BIRTHDAY</span>
          </div>
        </div>
      </div>

      <div id="bg-fireworks"></div>

      {/* Photo wish modal */}
      <div id="photo-wish-modal">
        <div className="wish-content">
          <div className="wish-text" id="wish-text"></div>
          <center>
            <button className="wish-close" id="wish-close-btn">Đóng ❤️</button>
          </center>
        </div>
      </div>
    </div>
  );
}