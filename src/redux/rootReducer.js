import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./features/employee/employeeSlice";
import authReducer from "./features/auth/authSlice";
import tourReducer from "./features/tour/tourSlice";
import quotationReducer from "./features/quotation/quotationSlice";
import leadReducer from "./features/lead/leadSlice";
import userReducer from "./features/user/userSlice";
import clientReducer from "./features/client/clientSlice";
import followUpReducer from "./features/followup/followUpSlice";
import noteReducer from "./features/note/noteSlice";
import costingSheetReducer from "./features/CostingSheet/CostingSheetSlice";
import paymentReducer from "./features/payment/paymentSlice";
import paymentInvoiceReducer from "./features/paymentInvoice/paymentInvoiceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  tour: tourReducer,
  quotation: quotationReducer,
  lead: leadReducer,
  user: userReducer,
  client: clientReducer,
  followUp: followUpReducer,
  note: noteReducer,
  costingSheet: costingSheetReducer,
  payment: paymentReducer,
  paymentInvoice: paymentInvoiceReducer,
});

export default rootReducer;
