import { useState, useEffect, useRef } from 'react';
import { getColors } from '../theme';
import { profile } from '../data/profile';
import { projects } from '../data/projects';

// ─── ASCII art: "LZT" in block chars ─────────────────────────────────────────
const ASCII_ART = [
  '██╗     ███████╗████████╗',
  '██║        ███╔╝╚══██╔══╝',
  '██║       ███╔╝    ██║   ',
  '██║      ███╔╝     ██║   ',
  '███████╗███████╗   ██║   ',
  '╚══════╝╚══════╝   ╚═╝   ',
];

// ─── Boot sequence lines ──────────────────────────────────────────────────────
const BOOT_LINES = [
  { text: 'BIOS v2026.1 — LZT Systems',                   ok: false },
  { text: '[    0.001] Initializing portfolio kernel...',  ok: false },
  { text: '[    0.042] Loading resume modules...',         ok: false },
  { text: '[    0.155] Mounting skill filesystem... OK',   ok: false },
  { text: '[  OK  ] MatrixRain.service',                   ok: true  },
  { text: '[  OK  ] Navigation.service',                   ok: true  },
  { text: '[  OK  ] ResumeDB.service',                     ok: true  },
  { text: '',                                              ok: false },
  { text: "LZT Portfolio OS 2026 — Type 'help' for commands.", ok: false, welcome: true },
];
const BOOT_DELAYS = [0, 100, 200, 350, 500, 620, 740, 880, 1000];

// ─── Neofetch info rows ───────────────────────────────────────────────────────
const NEOFETCH_ROWS = [
  ['Name',       '劉政廷 (Liu Zheng-Ting)'],
  ['School',     '國立雲林科技大學 資管系'],
  ['Track',      '人工智慧技優專班'],
  ['CEO',        '源核資訊整合工作室'],
  ['Engineer',   '火心壬新創股份有限公司'],
  ['Research',   'NSTC 計畫 · Grade A'],
  ['Shell',      'Python · JavaScript'],
  ['GitHub',     'github.com/lzt0104'],
];

