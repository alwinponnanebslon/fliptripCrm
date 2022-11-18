import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CustomButton from "../../../../_components/Utility/Button";
import { useSelector, useDispatch } from "react-redux";
// import { toastSuccess, toastError } from "../../../../utils/toastUtil";
import { toastSuccess, toastError } from "../../../../utils/toastUtils";

import {
  TOURAdd,
  tourGet,
  tourUpdate,
  setObj,
} from "../../../../redux/features/tour/tourSlice";

const FormData = () => {
  const dispatch = useDispatch();
  const [tourName, setTourName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTourId, setSelectedBrandId] = useState("");
  const [isUpdateTour, setIsUpdateTour] = useState(false);
  const handleInit = () => {
    dispatch(tourGet());
  };

  useEffect(() => {
    handleInit();
  }, []);

  const tourObj = useSelector((state) => state.tour.tourObj);
  // console.log(tourObj, "tourobj");

  useEffect(() => {
    if (tourObj && tourObj.tourName) {
      setSelectedBrandId(tourObj._id);
      setTourName(tourObj.tourName);
      setDescription(tourObj.description);
      setIsUpdateTour(true);
    }
    // return () => {
    //   dispatch(setObj(null));
    // };
  }, [tourObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdateTour) {
      if (tourName == "") {
        toastError("Tour Name is mandatory");
        // throw "tour name is mandatory";
      }
    }
    let obj = {
      id: selectedTourId,
      tourName,
      description,
    };
    // // console.log(obj, "send Obj");
    if (isUpdateTour) {
      // console.log(isUpdateTour, "isUpdateTou23r");
      // // console.log(obj, "drt");
      dispatch(tourUpdate(obj));
    } else {
      dispatch(TOURAdd(obj));
    }
  };
  {
    /*
                   http://localhost:8080/app/tour/forms/create
                    */
  }
  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Form Basic Input - CRM created by Fliptrip Holidays</title>
        </Helmet>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Tour Details</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Tour Name <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          value={tourName}
                          onChange={(e) => setTourName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Description
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <CustomButton
                        isBtn
                        // iconName="fa-solid fa-check"
                        // ClickEvent={handleSubmit}
                        btnName="Save"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormData;
//
