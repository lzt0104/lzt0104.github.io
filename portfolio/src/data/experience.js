// =============================================
// 經歷、競賽、證照資料
//
// log：所有經歷，一行一筆。type 可用：
//   工作 / 研究 / 教學 / 自治 / 榮譽 / 研習
// 教學類若填了 school + kind，會自動出現在「教學」區塊的學校矩陣
//   kind：指導（選手培訓）/ 研習（教師研習）/ 工作坊
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
  { year: 2025, type: '教學', text: '雲科大 2025 YunTech Orientation Camp 新生學涯開展營 院系專業領航講師' },
  { year: 2025, type: '自治', text: '雲科大 2025 YunTech Orientation Camp 新生學涯開展營 資訊管理系幹部' },
  { year: 2025, type: '自治', text: '雲科大 2025 YunTech ACT 社團幹部培訓營 副召兼研修總務組組長' },
  { year: 2025, type: '自治', text: '雲科大 2025 YunTech 社團博覽會 活動組' },
  { year: 2025, type: '自治', text: '雲科大 113 學年第二學期 四資管 AI 一 A 班代表' },
  { year: 2025, type: '自治', text: '勞動部勞動力發展署中彰投分署 青年職涯發展中心 114 年度服務青年服務隊 隊員' },
  { year: 2025, type: '教學', text: '市立豐原高商「辦公室文案排版美編製作工作坊」講師', school: '豐原高商', kind: '工作坊' },
  { year: 2025, type: '教學', text: '國立南投高商「資訊專業知能文書排版教師研習」講師', school: '南投高商', kind: '研習' },
  { year: 2025, type: '教學', text: '國立彰化高商「資訊專業知能文書排版教師研習」講師', school: '彰化高商', kind: '研習' },
  { year: 2025, type: '教學', text: '市立臺中家商資料處理科「文書處理職種」選手指導', school: '臺中家商', kind: '指導' },
  { year: 2025, type: '教學', text: '國立花蓮高商資料處理科「文書處理職種」選手指導', school: '花蓮高商', kind: '指導' },
  { year: 2025, type: '教學', text: '國立新竹高商資料處理科「文書處理職種」選手指導', school: '新竹高商', kind: '指導' },
  { year: 2025, type: '教學', text: '114 年四技二專統一入學測驗 命題編校組（闈場試務工作人員）' },
  { year: 2025, type: '教學', text: '114 學年度自辦模擬賽 文書處理職種總負責人兼命題' },
  { year: 2025, type: '教學', text: '114 學年度自辦模擬賽 程式設計職種副負責人' },

  // ── 2024 ──
  { year: 2024, type: '研究', text: '通過 113 年國科會大專生研究計畫' },
  { year: 2024, type: '工作', text: '開設源核資訊整合工作室' },
  { year: 2024, type: '自治', text: '雲科大 113 學年第一學期 四資管 AI 一 A 班代表' },
  { year: 2024, type: '研習', text: '雲科大 113 學年度宿委會志工培訓營', hours: 25 },
  { year: 2024, type: '自治', text: '高科大 113 學年智慧商務系學會 顧問' },
  { year: 2024, type: '榮譽', text: '高科大 112 學年第一、二學期 三Q獎學金' },
  { year: 2024, type: '教學', text: '高科大 112 學年金融資訊系學會傳承營 講師' },
  { year: 2024, type: '教學', text: '市立豐原高商「超高效電腦技能教師研習」講師', school: '豐原高商', kind: '研習' },
  { year: 2024, type: '教學', text: '市立豐原高商「辦公室文案排版美編製作工作坊」講師', school: '豐原高商', kind: '工作坊' },
  { year: 2024, type: '教學', text: '市立豐原高商 113 學年資料處理科「文書處理職種」選手指導', school: '豐原高商', kind: '指導' },
  { year: 2024, type: '教學', text: '國立新竹高商「資訊專業知能文書排版教師研習」講師', school: '新竹高商', kind: '研習' },
  { year: 2024, type: '教學', text: '113 學年度商業類文書處理職種自辦模擬賽 負責人兼命題' },
  { year: 2024, type: '研習', text: '中華學生社團教育學會 社團經營師第 76 期認證學分學生班', hours: 15 },

  // ── 2023 ──
  { year: 2023, type: '自治', text: '高科大 112 學年智慧商務系學會 會長' },
  { year: 2023, type: '自治', text: '高科大 112 學年系學會委員會 副主席' },
  { year: 2023, type: '自治', text: '高科大 112 學年度圖書館諮詢委員會 委員' },
  { year: 2023, type: '自治', text: '高科大 112 學年度服務教育課程委員會 委員' },
  { year: 2023, type: '自治', text: '高科大 112 學年度學生申訴評議委員會 委員' },
  { year: 2023, type: '研習', text: '高科大 112 學年社團負責人研習營', hours: 16 },
  { year: 2023, type: '研習', text: '中國青年救國團 大專學生社團負責人研習會（歲寒三友會）' },
  { year: 2023, type: '榮譽', text: '高科大 111 學年第二學期 服務教育課程表現優異' },
  { year: 2023, type: '榮譽', text: '高科大 111 學年第二學期 熱心服務活動表現優異' },
  { year: 2023, type: '自治', text: '勞動部勞動力發展署中彰投分署 第二屆青年職涯大使' },
  { year: 2023, type: '研習', text: '勞動部勞動力發展署中彰投分署 第二屆青年職涯大使研習營', hours: 14 },
  { year: 2023, type: '研習', text: 'FISW 2023 金融資安研習營', hours: 9 },
];

