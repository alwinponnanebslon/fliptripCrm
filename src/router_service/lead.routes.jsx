import QuotationFollowup from "../MainPage/Lead/FollowUp/FollowUp";
import LeadView from "../MainPage/Lead/LeadView";
import AddPayment from "../MainPage/Lead/Payment/AddPayment";
import Quotation from "../MainPage/Lead/Quotation/Quotation";
import ViewCostingSheet from "../MainPage/CostingSheet/index";
import AddCostingSheetForm from "../MainPage/CostingSheet/Forms/basicinputs/CostingSheetForm";
export default [
  {
    path: "/admin/lead/:leadId",
    component: LeadView,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },

  {
    path: "/admin/lead/:leadId/quotes",
    component: Quotation,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },
  {
    path: "/admin/lead/:leadId/quotation-follow-up",
    component: QuotationFollowup,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },
  {
    path: "/admin/lead/:leadId/quotePayment",
    component: AddPayment,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },
  {
    path: "/admin/lead/:leadId/costingSheet",
    component: ViewCostingSheet,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },
  // {
  //   path: "/admin/costingSheet/Add",
  //   component: AddCostingSheetForm,
  //   roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  // },
];
