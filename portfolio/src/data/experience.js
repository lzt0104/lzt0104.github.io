// =============================================
// 經歷、競賽、證照資料
//
// log：所有經歷，一行一筆。type 可用：
//   教學 / 自治 / 社群 / 志工 / 研究 / 工作 / 榮譽 / 研習
// 教學類若填了 school + kind，會自動出現在「教學」區塊的印章
//   kind：指導（選手培訓）/ 研習（教師研習）/ 工作坊
// 研習類可填 hours（時數），會加總顯示
// =============================================

export const log = [
  // ── 2026 ──
  { year: 2026, type: '工作', text: '火心壬新創股份有限公司 實習生（程式開發與專案管理，擔任 EPM）' },
  { year: 2026, type: '研究', text: '通過 115 年國科會大專生研究計畫' },
  { year: 2026, type: '榮譽', text: '115 年大專優秀青年' },
  { year: 2026, type: '自治', text: '國立雲林科技大學第二十四屆學生會 學生評議委員會 委員長' },
  { year: 2026, type: '教學', text: '雲科大 2026 YunTech Orientation Camp 新生學涯開展營 院系專業領航講師' },
  { year: 2026, type: '自治', text: '雲科大 113、114 學年人工智慧技優專班實務專題競賽 負責人' },
  { year: 2026, type: '自治', text: '高科大 114 學年「百社拾光」社團評鑑暨觀摩活動 評審' },
  { year: 2026, type: '教學', text: '市立臺中家商 114 學年資料處理科「文書處理職種」選手指導', school: '臺中家商', kind: '指導' },
  { year: 2026, type: '教學', text: '市立豐原高商 114 學年資料處理科「文書處理職種」選手指導', school: '豐原高商', kind: '指導' },
  { year: 2026, type: '教學', text: '115 年四技二專統一入學測驗 命題編校組' },
  { year: 2026, type: '教學', text: '115 學年度自辦模擬賽 文書處理職種總負責人兼命題' },

  // ── 2025 ──
  { year: 2025, type: '教學', text: '雲科大 2025 新生學涯開展營 資訊管理系 院系專業領航講師' },
  { year: 2025, type: '志工', text: '雲科大 2025 新生學涯開展營 資訊管理系 活動隊輔組' },
  { year: 2025, type: '自治', text: '雲科大 2025 YunTech ACT 社團幹部培訓營 副召兼研修總務組組長' },
  { year: 2025, type: '自治', text: '雲科大 2025 YunTech 社團博覽會 活動組' },
  { year: 2025, type: '自治', text: '雲科大 113 學年第二學期 四資管 AI 一 A 班代表' },
  { year: 2025, type: '志工', text: '勞動部勞動力發展署中彰投分署 青年職涯發展中心 114 年度服務青年服務隊 隊員' },
  { year: 2025, type: '教學', text: '市立豐原高商「辦公室文案排版美編製作工作坊」講師', school: '豐原高商', kind: '工作坊' },
  { year: 2025, type: '教學', text: '國立南投高商「資訊專業知能文書排版教師研習」講師', school: '南投高商', kind: '研習' },
  { year: 2025, type: '教學', text: '國立彰化高商「資訊專業知能文書排版教師研習」講師', school: '彰化高商', kind: '研習' },
  { year: 2025, type: '教學', text: '市立臺中家商資料處理科「文書處理職種」培訓講師', school: '臺中家商', kind: '指導' },
  { year: 2025, type: '教學', text: '國立花蓮高商資料處理科「文書處理職種」培訓講師', school: '花蓮高商', kind: '指導' },
  { year: 2025, type: '教學', text: '國立新竹高商資料處理科「文書處理職種」培訓講師', school: '新竹高商', kind: '指導' },
  { year: 2025, type: '教學', text: '114 年四技二專統一入學測驗 命題編校組（闈場試務工作人員）' },
  { year: 2025, type: '教學', text: '114 學年度自辦模擬賽 文書處理職種總負責人兼命題' },
  { year: 2025, type: '教學', text: '114 學年度自辦模擬賽 程式設計職種副負責人' },

  // ── 2024 ──
  { year: 2024, type: '研究', text: '通過 113 年國科會大專生研究計畫' },
  { year: 2024, type: '工作', text: '開設源核資訊整合工作室' },
  { year: 2024, type: '自治', text: '雲科大 113 學年第一學期 四資管 AI 一 A 班代表' },
  { year: 2024, type: '自治', text: '雲科大 113 學年資訊安全研究社 第一屆 出納兼文書' },
  { year: 2024, type: '自治', text: '高科大 113 學年智慧商務系學會 顧問' },
  { year: 2024, type: '自治', text: '高科大 113 學年社團負責人研習營籌備團隊 文書組組員' },
  { year: 2024, type: '教學', text: '高科大 113 學年社團負責人研習營 自治屬性課程講師' },
  { year: 2024, type: '教學', text: '高科大 112 學年金融資訊系學會傳承營 講師' },
  { year: 2024, type: '榮譽', text: '高科大 112 學年第一、二學期 三Q獎學金' },
  { year: 2024, type: '教學', text: '市立豐原高商「超高效電腦技能教師研習」講師', school: '豐原高商', kind: '研習' },
  { year: 2024, type: '教學', text: '市立豐原高商「資訊專業知能文書排版教師研習」講師', school: '豐原高商', kind: '研習' },
  { year: 2024, type: '教學', text: '市立豐原高商「辦公室文案排版美編製作工作坊」講師', school: '豐原高商', kind: '工作坊' },
  { year: 2024, type: '教學', text: '市立豐原高商 113 學年資料處理科「文書處理職種」選手指導', school: '豐原高商', kind: '指導' },
  { year: 2024, type: '教學', text: '國立新竹高商「資訊專業知能文書排版教師研習」講師', school: '新竹高商', kind: '研習' },
  { year: 2024, type: '教學', text: '113 學年度商業類文書處理職種自辦模擬賽 負責人兼命題' },
  { year: 2024, type: '研習', text: '雲科大 113 學年度宿委會志工培訓營', hours: 25 },
  { year: 2024, type: '研習', text: '救國團 113 年大專學生社團負責人研習營（歲寒三友會）' },
  { year: 2024, type: '研習', text: '中華學生社團教育學會 社團經營師第 76 期認證學分班', hours: 15 },

  // ── 2023 ──
  { year: 2023, type: '自治', text: '高科大 112 學年智慧商務系學會 會長' },
  { year: 2023, type: '自治', text: '高科大 112 學年系學會委員會 副主席' },
  { year: 2023, type: '自治', text: '高科大 112 學年學生申訴評議委員會 學生代表' },
  { year: 2023, type: '自治', text: '高科大 112 學年服務教育課程委員會 學生代表' },
  { year: 2023, type: '自治', text: '高科大 112 學年圖書館諮詢委員會 學生代表' },
  { year: 2023, type: '榮譽', text: '高科大 111 學年第二學期 服務教育課程表現優異' },
  { year: 2023, type: '榮譽', text: '高科大 111 學年第二學期 熱心服務活動表現優異' },
  { year: 2023, type: '研習', text: 'FISW 2023 金融資安研習營', hours: 9 },
  { year: 2023, type: '研習', text: '勞動部勞動力發展署中彰投分署 第 2 屆青年職涯大使研習營', hours: 14 },
  { year: 2023, type: '研習', text: '高科大 112 學年度社團負責人研習營', hours: 16 },

  // ── 2022 ──
  { year: 2022, type: '榮譽', text: '國立草屯商工第 63 屆 鎮長獎' },
  { year: 2022, type: '志工', text: '勞動部勞動力發展署中彰投分署 第二屆青年職涯大使' },

  // ── 2021 ──
  { year: 2021, type: '自治', text: '國立草屯商工第 63 週年校慶園遊會暨社團成果發表 總召' },
  { year: 2021, type: '自治', text: '第八屆十一校學生自治會聯合幹部訓練 機動長' },
  { year: 2021, type: '自治', text: '國立草屯商工服裝儀容委員會 學生代表' },
  { year: 2021, type: '自治', text: '國立草屯商工校務會議 學生代表' },
  { year: 2021, type: '社群', text: 'SITCON 2021 閃電講講者' },
  { year: 2021, type: '社群', text: 'COSCUP 2021 開源年會 製播組組員' },
  { year: 2021, type: '社群', text: 'PyCon TW 2021 議程組、場務組組員' },
  { year: 2021, type: '社群', text: 'SITCON Camp 2021 隊輔組組員' },
  { year: 2021, type: '志工', text: '南投縣自造基地冬令營 隊輔' },
  { year: 2021, type: '志工', text: '勞動部中彰投分署青年職涯發展中心 志工' },
  { year: 2021, type: '研習', text: '2021 AIGO 高中職生 AI 扎根系列活動 學員' },
  { year: 2021, type: '研習', text: '2021 人工智慧健康管理冬令營', hours: 12 },
  { year: 2021, type: '研習', text: '2021 典時成金暑期培訓營（5 天）' },
  { year: 2021, type: '研習', text: '技高、技專學習歷程檔案審議會議', hours: 6 },
  { year: 2021, type: '研習', text: '校園資安深耕營 Advanced CyberSecurity Day：基礎漏洞分析與測試', hours: 12 },

  // ── 2020 ──
  { year: 2020, type: '自治', text: '中投高中職學生聯合會 籌備屆理事長、第一屆秘書長' },
  { year: 2020, type: '自治', text: '國立草屯商工第 17 屆學生自治會 活動長' },
  { year: 2020, type: '自治', text: '第三屆高級中等學校學生與署長有約活動 中 2 區學生代表' },
  { year: 2020, type: '自治', text: '第二屆高級中等以下學校課程審議會學生代表遴選委員會 遴選委員' },
  { year: 2020, type: '志工', text: '勞動部中彰投分署青年職涯發展中心 志工' },
  { year: 2020, type: '研習', text: '2020 AIGO 高中職生 AI 扎根系列活動 學員' },
  { year: 2020, type: '研習', text: '臺灣青年民主協會 全國高級中等學校學生自治培力營', hours: 16 },
  { year: 2020, type: '研習', text: '109 學年度第一學期 中興智能創作營隊', hours: 21 },
  { year: 2020, type: '研習', text: '108 學年度第二學期 中興智能創作營隊', hours: 12 },
  { year: 2020, type: '研習', text: '3D 列印四足機器人之學生增能研習', hours: 7 },
  { year: 2020, type: '研習', text: '教育部學習歷程檔案審議計畫', hours: 6 },
  { year: 2020, type: '研習', text: 'CRC 訓練宣導與兒少參與公共事務計畫', hours: 3 },

  // ── 2019 ──
  { year: 2019, type: '研習', text: '108 學年度第一學期 中興靈藥魔法之旅', hours: 18 },
  { year: 2019, type: '研習', text: '108 學年度第一學期 中興智能創作營隊', hours: 6 },
  { year: 2019, type: '研習', text: '108 學年度第一學期 中興地科暨化學科學營', hours: 6 },
];

