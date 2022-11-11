import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "antd/dist/antd.css";
import CustomButton from "../../../../_components/Utility/Button";
// import CustomButton from "../.../../_components/Utility/Button";
import { toastError, toastSuccess } from "../../../../utils/toastUtils";
import "../../../antdstyle.css";
import {
  deleteCostingSheet,
  costingSheetGet,
  addCosting,
  update,
  setCostingSheet,
} from "../../../../redux/features/CostingSheet/CostingSheetSlice.js";
import { get } from "../../../../Services/quotation.service.js";
import { getPaymentByQuotationApi } from "../../../../Services/payment.service";

const ViewCostingSheetForm = () => {
  const location = useLocation();
  // console.log(location.pathname, " location32");
  const dispatch = useDispatch();
  const costingSheetResultObj = useSelector(
    (state) => state.costingSheet.costingSheetObj
  );

  console.log(costingSheetResultObj, "obj7");
  const handleSatus = (row, status) => {
    let obj = {
      Id: row._id,
      status: status,
    };

    // dispatch(updateTour(obj));
  };
  // const
  const [leadName, setLeadName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [profit, setProfit] = useState(0);
  const [landCost, setLandCost] = useState("");
  const [flightCost, setflightCost] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  const [inputList, setinputList] = useState([
    { hotelName: "", location: "", cost: "", isBooked: false },
  ]);

  const [flightList, setFlightList] = useState([{ cost: "", flightName: "" }]);
  const [totalCost, setTotalCost] = useState(0);
  const [quotationArray, setQuotationArray] = useState([]);
  const [selectedQuotationObj, setSelectedQuotationObj] = useState({});

  const [selectedQuotationId, setSelectedQuotationId] = useState("");
  // const [selectedQuotationArr, setselectedQuotationArr] = useState([]);
  const quotationArr = useSelector((state) => state.quotation.quotationArr);
  console.log(quotationArr, "quotationArr23");
  const getQuotation = async () => {
    let arr = await get();
    setQuotationArray(arr.data.data);
    console.log(arr.data.data, "arr23");
  };
  useEffect(() => {
    getQuotation();
  }, []);
  useEffect(() => {
    if (costingSheetResultObj && costingSheetResultObj._id) {
      setLeadName(costingSheetResultObj.leadName);
      setLocationName(costingSheetResultObj.locationName);
      setProfit(+costingSheetResultObj.profit);
      setLandCost(costingSheetResultObj.landCost);
      setflightCost(costingSheetResultObj.flightCost);
      setTotalExpense(costingSheetResultObj.totalExpense);
      {
        console.log("insoede");
      }
      setinputList([...costingSheetResultObj.hotelDetails]);
      {
        console.log("insoede2");
      }
      setFlightList([...costingSheetResultObj.flightDetails]);
      {
        console.log("insoede3");
      }
      setTotalCost(costingSheetResultObj.totalCost);
    }
  }, [costingSheetResultObj]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;

    let list = [...inputList];

    if (name == "isBooked") {
      list[index][name] = !list[index][name];
    } else {
      list[index][name] = value;
    }
    setinputList(list);
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
    setProfit(totalCost - (+totalExpense + +landCost + +flightCost));
  }, [
    inputList,
    flightList,
    totalCost,
    flightCost,
    landCost,
    totalExpense,
    profit,
  ]);
  useEffect(() => {
    setLeadName("");
    setLocationName("");
    setProfit(0);
    setLandCost("");
    setflightCost("");
    setTotalExpense("");
    setinputList([{ hotelName: "", location: "", cost: "", isBooked: false }]);
    setFlightList([{ cost: "", flightName: "" }]);
    setTotalCost(0);
  }, [location]);
  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { hotelName: "", location: "" }]);
  };

  const handleinputchangeFlight = (e, index) => {
    const { name, value } = e.target;

    const list = [...flightList];
    list[index][name] = value;
    setFlightList(list);
  };

  const handleremoveFlightDetails = (index) => {
    const list = [...flightList];
    list.splice(index, 1);
    setFlightList(list);
  };
  useEffect(() => {}, [flightList]);
  const handleaddclickFlightDetails = () => {
    setFlightList([...flightList, { cost: "", flightName: "" }]);
  };

  useEffect(() => {
    // handleInit();
  }, []);

  const handleInit = () => {
    // dispatch(tourGet());
  };
  const quotationObtions = () => {
    const temp = quotationArray.map((el) => {
      return { ...el, value: el?.leadId, label: el?.leadId };
    });
    setAb([...temp]);
  };

  // console.log(quotationObtions, "24quotationObtions43");
  const handleEdit = (row) => {
    console.log(row, "row update"); //whole object
    dispatch(setTour(row));
  };

  const handleTourDelete = (id) => {
    dispatch(deleteTour(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadName == "") {
      toastError("Lead Name is mandatory");
      return;
      // throw "tour name is mandatory";
    } else if (locationName == "") {
      toastError("Location Name is mandatory");
      return;
    } else if (inputList && inputList[0].hotelName == "") {
      toastError(" Hotel details are mandatory");
      return;
      // } else if (flightList && flightList[0].FlightName == "") {
      //   toastError("Flight details are mandatory");
      //   return;
    } else if (totalCost == "") {
      toastError("Total cost is mandatory");
      return;
    } else if (false) {
      toastError(" is mandatory");
      return;
    } else if (landCost == "") {
      toastError("Airport cost is mandatory");
      return;
    } else if (flightCost == "") {
      toastError("Flight cost is mandatory");
      return;
    }
    let obj = {
      leadName,
      locationName,
      hotelDetails: inputList,
      flightDetails: flightList,
      totalCost,
      profit,
      landCost,
      flightCost,
      // isBooked,
    };
    console.log(obj, "obj");
    dispatch(addCosting(obj));
  };
  const [ab, setAb] = useState();
  useEffect(() => {
    console.log(ab, "ab23");
  }, [quotationObtions, ab]);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <form action="" className="form">
          <h3 className="blue-1 mb-4">Add Costing Sheet</h3>
          <div className="row">
            <div className="col-12 col-md-8 mb-3">
              <label className="blue-1 fs-12">
                Lead Name<span className="text-danger">*</span>
              </label>

              {/* {console.log(quotationArray, "q243uotationArray")} */}
              <Select
                options={quotationArray.map((el) => {
                  return { ...el, value: el?.leadId, label: el?.leadId };
                })}
                placeholder="Select from options"
                defaultInputValue={selectedQuotationId}
                value={selectedQuotationObj}
                onChange={(e) => {
                  console.log(e, "asd");
                  setSelectedQuotationId(e.value);
                  setSelectedQuotationObj(e);
                }}
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
                            placeholder="Enter Hotel Name"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Location</label>
                          <input
                            type="text"
                            name="location"
                            value={x.location}
                            class="form-control"
                            placeholder="Enter location"
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
                            placeholder="Enter Cost"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
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
                          <label
                            className="form-check-label fs-14"
                            htmlFor="publish-checkbox"
                          >
                            isBooked
                          </label>
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
                    // console.log(x, i, "x,i123");
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
                              // className="btn btn-success"
                              onClick={() => handleremoveFlightDetails(i)}
                            >
                              Remove
                            </button>
                          )}
                          {flightList.length - 1 === i && (
                            <button
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
