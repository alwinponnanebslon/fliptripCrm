import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./features/employee/employeeSlice";
import authReducer from "./features/auth/authSlice";
import tourReducer from "./features/tour/tourSlice";
import quotationReducer from "./features/quotation/quotationSlice";
import leadReducer from "./features/lead/leadSlice";
import userReducer from "./features/user/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  tour: tourReducer,
  quotation: quotationReducer,
  lead: leadReducer,
  user: userReducer,
});

export default rootReducer;
