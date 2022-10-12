//=================
import {
  quotationAdd,
  get,
  deleteQuotation,
  update,
} from "../../../../redux/features/quotation/quotationSlice";
import { toastSuccess, toastError } from "../../../../utils/toastUtils";

import { tourGet } from "../../../../redux/features/tour/tourSlice";
import { leadGet } from "../../../../redux/features/lead/leadSlice";
import { Helmet } from "react-helmet";

import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../../_components/Utility/Button";
import React, { useState, useEffect, Component } from "react";
import Select from "react-select";

const Basicinputs = () => {
  const dispatch = useDispatch();
  const [destinationName, setDestinationName] = useState("");
  const [durationOfTour, setDurationOfTour] = useState(0);
  const [numberOfGuest, setNumberOfGuest] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  //
  const [childWithoutBed, setChildWithoutBed] = useState(0);
  const [childWithBed, setChildWithBed] = useState(0);

  const [visaRequired, setVisaRequired] = useState(false);
  const [visaOnArrival, setVisaOnArrival] = useState("");

  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  ////
  const [termAndCondition, setTermAndCondition] = useState("");
  //////product details
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);

  const [airportTransfer, setAirportTransfer] = useState("");
  const [inputList, setinputList] = useState([{ guestName: "", age: "" }]);
  const [selectedTourIdArr, setSelectedTourIdArr] = useState([]);
  const [selectedLeadIdArr, setSelectedLeadIdArr] = useState([]);
  const [leadName, setLeadName] = useState("");
  const [leadId, setLeadId] = useState("");

  console.log(selectedTourIdArr, "selectedTourIdArr");
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    if (name == "age") {
      if (value >= 149 || value < 1) {
        toastError("invalid age, kindly provide valid age");
      }
    }
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { guestName: "", age: "" }]);
  };
  //hotels details
  const [hotelList, setHotelList] = useState([
    {
      hotelName: "",
      roomType: "",
      numberOfNight: "",
      checkIn: "",
      checkOut: "",
      rating: "",
      hotelAddress: "",
    },
  ]);

  const handleinputchangeHotel = (e, index) => {
    const { name, value } = e.target;
    // console.log(name, "name");
    if (name == "rating") {
      if (value > 6 || value < 1) {
        toastError("invalid rating, kindly provide valid rating");
      }
    }
    if (name == "roomType") {
      if (value != "SMALL" || value != "MEDIUM" || value != "LARGE") {
        toastError(`Room Type should be SMALL or MEDIUM or LARGE`);
      }
    }
    const list = [...hotelList];
    console.log(list, "list");
    for (let el of list) {
      console.log(el, "el");
      if (Date.parse(el.checkOut) < Date.parse(el.checkIn)) {
        toastError("check-Out wil be greater than checkin ");
      }
    }
    // console.log(Date.parse(list[0].checkOut), "Date.parse(list.checkout)");
    // console.log(Date.parse(list[0].checkIn), "Date.parse(list.checkIn)");
    list[index][name] = value;
    setHotelList(list);
  };

  const handleremoveHotel = (index) => {
    const list = [...hotelList];
    list.splice(index, 1);
    setHotelList(list);
  };

  const handleaddclickHotel = () => {
    setHotelList([
      ...hotelList,
      {
        hotelName: "",
        roomType: "",
        numberOfNight: "",
        checkIn: "",
        checkOut: "",
        rating: "",
        hotelAddress: "",
      },
    ]);
  };

  //itinerary list
  const [itineraryList, setItineraryList] = useState([
    { day: "", itineraryName: "" },
  ]);

  const handleinputchangeItinerary = (e, index) => {
    // console.log(e, index, "e, index");
    const { name, value } = e.target;
    if (name == "day") {
      if (value > 7 || value < 1) {
        toastError("invalid day, kindly provide valid day");
      }
    }
    const list = [...itineraryList];
    console.log(list, "listitinerary");
    list[index][name] = value;
    setItineraryList(list);
  };
  // console.log(selectedTourIdArr, "selectedTourIdArr");
  const handleremoveItinerary = (index) => {
    const list = [...itineraryList];
    list.splice(index, 1);
    setItineraryList(list);
  };

  const handleaddclickItinerary = () => {
    setItineraryList([...itineraryList, { day: "", itineraryName: "" }]);
  };
  //tour
  useEffect(() => {
    dispatch(leadGet());
  }, []);

  const leadValueArr = useSelector((state) => state.lead.leadArr);
  console.log(leadValueArr, "leadValueArr");

  const handleLeadValueChange = (e) => {
    setSelectedLeadIdArr(e);
  };

  useEffect(() => {
    dispatch(tourGet());
  }, []);

  const tourValueArr = useSelector((state) => state.tour.tourArr);

  const handleTourValueChange = (e) => {
    setSelectedTourIdArr(e);
  };
  // console.log(selectedTourIdArr, "selectedTourIdArr");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (destinationName == "") {
    //   throw "destinationName name is mandatory";
    // }
    // if (numberOfGuest == "") {
    //   throw "number Of Guest is mandatory";
    // }
    // if (adultCount == "") {
    //   throw "adult Count is mandatory";
    // }
    // if (visaRequired == "") {
    //   throw "visa Required is mandatory";
    // }

    // if (startDate == "") {
    //   throw "start Date is mandatory";
    // }
    // if (amount == "") {
    //   throw "amount is mandatory";
    // }
    let obj = {
      destinationName,
      durationOfTour,
      numberOfGuest,
      adultCount,
      childWithoutBed,
      childWithBed,
      inputList,
      hotelList,
      visaRequired,
      visaOnArrival,
      airportTransfer,
      tourValueArr: selectedTourIdArr.map((el) => ({
        tourName: el.tourName,
        description: el.description,
      })),
      // leadId: [{ leadName: leadName }],
      leadId,
      leadName,
      startDate,
      expirationDate,
      termAndCondition,
      amount,
      tax,
      itineraryList,
    };
    dispatch(quotationAdd(obj));
    console.log(obj, "send Obj9");
  };
  const options = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];

  return (
    // http://localhost:8080/app/quotation/forms
    <div className="page-wrapper">
      <Helmet>
        <title>Form Basic Input - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Quotation Create</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                {/* <h3 className="card-title mb-0">Neccessary Details</h3> */}
                <h3 className="blue-1 m-0">Neccessary Details</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* <form action="#"> */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Destination Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        value={destinationName}
                        onChange={(e) => setDestinationName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Duration Of Tour <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        value={durationOfTour}
                        onChange={(e) => setDurationOfTour(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Number Of Guest <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            value={numberOfGuest}
                            onChange={(e) => setNumberOfGuest(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Adult Count <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            value={adultCount}
                            onChange={(e) => setAdultCount(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Child Without Bed
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            value={childWithoutBed}
                            onChange={(e) => setChildWithoutBed(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Child With Bed <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            value={childWithBed}
                            onChange={(e) => setChildWithBed(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*
                   http://localhost:8080/app/quotation/forms
                   */}
                  <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4 ">Traveller Details</h3>
                        {/* <h3 className="blue-1 m-0">Traveller Details</h3> */}
                        {inputList.map((x, i) => {
                          return (
                            <div className="row mb-3">
                              <div class="form-group col-md-4">
                                <label>Guest Name</label>
                                <input
                                  type="text"
                                  name="guestName"
                                  class="form-control"
                                  placeholder="Enter Name"
                                  onChange={(e) => handleinputchange(e, i)}
                                />
                              </div>
                              <div class="form-group col-md-4">
                                <label>age</label>
                                <input
                                  type="number"
                                  name="age"
                                  class="form-control"
                                  placeholder="Enter Age"
                                  onChange={(e) => handleinputchange(e, i)}
                                />
                              </div>
                              <div class="form-group col-md-2 mt-4">
                                {inputList.length !== 1 && (
                                  <button
                                    type="button"
                                    // className="btn btn-success"
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

                  {/* 
                     http://localhost:8080/app/quotation/forms
                    */}

                  <div className="content">
                    {/* <div className="row"> */}
                    <h3 className="mt-3 mb-4 ">Hotel details</h3>
                    {/* <h3 className="card-title mb-0">Hotel details</h3> */}
                    {/* </div> */}
                    {hotelList.map((x, i) => {
                      return (
                        <div className="row mb-3">
                          <div class="form-group col-md-4">
                            <label>Hotel Name</label>
                            <input
                              type="text"
                              name="hotelName"
                              class="form-control"
                              placeholder="Name"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div class="form-group col-md-4">
                            <label> Number Of Night</label>
                            <input
                              type="number"
                              name="numberOfNight"
                              class="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div class="form-group col-md-4">
                            <label> Room Type</label>
                            <input
                              type="text"
                              name="roomType"
                              class="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>
                          <div class="form-group col-md-4">
                            <label> Check In</label>
                            <input
                              type="date"
                              // type="text"
                              name="checkIn"
                              class="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div class="form-group col-md-4">
                            <label> Check Out</label>
                            <input
                              type="date"
                              // type="text"
                              name="checkOut"
                              class="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div class="form-group col-md-4">
                            <label>rating</label>
                            <input
                              type="number"
                              name="rating"
                              class="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div class="form-group col-md-4">
                            <label>Hotel Address</label>
                            <input
                              type="text"
                              name="hotelAddress"
                              class="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div class="form-group col-md-2 mt-4">
                            {hotelList.length !== 1 && (
                              <button
                                type="button"
                                // className="btn btn-success"
                                className="btn btn-danger mx-1"
                                onClick={() => handleremoveHotel(i)}
                              >
                                Remove
                              </button>
                            )}
                            {hotelList.length - 1 === i && (
                              <button
                                className="btn btn-success"
                                onClick={handleaddclickHotel}
                              >
                                Add More
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/*
                   http://localhost:8080/app/quotation/forms
                   
                   */}
                  {/* 
                   
                   */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-4">
                      Visa Required
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <Select
                        options={options}
                        onChange={(e) => {
                          setVisaRequired(e.value),
                            console.log(visaRequired, "2nd isaRequired");
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-4">
                      lead name
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <Select
                        options={leadValueArr}
                        onChange={(e) => {
                          setLeadId(e.id),
                            setLeadName(e.value),
                            console.log(e.value, "lead name ");
                        }}
                      />
                    </div>
                  </div>
                  {/* 

                   */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Visa On Arrival
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        value={visaOnArrival}
                        onChange={(e) => setVisaOnArrival(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Airport Transfer
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        value={airportTransfer}
                        onChange={(e) => setAirportTransfer(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="form-group row">
                    <label className="col-form-label col-md-2">Lead Name</label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        value={leadId}
                        onChange={(e) => setLeadId(e.target.value)}
                      />
                    </div>
                  </div> */}
                  {/*  */}

                  {/* <div className="col-12">
                    <label className="blue-1 fs-12">Lead Name</label>
                    <Select
                      onChange={handleLeadValueChange}
                      isMulti
                      options={
                        leadValueArr && leadValueArr.length > 0
                          ? leadValueArr.map((el) => ({
                              ...el,
                              label: el.leadName,
                              value: el._id,
                            }))
                          : []
                      }
                    />
                  </div> */}
                  <div className="col-12">
                    <label className="blue-1 fs-12">Tour</label>
                    <Select
                      onChange={handleTourValueChange}
                      isMulti
                      options={
                        tourValueArr && tourValueArr.length > 0
                          ? tourValueArr.map((el) => ({
                              ...el,
                              label: el.tourName,
                              value: el._id,
                            }))
                          : []
                      }
                    />
                  </div>

                  {/*  */}
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Start Date <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Expiration Date
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            className="form-control"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 
                  
                  */}
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">
                          Amount <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group row">
                        <label className="col-form-label col-md-4">Tax</label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  {/*
                   http://localhost:8080/app/quotation/forms
                   */}
                  <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4">Itinerary Details</h3>
                        {itineraryList.map((x, i) => {
                          return (
                            <div className="row mb-3">
                              <div class="form-group col-md-4">
                                <label>Itinerary Name</label>
                                <input
                                  type="text"
                                  name="itineraryName"
                                  class="form-control"
                                  placeholder="Enter Itinerary Name"
                                  onChange={(e) =>
                                    handleinputchangeItinerary(e, i)
                                  }
                                />
                              </div>
                              <div class="form-group col-md-4">
                                <label>Day </label>
                                <input
                                  type="number"
                                  name="day"
                                  class="form-control"
                                  onChange={(e) =>
                                    handleinputchangeItinerary(e, i)
                                  }
                                />
                              </div>

                              <div class="form-group col-md-2 mt-4">
                                {itineraryList.length !== 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    // className="btn btn-success"
                                    onClick={() => handleremoveItinerary(i)}
                                  >
                                    Remove
                                  </button>
                                )}
                                {itineraryList.length - 1 === i && (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleaddclickItinerary}
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

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Term And Condition
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        value={termAndCondition}
                        onChange={(e) => setTermAndCondition(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <CustomButton isBtn btnName="Save" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Basicinputs;