// 競賽
//   work：參賽作品名稱（選填）
//   featured: true 會做成上方的便利貼
//   result 為「參賽」的不計入首頁的獎項數
export const competitions = [
  // ── 2025 ──
  { year: '2025', name: 'Microsoft Office Specialist 全國大賽決賽', result: '全國第三名・取得國手資格', featured: true },
  { year: '2025', name: '雲創盃 AI × ESG 創新實作競賽', result: '全國第三名', work: 'AI 創新企業電力管理系統', featured: true },
  { year: '2025', name: 'TUPC 第十屆全國科技大專院校程式競賽', result: '銅獎', featured: true },
  { year: '2025', name: 'Microsoft Office Specialist 全國大賽初賽', result: '優勝' },
  { year: '2025', name: 'Coding 101', result: '量化分析應用獎、人氣獎', work: '馬路三寶，別來撞我' },
  { year: '2025', name: '第六屆高科盃全國商業智慧競賽 大學概念組', result: '佳作', work: '飲水健康大管家：人工智慧水杯' },
  { year: '2025', name: 'FSR 客語語音辨認競賽', result: '完賽並發表研討會論文' },
  { year: '2025', name: '交通部公路局第一屆資料創新應用競賽', result: '參賽', work: '公路英雄除三害' },
  { year: '2025', name: 'AI 創新獎', result: '參賽', work: 'I care! AI 全智慧床墊' },

  // ── 2024 ──
  { year: '2024', name: '雲科大三實競賽 實習組', result: '金獎' },
  { year: '2024', name: '高科大 112 學年社團評鑑星傳獎', result: '自治性特優、組織運作、資源管理、行政管理獎' },
  { year: '2024', name: '臺灣中小企業銀行校園金融科技創意挑戰賽', result: '參賽', work: '綠色金融新未來：AI 與 ESG 驅動的智慧服務解決方案' },
  { year: '2024', name: '土地銀行校園金融創意挑戰賽', result: '參賽', work: 'Eco Credit 智慧碳足跡管理信用卡' },

  // ── 2023 ──
  { year: '2023', name: '112 年第一屆「永續金融與淨零創新」影響力提案競賽 製造業組', result: '第二名' },
  { year: '2023', name: '技職盃黑客松競賽 南區', result: '佳作（獲全國資格）' },
  { year: '2023', name: '第十七屆槓桿保證金模擬交易競賽 程式組', result: '第三名' },
  { year: '2023', name: '高科大 111 學年「服務最樂、學習獨特」微電影競賽', result: '佳作' },

  // ── 2022 ──
  { year: '2022', name: '111 年資訊月資訊應用技能競賽 南區個人組', result: '第二名' },
  { year: '2022', name: 'Microsoft Office Specialist Word Expert 初賽', result: '第一名' },
  { year: '2022', name: 'Microsoft Office Specialist Word Expert 決賽', result: '全國第六名' },

  // ── 2021 ──
  { year: '2021', name: '110 學年度全國高級中等學校商業類技藝競賽 文書處理職種', result: '金手獎第五名', featured: true },
  { year: '2021', name: '全民 e 化資訊運動會（秋季賽）全國賽 高中職組 資訊科技概論', result: '第一名', featured: true },
  { year: '2021', name: '全民 e 化資訊運動會（秋季賽）全國賽 高中職組 電子商務 標準級', result: '第五名' },
  { year: '2021', name: '110 學年度資訊月競賽', result: '中區團體第二名、中區個人第七名、全國團體第七名、全國個人第二十名' },
  { year: '2021', name: '智慧生活創意競賽 AI/AR/Arduino IT 應用暨創意專題提案 高中職組', result: '第一名、佳作' },
  { year: '2021', name: '中亞聯大 U21 人工智慧創意發明競賽 高中職組', result: '第二名、佳作' },
  { year: '2021', name: '110 典時成金賽前邀請賽 文書處理職種', result: '金手第二名' },
  { year: '2021', name: '典時成金 2021 分區友誼賽', result: '第三名' },
  { year: '2021', name: '2020 高中職智慧型機器人與感測實務應用競賽 障礙競速賽類組', result: '佳作' },
  { year: '2021', name: '110 年商管群專題及創意製作競賽', result: '進入複賽' },
  { year: '2021', name: '109 學年度校內專題競賽 創意專題製作組', result: '第一名' },
  { year: '2021', name: '109 學年度校內數位多媒體能力競賽', result: '第一名' },
  { year: '2021', name: '109 學年度校內計算機綜合能力競賽', result: '第五名' },
  { year: '2021', name: '2020 年全民資訊競賽 校內賽 中文看打、英文看打', result: '第一名、第三名' },
  { year: '2021', name: '109 學年度校內專業英文詞彙 資訊類、觀光類', result: '皆第三名' },
  { year: '2021', name: '109 學年度校內語文競賽 河洛語演說', result: '第三名' },
  { year: '2021', name: '第七屆青年黑客松', result: '參賽' },

  // ── 2020 ──
  { year: '2020', name: '全民 e 化運動會（秋季賽）全國賽 高中職組 文書處理類', result: '第一名', featured: true },
  { year: '2020', name: '全民 e 化運動會（秋季賽）中區賽 高中職組 文書處理類', result: '第二名' },
  { year: '2020', name: '全民 e 化運動會（春季賽）全國賽 高中職組 雲端 App 程式設計', result: '學科第一名、術科第二名' },
  { year: '2020', name: '計算機多媒體綜合能力與人工智能素養及商務專業應用大賽 全國賽 文書處理項 大學（專）院校核心能力組', result: '季軍' },
  { year: '2020', name: '109 資訊月資訊應用競賽 商用專業編輯', result: '參賽' },
  { year: '2020', name: '109 學年度文書處理校內競賽', result: '第六名' },
  { year: '2020', name: '第六屆青年黑客松', result: '參賽' },

  // ── 2019 ──
  { year: '2019', name: '108 學年度校內資料處理科 Documents 2016 Essentials 文書處理競賽', result: '第五名' },
  { year: '2019', name: 'MyFirstCTF 資安競賽', result: '第 192 名' },
];

