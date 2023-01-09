import axios from "axios";
import { url } from "./url.service";
const serverUrl = `${url}/users`;

export const addEmployeeToDb = async (obj) => {
  return await axios.post(`${serverUrl}/`, obj);
};
export const getEmployess = async (userId, role) => {
  return await axios.get(`${serverUrl}/getByUserId/${userId}?role=${role}`);
};
export const deleteEmployees = async (id) => {
  return await axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const getEmployesById = async (id) => {
  return await axios.get(`${serverUrl}/getUserById/${id}`);
};

export const login = async (formData) => {
  // console.log(formData);
  return await axios.post(`${serverUrl}/login`, formData);
};

export const getAllClient = (query) => {
  // // console.log(query, "query");
  return axios.get(`${serverUrl}/?${query}`);
};

export const getAllLeadName = (query) => {
  // // console.log(query, "query");
  return axios.get(`${serverUrl}/getAllLeadName?${query}`);
};
export const getAllEmployess = async (query) => {
  // console.log(query, "12query21");
  return await axios.get(`${serverUrl}/getAllEmployes?${query}`);
};
export const updateEmployeeToDb = async (id, formData, query) => {
  //for admin can update rmeployee
  // console.log(id, formData, "in services234");
  return await axios.patch(`${serverUrl}/updateUserByAdmin/${id}`, formData);
};
export const updateEmployee = async (id, formData, query) => {
  // console.log(id, formData, "in services234");
  return await axios.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const registerUserFcmToken = async (obj) => {
  return await axios.post(`${serverUrl}/registerUserFcmToken`, obj);
};
export const handleCheckValidUserDashboard = async (formData) => {
  // console.log(formData);
  return await axios.post(`${serverUrl}/checkValidUserDashboard`, formData);
};
export const getEmployessLinkedWithLeadId = async (id) => {
  // console.log(formData);
  return await axios.get(`${serverUrl}/getEmployessLinkedWithThisLeadId/${id}`);
};
export const updateEmployeePasswordToDb = async (id, obj) => {
  // console.log(formData);
  return await axios.patch(`${serverUrl}/updateEmployeePassword/${id}`, obj);
  // return await axios.post(`${serverUrl}/`, obj);
};
// export const getReminderApi = (id) => {
//   // console.log(id, "0po90p");
//   return axios.get(`${serverUrl}/${id}`);
// };
