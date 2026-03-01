import { AxiosError } from "axios";
import { AlertTriangle, History } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { restoreNote } from "../../../services/MoreApi";
import type { RestoreProps } from "../../../types/type";
const RestoreNote = ({ noteId, noteTitle }: RestoreProps) => {
  const navigate = useNavigate();
  const handleRestore = async () => {
    try {
      const res = await restoreNote(noteId);
      console.log(res);
      toast.success(res.data, { icon: <History size={16} /> });
      navigate(0);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-white ">
      <div className="bg-zinc-800 p-6 rounded-2xl mb-2">
        <History />
      </div>
      <h2 className="text-xl font-semibold">Restore"{noteTitle}"</h2>
      <p className="text-zinc-500 text-sm text-center w-1/2">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <button
        onClick={handleRestore}
        className="rounded text-white bg-blue-700 hover:bg-blue-600 transition-colors px-5 py-3 cursor-pointer"
      >
        Restore
      </button>
    </div>
  );
};

export default RestoreNote;
