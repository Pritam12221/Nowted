import { createContext, useState, useEffect, type ReactNode } from "react";
import type { toggleThemeType } from "../types/type";

export const ToggleThemeContext = createContext<toggleThemeType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setdark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
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
    <ToggleThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ToggleThemeContext.Provider>
  );
};
