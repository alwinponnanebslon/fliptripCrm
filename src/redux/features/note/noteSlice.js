import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import {
  addNoteApi,
  getNotesApi,
  NoteDeleteApi,
  updateNoteApi,
} from "../../../Services/note.service";

let initialState = {
  notes: [],
  noteObj: {},
  error: null,
};
import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const noteGet = createAsyncThunk("note/noteGet", async (query) => {
  try {
    let { data: response } = await getNotesApi(query);
    if (response) {
      toastSuccess(response.message);
      const notes = response.data;
      return notes;
    }
  } catch (error) {
    toastError(error);
    throw error;
  }
});

export const addnote = createAsyncThunk(
  "note/addnote",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await addNoteApi(payload);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(noteGet(`leadId=${payload?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const updatenote = createAsyncThunk(
  "note/updatenote",
  async (formData, thunkApi) => {
    try {
      // console.log(formData)
      let { data: response } = await updateNoteApi(formData, formData.Id);
      if (response) {
        toastSuccess(response.message);

        thunkApi.dispatch(setnote(null));
        thunkApi.dispatch(noteGet(`leadId=${formData?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const deletenote = createAsyncThunk(
  "note/deletenote",
  async (payload, thunkApi) => {
    try {
      let { data: response } = await NoteDeleteApi(payload.id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(noteGet(`leadId=${payload?.leadId}`));
      }
    } catch (error) {
      toastError(error);
      throw error;
    }
  }
);

export const setnote = createAsyncThunk("note/setnote", async (row) => {
  if (row) {
    const noteObj = row;
    return noteObj;
  }
});

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [noteGet.fulfilled]: (state, action) => {
      state.notes = action.payload;
      return action.payload.notes;
    },
    [setnote.fulfilled]: (state, action) => {
      state.noteObj = action.payload;
      return action.payload.noteObj;
    },
  },
});

// export const { addnoted, noteUpdate, setObj, } = noteSlice.actions;

export default noteSlice.reducer;
