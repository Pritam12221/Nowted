import { useEffect, useState } from "react";
import Folders from "./components/Folders";
import More from "./components/More";
import Navbar from "./components/Navbar";
import Recent from "./components/Recent";
import { Moon, Sun } from "lucide-react";

const LeftBar = () => {
  const [dark, setdark] = useState(() => {
    const save = localStorage.getItem("theme");
    return save ? save === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    if (dark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [dark]);

  const toggleTheme = () => setdark((prev) => !prev);

  return (
    <div className="flex flex-col pt-6 h-screen w-90 shrink-0 text-primary transition-all duration-300 overflow-hidden">
      <Navbar />

      <Recent />

      <div className="overflow-hidden">
        <Folders />
      </div>

      <More />

      <div className="mt-auto px-10 pb-6">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-3 px-4 py-2 hover:bg-zinc-800 rounded-md transition-colors w-full cursor-pointer text-zinc-400 hover:text-white"
        >
          {dark ? (
            <>
              <Sun size={18} />
              <p>Light Mode</p>
            </>
          ) : (
            <>
              <Moon size={18} />
              <p>Dark Mode</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
