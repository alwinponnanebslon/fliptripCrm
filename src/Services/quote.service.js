import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/quote`;

export const addQuoteApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getQuotesApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`)
};
export const quoteDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateQuoteApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
