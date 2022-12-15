import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  quotationAdd,
  quotationUpdate,
  setQuotationObj,
} from "../../../redux/features/quotation/quotationSlice";
import { tourGet, activeTourGet } from "../../../redux/features/tour/tourSlice";
import { clientGet } from "../../../redux/features/client/clientSlice";
import { toastError } from "../../../utils/toastUtils";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddQuotation = ({ show, setShow }) => {
  const { leadId } = useParams();

  const dispatch = useDispatch();
  const [destinationName, setDestinationName] = useState("");
  const [durationOfTour, setDurationOfTour] = useState(1);
  const [days, setDays] = useState(0);
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const tourValueArr = useSelector((state) => state.tour.tours);
  const quotationStateObj = useSelector(
    (state) => state.quotation.quotationObj
  );
  const clients = useSelector((state) => state.client.clientArr);
  const [noOfTravellerArray, setNoOfTravellerArray] = useState([
    { name: "", age: "", passengerType: "Adult", bed: "false", isNew: false },
  ]);
  const [isAirport, setIsAirport] = useState(false);
  const [island, setIsLand] = useState(false);
  const [perPersonLandPrice, setPerPersonLandPrice] = useState(0);
  const [perPersonAirPortPrice, setPerPersonAirportPrice] = useState(0);
  const [totalPersonLandPrice, setTotalPersonLandPrice] = useState(0);
  const [totalPersonAirPortPrice, setTotalPersonAirportPrice] = useState(0);
  const [quotationObject, setQuotationObject] = useState({});
  const [quotationId, setQuotationId] = useState("");
  const [clientsArr, setClientsArr] = useState([]);

  ////////traveler details
  const [numberofAdults, setNumberofAdults] = useState(0);
  const [numberOfChildrenWithBed, setNumberOfChildrenWithBed] = useState(0);
  const [numberOfChildrenWithoutBed, setNumberOfChildrenWithoutBed] =
    useState(0);
  const [numberOfInfants, setNumberOfInfants] = useState(0);

  const [visaRequired, setVisaRequired] = useState(false);
  ////
  const [termAndCondition, setTermAndCondition] = useState("");
  //////product details
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [isUpdateTour, setIsUpdateTour] = useState(false);
  const [tourArr, setTourArr] = useState([]);
  const [airportTransfer, setAirportTransfer] = useState("");
  const [travelList, setTravelList] = useState([
    { name: "", startDate: "", endDate: "" },
  ]);
  const [selectedLeadIdArr, setSelectedLeadIdArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpateDoc, setIsUpateDoc] = useState(false);
  // const [flightName, setFlightName] = useState("");
  // const [cost, setCost] = useState("");
  const [IsHotelDetailsRequired, setIsHotelDetailsRequired] = useState(false);
  const [IsFlightDetailsRequired, setIsFlightDetailsRequired] = useState(false);
  const [isItineraryDetailsRequired, setIsItineraryDetailsRequired] =
    useState(false);

  //hotels details
  const [itineraryList, setItineraryList] = useState([
    { day: "", itineraryName: "", itineraryHeading: "" },
  ]);

  const [hotelList, setHotelList] = useState([
    {
      hotelName: "",
      roomType: "",
      numberOfNight: 0,
      checkIn: "",
      checkOut: "",
      rating: 2,
      hotelAddress: "", // hotelAddress: "",
    },
  ]);
  const [flightList, setflightList] = useState([
    {
      flightName: "",
      cost: 0,
    },
  ]);
  useEffect(() => {
    // dispatch(tourGet({ "status"= statusOfTour }));
    // dispatch(tourGet());
    dispatch(activeTourGet());
    dispatch(clientGet());
    // dispatch(leadGetById(leadId));
    // console.log("teave", travelList.length)
  }, []);

  useEffect(() => {
    if (show == true) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [show]);

  useEffect(() => {
    if (quotationStateObj) {
      // console.log(quotationStateObj, "quotationStateObj213");
      setQuotationObject(quotationStateObj);
    }
  }, [quotationStateObj]);

  useEffect(() => {
    if (clients) {
      setClientsArr(clients);
    }
  }, [clients]);

  useEffect(() => {
    if (quotationObject && quotationObject._id) {
      console.log(quotationObject, "qoationboj----------");
      setQuotationId(quotationObject?._id);
      setDestinationName(quotationObject?.destinationName);
      setDurationOfTour(quotationObject?.durationOfTour);
      setNumberOfGuest(quotationObject?.numberOfGuest);
      setVisaRequired(quotationObject?.visa);
      setNoOfTravellerArray(quotationObject?.travelPassengerArr);
      setIsAirport(quotationObject?.isFlight);
      setIsLand(quotationObject?.isLand);
      setPerPersonLandPrice(quotationObject?.perPersonLandPrice);
      setPerPersonAirportPrice(quotationObject?.perPersonAirPortPrice);
      setTotalPersonAirportPrice(
        quotationObject?.numberOfGuest * quotationObject?.perPersonAirPortPrice
      );
      setTotalPersonLandPrice(
        quotationObject?.numberOfGuest * quotationObject?.perPersonLandPrice
      );
      setIsItineraryDetailsRequired(
        quotationObject?.itineraryDetails.length > 0 ? true : false
      );
      setIsHotelDetailsRequired(
        quotationObject?.hotelDetail.length > 0 ? true : false
      );
      setIsFlightDetailsRequired(
        quotationObject?.flightList.length > 0 ? true : false
      );
      setflightList(quotationObject?.flightList);
      setItineraryList(quotationObject?.itineraryDetails);
      setTravelList(quotationObject?.tourListArr);
      setHotelList(quotationObject?.hotelDetail);
      setAirportTransfer(quotationObject?.airportTransfer);
      setAmount(quotationObject?.amount);
      setTermAndCondition(quotationObject?.termAndCondition);
      setNumberofAdults(quotationObject?.travelPassengerObj?.noOfAdults);
      setNumberOfChildrenWithBed(
        quotationObject?.travelPassengerObj?.noOfChildrenWithBed
      );
      setNumberOfChildrenWithoutBed(
        quotationObject?.travelPassengerObj?.noOfChildrenWithoutBed
      );
      setIsUpdateTour(true);
      setNumberOfInfants(quotationObject?.travelPassengerObj?.noOfInfants);
      setTourArr(quotationObject?.tourListArr);
      setIsUpateDoc(true);
      // setFlightName(quotationObject?.flightName);
      // setFlightCost(quotationObject?.cost);

      // console.log(quotationObject.travelPassengerArr, "sadfsaf")
      // set(quotationObject.destinationName);
      // setDestinationName(quotationObject.destinationName);
    }
  }, [quotationObject]);

  useEffect(() => {
    // console.log(travelList, "tyuertret--------------------------------------------------------")
    if (tourValueArr && tourValueArr.length) {
      setTourArr(tourValueArr);
    }
  }, [tourValueArr, isUpdateTour]);

  useEffect(() => {
    let landPrice = 0;
    let AirportPrice = 0;
    let totalPersonLandPriceInt = parseInt(totalPersonLandPrice);
    let totalPersonAirPortPriceInt = parseInt(totalPersonAirPortPrice);

    if (totalPersonAirPortPriceInt && totalPersonAirPortPriceInt != NaN) {
      AirportPrice = totalPersonAirPortPriceInt;
    } else {
      AirportPrice = 0;
    }
    if (totalPersonLandPriceInt && totalPersonAirPortPriceInt != NaN) {
      landPrice = totalPersonLandPriceInt;
    } else {
      landPrice = 0;
    }

    // console.log(landPrice, "landPrice")
    // console.log(AirportPrice, "AirportPrice")
    let totalAmountPrice = landPrice + AirportPrice;
    setAmount(totalAmountPrice);
  }, [totalPersonAirPortPrice, totalPersonLandPrice]);

  useEffect(() => {
    let perPersonLandPriceInt = parseInt(perPersonLandPrice);
    let perPersonAirPortPriceInt = parseInt(perPersonAirPortPrice);
    if (numberOfGuest > 0) {
      if (
        perPersonLandPriceInt &&
        perPersonLandPriceInt != NaN &&
        perPersonAirPortPriceInt &&
        perPersonAirPortPriceInt != NaN
      ) {
        setTotalPersonAirportPrice(numberOfGuest * perPersonAirPortPriceInt);
        setTotalPersonLandPrice(numberOfGuest * perPersonLandPriceInt);
        let totalAmountPrice =
          numberOfGuest * (perPersonLandPriceInt + perPersonAirPortPriceInt);
        setAmount(totalAmountPrice);
      }
    }
  }, [numberOfGuest]);

  useEffect(() => {
    if (!isAirport) {
      setTotalPersonAirportPrice(0);
    }
    if (!island) {
      setTotalPersonLandPrice(0);
    }
  }, [island, isAirport]);

  // console.log(selectedTourIdArr, "selectedTourIdArr");
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

  const handleGuestIsNew = (value, index) => {
    const list = [...noOfTravellerArray];
    list[index]["isNew"] = value;
    // console.log(list, value, "selectedTourIdArrLidt");
    // console.log(index, value, "selectedTourIdArrLidt");

    setNoOfTravellerArray(list);
  };

  const handleRemoveTravel = (index) => {
    const list = [...travelList];
    list.splice(index, 1);
    setTravelList(list);
  };

  const handleinputchangeHotel = (e, index) => {
    let { name, value } = e.target;
    if (quotationObject && quotationObject._id) {
      ("use strict");
      // console.log(name, "name");
      let list = [...hotelList];
      let currentObj = Object.freeze(list[index]);
      currentObj = {
        hotelName: list[index].hotelName,
        roomType: list[index].roomType,
        numberOfNight: list[index].numberOfNight,
        checkIn: list[index].checkIn,
        checkOut: list[index].checkOut,
        rating: list[index].rating,
        hotelAddress: list[index].hotelAddress,
      };

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
        let checkInDate = new Date(currentObj["checkIn"]);
        let checkOutDate = new Date();
        checkOutDate.setDate(checkInDate.getDate() + parseInt(value));
        currentObj["checkOut"] = checkOutDate;
      }

      if (name == "checkIn") {
        let checkInDate = new Date(value);
        let checkOutDate = new Date(value);
        if (
          !currentObj["numberOfNight"] ||
          currentObj["numberOfNight"] == "0"
        ) {
          toastError("please enter number of nights");
          return;
        }
        checkOutDate.setDate(
          checkInDate.getDate() + parseInt(currentObj["numberOfNight"])
        );
        currentObj[name] = checkInDate;
        // console.log("checkedIn", checkInDate, "checkInDate")
        currentObj["checkOut"] = checkOutDate;
      }

      // console.log(list, "list");
      for (let el of list) {
        // console.log(el, "el");
        if (Date.parse(el.checkOut) < Date.parse(el.checkIn)) {
          toastError("check-Out wil be less than checkin ");
          return;
        }
      }
      currentObj[name] = value;

      if (!durationOfTour || durationOfTour == "" || durationOfTour == "0") {
        toastError("Please enter duration of tour");
        return;
      }
      if (
        list.reduce((acc, el) => acc + parseInt(el.numberOfNight), 0) >
        parseInt(durationOfTour)
      ) {
        toastError(
          "Total number of nights cannot be more than duration of tour"
        );
        return;
      }
      currentObj[name] = value;
      list[index] = currentObj;
      setHotelList([...list]);
    } else {
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

      if (name == "checkIn") {
        let checkInDate = new Date(value);
        let checkOutDate = new Date(value);
        if (
          !list[index]["numberOfNight"] ||
          list[index]["numberOfNight"] == "0"
        ) {
          toastError("please enter number of nights");
          return;
        }
        checkOutDate.setDate(
          checkInDate.getDate() + parseInt(list[index]["numberOfNight"])
        );
        list[index][name] = checkInDate;
        // console.log("checkedIn", checkInDate, "checkInDate")
        list[index]["checkOut"] = checkOutDate;
      }

      // console.log(list, "list");
      for (let el of list) {
        // console.log(el, "el");
        if (Date.parse(el.checkOut) < Date.parse(el.checkIn)) {
          toastError("check-Out wil be less than checkin ");
          return;
        }
      }
      list[index][name] = value;

      if (!durationOfTour || durationOfTour == "" || durationOfTour == "0") {
        toastError("Please enter duration of tour");
        return;
      }
      if (
        list.reduce((acc, el) => acc + parseInt(el.numberOfNight), 0) >
        parseInt(durationOfTour)
      ) {
        toastError(
          "Total number of nights cannot be more than duration of tour"
        );
        return;
      }

      setHotelList([...list]);
    }
    // setHotelList([...list]);
  };

  const handleinputchangeFlight = (e, index) => {
    let { name, value } = e.target;
    if (quotationObject && quotationObject._id) {
      ("use strict");
      // // console.log(name, "name");
      let list = [...flightList];
      let currentObj = Object.freeze(list[index]);
      currentObj = {
        flightName: list[index].flightName,
        cost: list[index].cost,
      };

      currentObj[name] = value;
      list[index] = currentObj;
      setflightList([...list]);
    } else {
      const list = [...flightList];

      const { name, value } = e.target;

      list[index][name] = value;
      setflightList([...list]);
    }
  };
  useEffect(() => {
    let amount = 0;
    if (flightList && flightList?.length > 0) {
      for (let el of flightList) {
        amount = parseInt(amount) + parseInt(el.cost);
      }
    }
    setPerPersonAirportPrice(amount);
    setTotalPersonAirportPrice(numberOfGuest * amount);
  }, [flightList]);

  const handleremoveFlight = (index) => {
    const list = [...flightList];
    list.splice(index, 1);
    setflightList(list);
  };

  const handleaddclickFlight = () => {
    let tempFlightArr = [...flightList];

    setflightList([
      ...tempFlightArr,
      {
        flightName: "",
        cost: 0,
      },
    ]);
  };
  // const handleinputchangeHotel = (e, index) => {
  //   const list = [...hotelList];

  //   const { name, value } = e.target;
  //   // // console.log(name, "name");
  //   if (name == "rating") {
  //     if (value > 6 || value < 1) {
  //       toastError("invalid rating, kindly provide valid rating");
  //       return;
  //     }
  //   }

  //   if (name == "numberOfNight") {
  //     if (value < "0" && value) {
  //       toastError(`Number of nights cannot be less than 0`);
  //       return;
  //     }
  //     let checkInDate = new Date(list[index]["checkIn"]);
  //     let checkOutDate = new Date();
  //     checkOutDate.setDate(checkInDate.getDate() + parseInt(value));
  //     list[index]["checkOut"] = checkOutDate;
  //   }

  //   if (name == "checkIn") {
  //     let checkInDate = new Date(value);
  //     let checkOutDate = new Date(value);
  //     if (
  //       !list[index]["numberOfNight"] ||
  //       list[index]["numberOfNight"] == "0"
  //     ) {
  //       toastError("please enter number of nights");
  //       return;
  //     }
  //     checkOutDate.setDate(
  //       checkInDate.getDate() + parseInt(list[index]["numberOfNight"])
  //     );
  //     list[index][name] = checkInDate;
  //     // console.log("checkedIn", checkInDate, "checkInDate")
  //     list[index]["checkOut"] = checkOutDate;
  //   }

  //   // console.log(list, "list");
  //   for (let el of list) {
  //     // console.log(el, "el");
  //     if (Date.parse(el.checkOut) < Date.parse(el.checkIn)) {
  //       toastError("check-Out wil be less than checkin ");
  //       return;
  //     }
  //   }
  //   list[index][name] = value;

  //   if (!durationOfTour || durationOfTour == "" || durationOfTour == "0") {
  //     toastError("Please enter duration of tour");
  //     return;
  //   }
  //   if (
  //     list.reduce((acc, el) => acc + parseInt(el.numberOfNight), 0) >
  //     parseInt(durationOfTour)
  //   ) {
  //     toastError("Total number of nights cannot be more than duration of tour");
  //     return;
  //   }

  //   setHotelList([...list]);
  // };

  const handleremoveHotel = (index) => {
    const list = [...hotelList];
    list.splice(index, 1);
    setHotelList(list);
  };

  const handleaddclickHotel = () => {
    let tempHotelArr = [...hotelList];

    setHotelList([
      ...tempHotelArr,
      {
        hotelName: "",
        roomType: "",
        numberOfNight: 0,
        checkIn: tempHotelArr[tempHotelArr.length - 1].checkOut,
        checkOut: "",
        rating: 2,
        hotelAddress: "", //  hotelAddress: "",
        bookingSource: "",
      },
    ]);
  };
  const handleaddGuestArray = () => {
    setNoOfTravellerArray([
      ...noOfTravellerArray,
      { name: "", age: "", passengerType: "Adult", bed: "false", isNew: false },
    ]);
  };

  const handleremoveGuest = (index) => {
    const list = [...noOfTravellerArray];
    list.splice(index, 1);
    setNoOfTravellerArray(list);
  };

  const handleinputchangeItinerary = (e, index) => {
    console.log(itineraryList, "itineraryList");
    if (itineraryList && isUpateDoc == true) {
      console.log("iiioop");
      ("use strict");
      let list = [...itineraryList];
      let currentObj = Object.freeze(list[index]);
      console.log(currentObj, "currentObj243");
      currentObj = {
        day: list[index].day,
        itineraryHeading: list[index].itineraryHeading,
        itineraryName: list[index].itineraryName,
      };
      const { name, value } = e.target;
      if (name == "day") {
        if (value > 7 || value < 1) {
          toastError("invalid day, kindly provide valid day");
        }
      }

      currentObj[name] = value;
      list[index] = currentObj;
      setItineraryList(list);
    } else {
      const { name, value } = e.target;
      if (name == "day") {
        if (value > 7 || value < 1) {
          toastError("invalid day, kindly provide valid day");
        }
      }
      const list = [...itineraryList];
      list[index][name] = value;
      setItineraryList(list);
    }
  };

  const handleremoveItinerary = (index) => {
    const list = [...itineraryList];
    list.splice(index, 1);
    setItineraryList(list);
  };

  const handleaddclickItinerary = () => {
    setItineraryList([
      ...itineraryList,
      { day: "", itineraryName: "", itineraryHeading: "" },
    ]);
  };

  const handleAddClickTour = () => {
    setTravelList([...travelList, { name: "", startDate: "", endDate: "" }]);
  };
  //tour
  // useEffect(() => {
  //   dispatch(leadGet());
  // }, []);

  const leadValueArr = useSelector((state) => state.lead.leadArr);
  // console.log(leadValueArr, "leadValueArr");

  const handleLeadValueChange = (e) => {
    setSelectedLeadIdArr(e);
  };

  const handleEnterNumberOfDays = (value) => {
    setDurationOfTour(value);
    setDays(parseInt(value) + 1);
    let itenaryArr = [];
    for (let i = 0; i < parseInt(value) + 1; i++) {
      itenaryArr.push({ day: i + 1, itineraryName: "", itineraryHeading: "" });
    }
    // if (isItineraryDetailsRequired) {
    setItineraryList([...itenaryArr]);
    // }
  };

  const handleTourValueChange = (e, index) => {
    let { name, value } = e.target;
    ("use strict");
    let tempList = [...travelList];
    // let totalAmount = 0;
    let currentObj = Object.freeze(tempList[index]);
    currentObj = {
      name: tempList[index].name,
      startDate: tempList[index].startDate,
      endDate: tempList[index].endDate,
    };

    currentObj[name] = value;
    tempList[index] = currentObj;
    setTravelList([...tempList]);
  };

  const clearFunc = () => {
    setDestinationName("");
    setDurationOfTour(1);
    setNumberOfGuest(1);
    setNoOfTravellerArray([
      { name: "", age: "", passengerType: "Adult", bed: "false", isNew: false },
    ]);
    setIsAirport(false);
    setIsLand(false);
    setNumberofAdults(0);
    setNumberOfChildrenWithBed(0);
    setNumberOfChildrenWithoutBed(0);
    setNumberOfInfants(0);
    dispatch(setQuotationObj({}));

    setTermAndCondition("");
    //////product details
    setAmount(0);
    setTax(0);
    setIsUpdateTour(false);
    setAirportTransfer("");
    setTravelList([{ name: "", startDate: "", endDate: "" }]);
    setShowModal(false);
    setHotelList([
      {
        hotelName: "",
        roomType: "",
        numberOfNight: 0,
        checkIn: "",
        checkOut: "",
        rating: 2,
        hotelAddress: "", // hotelAddress: "",
      },
    ]);
    setIsFlightDetailsRequired(false);
    setIsHotelDetailsRequired(false);
    setIsItineraryDetailsRequired(false);
    setItineraryList([{ day: "", itineraryName: "" }]);
    setflightList([{ flightName: "", cost: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destinationName == "") {
      toastError("Destination name is mandatory");
      return;
    }
    if (numberOfGuest == "") {
      toastError("Number Of Guest is mandatory");
      return;
    }
    if (travelList[0]?.name == "") {
      toastError("Tour Name is mandatory");
      return;
    } else if (travelList[0]?.startDate == "") {
      toastError("Tour Start Date is mandatory");
      return;
    } else if (travelList[0]?.endDate == "") {
      toastError("Tour End Date is mandatory");
      return;
    }
    if (durationOfTour <= 0) {
      toastError("Tour Duration is mandatory");
      return;
    } else if (numberOfGuest <= 0) {
      toastError("Total Number of Guest is mandatory");
      return;
    } else if (numberofAdults <= 0) {
      toastError("Number Of Adult is mandatory");
      return;
    }
    // else
    if (IsHotelDetailsRequired) {
      if (hotelList[0]?.hotelName == "") {
        toastError("Hotel Name is mandatory");
        return;
      } else if (hotelList[0]?.roomType == "") {
        toastError("Hotel Room type is mandatory");
        return;
      }
    }

    if (IsFlightDetailsRequired) {
      if (flightList[0]?.flightName == "") {
        toastError("Flight Name is mandatory");
        return;
      } else if (flightList[0]?.cost == "") {
        toastError("Flight Cost is mandatory");
        return;
      }
    }
    if (isItineraryDetailsRequired) {
      if (itineraryList[0]?.itineraryName == "") {
        toastError("Itinerary Description is mandatory");
        return;
      } else if (itineraryList[0]?.itineraryHeading == "") {
        toastError("Itinerary Heading  is mandatory");
        return;
      }
    }
    // setTotalPersonAirportPrice
    // let result = flightList.map(({ cost }) => cost);
    var vals = 0;
    for (var item of flightList) {
      vals = parseInt(vals) + parseInt(item.cost);
    }
    console.log(vals, "vals");
    // console.log(result, "result23");
    // let getFlightCost = result.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0
    // );
    // console.log(getFlightCost, "getFlight213");
    if (totalPersonAirPortPrice < vals) {
      toastError("total flight cost cannot be less then flight price ");
      return;
    }
    // if (adultCount == "") {
    //   toastError("Adult Count is mandatory");
    //   return;
    // }
    let obj = {
      destinationName,
      durationOfTour,
      numberOfGuest,
      travelPassengerObj: {
        noOfAdults: numberofAdults,
        noOfChildrenWithBed: numberOfChildrenWithBed,
        noOfChildrenWithoutBed: numberOfChildrenWithoutBed,
        noOfInfants: numberOfInfants,
      },
      tourListArr: travelList,
      visa: visaRequired,
      airportTransfer,
      leadId,
      isFlight: isAirport,
      isLand: island,
      perPersonAirPortPrice,
      perPersonLandPrice,
      amount,
      termAndCondition,
    };

    if (IsHotelDetailsRequired) {
      obj.hotelList = hotelList;
    }
    if (IsFlightDetailsRequired) {
      obj.flightList = flightList;
    }
    if (isItineraryDetailsRequired) {
      obj.itineraryList = itineraryList;
    }

    console.log(obj, "234234");
    if (!isUpdateTour) {
      dispatch(quotationAdd(obj));
      setShow(false);
      // window.location.reload();
      clearFunc();
    } else {
      dispatch(quotationUpdate({ obj, quotationId }));
      setShow(false);
      // window.location.reload();
      clearFunc();
    }
    // console.log(obj, "send Obj9");
  };
  const options = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];

  const handletravelersSelect = (value, setterFunctionName) => {
    if (!numberOfGuest || numberOfGuest == "" || numberOfGuest == "0") {
      toastError("Please add number of guests first");
      return;
    }
    if (setterFunctionName == "numberofAdults") {
      if (
        parseInt(value) +
          parseInt(numberOfChildrenWithBed) +
          parseInt(numberOfChildrenWithoutBed) +
          parseInt(numberOfInfants) >
        parseInt(numberOfGuest)
      ) {
        toastError(
          "Total Number of guests cannot be more than number of guests ('Please check Number of Adults,Number Of Children With Bed, Number Of Children Without Bed, Number Of Infants')"
        );
        return;
      }
      setNumberofAdults(value);
    } else if (setterFunctionName == "numberOfChildrenWithBed") {
      if (
        parseInt(numberofAdults) +
          parseInt(value) +
          parseInt(numberOfChildrenWithoutBed) +
          parseInt(numberOfInfants) >
        parseInt(numberOfGuest)
      ) {
        toastError(
          "Total Number of guests cannot be more than number of guests ('Please check Number of Adults,Number Of Children With Bed, Number Of Children Without Bed, Number Of Infants')"
        );
        return;
      }
      setNumberOfChildrenWithBed(value);
    } else if (setterFunctionName == "numberOfChildrenWithoutBed") {
      if (
        parseInt(numberofAdults) +
          parseInt(numberOfChildrenWithBed) +
          parseInt(value) +
          parseInt(numberOfInfants) >
        parseInt(numberOfGuest)
      ) {
        toastError(
          "Total Number of guests cannot be more than number of guests ('Please check Number of Adults,Number Of Children With Bed, Number Of Children Without Bed, Number Of Infants')"
        );
        return;
      }
      setNumberOfChildrenWithoutBed(value);
    } else {
      if (
        parseInt(numberofAdults) +
          parseInt(numberOfChildrenWithBed) +
          parseInt(numberOfChildrenWithoutBed) +
          parseInt(value) >
        parseInt(numberOfGuest)
      ) {
        toastError(
          "Total Number of guests cannot be more than number of guests ('Please check Number of Adults,Number Of Children With Bed, Number Of Children Without Bed, Number Of Infants')"
        );
        return;
      }
      setNumberOfInfants(value);
    }
  };

  useEffect(() => {}, [
    numberofAdults,
    numberOfChildrenWithBed,
    numberOfChildrenWithoutBed,
    numberOfInfants,
    numberOfGuest,
  ]);

  return (
    <div id="add_quote" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title">
              {isUpdateTour ? "Edit" : "Add"} Quote
            </h5>
            <button
              type="button"
              className="close"
data-bs-dismiss="modal"
aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button> */}
          </div>
          {/* <div className="modal-body"> */}
          <Modal size="lg" show={show}>
            <Modal.Header>
              <Modal.Title>{isUpdateTour ? "Edit" : "Add"} Quote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <form onSubmit={handleSubmit}> */}
              <form>
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

                  <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4">Tour Details </h3>
                      </div>
                      {/* {console.log(tourArr, "travel,23")} */}
                      {travelList &&
                        travelList.map((item, index) => {
                          return (
                            <div className="row" key={index}>
                              <div className="col-md-4 mb-3">
                                <label className="col-form-label ">
                                  Tour <span className="text-danger">*</span>
                                </label>

                                <select
                                  className="form-control"
                                  name="name"
                                  value={item?.name}
                                  onChange={(e) =>
                                    handleTourValueChange(e, index)
                                  }
                                >
                                  <option value="" disabled>
                                    --select an option--
                                  </option>
                                  {tourArr &&
                                    tourArr.length > 0 &&
                                    tourArr.map((el, inde) => (
                                      <option key={inde} value={el.name}>
                                        {el.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <div className="col-md-4">
                                <label className="col-form-label ">
                                  Start Date
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={item.startDate}
                                    onChange={(e) =>
                                      handleTourValueChange(e, index)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label className="col-form-label ">
                                  {/* Expiration Date */}
                                  Tour End Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={item.endDate}
                                    onChange={(e) =>
                                      handleTourValueChange(e, index)
                                    }
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
                          );
                        })}
                    </div>
                  </div>

                  <div className=" form-group col-md-6">
                    <label className="col-form-label ">
                      Duration Of Tour <span className="text-danger">*</span>{" "}
                      (in Nights) (
                      {`${durationOfTour ? durationOfTour : 0}N/${
                        days ? days : 0
                      }D`}
                      )
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={durationOfTour}
                      onChange={(e) => {
                        handleEnterNumberOfDays(e.target.value);
                      }}
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
                </div>

                <div className="content">
                  <div className="row">
                    <div className="col-sm-12">
                      <h3 className="mt-3 mb-4 ">Traveller Details</h3>
                      <div className="row">
                        <div className="col-3">
                          <label className="col-form-label ">
                            Adults
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            value={parseInt(numberofAdults)}
                            onChange={(e) => {
                              console.log(e.target.value, "value");
                              handletravelersSelect(
                                e.target.value,
                                "numberofAdults"
                              );
                            }}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>
                        <div className="col-3">
                          <label className="col-form-label ">
                            Children with Bed
                            {/* <span className="text-danger">*</span> */}
                          </label>
                          <select
                            className="form-control"
                            value={parseInt(numberOfChildrenWithBed)}
                            onChange={(e) => {
                              handletravelersSelect(
                                e.target.value,
                                "numberOfChildrenWithBed"
                              );
                            }}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>
                        <div className="col-3">
                          <label className="col-form-label ">
                            Children without Bed
                            {/* <span className="text-danger">*</span> */}
                          </label>
                          <select
                            className="form-control"
                            value={parseInt(numberOfChildrenWithoutBed)}
                            onChange={(e) => {
                              handletravelersSelect(
                                e.target.value,
                                "numberOfChildrenWithoutBed"
                              );
                            }}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>
                        <div className="col-3">
                          <label className="col-form-label ">
                            Infants
                            {/* <span className="text-danger">*</span> */}
                          </label>
                          <select
                            className="form-control"
                            value={parseInt(numberOfInfants)}
                            onChange={(e) => {
                              handletravelersSelect(
                                e.target.value,
                                "numberOfInfants"
                              );
                            }}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-6 mt-5">
                  <label className="text-danger ">
                    Hotel Details Required
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="checkbox"
                    name="IsHotelDetailsRequired"
                    style={{ marginLeft: 10 }}
                    value={IsHotelDetailsRequired}
                    checked={IsHotelDetailsRequired}
                    onChange={(e) => {
                      setIsHotelDetailsRequired(!IsHotelDetailsRequired);
                    }}
                  />
                </div>
                {IsHotelDetailsRequired && (
                  <div className="content">
                    <h3 className="mt-3 mb-4 ">Hotel details</h3>
                    {hotelList &&
                      hotelList.map((hotel, i) => {
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
                              <label>Rating</label>
                              <select
                                className="form-control"
                                name="rating"
                                value={parseInt(hotel.rating)}
                                onChange={(e) => handleinputchangeHotel(e, i)}
                              >
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                            </div>

                            <div className="form-group col-md-4">
                              <label> Check In </label>
                              <input
                                type="date"
                                // type="text"
                                name="checkIn"
                                value={`${moment(hotel.checkIn).format(
                                  "YYYY-MM-DD"
                                )}`}
                                className="form-control"
                                onChange={(e) => handleinputchangeHotel(e, i)}
                              />
                            </div>

                            <div className="form-group col-md-4">
                              <label> Number Of Night</label>
                              <input
                                type="number"
                                name="numberOfNight"
                                value={`${hotel.numberOfNight}`}
                                className="form-control"
                                onChange={(e) => handleinputchangeHotel(e, i)}
                              />
                            </div>

                            <div className="form-group col-md-4">
                              <label> Check Out </label>
                              <input
                                type="date"
                                // type="text"
                                name="checkOut"
                                value={`${moment(hotel.checkOut).format(
                                  "YYYY-MM-DD"
                                )}`}
                                disabled
                                className="form-control"
                                onChange={(e) => handleinputchangeHotel(e, i)}
                              />
                            </div>

                            {/* <div className="form-group col-md-4">
                          <label>Hotel Address</label>
                          <input
                            type="text"
                            name="hotelAddress"
                            className="form-control"
                            value={hotel.hotelAddress}
                            onChange={(e) => handleinputchangeHotel(e, i)}
                          />
                        </div> */}
                            <div className="form-group col-md-4">
                              <label>Hotel Address</label>
                              <input
                                type="text"
                                name="hotelAddress"
                                className="form-control"
                                value={hotel?.hotelAddress}
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
                            {durationOfTour &&
                            hotelList.reduce(
                              (acc, el) => acc + parseInt(el.numberOfNight),
                              0
                            ) < durationOfTour ? (
                              <div className="col-md-12">
                                {/* {hotelList.length - 1 === i && ( */}
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={handleaddclickHotel}
                                >
                                  Add More
                                </button>
                                {/* )} */}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className="form-group col-md-6 mt-5">
                  <label className="text-danger ">
                    Flight Details Required
                  </label>
                  <input
                    type="checkbox"
                    name="IsFlightDetailsRequired"
                    style={{ marginLeft: 10 }}
                    value={IsFlightDetailsRequired}
                    checked={IsFlightDetailsRequired}
                    onChange={(e) => {
                      setIsFlightDetailsRequired(!IsFlightDetailsRequired);
                      setIsAirport(!isAirport);
                    }}
                  />
                </div>
                {IsFlightDetailsRequired && (
                  <div className="content">
                    <h3 className="mt-3 mb-4 ">Flight details</h3>
                    {flightList &&
                      flightList.map((flight, i) => {
                        return (
                          <div className="row mb-3" key={i}>
                            <div className="form-group col-md-4">
                              <label>Flight Name</label>
                              <input
                                type="text"
                                name="flightName"
                                className="form-control"
                                placeholder="Name"
                                value={flight?.flightName}
                                onChange={(e) => handleinputchangeFlight(e, i)}
                              />
                            </div>

                            <div className="form-group col-md-4">
                              <label>Flight Cost </label>
                              <input
                                type="number"
                                name="cost"
                                className="form-control"
                                value={flight?.cost}
                                onChange={(e) => handleinputchangeFlight(e, i)}
                              />
                            </div>

                            <div className="form-group col-md-2 mt-4">
                              {flightList.length !== 1 && (
                                <button
                                  type="button"
                                  // className="btn btn-success"
                                  className="btn btn-danger mx-1"
                                  onClick={() => handleremoveFlight(i)}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="col-md-12">
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleaddclickFlight()}
                              >
                                Add More
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                <div className="row">
                  <div className="form-group col-3">
                    <label className="col-form-label ">
                      Visa Required
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <select
                      className="form-control"
                      value={visaRequired}
                      onChange={(e) => {
                        setVisaRequired(e.target.value);
                      }}
                    >
                      <option value="Visa is required">Visa is Required</option>
                      <option value="Visa not Required">
                        Visa not Required
                      </option>
                      <option value="Visa on Arrival">Visa on Arrival</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-md-3">
                    Airport Transfer
                  </label>
                  <div className="col-md-9">
                    <select
                      className="form-control"
                      value={airportTransfer}
                      onChange={(e) => {
                        setAirportTransfer(e.target.value);
                      }}
                    >
                      <option value="Private">Private</option>
                      <option value="Seat in coach basis">
                        Seat in coach basis
                      </option>
                      <option value="Private + Seat in coach basis">
                        Private + Seat in coach basis
                      </option>
                    </select>
                    {/* <input
                    type="text"
                    className="form-control"
                    value={airportTransfer}
                    onChange={(e) => setAirportTransfer(e.target.value)}
                  /> */}
                  </div>
                </div>
                <div className="form-group col-md-6 mt-5">
                  <label className="text-danger ">
                    Itinerary Details Required
                  </label>
                  <input
                    type="checkbox"
                    name="isItineraryDetailsRequired"
                    style={{ marginLeft: 10 }}
                    value={isItineraryDetailsRequired}
                    checked={isItineraryDetailsRequired}
                    onChange={() => {
                      setIsItineraryDetailsRequired(
                        !isItineraryDetailsRequired
                      );
                    }}
                  />
                </div>
                {isItineraryDetailsRequired && (
                  <div className="content">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="mt-3 mb-4">Itinerary Details</h3>
                        {itineraryList &&
                          itineraryList.map((itinerary, i) => {
                            return (
                              <div className="row mb-3" key={i}>
                                <div className="form-group col-md-1">
                                  <label>Day </label>
                                  <div style={{ paddingTop: 10 }}>
                                    {itinerary.day}
                                  </div>
                                </div>
                                <div className="form-group col-md-5">
                                  <label>Itinerary Heading</label>
                                  <input
                                    type="text"
                                    name="itineraryHeading"
                                    className="form-control"
                                    value={itinerary.itineraryHeading}
                                    placeholder="Enter Itinerary Heading"
                                    onChange={(e) =>
                                      handleinputchangeItinerary(e, i)
                                    }
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Itinerary Description</label>
                                  <textarea
                                    type="text"
                                    name="itineraryName"
                                    className="form-control"
                                    value={itinerary.itineraryName}
                                    placeholder="Enter Itinerary Description"
                                    onChange={(e) =>
                                      handleinputchangeItinerary(e, i)
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}
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
                <div className="form-group col-md-6">
                  <label className="col-form-label ">
                    Flight
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="checkbox"
                    name="IsAirport"
                    style={{ marginLeft: 10 }}
                    value={isAirport}
                    checked={isAirport}
                    onChange={(e) => {
                      setIsAirport(!isAirport);
                    }}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label className="col-form-label ">
                    Land Packages
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="checkbox"
                    name="Island"
                    style={{ marginLeft: 10 }}
                    value={island}
                    checked={island}
                    onChange={(e) => {
                      setIsLand(!island);
                    }}
                  />
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-md-2">Summary</label>
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <td>Mode</td>
                          <td>Person</td>
                          <td>Per Person Price</td>
                          <td>Total</td>
                        </tr>
                      </thead>
                      <tbody>
                      {isAirport && (
                          <tr>
                            <td>Flight</td>
                            <td>{numberOfGuest}</td>
                            <td>
                              <input
                                readOnly
                                type="text"
                                value={[perPersonAirPortPrice]}
                                onChange={(e) => {
                                  setPerPersonAirportPrice(e.target.value);
                                  setTotalPersonAirportPrice(
                                    numberOfGuest * e.target.value
                                  );
                                }}
                              />
                            </td>
                            <td>{totalPersonAirPortPrice}</td>
                          </tr>
                        )}

                        {island && (
                          <tr>
                            <td>Land Package</td>
                            <td>{numberOfGuest}</td>
                            <td>
                              <input
                                type="text"
                                value={[perPersonLandPrice]}
                                onChange={(e) => {
                                  setPerPersonLandPrice(e.target.value);
                                  setTotalPersonLandPrice(
                                    numberOfGuest * e.target.value
                                  );
                                }}
                              />
                            </td>
                            <td>{totalPersonLandPrice}</td>
                          </tr>
                        )}

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
                {/* <div className="col-12">
                  <button
                    className="btn add-btn"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    {" "}
                    {isUpdateTour ? "Update" : "Save"}{" "}
                  </button>
                </div> */}
                {/*
              <div className="col-12">
                <button
                  data-bs-dismiss="modal"
                  className="btn add-btn"
                  onClick={handlePerfomaInvoiceSubmit}
                >
                  {" "}
                  Save{" "}
                </button>
              </div> */}
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShow(false);
                  // window.location.reload();
                  clearFunc();
                }}
              >
                Close
              </Button>
              <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                {isUpdateTour ? "Edit" : "Add"} Quote
              </Button>
            </Modal.Footer>
          </Modal>
          {/* </div> */}
        </div>
      </div>
      {/* <Quotation changeStatus={show} /> */}
    </div>
  );
};

export default AddQuotation;
