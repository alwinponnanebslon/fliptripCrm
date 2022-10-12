import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../../Services/user.service";
import { toastError } from "../../../utils/toastUtils";
import jwtDecode from "jwt-decode";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  try {
    let { data: res } = await login(payload);
    let decodedToken = await jwtDecode(res.token);
    localStorage.setItem("AUTH_TOKEN", res.token);
    return {
      user: decodedToken.user,
      token: res.token,
      role: decodedToken.role,
    };
  } catch (error) {
    toastError(error);
    throw error;
  }
});

const initialState = {
  isAuthorized: false,
  user: null,
  role: null,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.role = payload.role;
      state.token = payload.token;
      state.isAuthorized = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthorized = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
