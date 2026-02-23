import { createBrowserRouter } from "react-router-dom";
import UI from "../components/UI";
import { fetchFolder } from "./FolderApi";
import Folders from "../components/SideComp/components/Folders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UI />,
    loader: fetchSideBar,
    children: [
      // { path: "recent", element: <Recent /> },
      { index: true, element: <Folders />, loader: fetchFolder },
      // { path: "archived", element: <More /> },
    ],
  },
]);
