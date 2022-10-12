import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Forms from "./Forms";
import Tables from "./Tables";

const Quotationroute = ({ match }) => (
  // console.log(match)
  <Switch>
    {console.log(match, "matchmatch2,index")}
    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/basic`} /> */}
    {/* http://localhost:8080/app/quotation/forms
    
    
    /basicinputs */}
    <Route path={`${match.url}/forms`} component={Forms} />
    {/*  */}
    {/* http://localhost:8080/app/quotation/table
    
    /quotation */}
    <Route path={`${match.url}/table`} component={Tables} />
    {/* <Route path={`${match.url}/tables`} component={Tables} /> */}
  </Switch>
);

export default Quotationroute;
