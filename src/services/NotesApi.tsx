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
