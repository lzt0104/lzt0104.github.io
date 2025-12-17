import React, { useState, useEffect, useContext, createContext } from 'react';

// --- 1. 定義配色方案 ---
const THEMES = {
  dark: {
    name: 'dark',
    bg: '#0a0e27',
    bgLight: '#1a1f3a',
    primary: '#00d9ff',
    secondary: '#bd93f9',
    accent: '#7aa2f7',
    highlight: '#ff79c6',
    success: '#50fa7b',
    warning: '#ffb86c',
    text: '#e0e0e0',
    textDim: '#8892b0',
    cardBorder: 'rgba(122, 162, 247, 0.4)',
    scanline: 'rgba(0, 217, 255, 0.03)',
    shadow: 'rgba(0, 0, 0, 0.5)'
  },
  light: {
    name: 'light',
    bg: '#f0f4f8',        // 柔和的灰白背景
    bgLight: '#ffffff',   // 純白卡片
    primary: '#0066cc',   // 深藍色 (對比度較高)
    secondary: '#6b46c1', // 深紫色
    accent: '#3182ce',    // 亮藍
    highlight: '#d53f8c', // 深粉紅
    success: '#059669',   // 深綠
    warning: '#d97706',   // 深橘
    text: '#1a202c',      // 深灰幾近黑
    textDim: '#4a5568',   // 灰色
    cardBorder: 'rgba(0, 0, 0, 0.1)',
    scanline: 'rgba(0, 0, 0, 0.02)', // 極淡的掃描線
    shadow: 'rgba(0, 0, 0, 0.1)'
  }
};

// --- 2. 建立 Context 與 Hook ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// API 配置
const API_URL = '/api';
const ADMIN_PASSWORD = '!Zhengting0104';

// 掃描線特效 (使用 Theme)
const Scanlines = () => {
  const { COLORS } = useTheme();
  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{
      background: `repeating-linear-gradient(0deg, ${COLORS.scanline} 0px, transparent 2px)`,
      opacity: 0.4,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 50
    }} />
  );
};


