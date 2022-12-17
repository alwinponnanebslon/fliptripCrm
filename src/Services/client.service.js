import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/client`;
// import { TOURAdd, get } from "../../../../redux/features/tour/tourSlice";
export const AddClient = (obj) => {
  // console.log(obj, "obj axios");
  // // console.log(serverUrl, "serverUrl");
  return axios.post(`${serverUrl}/add`, obj);
};

export const get = (query) => {
  return axios.get(`${serverUrl}/?${query}`);
};

export const deleteClient = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateClient = (formData, id) => {
  console.log(formData, id, "dbcall update");
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
export const getFilter = (query) => {
  return axios.get(`${serverUrl}/filter?${query}`);
};