// 競賽。featured: true 會放在區塊上方的重點欄
export const competitions = [
  { year: '2025', name: 'MOS 世界盃',                                  result: '國手資格',   featured: true },
  { year: '2025', name: 'MOS Word Expert 全國決賽',                     result: '全國第三名', featured: true },
  { year: '2025', name: '雲創盃 AI × ESG 創新實作競賽',                 result: '全國第三名', featured: true },
  { year: '2025', name: 'TUPC 全國科技院校程式設計競賽',                result: '銅獎',       featured: true },
  { year: '2025', name: 'Coding 101 大學軟體創作競賽',                  result: '量化分析應用獎、人氣獎' },
  { year: '2025', name: '第六屆高科盃全國商業智慧競賽 大學概念組',     result: '佳作' },
  { year: '2025', name: 'ROCLING 2025 FSR 客語語音辨識競賽',            result: '完賽並發表論文' },
  { year: '2025', name: 'MOS Word Expert 初賽',                         result: '優勝' },
  { year: '2024', name: '雲科大三實競賽 實習組',                        result: '金獎' },
  { year: '2024', name: '高科大 112 學年度星傳獎社團評鑑',              result: '自治性特優、組織運作、資源管理、行政管理獎' },
  { year: '2023', name: '東海大學第一屆「永續金融與淨零創新」製造業組', result: '第二名' },
  { year: '2023', name: '教育部技職盃黑客松競賽 南區',                 result: '佳作（入圍全國）' },
  { year: '2023', name: '高科大 111 學年微電影競賽',                    result: '佳作' },
  { year: '2023', name: '輔仁大學第十七屆槓桿保證金模擬交易競賽 程式組', result: '第三名' },
  { year: '2022', name: '111 年資訊月資訊應用技能競賽 南區個人組',      result: '第二名' },
  { year: '2022', name: 'MOS Word Expert 全國決賽',                     result: '全國第六名' },
  { year: '2022', name: 'MOS Word Expert 初賽',                         result: '優勝' },
];

// 證照，issuer 相同的會排在一起
export const certifications = [
  { issuer: 'TQC',    name: '基礎程式語言 專業級（Python 3）' },
  { issuer: 'TQC',    name: '人工智慧應用與技術 進階級' },
  { issuer: 'TQC',    name: '雲端技術及網路服務 進階級' },
  { issuer: 'TQC',    name: '創意 App 程式設計 專業級' },
  { issuer: 'NVIDIA', name: 'CUDA Python' },
  { issuer: 'NVIDIA', name: 'AI on Jetson Nano' },
  { issuer: 'NVIDIA', name: '深度學習基礎理論與實踐' },
  { issuer: 'AWS',    name: 'Educate Cloud Expert' },
  { issuer: 'MIT',    name: 'App Inventor Programming' },
  { issuer: 'GLAD',   name: 'ICT 計算機綜合能力' },
  { issuer: 'GLAD',   name: 'DMT 數位多媒體綜合能力' },
  { issuer: 'GLAD',   name: '英文看打輸入' },
  { issuer: 'MOCC',   name: '電子商務 標準級' },
  { issuer: 'MOCC',   name: '計算機概論 標準級' },
  { issuer: '其他',   name: '醫學資訊管理師' },
  { issuer: '其他',   name: '社團經營師' },
];
