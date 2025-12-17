import React, { useState, useEffect } from 'react';

// 深色主題配色 - 科技感十足
const DARK_THEME = {
  bg: '#0a0e27',
  bgLight: '#1a1f3a',
  bgGradient: 'linear-gradient(135deg, #0a0e27 0%, #0f1419 50%, #0a0e27 100%)',
  primary: '#00d9ff',
  secondary: '#bd93f9',
  accent: '#7aa2f7',
  highlight: '#ff79c6',
  success: '#50fa7b',
  warning: '#ffb86c',
  text: '#e0e0e0',
  textDim: '#8892b0',
  border: 'rgba(122, 162, 247, 0.25)',
  cardBg: 'rgba(26, 31, 58, 0.93)',
  scanlineColor: 'rgba(0, 217, 255, 0.03)',
  navBg: 'rgba(10, 14, 39, 0.9)'
};

// 亮色主題配色 - 現代質感
const LIGHT_THEME = {
  bg: '#f8f9fc',
  bgLight: '#ffffff',
  bgGradient: 'linear-gradient(135deg, #f8f9fc 0%, #e8ebf5 50%, #f8f9fc 100%)',
  primary: '#0066ff',
  secondary: '#7c3aed',
  accent: '#2563eb',
  highlight: '#ec4899',
  success: '#10b981',
  warning: '#f59e0b',
  text: '#1e293b',
  textDim: '#64748b',
  border: 'rgba(37, 99, 235, 0.15)',
  cardBg: 'rgba(255, 255, 255, 0.8)',
  scanlineColor: 'rgba(0, 102, 255, 0.02)',
  navBg: 'rgba(248, 249, 252, 0.9)'
};

// 根據主題獲取配色
const getColors = (isDark) => isDark ? DARK_THEME : LIGHT_THEME;

// API 配置 - 部署後需要更新為你的 Worker URL
const API_URL = '/api';  // Cloudflare Pages Functions 會自動處理 /api 路徑

// 管理員密碼 - 請修改為你的密碼
const ADMIN_PASSWORD = '!Zhengting0104';

// 掃描線特效
const Scanlines = ({ isDark }) => {
  const COLORS = getColors(isDark);
  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{
      background: `repeating-linear-gradient(0deg, ${COLORS.scanlineColor} 0px, transparent 2px)`,
      opacity: 0.4
    }} />
  );
};

// 主題切換按鈕
const ThemeToggle = ({ isDark, toggleTheme }) => {
  const COLORS = getColors(isDark);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.secondary}20)`,
        border: `2px solid ${COLORS.primary}`,
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 12px ${COLORS.primary}30`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
        e.currentTarget.style.boxShadow = `0 6px 20px ${COLORS.primary}50`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        e.currentTarget.style.boxShadow = `0 4px 12px ${COLORS.primary}30`;
      }}
    >
      <span style={{
        fontSize: '1.2rem',
        transition: 'transform 0.4s',
        transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)'
      }}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

// API 請求函數
const api = {
  // 獲取所有文章
  async getPosts() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error('獲取文章失敗');
    return res.json();
  },
  
  // 創建文章
  async createPost(post, token) {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post)
    });
    if (!res.ok) throw new Error('創建文章失敗');
    return res.json();
  },
  
  // 更新文章
  async updatePost(id, post, token) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post)
    });
    if (!res.ok) throw new Error('更新文章失敗');
    return res.json();
  },
  
  // 刪除文章
  async deletePost(id, token) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('刪除文章失敗');
    return res.json();
  },
  
  // 上傳圖片
  async uploadImage(file, token) {
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!res.ok) throw new Error('上傳圖片失敗');
    return res.json();
  }
};

