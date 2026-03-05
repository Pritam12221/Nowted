import { RouterProvider } from "react-router-dom";
import "./App.css";

import { router } from "./services/routes";
import { ThemeProvider } from "./context/ToggleTheme";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
