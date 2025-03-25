// Khởi tạo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDEXAMPLEEXAMPLEEXAMPLE",
    authDomain: "cong-chieng-tay-nguyen.firebaseapp.com",
    projectId: "cong-chieng-tay-nguyen",
    storageBucket: "cong-chieng-tay-nguyen.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Khởi tạo âm thanh với fallback
const sounds = {
    "Chiêng Mừng Lúa Mới": new Howl({
        src: ["sounds/gong-sound.mp3"],
        html5: true,
        volume: 0.5,
        onloaderror: function() {
            console.log("Âm thanh không tải được nhưng vẫn hiển thị nút");
            document.getElementById('play-sound').style.display = 'block';
        }
    })
};

// DOM Elements
const playSoundBtn = document.getElementById('play-sound');
const festivalList = document.getElementById('festival-list');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const timelineItems = document.querySelectorAll('.timeline-item');

// 1. Animation với GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero animation
gsap.from(".hero-content h1", {
    duration: 1.5,
    y: -50,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".hero-content p", {
    duration: 1,
    delay: 0.5,
    y: 30,
    opacity: 0,
    ease: "power2.out"
});

gsap.from(".cta-button", {
    duration: 1,
    delay: 1,
    scale: 0.8,
    opacity: 0,
    ease: "elastic.out(1, 0.5)"
});

// Timeline animation
timelineItems.forEach(item => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1)"
    });
});

// 2. Load festivals (giữ nguyên phần này từ file gốc)
function loadFestivals() {
    const sampleData = [
        {
            name: "Lễ hội Cồng Chiêng Gia Lai",
            date: "15/03/2024",
            location: "Pleiku, Gia Lai",
            image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];
    festivalList.innerHTML = '';
    sampleData.forEach(festival => addFestivalCard(festival));
}

// 3. Three.js 3D Model (giữ nguyên phần này từ file gốc)
function init3DViewer() {
    // ... (giữ nguyên code Three.js từ file gốc)
}

// 4. Event Listeners với xử lý lỗi
playSoundBtn.addEventListener('click', () => {
    try {
        sounds["Chiêng Mừng Lúa Mới"].play();
        gsap.to(playSoundBtn, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    } catch (error) {
        console.error("Lỗi phát âm thanh:", error);
        playSoundBtn.textContent = "Âm thanh tạm lỗi";
        playSoundBtn.style.background = "#8B0000";
    }
});

// Mobile menu và các sự kiện khác (giữ nguyên từ file gốc)
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Khởi tạo khi DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo nút hiển thị
    playSoundBtn.style.display = 'block';
    loadFestivals();
    init3DViewer();
});
