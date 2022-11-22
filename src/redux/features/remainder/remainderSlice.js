import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import {
  addRemainderApi,
  getRemainderApi,
  remainderDeleteApi,
  updateRemainderApi,
} from "../../../Services/remainder";

let initialState = {
  remainders: [],
  remainderObj: {},
  error: null,
};
import { toastSuccess, toastError } from "../../../utils/toastUtils";
// const userLeadId = useSelector((state) => state.auth?.user?._id);
export const remainderGet = createAsyncThunk(
  "remainder/remainderGet",
  async (query) => {
    try {
      let { data: response } = await getRemainderApi(query);
      if (response) {
        toastSuccess(response.message);
        const remainders = response.data;
        return remainders;
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const addRemainder = createAsyncThunk(
  "remainder/addRemainder",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await addRemainderApi(payload);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(remainderGet(`leadId=${payload?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const updateRemainder = createAsyncThunk(
  "remainder/updateremainder",
  async (formData, thunkApi) => {
    try {
      console.log(formData, "formadadt");
      let { data: response } = await updateRemainderApi(formData, formData.Id);
      if (response) {
        toastSuccess(response.message);

        thunkApi.dispatch(setRemainder(null));
        thunkApi.dispatch(remainderGet(`leadId=${formData?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const deleteRemainder = createAsyncThunk(
  "remainder/deleteremainder",
  async (payload, thunkApi) => {
    try {
      // console.log(payload, "payload231");
      let { data: response } = await remainderDeleteApi(payload.id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(remainderGet(`leadId=${payload?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setRemainder = createAsyncThunk(
  "remainder/setremainder",
  async (row) => {
    if (row) {
      const remainderObj = row;
      return remainderObj;
    }
  }
);

const remainderSlice = createSlice({
  name: "remainder",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [remainderGet.fulfilled]: (state, action) => {
      state.remainders = action.payload;
      return action.payload.remainders;
    },
    [setRemainder.fulfilled]: (state, action) => {
      state.remainderObj = action.payload;
      return action.payload.remainderObj;
    },
  },
});

// export const { addremainderd, remainderUpdate, setObj, } = remainderSlice.actions;

export default remainderSlice.reducer;
