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
  console.log(leadId, "leadId2143");
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
    {
      hotelName: "",
      bookingSource: "",
      cost: "",
      hold: false,
      reConfirmed: false,
      pending: false,
    },
  ]);
  const [flightList, setFlightList] = useState([{ cost: "", flightName: "" }]);
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

  const getQuotation = async () => {
    let arr = await getApprovedQuotation(leadId);
    setQuotationObj(arr.data.data);
  };

  useEffect(() => {
    // // console.log(location.pathname, "location.pathname32");
    setIsLocation(true);
  }, [tempLocation]);

  const handleInit = () => {
    console.log(leadId, "12leadId23");
    dispatch(costingSheetGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    getQuotation(leadId);
    handleInit();
  }, []);

  // useEffect(() => {
  //   let tempCost = 0;
  //   let tempCostOf = 0;
  //   for (let ele of inputList) {
  //     // console.log(ele, "oiinno");
  //     tempCost = tempCost + Number.parseInt(ele.cost);
  //   }
  //   if (tempCost > parseInt(landCost)) {
  //     tempCost = 0;
  //     // console.log(tempCost, "11tempCost12");
  //     setIsButtonHotel(true);
  //     toastError("Hotel price cannot be greater than Total Land costsss");
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
  // }, [inputList, flightList, landCost, flightCost]);

  useEffect(() => {
    // console.log(quotationObj, "1quotationObj23");
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
    console.log(costingSheetResultObj, "123costingSheetResultObj23");
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
      setAdditionalLandName(costingSheetResultObj.additionalLandName);
      setAdditionalLandPrices(costingSheetResultObj.additionalLandPrices);
    }
  }, [costingSheetResultObj]);

  const handleinputchange = (e, index) => {
    //hotel
    let { name, value, checked } = e.target;
    //hotel
    ("use strict");
    // console.log(name, value, checked, "name, value, checked23");
    // console.log(inputList, "inputList2134");
    let tempList = [...inputList];
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
      // console.log(tempList, "tempList/*/");
      // console.log(
      //   tempList.reduce((acc, el) => acc + parseInt(el.cost), 0),
      //   landCost,
      //   "098"
      // );
      let temp = 0;
      // if(tempList)
      for (let el of inputList) {
        // console.log(el, "eeeeewr");
        if (el.cost) {
          temp = temp + el.cost;
        }
      }
      // console.log(temp, "Temp23");
      // if (temp > parseInt(landCost)) {
      //   toastError("H2342342otel price cannot be greater than land price2");
      //   return;
      // }
      // if (
      //   tempList.reduce((acc, el) => acc + parseInt(el.cost), 0) >
      //   parseInt(landCost)
      // ) {
      //   toastError("Hotel price cannot be greater than land price2");
      //   return;
      // }
      // if (
      //   list.reduce((acc, el) => acc + parseInt(el.numberOfNight), 0) >
      //   parseInt(durationOfTour)
      // ) {
      //   toastError(
      //     "Total number of nights cannot be more than duration of tour"
      //   );
      //   return;
      // }

      // if (isNaN(value)) {
      //   value = 0;
      //   toastError("Cost should be number");
      //   return;
      // } else if (Number.parseInt(value)) {
      //   // for (let ele of tempList) {
      //   //   console.log(ele, "3ost");
      //   //   console.log(ele.cost, "1222cost");
      //   //   tempCost1 = tempCost1 + parseInt(ele.cost);
      //   // }
      //   // if (
      //   //   tempList.reduce((acc, el) => acc + parseInt(el.cost), 0) >
      //   //   parseInt(landCost)
      //   // ) {
      //   //   console.log(tempList, "1tempList12");
      //   //   toastError("Hotel price cannot be greater than land pricess");
      //   //   return;
      //   // }
      //   // console.log(tempCost1, "1tempCost213412");
      if (value > parseInt(landCost)) {
        value = 0;
        toastError("Hotel price cannot be greater than land price2");
        return;
      }
      // }
    }
    if (name == "hold") {
      currentObj[name] = checked;
      currentObj["reConfirmed"] = false;
      currentObj["pending"] = false;
    } else if (name == "reConfirmed") {
      currentObj[name] = checked;
      currentObj["hold"] = false;
      currentObj["pending"] = false;
    } else if (name == "pending") {
      currentObj[name] = checked;
      currentObj["hold"] = false;
      currentObj["reConfirmed"] = false;
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
  }, [flightList, totalCost, flightCost, landCost, totalExpense, profit]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <form action="" className="form">
          <h3 className="blue-1 mb-4"></h3>
          <div className="row">
            <div className="col-12 col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Lead Name<span className="text-danger">*</span>
              </label>
              <input readOnly className="form-control" value={leadName} />
            </div>
            <div className="col-12  col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Lead Id<span className="text-danger">*</span>
              </label>
              <input readOnly className="form-control" value={leadsId} />
            </div>
            <div className="col-12  col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Location Name<span className="text-danger">*</span>
              </label>

              <input readOnly className="form-control" value={locationName} />
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
                            readOnly
                            name="hotelName"
                            value={x.hotelName}
                            class="form-control"
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Booking Source</label>
                          <input
                            readOnly
                            type="text"
                            name="bookingSource"
                            value={x.bookingSource}
                            class="form-control"
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Cost</label>
                          <input
                            readOnly
                            name="cost"
                            value={x.cost}
                            class="form-control"
                          />
                        </div>
                        {/*  */}
                        <div className="col-12 mb-3">
                          <input
                            readOnly
                            className="form-check-input"
                            type="checkbox"
                            name="hold"
                            value={x.hold}
                            checked={x.hold == true ? true : false}
                            id="publish-checkbox"
                          />
                          <label className="form-check-label fs-14">Hold</label>
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            readOnly
                            className="form-check-input"
                            type="checkbox"
                            name="reConfirmed"
                            value={x.reConfirmed}
                            checked={x.reConfirmed == true ? true : false}
                            id="publish-checkbox"
                            // onChange={(e) => handleinputchange(e, i)}
                          />
                          <label className="form-check-label fs-14">
                            Re-confirmed
                          </label>
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            readOnly
                            className="form-check-input"
                            type="checkbox"
                            name="pending"
                            value={x.pending}
                            checked={x.pending == true ? true : false}
                            id="publish-checkbox"
                            // onChange={(e) => handleinputchange(e, i)}
                          />
                          <label className="form-check-label fs-14">
                            pending
                          </label>
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
                    return (
                      <div className="row mb-3" key={i}>
                        <div class="form-group col-md-4">
                          <label>Flight Name</label>
                          <input
                            readOnly
                            name="flightName"
                            class="form-control"
                            value={x.flightName}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Cost </label>
                          <input
                            readOnly
                            name="cost"
                            value={x.cost}
                            class="form-control"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-12 col-md-4 mb-3">
                  <label>Land Name </label>
                  <input
                    readOnly
                    name="cost"
                    value={additionalLandName}
                    class="form-control"
                  />
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <label>Land Price</label>
                  <input
                    readOnly
                    name="LandPrices"
                    class="form-control"
                    value={additionalLandPrices}
                  />
                </div>
              </div>
            </div>

            {/* 
          
           */}
            <div className="content">
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">Land Cost</label>
                <input readOnly className="form-control" value={landCost} />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">Flight Cost</label>
                <input readOnly className="form-control" value={flightCost} />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label className="blue-1 fs-12">Total Cost</label>
                <input readOnly className="form-control" value={totalCost} />
              </div>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="blue-1 fs-12">Profit</label>
              <input readOnly className="form-control" value={profit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewCostingSheetForm;
