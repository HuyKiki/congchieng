// Khởi tạo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDEXAMPLEEXAMPLEEXAMPLE",
    authDomain: "cong-chieng-tay-nguyen.firebaseapp.com",
    projectId: "cong-chieng-tay-nguyen",
    storageBucket: "cong-chieng-tay-nguyen.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

// 2. Kết nối Firestore Database
function loadFestivals() {
    // Giả lập dữ liệu nếu không có kết nối Firebase thực tế
    const sampleData = [
        {
            name: "Lễ hội Cồng Chiêng Gia Lai",
            date: "15/03/2024",
            location: "Pleiku, Gia Lai",
            image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            name: "Lễ Bỏ Mả của người Ê-đê",
            date: "20/04/2024",
            location: "Buôn Ma Thuột, Đắk Lắk",
            image: "https://images.unsplash.com/photo-1518258726560-ed5a68d9ac29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            name: "Lễ Cúng Bến Nước",
            date: "05/05/2024",
            location: "Kon Tum",
            image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    festivalList.innerHTML = '';
    
    // Nếu có kết nối Firebase thực, sử dụng code này:
    /*
    db.collection("festivals").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const festival = doc.data();
            addFestivalCard(festival);
        });
    }).catch((error) => {
        console.error("Error loading festivals:", error);
        // Load sample data if Firebase fails
        sampleData.forEach(festival => addFestivalCard(festival));
    });
    */
    
    // Tạm thời sử dụng sample data
    sampleData.forEach(festival => addFestivalCard(festival));
}

function addFestivalCard(festival) {
    const card = document.createElement('div');
    card.className = 'festival-card';
    card.innerHTML = `
        <img src="${festival.image}" alt="${festival.name}">
        <h3>${festival.name}</h3>
        <p>Thời gian: ${festival.date}</p>
        <p>Địa điểm: ${festival.location}</p>
    `;
    festivalList.appendChild(card);
}

// 3. Three.js 3D Model
function init3DViewer() {
    const container = document.getElementById('3d-container');
    
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
        75, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 5, 10);
    scene.add(directionalLight);
    
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Tạo model cồng chiêng đơn giản (do không có model thực tế)
    const createGong = () => {
        const group = new THREE.Group();
        
        // Phần vành cồng
        const geometry = new THREE.TorusGeometry(1, 0.2, 16, 100);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xcd7f32, // Màu đồng
            metalness: 0.9,
            roughness: 0.3
        });
        const torus = new THREE.Mesh(geometry, material);
        group.add(torus);
        
        // Phần núm ở giữa
        const knobGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const knobMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xcd7f32,
            metalness: 0.9,
            roughness: 0.2
        });
        const knob = new THREE.Mesh(knobGeometry, knobMaterial);
        knob.position.y = 0.2;
        group.add(knob);
        
        // Dây treo
        const ropeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
        const ropeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const rope = new THREE.Mesh(ropeGeometry, ropeMaterial);
        rope.position.y = 1.5;
        rope.rotation.z = Math.PI / 2;
        group.add(rope);
        
        return group;
    };
    
    const gong = createGong();
    scene.add(gong);

    // Cải tiến hàm createGong
const createGong = (type = 'standard') => {
    const group = new THREE.Group();
    
    // Base shape with more details
    const geometry = new THREE.TorusGeometry(1, 0.2, 32, 100);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xcd7f32,
        metalness: 0.95,
        roughness: 0.25,
        normalMap: new THREE.TextureLoader().load('textures/metal_normal.jpg'),
        envMap: new THREE.CubeTextureLoader().load([
            'textures/env/px.jpg', 'textures/env/nx.jpg',
            'textures/env/py.jpg', 'textures/env/ny.jpg',
            'textures/env/pz.jpg', 'textures/env/nz.jpg'
        ])
    });
    
    // Add engravings
    const engravings = new THREE.Group();
    // ... code tạo hoa văn ...
    group.add(engravings);
    
    // Improved knob with more details
    const knobGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    knobGeometry.scale(1, 0.7, 1); // Make it slightly flattened
    
    // Hanging rope with physics
    const rope = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    rope.position.y = 1.8;
    
    // Add click interaction
    group.userData = { type: type, sound: 'gong_' + type };
    group.children.forEach(child => {
        child.userData = group.userData;
    });
    
    return group;
};

// Thêm sự kiện click
function setupInteraction() {
    renderer.domElement.addEventListener('click', (event) => {
        // Raycasting để phát hiện click
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            const obj = intersects[0].object;
            if (obj.userData && obj.userData.sound) {
                // Phát âm thanh tương ứng
                playSound(obj.userData.sound);
                
                // Hiệu ứng animation khi gõ
                gsap.to(obj.position, {
                    y: obj.position.y - 0.05,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            }
        }
    });
}
    
    // Xử lý resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Auto rotate
    let autoRotate = true;
    const rotateBtn = document.getElementById('rotate-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    rotateBtn.addEventListener('click', () => {
        autoRotate = !autoRotate;
        rotateBtn.textContent = autoRotate ? "Dừng Xoay" : "Xoay Tự động";
    });
    
    resetBtn.addEventListener('click', () => {
        controls.reset();
        camera.position.z = 5;
        autoRotate = true;
        rotateBtn.textContent = "Xoay Tự động";
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (autoRotate) {
            gong.rotation.y += 0.005;
        }
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
}

// 4. Event Listeners
playSoundBtn.addEventListener('click', () => {
    sounds["Chiêng Mừng Lúa Mới"].play();
    
    // Animation khi nhấn nút
    gsap.to(playSoundBtn, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
});

// Mobile menu toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Close menu when clicking on nav items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFestivals();
    init3DViewer();
});

// Thêm hiệu ứng timeline khi scroll
gsap.utils.toArray(".timeline-event").forEach((event, i) => {
    gsap.from(event, {
        scrollTrigger: {
            trigger: event,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.2,
        ease: "back.out(1)"
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Thêm hiệu ứng khi scroll đến
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Thiết lập trạng thái ban đầu
    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
});

// Hiệu ứng gallery
gsap.from(".gallery-item", {
    scrollTrigger: {
        trigger: ".festival-gallery",
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
});
