import Title from '../components/Title';
import { projects } from '../data/projects';
import { statusClass, tilt } from '../lib/site';

const shots = import.meta.glob('../assets/shots/*.webp', { eager: true, import: 'default' });
const shotOf = (name) => shots[`../assets/shots/${name}.webp`];
const TAPES = ['var(--tape-y)', 'var(--tape-m)', 'var(--tape-p)', 'var(--tape-b)'];

export default function Work() {
  return (
    <section id="work" className="sec">
      <div className="page">
        <Title note="點照片可以直接打開網站。">做過的東西</Title>
        <div className="shots">
          {projects.map((p, i) => {
            const Card = p.link ? 'a' : 'div';
            const src = p.shot && shotOf(p.shot);
            return (
              <Card
                key={p.name}
                className="polaroid"
                style={{ '--r': tilt(i, 1.6) }}
                {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={`tape${i % 3 === 1 ? ' stripe' : ''}`} style={{ '--tape': TAPES[i % 4], '--tr': tilt(i + 3, 5) }} />
                <div className={`shot-img${src ? '' : ' empty'}`}>
                  {src ? <img src={src} alt={`${p.name} 的網站畫面`} loading="lazy" width="800" height="500" /> : '（還沒有截圖）'}
                </div>
                <div className="shot-cap">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="shot-meta">
                    <span>給 {p.for} <span className={`badge ${statusClass(p.status)}`}>{p.status}</span></span>
                    {p.link && <span className="go">打開 ↗</span>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
