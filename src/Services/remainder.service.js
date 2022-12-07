import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/remainder`;

export const addRemainderApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getRemainderApi = (id) => {
  console.log(id, "0po90p");
  return axios.get(`${serverUrl}/${id}`);
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
export const getRemainderForOneApi = (id, role) => {
  return axios.get(`${serverUrl}/getAllRemainderForOneDay/${id}?role=${role}`);
};
