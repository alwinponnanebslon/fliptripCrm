import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/followUp`;

export const addfollowUpApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getfollowUpApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`);
};
export const followUpDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updatefollowUpApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
export const getfollowUpCheckForNotificatin = () => {
  return axios.get(`${serverUrl}/getfollowUpCheckForNotification`);
};
