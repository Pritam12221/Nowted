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

export const getFav = async () => {
  const data = await api.get<GetNotesType>("/notes?favorite=true");
  return data.data.notes;
};

export const getArchive = async () => {
  const data = await api.get<GetNotesType>("/notes?archived=true");
  return data.data.notes;
};

export const getDeleted = async () => {
  const data = await api.get<GetNotesType>("notes?deleted=true");
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

export const searchNotes = (data: string) => {
  return api.get<GetNotesType>("/notes", { params: { search: data } });
};

export const fetchSearchLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const data = url.searchParams.get("search") || "";
  if (!data) return [];
  const res = await searchNotes(data);
  return res.data.notes ?? [];
};
