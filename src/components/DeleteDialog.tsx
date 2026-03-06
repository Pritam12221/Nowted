import { Trash2 } from "lucide-react";

const DeleteDialog = ({
  onDelete,
  onCancel,
  id,
}: {
  onDelete: (id: string) => void;
  onCancel: () => void;
  id: string;
}) => {
  return (
    <div //overlay
      className="fixed inset-0 z-10 flex  justify-center items-center"
    >
      <div className="bg-zinc-700 text-secondary rounded px-10 py-10">
        <p>Are you sure you want to delete this?</p>
        <div className="flex justify-center items-center pt-7 gap-2">
          <button
            onClick={onCancel}
            className="rounded  transition-colors px-3 py-2 cursor-pointer border-2  text-secondary "
          >
            Cancel
          </button>
          <button className=" text-white rounded bg-red-500 hover:bg-red-800 transition-colors px-3 py-2 cursor-pointer">
            <Trash2
              onClick={() => {
                onDelete(id);
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
