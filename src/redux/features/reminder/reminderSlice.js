import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import {
  addReminderApi,
  getReminderApi,
  reminderDeleteApi,
  updateReminderApi,
  getReminderForOneApi,
} from "../../../Services/reminder.service";

let initialState = {
  reminders: [],
  reminderObj: {},
  error: null,
};
import { toastSuccess, toastError } from "../../../utils/toastUtils";
// const userLeadId = useSelector((state) => state.auth?.user?._id);

export const reminderGet = createAsyncThunk(
  "reminder/reminderGet",
  async (payload, thunkApi) => {
    try {
      // console.log(payload, "od324");
      let { data: response } = await getReminderApi(payload);
      // console.log(response, "respo12");
      if (response) {
        toastSuccess(response.message);
        const reminders = response.data;
        return reminders;
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const addReminder = createAsyncThunk(
  "reminder/addReminder",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await addReminderApi(payload);
      if (response) {
        toastSuccess(response.message);
        // thunkApi.dispatch(reminderGet(`leadId=${payload?.leadId}`));
        thunkApi.dispatch(reminderGet(payload?.leadId));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const updateReminder = createAsyncThunk(
  "reminder/updatereminder",
  async (formData, thunkApi) => {
    try {
      // console.log(formData, "formadadt");
      let { data: response } = await updateReminderApi(formData, formData.Id);
      if (response) {
        toastSuccess(response.message);

        thunkApi.dispatch(setReminder(null));
        // thunkApi.dispatch(reminderGet(`leadId=${formData?.leadId}`));
        thunkApi.dispatch(reminderGet(formData?.leadId));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const deleteReminder = createAsyncThunk(
  "reminder/deletereminder",
  async (payload, thunkApi) => {
    try {
      // console.log(payload, "payload231");
      let { data: response } = await reminderDeleteApi(payload.id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(reminderGet(`leadId=${payload?.leadId}`));
        thunkApi.dispatch(reminderGet(payload?.leadId));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setReminder = createAsyncThunk(
  "reminder/setreminder",
  async (row) => {
    if (row) {
      const reminderObj = row;
      return reminderObj;
    }
  }
);

export const reminderGetForOneDay = createAsyncThunk(
  "reminder/reminderGet",
  async (payload, thunkApi) => {
    try {
      // console.log(payload, "12respo12");
      let { data: response } = await getReminderForOneApi(
        payload.userId,
        payload.role
      );
      if (response) {
        // toastSuccess(response.message);
        const reminders = response.data;
        return reminders;
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

const reminderSlice = createSlice({
  name: "reminder",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [reminderGet.fulfilled]: (state, action) => {
      state.reminders = action.payload;
      return action.payload.reminders;
    },
    [reminderGetForOneDay.fulfilled]: (state, action) => {
      state.reminders = action.payload;
      return action.payload.reminders;
    },
    [setReminder.fulfilled]: (state, action) => {
      state.reminderObj = action.payload;
      return action.payload.reminderObj;
    },
  },
});

// export const { addreminderd, reminderUpdate, setObj, } = reminderSlice.actions;

export default reminderSlice.reducer;
