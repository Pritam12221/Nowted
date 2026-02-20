import axios from "axios";
const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

export const getNotes = () => {
  return api.get("/notes");
};

export const getRecentNotes = () => {
  return api.get("/notes/recent");
};

export const getFolders = () => {
  return api.get("/folders");
};

export const postFolder = (post: object) => {
  return api.post("/folders", post);
};

export const postNotes = (post: object) => {
  return api.post("/notes", post);
};
