// =============================================
// 主題配色 - 在這裡調整深色/亮色主題顏色
// =============================================

export const DARK_THEME = {
  bg:             '#0a0e27',
  bgLight:        '#1a1f3a',
  bgGradient:     'linear-gradient(135deg, #0a0e27 0%, #0f1419 50%, #0a0e27 100%)',
  primary:        '#00d9ff',
  secondary:      '#bd93f9',
  accent:         '#7aa2f7',
  highlight:      '#ff79c6',
  success:        '#50fa7b',
  warning:        '#ffb86c',
  text:           '#e0e0e0',
  textDim:        '#8892b0',
  border:         'rgba(122, 162, 247, 0.25)',
  cardBg:         'rgba(26, 31, 58, 0.93)',
  scanlineColor:  'rgba(0, 217, 255, 0.03)',
  navBg:          'rgba(10, 14, 39, 0.9)',
};

export const LIGHT_THEME = {
  bg:             '#f8f9fc',
  bgLight:        '#ffffff',
  bgGradient:     'linear-gradient(135deg, #f8f9fc 0%, #e8ebf5 50%, #f8f9fc 100%)',
  primary:        '#0066ff',
  secondary:      '#7c3aed',
  accent:         '#2563eb',
  highlight:      '#ec4899',
  success:        '#10b981',
  warning:        '#f59e0b',
  text:           '#1e293b',
  textDim:        '#64748b',
  border:         'rgba(37, 99, 235, 0.15)',
  cardBg:         'rgba(255, 255, 255, 0.8)',
  scanlineColor:  'rgba(0, 102, 255, 0.02)',
  navBg:          'rgba(248, 249, 252, 0.9)',
};

export const getColors = (isDark) => (isDark ? DARK_THEME : LIGHT_THEME);
