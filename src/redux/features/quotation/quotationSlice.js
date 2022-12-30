import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddQuotation,
  get,
  deleteQuotation,
  updateQuotation,
  updateQuotationStatus,
  getFilter,
  getFilterByStatus,
} from "../../../Services/quotation.service";

let initialState = {
  quotationArr: [],
  quotationObj: null,
  quotaionAddLoading: {},
  quotaionAddError: {},
};

import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const quotationGet = createAsyncThunk(
  "auth/quotationGet",
  async (payload) => {
    try {
      // console.log(payload, "12");
      let { data: response } = await get(payload);
      // console.log(response, "12342");
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);
export const quotationFilterGet = createAsyncThunk(
  "auth/quotationFilterGet",
  async (payload) => {
    try {
      let { data: response } = await getFilter(
        `month=${payload?.monthValued}&leadId=${payload?.leadId}`
      );
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);
export const quotationFilterByStatusGet = createAsyncThunk(
  "auth/quotationFilterGet",
  async (payload) => {
    try {
      // console.log(payload, "payload231");
      let { data: response } = await getFilterByStatus(
        `status=${payload?.statusValued}&leadId=${payload?.leadId}`
      );
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);
export const quotationAdd = createAsyncThunk(
  "auth/quotationAdd",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await AddQuotation(payload);
      thunkApi.dispatch(quotationGet(`leadId=${payload?.leadId}`));
      toastSuccess(response.message);

      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setQuotationObject = createAsyncThunk(
  "auth/setQuotationObject",
  async (payload) => {
    try {
      return payload;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const quotationUpdate = createAsyncThunk(
  "auth/quotationUpdate",
  async (payload, thunkApi) => {
    try {
      let { obj, quotationId } = payload;
      let { data: response } = await updateQuotation(obj, quotationId);
      toastSuccess(response.message);
      thunkApi.dispatch(quotationGet(`leadId=${obj?.leadId}`));
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const quotationUpdateStatus = createAsyncThunk(
  "auth/quotationStatusUpdate",
  async (payload, thunkApi) => {
    try {
      // // console.log(payload, obj, "payloadpayload21");
      let { data: response } = await updateQuotationStatus(
        { status: payload.status },
        payload.Id
      );
      // console.log(response, "responsess2");
      toastSuccess(response.message);
      thunkApi.dispatch(quotationGet(`leadId=${payload?.leadId}`));
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);
// export const quotationAdd = createSlice({
//   name: "quotationObj",
//   initialState: initialState,
//   reducers: {
//     setObj: (state, { payload }) => {
//       // console.log(payload, "payload3");
//       state.quotationObj = payload;
//       // console.log(state, "state7");
//     },
//     quotationAddObj: async (state, { payload }) => {
//       // state.quotationObj = payload;

//       let { data: response } = await update(payload);
//       if (response) {
//         // console.log(response, "respse83");
//         toastSuccess(response.message);
//       }
//     },
//   },
// });

export const quotationDelete = createAsyncThunk(
  "auth/quotationDelete",
  async (payload, thunkApi) => {
    try {
      // // console.log(payload,"payloadpayload21")
      let { data: response } = await deleteQuotation(payload.id);
      toastSuccess(response.message);
      thunkApi.dispatch(quotationGet(`leadId=${payload?.leadId}`));
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

const quotationSlice = createSlice({
  name: "quotation",
  initialState: initialState,
  reducers: {
    // quotationAdd: async (state, { payload }) => {
    //   state.quotationArr = payload;

    //   let { data: response } = await AddQuotation(payload);
    //   if (response) {
    //     // console.log(response, "respse1");
    //     toastSuccess(response.message);
    //   }
    // },

    // quotationAdd: async (state, { id, payload }) => {
    //   state.quotationObj = payload;
    //   // console.log(payload, "payload23"); //whole doc com
    //   // console.log(id, "idid");

    //   let { data: response } = await update(id, payload);
    //   if (response) {
    //     // // console.log(response, "response34");
    //     toastSuccess(response.message);
    //   }
    // },
    // quotationDelete: async (state, { payload }) => {
    //   // // console.log(payload, "payload-dele");
    //   let { data: response } = await deleteQuotation(payload);
    //   // // console.log(response, "response-dele");
    //   if (response) {
    //     toastSuccess(response.message);
    //   }
    // },
    setObj: (state, { payload }) => {
      // // console.log(payload, "payload3");
      state.quotationObj = payload;
    },
  },
  extraReducers: {
    [quotationGet.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [quotationGet.fulfilled]: (state, { payload }) => {
      state.quotationArr = payload.data;
    },
    [quotationGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
    },
    //
    [quotationFilterGet.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [quotationFilterGet.fulfilled]: (state, { payload }) => {
      state.quotationArr = payload.data;
    },
    [quotationFilterGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
    },
    //
    [quotationAdd.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [quotationAdd.fulfilled]: (state, { payload }) => {},
    [quotationAdd.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
      // toastError(action.data.message);
    },
    [setQuotationObject.fulfilled]: (state, { payload }) => {
      state.quotationObj = payload;
    },

    [quotationUpdate.fulfilled]: (state, { payload }) => {
      state.quotationObj = {};
    },
    [quotationUpdateStatus.fulfilled]: (state, { payload }) => {
      state.quotationObj = {};
    },
    // //
    // [quotationDelete.pending]: (state, action) => {
    //   state.loading = true;
    //   state.error = false;
    // },
    // [quotationDelete.fulfilled]: (state, { payload }) => {
    //   // console.log(payload, "payload12");
    //   state.quotationArr = payload.data;
    // },
    // [quotationDelete.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = true;
    //   state.isAuthorized = false;
    // },
  },
});

export const { setObj } = quotationSlice.actions;

export default quotationSlice.reducer;
