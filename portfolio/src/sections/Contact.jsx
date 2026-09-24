import Section from '../components/Section';
import { profile } from '../data/profile';

export default function Contact() {
  const email = profile.links.find(l => l.name === 'Email');
  return (
    <Section id="contact" aside="系統開發、文書處理培訓或研習邀約，都歡迎來信。">
      <p className="contact-big">
        最快找到我的方式是寫信：<br />
        <a href={email.url}>{email.label}</a>
      </p>
      <div className="contacts">
        {profile.links.filter(l => l !== email).map(l => (
          <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer">
            <span>{l.name}</span>
            <span>{l.label}</span>
            <span>↗</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