// 證照，issuer 相同的會排在一起
export const certifications = [
  { issuer: 'Microsoft', name: 'Office Word Expert 2019' },
  { issuer: 'Microsoft', name: 'Office Word Expert 2016' },
  { issuer: '技能檢定', name: '電腦軟體應用 丙級' },
  { issuer: '技能檢定', name: '電腦硬體裝修 丙級' },
  { issuer: '技能檢定', name: '會計事務 人工記帳 丙級' },
  { issuer: '技能檢定', name: '門市服務 丙級' },
  { issuer: 'TQC', name: '文書處理 專業級（Word 2016）' },
  { issuer: 'TQC', name: '文書處理 進階級（Word 2016）' },
  { issuer: 'TQC', name: '基礎程式語言 專業級（Python 3）' },
  { issuer: 'TQC', name: '人工智慧應用與技術 進階級' },
  { issuer: 'TQC', name: '雲端技術及網路服務 進階級' },
  { issuer: 'TQC', name: '創意 App 程式設計 專業級（App Inventor 2）' },
  { issuer: 'TQC', name: '中文輸入 進階級' },
  { issuer: 'TQC', name: '英文輸入 實用級' },
  { issuer: 'APCS', name: '程式設計觀念題 五級' },
  { issuer: 'APCS', name: '程式設計實作題 四級' },
  { issuer: 'NVIDIA', name: 'CUDA Python 加速運算的基本原理' },
  { issuer: 'NVIDIA', name: 'Getting Started with AI on Jetson Nano' },
  { issuer: 'NVIDIA', name: 'Getting Started with DeepStream for Video Analytics on Jetson Nano' },
  { issuer: 'NVIDIA', name: '深度學習基礎理論與實踐' },
  { issuer: 'AWS', name: 'Educate Badge Competition Cloud Expert' },
  { issuer: 'MIT', name: 'Creative Competence of App Inventor Programming' },
  { issuer: 'Google', name: 'Google Ads 搜尋廣告認證' },
  { issuer: 'Google', name: 'Google Ads 成效評估認證' },
  { issuer: 'GLAD', name: 'BAP Documents 2016 Essentials（文書）' },
  { issuer: 'GLAD', name: 'BAP Spreadsheets 2016 Essentials（試算表）' },
  { issuer: 'GLAD', name: 'BAP Presentations 2016 Essentials（簡報）' },
  { issuer: 'GLAD', name: 'ICT 計算機綜合能力 Fundamentals' },
  { issuer: 'GLAD', name: 'DMT 數位多媒體綜合能力 Fundamentals' },
  { issuer: 'GLAD', name: '英文看打輸入 English Typing' },
  { issuer: 'MOCC', name: 'Word 2016 Enterprise 企業級認證' },
  { issuer: 'MOCC', name: 'App Inventor 雲端手機應用程式設計師' },
  { issuer: 'MOCC', name: 'App Inventor 雲端手機程式設計' },
  { issuer: 'MOCC', name: '電子商務 標準級' },
  { issuer: 'MOCC', name: '計算機概論 標準級' },
  { issuer: 'MOCC', name: '中文看打輸入測驗專業能力 乙級' },
  { issuer: 'MOCC', name: '英文輸入測驗專業認證 初級' },
  { issuer: 'PVQC', name: 'ICT Specialist 計算機類專業級' },
  { issuer: 'PVQC', name: 'Hospitality & Tourism Specialist 觀光旅運類專業級' },
  { issuer: '商教', name: '會計 三級' },
  { issuer: '商教', name: '英檢 三級' },
  { issuer: '商教', name: '英檢 四級' },
  { issuer: '其他', name: '醫學資訊管理師' },
  { issuer: '其他', name: '社團經營師' },
];
