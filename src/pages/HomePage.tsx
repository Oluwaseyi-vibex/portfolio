import About from "../components/about";
import Footer from "../components/footer";
import Header from "../components/header";
import Intro from "../components/intro";
import Projects from "../components/projects";
import Skills from "../components/skills";

const HomePage = () => {
  return (
    <>
      {/* Intro overlay + curtain — rendered outside #page so they sit above it */}
      <Intro />

      {/* All page content — hidden until intro finishes */}
      <div id="page" className="bg-[#282C33] font-FiraCode h-full overflow-hidden">
        <Header />
        <Projects />
        <Skills />
        <About />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
