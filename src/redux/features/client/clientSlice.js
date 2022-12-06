import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddClient,
  get,
  deleteClient,
  updateClient,
} from "../../../Services/client.service";

let initialState = {
  clientArr: [],
  clientObj: {},
  quotaionAddLoading: {},
  quotaionAddError: {},
};

import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const clientGet = createAsyncThunk("auth/clientGet", async (payload) => {
  try {
    console.log(payload, "payloadpayload21");
    let { data: response } = await get(payload);
    // // console.log(response, "responsess");
    return response;
  } catch (error) {
    toastError(error);
    throw error;
  }
});
export const clientAdd = createAsyncThunk(
  "auth/clientAdd",
  async (payload, thunkApi) => {
    try {
      // console.log(payload, "payloadpayload21");
      let { data: response } = await AddClient(payload);
      // console.log(response, "responsess2");
      toastSuccess(response.message);
      thunkApi.dispatch(clientGet());
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setclientObj = createAsyncThunk(
  "auth/setclientObj",
  async (payload) => {
    try {
      return payload;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const clientUpdate = createAsyncThunk(
  "auth/clientUpdate",
  async (payload, thunkApi) => {
    try {
      let { obj, clientId } = payload;
      // console.log(payload, "payloadpayload21");
      let { data: response } = await updateClient(obj, clientId);
      // console.log(response, "responsess2");
      toastSuccess(response.message);
      thunkApi.dispatch(clientGet());
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const clientDelete = createAsyncThunk(
  "auth/clientDelete",
  async (payload, thunkApi) => {
    try {
      // // console.log(payload,"payloadpayload21")
      let { data: response } = await deleteClient(payload);
      // console.log(response, "responsess");
      toastSuccess(response.message);
      thunkApi.dispatch(clientGet());
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: initialState,
  reducers: {
    setObj: (state, { payload }) => {
      // // console.log(payload, "payload3");
      state.clientObj = payload;
    },
  },
  extraReducers: {
    [clientGet.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [clientGet.fulfilled]: (state, { payload }) => {
      // console.log(payload, "payload12");
      state.clientArr = payload.data;
    },
    [clientGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
    },
    //
    [clientAdd.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [clientAdd.fulfilled]: (state, { payload }) => {
      // console.log(payload, "payload34");
    },
    [clientAdd.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
      // toastError(action.data.message);
    },
    [setclientObj.fulfilled]: (state, { payload }) => {
      // console.log(payload, "payload12");
      state.clientObj = payload;
    },

    [clientUpdate.fulfilled]: (state, { payload }) => {
      // console.log(payload, "payload12");
      state.clientObj = {};
    },
  },
});

export const { setObj } = clientSlice.actions;

export default clientSlice.reducer;
