import axios from "axios";
import type { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

export const getNotes = () => {
  return api.get("/notes");
};

export const getRecentNotes = () => {
  return api.get("/notes/recent");
};

export const getNotesbyFolder = (folderId: string) => {
  return api.get(`notes`, { params: { folderId } });
};

export const getNotesContent = (noteId: string) => {
  return api.get(`/notes/${noteId}`);
};

export const fetchNotesContent = async ({ params }: LoaderFunctionArgs) => {
  const { noteId } = params;
  console.log("note id", noteId);
  if (!noteId) {
    throw new Error("note id not exist");
  }

  const res = await getNotesContent(noteId);
  console.log("inside fetchnotecontent", res.data.note);
  return res.data.note;
};
