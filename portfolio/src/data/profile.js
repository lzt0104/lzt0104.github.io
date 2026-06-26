// =============================================
// 個人基本資料 - 只需修改這個檔案即可更新資訊
// =============================================

export const profile = {
  name: '劉政廷',
  nameEn: 'Liu Zheng-Ting',
  tagline: 'cat welcome.txt',
  copyright: '© 2025 Liu Zheng-Ting. All rights reserved.',

  intro: [
    { label: '身份', value: '國立雲林科技大學資訊管理系(人工智慧技優專班)' },
    { label: '現職', value: '源核資訊整合工作室 負責人兼執行長' },
    { label: '專長', value: '資訊技術 | 選手培訓 | 系統開發' },
    { label: '目標', value: '成為優秀的資訊工作者與教育者' },
  ],

  bio: '我是 108 課綱第一屆的「白老鼠」，熱愛探索各種技術領域並挑戰自我。曾在各大社群活躍，對教育與技術有深厚熱情。',
  currentRole: '資管系學生 / 接案開發者 / 追夢人',

  education: [
    { year: '現職', text: '源核資訊整合工作室 執行長', highlight: true },
    { year: '現職', text: '火心壬新創股份有限公司 工程師兼PM', highlight: true },
    { year: '113學年度', text: '國立雲林科技大學 資訊管理系 (人工智慧技優專班)', highlight: true },
    { year: '112學年度', text: '國立高雄科技大學 智慧商務系 (結業)' },
    { year: '111學年度', text: '國立高雄科技大學 智慧商務系 (特殊選才錄取)' },
    { year: '111學年度', text: '國立草屯商工 資料處理科 (畢業)' },
  ],

  skills: [
    { name: 'Python',       level: 90 },
    { name: 'JavaScript',   level: 80 },
    { name: 'HTML/CSS',     level: 85 },
    { name: 'Data Science', level: 75 },
    { name: 'AI / ML',      level: 55 },
    { name: 'MS Office',    level: 99 },
  ],

  // 可新增多筆，每筆格式如下。grade 和 amount 都是選填。
  research: [
    {
      title: '擬人化醫療聊天機器人於乳癌病患之照護',
      id: '113-2813-C992-027-H',
      grade: 'A',
      amount: '53,000',
    },
    {
      title: '結合RAG與擬人化對話代理之隱私感知衛教資訊系統設計與有用性評估研究：以女性更年期為應用情境',
      id: '115-2813-C-224-028-H',
      grade: 'B',    
      amount: '58,000', 
    },
  ],

  links: [
    { name: 'GitHub',    url: 'https://github.com/lzt0104' },
    { name: 'Facebook',  url: 'https://www.facebook.com/zhengting0104' },
    { name: 'Email',     url: 'mailto:zhengtingliu0104@gmail.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/lie.1131/' },
  ],

  calendar: {
    embedUrl: 'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&showPrint=0&showTitle=0&showTz=0&showCalendars=0&src=emhlbmd0aW5nbGl1MDEwNEBnbWFpbC5jb20&src=NDk2MmFkNGY3N2MxYTBmMDViYTA2YTlhZDJiZGNmMjZmNmY3MmM4ODNjOGFlZDIxYjUwYjQxY2YwYTc1M2Q0ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjdiMzRlZDI2MjY1NjdjYjkxZjFiYTdhZTM0NmJhNDQzYjkyZTgwNTUxYTkzYWI1MTIzYzc2N2ZhMzk5YzE0YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dXNqYXN1bWM2NTE4Nm10OGtpYjJrMHRwczlhdGJxODhAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cTZqamkwOXVwZGN0bmF1ZnM5dGs2djJxdHJsZ2RoZGpAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=emgtdHcudGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23008eaa&color=%23f3f4f7&color=%23e4002b&color=%23616161&color=%23795548&color=%230b8043',
  },
};
