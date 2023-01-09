import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/reminder`;

export const addReminderApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getReminderApi = (id) => {
  // console.log(id, "0po90p");
  return axios.get(`${serverUrl}/${id}`);
};
export const reminderDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateReminderApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
export const getReminderCheckForNotificatin = () => {
  return axios.get(`${serverUrl}/getReminderCheckForNotification`);
};
export const getReminderForOneApi = (id, role) => {
  return axios.get(`${serverUrl}/getAllReminderForOneDay/${id}?role=${role}`);
};
