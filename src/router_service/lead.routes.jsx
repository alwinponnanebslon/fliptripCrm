import QuotationFollowup from "../MainPage/Lead/FollowUp/FollowUp";
import LeadView from "../MainPage/Lead/LeadView";
import AddPayment from "../MainPage/Lead/Payment/AddPayment";
import ViewPayment from "../MainPage/Lead/Payment/ViewPayment";
import Quotation from "../MainPage/Lead/Quotation/Quotation";
import ViewCostingSheet from "../MainPage/CostingSheet/ViewCostingSheet";
import AddCostingSheetForm from "../MainPage/CostingSheet/Forms/basicinputs/CostingSheetForm";
import ViewLeadDetails from "../MainPage/Lead/LeadDetails";
import viewCostingSheetForm from "../MainPage/CostingSheet/Forms/basicinputs/CostingSheetFormView";
import React, { useEffect, useState, useRef } from "react";

export default [
  {
    path: "/admin/lead/:leadId",
    component: LeadView,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC", "ACCOUNT"],
  },

  {
    path: "/admin/lead/:leadId/quotes",
    component: Quotation,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC", "ACCOUNT"],
  },
  {
    path: "/admin/lead/:leadId/quotation-follow-up",
    component: QuotationFollowup,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC", "ACCOUNT"],
  },
  {
    path: "/admin/lead/:leadId/quotePayment",
    component: AddPayment,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
  },
  {
    path: "/admin/lead/:leadId/costingSheet/",
    component: ViewCostingSheet,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
  },
  {
    path: "/admin/lead/:leadId/costingSheetAdd",
    component: AddCostingSheetForm,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
  },
  {
    path: "/admin/lead/:leadId/costingSheetView",
    component: viewCostingSheetForm,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
  },
  // {
  //   path: "/admin/costingSheet/Add",
  //   component: AddCostingSheetForm,
  //   roleArr: ["ADMIN", "TEAMLEAD", "SPOC"],
  // },
  // roleArr: ['ADMIN', 'TEAMLEAD', 'SPOC','ACCOUNT']
  // },
  //==
  {
    path: "/admin/lead/:leadId/viewquotePayment",
    component: ViewPayment,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC", "ACCOUNT"],
  },
  {
    path: "/admin/lead/:leadId/ViewDetails",
    component: ViewLeadDetails,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOC", "ACCOUNT"],
  },
];

// function remainder() {
//   const counterRef = useRef([]);
//   const [currentRemainder, setCurrentRemainder] = useState([]);

//   const counterRemainderRef = useRef([]);

//   useEffect(() => {
//     counterRef.current = RemainderArray;
//   }, [RemainderArray]);

//   function myCallback() {
//     let temp = [];
//     let date = new Date();
//     // console.log(date, "date2134");
//     let time = `${date.getHours()}:${date.getMinutes()}`;

//     console.log(time, "curenttime123");
//     let DbTemp = counterRef.current;

//     for (let el of DbTemp) {
//       // console.log(el, "el12");
//       // console.log("3223233232342");
//       // console.log(time == el.followTime, "3time34");
//       // if (el.followTime.includes("0")) {
//       //   time = time + "";
//       //   time = 0 + time;
//       //   if (el.followTime == time) {
//       //     array2.push(el);
//       //   }
//       // } else
//       console.log(el.followTime, "el.folow23");
//       if (el.followTime == time) {
//         console.log(el.followTime, time, "time");
//         array2.push(...temp);
//         // temp.push(el);
//         setCurrentRemainder([...currentRemainder, el]);
//       }
//       // console.log(temp, "temp123");
//     }
//     // if (array2.length == 0) {
//     //   array2.push(...temp);
//     // }
//     // console.log(array2, "12array123");
//   }

//   useEffect(() => {
//     let timer = setInterval(myCallback, 10000);
//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);
// }
// remainder();
// // export default AdminDashboard;
