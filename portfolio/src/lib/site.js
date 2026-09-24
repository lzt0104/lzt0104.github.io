import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { log, competitions, certifications } from '../data/experience';

// 導覽列、指令面板共用的區塊清單
export const SECTIONS = [
  { id: 'now',       no: '01', label: '現在', en: 'Now' },
  { id: 'work',      no: '02', label: '作品', en: 'Work' },
  { id: 'research',  no: '03', label: '研究', en: 'Research' },
  { id: 'teaching',  no: '04', label: '教學', en: 'Teaching' },
  { id: 'awards',    no: '05', label: '競賽', en: 'Awards' },
  { id: 'log',       no: '06', label: '經歷', en: 'Log' },
  { id: 'certs',     no: '07', label: '證照', en: 'Certifications' },
  { id: 'schedule',  no: '08', label: '行程', en: 'Schedule' },
  { id: 'contact',   no: '09', label: '聯絡', en: 'Contact' },
];

export const BUILD_DATE = import.meta.env.VITE_BUILD_DATE || '';

export const hostOf = (url) => {
  try { return new URL(url).host; } catch { return url; }
};

export const statusClass = (s) => (s === '已上線' ? 'live' : s === '進行中' || s === '執行中' ? 'wip' : '');

// 教學類且有填學校的紀錄
export const teachingBySchool = () => {
  const schools = new Map();
  log.filter(e => e.type === '教學' && e.school).forEach(e => {
    if (!schools.has(e.school)) schools.set(e.school, {});
    const kinds = (schools.get(e.school)[e.year] ||= []);
    if (!kinds.includes(e.kind)) kinds.push(e.kind);
  });
  const years = [...new Set(log.filter(e => e.school).map(e => e.year))].sort();
  // 往來次數多的學校排前面
  const rows = [...schools.entries()]
    .map(([school, byYear]) => ({ school, byYear, total: Object.values(byYear).flat().length }))
    .sort((a, b) => b.total - a.total);
  return { years, rows };
};

export const stats = () => [
  { value: projects.filter(p => p.link && (p.status === '已上線' || p.status === '進行中')).length, label: '上線中的系統' },
  { value: teachingBySchool().rows.length, label: '帶過的高職' },
  { value: profile.research.length, label: '國科會計畫' },
  { value: competitions.length, label: '競賽獲獎' },
  { value: certifications.length, label: '專業證照' },
  { value: log.reduce((s, e) => s + (e.hours || 0), 0), unit: 'h', label: '研習時數' },
];
