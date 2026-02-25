import { FileText } from "lucide-react";

const NoNoteSelected = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-white ">
      <div className="bg-zinc-800 p-6 rounded-2xl mb-2">
        <FileText size={48} className="text-zinc-400" />
      </div>
      <h2 className="text-xl font-semibold">Select a note to view</h2>
      <p className="text-zinc-500 text-sm text-center w-1/2">
        Choose a note from the list on the left to view its contents or create a new note to add to your collection.
      </p>
    </div>
  );
};

export default NoNoteSelected;
