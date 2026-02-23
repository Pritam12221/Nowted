import NoteContent from "./components/NoteContent";
import NoteList from "./components/NoteList";

const Notes = () => {
  return (
    <div className="flex w-full h-screen ">
      <NoteList />
      <NoteContent />
    </div>
  );
};

export default Notes;
