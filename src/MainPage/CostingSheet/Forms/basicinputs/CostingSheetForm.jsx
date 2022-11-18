import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import CustomButton from "../../../../_components/Utility/Button";
import { toastError, toastSuccess } from "../../../../utils/toastUtils";
import "../../../antdstyle.css";

import {
  addCosting,
  update,
  costingSheetGet,
  setCostingSheet,
} from "../../../../redux/features/CostingSheet/CostingSheetSlice.js";

import { getApprovedQuotation } from "../../../../Services/quotation.service.js";

const ViewCostingSheetForm = () => {
  const location = useLocation();
  const tempLocation = location;
  // // console.log(location.pathname, "location.pathname32");
  const dispatch = useDispatch();
  const params = useParams();
  const leadId = params.leadId;

  const costingSheetResultObj = useSelector(
    (state) => state.costingSheet.costingSheetObj
  );
  const [leadName, setLeadName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [profit, setProfit] = useState(0);
  const [landCost, setLandCost] = useState(0);
  const [flightCost, setflightCost] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [leadsId, setLeadsId] = useState("");

  const [inputList, setinputList] = useState([
    { hotelName: "", hotelAddress: "", cost: "", isBooked: false },
  ]);
  const [flightList, setFlightList] = useState([{ cost: "", flightName: "" }]);
  const [totalCost, setTotalCost] = useState(0);
  const [quotationObj, setQuotationObj] = useState({});
  const [quotationId, setQuotationId] = useState("");
  const [isButtonHotel, setIsButtonHotel] = useState(false);
  const [isButtonFlight, setIsButtonFlight] = useState(false);
  const [isUpdatePrevDoc, setIsUpdatePrevDoc] = useState(false);
  const [prevDocId, setPrevDocId] = useState("");
  const [isLocation, setIsLocation] = useState(false);

  const getQuotation = async () => {
    let arr = await getApprovedQuotation(leadId);
    setQuotationObj(arr.data.data);
  };

  useEffect(() => {
    // // console.log(location.pathname, "location.pathname32");
    setIsLocation(true);
  }, [tempLocation]);

  const handleInit = (leadId) => {
    // // console.log(leadId, "leadId23");
    dispatch(costingSheetGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    getQuotation(leadId);
    handleInit();
  }, []);

  useEffect(() => {
    let tempCost = 0;
    let tempCostOf = 0;
    for (let ele of inputList) {
      tempCost = tempCost + Number.parseInt(ele.cost);
    }
    if (tempCost > +landCost) {
      setIsButtonHotel(true);
      toastError("Hotel price cannot be greater than total hotels cost");
      return;
    } else {
      setIsButtonHotel(false);
    }
    for (let ele of flightList) {
      tempCostOf = tempCostOf + Number.parseInt(ele.cost);
    }
    if (tempCostOf > +flightCost) {
      setIsButtonFlight(true);
      toastError("Flight price cannot be greater than total flight cost");
      return;
    } else {
      setIsButtonFlight(false);
    }
  }, [inputList, flightList, landCost, flightCost]);

  useEffect(() => {
    // // console.log(quotationObj, "1quotationObj23");
    if (quotationObj && quotationObj._id && isUpdatePrevDoc == false) {
      setTotalCost(quotationObj?.paymentObj?.total);
      setLandCost(quotationObj?.paymentObj?.landPrice);
      setflightCost(quotationObj?.paymentObj?.flightPrice);
      setLocationName(quotationObj?.destinationName);
      setLeadName(quotationObj?.leadObj?.clientObj?.name);
      setLeadsId(leadId);
      setinputList([...quotationObj?.hotelDetail]);
      setQuotationId(quotationObj._id);
    }
  }, [quotationObj]);

  useEffect(() => {
    // // console.log(costingSheetResultObj, "costingSheetResultObj23");
    if (costingSheetResultObj && costingSheetResultObj._id) {
      setLeadName(costingSheetResultObj.leadName);
      setLocationName(costingSheetResultObj.locationName);
      setProfit(+costingSheetResultObj.profit);
      setLeadsId(costingSheetResultObj.leadsId);
      setLandCost(costingSheetResultObj.landCost);
      setLeadsId(leadId);
      setflightCost(costingSheetResultObj.flightCost);
      setTotalExpense(costingSheetResultObj.totalExpense);
      setinputList([...costingSheetResultObj.hotelDetails]);
      setFlightList(costingSheetResultObj.flightDetails);
      setTotalCost(costingSheetResultObj.totalCost);
      setPrevDocId(costingSheetResultObj._id);
      setIsUpdatePrevDoc(true);
    }
  }, [costingSheetResultObj]);

  // useEffect(() => {
  //   // // console.log(costingSheetResultObj, "costingSheetResultObj23");
  //   if (isLocation == false) {
  //     // setTotalCost(quotationObj?.paymentObj?.total);
  //     // setLandCost(quotationObj?.paymentObj?.landPrice);
  //     // setflightCost(quotationObj?.paymentObj?.flightPrice);
  //     // setLocationName(quotationObj?.destinationName);
  //     // setLeadName(quotationObj?.leadObj?.clientObj?.name);
  //     // setLeadsId(leadId);
  //     // setinputList([...quotationObj?.hotelDetail]);
  //     // setQuotationId(quotationObj._id);
  //     // console.log("po0");
  //   }
  // }, []);

  // useEffect(() => {
  //   // // console.log(tempLocation, "21location");
  //   // if (tempNum1 >= 2) {
  //   // setLeadName("");
  //   // setLocationName("");
  //   // setProfit(0);
  //   // setLeadsId("");
  //   // setLandCost("");
  //   // setflightCost("");
  //   // setTotalExpense("");
  //   // setinputList([{ hotelName: "", location: "", cost: "", isBooked: false }]);
  //   // setFlightList([{ cost: "", flightName: "" }]);
  //   // setTotalCost(0);
  //   if (quotationObj && quotationObj._id) {
  //     setTotalCost(quotationObj?.paymentObj?.total);
  //     setLandCost(quotationObj?.paymentObj?.landPrice);
  //     setflightCost(quotationObj?.paymentObj?.flightPrice);
  //     setLocationName(quotationObj?.destinationName);
  //     setLeadName(quotationObj?.leadObj?.clientObj?.name);
  //     setLeadsId(leadId);
  //     setinputList([...quotationObj?.hotelDetail]);
  //     setQuotationId(quotationObj._id);
  //     setCostingSheet(null);
  //   setIsUpdatePrevDoc(false);
  //   }
  //   // window.location.reload();
  //   // window.sessionStorage.setItem("obj", JSON.stringify(""));
  //   // }
  // }, [location.pathname]);

  const handleinputchange = (e, index) => {
    //hotel
    let { name, value, checked } = e.target;
    //hotel
    ("use strict");
    let tempList = [...inputList];
    let currentObj = Object.freeze(tempList[index]);
    currentObj = {
      hotelName: tempList[index].hotelName,
      hotelAddress: tempList[index].hotelAddress,
      cost: tempList[index].cost,
      isBooked: tempList[index].isBooked,
    };
    if (name == "cost") {
      if (Number.isInteger(parseInt(value))) {
        if (value > +landCost) {
          value = 0;
          toastError("Hotel price cannot be greater than land price");
          return;
        }
      }
    }
    if (name == "isBooked") {
      currentObj[name] = checked;
    } else {
      currentObj[name] = value;
    }
    tempList[index] = currentObj;
    setinputList([...tempList]);
  };

  useEffect(() => {
    let temp = 0;
    for (let ele of inputList) {
      if (ele.cost == undefined || ele.cost == NaN || ele.cost == "") {
      } else {
        temp = temp + +ele.cost;
      }
    }
    for (let ele of flightList) {
      if (ele.cost == undefined || ele.cost == NaN || ele.cost == "") {
      } else {
        temp = temp + +ele.cost;
      }
    }
    setTotalExpense(temp);
    setProfit(totalCost - (+landCost + +flightCost));
  }, [flightList, totalCost, flightCost, landCost, totalExpense, profit]);

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([
      ...inputList,
      { hotelName: "", hotelAddress: "", cost: "", isBooked: false },
    ]);
  };

  const handleinputchangeFlight = (e, index) => {
    let { name, value } = e.target;
    ("use strict");
    let tempList = [...flightList];
    let currentObj = Object.freeze(tempList[index]);
    currentObj = {
      flightName: tempList[index].flightName,
      cost: tempList[index].cost,
    };
    if (name == "cost") {
      if (Number.isInteger(parseInt(value))) {
        if (value > +flightCost) {
          value = 0;
          toastError("flight price can't be greater than total flight cost");
          return;
        }
      }
    }
    currentObj[name] = value;
    tempList[index] = currentObj;
    setFlightList([...tempList]);
    // }
  };

  const handleremoveFlightDetails = (index) => {
    const list = [...flightList];
    list.splice(index, 1);
    setFlightList(list);
  };

  const handleaddclickFlightDetails = () => {
    setFlightList([...flightList, { cost: "", flightName: "" }]);
  };

  const quotationObtions = () => {
    const temp = quotationObj.map((el) => {
      return { ...el, value: el?.leadId, label: el?.leadId };
    });
    setAb([...temp]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadName == "") {
      toastError("Lead Name is mandatory");
      return;
    } else if (locationName == "") {
      toastError("Location Name is mandatory");
      return;
    } else if (inputList && inputList[0].hotelName == "") {
      toastError(" Hotel details are mandatory");
      return;
    } else if (totalCost == "") {
      toastError("Total cost is mandatory");
      return;
    }
    let obj = {
      leadName,
      leadsId,
      locationName,
      hotelDetails: inputList,
      flightDetails: flightList,
      totalCost,
      profit,
      landCost,
      flightCost,
      id: prevDocId,
      // isBooked,
    };
    // console.log(obj, "obj1");
    if (isUpdatePrevDoc) {
      dispatch(update(obj, obj.id));
    } else {
      dispatch(addCosting(obj));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <form action="" className="form">
          <h3 className="blue-1 mb-4">
            {isUpdatePrevDoc ? "Update" : "Add"} Costing Sheet
          </h3>
          <div className="row">
            <div className="col-12 col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Lead Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
              />
            </div>
            <div className="col-12  col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Lead Id<span className="text-danger">*</span>
              </label>
              <input
                readOnly
                type="text"
                className="form-control"
                value={leadsId}
                onChange={(e) => setLeadsId(e.target.value)}
              />
            </div>
            <div className="col-12  col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Location Name<span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="content">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="mt-3 mb-4 ">Hotel Details</h3>
                  {inputList.map((x, i) => {
                    return (
                      <div className="row mb-3">
                        <div class="form-group col-md-4">
                          <label>Hotel Name</label>
                          <input
                            type="text"
                            name="hotelName"
                            value={x.hotelName}
                            class="form-control"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Hotel Address</label>
                          <input
                            type="text"
                            name="hotelAddress"
                            value={x.hotelAddress}
                            class="form-control"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Cost</label>
                          <input
                            type="number"
                            name="cost"
                            value={x.cost}
                            class="form-control"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        {/*  */}
                        <div className="col-12 mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isBooked"
                            value={x.isBooked}
                            checked={x.isBooked == true ? true : false}
                            id="publish-checkbox"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                          <label className="form-check-label fs-14">
                            isBooked
                          </label>
                        </div>
                        {/*  */}
                        <div class="form-group col-md-2 mt-4">
                          {inputList.length !== 1 && (
                            <button
                              type="button"
                              className="btn btn-danger mx-1"
                              onClick={() => handleremove(i)}
                            >
                              Remove
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button
                              disabled={isButtonHotel}
                              className="btn btn-success"
                              onClick={handleaddclick}
                            >
                              Add More
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="content">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="mt-3 mb-4">Flight Details</h3>
                  {flightList.map((x, i) => {
                    // // console.log(x, i, "x,i123");
                    return (
                      <div className="row mb-3">
                        <div class="form-group col-md-4">
                          <label>Flight Name</label>
                          <input
                            type="text"
                            name="flightName"
                            class="form-control"
                            value={x.flightName}
                            placeholder="Enter Flight Name"
                            onChange={(e) => handleinputchangeFlight(e, i)}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Cost </label>
                          <input
                            type="number"
                            name="cost"
                            value={x.cost}
                            placeholder="Enter Cost"
                            class="form-control"
                            onChange={(e) => handleinputchangeFlight(e, i)}
                          />
                        </div>

                        <div class="form-group col-md-2 mt-4">
                          {flightList.length !== 1 && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleremoveFlightDetails(i)}
                            >
                              Remove
                            </button>
                          )}
                          {flightList.length - 1 === i && (
                            <button
                              disabled={isButtonFlight}
                              type="button"
                              className="btn btn-success"
                              onClick={handleaddclickFlightDetails}
                            >
                              Add More
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="content">
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">
                  Land Cost<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={landCost}
                  onChange={(e) => setLandCost(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">
                  Flight Cost<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={flightCost}
                  onChange={(e) => setflightCost(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">
                  Total Cost<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={totalCost}
                  onChange={(e) => setTotalCost(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="blue-1 fs-12">
                Profit<span className="text-danger">*</span>
              </label>
              <input
                readOnly
                // type="number"
                className="form-control"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
              />
            </div>

            <div className="col-12">
              <CustomButton
                isBtn
                iconName=""
                btnName="Save"
                ClickEvent={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewCostingSheetForm;