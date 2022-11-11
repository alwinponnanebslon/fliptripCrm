import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import tourDetails from "./basicinputs/index";
import FormData from "./basicinputs/FormData";
// import Quotation from "./basicinputs/Tour";
//  import Inputgrp from "./Inputgroups"

// http://localhost:8080/app/tour/forms
const Forms = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/details`} />
    {/* <Route path={`${match.url}/details`} component={Basicinputs} /> */}
    <Route path={`${match.url}/details`} component={tourDetails} />

    <Redirect exact from={`${match.url}/create`} to={`${match.url}/add`} />
    <Route path={`${match.url}/add`} component={FormData} />

    <Redirect exact from={`${match.url}/update`} to={`${match.url}/edit`} />
    <Route path={`${match.url}/edit`} component={FormData} />

    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
    <Route path={`${match.url}`} component={Basicinputs} /> */}

    {/* <Route path={`${match.url}/inputgroups`} component={Inputgrp} />
    <Route path={`${match.url}/horizontalform`} component={HorizontalForm} />
    <Route path={`${match.url}/verticalform`} component={VerticalForm} />
    <Route path={`${match.url}/formmask`} component={Formmask} />
    <Route path={`${match.url}/formvalidation`} component={Formvalidation} /> */}
  </Switch>
);

export default Forms;
