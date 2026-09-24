import Section from '../components/Section';
import { certifications } from '../data/experience';

export default function Certs() {
  const groups = certifications.reduce((acc, c) => {
    (acc[c.issuer] ||= []).push(c.name);
    return acc;
  }, {});

  return (
    <Section id="certs" aside="依發證單位分組。">
      <div className="certs">
        {Object.entries(groups).map(([issuer, names]) => (
          <div className="cert-group" key={issuer}>
            <h3>{issuer}<span>{String(names.length).padStart(2, '0')}</span></h3>
            <ul>{names.map(n => <li key={n}>{n}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
