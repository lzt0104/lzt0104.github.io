// =============================================
// 個人基本資料
// =============================================

export const profile = {
  name: '劉政廷',
  nameEn: 'Liu Zheng-Ting',
  handle: 'lzt0104',
  location: '雲林 斗六',

  // 首頁自我介紹。建議改成你自己平常講話的方式，一個字串一段
  bio: [
    '我叫劉政廷，目前是 108 課綱第一屆白老鼠。',
    '平常就是寫寫系統、到高職帶文書處理選手、做國科會計畫，還有顧自己的小工作室「源核資訊整合」。',
  ],

  // 求學歷程
  education: [
    { from: '2019.09', to: '2022.06', school: '國立草屯商工', dept: '資料處理科', note: '畢業' },
    { from: '2022.09', to: '2024.06', school: '國立高雄科技大學', dept: '智慧商務系', note: '特殊選才' },
    { from: '2024.09', to: '',        school: '國立雲林科技大學', dept: '資訊管理系（人工智慧技優專班）', note: '技優甄審' },
  ],

  // 首頁便利貼「最近在忙」，done: true 會打勾
  busy: [
    { text: '115 年國科會計畫：更年期衛教 RAG 聊天機器人' },
    { text: '火心壬新創 EPM 實習' },
    { text: '帶臺中家商、豐原高商的文書處理選手' },
    { text: '學生評議委員會委員長（第二十四屆）' },
    { text: '115 學年自辦模擬賽文書處理職種命題' },
  ],

  // 技術（不標百分比，只列實際用過的）
  stack: [
    { group: '語言',     items: ['Python', 'JavaScript', 'SQL', 'HTML / CSS'] },
    { group: '前後端',   items: ['React', 'Node.js', 'Express', 'Flask', 'Django'] },
    { group: 'AI / 資料', items: ['TensorFlow', 'OpenCV', 'RAG', '語音辨識'] },
    { group: '部署',     items: ['Cloudflare Pages', 'Cloudflare Workers', 'D1 / R2'] },
    { group: '文書',     items: ['Word（MOS Expert 國手資格）', 'Excel', 'PowerPoint'] },
  ],

  // 研究計畫，grade 和 amount 都是選填
  research: [
    {
      year: '115',
      title: '結合RAG與擬人化對話代理之隱私感知衛教資訊系統設計與有用性評估研究：以女性更年期為應用情境',
      id: '115-2813-C-224-028-H',
      grade: 'B',
      amount: '58,000',
      status: '執行中',
    },
    {
      year: '113',
      title: '擬人化醫療聊天機器人於乳癌病患之照護：系統設計與有用性評估研究',
      id: '113-2813-C992-027-H',
      grade: 'A',
      amount: '53,000',
      status: '已結案',
    },
  ],

  publications: [
    {
      year: '2025',
      title: 'A Study on a Low-Resource Speech Recognition System for Taiwan Hakka Based on Whisper and LoRA',
      venue: 'ROCLING 2025 · The 37th Conference on Computational Linguistics and Speech Processing',
      note: '2025 FSR 客語語音辨認競賽完賽並發表研討會論文',
      link: 'https://aclanthology.org/2025.rocling-main.54/',
    },
  ],

  links: [
    { name: 'Email',     label: 'zhengtingliu0104@gmail.com', url: 'mailto:zhengtingliu0104@gmail.com' },
    { name: 'GitHub',    label: 'github.com/lzt0104',          url: 'https://github.com/lzt0104' },
    { name: 'Facebook',  label: 'zhengting0104',               url: 'https://www.facebook.com/zhengting0104' },
    { name: 'Instagram', label: '@lie.1131',                   url: 'https://www.instagram.com/lie.1131/' },
    { name: '工作室',     label: 'yuanhe.tw',                   url: 'https://yuanhe.tw/' },
  ],

  calendar: {
    embedUrl: 'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&showPrint=0&showTitle=0&showTz=0&showCalendars=0&src=emhlbmd0aW5nbGl1MDEwNEBnbWFpbC5jb20&src=NDk2MmFkNGY3N2MxYTBmMDViYTA2YTlhZDJiZGNmMjZmNmY3MmM4ODNjOGFlZDIxYjUwYjQxY2YwYTc1M2Q0ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjdiMzRlZDI2MjY1NjdjYjkxZjFiYTdhZTM0NmJhNDQzYjkyZTgwNTUxYTkzYWI1MTIzYzc2N2ZhMzk5YzE0YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dXNqYXN1bWM2NTE4Nm10OGtpYjJrMHRwczlhdGJxODhAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cTZqamkwOXVwZGN0bmF1ZnM5dGs2djJxdHJsZ2RoZGpAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=emgtdHcudGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23008eaa&color=%23f3f4f7&color=%23e4002b&color=%23616161&color=%23795548&color=%230b8043',
  },
};
