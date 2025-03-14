// 粒子背景設置
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00bcd4"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3f51b5",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // 初始化動畫背景
    initAnimatedBackground();

    // 滾動淡入效果
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    // 導航列滾動效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

function initAnimatedBackground() {
    // 創建Three.js場景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('animated-bg').appendChild(renderer.domElement);

    // 添加網格效果
    const gridSize = 20;
    const geometry = new THREE.PlaneGeometry(50, 50, gridSize, gridSize);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00bcd4,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);

    camera.position.z = 30;
    camera.position.y = 15;
    camera.rotation.x = -0.3;

    // 動畫循環
    function animate() {
        requestAnimationFrame(animate);
        grid.rotation.z += 0.001;
        grid.position.z = Math.sin(Date.now() * 0.001) * 5;
        renderer.render(scene, camera);
    }
    animate();

    // 窗口調整大小
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

function handleScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    
    const triggerBottom = window.innerHeight * 0.8;
    
    // 處理淡入元素
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
    
    // 處理左側滑入元素
    slideLeftElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
    
    // 處理右側滑入元素
    slideRightElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
}

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // 設置初始計數和隨機增長
    let visitorCount = 1;  // 設置初始訪客數
    updateDigitDisplay(visitorCount);
    
    // 模擬隨機訪客計數增長
    setInterval(() => {
        if (Math.random() > 0.7) {  // 30%的機率增加計數
            visitorCount++;
            updateDigitDisplay(visitorCount);
            
            // 同時更新在線人數
            let onlineCount = document.getElementById('online-count');
            let currentOnline = parseInt(onlineCount.innerText);
            
            // 50%的機率增加或減少在線人數
            if (Math.random() > 0.5) {
                onlineCount.innerText = Math.min(currentOnline + 1, 12);
            } else {
                onlineCount.innerText = Math.max(currentOnline - 1, 1);
            }
            
            // 更新今日訪問
            let todayCount = document.getElementById('today-count');
            todayCount.innerText = parseInt(todayCount.innerText) + 1;
        }
    }, 3000);
    
    // 啟用滾動動畫
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// 更新數字顯示
function updateDigitDisplay(number) {
    const digits = number.toString().padStart(6, '0');
    
    for (let i = 0; i < 6; i++) {
        const digitElement = document.getElementById(`digit-${6-i}`);
        
        // 添加動畫效果
        digitElement.style.animation = 'none';
        digitElement.offsetHeight; // 觸發重繪
        digitElement.innerText = digits[i];
        digitElement.style.animation = 'pulse 0.5s';
    }
}