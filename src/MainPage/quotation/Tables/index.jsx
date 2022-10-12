/**
 * Forms Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Basicinputs from "../Forms/basicinputs/index";
// import updateInput from "./update";
import quotation from "./quotation";
import update from "./update";
//  import Inputgrp from "./Inputgroups"
//  import HorizontalForm from "./HorizontalForm"

const Forms = ({ match }) => (
  <Switch>
    {/* match.url == quotation/table
     */}
    {
      console.log(match, "matchmatch") ///app/quotation/forms*/}
    }
    {/*  http://localhost:8080/app/quotation/table */}
    <Redirect exact from={`${match.url}/`} to={`${match.url}/quotation`} />
    <Route path={`${match.url}/quotation`} component={quotation} />
    {/* app/quotation/table/update */}
    <Redirect exact from={`${match.url}/update`} to={`${match.url}/edit`} />
    <Route path={`${match.url}/edit`} component={update} />

    {/* http://localhost:8080/app/quotation/forms/basicinputs */}
    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/basicinputs`} />
    <Route path={`${match.url}/basicinputs`} component={Basicinputs} /> */}
    {/* <Route path={`${match.url}/updateInput`} component={updateInput} /> */}
    {/*  */}
  </Switch>
);

export default Forms;