// ─── Command handler factory ──────────────────────────────────────────────────
function makeCommands(navigate) {
  return {
    help: () => [
      { t: 'Available commands:', c: 'accent' },
      { t: '' },
      { t: '  neofetch   ·  show system info',                           c: 'text' },
      { t: '  whoami     ·  about me',                                   c: 'text' },
      { t: '  skills     ·  skill tree',                                 c: 'text' },
      { t: '  projects   ·  project list',                               c: 'text' },
      { t: '  contact    ·  contact info',                               c: 'text' },
      { t: '  goto <p>   ·  navigate: about | projects | experience | calendar', c: 'text' },
      { t: '  clear      ·  clear terminal',                             c: 'text' },
      { t: '' },
      { t: "  Tip: ↑↓ navigate history · Tab autocomplete", c: 'dim' },
    ],

    whoami: () => [
      { t: profile.bio,                                  c: 'text' },
      { t: '' },
      { t: '身份: ' + profile.currentRole,              c: 'accent' },
      { t: '' },
      { t: '正在: 接案 / 教學 / 研究 / 創業',          c: 'dim' },
    ],

    skills: () => [
      { t: '技能樹:', c: 'accent' },
      { t: '' },
      ...profile.skills.map(s => {
        const n = Math.round(s.level / 10);
        const bar = '█'.repeat(n) + '░'.repeat(10 - n);
        const name = (s.name + ' ').padEnd(16, '·');
        return { t: `  ${name} [${bar}] ${s.level}%`, c: 'text' };
      }),
    ],

    projects: () => [
      { t: '專案列表:', c: 'accent' },
      { t: '' },
      ...projects.flatMap((p, i) => {
        const star = p.highlight ? ' ★' : '';
        const rows = [
          { t: `  [${String(i + 1).padStart(2, '0')}] ${p.name}${star}`, c: p.highlight ? 'highlight' : 'text' },
          { t: `       ${p.status} · ${p.tech.slice(0, 3).join(', ')}`,  c: 'dim' },
        ];
        if (p.link) rows.push({ t: `       → ${p.link}`, c: 'primary', link: p.link });
        rows.push({ t: '' });
        return rows;
      }),
    ],

    contact: () => [
      { t: '聯絡方式:', c: 'accent' },
      { t: '' },
      ...profile.links.map(l => ({
        t: `  ${(l.name + ':').padEnd(12)} ${l.url}`,
        c: 'primary',
        link: l.url,
      })),
    ],

    neofetch: () => 'NEOFETCH',
    fetch:    () => 'NEOFETCH',
    clear:    () => 'CLEAR',
    cls:      () => 'CLEAR',

    goto: (args) => {
      const map = {
        about: 'about', '關於': 'about',
        projects: 'projects', '專案': 'projects',
        experience: 'experience', '經歷': 'experience',
        calendar: 'calendar', '行事曆': 'calendar',
      };
      const t = map[(args[0] || '').toLowerCase()];
      if (t) {
        setTimeout(() => navigate(t), 400);
        return [{ t: `Navigating to /${t} ...`, c: 'success' }];
      }
      return [{ t: `page not found: "${args[0] || ''}"\nTry: about | projects | experience | calendar`, c: 'err' }];
    },

    cd: (args) => {
      if (!args[0] || args[0] === '..') return [{ t: '/home/劉政廷/portfolio', c: 'dim' }];
      const map = { about: 'about', projects: 'projects', experience: 'experience', calendar: 'calendar' };
      const t = map[args[0]];
      if (t) { setTimeout(() => navigate(t), 400); return [{ t: `→ /${t}`, c: 'success' }]; }
      return [{ t: `cd: ${args[0]}: No such directory`, c: 'err' }];
    },

    // Easter eggs
    sudo:  () => [{ t: 'Permission denied. You are not root here.', c: 'err' }],
    exit:  () => [{ t: 'There is no escape. 😈', c: 'warning' }],
    pwd:   () => [{ t: '/home/劉政廷/portfolio', c: 'text' }],
    ls:    () => [{ t: "This isn't bash. Try 'projects'.", c: 'dim' }],
    uname: () => [{ t: 'LZT-OS 2026.1 portfolio-kernel #1 SMP x86_64 GNU/Portfolio', c: 'text' }],
    cat:   () => [{ t: "Meow? Try 'whoami' or 'projects'.", c: 'dim' }],
    rm:    () => [{ t: 'rm: permission denied: this portfolio is read-only', c: 'err' }],
    vim:   () => [{ t: 'vim: command not found (nobody knows how to exit anyway)', c: 'dim' }],
    nano:  () => [{ t: "nano: this isn't a text editor.", c: 'dim' }],
    git:   () => [{ t: '→ github.com/lzt0104', c: 'accent', link: 'https://github.com/lzt0104' }],
    man:   () => [{ t: "No manual entry. Try 'help'.", c: 'dim' }],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TerminalHomePage({ setPage, isDark }) {
  const C = getColors(isDark);
  const color = { accent: C.accent, text: C.text, dim: C.textDim, primary: C.primary,
                  success: C.success, warning: C.warning, highlight: C.highlight, err: '#ff5555' };

  const cmds = makeCommands(setPage);

  const [booting,    setBooting]    = useState(() => !sessionStorage.getItem('lzt-booted'));
  const [bootIdx,    setBootIdx]    = useState(0);
  const [history,    setHistory]    = useState([]);     // {type, cmd?, lines?, text?}
  const [input,      setInput]      = useState('');
  const [cmdHist,    setCmdHist]    = useState([]);
  const [histPos,    setHistPos]    = useState(-1);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history, bootIdx]);

  // Boot / neofetch init
  useEffect(() => {
    const doNeofetch = () => {
      setHistory(prev => [...prev, { type: 'neofetch' }]);
      setTimeout(() => setHistory(prev => [...prev, { type: 'hint', text: "Type 'help' to see commands · ↑↓ command history · Tab autocomplete" }]), 250);
    };

    if (!booting) { doNeofetch(); return; }

    BOOT_DELAYS.forEach((delay, i) => {
      setTimeout(() => {
        setBootIdx(i + 1);
        if (i === BOOT_DELAYS.length - 1) {
          setTimeout(() => {
            setBooting(false);
            sessionStorage.setItem('lzt-booted', '1');
            doNeofetch();
          }, 500);
        }
      }, delay);
    });
  }, []); // eslint-disable-line

  const run = (raw) => {
    const trimmed = raw.trim();
    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const origArgs = trimmed.split(/\s+/).slice(1);

    if (!trimmed) { setHistory(prev => [...prev, { type: 'prompt', cmd: '' }]); return; }

    setCmdHist(prev => [trimmed, ...prev.slice(0, 49)]);
    setHistPos(-1);

    const handler = cmds[cmd];
    if (!handler) {
      setHistory(prev => [...prev, {
        type: 'output', cmd: trimmed,
        lines: [{ t: `command not found: ${cmd}  (try 'help')`, c: 'err' }],
      }]);
      return;
    }

    const result = handler(origArgs);
    if (result === 'CLEAR') { setHistory([]); return; }
    if (result === 'NEOFETCH') {
      setHistory(prev => [...prev, { type: 'neofetch', cmd: trimmed, showPrompt: true }]);
      return;
    }
    setHistory(prev => [...prev, { type: 'output', cmd: trimmed, lines: result }]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { run(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(histPos + 1, cmdHist.length - 1);
      setHistPos(n); if (n >= 0) setInput(cmdHist[n]);
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = Math.max(histPos - 1, -1);
      setHistPos(n); setInput(n === -1 ? '' : cmdHist[n]);
    }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const allCmds = Object.keys(cmds);
      const matches = allCmds.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) {
        setHistory(prev => [...prev, { type: 'hint', text: matches.join('  ') }]);
      }
    }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setHistory([]); }
    else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      if (input) { setHistory(prev => [...prev, { type: 'prompt', cmd: input + '^C' }]); setInput(''); }
    }
  };

  // Subcomponents
  const Prompt = ({ dim }) => (
    <span style={{ flexShrink: 0, fontFamily: 'monospace', fontSize: '0.88rem', userSelect: 'none', whiteSpace: 'nowrap' }}>
      <span style={{ color: dim ? C.textDim : C.success }}>劉政廷@blog</span>
      <span style={{ color: C.textDim }}>:~$</span>
      <span style={{ color: C.text }}> </span>
    </span>
  );

  const colorBlocks = [C.primary, C.secondary, C.accent, C.highlight, C.success, C.warning, '#ff5555', C.text];

  const NeofetchBlock = ({ showPrompt, cmd }) => (
    <div style={{ marginBottom: '0.25rem' }}>
      {showPrompt && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
          <Prompt dim />
          <span style={{ color: C.text, fontFamily: 'monospace', fontSize: '0.88rem' }}>{cmd}</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 'clamp(1rem, 5vw, 3.5rem)', flexWrap: 'wrap', paddingLeft: '0.25rem' }}>
        {/* ASCII */}
        <div style={{ flexShrink: 0 }}>
          {ASCII_ART.map((line, i) => (
            <div key={i} style={{ fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace', fontSize: 'clamp(0.52rem, 1.3vw, 0.78rem)', color: C.accent, whiteSpace: 'pre', lineHeight: 1.45 }}>
              {line}
            </div>
          ))}
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)', color: C.highlight, marginTop: '0.5rem', textAlign: 'center', letterSpacing: '0.04em' }}>
            劉政廷 / Liu Zheng-Ting
          </div>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.08rem', justifyContent: 'center', minWidth: 0 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.7rem, 1.7vw, 0.88rem)', color: C.success, fontWeight: 'bold', marginBottom: '0.05rem' }}>
            劉政廷@blog
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: C.textDim, marginBottom: '0.3rem' }}>
            {'─'.repeat(24)}
          </div>
          {NEOFETCH_ROWS.map(([k, v], i) => (
            <div key={i} style={{ fontFamily: 'monospace', fontSize: 'clamp(0.67rem, 1.6vw, 0.83rem)', lineHeight: 1.65 }}>
              <span style={{ color: C.accent, fontWeight: 'bold' }}>{k}</span>
              <span style={{ color: C.textDim }}>: </span>
              <span style={{ color: C.text }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '4px', marginTop: '0.55rem', flexWrap: 'wrap' }}>
            {colorBlocks.map((col, i) => (
              <div key={i} style={{ width: '16px', height: '16px', background: col, borderRadius: '3px', flexShrink: 0 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const OutputLine = ({ line }) => {
    const lineColor = color[line.c] || C.text;
    const base = {
      fontFamily: 'monospace', fontSize: '0.83rem', lineHeight: 1.78,
      color: lineColor, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
    };
    if (line.link) return (
      <a href={line.link} target="_blank" rel="noopener noreferrer"
        style={{ ...base, textDecoration: 'none', borderBottom: `1px solid ${lineColor}60` }}
        onMouseEnter={e => e.currentTarget.style.borderBottomColor = lineColor}
        onMouseLeave={e => e.currentTarget.style.borderBottomColor = lineColor + '60'}
        onClick={e => e.stopPropagation()}
      >{line.t}</a>
    );
    return <div style={base}>{line.t}</div>;
  };

  return (
    <div
      style={{ minHeight: 'calc(100vh - 180px)', padding: 'clamp(0.75rem, 3vw, 2rem)', cursor: 'text', position: 'relative', zIndex: 1 }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{
        maxWidth: '880px',
        margin: '0 auto',
        background: isDark ? 'rgba(6,10,28,0.86)' : 'rgba(248,249,252,0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${C.accent}30`,
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: `0 28px 80px ${C.accent}0e, inset 0 1px 0 ${C.accent}15`,
      }}>
        {/* ── Title bar ── */}
        <div style={{
          background: isDark ? 'rgba(16,22,50,0.98)' : 'rgba(210,215,235,0.98)',
          padding: '0.6rem 1.2rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          borderBottom: `1px solid ${C.accent}18`,
          userSelect: 'none',
        }}>
          {['#ff5f56','#ffbd2e','#27c93f'].map((col, i) => (
            <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: col, flexShrink: 0 }} />
          ))}
          <span style={{ marginLeft: '0.9rem', fontFamily: 'monospace', fontSize: '0.77rem', color: C.textDim }}>
            劉政廷@blog — zsh — 80×24
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '0.7rem', color: C.textDim + '99' }}>
            lzt0104.github.io
          </span>
        </div>

        {/* ── Terminal body ── */}
        <div
          style={{ padding: '1rem 1.2rem', minHeight: '420px', maxHeight: '70vh', overflowY: 'auto' }}
          onClick={e => { e.stopPropagation(); inputRef.current?.focus(); }}
        >
          {/* Boot lines */}
          {booting && BOOT_LINES.slice(0, bootIdx).map((item, i) => (
            <div key={i} style={{
              fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.85,
              color: item.ok ? C.success : item.welcome ? C.text : C.textDim,
              whiteSpace: 'pre',
            }}>
              {item.text}
            </div>
          ))}

          {/* History */}
          {!booting && history.map((item, i) => (
            <div key={i} style={{ marginBottom: '0.25rem' }}>
              {item.type === 'neofetch' ? (
                <NeofetchBlock showPrompt={item.showPrompt} cmd={item.cmd} />
              ) : item.type === 'hint' ? (
                <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: C.textDim, fontStyle: 'italic', padding: '0.05rem 0' }}>
                  {item.text}
                </div>
              ) : item.type === 'output' ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.12rem' }}>
                    <Prompt dim />
                    <span style={{ color: C.text, fontFamily: 'monospace', fontSize: '0.88rem' }}>{item.cmd}</span>
                  </div>
                  <div style={{ paddingLeft: '0.5rem' }}>
                    {item.lines.map((line, li) => <OutputLine key={li} line={line} />)}
                  </div>
                </>
              ) : item.type === 'prompt' ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Prompt dim />
                  <span style={{ color: C.text, fontFamily: 'monospace', fontSize: '0.88rem' }}>{item.cmd}</span>
                </div>
              ) : null}
            </div>
          ))}

          {/* Active input */}
          {!booting && (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.15rem' }}>
              <Prompt />
              <input
                ref={inputRef}
                autoFocus
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: C.text, fontFamily: 'monospace', fontSize: '0.88rem',
                  caretColor: C.primary, minWidth: 0,
                }}
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Keyboard hint strip */}
      <div style={{ textAlign: 'center', marginTop: '0.75rem', fontFamily: 'monospace', fontSize: '0.68rem', color: C.textDim + 'bb', letterSpacing: '0.03em' }}>
        click to focus · Tab autocomplete · ↑↓ history · Ctrl+L clear
      </div>
    </div>
  );
}
