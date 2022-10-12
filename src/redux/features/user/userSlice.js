import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddUser,
  getAllClient,
  deleteUser,
  update,
  getAllLeadName,
} from "../../../Services/user.service";

let initialState = {
  userArr: [],
  userObj: {},
};

import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const userGet = createAsyncThunk("auth/userGet", async (payload) => {
  try {
    // console.log(payload, "payload-lead-get");//undeifuned
    let { data: response } = await getAllLeadName(payload);
    console.log(response, "User-gt");
    return response;
  } catch (error) {
    toastError(error);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userAdd: async (state, { payload }) => {
      state.userArr = payload;

      let { data: response } = await AddUser(payload);
      if (response) {
        console.log(response, "resp1");
        toastSuccess(response.message);
      }
    },
    userDelete: async (state, { payload }) => {
      let { data: response } = await deleteUser(payload);
      // console.log(response, "response-dele");
      if (response) {
        toastSuccess(response.message);
      }
    },
    setObj: (state, { payload }) => {
      // console.log(payload, "payload3");
      state.userObj = payload;
      // console.log(state, "state7");
    },
    userUpdateObj: async (state, { payload }) => {
      let { data: response } = await update(payload, payload.id);
      if (response) {
        toastSuccess(response.message);
      }
    },
  },

  extraReducers: {
    [userGet.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [userGet.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload12-lead");
      state.userArr = payload.data;
    },
    [userGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
    },
  },
});

export const { userAdd, userDelete, setObj, userUpdateObj } = userSlice.actions;

export default userSlice.reducer;
