//main
import Dashboard from "../MainPage/Main/Dashboard";
import Apps from "../MainPage/Main/Apps";
//UI Interface
import UIinterface from "../MainPage/UIinterface";
//Pages
import ProfilePage from "../MainPage/Pages/Profile";
import Subscription from "../MainPage/Pages/Subscription";
import Pages from "../MainPage/Pages/Pages";
//Administrator
import Administrator from "../MainPage/Administration";
//Performance
import Performance from "../MainPage/Performance";
import Goals from "../MainPage/Performance/Goals";
import Performances from "../MainPage/Performance/Performance";
import Training from "../MainPage/Performance/Training";
//HR
import HR from "../MainPage/HR";
import Reports from "../MainPage/HR/Reports";
import Sales from "../MainPage/HR/Sales";
import Accounts from "../MainPage/HR/Accounts";
import Payroll from "../MainPage/HR/Payroll";
//Employees
import Employees from "../MainPage/Employees";
import Projects from "../MainPage/Employees/Projects";
import Employee from "../MainPage/Employees/Employees";

import AllEmployees from "../MainPage/Employees/Employees/allemployees";
import Clients from "../MainPage/Clients/Clients";
import ViewDestination from "../MainPage/Destination/ViewDestination";
import Leads from "../MainPage/Lead/Leads";
import CreateQuote from "../MainPage/Employees/CreateQuote";
import ViewCostingSheet from "../MainPage/CostingSheet/index";
import AddCostingSheetForm from "../MainPage/CostingSheet/Forms/basicinputs/CostingSheetForm";

// import
import Quotation from "../MainPage/quotation";
import Destination from "../MainPage/Destination";
import AdminDashboard from "../MainPage/Main/Dashboard/admindashboard";
import EmployeeProfile from "../MainPage/Pages/Profile/employeeprofile";

export default [
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE", "ACCOUNT"],
  },
  {
    path: "/admin/employee",
    component: AllEmployees,
    roleArr: ["ADMIN", "TEAMLEAD"],
  },
  {
    path: "/admin/employee-profile/:id",
    component: EmployeeProfile,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },
  {
    path: "/admin/clients",
    component: Clients,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },

  {
    path: "/admin/destinations",
    component: ViewDestination,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },

  // {
  //   path: "/admin/costingSheet",
  //   component: ViewCostingSheet,
  //   roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  // },
  // {
  //   path: "/admin/costingSheet/Add",
  //   component: AddCostingSheetForm,
  //   roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  // },
  {
    path: "/admin/leads",
    component: Leads,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE", "ACCOUNT"],
  },
  {
    path: "/quotation",
    component: Quotation,
    roleArr: ["ADMIN", "TEAMLEAD", "SPOKE"],
  },

  // {
  //   path: "employees",
  //   component: Employees,
  // },
  // {
  //   path: "projects",
  //   component: Projects,
  // },
  // {
  //   path: "ui-interface",
  //   component: UIinterface,
  // },
  // {
  //   path: "profile",
  //   component: ProfilePage,
  // },
  // {
  //   path: "subscription",
  //   component: Subscription,
  // },
  // {
  //   path: "pages",
  //   component: Pages,
  // },
  // {
  //   path: "administrator",
  //   component: Administrator,
  // },
  // {
  //   path: "performance",
  //   component: Performance,
  // },
  // {
  //   path: "goals",
  //   component: Goals,
  // },
  // {
  //   path: "performances",
  //   component: Performances,
  // },
  // {
  //   path: "training",
  //   component: Training,
  // },
  // {
  //   path: "hr",
  //   component: HR,
  // },
  // {
  //   path: "reports",
  //   component: Reports,
  // },
  // {
  //   path: "sales",
  //   component: Sales,
  // },
  // {
  //   path: "accounts",
  //   component: Accounts,
  // },
  // {
  //   path: "payroll",
  //   component: Payroll,
  // },
  // {
  //   path: "quotation",
  //   component: Quotation,
  // },
  // {
  //   path:"destinations",
  //   component:Destination
  // }
];
