import { createBrowserRouter } from "react-router-dom";
import UI from "./components/UI";
import NotesWrapper from "./components/NoteComp/NotesWrapper";
import { fetchNotesByFolder } from "./Api/FolderApi";
import NoNoteSelected from "./components/NoteComp/components/NoNoteSelected";
import NoteContent from "./components/NoteComp/components/NoteContent";
import { fetchNotesContent } from "./Api/NotesApi";
import {
  fetchSearchLoader,
  getArchive,
  getDeleted,
  getFav,
} from "./Api/MoreApi";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UI />,
    children: [
      {
        path: ":folder/:folderId",
        element: <NotesWrapper />,
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
        element: <NotesWrapper />,
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
        element: <NotesWrapper />,
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
        element: <NotesWrapper />,
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
      {
        path: "search",
        element: <NotesWrapper />,
        loader: fetchSearchLoader,
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
