import { createBrowserRouter } from "react-router-dom";
import UI from "../components/UI";
import Notes from "../components/NoteComp/Notes";
import { fetchNotesByFolder } from "./FolderApi";
import { fetchNotesContent } from "./NotesApi";
import NoteContent from "../components/NoteComp/components/NoteContent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UI />,
    children: [
      {
        path: ":folder/:folderId",
        element: <Notes />,
        loader: fetchNotesByFolder,
        children: [
          {
            path: "notes/:noteId",
            element: <NoteContent />,
            loader: fetchNotesContent,
          },
        ],
      },
    ],
  },
]);
