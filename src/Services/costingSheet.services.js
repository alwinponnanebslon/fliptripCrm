import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/costingSheet`;

export const add = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const get = (query) => {
  return axios.get(`${serverUrl}/?${query}`);
};
export const costingDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getAll = () => {
  return axios.get(`${serverUrl}/getAllCostingSheet`);
};

export const getAllCost = (query) => {
  // console.log(query, "qwreu1");
  return axios.get(`${serverUrl}/getAllCost/?${query}`);
};

export const getAllSalesOfTenDays = (id, role) => {
  return axios.get(`${serverUrl}/getAllSalesOfTenDays/${id}?role=${role}`);
};
