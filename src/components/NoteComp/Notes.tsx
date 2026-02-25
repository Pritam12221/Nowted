import { Outlet, useNavigation } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteListSkeleton from "../SkeletonsLoaders/NoteListLoader";
import NoteContentSkeleton from "../SkeletonsLoaders/NoteContentLoader";

const Notes = () => {
  const nav = useNavigation();
  const Loading = nav.state === "loading";
  return (
    <div className="flex w-full h-screen ">
      <div className="flex w-full h-screen ">
        {Loading ? <NoteListSkeleton /> : <NoteList />}
        {Loading ? <NoteContentSkeleton /> : <Outlet />}
      </div>
    </div>
  );
};

export default Notes;
