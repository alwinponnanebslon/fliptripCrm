import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ViewCostingSheet from "./ViewCostingSheet";

const destinationRoute = ({ match }) => (
  <Switch>
    {/* match.url ==app/destinations */}
    <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
    <Route path={`${match.url}/view`} component={ViewCostingSheet} />
  </Switch>
);

export default destinationRoute;