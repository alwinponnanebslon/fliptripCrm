import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { rolesObj } from "../../../utils/roles";
import {
  addTourApi,
  getToursApi,
  tourDeleteApi,
  updateTourApi,
} from "../../../Services/tour.services";

let initialState = {
  tours: [],
  tourObj: {},
  error: null,
  

};
import { toastSuccess, toastError } from "../../../utils/toastUtils";

export const tourGet = createAsyncThunk("tour/tourGet", async (query) => {
  try {
     let { data: response } = await getToursApi(query);
    if (response) {
          toastSuccess(response.message);
          const tours  =   response.data;
          return tours ;
    }
  } catch (error) {
       toastError(error);
       throw error;
  }
});

export const addTour = createAsyncThunk(
	'tour/addTour',
	async (payload,thunkApi) => {
    try {
	 let { data: response } = await addTourApi(payload);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(tourGet());
      
    }
    } catch (error) {
    toastError(error);
    throw error;
    }
	}
);


export const updateTour = createAsyncThunk(
	'tour/updateTour',
	async (formData,thunkApi) => {
    try {
	 let { data: response } = await updateTourApi(formData,formData.Id);
      if (response) {
        toastSuccess(response.message);
        thunkApi.dispatch(tourGet())
    }
    } catch (error) {
    toastError(error);
    throw error;
    }
	}
);


export const deleteTour = createAsyncThunk(
	'tour/deleteTour',
	async (payload,thunkApi) => {
       try {
	          let { data: response } = await tourDeleteApi(payload);
              if (response) {
                toastSuccess(response.message);
                thunkApi.dispatch(tourGet())
                  }
        } catch (error) {
        toastError(error);
        throw error;
	      }
      }
);


export const setTour = createAsyncThunk(
	'tour/setTour',
	async (row) => {
      if (row) {
     const  tourObj = row;
     return tourObj;
      }
	}
);

const tourSlice = createSlice({
  name: "tour",
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: {
    [tourGet.fulfilled]: (state, action) => {
      state.tours = action.payload;
      return action.payload.tours;
    },
    [setTour.fulfilled]: (state, action) => {
      state.tourObj =  action.payload;
      return action.payload.tourObj;
    },
  },
});

// export const { addTourd, tourUpdate, setObj, } = tourSlice.actions;

export default tourSlice.reducer;
