import type { Notes } from "../../../types/type";
import { format } from "date-fns";
const Note = ({ value }: { value: Notes }) => {
  const newDate = format(new Date(value.createdAt), "dd/MM/yyyy");
  return (
    <div className="items-center py-3 w-[38%]">
      <h6 className="text-lg text-bold pb-2">{value.title}</h6>
      <div className="flex flex-row text-primary w-full">
        <span className="pr-2">{newDate}</span>
        <p className="truncate text-primary">{value.preview}</p>
      </div>
    </div>
  );
};

export default Note;
