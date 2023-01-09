import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/lead`;

export const createLead = (obj, role) => {
  return axios.post(`${serverUrl}/createLead?role=${role}`, obj);
};

export const getLeadsByRole = (id, role) => {
  // console.log(role, "role");
  // console.log(id, "roleid");
  return axios.get(`${serverUrl}/getByRole/${id}?role=${role}`);
};

export const updateLeadStatus = (id, obj) => {
  return axios.patch(`${serverUrl}/updateStatusById/${id}`, obj);
};

export const assignLeadToagent = (id, obj) => {
  return axios.patch(`${serverUrl}/assignLeadToAgent/${id}`, obj);
};

export const getAllLead = (query) => {
  // // console.log(query, "query");
  return axios.get(`${serverUrl}/get?${query}`);
};

// // console.log(getAllLead, "getall ");
export const getAllLeadName = (query) => {
  // // console.log(query, "query");
  return axios.get(`${serverUrl}/getAllLeadName?${query}`);
};

export const getById = (id) => {
  // // console.log(query, "query");
  return axios.get(`${serverUrl}/getById/${id}`);
};

export const updatelead = (formData, id) => {
  // console.log(formData, id, "frm services");
  return axios.patch(`${serverUrl}/updateLead/${id}`, formData);
};
export const getLeadFilterByDate = (from, to, role, id) => {
  // console.log(from, to, role, id, "12query");
  return axios.get(
    `${serverUrl}/getLeadFilterByDates/${id}?from=${from}&to=${to}&role=${role}`
  );
};
export const getAllLeadOfTenDays = (id, role) => {
  // // console.log(query, "query");
  return axios.get(`${serverUrl}/getAllLeadOfTenDays/${id}?role=${role}`);
};
export const getAllLeadSearchQuery = (id, role, query) => {
  // console.log(query, "quer2y");
  return axios.get(
    `${serverUrl}/getAllLeadBySearchQuery/${id}?&role=${role}&name=${query}`
  );
};

// export const getAllLeadSearchQuery = (query) => {
//   console.log(query, "query");
//   return axios.get(`${serverUrl}/getAllLeadBySearchQuery?${query}`);
// };
// export const getAllLeadSearchFilter = (id, role, query) => {
//   // console.log(query, "query123");
//   // return axios.get(`${serverUrl}/getByRole/${id}?role=${role}`);
//   return axios.get(
//     `${serverUrl}/getAllLeadBySearchFilter/${id}?from=${role}&${query}`
//   );
// };

export const getAllLeadSearchFilter = (from, to, role, id, query) => {
  // console.log(from, to, role, id, "12query");
  return axios.get(
    `${serverUrl}/getAllLeadBySearchFilter/${id}?from=${from}&to=${to}&role=${role}&leadStatus=${query}`
  );
};
