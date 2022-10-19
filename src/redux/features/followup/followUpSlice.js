import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import { addfollowUpApi, getfollowUpApi, followUpDeleteApi, updatefollowUpApi } from "../../../Services/followUp";

let initialState = {
  followUps: [],
  followUpObj: {},
  error: null,
};
import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const followUpGet = createAsyncThunk("followUp/followUpGet", async (query) => {
  try {
    let { data: response } = await getfollowUpApi(query);
    if (response) {
      toastSuccess(response.message);
      const followUps = response.data;
      return followUps;
    }
  } catch (error) {
    toastError(error);
    throw error;
  }
});

export const addfollowUp = createAsyncThunk("followUp/addfollowUp", async (payload, thunkApi) => {
  try {
    let { data: response } = await addfollowUpApi(payload);
    if (response) {
      toastSuccess(response.message);
      thunkApi.dispatch(followUpGet(`leadId=${payload?.leadId}`));
    }
  } catch (error) {
    toastError(error);
    throw error;
  }
});

export const updatefollowUp = createAsyncThunk("followUp/updatefollowUp", async (formData, thunkApi) => {
  try {

    console.log(formData)
    let { data: response } = await updatefollowUpApi(formData, formData.Id);
    if (response) {
      toastSuccess(response.message);

      
      thunkApi.dispatch(setfollowUp(null));
      thunkApi.dispatch(followUpGet(`leadId=${formData?.leadId}`));
    }
  } catch (error) {
    toastError(error);
    throw error;
  }
});

export const deletefollowUp = createAsyncThunk("followUp/deletefollowUp", async (payload, thunkApi) => {
  try {
    let { data: response } = await followUpDeleteApi(payload.id);
    if (response) {
      toastSuccess(response.message);
      thunkApi.dispatch(followUpGet(`leadId=${payload?.leadId}`));
    }
  } catch (error) {
    toastError(error);
    throw error;
  }
});

export const setfollowUp = createAsyncThunk("followUp/setfollowUp", async (row) => {
  if (row) {
    const followUpObj = row;
    return followUpObj;
  }
});

const followUpSlice = createSlice({
  name: "followUp",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [followUpGet.fulfilled]: (state, action) => {
      state.followUps = action.payload;
      return action.payload.followUps;
    },
    [setfollowUp.fulfilled]: (state, action) => {
      state.followUpObj = action.payload;
      return action.payload.followUpObj;
    },
  },
});

// export const { addfollowUpd, followUpUpdate, setObj, } = followUpSlice.actions;

export default followUpSlice.reducer;
