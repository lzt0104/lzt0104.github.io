import Nav from './components/Nav';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Research from './sections/Research';
import Teaching from './sections/Teaching';
import Awards from './sections/Awards';
import Log from './sections/Log';
import Album from './sections/Album';
import Toolbox from './sections/Toolbox';
import Schedule from './sections/Schedule';
import Contact from './sections/Contact';
import { profile } from './data/profile';
import { BUILD_DATE } from './lib/site';

export default function App() {
  return (
    <>
      {/* 印章用的粗糙墨跡效果 */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </svg>

      <Nav />
      <main>
        <Hero />
        <Work />
        <Research />
        <Teaching />
        <Awards />
        <Log />
        <Album />
        <Toolbox />
        <Schedule />
        <Contact />
      </main>
      <footer className="foot page">
        © {new Date().getFullYear()} {profile.name}
        {BUILD_DATE && <> · 最後更新 {BUILD_DATE}</>}
        {' · '}
        <a href="https://github.com/lzt0104/lzt0104.github.io" target="_blank" rel="noopener noreferrer">原始碼</a>
      </footer>
    </>
  );
}
