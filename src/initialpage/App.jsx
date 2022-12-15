import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
//Error Page
import Error404 from "../MainPage/Pages/ErrorPage/error404";
import Error500 from "../MainPage/Pages/ErrorPage/error500";
import uicomponents from "../MainPage/UIinterface/components";
import { admin } from "../utils/roles";
import ApplyJobs from "./ApplyJob";
import ForgotPassword from "./forgotpassword";
import LockScreen from "./lockscreen";
// We will create these two pages in a moment
//Authendication
import LoginPage from "./loginpage";
import OTP from "./otp";
import RegistrationPage from "./RegistrationPage";
import chatlayout from "./Sidebar/chatlayout";
//Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import LeadLayout from "./Sidebar/LeadLayout";
import Emaillayout from "./Sidebar/emaillayout";
import Settinglayout from "./Sidebar/Settinglayout";
import Tasklayout from "./Sidebar/tasklayout";
import routerService from "../router_service";
import leadRoutes from "../router_service/lead.routes";

// import AdminDashboard from "../MainPage/Main/Dashboard/admindashboard";
import AdminDashboard from "../MainPage/Main/Dashboard/admindashboard";
// import "http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
import Quotation from "../_components/quotation/Quotation";
import Index from "../MainPage/Pdf/Index";
// import QuotationCreateAndConvert from "../MainPage/Pdf/Quotation";
// {
//     if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword") || location.pathname.includes("otp") || location.pathname.includes("lockscreen")) {
//       // $('body').addClass('account-page');
//     } else if (location.pathname.includes("error-404") || location.pathname.includes("error-500")) {
//       $("body").addClass("error-page");
//     }
//   }

export function PrivateRoute({ children }) {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  if (isAuthorized) return <>{children}</>;
  else {
    return <Redirect to="/" />;
  }
}

export function PublicRoute({ children }) {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  if (!isAuthorized) return <>{children}</>;
  else {
    return <Redirect to="/admin/dashboard" />;
  }
}

const App = () => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const role = useSelector((state) => state.auth.role);
  return (
    <Switch>
      <Route path="/admin/lead/:leadId">
        <PrivateRoute>
          <LeadLayout>
            {leadRoutes &&
              leadRoutes?.map((route, i) => {
                if (
                  route &&
                  route?.roleArr.some(
                    (el) => `${el}`.toLowerCase() == `${role}`.toLowerCase()
                  )
                ) {
                  return (
                    <Route
                      key={i}
                      path={route.path}
                      component={route.component}
                      exact
                    />
                  );
                }
              })}
          </LeadLayout>
        </PrivateRoute>
      </Route>

      <Route path="/admin">
        <PrivateRoute>
          <DefaultLayout>
            {routerService &&
              routerService?.map((route, i) => {
                if (
                  route &&
                  route?.roleArr.some(
                    (el) => `${el}`.toLowerCase() == `${role}`.toLowerCase()
                  )
                ) {
                  return (
                    <Route
                      key={i}
                      path={route.path}
                      component={route.component}
                    />
                  );
                } else {
                  <Redirect exact from="/" to="/dashboard" />;
                }
              })}
          </DefaultLayout>
        </PrivateRoute>
      </Route>

      <Route path="/pdf">
        <PrivateRoute>
          {/* <QuotationCreateAndConvert /> */}
          <Index />
        </PrivateRoute>
      </Route>
      <Route path="/">
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </Route>
      <Route path="/forgotpassword">
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      </Route>
      <Route path="/register">
        <PublicRoute>
          <RegistrationPage />
        </PublicRoute>
      </Route>
      <Route path="/otp">
        <PublicRoute>
          <OTP />
        </PublicRoute>
      </Route>
      <Route path="/lockscreen">
        <PublicRoute>
          <LockScreen />
        </PublicRoute>
      </Route>
      <Route path="/applyjob">
        <PublicRoute>
          <ApplyJobs />
        </PublicRoute>
      </Route>

      {/* <Route path="/settings">
        <PublicRoute>
          <Settinglayout />
        </PublicRoute>
      </Route> */}
      <Route path="/tasks">
        <PublicRoute>
          <Tasklayout />
        </PublicRoute>
      </Route>
      <Route path="/email">
        <PublicRoute>
          <Emaillayout />
        </PublicRoute>
      </Route>

      <Route path="/error-404">
        <PublicRoute>
          <Error404 />
        </PublicRoute>
      </Route>
      <Route path="/error-500">
        <PublicRoute>
          <Error500 />
        </PublicRoute>
      </Route>
    </Switch>
  );
};
export default App;
