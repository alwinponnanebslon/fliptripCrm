import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/lead`;

export const createLead = (obj, role) => {
  return axios.post(`${serverUrl}/createLead?role=${role}`, obj);
};

export const getLeadsByRole = (id, role) => {
  console.log(role, "role");
  return axios.get(`${serverUrl}/getByRole/${id}?role=${role}`);
};

export const updateLeadStatus = (id, obj) => {
  return axios.patch(`${serverUrl}/updateStatusById/${id}`, obj);
};

export const assignLeadToagent = (id, obj) => {
  return axios.patch(`${serverUrl}/assignLeadToAgent/${id}`, obj);
};

export const getAllLead = (query) => {
  // console.log(query, "query");
  return axios.get(`${serverUrl}/get?${query}`);
};

// console.log(getAllLead, "getall ");
export const getAllLeadName = (query) => {
  // console.log(query, "query");
  return axios.get(`${serverUrl}/getAllLeadName?${query}`);
};

export const getById = (id) => {
  // console.log(query, "query");
  return axios.get(`${serverUrl}/getById/${id}`);
};

export const updatelead = (formData, id) => {
  return axios.patch(`${serverUrl}/updateLead/${id}`, formData);
};

