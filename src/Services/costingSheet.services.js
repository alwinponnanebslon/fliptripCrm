import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/costingSheet`;

export const add = (obj) => {
  return axios.post(`${serverUrl}/add/${id}`, obj);
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

export const getAll = (id, role) => {
  return axios.get(`${serverUrl}/getAllCostingSheet/${id}?role=${role}`);
};

export const getAllCost = (id, role) => {
  // console.log(query, "qwreu1");
  return axios.get(`${serverUrl}/getAllCost/${id}?role=${role}`);
};

export const getAllSalesOfTenDays = (id, role) => {
  return axios.get(`${serverUrl}/getAllSalesOfTenDays/${id}?role=${role}`);
};
