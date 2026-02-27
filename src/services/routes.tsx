import { createBrowserRouter } from "react-router-dom";
import UI from "../components/UI";
import Notes from "../components/NoteComp/Notes";
import { fetchNotesByFolder } from "./FolderApi";
import { fetchNotesContent } from "./NotesApi";
import NoteContent from "../components/NoteComp/components/NoteContent";
import NoNoteSelected from "../components/NoteComp/components/NoNoteSelected";
import { getArchive, getDeleted, getFav } from "./MoreApi";

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
            index: true,
            element: <NoNoteSelected />,
          },
          {
            path: "notes/:noteId",
            element: <NoteContent />,
            loader: fetchNotesContent,
          },
        ],
      },
      {
        path: "favorites",
        element: <Notes />,
        loader: getFav,
        children: [
          {
            index: true,
            element: <NoNoteSelected />,
          },
          {
            path: "notes/:noteId",
            element: <NoteContent />,
            loader: fetchNotesContent,
          },
        ],
      },
      {
        path: "archived",
        element: <Notes />,
        loader: getArchive,
        children: [
          {
            index: true,
            element: <NoNoteSelected />,
          },
          {
            path: "notes/:noteId",
            element: <NoteContent />,
            loader: fetchNotesContent,
          },
        ],
      },
      {
        path: "trash",
        element: <Notes />,
        loader: getDeleted,
        children: [
          {
            index: true,
            element: <NoNoteSelected />,
          },
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
