import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddPaymentApi,
  getPaymentsApi,
  deletePaymentApi,
  updatePaymentApi,
  getPaymentByQuotationApi,
} from "../../../Services/payment.service";

let initialState = {
  paymentArr: [],
  paymentObj: null,
  quotaionAddLoading: {},
  quotaionAddError: {},
};

import { toastSuccess, toastError } from "../../../utils/toastUtils";
import { quotationGet } from "../quotation/quotationSlice";

export const paymentGet = createAsyncThunk(
  "auth/paymentGet",
  async (payload) => {
    try {
      let { data: response } = await getPaymentsApi(payload);
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const paymentGetByQuotation = createAsyncThunk(
  "auth/paymentGetByQuotation",
  async (payload) => {
    try {
      let { data: response } = await getPaymentByQuotationApi(payload);
      // // console.log(response, "23response");
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const paymentAdd = createAsyncThunk(
  "auth/paymentAdd",
  async (payload, thunkApi) => {
    try {
      // console.log(payload, "tempObj");
      let { data: response } = await AddPaymentApi(payload);
      // thunkApi.dispatch(paymentGet(`leadId=${payload?.leadId}`))
      toastSuccess(response.message);

      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setPaymentObj = createAsyncThunk(
  "auth/setPaymentObj",
  async (payload) => {
    try {
      return payload;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const paymentUpdate = createAsyncThunk(
  "auth/paymentUpdate",
  async (payload, thunkApi) => {
    try {
      let { obj, paymentId } = payload;
      let { data: response } = await updatePaymentApi(
        payload,
        payload.paymentId
      );
      toastSuccess(response.message);
      thunkApi.dispatch(quotationGet(`leadId=${payload?.leadId}`));
      // thunkApi.dispatch(getPaymentByQuotationApi(payload?.quotationId));

      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const paymentUpdateStatus = createAsyncThunk(
  "auth/paymentStatusUpdate",
  async (payload, thunkApi) => {
    try {
      // // console.log(payload, obj, "payloadpayload21");
      let { data: response } = await updatepaymentStatus(
        { status: payload.status },
        payload.Id
      );
      // console.log(response, "responsess2");
      toastSuccess(response.message);
      thunkApi.dispatch(paymentGet(`leadId=${payload?.leadId}`));
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);
// export const paymentAdd = createSlice({
//   name: "paymentObj",
//   initialState: initialState,
//   reducers: {
//     setObj: (state, { payload }) => {
//       // console.log(payload, "payload3");
//       state.paymentObj = payload;
//       // console.log(state, "state7");
//     },
//     paymentAddObj: async (state, { payload }) => {
//       // state.paymentObj = payload;

//       let { data: response } = await update(payload);
//       if (response) {
//         // console.log(response, "respse83");
//         toastSuccess(response.message);
//       }
//     },
//   },
// });
export const paymentDelete = createAsyncThunk(
  "auth/paymentDelete",
  async (payload, thunkApi) => {
    try {
      // // console.log(payload,"payloadpayload21")
      let { data: response } = await deletepayment(payload.id);
      toastSuccess(response.message);
      thunkApi.dispatch(paymentGet(`leadId=${payload?.leadId}`));
      return response;
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    // paymentAdd: async (state, { payload }) => {
    //   state.paymentArr = payload;

    //   let { data: response } = await Addpayment(payload);
    //   if (response) {
    //     // console.log(response, "respse1");
    //     toastSuccess(response.message);
    //   }
    // },

    // paymentAdd: async (state, { id, payload }) => {
    //   state.paymentObj = payload;
    //   // console.log(payload, "payload23"); //whole doc com
    //   // console.log(id, "idid");

    //   let { data: response } = await update(id, payload);
    //   if (response) {
    //     // // console.log(response, "response34");
    //     toastSuccess(response.message);
    //   }
    // },
    // paymentDelete: async (state, { payload }) => {
    //   // // console.log(payload, "payload-dele");
    //   let { data: response } = await deletepayment(payload);
    //   // // console.log(response, "response-dele");
    //   if (response) {
    //     toastSuccess(response.message);
    //   }
    // },
    setObj: (state, { payload }) => {
      // // console.log(payload, "payload3");
      state.paymentObj = payload;
    },
  },
  extraReducers: {
    [paymentGet.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [paymentGet.fulfilled]: (state, { payload }) => {
      state.paymentArr = payload.data;
    },
    [paymentGetByQuotation.fulfilled]: (state, { payload }) => {
      state.paymentObj = payload.data;
    },
    [paymentGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
    },
    //
    [paymentAdd.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [paymentAdd.fulfilled]: (state, { payload }) => {},
    [paymentAdd.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
      // toastError(action.data.message);
    },
    [setPaymentObj.fulfilled]: (state, { payload }) => {
      state.paymentObj = payload;
    },

    [paymentUpdate.fulfilled]: (state, { payload }) => {
      state.paymentObj = {};
    },
    [paymentUpdateStatus.fulfilled]: (state, { payload }) => {
      state.paymentObj = {};
    },
    // //
    // [paymentDelete.pending]: (state, action) => {
    //   state.loading = true;
    //   state.error = false;
    // },
    // [paymentDelete.fulfilled]: (state, { payload }) => {
    //   // console.log(payload, "payload12");
    //   state.paymentArr = payload.data;
    // },
    // [paymentDelete.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = true;
    //   state.isAuthorized = false;
    // },
  },
});

export const { setObj } = paymentSlice.actions;

export default paymentSlice.reducer;
