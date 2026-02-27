import { History } from "lucide-react";
import { useParams } from "react-router-dom";
const RestoreNote = () => {
  const params = useParams();
  console.log(params);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-white ">
      <div className="bg-zinc-800 p-6 rounded-2xl mb-2">
        <History />
      </div>
      <h2 className="text-xl font-semibold">Restore</h2>
      <p className="text-zinc-500 text-sm text-center w-1/2">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <button className="rounded text-white bg-blue-700 px-3 py-3">
        Restore
      </button>
    </div>
  );
};

export default RestoreNote;
