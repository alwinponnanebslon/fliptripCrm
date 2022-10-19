
import LeadView from "../MainPage/Lead/LeadView";
import Quotation from "../MainPage/Lead/Quotation/Quotation";
import QuotationFollowup from "../MainPage/Lead/FollowUp/FollowUp";

export default [


 {
    path: "/admin/lead/:leadId",
    component: LeadView,
    roleArr:['ADMIN','TEAMLEAD','SPOKE'],
  },

  {
    path: "/admin/lead/:leadId/quote",
    component: Quotation,
    roleArr:['ADMIN','TEAMLEAD','SPOKE']
  },
  {
    path: "/admin/lead/:leadId/quotation-follow-up",
    component: QuotationFollowup,
    roleArr:['ADMIN','TEAMLEAD','SPOKE']
  },
 
 
];
