import { CalendarDays, Ellipsis } from "lucide-react";
import { useLoaderData } from "react-router-dom";

const NoteContent = () => {
  const note = useLoaderData();
  console.log("notecontent", note);
  return (
    <div className="w-full px-10 py-10">
      <div className="flex justify-between ">
        <h6 className="text-4xl">{note.title}</h6>
        <button className="p-3 border rounded-full border-background-700 text-background-700 cursor-pointer">
          <Ellipsis size={18} />
        </button>
      </div>

      <div>
        <CalendarDays />
        {note.createdAt}
      </div>

      <div></div>
      <p></p>
    </div>
  );
};

export default NoteContent;
