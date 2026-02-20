import { FolderArchive, Star, Trash } from "lucide-react";

const More = () => {
  return (
    <div className="h-1/5  w-full text-white">
      <h6 className="text-white text-">More</h6>
      <button className="w-full h-1/4 px-2 py-2  flex align-center gap-3">
        <Star />
        Favorites
      </button>
      <button className="w-full h-1/4 px-2 py-2  flex align-center gap-3">
        <Trash /> Trash
      </button>
      <button className="w-full h-1/4 px-2 py-2  flex align-center gap-3">
        <FolderArchive />
        Archived Notes
      </button>
    </div>
  );
};

export default More;
