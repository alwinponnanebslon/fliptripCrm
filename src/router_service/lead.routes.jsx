
import QuotationFollowup from "../MainPage/Lead/FollowUp/FollowUp";
import LeadView from "../MainPage/Lead/LeadView";
import AddPayment from "../MainPage/Lead/Payment/AddPayment";
import Quotation from "../MainPage/Lead/Quotation/Quotation";

export default [


  {
    path: "/admin/lead/:leadId",
    component: LeadView,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE'],
  },

  {
    path: "/admin/lead/:leadId/quotes",
    component: Quotation,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE']
  },
  {
    path: "/admin/lead/:leadId/quotation-follow-up",
    component: QuotationFollowup,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE']
  },
  {
    path: "/admin/lead/:leadId/quotePayment",
    component: AddPayment,
    roleArr: ['ADMIN', 'TEAMLEAD', 'SPOKE']
  },


];
