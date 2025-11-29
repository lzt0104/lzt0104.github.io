import React, { useState, useEffect } from 'react';

// 配色方案
const COLORS = {
  bg: '#0a0e27',
  bgLight: '#1a1f3a',
  primary: '#00d9ff',
  secondary: '#bd93f9',
  accent: '#7aa2f7',
  highlight: '#ff79c6',
  success: '#50fa7b',
  warning: '#ffb86c',
  text: '#e0e0e0',
  textDim: '#8892b0'
};

// 掃描線特效
const Scanlines = () => (
  <div className="fixed inset-0 pointer-events-none z-50" style={{
    background: 'repeating-linear-gradient(0deg, rgba(0, 217, 255, 0.03) 0px, transparent 2px)',
    opacity: 0.4
  }} />
);

// 導航欄
const Navbar = ({ page, setPage }) => {
  const [open, setOpen] = useState(false);
  const items = ['home', 'about', 'resume', 'blog', 'calendar'];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(10, 14, 39, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${COLORS.accent}40`
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => { setPage('home'); setOpen(false); }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 'bold',
              color: COLORS.primary
            }}
          >
            <span style={{ color: COLORS.highlight }}>劉政廷</span>
            <span style={{ color: COLORS.primary }}>@</span>
            <span style={{ color: COLORS.secondary }}>portfolio</span>
            <span style={{ color: COLORS.primary }}> ~$</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: COLORS.primary,
              cursor: 'pointer'
            }}
            className="mobile-menu"
          >
            {open ? '✕' : '☰'}
          </button>

          <div style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
            {items.filter(i => i !== 'home').map(item => (
              <button
                key={item}
                onClick={() => setPage(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  color: page === item ? COLORS.accent : COLORS.text,
                  transition: 'all 0.3s',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `${COLORS.accent}20`;
                  e.target.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.color = page === item ? COLORS.accent : COLORS.text;
                }}
              >
                ./{item}
              </button>
            ))}
          </div>
        </div>
        
        {/* 手機選單 */}
        {open && (
          <div className="mobile-nav" style={{
            display: 'none',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '1rem',
            background: COLORS.bgLight,
            borderRadius: '8px',
            border: `1px solid ${COLORS.accent}40`
          }}>
            {items.filter(i => i !== 'home').map(item => (
              <button
                key={item}
                onClick={() => { setPage(item); setOpen(false); }}
                style={{
                  background: page === item ? `${COLORS.accent}20` : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  color: page === item ? COLORS.accent : COLORS.text,
                  padding: '0.8rem',
                  borderRadius: '4px',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
              >
                ./{item}
              </button>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: block !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

// 打字機效果
const Typewriter = ({ text, speed = 80 }) => {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplay(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span style={{ fontFamily: 'monospace', color: COLORS.primary }}>
      {display}
      <span style={{ animation: 'blink 1s infinite' }}>▊</span>
    </span>
  );
};

// 首頁
const HomePage = ({ setPage }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  return (
    <div style={{
      minHeight: 'calc(100vh - 300px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(1rem, 4vw, 2rem)',
          marginBottom: '3rem',
          fontFamily: 'monospace',
          color: COLORS.text,
          wordBreak: 'break-word'
        }}>
          <span style={{ color: COLORS.highlight }}>劉政廷</span>
          <span style={{ color: COLORS.primary }}>@portfolio</span>
          <span style={{ color: COLORS.primary }}>:~$ </span>
          <Typewriter text="cat welcome.txt" />
        </div>

        {show && (
          <>
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.secondary}15)`,
              border: `2px solid ${COLORS.accent}`,
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginBottom: '2.5rem',
              boxShadow: `0 8px 32px ${COLORS.accent}20`,
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: COLORS.highlight,
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                ┌─┐ SYSTEM INFO ┌─┐
              </div>

              <div style={{ display: 'grid', gap: '1rem', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', fontFamily: 'monospace' }}>
                {[
                  { label: '身份', value: '國立雲林科技大學資訊管理系(人工智慧技優專班)' },
                  { label: '現職', value: '源核資訊整合工作室 負責人兼執行長' },
                  { label: '專長', value: '資訊技術 | 選手培訓 | 系統開發' },
                  { label: '目標', value: '成為優秀的資訊工作者' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', textAlign: 'left' }}>
                    <span style={{ color: COLORS.warning, fontSize: '1.2rem', flexShrink: 0 }}>➜</span>
                    <span style={{ wordBreak: 'break-word' }}>
                      <span style={{ color: COLORS.accent, fontWeight: 'bold' }}>{item.label}:</span>
                      <span style={{ color: COLORS.text, marginLeft: '0.5rem' }}>{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '1.5rem',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`
              }} />
            </div>

            <button
              onClick={() => setPage('about')}
              style={{
                background: COLORS.primary,
                color: COLORS.bg,
                border: `2px solid ${COLORS.primary}`,
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: `0 4px 20px ${COLORS.primary}40`
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = COLORS.primary;
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = `0 8px 30px ${COLORS.primary}60`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = COLORS.primary;
                e.target.style.color = COLORS.bg;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 4px 20px ${COLORS.primary}40`;
              }}
            >
              [ EXPLORE SYSTEM ]
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// 關於頁
const AboutPage = () => {
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 80 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'Data Science', level: 75 },
    { name: 'AI / ML', level: 55 },
    { name: 'MS Office', level: 99 }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.accent}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        marginBottom: '2rem',
        boxShadow: `0 8px 32px ${COLORS.accent}20`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          marginBottom: '1.5rem',
          color: COLORS.accent,
          fontFamily: 'monospace'
        }}>
          $ whoami
        </h2>

        <p style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
          lineHeight: '1.8',
          color: COLORS.text,
          marginBottom: '2rem'
        }}>
          我是108課綱第一屆的「白老鼠」,熱愛探索各種技術領域並挑戰自我。曾在各大社群活躍,對教育與技術有深厚熱情。現在是一位懷抱夢想的資管系學生。我的專長橫跨多個技術領域,正在尋找屬於自己的道路。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ color: COLORS.secondary, marginBottom: '1rem', fontFamily: 'monospace', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
              $ cat education.log
            </h3>
            <div style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', color: COLORS.text, display: 'grid', gap: '0.5rem' }}>
              {[
                { year: '111學年度', text: '畢業於國立草屯商工資料處理科' },
                { year: '111學年度特殊選才', text: '錄取國立高雄科技大學智慧商務系' },
                { year: '112學年度', text:'修業於國立高雄科技大學智慧商務系'},
                { year: '113學年度技優甄審', text: '錄取國立雲林科技大學資訊管理系(人工智慧技優專班)' },
                { year: '現職', text: '源核資訊整合工作室 執行長' }
              ].map((item, i) => (
                <div key={i} style={{ wordBreak: 'break-word' }}>
                  <span style={{ color: COLORS.warning, fontWeight: 'bold' }}>{item.year}:</span>
                  <span style={{ marginLeft: '0.5rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: COLORS.secondary, marginBottom: '1rem', fontFamily: 'monospace', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
              $ ./check_skills.sh
            </h3>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {skills.map((skill) => {
                return (
                  <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span style={{ width: 'clamp(80px, 20vw, 100px)', fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)', color: COLORS.textDim }}>{skill.name}</span>
                    <div style={{ flex: 1, height: '8px', background: `${COLORS.accent}20`, borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${COLORS.success}, ${COLORS.accent})`,
                        transition: 'width 1s'
                      }} />
                    </div>
                    <span style={{ width: '40px', textAlign: 'right', fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)', color: COLORS.text }}>{skill.level}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          background: `${COLORS.accent}10`,
          border: `2px solid ${COLORS.accent}`,
          borderRadius: '8px'
        }}>
          <h4 style={{ color: COLORS.highlight, marginBottom: '0.7rem', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>
            [ 國科會研究計畫 ]
          </h4>
          <div style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', color: COLORS.text }}>
            <div>計畫:擬人化醫療聊天機器人於乳癌病患之照護</div>
            <div>
              編號:113-2813-C992-027-H | 等第:<span style={{ color: COLORS.success }}>A</span> | 
              金額:<span style={{ color: COLORS.warning }}>53,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer
const Footer = () => {
  const links = [
    { name: 'GitHub', url: 'https://github.com/lzt0104' },
    { name: 'Facebook', url: 'https://www.facebook.com/zhengting0104' },
    { name: 'Email', url: 'mailto:zhengtingliu0104@gmail.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/lie.1131/' }
  ];

  return (
    <footer style={{
      borderTop: `1px solid ${COLORS.accent}40`,
      padding: '2rem 1rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 3vw, 2rem)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {links.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: COLORS.primary,
                textDecoration: 'none',
                fontFamily: 'monospace',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = COLORS.accent;
                e.target.style.textShadow = `0 0 10px ${COLORS.accent}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = COLORS.primary;
                e.target.style.textShadow = 'none';
              }}
            >
              [{link.name}]
            </a>
          ))}
        </div>
        <div style={{ fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', color: COLORS.textDim, fontFamily: 'monospace' }}>
          <div>Process terminated with exit code 0.</div>
          <div>© 2025 Liu Zheng-Ting. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

// 履歷頁
const ResumePage = () => {
  const experiences = {
    "2025": [
      "市立豐原高商『辦公室文案排版美編製作工作坊』講師",
      "國立雲林科技大學 2025 YunTech ACT社團幹部培訓營 副召兼研修總務組組長",
      "114年四技二專統一入學測驗-命題編校組",
      "國立南投高商『資訊專業知能文書排版教師研習』講師",
      "國立彰化高商『資訊專業知能文書排版教師研習』講師",
      "市立臺中家商資料處理科『文書處理職種』培訓講師",
      "國立花蓮高商資料處理科『文書處理職種』培訓講師",
      "國立新竹高商資料處理科『文書處理職種』培訓講師",
      "114學年度自辦模擬賽文書處理職種總負責人兼職種命題",
      "114學年度自辦模擬賽程式設計職種副負責人"
    ],
    "2024": [
      "通過113年國科會大專生研究計畫",
      "國立高雄科技大學113學年智慧商務系學會 顧問",
      "市立豐原高商『超高效電腦技能教師研習』講師",
      "國立新竹高商『資訊專業知能文書排版教師研習』講師",
      "113學年度商業類文書處理職種自辦模擬賽負責人兼命題"
    ],
    "2023": [
      "國立高雄科技大學112學年智慧商務系學會 會長",
      "國立高雄科技大學112學年系學會委員會 副主席",
      "國立高雄科技大學112學年多項校級委員會 學生代表"
    ]
  };

  const experienceYears = ["2025", "2024", "2023"];

  const competitions = {
    "2025": [
      { name: "2025 雲創盃AI × ESG創新實作競賽", awards: ["入圍中"] },
      { name: "第六屆高科盃商業智慧競賽", awards: ["佳作"] },
      { name: "FSR 客語語音辨識競賽", awards: ["已發表"] },
      { name: "Coding 101", awards: ["量化分析應用獎", "人氣獎"] },
      { name: "MOS Word Expert 初賽", awards: ["優勝"] },
      { name: "MOS Word Expert 決賽", awards: ["第三名"] },
      { name: "TUPC 全國程式競賽", awards: ["銅牌"] }
    ],
    "2024": [
      { name: "高科大社團評鑑", awards: ["自治性特優", "組織運作獎", "資源管理獎", "行政管理獎"] },
      { name: "雲科大三實競賽實習組", awards: ["金獎"] },
      // { name: "臺灣中小企銀/土地銀行 金融科技創意挑戰賽", awards: ["參賽"] }
    ],
    "2022-2023": [
      { name: "資訊月應用技能競賽南區", awards: ["第二名"] },
      { name: "MOS Word Expert 決賽", awards: ["第六名"] },
      { name: "技職盃黑客松競賽南區", awards: ["佳作"] },
      { name: "永續金融與淨零創新提案競賽", awards: ["第二名"] },
      { name: "槓桿保證金模擬交易競賽(程式組)", awards: ["第三名"] }
    ]
  };

  const competitionYears = ["2025", "2024", "2022-2023"];

  const certifications = [
    "GLAD ICT計算機綜合能力", "GLAD DMT數位多媒體綜合能力",
    "GLAD 英文看打輸入", "MOCC 電子商務 標準級", "MOCC 計算機概論 標準級",
    "TQC 創意App程式設計-專業級",
    "TQC 雲端技術及網路服務-進階級", "TQC 人工智慧應用與技術-進階級",
    "TQC 基礎程式語言-專業級(Python 3)",
    "NVIDIA CUDA Python", "NVIDIA AI on Jetson Nano", "NVIDIA 深度學習基礎理論與實踐",
    "MIT App Inventor Programming", "AWS Educate Cloud Expert",
    "社團經營師", "醫學資訊管理師"
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      {/* 經歷 */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.accent}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        marginBottom: '2rem',
        boxShadow: `0 8px 32px ${COLORS.accent}20`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          marginBottom: '2rem',
          color: COLORS.accent,
          fontFamily: 'monospace'
        }}>
          $ cat /etc/history...
        </h2>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {experienceYears.map((year) => (
            <div key={year} style={{
              borderLeft: `3px solid ${COLORS.accent}`,
              paddingLeft: '1.5rem'
            }}>
              <div style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: COLORS.highlight,
                fontFamily: 'monospace'
              }}>
                [{year}]
              </div>
              {experiences[year].map((item, idx) => (
                <div key={idx} style={{
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                  marginBottom: '0.8rem',
                  color: COLORS.text,
                  display: 'flex',
                  gap: '0.5rem',
                  wordBreak: 'break-word'
                }}>
                  <span style={{ color: COLORS.warning, flexShrink: 0 }}>➜</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 競賽成績 */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.secondary}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        marginBottom: '2rem',
        boxShadow: `0 8px 32px ${COLORS.secondary}20`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          marginBottom: '2rem',
          color: COLORS.secondary,
          fontFamily: 'monospace'
        }}>
          $ ./run competitions --all
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {competitionYears.map((year) => (
            <div key={year}>
              <h3 style={{
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                marginBottom: '1rem',
                color: COLORS.highlight,
                fontFamily: 'monospace'
              }}>
                {year}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                {competitions[year].map((comp, idx) => (
                  <li key={idx} style={{
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                    color: COLORS.text,
                    lineHeight: '1.6',
                    wordBreak: 'break-word'
                  }}>
                    {comp.name}
                    <div style={{ marginTop: '0.3rem' }}>
                      {comp.awards.map((award, aIdx) => (
                        <span key={aIdx} style={{
                          display: 'inline-block',
                          background: COLORS.success,
                          color: COLORS.bg,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
                          marginRight: '0.4rem',
                          marginBottom: '0.4rem',
                          fontWeight: 'bold'
                        }}>
                          {award}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 證照 */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.warning}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: `0 8px 32px ${COLORS.warning}20`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          marginBottom: '2rem',
          color: COLORS.warning,
          fontFamily: 'monospace'
        }}>
          $ ./list --certs
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0.8rem'
        }}>
          {certifications.map((cert, idx) => (
            <div key={idx} style={{
              padding: '0.8rem 1rem',
              background: `${COLORS.warning}10`,
              border: `1px solid ${COLORS.warning}40`,
              borderRadius: '6px',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              color: COLORS.text,
              transition: 'all 0.3s',
              wordBreak: 'break-word'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${COLORS.warning}20`;
              e.currentTarget.style.borderColor = COLORS.warning;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${COLORS.warning}10`;
              e.currentTarget.style.borderColor = `${COLORS.warning}40`;
            }}>
              {cert}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 部落格頁
const BlogPage = () => {
  const [selected, setSelected] = useState(null);

  const posts = [
    {
      id: 1,
      title: '108課綱白老鼠的生存之道',
      date: '2023-06-01',
      content: '身為第一屆108課綱的學生,我們無疑是教育改革浪潮中的「白老鼠」。\n\n最大的改變莫過於「學習歷程檔案」。它強迫我們提早思考自己的方向,並學習如何將過程與成果系統化地記錄下來。\n\n建議:\n1. 勇於嘗試,不要怕失敗\n2. 提早規劃,但保持彈性\n3. 將每一次的經歷都視為學習的養分'
    },
    {
      id: 2,
      title: '從高科大到雲科大',
      date: '2024-06-17',
      content: '在高科大智慧商務系的兩年,我學習到了許多商管與程式結合的知識,也擔任了系學會會長。\n\n然而,我發現自己對於資訊技術的底層原理和人工智慧的深入應用有著更強烈的渴望。\n\n這促使我做出了轉向雲科大資管系AI技優專班的決定。'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.highlight}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: `0 8px 32px ${COLORS.highlight}20`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          marginBottom: '2rem',
          color: COLORS.highlight,
          fontFamily: 'monospace'
        }}>
          $ ls -la ./posts/
        </h2>

        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          {/* 文章列表 */}
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelected(post)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: selected?.id === post.id ? `${COLORS.highlight}20` : 'transparent',
                  border: `1px solid ${selected?.id === post.id ? COLORS.highlight : `${COLORS.highlight}30`}`,
                  borderRadius: '8px',
                  color: selected?.id === post.id ? COLORS.highlight : COLORS.text,
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  wordBreak: 'break-word'
                }}
                onMouseEnter={(e) => {
                  if (selected?.id !== post.id) {
                    e.target.style.background = `${COLORS.highlight}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected?.id !== post.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {post.date}<br/>{post.title}.md
              </button>
            ))}
          </div>

          {/* 文章內容 */}
          <div>
            {selected ? (
              <div style={{
                padding: 'clamp(1rem, 3vw, 2rem)',
                background: `${COLORS.highlight}08`,
                border: `2px solid ${COLORS.highlight}40`,
                borderRadius: '12px'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
                  marginBottom: '0.5rem',
                  color: COLORS.highlight,
                  wordBreak: 'break-word'
                }}>
                  {selected.title}
                </h3>
                <div style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                  marginBottom: '1.5rem',
                  color: COLORS.textDim,
                  fontFamily: 'monospace'
                }}>
                  Modified: {selected.date}
                </div>
                <div style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.8',
                  color: COLORS.text,
                  whiteSpace: 'pre-line'
                }}>
                  {selected.content}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: '2rem',
                    padding: '0.7rem 1.5rem',
                    background: 'transparent',
                    border: `1px solid ${COLORS.highlight}`,
                    borderRadius: '6px',
                    color: COLORS.highlight,
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = COLORS.highlight;
                    e.target.style.color = COLORS.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = COLORS.highlight;
                  }}
                >
                  [ CLOSE ]
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '200px',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                color: COLORS.textDim,
                fontFamily: 'monospace',
                padding: '2rem',
                textAlign: 'center'
              }}>
                $ select a file to read...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 行事曆頁
const CalendarPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.success}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: `0 8px 32px ${COLORS.success}20`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          marginBottom: '2rem',
          color: COLORS.success,
          fontFamily: 'monospace'
        }}>
          $ cat schedule.ics
        </h2>

        <div style={{
          width: '100%',
          height: 'clamp(400px, 60vh, 600px)',
          border: `2px solid ${COLORS.success}50`,
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <iframe
            style={{ width: '100%', height: '100%', border: 'none' }}
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&showPrint=0&showTitle=0&showTz=0&showCalendars=0&src=emhlbmd0aW5nbGl1MDEwNEBnbWFpbC5jb20&src=NDk2MmFkNGY3N2MxYTBmMDViYTA2YTlhZDJiZGNmMjZmNmY3MmM4ODNjOGFlZDIxYjUwYjQxY2YwYTc1M2Q0ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjdiMzRlZDI2MjY1NjdjYjkxZjFiYTdhZTM0NmJhNDQzYjkyZTgwNTUxYTkzYWI1MTIzYzc2N2ZhMzk5YzE0YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dXNqYXN1bWM2NTE4Nm10OGtpYjJrMHRwczlhdGJxODhAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cTZqamkwOXVwZGN0bmF1ZnM5dGs2djJxdHJsZ2RoZGpAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=emgtdHcudGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23008eaa&color=%23f3f4f7&color=%23e4002b&color=%23616161&color=%23795548&color=%230b8043"
          />
        </div>
      </div>
    </div>
  );
};

// 主應用
export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(135deg, ${COLORS.bg} 0%, #0f1419 50%, ${COLORS.bg} 100%)`,
      color: COLORS.text,
      position: 'relative'
    }}>
      <Scanlines />
      <Navbar page={page} setPage={setPage} />
      <div style={{ flex: 1 }}>
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'resume' && <ResumePage />}
        {page === 'blog' && <BlogPage />}
        {page === 'calendar' && <CalendarPage />}
      </div>
      <Footer />
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        @media (max-width: 768px) {
          .blog-grid { 
            grid-template-columns: 1fr !important; 
          }
        }
        @media (max-width: 480px) {
          body { font-size: 14px; }
        }
      `}</style>
    </div>
  );
}