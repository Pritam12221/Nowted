import type { Notes } from "../../../types/type";

const Note = ({ value }: { value: Notes }) => {
  return (
    <div>
      <h6>{value.title}</h6>
      <p className="truncate text-primary">{value.preview}</p>
    </div>
  );
};

export default Note;
