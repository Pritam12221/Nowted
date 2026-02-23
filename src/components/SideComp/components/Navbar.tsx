import { Plus, Search } from "lucide-react";
import logo from "../../../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="h-1/6 px-10 w-full flex flex-col justify-between text-primary">
      <div className="flex justify-between items-center w-full">
        <img src={logo} alt="Noted" className="h-22 w-22" />
        <Search size={18} className=" text-primary" />
      </div>
      <div className="flex w-full items-baseline ">
        <button className="flex bg-primary-button w-full text-mid justify-center items-center text-white px-5 py-2 rounded cursor-pointer">
          <Plus size={20} />
          New Note
        </button>
      </div>
    </div>
  );
};

export default Navbar;
