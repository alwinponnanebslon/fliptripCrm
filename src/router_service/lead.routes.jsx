
import QuotationFollowup from "../MainPage/Lead/FollowUp/FollowUp";
import LeadView from "../MainPage/Lead/LeadView";
import AddPayment from "../MainPage/Lead/Payment/AddPayment";
import ViewPayment from "../MainPage/Lead/Payment/ViewPayment";
import Quotation from "../MainPage/Lead/Quotation/Quotation";

export default [


  {
    path: "/admin/lead/:leadId",
    component: LeadView,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE','ACCOUNT'],
  },

  {
    path: "/admin/lead/:leadId/quotes",
    component: Quotation,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE','ACCOUNT']
  },
  {
    path: "/admin/lead/:leadId/quotation-follow-up",
    component: QuotationFollowup,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE','ACCOUNT']
  },
  {
    path: "/admin/lead/:leadId/quotePayment",
    component: AddPayment,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE','ACCOUNT']
  },

  {
    path: "/admin/lead/:leadId/viewquotePayment",
    component: ViewPayment,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE','ACCOUNT']
  },

];
