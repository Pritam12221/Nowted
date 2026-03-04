import type { LoaderFunctionArgs } from "react-router-dom";
import { api } from "./NotesApi";

export const changeArchive = (id: string, isArchived: boolean) => {
  return api.patch(`/notes/${id}`, { isArchived: !isArchived });
};

export const changeFavorite = (id: string, isFavorite: boolean) => {
  return api.patch(`/notes/${id}`, { isFavorite: !isFavorite });
};

export const deleteNote = (id: string) => {
  return api.delete(`/notes/${id}`);
};

export const deleteFolder = (id: string) => {
  console.log("folder deleted");
  return api.delete(`/folders/${id}`);
};

export const getFav = async () => {
  const data = await api.get("/notes?favorite=true");
  console.log("fav", data);
  return data.data.notes;
};

export const getArchive = async () => {
  const data = await api.get("/notes?archived=true");
  console.log("inside arc", data);
  return data.data.notes;
};

export const getDeleted = async () => {
  const data = await api.get("notes?deleted=true");
  console.log(data);
  return data.data.notes;
};

export const restoreNote = (id: string) => {
  console.log("inside restore", id);
  return api.post(`/notes/${id}/restore`);
};

export const updateNote = (
  id: string,
  data: Partial<{ title: string; content: string; folderId: string }>,
) => {
  return api.patch(`/notes/${id}`, data);
};

export const searchNotes = (data: string) => {
  return api.get("/notes", { params: { search: data } });
};

export const fetchSearchLoader = async ({ request }: LoaderFunctionArgs) => {
  console.log("inside search loader", request);
  const url = new URL(request.url);
  const data = url.searchParams.get("search") || "";
  if (!data) return [];
  const res = await searchNotes(data);
  return res.data.notes ?? [];
};
