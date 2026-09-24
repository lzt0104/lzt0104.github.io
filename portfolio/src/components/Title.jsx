// 區塊標題，底下有一條手畫波浪線
export default function Title({ children, note }) {
  return (
    <div className="sec-title">
      <h2>
        {children}
        <svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 7 C 14 2, 22 11, 34 6 S 56 2, 68 7 S 92 11, 104 5 S 116 6, 118 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </h2>
      {note && <p>{note}</p>}
    </div>
  );
}
