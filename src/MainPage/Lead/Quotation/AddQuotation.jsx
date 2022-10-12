import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { quotationAdd ,quotationUpdate} from "../../../redux/features/quotation/quotationSlice";
import { tourGet } from "../../../redux/features/tour/tourSlice";
const AddQuotation = () => {

const {leadId} =  useParams();

console.log(leadId,"leadId")

  const dispatch = useDispatch();
  const [destinationName, setDestinationName] = useState("");
  const [durationOfTour, setDurationOfTour] = useState(0);
  const [numberOfGuest, setNumberOfGuest] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const tourValueArr = useSelector((state) => state.tour.tours);
  const quotationStateObj = useSelector((state) => state.quotation.quotationObj);
  const [noOfTravellerArray ,setNoOfTravellerArray] = useState([])
  const [isAirport, setIsAirport] = useState(false)
  const [island, setIsLand] = useState(false);
  const [perPersonLandPrice, setPerPersonLandPrice] = useState(0);
  const [perPersonAirPortPrice, setPerPersonAirportPrice] = useState(0);
  const [totalPersonLandPrice, setTotalPersonLandPrice] = useState(0);
  const [totalPersonAirPortPrice, setTotalPersonAirportPrice] = useState(0);
  const [quotationObj, setQuotationObj] = useState({})
  const [quotationId, setQuotationId] = useState('')


  // useEffect(() => {
  //   let numberGusetInt = parseInt(numberOfGuest)
  //   // if(!quotationObj && numberGusetInt && numberGusetInt != NaN){
  //   //   setNoOfTravellerArray(Array(numberGusetInt).fill(0).map(x => ({name:"",age:"",passengerType:"Adult",bed:'false'})));
  //   // } else {
  //   //   // setNoOfTravellerArray([]);
  //   //   if(quotationObj){

  //   //   }
  //   // }
  // }, [numberOfGuest])
  
useEffect(() => {
 console.log(noOfTravellerArray,"travereere")
}, [noOfTravellerArray])

  const [childWithoutBed, setChildWithoutBed] = useState(0);
  const [childWithBed, setChildWithBed] = useState(0);

  const [visaRequired, setVisaRequired] = useState("false");
  const [visaOnArrival, setVisaOnArrival] = useState("");

  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  ////
  const [termAndCondition, setTermAndCondition] = useState("");
  //////product details
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [isUpdateTour, setIsUpdateTour] = useState(false);
  const [tourArr, setTourArr] = useState([]);
  const [airportTransfer, setAirportTransfer] = useState("");
  const [travelList, setTravelList] = useState([{ name: "", startDate: "",endDate:"" }]);
  const [selectedTourIdArr, setSelectedTourIdArr] = useState([]);
  const [selectedLeadIdArr, setSelectedLeadIdArr] = useState([]);
  const [leadName, setLeadName] = useState("");


  useEffect(() => {
    dispatch(tourGet());
  }, []);


  useEffect(() => {
    if(quotationStateObj){
      setQuotationObj(quotationStateObj);
    }
  }, [quotationStateObj])
  

  useEffect(() => {
    if(quotationObj){
      console.log(quotationObj,"qoationboj----------");
      setQuotationId(quotationObj._id);
      setDestinationName(quotationObj.destinationName);
      setDurationOfTour(quotationObj.durationOfTour);
      setNumberOfGuest(quotationObj.numberOfGuest);
      setVisaRequired(quotationObj.visa);
      setNoOfTravellerArray(quotationObj.travelPassengerArr);
      setIsAirport(quotationObj.isFlight);
      setIsLand(quotationObj.isLand);
      setPerPersonLandPrice(quotationObj.perPersonLandPrice);
      setPerPersonAirportPrice(quotationObj.perPersonAirPortPrice)
      setTotalPersonAirportPrice(quotationObj.numberOfGuest*quotationObj.perPersonAirPortPrice);
      setTotalPersonLandPrice(quotationObj.numberOfGuest*quotationObj.perPersonLandPrice);
      setItineraryList(quotationObj.itineraryList);
      setTravelList(quotationObj.tourListArr);
      setHotelList(quotationObj.hotelDetail);
      setAirportTransfer(quotationObj.airportTransfer)
      setAmount(quotationObj.amount)

      console.log(quotationObj.travelPassengerArr,"sadfsaf")
      // set(quotationObj.destinationName);
      // setDestinationName(quotationObj.destinationName);
      // setDestinationName(quotationObj.destinationName);
      // setDestinationName(quotationObj.destinationName);
    }
  }, [quotationObj])
  useEffect(() => {
    console.log(tourValueArr,"tyuertret--------------------------------------------------------")
 if(tourValueArr && tourValueArr.length) {
    setTourArr(tourValueArr)
 }
  }, [tourValueArr]);

  useEffect(() => {

let landPrice = 0;
let AirportPrice = 0;
let totalPersonLandPriceInt = parseInt(totalPersonLandPrice);
let totalPersonAirPortPriceInt = parseInt(totalPersonAirPortPrice);


    if((totalPersonAirPortPriceInt && totalPersonAirPortPriceInt != NaN)) {  
       AirportPrice =  totalPersonAirPortPriceInt;
    }  else {
      AirportPrice = 0;
    }
    if((totalPersonLandPriceInt && totalPersonAirPortPriceInt != NaN)) {  

       landPrice =  totalPersonLandPriceInt;

    }  else {
      landPrice = 0;

    }

    console.log(landPrice,"landPrice")
    console.log(AirportPrice,"AirportPrice")
 let totalAmountPrice = landPrice +  AirportPrice;
    setAmount(totalAmountPrice);
  }, [totalPersonAirPortPrice,totalPersonLandPrice])
  

  useEffect(() => {


    let perPersonLandPriceInt = parseInt(perPersonLandPrice);
    let perPersonAirPortPriceInt = parseInt(perPersonAirPortPrice);
      if(numberOfGuest > 0){
        if((perPersonLandPriceInt && perPersonLandPriceInt != NaN) && (perPersonAirPortPriceInt && perPersonAirPortPriceInt != NaN)) { 
          setTotalPersonAirportPrice(numberOfGuest*perPersonAirPortPriceInt);
          setTotalPersonLandPrice(numberOfGuest*perPersonLandPriceInt);
          let  totalAmountPrice = numberOfGuest*(perPersonLandPriceInt+perPersonAirPortPriceInt);
            setAmount(totalAmountPrice);
        }
      }
      }, [numberOfGuest])
  useEffect(() => {
    if(!isAirport){
        setTotalPersonAirportPrice(0);
    }
    if(!island){
      setTotalPersonLandPrice(0);
  }



  },[island,isAirport])
  console.log(selectedTourIdArr, "selectedTourIdArr");
  const handleGuestchange = (e, index) => {
    const { name, value } = e.target;
    if (name == "age") {
      if (value >= 149 || value < 1) {
        toastError("invalid age, kindly provide valid age");
      }
    }
    const list = [...noOfTravellerArray];
    list[index][name] = value;
    setNoOfTravellerArray(list);
  };
  const handleGuestBedRadio = (e, index) => {
    const { name, value } = e.target;
  
    const list = [...noOfTravellerArray];
    list[index]["bed"] = value;
    setNoOfTravellerArray(list);
  };
  

  const handleRemoveTravel = (index) => {
    const list = [...travelList];
    list.splice(index, 1);
    setTravelList(list);
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
  const handleaddGuestArray = () => {
    setNoOfTravellerArray([
      ...noOfTravellerArray,
      {name:"",age:"",passengerType:"Adult",bed:'false'}
    ]);
  };

  const handleremoveGuest = (index) => {
    const list = [...noOfTravellerArray];
    list.splice(index, 1);
    setNoOfTravellerArray(list);
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

  const handleAddClickTour = () => {
    setTravelList([...travelList, { name: "", startDate: "",endDate:"" }]);
  };
  //tour
  // useEffect(() => {
  //   dispatch(leadGet());
  // }, []);

  const leadValueArr = useSelector((state) => state.lead.leadArr);
  console.log(leadValueArr, "leadValueArr");

  const handleLeadValueChange = (e) => {
    setSelectedLeadIdArr(e);
  };


  const handleTourValueChange = (e,index) => {
    let {name,value } = e.target
    const list = [...travelList];
    console.log(list, "travelList");
    list[index][name] = value;
    setTravelList(list);
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
     "travelPassengerArr":noOfTravellerArray,
      hotelList,
      "tourListArr":travelList,
      "visa": visaRequired,
      airportTransfer,
      leadId,
      "isFlight":isAirport,
      "isLand":island,
      perPersonAirPortPrice,
      perPersonLandPrice,
      amount,
      itineraryList,
    };

    console.log(quotationId,"quotationId----------sdfsdsdfasfdf")
    if(!quotationId) {
    dispatch(quotationAdd(obj));

    } else {
    dispatch(quotationUpdate({obj,quotationId}));

    }
    console.log(obj, "send Obj9");
  };
  const options = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];


  return (
          <div id="add_quote" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isUpdateTour ? "Edit":"Add"} Quote</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit}>
                  {/* <form action="#"> */}

                  <div className="row">
                    <div className=" form-group col-md-12">
                    <label className="col-form-label ">
                      Destination Name <span className="text-danger">*</span>
                    </label>
                      <input
                        type="text"
                        className="form-control"
                        value={destinationName}
                        onChange={(e) => setDestinationName(e.target.value)}
                      />
                    </div>
                  
                    <div className=" form-group col-md-6">
                    <label className="col-form-label ">
                      Duration Of Tour <span className="text-danger">*</span>
                    </label>
                      <input
                        type="text"
                        className="form-control"
                        value={durationOfTour}
                        onChange={(e) => setDurationOfTour(e.target.value)}
                      />
                    </div>
                      <div className="col-md-6">
                        <label className="col-form-label ">
                          Number Of Guest <span className="text-danger">*</span>
                        </label>
                          <input
                            type="number"
                            className="form-control"
                            value={numberOfGuest}
                            onChange={(e) => setNumberOfGuest(e.target.value)}
                          />
                      </div>

                      {/* <div className="col-md-6">
                        <label className="col-form-label ">
                            Adult Count <span className="text-danger">*</span>
                          </label>
                            <input
                              type="number"
                              className="form-control"
                              value={adultCount}
                              onChange={(e) => setAdultCount(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6  ">
                        <label className="col-form-label ">
                          Child Without Bed
                          <span className="text-danger">*</span>
                        </label>
                          <input
                            type="number"
                            className="form-control"
                            value={childWithoutBed}
                            onChange={(e) => setChildWithoutBed(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                        <label className=" ">
                          Child With Bed <span className="text-danger">*</span>
                        </label>
                          <input
                            type="number"
                            className="form-control"
                            value={childWithBed}
                            onChange={(e) => setChildWithBed(e.target.value)}
                          />
                      </div> */}
                </div>
                 
                  {/*
                   http://localhost:8080/app/quotation/forms
                   */}
                  <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4 ">Traveller Details</h3>
                        {/* <h3 className="blue-1 m-0">Traveller Details</h3> */}
                        { noOfTravellerArray   &&   noOfTravellerArray.map((guest, i) => {
                          return (
                            <div className="row mb-3" key={i}>

                          <div className="form-group col-md-3">
                                <label>Guest Type </label>
                              <select className="form-control" name="passengerType" value={guest.passengerType}  onChange={(e) => handleGuestchange(e, i)}>

                                <option value="Adult"  >Adult</option>
                                <option value="Child">Child</option>
                                <option value="Infant">Infant</option>
                              </select>
                             
                              </div>
                            
                              <div className="form-group col-md-3">
                                <label>Guest Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Enter Name"
                                  value={guest.name}
                                  onChange={(e) => handleGuestchange(e, i)}
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <label>Age</label>
                                <input
                                  type="number"
                                  name="age"
                                  className="form-control"
                                  placeholder="Enter Age"
                                  value={guest.age}
                                  onChange={(e) => handleGuestchange(e, i)}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label >Bed</label>
                                <div className="mt-2">
                                <input type="radio" value="false" checked={guest.bed === 'false'}   name={`bed-${i}`} onChange={(e) => handleGuestBedRadio(e, i)} /> With &nbsp;
                              

                                  <input type="radio" value="true"  checked={guest.bed === 'true'}  name={`bed-${i}`} onChange={(e) => handleGuestBedRadio(e, i)} /> With Out
                                  </div>
                              </div>
                              <div className="form-group col-md-1 ">
                                {noOfTravellerArray.length !== 1 && (
                                  <button
                                    type="button"
                                    // className="btn btn-success"
                                    className="btn btn-danger mx-1"
                                    onClick={() => handleremoveGuest(i)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              
                              </div>
                              <div className="col-md-12">
                                {noOfTravellerArray.length - 1 === i && (
                                    <button
                                      className="btn btn-success"
                                      onClick={handleaddGuestArray}
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
                    {hotelList  && hotelList.map((hotel, i) => {
                      return (
                        <div className="row mb-3" key={i}>
                          <div className="form-group col-md-4">
                            <label>Hotel Name</label>
                            <input
                              type="text"
                              name="hotelName"
                              className="form-control"
                              placeholder="Name"
                              value={hotel.hotelName}
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label> Number Of Night</label>
                            <input
                              type="number"
                              name="numberOfNight"
                              value={hotel.numberOfNight}
                              className="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label> Room Type</label>
                            <input
                              type="text"
                              name="roomType"
                              value={hotel.roomType}
                              className="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label> Check In</label>
                            <input
                              type="date"
                              // type="text"
                              name="checkIn"
                              value={hotel.checkIn}
                              className="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label> Check Out</label>
                            <input
                              type="date"
                              // type="text"
                              name="checkOut"
                              value={hotel.checkOut}
                              className="form-control"
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label>Rating</label>
                            <input
                              type="number"
                              name="rating"
                              className="form-control"
                              value={hotel.rating}
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label>Hotel Address</label>
                            <input
                              type="text"
                              name="hotelAddress"
                              className="form-control"
                              value={hotel.hotelAddress}
                              onChange={(e) => handleinputchangeHotel(e, i)}
                            />
                          </div>

                          <div className="form-group col-md-2 mt-4">
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
                          
                          </div>

                          <div className="col-md-12">
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
                   <div className="row">
                   <div className="form-group ">
                
                    <div className="col-md-8">
                    <label className="col-form-label ">
                      Visa Required
                      <span className="text-danger">*</span>
                    </label>
                      <select className="form-control" value={visaRequired}  onChange={(e) => {setVisaRequired(e.value) }}>
                      <option value="Visa is required">Visa is Required</option>
                      <option value="Visa not Required">Visa not Required</option>
                      <option value="Visa on Approval">Visa on Approval</option>
                      </select>
                     
                    </div>
                  </div>
             
                  <div className="form-group col-md-6">
                    <label className="col-form-label ">
                        Airport  
                      <span className="text-danger">*</span>
                    </label>
                    <input type="checkbox" name="IsAirport" value={isAirport} checked={isAirport}   onChange={(e) => {setIsAirport(!isAirport) }} />

                  </div>
                    
                  <div className="form-group col-md-6">
                    <label className="col-form-label ">
                        Land  
                      <span className="text-danger">*</span>
                    </label>
                    <input type="checkbox" name="Island" value={island} checked={island} onChange={(e) => {setIsLand(!island) }} />

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
                    <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4">Tour Details</h3>
                        </div>
              {travelList  &&  travelList.map((item,index) => {
                  return (
                  <div className="row" key={index}>
                  
                    <div className="col-md-12 mb-3">
                    <label className="blue-1 fs-12">Tour</label>
                    
                    <select className="form-control" name="name"    value={item.name}       onChange={(e) => handleTourValueChange(e, index)}>
                    <option  value="" disabled>--select an option--</option>
                     
                      { tourArr && tourArr.length > 0 && 
                          tourArr.map((el,inde) => (
                            <option  key={inde} value={el.name}>{el.name}</option>
                          )
                      )}
                    </select>

                    </div>

                    <div className="col-md-6">
                        <label className="col-form-label ">
                          Start Date <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={item.startDate}
                                 onChange={(e) => handleTourValueChange(e, index)}
                          />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="col-form-label ">
                          Expiration Date
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={item.endDate}
                            onChange={(e) => handleTourValueChange(e, index)}
                          />
                        </div>
                    </div>
                         <div className="form-group col-md-2 mt-4">
                                {travelList.length !== 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    // className="btn btn-success"
                                    onClick={() => handleRemoveTravel(index)}
                                  >
                                    Remove
                                  </button>
                                )}
                              
                              </div>
                              <div className="col-md-12">
                              {travelList.length - 1 === index && (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleAddClickTour}
                                  >
                                    Add More
                                  </button>
                                )}
                              </div>
                  </div>

                  
                    )})}

                    </div>
                  </div>

                    {/* <Select
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
                    /> */}

                  {/*  */}
              
                  {/* 
                  
                  */}
                  {/* <div className="row">
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
                  </div> */}
                  {/*  */}
                  {/*
                   http://localhost:8080/app/quotation/forms
                   */}
                  <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4">Itinerary Details</h3>
                        {itineraryList && itineraryList.map((itinerary, i) => {
                          return (
                            <div className="row mb-3" key={i}>
                                <div className="form-group col-md-4">
                                <label>Day </label>
                                <input
                                  type="number"
                                  name="day"
                                  value={itinerary.day}
                                  className="form-control"
                                  onChange={(e) =>
                                    handleinputchangeItinerary(e, i)
                                  }
                                />
                              </div>
                              <div className="form-group col-md-4">
                                <label>Itinerary Description</label>
                                <input
                                  type="text"
                                  name="itineraryName"
                                  className="form-control"
                                  value={itinerary.itineraryName}
                                  placeholder="Enter Itinerary Name"
                                  onChange={(e) =>
                                    handleinputchangeItinerary(e, i)
                                  }
                                />
                              </div>
                            

                              <div className="form-group col-md-2 mt-4">
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
                              
                              </div>
                              <div className="col-md-12">
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

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Summary
                    </label>
                    <div className="col-md-12">
                     <table className="table">
                      <thead>
                        <tr>
                        <td>Mode</td>
                        <td>Person</td>
                        <td>per Person Price</td>
                        <td>Total</td>
                        </tr>
                  
                      </thead>
                      <tbody>
                        {
                          isAirport && (
                            <tr>
                            <td>Flight</td>
                            <td>{numberOfGuest}</td>
                            <td><input type="text"   value={[perPersonAirPortPrice]}
                                onChange={(e) =>  {
                                  setPerPersonAirportPrice(e.target.value);
                                  setTotalPersonAirportPrice(numberOfGuest*e.target.value);
                                }}  /></td>
                            <td>{totalPersonAirPortPrice}</td>
                            </tr>
                       
                          )
                        }

{
                          island && (
                            <tr>
                              <td>Land</td>
                              <td>{numberOfGuest}</td>
                              <td><input type="text"   value={[perPersonLandPrice]}
                                  onChange={(e) => 
                                  {
                                    setPerPersonLandPrice(e.target.value);
                                    setTotalPersonLandPrice(numberOfGuest*e.target.value);
                                  }
                                  
                                 }  /></td>
                              <td>{totalPersonLandPrice}</td>
                              </tr>
                       
                          )
                        }

                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                             
                              </tr>
                        
                              <tr>
                              <td></td>
                              <td></td>
                              <td>Total</td>
                              <td>{amount}</td>
                             
                              </tr>
                      </tbody>
                     </table>
                    </div>
                  </div>
                  <div className="col-12">
                  <button     className='btn add-btn'> {isUpdateTour ? "Update":"Save"} </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddQuotation