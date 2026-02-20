import Folders from "./Folders";
import More from "./More";
import Navbar from "./Navbar";
import Recent from "./Recent";

const LeftBar = () => {
  return (
    <>
      <div className="flex flex-col gap-5 px-10 pt-6  h-screen w-1/5">
        <Navbar />
        <Recent />
        <Folders />
        <More />
      </div>
    </>
  );
};

export default LeftBar;
