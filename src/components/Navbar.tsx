import { Plus, Search } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="h-1/6  w-full flex justify-between relative">
      <div className="flex justify-between w-full">
        <img src={logo} alt="Noted" className="h-22 w-22" />
        <Search size={20} className="mt-7 text-white" />
      </div>
      <div className="flex w-full items-baseline absolute bottom-0">
        <button className="flex bg-zinc-700 w-full text-lg justify-center items-center text-white px-5 py-2.5 rounded cursor-pointer">
          <Plus size={20} />
          New Note
        </button>
      </div>
    </div>
  );
};

export default Navbar;
