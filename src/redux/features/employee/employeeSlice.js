import { createSlice } from "@reduxjs/toolkit";
import { rolesObj } from "../../../utils/roles";

let initialState = {
  employeesArr: [],
  employeeObj: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    addEmployee: (state, { payload }) => {
      state.employeesArr = payload;
    },
    returnAllEmployees: (state, { payload }) => {
      state.employeesArr = payload;
    },
    getEmployeeById: (state, { payload }) => {
      state.employeeObj = state.employeesArr.find((el) => el._id == payload);
    },
    serCurrentEmployee: (state, { payload }) => {
      state.employeeObj = payload;
    },
  },
});

export const {
  addEmployee,
  returnAllEmployees,
  getEmployeeById,
  serCurrentEmployee,
} = employeeSlice.actions;

export const getAllEmployees = (state) =>
  state.employee.employeesArr.filter((el) => el.role != "ADMIN");

export const getAllTeamLeadsEmployees = (state) =>
  state.employee.employeesArr.filter((el) => el.role == rolesObj.TEAMLEAD);

export const getAllAgents = (state) =>
  state.employee.employeesArr.filter((el) => el.role == rolesObj.SPOC);

export default employeeSlice.reducer;





//

//
//
// //
// //
// //
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { rolesObj } from "../../../utils/roles";
// import {
//   addEmployeeToDb,
//   getEmployess,
//   deleteEmployees,
//   getEmployesById,
//   get,
//   login,
//   getAllClient,
//   getAllLeadName,
//   getAllEmployess,
//   updateEmployeeToDb,
//   updateEmployee,
// } from "../../../Services/user.service";

// // let initialState = {
// //   fmployees: [],
// //   fmployeeObj: {},
// //   error: null,
// // };
// let initialState = {
//   employeesArr: [],
//   employeeObj: {},
// };
// import { toastSuccess, toastError } from "../../../utils/toastUtils";

// export const employeeGet = createAsyncThunk(
//   "employee/employeeGet",
//   async (query) => {
//     try {
//       let { data: response } = await getEmployeeApi(query);
//       if (response) {
//         toastSuccess(response.message);
//         const employees = response.data;
//         return employees;
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );
// export const fmployeeGetByStatus = createAsyncThunk(
//   "fmployee/fmployeeGetByFilter",
//   async (payload) => {
//     try {
//       console.log(payload, "paylaod32s");
//       let { data: response } = await getfmployeeByStatus(
//         `status=${payload?.statusValued}&leadId=${payload?.leadId}`
//       );
//       if (response) {
//         toastSuccess(response.message);
//         const fmployees = response.data;
//         return fmployees;
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );
// export const fmployeeGetByMonth = createAsyncThunk(
//   "fmployee/fmployeeGetByFilterMonth",
//   async (payload) => {
//     try {
//       console.log(payload, "paylaod32s");
//       let { data: response } = await getfmployeeByMonth(
//         `month=${payload?.monthValued}&leadId=${payload?.leadId}`
//       );
//       if (response) {
//         toastSuccess(response.message);
//         const fmployees = response.data;
//         return fmployees;
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );
// export const fmployeeGetFilterByDate = createAsyncThunk(
//   "fmployee/fmployeeGetByFilterDate",
//   async (payload) => {
//     try {
//       // console.log(payload, "paylaod32s");
//       let { data: response } = await getfmployeeByDate(
//         `date=${payload?.handleDateFilter}&leadId=${payload?.leadId}`
//       );
//       if (response) {
//         toastSuccess(response.message);
//         const fmployees = response.data;
//         return fmployees;
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );

// export const addfmployee = createAsyncThunk(
//   "fmployee/addfmployee",
//   async (payload, thunkApi) => {
//     try {
//       let { data: response } = await addfmployeeApi(payload);
//       if (response) {
//         toastSuccess(response.message);
//         thunkApi.dispatch(fmployeeGet(`leadId=${payload?.leadId}`));
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );

// export const updatefmployee = createAsyncThunk(
//   "fmployee/updatefmployee",
//   async (formData, thunkApi) => {
//     try {
//       // console.log(formData);
//       let { data: response } = await updatefmployeeApi(formData, formData.Id);
//       if (response) {
//         toastSuccess(response.message);

//         thunkApi.dispatch(setfmployee(null));
//         thunkApi.dispatch(fmployeeGet(`leadId=${formData?.leadId}`));
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );

// export const deletefmployee = createAsyncThunk(
//   "fmployee/deletefmployee",
//   async (payload, thunkApi) => {
//     try {
//       let { data: response } = await fmployeeDeleteApi(payload.id);
//       if (response) {
//         toastSuccess(response.message);
//         thunkApi.dispatch(fmployeeGet(`leadId=${payload?.leadId}`));
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );

// export const setfmployee = createAsyncThunk(
//   "fmployee/setfmployee",
//   async (row) => {
//     if (row) {
//       const fmployeeObj = row;
//       return fmployeeObj;
//     }
//   }
// );

// const fmployeeSlice = createSlice({
//   name: "fmployee",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: {
//     [fmployeeGet.fulfilled]: (state, action) => {
//       state.fmployees = action.payload;
//       return action.payload.fmployees;
//     },
//     [fmployeeGetByStatus.fulfilled]: (state, action) => {
//       state.fmployees = action.payload;
//       return action.payload.fmployees;
//     },
//     [fmployeeGetByMonth.fulfilled]: (state, action) => {
//       state.fmployees = action.payload;
//       return action.payload.fmployees;
//     },
//     [fmployeeGetFilterByDate.fulfilled]: (state, action) => {
//       state.fmployees = action.payload;
//       return action.payload.fmployees;
//     },
//     [setfmployee.fulfilled]: (state, action) => {
//       state.fmployeeObj = action.payload;
//       return action.payload.fmployeeObj;
//     },
//   },
// });

// // export const { addfmployeed, fmployeeUpdate, setObj, } = fmployeeSlice.actions;

// export default fmployeeSlice.reducer;
