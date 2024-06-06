import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Header from "./components/header";
import Projects from "./components/projects";
import Skills from "./components/skills";
function App() {
  return (
    <>
      <div className="bg-[#282C33] font-FiraCode h-full overflow-hidden">
        <Header />
        <Projects />
        <Skills />
        <About />
        <Footer />
      </div>
    </>
  );
}

export default App;
