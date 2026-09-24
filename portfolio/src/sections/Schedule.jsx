import Title from '../components/Title';
import { profile } from '../data/profile';

export default function Schedule() {
  return (
    <section id="schedule" className="sec">
      <div className="page">
        <Title note="想約時間的話，可以先看一下空檔。">行程</Title>
        <div className="cal">
          <span className="tape" style={{ '--tape': 'var(--tape-m)', left: '12%' }} />
          <span className="tape" style={{ '--tape': 'var(--tape-m)', left: '88%', '--tr': '4deg' }} />
          <iframe src={profile.calendar.embedUrl} title="劉政廷的行事曆" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