// 導航欄
const Navbar = ({ page, setPage, isAdmin, setShowAdminLogin, handleLogout, isDark, toggleTheme }) => {
  const COLORS = getColors(isDark);
  const [open, setOpen] = useState(false);
  const items = ['home', 'about', 'projects', 'experience', 'calendar'];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: COLORS.navBg,
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
            <span style={{ color: COLORS.secondary }}>blog</span>
            <span style={{ color: COLORS.primary }}> ~$</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* 主題切換按鈕 */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* {isAdmin ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  padding: '0.3rem 0.8rem',
                  background: COLORS.success,
                  color: COLORS.bg,
                  borderRadius: '15px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }} className="admin-badge">
                  ADMIN
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.3rem 0.8rem',
                    background: 'transparent',
                    border: `1px solid ${COLORS.warning}`,
                    borderRadius: '15px',
                    color: COLORS.warning,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  className="logout-btn"
                >
                  登出
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminLogin(true)}
                style={{
                  padding: '0.3rem 0.8rem',
                  background: 'transparent',
                  border: `1px solid ${COLORS.accent}`,
                  borderRadius: '15px',
                  color: COLORS.accent,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                className="admin-login-btn"
              >
                管理員
              </button>
            )} */}

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
          .admin-badge { font-size: 0.7rem !important; padding: 0.2rem 0.6rem !important; }
          .logout-btn, .admin-login-btn { font-size: 0.7rem !important; padding: 0.2rem 0.6rem !important; }
        }
      `}</style>
    </nav>
  );
};

// // 管理員登入彈窗
// const AdminLoginModal = ({ onClose, onLogin }) => {
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === ADMIN_PASSWORD) {
//       onLogin(password);
//       onClose();
//     } else {
//       setError('密碼錯誤');
//       setPassword('');
//     }
//   };

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 100,
//       padding: '1rem'
//     }} onClick={onClose}>
//       <div style={{
//         background: COLORS.bgLight,
//         border: `2px solid ${COLORS.accent}`,
//         borderRadius: '16px',
//         padding: 'clamp(1.5rem, 4vw, 2.5rem)',
//         maxWidth: '400px',
//         width: '100%',
//         boxShadow: `0 8px 32px ${COLORS.accent}40`
//       }} onClick={(e) => e.stopPropagation()}>
//         <h2 style={{
//           fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
//           marginBottom: '1.5rem',
//           color: COLORS.accent,
//           fontFamily: 'monospace',
//           textAlign: 'center'
//         }}>
//           $ sudo login
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{
//               display: 'block',
//               marginBottom: '0.5rem',
//               color: COLORS.text,
//               fontFamily: 'monospace',
//               fontSize: '0.9rem'
//             }}>
//               管理員密碼
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setError('');
//               }}
//               placeholder="輸入密碼..."
//               autoFocus
//               style={{
//                 width: '100%',
//                 padding: '0.8rem',
//                 background: COLORS.bg,
//                 border: `2px solid ${error ? '#ff5555' : `${COLORS.accent}40`}`,
//                 borderRadius: '8px',
//                 color: COLORS.text,
//                 fontFamily: 'monospace',
//                 fontSize: '1rem',
//                 outline: 'none'
//               }}
//             />
//             {error && (
//               <div style={{
//                 marginTop: '0.5rem',
//                 color: '#ff5555',
//                 fontSize: '0.85rem',
//                 fontFamily: 'monospace'
//               }}>
//                 ✕ {error}
//               </div>
//             )}
//           </div>

//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <button
//               type="submit"
//               style={{
//                 flex: 1,
//                 padding: '0.8rem',
//                 background: COLORS.success,
//                 color: COLORS.bg,
//                 border: 'none',
//                 borderRadius: '8px',
//                 fontFamily: 'monospace',
//                 fontWeight: 'bold',
//                 fontSize: '1rem',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//             >
//               登入
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               style={{
//                 flex: 1,
//                 padding: '0.8rem',
//                 background: 'transparent',
//                 color: COLORS.text,
//                 border: `2px solid ${COLORS.text}40`,
//                 borderRadius: '8px',
//                 fontFamily: 'monospace',
//                 fontWeight: 'bold',
//                 fontSize: '1rem',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//             >
//               取消
//             </button>
//           </div>
//         </form>

//         <div style={{
//           marginTop: '1.5rem',
//           padding: '0.8rem',
//           background: `${COLORS.warning}10`,
//           border: `1px solid ${COLORS.warning}40`,
//           borderRadius: '8px',
//           fontSize: '0.8rem',
//           color: COLORS.textDim,
//           fontFamily: 'monospace',
//           textAlign: 'center'
//         }}>
//           ⚠ 僅限網站管理員使用
//         </div>
//       </div>
//     </div>
//   );
// };

// 打字機效果
const Typewriter = ({ text, speed = 80, isDark }) => {
  const COLORS = getColors(isDark);
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
const HomePage = ({ setPage, isDark }) => {
  const COLORS = getColors(isDark);
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
          <span style={{ color: COLORS.primary }}>@blog</span>
          <span style={{ color: COLORS.primary }}>:~$ </span>
          <Typewriter text="cat welcome.txt" isDark={isDark} />
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
              {/* <button
                onClick={() => setPage('blog')}
                style={{
                  background: COLORS.primary,
                  color: COLORS.bg,
                  border: `2px solid ${COLORS.primary}`,
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: `0 4px 20px ${COLORS.primary}40`
                }}
              >
                [ 閱讀文章 ]
              </button> */}
              
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

const AboutPage = ({ isDark }) => {
  const COLORS = getColors(isDark);
  // 1. 資料抽離：方便未來修改，不需深入 JSX
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

  // 2. 樣式封裝：減少 JSX 髒亂
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'clamp(1rem, 3vw, 2rem)',
    },
    card: {
      background: `linear-gradient(135deg, ${COLORS.bgLight}F2, ${COLORS.bg}F2)`, // F2 = 95% opacity
      backdropFilter: 'blur(10px)', // 毛玻璃效果
      border: `1px solid ${COLORS.accent}40`,
      borderRadius: '20px',
      padding: 'clamp(1.5rem, 4vw, 3rem)',
      boxShadow: `0 10px 40px -10px ${COLORS.accent}20`,
      position: 'relative',
      overflow: 'hidden',
    },
    terminalHeader: {
      fontFamily: '"Fira Code", "JetBrains Mono", monospace', // 建議使用的字體
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      borderBottom: `1px solid ${COLORS.accent}30`,
      paddingBottom: '1rem',
    },
    gridSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // 優化的 RWD
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
      
      {/* 若你想加入游標閃爍效果，可以在全域 CSS 加入這個 keyframe，或者用 style tag 注入 */}
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

// // 部落格頁面（帶圖片上傳）
// const BlogPage = ({ isAdmin, adminToken }) => {
//   const [posts, setPosts] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ title: '', content: '', tags: '', images: [] });
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   const loadPosts = async () => {
//     try {
//       setLoading(true);
//       const data = await api.getPosts();
//       setPosts(data.posts || []);
//     } catch (error) {
//       console.error('載入文章失敗:', error);
//       alert('載入文章失敗: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setUploading(true);
//     try {
//       const uploadPromises = files.map(file => api.uploadImage(file, adminToken));
//       const results = await Promise.all(uploadPromises);
//       const imageUrls = results.map(r => r.url);
      
//       setFormData(prev => ({
//         ...prev,
//         images: [...prev.images, ...imageUrls]
//       }));
      
//       alert(`成功上傳 ${imageUrls.length} 張圖片`);
//     } catch (error) {
//       alert('上傳圖片失敗: ' + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const savePost = async () => {
//     if (!formData.title || !formData.content) {
//       alert('請填寫標題和內容');
//       return;
//     }

//     try {
//       const postData = {
//         title: formData.title,
//         content: formData.content,
//         tags: formData.tags.split(',').map(t => t.trim()).filter(t => t).join(','),
//         images: formData.images.join(',')
//       };

//       if (isEditing) {
//         await api.updatePost(selected.id, postData, adminToken);
//       } else {
//         await api.createPost(postData, adminToken);
//       }

//       await loadPosts();
//       setIsCreating(false);
//       setIsEditing(false);
//       setFormData({ title: '', content: '', tags: '', images: [] });
//       setSelected(null);
//     } catch (error) {
//       alert('儲存失敗: ' + error.message);
//     }
//   };

//   const deletePost = async (id) => {
//     if (!confirm('確定要刪除這篇文章嗎？')) return;
    
//     try {
//       await api.deletePost(id, adminToken);
//       await loadPosts();
//       setSelected(null);
//     } catch (error) {
//       alert('刪除失敗: ' + error.message);
//     }
//   };

//   const startEdit = (post) => {
//     setFormData({
//       title: post.title,
//       content: post.content,
//       tags: post.tags || '',
//       images: post.images ? post.images.split(',').filter(Boolean) : []
//     });
//     setIsEditing(true);
//     setIsCreating(true);
//     setSelected(post);
//   };

//   const filteredPosts = filter === 'all' 
//     ? posts 
//     : posts.filter(p => p.tags && p.tags.includes(filter));

//   const allTags = [...new Set(posts.flatMap(p => p.tags ? p.tags.split(',').filter(Boolean) : []))];

//   if (loading) {
//     return (
//       <div style={{ 
//         maxWidth: '1200px', 
//         margin: '0 auto', 
//         padding: '2rem',
//         textAlign: 'center',
//         color: COLORS.textDim,
//         fontFamily: 'monospace'
//       }}>
//         載入中...
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
//       {!isCreating ? (
//         <>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '2rem',
//             flexWrap: 'wrap',
//             gap: '1rem'
//           }}>
//             <h2 style={{
//               fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
//               color: COLORS.highlight,
//               fontFamily: 'monospace'
//             }}>
//               $ ls -la ./posts/
//             </h2>
//             {isAdmin && (
//               <button
//                 onClick={() => {
//                   setIsCreating(true);
//                   setIsEditing(false);
//                   setFormData({ title: '', content: '', tags: '', images: [] });
//                 }}
//                 style={{
//                   padding: '0.7rem 1.5rem',
//                   background: COLORS.success,
//                   color: COLORS.bg,
//                   border: 'none',
//                   borderRadius: '6px',
//                   fontFamily: 'monospace',
//                   fontWeight: 'bold',
//                   cursor: 'pointer',
//                   fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
//                   transition: 'all 0.3s'
//                 }}
//               >
//                 + 新增文章
//               </button>
//             )}
//           </div>

//           {allTags.length > 0 && (
//             <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
//               <button
//                 onClick={() => setFilter('all')}
//                 style={{
//                   padding: '0.5rem 1rem',
//                   background: filter === 'all' ? COLORS.accent : 'transparent',
//                   color: filter === 'all' ? COLORS.bg : COLORS.text,
//                   border: `1px solid ${COLORS.accent}`,
//                   borderRadius: '20px',
//                   fontFamily: 'monospace',
//                   fontSize: '0.85rem',
//                   cursor: 'pointer'
//                 }}
//               >
//                 全部
//               </button>
//               {allTags.map(tag => (
//                 <button
//                   key={tag}
//                   onClick={() => setFilter(tag)}
//                   style={{
//                     padding: '0.5rem 1rem',
//                     background: filter === tag ? COLORS.accent : 'transparent',
//                     color: filter === tag ? COLORS.bg : COLORS.text,
//                     border: `1px solid ${COLORS.accent}`,
//                     borderRadius: '20px',
//                     fontFamily: 'monospace',
//                     fontSize: '0.85rem',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           )}

//           <div style={{
//             background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
//             border: `2px solid ${COLORS.highlight}`,
//             borderRadius: '16px',
//             padding: 'clamp(1.5rem, 4vw, 2.5rem)',
//             boxShadow: `0 8px 32px ${COLORS.highlight}20`
//           }}>
//             <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
//               <div style={{ display: 'grid', gap: '0.5rem', alignContent: 'start' }}>
//                 {filteredPosts.length === 0 ? (
//                   <div style={{
//                     padding: '2rem 1rem',
//                     textAlign: 'center',
//                     color: COLORS.textDim,
//                     fontFamily: 'monospace',
//                     fontSize: '0.9rem'
//                   }}>
//                     尚無文章
//                   </div>
//                 ) : (
//                   filteredPosts.map((post) => (
//                     <button
//                       key={post.id}
//                       onClick={() => setSelected(post)}
//                       style={{
//                         width: '100%',
//                         textAlign: 'left',
//                         padding: '1rem',
//                         background: selected?.id === post.id ? `${COLORS.highlight}20` : 'transparent',
//                         border: `1px solid ${selected?.id === post.id ? COLORS.highlight : `${COLORS.highlight}30`}`,
//                         borderRadius: '8px',
//                         color: selected?.id === post.id ? COLORS.highlight : COLORS.text,
//                         fontFamily: 'monospace',
//                         fontSize: '0.85rem',
//                         cursor: 'pointer',
//                         transition: 'all 0.3s'
//                       }}
//                     >
//                       {post.created_at?.split('T')[0]}<br/>{post.title}
//                       {post.tags && (
//                         <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
//                           {post.tags.split(',').filter(Boolean).map(tag => (
//                             <span key={tag} style={{
//                               fontSize: '0.7rem',
//                               padding: '0.2rem 0.5rem',
//                               background: `${COLORS.accent}30`,
//                               borderRadius: '10px'
//                             }}>
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </button>
//                   ))
//                 )}
//               </div>

//               <div>
//                 {selected ? (
//                   <div style={{
//                     padding: '2rem',
//                     background: `${COLORS.highlight}08`,
//                     border: `2px solid ${COLORS.highlight}40`,
//                     borderRadius: '12px'
//                   }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
//                       <div style={{ flex: 1 }}>
//                         <h3 style={{
//                           fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
//                           marginBottom: '0.5rem',
//                           color: COLORS.highlight
//                         }}>
//                           {selected.title}
//                         </h3>
//                         <div style={{
//                           fontSize: '0.85rem',
//                           color: COLORS.textDim,
//                           fontFamily: 'monospace'
//                         }}>
//                           發布: {selected.created_at?.split('T')[0]}
//                         </div>
//                       </div>
//                       {isAdmin && (
//                         <div style={{ display: 'flex', gap: '0.5rem' }}>
//                           <button
//                             onClick={() => startEdit(selected)}
//                             style={{
//                               padding: '0.5rem 1rem',
//                               background: COLORS.warning,
//                               color: COLORS.bg,
//                               border: 'none',
//                               borderRadius: '4px',
//                               fontFamily: 'monospace',
//                               fontSize: '0.8rem',
//                               cursor: 'pointer',
//                               fontWeight: 'bold'
//                             }}
//                           >
//                             編輯
//                           </button>
//                           <button
//                             onClick={() => deletePost(selected.id)}
//                             style={{
//                               padding: '0.5rem 1rem',
//                               background: '#ff5555',
//                               color: COLORS.bg,
//                               border: 'none',
//                               borderRadius: '4px',
//                               fontFamily: 'monospace',
//                               fontSize: '0.8rem',
//                               cursor: 'pointer',
//                               fontWeight: 'bold'
//                             }}
//                           >
//                             刪除
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     {selected.tags && (
//                       <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
//                         {selected.tags.split(',').filter(Boolean).map(tag => (
//                           <span key={tag} style={{
//                             padding: '0.3rem 0.8rem',
//                             background: `${COLORS.accent}20`,
//                             border: `1px solid ${COLORS.accent}`,
//                             borderRadius: '15px',
//                             fontSize: '0.8rem',
//                             color: COLORS.accent
//                           }}>
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* 顯示圖片 */}
//                     {selected.images && (
//                       <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
//                         {selected.images.split(',').filter(Boolean).map((url, idx) => (
//                           <img 
//                             key={idx}
//                             src={url}
//                             alt={`文章圖片 ${idx + 1}`}
//                             style={{
//                               width: '100%',
//                               height: '200px',
//                               objectFit: 'cover',
//                               borderRadius: '8px',
//                               border: `2px solid ${COLORS.accent}40`
//                             }}
//                           />
//                         ))}
//                       </div>
//                     )}

//                     <div style={{
//                       fontSize: '1rem',
//                       lineHeight: '1.8',
//                       color: COLORS.text,
//                       whiteSpace: 'pre-line'
//                     }}>
//                       {selected.content}
//                     </div>

//                     <button
//                       onClick={() => setSelected(null)}
//                       style={{
//                         marginTop: '2rem',
//                         padding: '0.7rem 1.5rem',
//                         background: 'transparent',
//                         border: `1px solid ${COLORS.highlight}`,
//                         borderRadius: '6px',
//                         color: COLORS.highlight,
//                         fontFamily: 'monospace',
//                         cursor: 'pointer',
//                         fontSize: '1rem'
//                       }}
//                     >
//                       [ 關閉 ]
//                     </button>
//                   </div>
//                 ) : (
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '100%',
//                     minHeight: '200px',
//                     fontSize: '1rem',
//                     color: COLORS.textDim,
//                     fontFamily: 'monospace'
//                   }}>
//                     $ 選擇一篇文章開始閱讀...
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div style={{
//           background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
//           border: `2px solid ${COLORS.success}`,
//           borderRadius: '16px',
//           padding: '2.5rem',
//           boxShadow: `0 8px 32px ${COLORS.success}20`
//         }}>
//           <h2 style={{
//             fontSize: '1.8rem',
//             marginBottom: '2rem',
//             color: COLORS.success,
//             fontFamily: 'monospace'
//           }}>
//             $ {isEditing ? 'vim' : 'nano'} new_post.md
//           </h2>

//           <div style={{ display: 'grid', gap: '1.5rem' }}>
//             <div>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '0.5rem',
//                 color: COLORS.accent,
//                 fontFamily: 'monospace'
//               }}>
//                 標題
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({...formData, title: e.target.value})}
//                 placeholder="輸入文章標題..."
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem',
//                   background: COLORS.bg,
//                   border: `2px solid ${COLORS.accent}40`,
//                   borderRadius: '8px',
//                   color: COLORS.text,
//                   fontFamily: 'monospace',
//                   fontSize: '1rem'
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '0.5rem',
//                 color: COLORS.accent,
//                 fontFamily: 'monospace'
//               }}>
//                 標籤 (用逗號分隔)
//               </label>
//               <input
//                 type="text"
//                 value={formData.tags}
//                 onChange={(e) => setFormData({...formData, tags: e.target.value})}
//                 placeholder="例如: 技術, 心得, AI..."
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem',
//                   background: COLORS.bg,
//                   border: `2px solid ${COLORS.accent}40`,
//                   borderRadius: '8px',
//                   color: COLORS.text,
//                   fontFamily: 'monospace',
//                   fontSize: '1rem'
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '0.5rem',
//                 color: COLORS.accent,
//                 fontFamily: 'monospace'
//               }}>
//                 圖片上傳
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 disabled={uploading}
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem',
//                   background: COLORS.bg,
//                   border: `2px solid ${COLORS.accent}40`,
//                   borderRadius: '8px',
//                   color: COLORS.text,
//                   fontFamily: 'monospace',
//                   fontSize: '0.9rem'
//                 }}
//               />
//               {uploading && (
//                 <div style={{ marginTop: '0.5rem', color: COLORS.warning, fontSize: '0.85rem' }}>
//                   上傳中...
//                 </div>
//               )}
              
//               {formData.images.length > 0 && (
//                 <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
//                   {formData.images.map((url, idx) => (
//                     <div key={idx} style={{ position: 'relative' }}>
//                       <img 
//                         src={url}
//                         alt={`預覽 ${idx + 1}`}
//                         style={{
//                           width: '100%',
//                           height: '150px',
//                           objectFit: 'cover',
//                           borderRadius: '8px',
//                           border: `2px solid ${COLORS.accent}40`
//                         }}
//                       />
//                       <button
//                         onClick={() => removeImage(idx)}
//                         style={{
//                           position: 'absolute',
//                           top: '5px',
//                           right: '5px',
//                           padding: '0.3rem 0.6rem',
//                           background: '#ff5555',
//                           color: COLORS.bg,
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer',
//                           fontSize: '0.8rem',
//                           fontWeight: 'bold'
//                         }}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '0.5rem',
//                 color: COLORS.accent,
//                 fontFamily: 'monospace'
//               }}>
//                 內容
//               </label>
//               <textarea
//                 value={formData.content}
//                 onChange={(e) => setFormData({...formData, content: e.target.value})}
//                 placeholder="開始撰寫你的文章..."
//                 style={{
//                   width: '100%',
//                   minHeight: '300px',
//                   padding: '1rem',
//                   background: COLORS.bg,
//                   border: `2px solid ${COLORS.accent}40`,
//                   borderRadius: '8px',
//                   color: COLORS.text,
//                   fontFamily: 'monospace',
//                   fontSize: '0.95rem',
//                   lineHeight: '1.6',
//                   resize: 'vertical'
//                 }}
//               />
//             </div>

//             <div style={{ display: 'flex', gap: '1rem' }}>
//               <button
//                 onClick={savePost}
//                 style={{
//                   padding: '0.8rem 2rem',
//                   background: COLORS.success,
//                   color: COLORS.bg,
//                   border: 'none',
//                   borderRadius: '8px',
//                   fontFamily: 'monospace',
//                   fontWeight: 'bold',
//                   fontSize: '1rem',
//                   cursor: 'pointer'
//                 }}
//               >
//                 {isEditing ? '更新文章' : '發布文章'}
//               </button>
//               <button
//                 onClick={() => {
//                   setIsCreating(false);
//                   setIsEditing(false);
//                   setFormData({ title: '', content: '', tags: '', images: [] });
//                 }}
//                 style={{
//                   padding: '0.8rem 2rem',
//                   background: 'transparent',
//                   color: COLORS.text,
//                   border: `2px solid ${COLORS.text}40`,
//                   borderRadius: '8px',
//                   fontFamily: 'monospace',
//                   fontWeight: 'bold',
//                   fontSize: '1rem',
//                   cursor: 'pointer'
//                 }}
//               >
//                 取消
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// 其他頁面
const ProjectsPage = ({ isDark }) => {
  const COLORS = getColors(isDark);
  // 假設 COLORS 來自你的全域變數或 Context，這裡保留原本的引用方式
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

      {/* 修改 1: Grid 容器設定 */}
      <div style={{ 
        display: 'grid', 
        // 核心修改：自動適應欄寬，最小300px，最大1fr (螢幕夠寬時會自動變成三欄)
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        alignItems: 'stretch' // 讓同一列的卡片高度拉伸至相同
      }}>
        {projects.map((project, idx) => (
          <div key={idx} 
            style={{
              background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
              border: `2px solid ${project.highlight ? COLORS.highlight : COLORS.secondary}`,
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              boxShadow: `0 8px 32px ${project.highlight ? COLORS.highlight : COLORS.secondary}20`,
              transition: 'all 0.3s',
              // 修改 2: 卡片內部改為 Flex column，為了讓按鈕置底
              display: 'flex',
              flexDirection: 'column',
              height: '100%', // 確保佔滿 Grid Cell 高度
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
                whiteSpace: 'nowrap' // 防止標籤換行
              }}>
                {project.status}
              </span>
            </div>

            {/* 修改 3: 描述文字區塊 flex: 1，會自動佔據剩餘空間，將下方內容推到底部 */}
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
                    width: 'fit-content' // 確保按鈕寬度適中
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

// 經歷與成就頁面
const ExperiencePage = ({ isDark }) => {
  const COLORS = getColors(isDark);
  // 假設 COLORS 是從外部引入或定義的變數，為避免報錯，請確保您的環境中有定義它
  // 若沒有，您可以暫時解開下行註解使用預設值
  // const COLORS = { bg: '#0a0a0a', bgLight: '#1a1a1a', text: '#e0e0e0', accent: '#00ff9d', secondary: '#00ccff', highlight: '#ffffff', warning: '#ffcc00', success: '#00ff9d' };

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
    "GLAD ICT計算機綜合能力",
    "GLAD DMT數位多媒體綜合能力",
    "GLAD 英文看打輸入",
    "MOCC 電子商務 標準級",
    "MOCC 計算機概論 標準級",
    "TQC 創意App程式設計-專業級",
    "TQC 雲端技術及網路服務-進階級",
    "TQC 人工智慧應用與技術-進階級",
    "TQC 基礎程式語言-專業級(Python 3)",
    "NVIDIA CUDA Python",
    "NVIDIA AI on Jetson Nano",
    "NVIDIA 深度學習基礎理論與實踐",
    "MIT App Inventor Programming",
    "AWS Educate Cloud Expert",
    "社團經營師",
    "醫學資訊管理師"
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
          {/* 修改處：加入 .sort().reverse() 確保年份由大到小排列 */}
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
          {/* 修改處：加入 .sort().reverse() 確保年份由大到小排列 */}
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

// 行事曆頁
const CalendarPage = ({ isDark }) => {
  const COLORS = getColors(isDark);
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

// Footer
const Footer = ({ isDark }) => {
  const COLORS = getColors(isDark);
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

// 主應用
export default function App() {
  const [page, setPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const COLORS = getColors(isDark);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdmin(true);
      setAdminToken(token);
    }
    
    // 載入主題設定
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // 切換主題
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleLogin = (password) => {
    setIsAdmin(true);
    setAdminToken(password);
    localStorage.setItem('admin_token', password);
  };

  const handleLogout = () => {
    if (confirm('確定要登出嗎？')) {
      setIsAdmin(false);
      setAdminToken('');
      localStorage.removeItem('admin_token');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.bgGradient,
      color: COLORS.text,
      position: 'relative',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Scanlines isDark={isDark} />
      <Navbar 
        page={page} 
        setPage={setPage} 
        isAdmin={isAdmin}
        setShowAdminLogin={setShowAdminLogin}
        handleLogout={handleLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <div style={{ flex: 1 }}>
        {page === 'home' && <HomePage setPage={setPage} isDark={isDark} />}
        {page === 'about' && <AboutPage isDark={isDark} />}
        {page === 'blog' && <BlogPage isAdmin={isAdmin} adminToken={adminToken} isDark={isDark} />}
        {page === 'projects' && <ProjectsPage isDark={isDark} />}
        {page === 'experience' && <ExperiencePage isDark={isDark} />}
        {page === 'calendar' && <CalendarPage isDark={isDark} />}
      </div>
      <Footer isDark={isDark} />
      
      {showAdminLogin && (
        <AdminLoginModal 
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleLogin}
        />
      )}

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
      `}</style>
    </div>
  );
}