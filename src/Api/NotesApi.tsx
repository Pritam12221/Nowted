import axios from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import type {
  GetNoteContentType,
  GetNotesType,
  GetRecentType,
} from "../types/type";
export const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

export const getNotes = () => {
  return api.get<GetNotesType>("/notes");
};

export const getRecentNotes = () => {
  return api.get<GetRecentType>("/notes/recent");
};

export const getNotesbyFolder = (
  folderId: string,
  page: number,
  limit: number,
) => {
  return api.get(`notes`, {
    params: { folderId, page, limit },
  });
};

export const getNotesContent = (noteId: string) => {
  return api.get<GetNoteContentType>(`/notes/${noteId}`);
};

//loader function for notecomponent
export const fetchNotesContent = async ({ params }: LoaderFunctionArgs) => {
  const { noteId } = params;
  if (!noteId) {
    throw new Error("note id not exist");
  }
  try {
    const res = await getNotesContent(noteId);
    return res.data.note;
  } catch (err) {
    throw new Error();
  }
};
