import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/notifications`;

export const addNotificationApi = (obj) => {
  console.log(obj, "obj231");
  return axios.post(`${serverUrl}/add`, obj);
};

export const getNotificationApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`);
};
// export const notificationDeleteApi = (id) => {
//   return axios.delete(`${serverUrl}/deleteById/${id}`);
// };

// export const updateRemainderApi = (formData, id) => {
//   return axios.patch(`${serverUrl}/updateById/${id}`, formData);
// };

export const getRemainderCheckForNotificatin = () => {
  return axios.get(`${serverUrl}/getRemainderCheckForNotification`);
};
export const getNotificationForSpecificUserApi = (id) => {
  return axios.get(`${serverUrl}/getSpecificUserNotification/${id}`);
};
