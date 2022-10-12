
import LeadView from "../MainPage/Employees/LeadView";
import Quotation from "../MainPage/Lead/Quotation/Quotation";
export default [


 {
    path: "/admin/lead/:leadId",
    component: LeadView,
    roleArr:['ADMIN','TEAMLEAD'],
  },

  {
    path: "/admin/lead/:leadId/quote",
    component: Quotation,
    roleArr:['ADMIN','TEAMLEAD']
  },
 
 
];
