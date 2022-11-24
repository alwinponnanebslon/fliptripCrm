import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  addNotificationApi,
  getNotificationApi,
  notificationDeleteApi,
  updateNotificationApi,
} from "../../../Services/notification.service";


let initialState = {
  notifications: [],
  notificationObj: {},
  error: null,
};


import { toastSuccess, toastError } from "../../../utils/toastUtils";
// const userLeadId = useSelector((state) => state.auth?.user?._id);


export const notificationGet = createAsyncThunk(
  "notification/notificationGet",
  async (query) => {
    try {
      let { data: response } = await getNotificationApi(query);
      if (response) {
        toastSuccess(response.message);
        const notifications = response.data;
        return notifications;
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const addNotification = createAsyncThunk(
  "notification/addNotification",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await addNotificationApi(payload);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(notificationGet(`leadId=${payload?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

// export const updateNotification = createAsyncThunk(
//   "notification/updatenotification",
//   async (formData, thunkApi) => {
//     try {
//       console.log(formData, "formadadt");
//       let { data: response } = await updateNotificationApi(formData, formData.Id);
//       if (response) {
//         toastSuccess(response.message);

//         thunkApi.dispatch(setNotification(null));
//         thunkApi.dispatch(notificationGet(`leadId=${formData?.leadId}`));
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );

// export const deleteNotification = createAsyncThunk(
//   "notification/deletenotification",
//   async (payload, thunkApi) => {
//     try {
//       // console.log(payload, "payload231");
//       let { data: response } = await notificationDeleteApi(payload.id);
//       if (response) {
//         toastSuccess(response.message);
//         thunkApi.dispatch(notificationGet(`leadId=${payload?.leadId}`));
//       }
//     } catch (error) {
//       toastError(error);
//       throw error;
//     }
//   }
// );

export const setNotification = createAsyncThunk(
  "notification/setnotification",
  async (row) => {
    if (row) {
      const notificationObj = row;
      return notificationObj;
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [notificationGet.fulfilled]: (state, action) => {
      state.notifications = action.payload;
      return action.payload.notifications;
    },
    [setNotification.fulfilled]: (state, action) => {
      state.notificationObj = action.payload;
      return action.payload.notificationObj;
    },
  },
});

// export const { addnotificationd, notificationUpdate, setObj, } = notificationSlice.actions;

export default notificationSlice.reducer;
