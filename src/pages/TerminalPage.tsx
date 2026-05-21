import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Terminal from "../components/terminal";

const TerminalPage = () => {
  return (
    <div className="min-h-dvh bg-[#282C33] font-FiraCode">
      <header className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-[#3e4451] bg-[#282C33]/95 px-4 py-5 backdrop-blur-sm md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" />
          <span className="text-base font-bold tracking-wide text-white">OluwaSeyi</span>
        </Link>
        <Link
          to="/"
          className="text-sm text-[#ABB2BF] underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          ← back to portfolio
        </Link>
      </header>

      <main className="pt-24">
        <Terminal />
      </main>
    </div>
  );
};

export default TerminalPage;
