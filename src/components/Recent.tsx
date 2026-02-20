import { FileText } from "lucide-react";

const Recent = () => {
  return (
    <div className="h-1/5 w-full  text-white">
      <h6 className="text-white text-bold">Recents</h6>
      <button className="w-full h-1/4 px-1 py-2 bg-blue-700 flex align-center gap-3">
        <FileText />
        <h6 className="self-center font-bold flex">Dummy Data</h6>
      </button>
    </div>
  );
};

export default Recent;
