import { useContext } from "react";
import { ToggleThemeContext } from "../../context/ToggleTheme";
import Folders from "./components/Folders";
import More from "./components/More";
import Navbar from "./components/Navbar";
import Recent from "./components/Recent";
import { Moon, Sun } from "lucide-react";

const LeftBar = () => {
  const themeContext = useContext(ToggleThemeContext);

  return (
    <div className="flex flex-col gap-3 pt-3 h-screen w-100 text-primary">
      <Navbar />
      <Recent />
      <Folders />
      <More />

      {themeContext && (
        <div className="mt-auto px-10 pb-3">
          <button
            onClick={themeContext.toggleTheme}
            className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 rounded-md transition-colors w-full cursor-pointer text-zinc-400 hover:text-white"
          >
            {themeContext.dark ? (
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
      )}
    </div>
  );
};

export default LeftBar;
