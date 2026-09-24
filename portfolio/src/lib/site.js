import { projects } from '../data/projects';
import { log, competitions, certifications } from '../data/experience';
import { photos } from '../data/photos';

// 導覽（右側索引標籤）用的區塊清單，color 是標籤顏色
export const SECTIONS = [
  { id: 'work',     label: '作品', color: '#f7d260' },
  { id: 'research', label: '研究', color: '#a9d6c8' },
  { id: 'teaching', label: '教學', color: '#f2a9b8' },
  { id: 'awards',   label: '得獎', color: '#a8c6e6' },
  { id: 'log',      label: '日記', color: '#d9c7a7' },
  { id: 'album',    label: '相簿', color: '#f5b98a', hidden: photos.length === 0 },
  { id: 'toolbox',  label: '證照', color: '#c9b8e0' },
  { id: 'schedule', label: '行程', color: '#b9d98f' },
  { id: 'contact',  label: '聯絡', color: '#f7d260' },
].filter(s => !s.hidden);

export const BUILD_DATE = import.meta.env.VITE_BUILD_DATE || '';

// 經歷類別的標籤顏色
export const TYPE_COLOR = {
  教學: '#f6c9d2', 自治: '#cfe6dc', 研究: '#d6e3f3', 工作: '#f9e3a3', 榮譽: '#f5d0b0', 研習: '#e2d8ec',
};

export const statusClass = (s) => (s === '已上線' ? 'live' : s === '進行中' || s === '執行中' ? 'wip' : '');

// 讓每張卡片的角度固定但看起來隨手貼的
export const tilt = (i, max = 2.2) => `${(((i * 37) % 9) / 8 * 2 - 1) * max}deg`;

// 教學紀錄依學校整理
export const teachingBySchool = () => {
  const schools = new Map();
  log.filter(e => e.type === '教學' && e.school).forEach(e => {
    if (!schools.has(e.school)) schools.set(e.school, { years: new Set(), kinds: new Set(), total: 0 });
    const s = schools.get(e.school);
    s.years.add(e.year); s.kinds.add(e.kind); s.total += 1;
  });
  return [...schools.entries()]
    .map(([school, s]) => ({ school, years: [...s.years].sort(), kinds: [...s.kinds], total: s.total }))
    .sort((a, b) => b.total - a.total);
};

export const facts = () => [
  { value: projects.filter(p => p.link && (p.status === '已上線' || p.status === '進行中')).length, label: '個上線中的系統' },
  { value: teachingBySchool().length, label: '所帶過的高職' },
  { value: competitions.length, label: '個獎項' },
  { value: certifications.length, label: '張證照' },
];
