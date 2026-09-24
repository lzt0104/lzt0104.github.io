import Title from '../components/Title';
import { profile } from '../data/profile';
import { certifications } from '../data/experience';

export default function Toolbox() {
  const groups = certifications.reduce((acc, c) => {
    (acc[c.issuer] ||= []).push(c.name);
    return acc;
  }, {});

  return (
    <section id="toolbox" className="sec">
      <div className="page">
        <Title>證照和工具</Title>
        <div className="two">
          <div className="box">
            <span className="tape" style={{ '--tape': 'var(--tape-b)' }} />
            <h3>證照 {certifications.length} 張</h3>
            <dl>
              {Object.entries(groups).map(([issuer, names]) => (
                <div key={issuer}><dt>{issuer}</dt><dd>{names.join('、')}</dd></div>
              ))}
            </dl>
          </div>
          <div className="box" style={{ transform: 'rotate(0.8deg)' }}>
            <span className="tape stripe" style={{ '--tape': 'var(--tape-y)' }} />
            <h3>常用的工具</h3>
            <dl>
              {profile.stack.map(g => (
                <div key={g.group}><dt>{g.group}</dt><dd>{g.items.join('、')}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
