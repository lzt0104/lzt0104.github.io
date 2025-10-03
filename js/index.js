document.addEventListener('DOMContentLoaded', function() {

    // --- 全局功能 ---

    // RWD 导航栏汉堡菜单
    const toggler = document.getElementById('navbar-toggler-btn');
    const navLinksContainer = document.getElementById('navbar-links-container');
    if (toggler && navLinksContainer) {
        toggler.addEventListener('click', () => {
            // ▼▼▼▼▼ 修正點 ▼▼▼▼▼
            // 將切換的 class 從 'active' 改為 'is-open'
            navLinksContainer.classList.toggle('is-open');
            // ▲▲▲▲▲ 修正點 ▲▲▲▲▲
        });
    }

    // 为当前页面的导航链接添加 active class (这段逻辑维持不变)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-links .nav-link');
    navLinks.forEach(link => {
        // href 属性可能包含路径，我们只取文件名
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });


    // 访客计 ૩器
    const digits = document.querySelectorAll('.visitor-counter .digit');
    function updateCounterUI(number) {
        if (digits.length === 0) return;
        const numStr = number.toString().padStart(digits.length, '0');
        digits.forEach((digit, index) => {
            if (digit.textContent !== numStr[index]) {
                digit.textContent = numStr[index];
            }
        });
    }

    async function fetchAndUpdateVisitorCount() {
        const workerUrl = 'https://visitor-counter.zhengtingliu0104.workers.dev/'; 
        
        try {
            const response = await fetch(workerUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (data.count) updateCounterUI(data.count);
        } catch (error) {
            console.error('Failed to fetch visitor count:', error);
            updateCounterUI('------'); 
        }

        let onlineCount = document.getElementById('online-count');
        let todayCount = document.getElementById('today-count');
        if (onlineCount) onlineCount.innerText = Math.floor(Math.random() * 10) + 1;
        if (todayCount) {
             const storedTodayCount = localStorage.getItem('todayCount');
             if(storedTodayCount){
                todayCount.innerText = parseInt(storedTodayCount) + 1;
             } else {
                todayCount.innerText = 27;
             }
             localStorage.setItem('todayCount', todayCount.innerText);
        }
    }

    fetchAndUpdateVisitorCount();

    // 标题打字机效果
    const typeWriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.dataset.text;
                if (!el.dataset.typed) {
                    let index = 0;
                    el.textContent = '';
                    el.dataset.typed = true;
                    const interval = setInterval(() => {
                        if (index < text.length) {
                            el.textContent += text.charAt(index);
                            index++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 50);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-title[data-text]').forEach(el => {
        typeWriterObserver.observe(el);
    });

    // --- 页面专属功能 ---

    // 首页 (index.html) 
    const typewriterEl = document.querySelector('.typewriter');
    if (typewriterEl) {
        const textToType = "cat welcome.txt";
        let typeIndex = 0;
        function type() {
            if (typeIndex < textToType.length) {
                typewriterEl.textContent += textToType.charAt(typeIndex);
                typeIndex++;
                setTimeout(type, 150);
            }
        }
        type();
    }

    // 关於我 (about.html)
    const skillContainer = document.getElementById('skill-radar-container');
    if (skillContainer) {
        const skills = [
            { name: 'Python', value: 90 }, { name: 'JavaScript', value: 80 },
            { name: 'HTML/CSS', value: 85 }, { name: 'Data Science', value: 75 },
            { name: 'AI / ML', value: 55 }, { name: 'Microsoft Office', value: 99 }
        ];
        let skillsHtml = '';
        const barLength = 20;
        skills.forEach(skill => {
            const fillCount = Math.round((skill.value / 100) * barLength);
            const emptyCount = barLength - fillCount;
            skillsHtml += `
                <div class="skill-item">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-progress-bar">
                        <span class="fill">${'█'.repeat(fillCount)}</span><span class="empty">${'░'.repeat(emptyCount)}</span>
                    </span>
                    <span class="skill-percent">${skill.value}%</span>
                </div>`;
        });
        skillContainer.innerHTML = skillsHtml;
    }

    // 履历 (resume.html)
    const timelineContainer = document.querySelector('.timeline-cmd');
    if (timelineContainer) {
        const experiences = {
            "2025": ["市立豐原高商『辦公室文案排版美編製作工作坊』講師", "國立雲林科技大學 2025 YunTech ACT社團幹部培訓營 副召兼研修總務組組長", "114年四技二專統一入學測驗－命題編校組","國立南投高商『資訊專業知能文書排版教師研習』講師", "國立彰化高商『資訊專業知能文書排版教師研習』講師","市立臺中家商資料處理科『文書處理職種』培訓講師","國立花蓮高商資料處理科『文書處理職種』培訓講師"],
            "2024": ["通過113年國科會大專生研究計畫", "國立高雄科技大學113學年智慧商務系學會 顧問", "市立豐原高商『超高效電腦技能教師研習』講師", "國立新竹高商『資訊專業知能文書排版教師研習』講師", "113學年商業類文書處理職種自辦模擬賽負責人兼命題"],
            "2023": ["國立高雄科技大學112學年智慧商務系學會 會長","國立高雄科技大學112學年系學會委員會 副主席", "國立高雄科技大學112學年多項校級委員會 學生代表"],
            "2022": ["國立草屯商工第63屆 鎮長獎", "勞動部勞動力發展署中彰投分署第二屆 青年職涯大使"],
            "2021": ["SITCON 2021 閃電講講者", "草商63週年校慶園遊會暨社團成果發表 總召", "2021 COSCUP, SITCON Camp, PyConTW 志工"],
            "2020": ["中投高中職學生聯合會 籌備屆理事長 & 第一屆秘書長", "國立草屯商工第17屆學生自治會 活動長","2021 學生自治會十一校聯合幹部訓練 機動長"]
        };
        let timelineHtml = '';
        for (const year in experiences) {
            timelineHtml += `<div class="entry"><span class="year">[${year}]</span>`;
            experiences[year].forEach(item => { timelineHtml += `<p>${item}</p>`; });
            timelineHtml += `</div>`;
        }
        timelineContainer.innerHTML = timelineHtml;
    }
});