// --- 3. 導航欄 (新增切換按鈕) ---
const Navbar = ({ page, setPage, isAdmin, setShowAdminLogin, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const items = ['home', 'about', 'projects', 'experience', 'calendar'];
  const { COLORS, mode, toggleTheme } = useTheme();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: mode === 'dark' ? 'rgba(10, 14, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${COLORS.accent}40`,
      transition: 'all 0.3s ease'
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
            <span style={{ color: COLORS.secondary }}>blog</span>
            <span style={{ color: COLORS.primary }}> ~$</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            {/* 主題切換按鈕 */}
            <button 
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s'
              }}
              title={mode === 'dark' ? "切換亮色模式" : "切換深色模式"}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {mode === 'dark' ? '☀️' : '🌙'}
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
                >
                  ./{item}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {open && (
          <div className="mobile-nav" style={{
            display: 'none',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '1rem',
            background: COLORS.bgLight,
            borderRadius: '8px',
            border: `1px solid ${COLORS.accent}40`,
            boxShadow: `0 4px 20px ${COLORS.shadow}`
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
  const { COLORS } = useTheme();

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

// --- 首頁 ---
const HomePage = ({ setPage }) => {
  const [show, setShow] = useState(false);
  const { COLORS, mode } = useTheme();

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
          <span style={{ color: COLORS.primary }}>@blog</span>
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
                  { label: '目標', value: '成為優秀的資訊工作者與教育者' }
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

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setPage('projects')}
                style={{
                  background: COLORS.secondary,
                  color: COLORS.bg,
                  border: `2px solid ${COLORS.secondary}`,
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: `0 4px 20px ${COLORS.secondary}40`
                }}
              >
                [ 查看專案 ]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- 關於我頁面 ---
const AboutPage = () => {
  const { COLORS } = useTheme();

  const education = [
    { year: '現職', text: '源核資訊整合工作室 執行長', highlight: true },
    { year: '113學年度', text: '國立雲林科技大學 資訊管理系 (人工智慧技優專班)', highlight: true },
    { year: '112學年度', text: '國立高雄科技大學 智慧商務系 (結業)' },
    { year: '111學年度', text: '國立高雄科技大學 智慧商務系 (特殊選才錄取)' },
    { year: '111學年度', text: '國立草屯商工 資料處理科 (畢業)' },
  ];

  const skills = [
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 80 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'Data Science', level: 75 },
    { name: 'AI / ML', level: 55 },
    { name: 'MS Office', level: 99 },
  ];

  const research = {
    title: '擬人化醫療聊天機器人於乳癌病患之照護',
    id: '113-2813-C992-027-H',
    grade: 'A',
    amount: '53,000'
  };

  // 樣式
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'clamp(1rem, 3vw, 2rem)',
    },
    card: {
      background: `linear-gradient(135deg, ${COLORS.bgLight}F2, ${COLORS.bg}F2)`, 
      backdropFilter: 'blur(10px)',
      border: `1px solid ${COLORS.accent}40`,
      borderRadius: '20px',
      padding: 'clamp(1.5rem, 4vw, 3rem)',
      boxShadow: `0 10px 40px -10px ${COLORS.accent}20`,
      position: 'relative',
      overflow: 'hidden',
    },
    terminalHeader: {
      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      borderBottom: `1px solid ${COLORS.accent}30`,
      paddingBottom: '1rem',
    },
    gridSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
      marginTop: '2.5rem',
    },
    logEntry: {
      display: 'flex',
      gap: '1rem',
      padding: '0.5rem 0',
      borderLeft: `2px solid ${COLORS.bgLight}`,
      paddingLeft: '1rem',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    researchBox: {
      marginTop: '2.5rem',
      padding: '1.5rem',
      background: `linear-gradient(90deg, ${COLORS.secondary}10, transparent)`,
      borderLeft: `4px solid ${COLORS.secondary}`,
      borderRadius: '0 8px 8px 0',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Header Section */}
        <div style={styles.terminalHeader}>
          <span style={{ color: COLORS.success }}>➜</span>
          <span style={{ color: COLORS.accent }}>~</span>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: COLORS.text }}>
            whoami
            <span className="blinking-cursor">_</span>
          </h2>
        </div>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: COLORS.textDim,
          maxWidth: 'auto'
        }}>
          我是 108 課綱第一屆的「白老鼠」，熱愛探索各種技術領域並挑戰自我。
          曾在各大社群活躍，對教育與技術有深厚熱情。
          <br />
          <strong style={{ color: COLORS.text }}>目前身分：</strong> 資管系學生 / 接案開發者 / 追夢人
        </p>

        {/* Main Grid: Education & Skills */}
        <div style={styles.gridSection}>
          
          {/* Left Column: Education */}
          <div>
            <h3 style={{ ...styles.terminalHeader, borderBottom: 'none', fontSize: '1.2rem', color: COLORS.secondary }}>
              $ cat education.log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {education.map((item, i) => (
                <div key={i} style={styles.logEntry}>
                  <div style={{ 
                    minWidth: '85px', 
                    fontFamily: 'monospace', 
                    color: item.highlight ? COLORS.accent : COLORS.textDim,
                    fontWeight: item.highlight ? 'bold' : 'normal'
                  }}>
                    {item.year}
                  </div>
                  <div style={{ color: item.highlight ? COLORS.text : COLORS.textDim }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skills */}
          <div>
            <h3 style={{ ...styles.terminalHeader, borderBottom: 'none', fontSize: '1.2rem', color: COLORS.secondary }}>
              $ ./check_skills.sh
            </h3>
            <div style={{ display: 'grid', gap: '1.2rem' }}>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    <span style={{ color: COLORS.text }}>{skill.name}</span>
                    <span style={{ fontFamily: 'monospace', color: COLORS.accent }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', background: `${COLORS.bgLight}`, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary})`,
                      boxShadow: `0 0 10px ${COLORS.accent}66`,
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Research Project */}
        <div style={styles.researchBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ background: COLORS.highlight, color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              NSTC PROJECT
            </span>
            <span style={{ color: COLORS.highlight, fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {research.id}
            </span>
          </div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.text, fontSize: '1.1rem' }}>
            {research.title}
          </h4>
          <div style={{ fontSize: '0.9rem', color: COLORS.textDim, fontFamily: 'monospace' }}>
            Result: <span style={{ color: COLORS.success, fontWeight: 'bold' }}>Grade {research.grade}</span> 
            {' | '}
            Grant: <span style={{ color: COLORS.warning }}>${research.amount}</span>
          </div>
        </div>

      </div>
      
      <style>{`
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- 專案頁面 ---
const ProjectsPage = () => {
  const { COLORS } = useTheme();

  const projects = [
    {
      name: '技職升學社群網站',
      description: '提供技職學生交流、資源分享與升學資訊的平台，促進技職教育發展',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      status: '進行中',
      highlight: true,
      link: 'https://skillstouniversity.uk/'
    },
    {
      name: '馬路三寶，別來撞我',
      description: '結合影像辨識與即時警示系統，提升道路安全，減少交通事故發生',
      tech: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
      status: '已結案',
      highlight: false,
      link: 'https://demox.tw/idea/detail/?id=1851'
    },
    {
      name: '擬人化醫療聊天機器人',
      description: '國科會研究計畫：針對乳癌病患的智慧照護系統，結合自然語言處理與情感辨識技術',
      tech: ['Python', 'NLP', 'Machine Learning', 'Flask'],
      status: '已結案',
      highlight: false
    },
    {
      name: '源核資訊整合工作室網站',
      description: '工作室官方網站，提供服務介紹、專案展示與聯絡功能',
      tech: ['React', 'Next.js', 'Tailwind CSS'],
      status: '已上線',
      link: 'https://yuanhe.tw/'
    },
    {
      name: '技藝競賽模擬賽系統',
      description: '自動化競賽管理平台，包含成績管理、證書生成等功能',
      tech: ['Python', 'Django', 'PostgreSQL'],
      status: '已完成'
    },
    {
      name: 'A Study on a Low-Resource Speech Recognition System',
      description: 'The 37th Conference on Computational Linguistics and Speech Processing (ROCLING 2025) 論文發表',
      tech: ['Python', 'TensorFlow', 'Speech Recognition'],
      status: '已發表'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <h2 style={{
        fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
        marginBottom: '2rem',
        color: COLORS.secondary,
        fontFamily: 'monospace'
      }}>
        $ ls -la ./projects/
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {projects.map((project, idx) => (
          <div key={idx} 
            style={{
              background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
              border: `2px solid ${project.highlight ? COLORS.highlight : COLORS.cardBorder}`,
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              boxShadow: `0 8px 32px ${project.highlight ? COLORS.highlight : COLORS.secondary}20`,
              transition: 'all 0.3s',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 12px 40px ${project.highlight ? COLORS.highlight : COLORS.secondary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 32px ${project.highlight ? COLORS.highlight : COLORS.secondary}20`;
            }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: project.highlight ? COLORS.highlight : COLORS.secondary,
                fontFamily: 'monospace',
                margin: 0,
                lineHeight: 1.4
              }}>
                {project.name}
              </h3>
              <span style={{
                padding: '0.3rem 0.8rem',
                background: project.status === '進行中' ? COLORS.warning : 
                            project.status === '已上線' ? COLORS.success : COLORS.accent,
                color: COLORS.bg,
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap'
              }}>
                {project.status}
              </span>
            </div>

            <p style={{
              fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
              color: COLORS.text,
              lineHeight: '1.7',
              marginBottom: '1.5rem',
              flex: '1' 
            }}>
              {project.description}
            </p>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {project.tech.map(t => (
                    <span key={t} style={{
                    padding: '0.3rem 0.7rem',
                    background: `${COLORS.accent}20`,
                    border: `1px solid ${COLORS.accent}`,
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    color: COLORS.accent,
                    fontFamily: 'monospace'
                    }}>
                    {t}
                    </span>
                ))}
                </div>

                {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: `1px solid ${COLORS.primary}`,
                    borderRadius: '6px',
                    color: COLORS.primary,
                    textDecoration: 'none',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s',
                    width: 'fit-content'
                    }}
                    onMouseEnter={(e) => {
                    e.target.style.background = COLORS.primary;
                    e.target.style.color = COLORS.bg;
                    }}
                    onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = COLORS.primary;
                    }}
                >
                    查看專案 →
                </a>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 經歷與成就頁面 ---
