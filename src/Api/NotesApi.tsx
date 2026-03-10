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
  signal?: AbortSignal,
) => {
  console.log("called notelist");
  return api.get(`notes`, {
    params: { folderId, page, limit },
    signal,
  });
};

export const getNotesContent = (noteId: string, signal?: AbortSignal) => {
  return api.get<GetNoteContentType>(`/notes/${noteId}`, { signal });
};

//loader function for notecomponent
export const fetchNotesContent = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const { noteId } = params;
  if (!noteId) {
    throw new Error("note id not exist");
  }
  try {
    const res = await getNotesContent(noteId, request.signal);
    return res.data.note;
  } catch (err) {
    throw new Error();
  }
};
