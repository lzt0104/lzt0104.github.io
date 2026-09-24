import Section from '../components/Section';
import { profile } from '../data/profile';

export default function Schedule() {
  return (
    <Section id="schedule" aside="我的 Google 日曆。想約時間的話，可以先看一下空檔再來信。">
      <div className="cal">
        <div className="cal-bar"><span>calendar.google.com</span><span>Asia/Taipei</span></div>
        <iframe src={profile.calendar.embedUrl} title="劉政廷的行事曆" loading="lazy" />
      </div>
    </Section>
  );
}
