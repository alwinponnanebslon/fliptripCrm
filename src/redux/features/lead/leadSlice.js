import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddLead,
  getAllLead,
  deleteLead,
  update,getAllLeadName
} from "../../../Services/lead.service";

let initialState = {
  leadArr: [],
  leadObj: {},
};

import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const leadGet = createAsyncThunk("auth/leadGet", async (payload) => {
  try {
    console.log(payload, "payload-lead-get");
    let { data: response } = await getAllLeadName(payload);
    console.log(response, "lead-get");
    return response;
  } catch (error) {
    toastError(error);
    throw error;
  }
});

const leadSlice = createSlice({
  name: "lead",
  initialState: initialState,
  reducers: {
    leadAdd: async (state, { payload }) => {
      state.leadArr = payload;

      let { data: response } = await AddLead(payload);
      if (response) {
        console.log(response, "resp1");
        toastSuccess(response.message);
      }
    },
    leadDelete: async (state, { payload }) => {
      let { data: response } = await deleteLead(payload);
      // console.log(response, "response-dele");
      if (response) {
        toastSuccess(response.message);
      }
    },
    setObj: (state, { payload }) => {
      // console.log(payload, "payload3");
      state.quotationObj = payload;
      // console.log(state, "state7");
    },
    leadUpdateObj: async (state, { payload }) => {
      // state.quotationObj = payload;
      // console.log(payload, "payload");

      let { data: response } = await update(payload, payload.id);
      if (response) {
        toastSuccess(response.message);
      }
    },
  },

  extraReducers: {
    [leadGet.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [leadGet.fulfilled]: (state, { payload }) => {
      //   console.log(payload, "payload12-lead");
      state.leadArr = payload.data;
    },
    [leadGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
    },
  },
});

export const { leadAdd, leadDelete, setObj, leadUpdateObj } = leadSlice.actions;

export default leadSlice.reducer;
