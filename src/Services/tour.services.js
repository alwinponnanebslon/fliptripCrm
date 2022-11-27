import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/tour`;

export const addTourApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getToursApi = (query) => {
  console.log(query, "queryqe")
  return axios.get(`${serverUrl}/?${query}`)
};
export const tourDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateTourApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getActiveToursApi = (query) => {
  console.log(query, "queryqe")
  return axios.get(`${serverUrl}/getActiveTours?${query}`)
};