const ExperiencePage = () => {
  const { COLORS } = useTheme();

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

  const competitions = {
    "2025": [
      { name: "2025 雲創盃AI × ESG創新實作競賽", awards: ["第三名"] },
      { name: "第六屆高科盃商業智慧競賽", awards: ["佳作"] },
      { name: "FSR 客語語音辨識競賽", awards: ["已發表"] },
      { name: "Coding 101", awards: ["量化分析應用獎", "人氣獎"] },
      { name: "MOS Word Expert 初賽", awards: ["優勝"] },
      { name: "MOS Word Expert 決賽", awards: ["第三名"] },
      { name: "TUPC 全國程式競賽", awards: ["銅牌"] }
    ],
    "2024": [
      { name: "高科大社團評鑑", awards: ["自治性特優", "組織運作獎", "資源管理獎", "行政管理獎"] },
      { name: "雲科大三實競賽實習組", awards: ["金獎"] }
    ],
    "2022-2023": [
      { name: "資訊月應用技能競賽南區", awards: ["第二名"] },
      { name: "MOS Word Expert 決賽", awards: ["第六名"] },
      { name: "技職盃黑客松競賽南區", awards: ["佳作"] },
      { name: "永續金融與淨零創新提案競賽", awards: ["第二名"] },
      { name: "槓桿保證金模擬交易競賽(程式組)", awards: ["第三名"] }
    ]
  };

  const certifications = [
    "GLAD ICT計算機綜合能力", "GLAD DMT數位多媒體綜合能力", "GLAD 英文看打輸入",
    "MOCC 電子商務 標準級", "MOCC 計算機概論 標準級",
    "TQC 創意App程式設計-專業級", "TQC 雲端技術及網路服務-進階級",
    "TQC 人工智慧應用與技術-進階級", "TQC 基礎程式語言-專業級(Python 3)",
    "NVIDIA CUDA Python", "NVIDIA AI on Jetson Nano", "NVIDIA 深度學習基礎理論與實踐",
    "MIT App Inventor Programming", "AWS Educate Cloud Expert",
    "社團經營師", "醫學資訊管理師"
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      {/* --- Experience Section --- */}
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
          $ cat /etc/history
        </h2>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {Object.keys(experiences).sort().reverse().map((year) => (
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

      {/* --- Competitions Section --- */}
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
          {Object.keys(competitions).sort().reverse().map((year) => (
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

      {/* --- Certifications Section --- */}
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

// --- 行事曆頁 ---
const CalendarPage = () => {
  const { COLORS } = useTheme();
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

// --- Footer ---
const Footer = () => {
  const { COLORS } = useTheme();
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
      marginTop: 'auto',
      background: COLORS.bg
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
                fontSize: '0.9rem'
              }}
            >
              [{link.name}]
            </a>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: COLORS.textDim, fontFamily: 'monospace' }}>
          <div>© 2025 Liu Zheng-Ting. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Content (內部組件) ---
const MainContent = ({ page, setPage }) => {
  const { COLORS, mode } = useTheme(); 

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: mode === 'dark' 
        ? `linear-gradient(135deg, ${COLORS.bg} 0%, #0f1419 50%, ${COLORS.bg} 100%)`
        : `linear-gradient(135deg, #ffffff 0%, ${COLORS.bg} 100%)`, 
      color: COLORS.text,
      position: 'relative',
      transition: 'background 0.5s ease, color 0.5s ease'
    }}>
      <Scanlines />
      <Navbar 
        page={page} 
        setPage={setPage} 
        handleLogout={handleLogout}
      />
      <div style={{ flex: 1 }}>
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'experience' && <ExperiencePage />}
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
      `}</style>
    </div>
  );
};

// --- App (Provider Wrapper) ---
export default function App() {
  const [page, setPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');

  // 初始化檢查 LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_mode');
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
    
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdmin(true);
      setAdminToken(token);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
    localStorage.setItem('theme_mode', newMode);
  };

  const currentTheme = THEMES[themeMode];

  return (
    <ThemeContext.Provider value={{ COLORS: currentTheme, mode: themeMode, toggleTheme }}>
       <MainContent 
         page={page} 
         setPage={setPage} 
         isAdmin={isAdmin} 
         setIsAdmin={setIsAdmin}
         setAdminToken={setAdminToken}
         showAdminLogin={showAdminLogin}
         setShowAdminLogin={setShowAdminLogin}
       />
    </ThemeContext.Provider>
  );
}