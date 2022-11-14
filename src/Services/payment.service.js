import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/payment`;

export const AddPaymentApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getPaymentsApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`)
};

export const paymentDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updatePaymentApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getPaymentByQuotationApi = (id) => {
  return axios.get(`${serverUrl}/getPaymentByQuotation/${id}`)
};
