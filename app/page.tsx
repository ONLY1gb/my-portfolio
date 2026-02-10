
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/Projects";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black selection:bg-cyan-500/30">
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <Services />
      <Contact />
    </main>
  );
}
