import axios from "axios";
import { getNotesbyFolder } from "./NotesApi";
import type { LoaderFunctionArgs } from "react-router-dom";
const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});
export const getFolders = () => {
  return api.get("/folders");
};

export const postFolder = (post: object) => {
  return api.post("/folders", post);
};

export const renameFolder = (id: string, name: string) => {
  return api.patch(`/folders/${id}`, { name });
};

export const postNotes = (post: object) => {
  return api.post("/notes", post);
};

export const fetchNotesByFolder = async ({ params }: LoaderFunctionArgs) => {
  const { folderId } = params;

  if (!folderId) {
    throw new Error("id doesn't exist");
  }
  const res = await getNotesbyFolder(folderId);
  return res.data.notes;
};
