import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/paymentInvoice`;

export const addPaymentInvoiceApi = (obj) => {
  return axios.post(`${serverUrl}/add`, obj);
};

export const getPaymentInvoicesApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`)
};
export const PaymentInvoiceDeleteApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updatePaymentInvoiceApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
