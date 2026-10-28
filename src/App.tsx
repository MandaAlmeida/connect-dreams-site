import { useCallback } from 'react';
import { NAV, typeForCategory, type Project } from './content';
import { useActiveSection } from './hooks/useActiveSection';
import { useContactForm } from './hooks/useContactForm';
import { useProjectRoute } from './hooks/useProjectRoute';
import { useTheme } from './hooks/useTheme';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
// Seção "Sobre mim" desativada por enquanto. Para reativar, descomente este import,
// o <Founder /> abaixo e o item 'sobre-mim' do NAV em content.ts.
// import { Founder } from './components/Founder';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Process } from './components/Process';
import { ProjectDialog } from './components/ProjectDialog';
import { Projects } from './components/Projects';
import { Services } from './components/Services';

const SECTION_IDS = NAV.map((n) => n.id);

export function App() {
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();
  const { openId, close } = useProjectRoute();
  const form = useContactForm();
  const { setField } = form;

  // "Solicitar informações" / "Vamos conversar": preselect the project type and jump to the form.
  const requestInfo = useCallback(
    (type: string) => {
      setField('type', type);
      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    },
    [setField],
  );
  const talkAbout = useCallback(
    (p: Project) => {
      setField('type', typeForCategory(p.category));
      close('contato');
    },
    [setField, close],
  );

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header active={active} theme={theme} onToggleTheme={toggle} />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Projects />
        <Services onRequest={requestInfo} />
        <Process />
        <About />
        {/* <Founder /> */}
        <Contact form={form} />
      </main>
      <Footer />
      <ProjectDialog openId={openId} onClose={close} onTalk={talkAbout} />
    </>
  );
}
