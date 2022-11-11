import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import CustomButton from "../../_components/Utility/Button";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import "../antdstyle.css";
import {
  tourGet,
  updateTour,
  deleteTour,
  setTour,
  addTour,
} from "../../redux/features/CostingSheet/CostingSheetSlice.js";

const ViewDestination = () => {
  const dispatch = useDispatch();
  const tourResultObj = useSelector((state) => state.tour.tourObj);
  const toursResultArr = useSelector((state) => state.tour.tours);

  const [leadName, setLeadName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [profit, setProfit] = useState("");
  const [airportCost, setAirportCost] = useState("");
  const [flightCost, setflightCost] = useState("");

  const [inputList, setinputList] = useState([{ hotelName: "", location: "" }]);
  const [flightList, setFlightDetails] = useState([
    { day: "", flightName: "" },
  ]);
  console.log(inputList, "inputList23");
  console.log(flightList, "flightList23");
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    // if (name == "age") {
    //   if (value >= 149 || value < 1) {
    //     toastError("invalid age, kindly provide valid age");
    //   }
    // }
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };
  useEffect(() => {}, [inputList]);

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
    // if (name == "day") {
    //   if (value > 7 || value < 1) {
    //     toastError("invalid day, kindly provide valid day");
    //   }
    // }
    // const list = [...flightList];
    // console.log(list, "listflight");
    // list[index][name] = value;
    // setFlightDetails(list);
    let tempArr = flightList;

    for (const el of e.target) {
      let objectexistsObj = tempArr.find(
        (ele) => ele.flightName == el.flightName
      );
      console.log(objectexistsObj, "objectexistsObj12");
      if (objectexistsObj) {
      }
    }

    setFlightDetails([e.target]);
  };

  const handleremoveFlightDetails = (index) => {
    const list = [...flightList];
    list.splice(index, 1);
    setFlightDetails(list);
  };

  const handleaddclickFlightDetails = () => {
    setFlightDetails([...flightList, { day: "", flightName: "" }]);
  };

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = () => {
    // dispatch(tourGet());
  };

  useEffect(() => {
    // setTourMainArr(toursResultArr)
  }, [toursResultArr]);

  const handleEdit = (row) => {
    console.log(row, "row update"); //whole object

    dispatch(setTour(row));
  };

  const handleTourDelete = (id) => {
    dispatch(deleteTour(id));
  };

  const handleSatus = (row, status) => {
    let obj = {
      Id: row._id,
      status: status,
    };

    dispatch(updateTour(obj));
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
      toastError(" Hotel details is mandatory");
      return;
      // } else if (flightList && flightList[0].FlightName == "") {
      //   toastError("Flight details is mandatory");
      //   return;
    } else if (profit == "") {
      toastError("profit is mandatory");
      return;
    } else if (airportCost == "") {
      toastError("Airport cost is mandatory");
      return;
    } else if (flightCost == "") {
      toastError("Flight cost is mandatory");
      return;
    }

    let obj = {
      leadName,
      locationName,
      inputList,
      flightList,
      profit,
      airportCost,
      flightCost,
    };
    console.log(obj, "obj");
    dispatch(addCostingSheet(obj));
  };

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
              <input
                type="text"
                className="form-control"
                value={leadName}
                onChange={(event) => setLeadName(event.target.value)}
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
            <div className="col-12 mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="category-status"
                value="option1"
                id="publish-checkbox"
                checked={isBooked}
                onChange={() => setIsBooked(!isBooked)}
              />
              <label
                className="form-check-label fs-14"
                htmlFor="publish-checkbox"
              >
                isBooked
              </label>
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
                            class="form-control"
                            placeholder="Enter location"
                            onChange={(e) => handleinputchange(e, i)}
                          />
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
                    return (
                      <div className="row mb-3">
                        <div class="form-group col-md-4">
                          <label>Flight Name</label>
                          <input
                            type="text"
                            name="flightName"
                            class="form-control"
                            placeholder="Enter Flight Name"
                            onChange={(e) => handleinputchangeFlight(e, i)}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label>Day </label>
                          <input
                            type="date"
                            name="day"
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
                  Airport Cost<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={airportCost}
                  onChange={(e) => setAirportCost(e.target.value)}
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
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="blue-1 fs-12">
                Profit<span className="text-danger">*</span>
              </label>
              <input
                type="number"
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

export default ViewDestination;
