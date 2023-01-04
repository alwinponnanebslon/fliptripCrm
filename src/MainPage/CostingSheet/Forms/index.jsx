import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import tourDetails from "./basicinputs/index";
import FormData from "./basicinputs/FormData";

// http://localhost:8080/app/tour/forms
const Forms = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/details`} />
    <Route path={`${match.url}/details`} component={tourDetails} />

    <Redirect exact from={`${match.url}/create`} to={`${match.url}/add`} />
    <Route path={`${match.url}/add`} component={FormData} />

    <Redirect exact from={`${match.url}/update`} to={`${match.url}/edit`} />
    <Route path={`${match.url}/edit`} component={FormData} />

  </Switch>
);

export default Forms;
