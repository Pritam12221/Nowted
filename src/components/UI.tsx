import { Outlet } from "react-router-dom";
import LeftBar from "./SideComp/LeftBar";
import "../App.css";

const UI = () => {
  return (
    <>
      <div className="flex bg-neutral-900 h-screen w-full text-primary">
        <LeftBar />

        <div className="flex w-full h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UI;
