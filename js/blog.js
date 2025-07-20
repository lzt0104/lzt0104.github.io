document.addEventListener('DOMContentLoaded', function() {
    // 檢查頁面上是否存在部落格區塊，若不存在則不執行
    const blogListEl = document.getElementById('blog-list');
    if (!blogListEl) {
        return;
    }

    // --- 部落格文章數據 ---
    const blogPosts = [
        {
            id: 'post-2',
            title: '108課綱白老鼠的生存之道',
            date: '2023-06-01',
            content: `身為第一屆108課綱的學生，我們無疑是教育改革浪潮中的「白老鼠」。\n\n最大的改變莫過於「學習歷程檔案」。它強迫我們提早思考自己的方向，並學習如何將過程與成果系統化地記錄下來。\n\n對於未來的學弟妹，我的建議是：\n1. 勇於嘗試，不要怕失敗。\n2. 提早規劃，但保持彈性。\n3. 將每一次的經歷都視為學習的養分。`
        },
        {
            id: 'post-3',
            title: '從高科大到雲科大：我的轉學心路歷程',
            date: '2024-06-17',
            content: `在高科大智慧商務系的兩年，我學習到了許多商管與程式結合的知識，也擔任了系學會會長，這段經歷極大地鍛鍊了我的領導與組織能力。\n\n然而，在學習過程中，我發現自己對於資訊技術的底層原理和人工智慧的深入應用有著更強烈的渴望。這促使我做出了轉向雲科大資管系AI技優專班的決定。\n\n這個決定並不容易，但我相信，為了追尋更契合自己熱情的領域，這樣的轉變是值得的。`
        }
    ];

    // --- 部落格功能 ---
    const blogContentWrapperEl = document.getElementById('blog-content-wrapper');

    // 渲染文章列表
    let listHtml = '';
    blogPosts.forEach(post => {
        listHtml += `<a data-id="${post.id}">-r--r--r-- 1 user user ${post.date} ${post.title}.md</a>`;
    });
    blogListEl.innerHTML = listHtml;

    // 點擊文章標題時的事件監聽
    blogListEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            const postId = e.target.dataset.id;
            const post = blogPosts.find(p => p.id === postId);
            if (post) {
                blogContentWrapperEl.innerHTML = `<h3>${post.title}</h3><p class="date">Last modified: ${post.date}</p><div class="content">${post.content.replace(/\n/g, '<br>')}</div><a class="cmd-button" id="close-blog" style="margin-top: 15px;">[ 返回列表 ]</a>`;
            }
        }
    });
    
    // 點擊返回按鈕時的事件監聽
    blogContentWrapperEl.addEventListener('click', (e) => {
        if (e.target.id === 'close-blog') {
            blogContentWrapperEl.innerHTML = `<p class="placeholder">> select a file to read...</p>`;
        }
    });
});