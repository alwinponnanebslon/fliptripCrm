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
import AddReminder from "../../../Reminder/Reminder/AddReminder";

import { getApprovedQuotation } from "../../../../Services/quotation.service.js";
import { updateLeadStatus } from "../../../../Services/lead.service";
const ViewCostingSheetForm = () => {
  const location = useLocation();
  // console.log(location, "location3");
  const tempLocation = location;
  const dispatch = useDispatch();
  const params = useParams();
  const leadId = params.leadId;
  // console.log(leadId, "leadId1");
  const costingSheetResultObj = useSelector(
    (state) => state.costingSheet.costingSheets
  );
  const [leadName, setLeadName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [profit, setProfit] = useState(0);
  const [landCost, setLandCost] = useState(0);
  const [flightCost, setflightCost] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [leadsId, setLeadsId] = useState("");

  const [inputList, setinputList] = useState([
    {
      hotelName: "",
      bookingSource: "",
      // cost: 0,
      cost: "",
      hold: false,
      reConfirmed: false,
      pending: false,
    },
  ]);
  const [flightList, setFlightList] = useState([{ cost: 0, flightName: "" }]);
  const [totalCost, setTotalCost] = useState(0);
  const [quotationObj, setQuotationObj] = useState({});
  const [quotationId, setQuotationId] = useState("");
  const [isButtonHotel, setIsButtonHotel] = useState(false);
  const [isButtonFlight, setIsButtonFlight] = useState(false);
  const [isUpdatePrevDoc, setIsUpdatePrevDoc] = useState(false);
  const [prevDocId, setPrevDocId] = useState("");

  const [additionalLandName, setAdditionalLandName] = useState("");
  const [additionalLandPrices, setAdditionalLandPrices] = useState(0);
  const [isLocation, setIsLocation] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [isChangeCheckBox, setIsChangeCheckBox] = useState(false);

  const getQuotation = async () => {
    let arr = await getApprovedQuotation(leadId);
    setQuotationObj(arr.data.data);
  };

  useEffect(() => {
    // console.log(quotationObj, "setQuotationObj");
    setIsLocation(true);
  }, [quotationObj]);

  const handleInit = () => {
    dispatch(costingSheetGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    getQuotation(leadId);
    handleInit();
  }, []);

  useEffect(() => {
    // console.log(quotationObj, "1quotationObj23");
    if (quotationObj && quotationObj._id && isUpdatePrevDoc == false) {
      // setTotalCost(+quotationObj?.paymentObj?.total + +additionalLandPrices);
      // setTotalCost(quotationObj?.paymentObj?.total);
      setTotalCost(parseInt(quotationObj?.paymentObj?.total));
      setLandCost(quotationObj?.paymentObj?.landPrice);
      setflightCost(quotationObj?.paymentObj?.flightPrice);
      setLocationName(quotationObj?.destinationName);
      setLeadName(quotationObj?.leadObj?.clientObj?.name);
      setFlightList(quotationObj?.flightList);
      setLeadsId(leadId);
      // setPrevDocId(quotationObj?._id);
      setinputList([...quotationObj?.hotelDetail]);
      setQuotationId(quotationObj._id);
    }
    // }, [quotationObj, additionalLandPrices]);
  }, [quotationObj]);

  useEffect(() => {
    // console.log(costingSheetResultObj, "costingSheetResultObj23");
    if (costingSheetResultObj && costingSheetResultObj._id) {
      setLeadName(costingSheetResultObj?.leadName);
      setLocationName(costingSheetResultObj?.locationName);
      setProfit(+costingSheetResultObj?.profit);
      setLeadsId(costingSheetResultObj?.leadId);
      setLandCost(costingSheetResultObj?.landCost);
      setLeadsId(leadId);
      setflightCost(costingSheetResultObj?.flightCost);
      setTotalExpense(costingSheetResultObj?.totalExpense);
      setinputList([...costingSheetResultObj?.hotelDetails]);
      setFlightList(costingSheetResultObj?.flightDetails);
      setTotalCost(+costingSheetResultObj?.totalCost);
      setPrevDocId(costingSheetResultObj?._id);
      setIsUpdatePrevDoc(true);
      setAdditionalLandName(costingSheetResultObj?.additionalLandName);
      setAdditionalLandPrices(costingSheetResultObj?.additionalLandPrices);
    }
  }, [costingSheetResultObj]);

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
    // console.log(name, "name, ", value, " value,", checked, " checked23");
    let tempList = [...inputList];
    let totalAmount = 0;
    // let tempList = inputList;
    // let tempValues = Object.values(tempList);
    let currentObj = Object.freeze(tempList[index]);
    currentObj = {
      hotelName: tempList[index].hotelName,
      bookingSource: tempList[index].bookingSource,
      cost: tempList[index].cost,
      hold: tempList[index].hold,
      reConfirmed: tempList[index].reConfirmed,
      pending: tempList[index].pending,
    };
    if (name == "cost") {
      if (isNaN(value)) {
        value = 0;
        toastError("Cost should be number");
        return;
      } else if (Number.isInteger(parseInt(value))) {
        for (let el of tempList) {
          // console.log(el, "cost23");
          if (el.cost) {
            totalAmount = totalAmount + parseInt(el.cost);
          }
        }
        if (
          parseInt(totalAmount) + parseInt(additionalLandPrices) >
          parseInt(landCost)
        ) {
          toastError("Hotel price cannot be greater than total land cost*");
          return;
        }
        // if (
        //   inputList.reduce((acc, el) => acc + parseInt(el.cost), 0) +
        //     additionalLandPrices >
        //   parseInt(landCost)
        // ) {
        //   toastError("Hotel price cannot be  greater than total land cost*");
        //   return;
        // }

        if (value > +landCost) {
          value = 0;
          toastError("land price cannot be greater than total land cost");
          return;
        }
      }
    }

    //   if (value > parseInt(landCost)) {
    //     value = 0;
    //     toastError("Hotel price cannot be greater than land price");
    //     return;
    //   }
    // }
    if (name == "hold") {
      setShowReminder(true);
      // console.log(isChangeCheckBox, "isChangeCheckBox34");
      // if (isChangeCheckBox == true) {
      //   console.log("inside 1");
      currentObj[name] = checked;
      // }
      currentObj["reConfirmed"] = false;
      currentObj["pending"] = false;
      // setIsStatusOfLead(true);
    } else if (name == "reConfirmed") {
      currentObj[name] = checked;
      currentObj["hold"] = false;
      currentObj["pending"] = false;
    } else if (name == "pending") {
      setShowReminder(true);
      // if (isChangeCheckBox) {
      //   console.log("inside 12");
      currentObj[name] = checked;
      // }
      currentObj["hold"] = false;
      currentObj["reConfirmed"] = false;
      // setIsStatusOfLead(true);
      // history.push(`/admin/reminder`);
    } else {
      currentObj[name] = value;
    }

    tempList[index] = currentObj;
    // console.log(tempList, "tempList23");
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
  }, [flightList, totalCost, landCost, totalExpense, profit]);

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([
      ...inputList,
      {
        hotelName: "",
        bookingSource: "",
        cost: "",
        hold: false,
        reConfirmed: false,
        pending: false,
      },
    ]);
  };

  const handleinputchangeHotel = (e, index) => {
    const list = [...hotelList];

    const { name, value } = e.target;
    // // console.log(name, "name");
    if (name == "rating") {
      if (value > 6 || value < 1) {
        toastError("invalid rating, kindly provide valid rating");
        return;
      }
    }

    if (name == "numberOfNight") {
      if (value < "0" && value) {
        toastError(`Number of nights cannot be less than 0`);
        return;
      }
      let checkInDate = new Date(list[index]["checkIn"]);
      let checkOutDate = new Date();
      checkOutDate.setDate(checkInDate.getDate() + parseInt(value));
      list[index]["checkOut"] = checkOutDate;
    }

    // console.log(list, "list");
    list[index][name] = value;

    setHotelList([...list]);
  };

  const handleinputchangeFlight = (e, index) => {
    let { name, value } = e.target;
    // console.log()
    ("use strict");
    let tempList = [...flightList];
    let totalAmount = 0;
    let currentObj = Object.freeze(tempList[index]);
    currentObj = {
      flightName: tempList[index].flightName,
      cost: tempList[index].cost,
    };

    if (name == "cost") {
      if (isNaN(value)) {
        value = 0;
        toastError("Cost should be number");
        return;
      } else if (Number.isInteger(parseInt(value))) {
        for (let el of tempList) {
          // console.log(el, "cost23");
          if (el.cost) {
            totalAmount = totalAmount + parseInt(el.cost);
          }
        }
        console.log(totalAmount, "1", value, "@", flightCost, "23");
        // if (parseInt(totalAmount) + parseInt(value) > parseInt(flightCost)) {
        //   toastError("Flight price cannot be greater than total Flight cost");
        //   return;
        // }
        if (
          flightList.reduce((acc, el) => acc + parseInt(el.cost), 0) >
          parseInt(flightCost)
        ) {
          toastError("flight price cannot be  greater than total flight cost");
          return;
        }
        if (value > +flightCost) {
          value = 0;
          toastError("flight price cannot be greater than total flight cost");
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

  const handleChangePriceOfAdditionalCost = (value) => {
    // console.log(value, "1Value23");
    // console.log(isNaN(value), "valuwe23");
    // console.log(parseInt(value), "valuwe231234");
    let list = [];
    let totalAmount = 0;
    let tempList = inputList;
    let tempValues = Object.values(tempList);
    // console.log(tempValues, "tempValues23");
    if (value == undefined) {
    } else if (isNaN(value) == true) {
      value = 0;
      // if (parseInt(value) == "NaN") {
      // value = 0;
      // console.log(typeof value, "vlue", value);
      toastError("Land package price should be number*");
      return;
    } else {
      for (let el of tempValues) {
        // console.log(el, "cost23");
        if (el.cost) {
          totalAmount = totalAmount + parseInt(el.cost);
        }
      }
      // for (let ele of inputList) {
      //   // console.log(ele, "1223");
      //   if (ele?.cost > 0) {
      //     tempCost = tempCost + Number.parseInt(ele?.cost);
      //   }
      // }
      // let
      // if (
      //   tempList.reduce((acc, el) => acc + parseInt(el.cost), 0) >
      //   parseInt(totalCost)
      // ) {
      //   toastError(
      //     "addititonal land price cannot be greater than total land cost/"
      //   );
      //   return;
      // }
      // inputList;
      // console.log(totalAmount, landCost, "1234");
      if (totalAmount + parseInt(value) > parseInt(landCost)) {
        toastError(
          "Addititonal land price cannot be greater than total land cost"
        );
        return;
      } else {
        setAdditionalLandPrices(value);
      }
    }
  };

  // useEffect(() => {
  //   handleChangePriceOfAdditionalCost();
  // }, [additionalLandPrices]);

  // useEffect(() => {
  //   let tempCost = 0;
  //   let tempCostOf = 0;
  //   for (let ele of inputList) {
  //     // console.log(ele, "oiinno");
  //     tempCost = tempCost + Number.parseInt(ele.cost);
  //   }

  //   if (tempCost + additionalLandPrices > parseInt(landCost)) {
  //     tempCost = 0;
  //     // console.log(tempCost, "11tempCost12");
  //     setIsButtonHotel(true);
  //     toastError("Hotel price cannot be greater than Total Land costss");
  //     return;
  //   } else {
  //     setIsButtonHotel(false);
  //   }
  //   for (let ele of flightList) {
  //     tempCostOf = tempCostOf + Number.parseInt(ele.cost);
  //   }
  //   if (tempCostOf > +flightCost) {
  //     setIsButtonFlight(true);
  //     toastError("Flight price cannot be greater than total flight cost");
  //     return;
  //   } else {
  //     setIsButtonFlight(false);
  //   }
  // }, [inputList, flightList, landCost, flightCost, additionalLandPrices]);
  const updateStatusOfLead = async (id, obj) => {
    let { data: res } = await updateLeadStatus(id, obj);
    if (res.success) {
      handleGetAllLeads();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadName == "") {
      toastError("Lead Name is mandatory");
      return;
    } else if (locationName == "") {
      toastError("Location Name is mandatory");
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
      additionalLandName,
      additionalLandPrices,
    };
    // console.log(obj, "obj1");

    if (isUpdatePrevDoc) {
      // console.log("update");
      dispatch(update(obj, obj.id));
    } else {
      // console.log("create doc");
      let object = {
        status: "CONVERT",
      };
      // handleLeadStatusUpdate(leadId, "Convert", "FROMCOSTING");
      updateStatusOfLead(leadId, object);
      dispatch(addCosting(obj, obj.id));
    }
  };

  const handleLandPricesAndTotalCost = (value) => {
    setLandPrices(value);
    setTotalCost(+totalCost + +value);
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
                readOnly
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

          <div className="content mb-13">
            <div className="row">
              <div className="col-12 col-md-4 mb-3">
                <label> Land Package Name </label>
                <input
                  type="text"
                  name="cost"
                  value={additionalLandName}
                  class="form-control"
                  onChange={(e) => setAdditionalLandName(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>Land Package Price</label>
                <input
                  type="number"
                  name="additionalLandPrices"
                  class="form-control"
                  value={additionalLandPrices}
                  onChange={(e) =>
                    handleChangePriceOfAdditionalCost(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="content">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="mt-3 mb-4 ">Hotel Details</h3>
                  {inputList.map((x, i) => {
                    return (
                      <div className="row mb-3" key={i}>
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
                          <label>Booking Source</label>
                          <input
                            type="text"
                            name="bookingSource"
                            value={x.bookingSource}
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
                            placeholder="Enter Cost"
                            class="form-control"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        {/*  */}

                        {/*  */}
                        <div className="row">
                          <div class="form-group col-md-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="hold"
                              value={x.hold}
                              checked={x.hold == true ? true : false}
                              id="publish-checkbox"
                              onChange={(e) => handleinputchange(e, i)}
                            />
                            <label className="form-check-label fs-14">
                              Hold
                            </label>
                          </div>
                          {/* <div className="col-4 mb-3"> */}
                          <div class="form-group col-md-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="reConfirmed"
                              value={x.reConfirmed}
                              checked={x.reConfirmed == true ? true : false}
                              id="publish-checkbox"
                              onChange={(e) => handleinputchange(e, i)}
                            />
                            <label className="form-check-label fs-14">
                              Re-confirmed
                            </label>
                          </div>
                          {/* <div className="col-4 mb-3"> */}
                          <div class="form-group col-md-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="pending"
                              value={x.pending}
                              checked={x.pending == true ? true : false}
                              id="publish-checkbox"
                              onChange={(e) => handleinputchange(e, i)}
                            />
                            <label className="form-check-label fs-14">
                              pending
                            </label>
                          </div>
                        </div>
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
                        {/* <div class=" col-md-4 row "> */}
                        {/* <div className="col-4 mb-3"> */}

                        {/* </div> */}
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
                      <div className="row mb-3" key={i}>
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
                            // disabled={true}
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

            {/* 
          
           */}
            <div className="content">
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">
                  Total Land Cost<span className="text-danger">*</span>
                </label>
                <input
                  disabled={true}
                  // readOnly
                  type="number"
                  className="form-control"
                  value={landCost}
                  onChange={(e) => setLandCost(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">
                  Total Flight Cost<span className="text-danger">*</span>
                </label>
                <input
                  disabled={true}
                  // readOnly
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
                  disabled={true}
                  // readOnly
                  type="number"
                  className="form-control"
                  value={totalCost}
                />
              </div>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="blue-1 fs-12">
                Profit<span className="text-danger">*</span>
              </label>
              <input
                disabled={true}
                // readOnly
                // type="number"
                className="form-control"
                value={profit}
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
      <AddReminder
        showReminder={showReminder}
        setShowReminder={setShowReminder}
        // isChangeCheckBox={isChangeCheckBox}
        setIsChangeCheckBox={setIsChangeCheckBox}
      />
    </div>
  );
};

export default ViewCostingSheetForm;
