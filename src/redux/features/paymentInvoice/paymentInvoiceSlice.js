import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import {
  addPaymentInvoiceApi,
  getPaymentInvoicesApi,
  paymentInvoiceDeleteApi,
  updatePaymentInvoiceApi,
} from "../../../Services/paymentInvoice.service";

let initialState = {
  paymentInvoices: [],
  paymentInvoiceObj: {},
  error: null,
  

};
import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const paymentInvoiceGet = createAsyncThunk("paymentInvoice/paymentInvoiceGet", async (query) => {
  try {
     let { data: response } = await getPaymentInvoicesApi(query);
    if (response) {
          toastSuccess(response.message);
          const paymentInvoices  =   response.data;
          return paymentInvoices ;
    }
  } catch (error) {
       toastError(error);
       throw error;
  }
});

export const addPaymentInvoice = createAsyncThunk(
	'paymentInvoice/addPaymentInvoice',
	async (payload,thunkApi) => {
    try {
	 let { data: response } = await addPaymentInvoiceApi(payload);
      if (response) {
        toastSuccess(response.message);
        // thunkApi.dispatch(paymentInvoiceGet());
      
    }
    } catch (error) {
    toastError(error);
    throw error;
    }
	}
);


export const updatePaymentInvoice = createAsyncThunk(
	'paymentInvoice/updatePaymentInvoice',
	async (formData,thunkApi) => {
    try {
	 let { data: response } = await updatePaymentInvoiceApi(formData,formData.Id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(paymentInvoiceGet())
    }
    } catch (error) {
    toastError(error);
    throw error;
    }
	}
);


export const deletePaymentInvoice = createAsyncThunk(
	'paymentInvoice/deletePaymentInvoice',
	async (payload,thunkApi) => {
       try {
	          let { data: response } = await paymentInvoiceDeleteApi(payload);
              if (response) {
                toastSuccess(response.message);
                thunkApi.dispatch(paymentInvoiceGet())
                  }
        } catch (error) {
        toastError(error);
        throw error;
	      }
      }
);


export const setPaymentInvoice = createAsyncThunk(
	'paymentInvoice/setPaymentInvoice',
	async (row) => {
      if (row) {
     const  paymentInvoiceObj = row;
     return paymentInvoiceObj;
      }
	}
);

const paymentInvoiceSlice = createSlice({
  name: "paymentInvoice",
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: {
    [paymentInvoiceGet.fulfilled]: (state, action) => {
      state.paymentInvoices = action.payload;
      return action.payload.paymentInvoices;
    },
    [setPaymentInvoice.fulfilled]: (state, action) => {
      state.paymentInvoiceObj =  action.payload;
      return action.payload.paymentInvoiceObj;
    },
  },
});

// export const { addPaymentInvoiced, paymentInvoiceUpdate, setObj, } = paymentInvoiceSlice.actions;

export default paymentInvoiceSlice.reducer;
