import Title from '../components/Title';
import { profile } from '../data/profile';

export default function Contact() {
  const email = profile.links.find(l => l.name === 'Email');
  return (
    <section id="contact" className="sec">
      <div className="page">
        <Title>聯絡</Title>
        <div className="letter">
          <span className="tape" style={{ '--tape': 'var(--tape-p)' }} />
          <p>有事找我的話，寫信最快：</p>
          <a className="mail" href={email.url}>{email.label}</a>
          <p>其他地方也找得到我：</p>
          <ul>
            {profile.links.filter(l => l !== email).map(l => (
              <li key={l.name}>
                <a href={l.url} target="_blank" rel="noopener noreferrer"><span>{l.name}</span>{l.label} ↗</a>
              </li>
            ))}
          </ul>
          <p className="sign">— 政廷</p>
        </div>
      </div>
    </section>
  );
}
