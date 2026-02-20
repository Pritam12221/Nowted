import { Folder } from "lucide-react";

const Folders = () => {
  return (
    <div className="h-1/5 w-full text-white">
      <h6 className="text-white text-">Folders</h6>
      <button className="w-full h-1/4 px-2 py-2 bg-blue-700 flex align-center gap-3">
        <Folder />
        <h6 className="self-center font-bold flex">Dummy Data</h6>
      </button>
    </div>
  );
};

export default Folders;
