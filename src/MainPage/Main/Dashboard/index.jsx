/**
 * Crm Routes
 */
/* eslint-disable */
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Admindashboard from "./admindashboard";
import Employeedashboard from "./employeedashboard";
import { useSelector } from "react-redux";
import { admin, rolesObj } from "../../../utils/roles";
const DashboardRoute = ({ match }) => {
  const role = useSelector((state) => state.auth.role);

  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
      {role == admin && <Route path={`${match.url}/dashboard`} component={Admindashboard} />}
      {(role == rolesObj.TEAMLEAD || role == rolesObj.SPOKE) && <Route path={`${match.url}/employee-dashboard`} component={Employeedashboard} />}
    </Switch>
  );
};

export default DashboardRoute;
