import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/quotation`;
// import { TOURAdd, get } from "../../../../redux/features/tour/tourSlice";
export const AddQuotation = (obj) => {
  // console.log(obj, "obj axios");
  // // console.log(serverUrl, "serverUrl");
  return axios.post(`${serverUrl}/add`, obj);
};



export const AddSavedQuotation = (obj) => {
  // console.log(obj, "obj axios");
  // // console.log(serverUrl, "serverUrl");
  return axios.post(`${serverUrl}/addSavedQuote`, obj);
};

export const getSavedQuotation = (query) => {
  return axios.get(`${serverUrl}/getSavedQuotation?${query}`);
};
export const get = (query) => {
  return axios.get(`${serverUrl}?${query}`);
};

export const deleteQuotation = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateQuotation = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
export const updateQuotationStatus = (formData, id) => {
  // console.log(formData, id, "dbcall update");
  return axios.patch(`${serverUrl}/updateStatusById/${id}`, formData);
};
export const getApprovedQuotation = (id) => {
  return axios.get(`${serverUrl}/getApprovedQuotation/${id}`);
};
export const getFilter = (query) => {
  return axios.get(`${serverUrl}/getFilter?${query}`);
};
export const getFilterByStatus = (query) => {
  return axios.get(`${serverUrl}/getFilterByStatus?${query}`);
};
