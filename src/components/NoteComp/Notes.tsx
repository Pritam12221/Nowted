import { Outlet, useNavigation } from "react-router-dom";
import NoteContentSkeleton from "../SkeletonsLoaders/NoteContentLoader";
import NoteListSkeleton from "../SkeletonsLoaders/NoteListLoader";
import NoteList from "./components/NoteList";

const Notes = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full h-screen">
        {isLoading ? <NoteListSkeleton /> : <NoteList />}
        {isLoading ? <NoteContentSkeleton /> : <Outlet />}
      </div>
    </div>
  );
};

export default Notes;
