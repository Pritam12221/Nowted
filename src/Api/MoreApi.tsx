import type { LoaderFunctionArgs } from "react-router-dom";
import { api } from "./NotesApi";
import type { GetNotesType } from "../types/type";

export const toggleFavArch = (
  id: string,
  isFavorite?: boolean,
  isArchived?: boolean,
) => {
  return api.patch<string>(`/notes/${id}`, {
    isFavorite: !isFavorite,
    isArchived: !isArchived,
  });
};

export const deleteNote = (id: string) => {
  return api.delete<string>(`/notes/${id}`);
};

export const deleteFolder = (id: string) => {
  return api.delete<string>(`/folders/${id}`);
};

export const getFavNotes = (page = 1, limit = 10) => {
  return api.get<GetNotesType>("/notes", {
    params: { favorite: true, page, limit },
  });
};

export const getFav = async () => {
  const data = await getFavNotes(1, 10);
  return data.data.notes;
};

export const getArchiveNotes = (page = 1, limit = 10) => {
  return api.get<GetNotesType>("/notes", {
    params: { archived: true, page, limit },
  });
};

export const getArchive = async () => {
  const data = await getArchiveNotes(1, 10);
  return data.data.notes;
};

export const getDeletedNotes = (page: number, limit: number) => {
  return api.get<GetNotesType>("/notes", {
    params: { deleted: true, page, limit },
  });
};

export const getDeleted = async () => {
  const data = await getDeletedNotes(1, 10);
  return data.data.notes;
};

export const restoreNote = (id: string) => {
  return api.post<string>(`/notes/${id}/restore`);
};

export const updateNote = (
  id: string,
  data: Partial<{ title: string; content: string; folderId: string }>,
) => {
  return api.patch<string>(`/notes/${id}`, data);
};

export const searchNotes = (
  data: string,
  page?: number,
  limit?: number,
  signal?: AbortSignal,
) => {
  return api.get<GetNotesType>("/notes", {
    params: { search: data, page, limit },
    signal,
  });
};

export const fetchSearchLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const data = url.searchParams.get("search") || "";
  if (!data) return [];
  const res = await searchNotes(data, 1, 10, request.signal);
  return res.data.notes ?? [];
};
