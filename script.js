// File script.js
const sounds = {
    "Chiêng Mừng Lúa Mới": new Howl({ src: ["audio/cong-chieng-1.mp3"] }),
    "Chiêng Cầu Mưa": new Howl({ src: ["audio/cong-chieng-2.mp3"] })
};

document.querySelector(".cta-button").addEventListener("click", () => {
    sounds["Chiêng Mừng Lúa Mới"].play();
});
