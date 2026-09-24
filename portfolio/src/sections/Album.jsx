import Title from '../components/Title';
import { photos } from '../data/photos';
import { tilt } from '../lib/site';

const files = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const TAPES = ['var(--tape-y)', 'var(--tape-p)', 'var(--tape-m)', 'var(--tape-b)'];

export default function Album() {
  if (photos.length === 0) return null;
  return (
    <section id="album" className="sec">
      <div className="page">
        <Title>相簿</Title>
        <div className="album">
          {photos.map((p, i) => {
            const src = files[`../assets/photos/${p.file}`];
            if (!src) return null;
            return (
              <figure key={p.file} className="polaroid" style={{ '--r': tilt(i, 2.5) }}>
                <span className="tape" style={{ '--tape': TAPES[i % 4], '--tr': tilt(i + 2, 6) }} />
                <img src={src} alt={p.caption} loading="lazy" />
                <figcaption>{p.caption}{p.date && <span className="date"> · {p.date}</span>}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
