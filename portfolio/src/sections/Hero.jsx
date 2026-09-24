import { profile } from '../data/profile';
import { stats, BUILD_DATE } from '../lib/site';
import portrait from '../assets/portrait.webp';

export default function Hero() {
  return (
    <>
      <section id="top" className="wrap hero">
        <div>
          <div className="kicker">
            <span className="status live live-dot">{profile.headline}</span>
            <span>{profile.location}</span>
            {BUILD_DATE && <span>更新於 {BUILD_DATE}</span>}
          </div>

          <h1 className="hero-name">
            {profile.name}
            <span className="hero-en">{profile.nameEn} · @{profile.handle}</span>
          </h1>

          <p className="hero-tag">寫系統、帶選手、做研究<em>。</em></p>

          <div className="hero-bio">
            {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">看做過的東西 →</a>
            <a className="btn" href="#contact">聯絡我</a>
          </div>
        </div>

        <aside>
          <figure className="figure">
            <img src={portrait} alt="劉政廷的插畫頭像：戴眼鏡、穿藍色襯衫坐在電腦前寫程式" width="720" height="670" />
            <figcaption><span>FIG.01 本人（插畫版）</span><span>1:1</span></figcaption>
          </figure>
          <dl className="spec">
            {profile.spec.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </aside>
      </section>

      <div className="wrap">
        <div className="readout">
          {stats().map(s => (
            <div key={s.label}>
              <b>{s.value}{s.unit && <sup>{s.unit}</sup>}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
