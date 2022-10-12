/**
 * Forms Routes
 */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Basicinputs from "./basicinputs/index";
// import updateInput from "./basicinputs/update";
// import quotation from "../Tables/quotation";
//  import Inputgrp from "./Inputgroups"
//  import HorizontalForm from "./HorizontalForm"
//  import VerticalForm from "./VerticalForm"
//  import Formmask from "./Formmask"
//  import Formvalidation from "./Formvalidation"

const Forms = ({ match }) => (
  // const quotationObj = useSelector((state) => state.quotation.brandObj);

  <Switch>
    {/* match.url == quotation/forms  */}
    {
      console.log(match, "matchmatch") ///app/quotation/forms*/}
    }
    {/*  http://localhost:8080/app/quotation/forms/quotation
     */}

    {/* http://localhost:8080/app/quotation/forms/basicinputs */}
    <Redirect exact from={`${match.url}/`} to={`${match.url}/basicinputs`} />
    <Route path={`${match.url}/basicinputs`} component={Basicinputs} />
    {/* <Route path={`${match.url}/updateInput`} component={updateInput} /> */}
    {/* 
    
    */}
    {/*<Route path={`${match.url}/horizontalform`} component={HorizontalForm} />
    <Route path={`${match.url}/verticalform`} component={VerticalForm} />
    <Route path={`${match.url}/formmask`} component={Formmask} />
    <Route path={`${match.url}/formvalidation`} component={Formvalidation} /> */}
  </Switch>
);

export default Forms;

/**

import React, { useEffect, useState } from "react";
import AddBrandForm from "./AddBrandForm";
import { useSelector } from "react-redux";
function AddBrand() {
  

  const [updatedObj, setUpdatedObj] = useState(null);
  useEffect(() => {
    if (brandObj) {
      console.log(brandObj, "brandObj");
      setUpdatedObj(brandObj);
    }
    console.log(brandObj, "brand chec");
  }, [brandObj]);
  // console.log(brandObj, "ppop");

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          {updatedObj?._id ? (
            <h5 className="blue-1 mb-4">Update Brand</h5>
          ) : (
            <h5 className="blue-1 mb-4">Add New Brand</h5>
          )}
          <AddBrandForm />
        </div>
      </section>
    </main>
  );
}

export default AddBrand;

 * 
 */
