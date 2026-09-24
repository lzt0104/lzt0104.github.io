import { profile } from '../data/profile';
import { facts } from '../lib/site';
import portrait from '../assets/portrait.webp';

export default function Hero() {
  return (
    <section id="top" className="page hero">
      <div>
        <p className="hello">嗨，我是</p>
        <h1><span>{profile.name}</span></h1>
        <p className="en">{profile.nameEn} · {profile.location}</p>

        <div className="bio">
          {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="facts">
          {facts().map(f => <span key={f.label}><b>{f.value}</b>{f.label}</span>)}
        </div>
      </div>

      <div className="hero-side">
        <figure className="polaroid me-card">
          <span className="tape" style={{ '--tape': 'var(--tape-m)', '--tr': '-4deg' }} />
          <img src={portrait} alt="劉政廷的插畫頭像：戴眼鏡、穿藍色襯衫坐在電腦前寫程式" width="720" height="670" />
          <figcaption>寫 code 中，勿擾</figcaption>
        </figure>

        <div className="note busy">
          <span className="tape stripe" style={{ '--tape': 'var(--tape-p)', '--tr': '3deg' }} />
          <h3>最近在忙</h3>
          <ul>
            {profile.busy.map(b => <li key={b.text} className={b.done ? 'done' : ''}>{b.text}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
