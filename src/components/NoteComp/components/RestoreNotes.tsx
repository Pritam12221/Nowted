import { AxiosError } from "axios";
import { AlertTriangle, History } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useRevalidator } from "react-router-dom";
import { restoreNote } from "../../../Api/MoreApi";
import type { RestoreProps } from "../../../types/type";
const RestoreNotes = ({ noteId, noteTitle }: RestoreProps) => {
  const revalidator = useRevalidator();
  const navigate = useLocation();
  const nav = useNavigate();

  //handlers
  const handleRestore = async () => {
    try {
      const res = await restoreNote(noteId);
      console.log("inside handleRestore", res);
      toast.success(res.data, { icon: <History size={16} /> });
      revalidator.revalidate();
      if (navigate.pathname.includes("/trash")) {
        nav("/trash");
      } else {
        nav(0);
      }
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
      <div className="w-75 flex justify-center">
        <h2 className="text-xl font-semibold truncate">Restore"{noteTitle}"</h2>
      </div>
      <p className="text-zinc-500 text-sm text-center w-1/2">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <button
        onClick={handleRestore}
        className="rounded text-white bg-blue-700 hover:bg-blue-600 transition-colors px-3 py-2 cursor-pointer"
      >
        Restore
      </button>
    </div>
  );
};

export default RestoreNotes;
