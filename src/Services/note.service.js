import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/note`;

export const addNoteApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getNotesApi = (query) => {
  console.log(query, "2134r4ew");
  return axios.get(`${serverUrl}/?${query}`);
};
export const NoteDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateNoteApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
