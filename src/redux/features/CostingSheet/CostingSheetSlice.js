import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import {
  updateApi,
  add,
  get,
  costingDeleteApi,
} from "../../../Services/costingSheet.services";

let initialState = {
  costingSheets: [],
  costingSheetObj: {},
  error: null,
};
import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const costingSheetGet = createAsyncThunk(
  "costingSheet/costingSheetGet",
  async (query) => {
    try {
      console.log(query, "query312");
      let { data: response } = await get(query);
      // console.log(response, " response 231 in");
      if (response) {
        toastSuccess(response.message);
        const costingSheets = response.data;
        return costingSheets;
      }
      // if (response && response?.data && response?.data?._id) {
      //   console.log(response?.data?._id, "response?.data?._id31");
      //   const costingSheetObj = response.data;
      //   return costingSheetObj;
      // }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const addCosting = createAsyncThunk(
  "costingSheet/add",
  async (payload, thunkApi) => {
    try {
      console.log(payload, "payload23");
      let { data: response } = await add(payload, payload.id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(costingSheetGet());
        // window.location.reload();
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const update = createAsyncThunk(
  "costingSheet/update",
  async (formData, thunkApi) => {
    try {
      let { data: response } = await updateApi(formData, formData.id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(costingSheetGet());
        // window.location.reload();
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const deleteCostingSheet = createAsyncThunk(
  "costingSheet/delete",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await costingDeleteApi(payload);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(costingSheetGet());
        window.location.reload();
        // // console.log("delete");
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setCostingSheet = createAsyncThunk(
  "costingSheet/set",
  async (row) => {
    if (row) {
      const costingSheetObj = row;
      return costingSheetObj;
    }
  }
);

const costingSheetSlice = createSlice({
  name: "costingSheet",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [costingSheetGet.fulfilled]: (state, action) => {
      state.costingSheets = action.payload;
      return action.payload.costingSheets;
    },
    [setCostingSheet.fulfilled]: (state, action) => {
      state.costingSheetObj = action.payload;
      return action.payload.costingSheetObj;
    },
  },
});

// export const { addTourd, costingSheetUpdate, setObj, } = costingSheetSlice.actions;

export default costingSheetSlice.reducer;
