import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Calculator from './components/Calculator.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import Projects from './components/Projects.jsx';
import Blog from './components/Blog.jsx';
import Testimonials from './components/Testimonials.jsx';
import Faq from './components/Faq.jsx';
import BrandStatement from './components/BrandStatement.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer, { FloatingWidgets } from './components/Footer.jsx';
import GlobalLeaves from './components/GlobalLeaves.jsx';
import { observeReveals } from './hooks.js';

export default function App() {
  /* Prime every scroll-reveal element once the tree is mounted
     (sections that don't run useReveal themselves are covered here). */
  useEffect(() => {
    const id = window.requestAnimationFrame(() => observeReveals(document));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-charcoal focus:px-5 focus:py-3 focus:font-heading focus:text-sm focus:font-bold focus:text-cream"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Calculator />
        <BeforeAfter />
        <Projects />
        <Blog />
        <Testimonials />
        <Faq />
        <BrandStatement />
        <ContactForm />
      </main>

      <Footer />
      <GlobalLeaves />
      <FloatingWidgets />
    </div>
  );
}
