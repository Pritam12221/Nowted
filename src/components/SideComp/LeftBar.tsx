import Folders from "./components/Folders";
import More from "./components/More";
import Navbar from "./components/Navbar";
import Recent from "./components/Recent";

const LeftBar = () => {
  return (
    <>
      <div className="flex flex-col gap-3  pt-6  h-screen w-120 text-primary">
        <Navbar />
        <Recent />
        <Folders />
        <More />
      </div>
    </>
  );
};

export default LeftBar;
