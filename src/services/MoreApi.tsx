import { api } from "./NotesApi";

export const changeArchive = (id: string, isArchive: boolean) => {
  console.log("archive state changed");
  return api.patch(`/notes/${id}`, { isArchived: isArchive });
};

export const changeFavorite = (id: string, isFavorite: boolean) => {
  console.log("favorite state changed");
  return api.patch(`/notes/${id}`, { isFavorite: isFavorite });
};

export const deleteNote = (id: string) => {
  console.log("note deleted");
  return api.delete(`/notes/${id}`);
};

export const deleteFolder = (id: string) => {
  console.log("folder deleted");
  return api.delete(`/folders/${id}`);
};
