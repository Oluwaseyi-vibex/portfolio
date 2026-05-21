import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CaseStudyPage from "./pages/CaseStudyPage";
import HomePage from "./pages/HomePage";
import TerminalPage from "./pages/TerminalPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terminal" element={<TerminalPage />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
