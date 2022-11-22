import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/remainder`;

export const addRemainderApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getRemainderApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`);
};
export const remainderDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateRemainderApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
export const getRemainderCheckForNotificatin = () => {
  return axios.get(`${serverUrl}/getRemainderCheckForNotification`);
};
