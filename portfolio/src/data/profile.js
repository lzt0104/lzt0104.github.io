// =============================================
// 個人基本資料
// =============================================

export const profile = {
  name: '劉政廷',
  nameEn: 'Liu Zheng-Ting',
  handle: 'lzt0104',
  tagline: '寫系統、帶選手、做研究。',
  location: '雲林 斗六',
  headline: '雲科大資管 · 源核資訊整合工作室',
  nowAsOf: '2026 年 9 月',

  // 首頁自我介紹，一個字串一段
  bio: [
    '108 課綱第一屆的「白老鼠」。高職念草屯商工資料處理科，靠特殊選才進了高科大智慧商務系，一年後轉到雲科大資管系的人工智慧技優專班。',
    '平常大概在做三件事：幫學校寫系統、到高職帶文書處理選手、做國科會計畫。系統多半是很實際的需求——午餐點餐、資源班點名、實習申請文件、模擬賽報名，做完部署在 Cloudflare 上直接給師生使用。帶選手則是從自己比 MOS Word Expert 開始的，後來也開始幫老師上排版研習。',
    '另外開了一間小工作室「源核資訊整合」接案，也在火心壬新創當 EPM 實習生，學怎麼把程式跟專案時程一起顧好。',
  ],

  // 右側規格表
  spec: [
    ['就讀', '國立雲林科技大學 資訊管理系（人工智慧技優專班）'],
    ['工作室', '源核資訊整合工作室 負責人'],
    ['實習', '火心壬新創股份有限公司 EPM'],
    ['研究', '國科會大專生研究計畫 × 2'],
    ['所在', '雲林 斗六 · UTC+8'],
  ],

  // 「現在」區塊，status 會顯示在右側
  now: [
    {
      org: '國立雲林科技大學',
      role: '資訊管理系 人工智慧技優專班',
      note: '課業之外負責 113、114 學年技優專班實務專題競賽的籌辦。',
      status: '就讀中',
    },
    {
      org: '源核資訊整合工作室',
      role: '負責人',
      note: '校園系統與網站開發接案。這個網站上大部分的系統都是從這裡出去的。',
      status: '營運中',
      link: 'https://yuanhe.tw/',
    },
    {
      org: '火心壬新創股份有限公司',
      role: '實習生 · EPM（Engineer Project Manager）',
      note: '一邊寫程式，一邊排時程、追進度、對需求。',
      status: '實習中',
    },
    {
      org: '國科會 115 年大專生研究計畫',
      role: '計畫主持人',
      note: '結合 RAG 與擬人化對話代理的隱私感知衛教系統，情境是女性更年期。',
      status: '執行中',
    },
    {
      org: '雲科大第二十四屆學生會',
      role: '學生評議委員會 委員長',
      note: '處理學生會法規解釋與爭議案件。',
      status: '任期中',
    },
    {
      org: '臺中家商、豐原高商',
      role: '文書處理職種 選手指導',
      note: '114 學年技藝競賽培訓。',
      status: '培訓中',
    },
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
      title: 'A Study on a Low-Resource Speech Recognition System',
      venue: 'ROCLING 2025 · The 37th Conference on Computational Linguistics and Speech Processing',
      note: 'FSR 客語語音辨識競賽完賽並發表',
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
