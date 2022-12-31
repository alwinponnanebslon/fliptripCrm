import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { images } from "./Utility/Images";
import moment from "moment";
import { generateFilePath } from "../../utils/FileURL";
import { Image } from "antd";

function Index() {
  const toursResultArr = useSelector((state) => state.tour.tours);
  const role = useSelector((state) => state.auth.role);

  const quotationObj = useSelector((state) => state.quotation.quotationObj);

  const [QuotationObj, setQuotationObj] = useState({});

  useEffect(() => {
    // alert("asd");
    // console.log(quotationObj, "quotationObj");
    if (quotationObj) {
      // console.log(quotationObj, "213quotationObj");
      setQuotationObj(quotationObj);
    }
  }, [quotationObj]);

  useEffect(() => {
    let temp = localStorage.getItem("quotationPdf");
    temp = JSON.parse(temp);
    setQuotationObj(temp);
  }, []);
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   let temp = new jsPDF("portrait", 'pt', 'a4');
  //   //   temp.html(document.getElementById("main"), {
  //   //     callback: function (pdf) {
  //   //       pdf.save()
  //   //     }
  //   //   })

  //   // html2canvas(document.getElementById("main")).then(function (canvas) {
  //   //   let temp = canvas.toDataURL('application/pdf');
  //   //   // console.log(temp, "temp")
  //   // });
  //   // }, 3000)
  // }, [])

  const getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }

    return dateArray.map((el, index) => {
      return <li key={index}>{new Date(el).toDateString()}</li>;
    });
  };

  return (
    <main id="mainPdfContainer">
      <section className="top-banner mb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <div className="left">
                <div className="image">
                  <img src={images.top_left} alt="" />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="right">
                <div className="d-flex align-items-end justify-content-between right-top">
                  <img src={images.logo} alt="" className="main-logo" />
                  <ul>
                    <li>
                      <h5>
                        TRIP ID :
                        {/* <span className="pink fw-bold">{QuotationObj._id}</span> */}
                        <span className="pink fw-bold">
                          {QuotationObj?.leadObj?.uniqueTripId
                            ? QuotationObj?.leadObj?.uniqueTripId
                            : QuotationObj?._id}
                        </span>
                      </h5>
                    </li>
                    <li>As quoted on</li>
                    <li>
                      <h5 className="mb-0">
                        {new Date(QuotationObj?.createdAt).toDateString()},
                        {new Date(QuotationObj?.createdAt).getHours()}:
                        {new Date(QuotationObj?.createdAt).getMinutes()}
                      </h5>
                    </li>
                  </ul>
                </div>
                <div className="right-middle">
                  <div className="destination">
                    <h2 className="text-white">
                      {QuotationObj?.leadObj?.clientObj?.name}
                    </h2>
                    <h2 className="text-white">
                      {QuotationObj?.destinationName}
                    </h2>
                  </div>
                  <ul className="dot-line">
                    <li>
                      <div className="dot"></div>
                    </li>
                    <li>
                      <div className="line"></div>
                    </li>
                    <li>
                      <div className="dot"></div>
                    </li>
                  </ul>
                  <ul className="detail list-circle">
                    <li>
                      {QuotationObj?.durationOfTour} N
                      {parseInt(QuotationObj?.durationOfTour) + 1} D
                    </li>
                    <li>{QuotationObj?.numberOfGuest} Passengers</li>
                    <li>
                      {QuotationObj?.tourListArr &&
                        QuotationObj?.tourListArr.length > 0 &&
                        new Date(
                          QuotationObj?.tourListArr[0]?.startDate
                        ).toDateString()}
                    </li>
                  </ul>
                  {/* <p className="desp">
                    We are not making any holding on below mentioned as of now.
                    Flight prices are subject to availability at the time of
                    booking
                  </p> */}
                  <p className="desp">
                    Prices of Flights and hotels are subject to availability
                    {/* Flight prices are subject to availability at the time of */}
                    {/* booking */}
                  </p>
                  <button className="btn pink-bg text-white btn-lg px-4">
                    ₹ {QuotationObj?.amount?.toLocaleString("en-IN")}
                    {/* ₹ {QuotationObj?.amount?.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")} */}
                    {/* ₹ {QuotationObj?.amount} */}
                  </button>
                </div>
                <ul className="right-bottom whatsapp-gmail">
                  <li>
                    <img src={images.whatsapp} alt="" />
                    {/* +91 9310 985 146 */}
                    {QuotationObj?.agentObj?.phone
                      ? QuotationObj?.agentObj?.phone
                      : "+91 9310 985 146"}
                  </li>
                  <li>
                    <img src={images.gmail} alt="" />
                    {/* sales15.nitsaholidays@gmail.com */}
                    {QuotationObj?.agentObj?.email
                      ? QuotationObj?.agentObj?.email
                      : " sales15.nitsaholidays@gmail.com "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {  console} */}
      {/* 
      
      
      */}
      <section className="payment-detail mb-80">
        <div className="container">
          <h1 className="fw-bold text-center mb-5 heading">Destination</h1>
          {QuotationObj &&
            QuotationObj?.tourListArr &&
            QuotationObj?.tourListArr.length > 0 &&
            QuotationObj?.tourListArr.map((el, i) => {
              let str = el?.destinationObj?.description.split(/[.;]/g);
              return (
                <div className="row" key={i}>
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">
                          {el.name} Description
                        </h4>
                        <div className="row">
                          <div className="col-12 ">
                            <ul className="list-circle">
                              {str.map((le, i) => {
                                // console.log(le,"llel")
                                return <li key={i}>{le}.</li>;
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      {/* 
      
      
      
      
      
      */}
      <section className="summary mb-80">
        <div className="container">
          <h1 className="fw-bold text-center mb-5">Summary</h1>
          <ul>
            {QuotationObj?.hotelDetail?.length > 0 && (
              <li>
                <div className="box">
                  <div className="icon">
                    <img src={images.hotel} alt="" />
                  </div>
                  <h4>Hotel</h4>
                </div>
              </li>
            )}
            {QuotationObj?.flightList?.length > 0 && (
              <li>
                <div className="box">
                  <div className="icon">
                    <img src={images.flight} alt="" />
                  </div>
                  <h4>Flights</h4>
                </div>
              </li>
            )}
            <li>
              <div className="box">
                <div className="icon">
                  <img src={images.activity} alt="" />
                </div>
                <h4>Activity</h4>
              </div>
            </li>
            <li>
              <div className="box">
                <div className="icon">
                  <img src={images.transfer} alt="" />
                </div>
                <h4>Transfers</h4>
              </div>
            </li>
            {QuotationObj?.visaRequired == true && (
              <li>
                <div className="box">
                  <div className="icon">
                    <img src={images.visa} alt="" />
                  </div>
                  <h4>Visa</h4>
                </div>
              </li>
            )}
          </ul>
        </div>
      </section>
      {/* {QuotationObj?.perPersonAirPortPrice > 0 || QuotationObj?.perPersonLandPrice > 0 && */}
      <section className="flight-table">
        <div className="container">
          <table className="table table-borderless align-middle">
            <thead className="purple-bg text-white">
              <tr>
                <th scope="col" className="fw-normal">
                  DETAILS
                </th>
                <th scope="col" className="fw-normal">
                  PER PAX (₹)
                </th>
                <th scope="col" className="fw-normal">
                  TOTAL (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {QuotationObj?.perPersonAirPortPrice > 0 && (
                <tr>
                  <td>FLIGHT</td>
                  <td>{QuotationObj?.perPersonAirPortPrice}</td>
                  <td>
                    {parseInt(QuotationObj?.perPersonAirPortPrice) *
                      parseInt(QuotationObj?.numberOfGuest)}
                  </td>
                </tr>
              )}
              {QuotationObj?.perPersonLandPrice > 0 && (
                <tr>
                  <td>LAND</td>
                  <td>{QuotationObj?.perPersonLandPrice}</td>
                  <td>
                    {parseInt(QuotationObj?.perPersonLandPrice) *
                      parseInt(QuotationObj?.numberOfGuest)}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>TOTAL</td>
                <td>
                  {parseInt(QuotationObj?.perPersonAirPortPrice) *
                    parseInt(QuotationObj?.numberOfGuest)}
                </td>
                <td>
                  {parseInt(QuotationObj?.perPersonLandPrice) *
                    parseInt(QuotationObj?.numberOfGuest)}
                </td>
              </tr>
            </tfoot>
          </table>
          <ul className="amount mb-0">
            <li>
              <h4>Total cost including taxes and above</h4>
              <h4 className="pink fw-semibold m-0">
                ₹ {QuotationObj?.amount?.toLocaleString("en-IN")}
                {/* ₹ {QuotationObj?.amount} */}
                {/* ₹ {QuotationObj?.amount?.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")} */}
              </h4>
            </li>
            <li>
              <button className="btn pink-bg text-white btn-lg px-4">
                Pay Now
              </button>
            </li>
          </ul>
        </div>
      </section>
      {/* } */}
      <div className="desp purple-bg py-2 px-4 my-5">
        {/* <p className="text-white m-0 text-center">
          We are not making any holding on above as of now. Flight prices are
          also subject to availability at the time of booking.
        </p> */}
        <p className="text-white m-0 text-center">
          Prices of Flights and hotels are subject to availability
        </p>
        {/* <p className="text-white m-0 text-center">
          As quoted on {new Date(QuotationObj?.createdAt).toDateString()}{" "}
          {new Date(QuotationObj?.createdAt).getHours()}:
          {new Date(QuotationObj?.createdAt).getMinutes()}
        </p> */}
      </div>

      <section className="inclusions">
        <div className="container">
          <h1 className="fw-bold text-center mb-5">Inclusions</h1>
          <div className="row">
            <div className="col-12">
              <div className="box">
                <h4 className="purple bg-white">Tours</h4>
                <ul className="list-circle">
                  {QuotationObj?.tourListArr &&
                    QuotationObj?.tourListArr.length > 0 &&
                    QuotationObj?.tourListArr.map((el, index) => {
                      return (
                        <li key={index}>
                          {el.name} ({new Date(el.startDate).toDateString()})
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            {/* <div className="col-12">
              <div className="box">
                <h4 className="purple bg-white">Tours & Transfers</h4>
                <ul className="list-circle">
                  <li>SIC : Dubai Trio (City tour/ Dhow Creek/ Desert Safari)</li>
                  <li>Private :</li>
                </ul>
              </div>
            </div> */}
            {/* <div className="col-12">
              <div className="box">
                <h4 className="purple bg-white">Inclusions</h4>
                <ul className="list-circle">
                  <li>Breakfast included in above mentioned Orchid Dubai hotel</li>
                  <li>
                    Dubai City Tour / Desert Safari with Dinner / Dow Cruise - Diera
                    Port
                  </li>
                  <li>04 Nights stay in same hotel with Breakfats</li>
                  <li>Dubai Airport pick up and Drop with Privet Car</li>
                  <li>Dubai city tour with pick up and Drop from hotel SIC</li>
                  <li>
                    Desert safari with BBQ Dinner with pick up and Drop from hotel
                    SIC
                  </li>
                  <li>
                    Dhow Cruise with Dinner with pick up and Drop from hotel SIC
                  </li>
                  <li>Dubai Visa with Insurance</li>
                </ul>
              </div>
            </div> */}
            {QuotationObj?.visaRequired && (
              <div className="col-12">
                <div className="box">
                  <h4 className="purple bg-white">Visa</h4>
                  <ul className="list-circle">
                    {QuotationObj?.visOnArrival ? (
                      <li>Visa cost also included in the package</li>
                    ) : (
                      <li>Visa cost not included in the package</li>
                    )}
                    {/* <li>Visa Details : Dubai Visa With Insurance for 3 people</li> */}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {QuotationObj &&
        QuotationObj?.flightList &&
        QuotationObj?.flightList?.length > 0 && (
          <section className="flights ptb-80">
            <div className="container">
              <h1 className="fw-bold text-center mb-5">Flights</h1>
              <div className="top">
                {/* <p>SpiceJetSG 11SFDEL (07:50)</p> */}
                <img src={images.plane} alt="" className="plane" />
              </div>
              <div className="position-relative">
                <div className="row">
                  {QuotationObj?.flightList &&
                    QuotationObj?.flightList &&
                    QuotationObj?.flightList.length > 0 &&
                    QuotationObj?.flightList
                      .filter((el, index, arr) => arr.length - 1 != index)
                      .map((el, index, arr) => {
                        return (
                          <div className="col-12" key={index}>
                            <div
                              className={index % 2 == 0 ? "box" : "box reverse"}
                            >
                              <h6>
                                <img src={images.location} alt="" />
                                {el?.flightName} {index % 2}
                              </h6>
                            </div>
                          </div>
                        );
                      })}

                  {QuotationObj?.flightList &&
                    QuotationObj?.flightList?.length > 0 &&
                    QuotationObj?.flightList[
                      QuotationObj?.flightList.length - 1
                    ] && (
                      <div className="destination">
                        <h6>
                          {
                            QuotationObj?.flightList[
                              QuotationObj?.flightList.length - 1
                            ]?.flightName
                          }
                          <img src={images.location} alt="" />
                        </h6>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </section>
        )}
      {QuotationObj &&
        QuotationObj?.hotelDetail &&
        QuotationObj?.hotelDetail?.length > 0 && (
          <section className="hotels">
            <div className="container">
              <h1 className="fw-bold text-center mb-5">Hotels</h1>

              {QuotationObj?.hotelDetail &&
                QuotationObj?.hotelDetail?.length > 0 &&
                QuotationObj?.hotelDetail.map((el, index) => {
                  return (
                    <div className="row align-items-center" key={index}>
                      <div className="col-12 col-md-8">
                        <div className="left">
                          <ul>
                            <li className="box">
                              <img src={images.room} alt="" />
                              <div>
                                <h4>{el?.hotelName} / 1 Rooms</h4>
                                <h5>
                                  {el?.hotelAddress}
                                  <p>
                                    ({el?.numberOfNight} Night Stay){" "}
                                    {el?.rating ? `Rating : ${el?.rating}` : ""}{" "}
                                  </p>
                                  {/* {el?.rating && (
                                    <p>
                                      (Rating : {el.rating ? el.rating : ""} )
                                    </p>
                                  )} */}
                                </h5>
                              </div>
                            </li>
                            <li className="box">
                              <img src={images.check_in} alt="" />
                              <div>
                                <h4>Check In</h4>
                                <p>{new Date(el.checkIn).toDateString()}</p>
                              </div>
                            </li>
                            <li className="box">
                              <img src={images.checkout} alt="" />
                              <div>
                                <h4>Check Out</h4>

                                <p>{new Date(el.checkOut).toDateString()}</p>
                              </div>
                            </li>
                            <li className="box">
                              <img src={images.stay} alt="" />
                              <div>
                                <h4>Staying Dates</h4>
                                <ul className="list-circle">
                                  {getDates(el.checkIn, el.checkOut)}
                                </ul>
                              </div>
                            </li>
                            <li className="box">
                              <img src={images.room_bed} alt="" />
                              <div>
                                <h4>{el.roomType} X 1</h4>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="right">
                          <div className="image">
                            <img
                              src={images.hotel_left}
                              className="w-100 img-contain"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
      <div className="desp purple-bg py-2 px-4 my-5">
        <p className="text-white m-0 text-center">
          Prices of Flights and hotels are subject to availability
        </p>
        {/* <p className="text-white m-0 text-center">
          We are not making any holding on above as of now. Flight prices are
          also subject to availability at the time of booking.
        </p>
        <p className="text-white m-0 text-center">
          As quoted on {new Date(QuotationObj?.createdAt).toDateString()}{" "}
          {new Date(QuotationObj?.createdAt).getHours()}:
          {new Date(QuotationObj?.createdAt).getMinutes()}
        </p> */}
      </div>
      {QuotationObj &&
        QuotationObj?.itineraryDetails &&
        QuotationObj?.itineraryDetails?.length > 0 && (
          <section className="itinerary mb-80">
            <div className="container">
              <h1 className="fw-bold text-center mb-5 heading">Itinerary</h1>
              <div className="row">
                {QuotationObj?.itineraryDetails &&
                  QuotationObj?.itineraryDetails.length > 0 &&
                  QuotationObj?.itineraryDetails.map((el, index) => {
                    return (
                      <div className="col-12" key={index}>
                        <div className="day">
                          <h4>
                            <img src={images.location} alt="" />
                            Day {index + 1}
                          </h4>
                          <p className="small">
                            in {QuotationObj?.destinationName}
                          </p>
                        </div>
                        <div className="box">
                          <ul className="inner-box">
                            <li>
                              <div className="left">
                                {/* <img src={images.travelling} alt="" /> */}
                                <img
                                  src={generateFilePath(
                                    QuotationObj?.agentObj?.photoUrl
                                  )}
                                  alt=""
                                  style={{ width: 100 }}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="right">
                                <h4>{el?.itineraryHeading}</h4>
                                <p>{el?.itineraryName}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}

                {/* <div className="col-12">
              <div className="day">
                <h4>
                  <img src={images.location} alt="" />
                  Day 2
                </h4>
                <p className="small">
                  in Dubai/ <span className="text-muted">31-May-2022</span>
                </p>
              </div>
              <div className="box">
                <ul className="inner-box">
                  <li>
                    <div className="left">
                      <img src={images.travelling} alt="" />
                    </div>
                    <div className="right">
                      <h4>Dessert Safari with Dinner</h4>
                      <p>
                        The real highlight of the tour is an exciting,
                        adrenaline-pumping 4x4 drive deep into the desert to explore
                        the vast stretch of the golden dunes by plummeting low in
                        the deep ditches and escalating high on the summit of the
                        dunes. This is followed by a visit to our traditional Arabic
                        Bedouin campsite, which enables you to capture the real
                        essence and beauty of the desert, as you relish traditional
                        Arabic coffee, smoke a flavored Shisha, and rivet in the
                        mesmerizing belly dance movements and Tanura horse shows.
                        Note: infant below 1yr, pregnant women and handicapped are
                        not allowed in dune bashing in desert safari. pick up time
                        2:00 - 2:30 in the afternoon
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="day">
                <h4>
                  <img src={images.location} alt="" />
                  Day 3
                </h4>
                <p className="small">
                  in Dubai/ <span className="text-muted">01-Jun-2022</span>
                </p>
              </div>
              <div className="box">
                <ul className="inner-box">
                  <li>
                    <div className="left">
                      <img src={images.travelling} alt="" />
                    </div>
                    <div className="right">
                      <h4>Dubai City Tour</h4>
                      <p>
                        Discover the best of Dubai on a half-day Dubai sightseeing
                        tour with an expert guide. Traveling by comfortable coach or
                        minivan, take in Dubai’s top landmarks as you absorb the
                        cosmopolitan atmosphere. Snap photos of the Burj Al-Arab,
                        the sailshaped hotel on its own artificial island; venture
                        into the traditional Al Bastakiya district, ride an ‘abra’
                        water taxi across Dubai Creek, and much more. Sign off with
                        a visit to the Deira Spice Souk and free time to explore the
                        brilliant Gold Souk. Dubai sightseeing at its easiest and
                        best! Pick up time approx 8:15 - 8:30 in the morning.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="day">
                <h4>
                  <img src={images.location} alt="" />
                  Day 4
                </h4>
                <p className="small">
                  in Dubai/ <span className="text-muted">02-Jun-2022</span>
                </p>
              </div>
              <div className="box">
                <ul className="inner-box">
                  <li>
                    <div className="left">
                      <img src={images.travelling} alt="" />
                    </div>
                    <div className="right">
                      <h4>Day at leisure</h4>
                      <p>
                        Breakfast at hotel. Spent this day at leisure by visiting
                        local market, taking memories from Dubai . Stay at hotel
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="day">
                <h4>
                  <img src={images.location} alt="" />
                  Day 5
                </h4>
                <p className="small">
                  in Dubai/ <span className="text-muted">03-Jun-2022</span>
                </p>
              </div>
              <div className="box">
                <ul className="inner-box">
                  <li>
                    <div className="left">
                      <img src={images.travelling} alt="" />
                    </div>
                    <div className="right">
                      <h4>Departure from Dubai</h4>
                      <p>
                        This is your last day in the city. Plan your activities as
                        per for your flight schedule. You will be picked up from
                        your hotel and will be taken to the airport for your return
                        flight.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
              </div>
            </div>
          </section>
        )}
      <section className="how-to-book">
        <div className="container">
          {/* <h1 className="fw-bold text-center mb-5 heading">How To Book</h1> */}
          <div className="row">
            {/* <div className="col-12">
              <div className="inclusions">
                <div className="box">
                  <h4 className="purple bg-white">
                    Hi {QuotationObj?.leadObj?.clientObj?.name} (TRIP ID{" "} */}
            {/* {QuotationObj?._id} */}
            {/* {QuotationObj?.leadObj?.uniqueTripId
                      ? QuotationObj?.leadObj?.uniqueTripId
                      : QuotationObj?._id}
                    )
                  </h4>
                  <ul className="list-circle">
                    <li>
                      As per your inquiry please find below details. For any
                      further inquiry, feel free to contact the undersigned.
                      Please note that I
                    </li>
                    <li>
                      <b className="pink">
                        {`${QuotationObj?.agentObj?.firstName} ${QuotationObj?.agentObj?.lastName}`}{" "}
                        - {QuotationObj?.agentObj?.phone}
                      </b>{" "}
                      will be your point of contact for booking confirmation and
                      reachable between 10:00 am to 07:00 pm from Monday to
                      Saturday. You can alternately send me an email and I shall
                      respond as soon as possible.
                    </li>
                  </ul> */}
            {/* <b className="pink"
                  >*Note : All cost are calculated using currency USD and has the
                    rate 79.00
                  </b> */}
            {/* </div>
              </div>
            </div> */}
            {QuotationObj?.paymentObj?.paymentReceviedArr.length > 0 && (
              <div className="col-12">
                <div className="flight-table">
                  <table className="table table-bordered">
                    <thead className="purple-bg text-white">
                      <tr>
                        <th scope="col" className="fw-normal">
                          Initial payment & confirmation
                        </th>
                        {QuotationObj?.paymentObj?.paymentReceviedArr &&
                          QuotationObj?.paymentObj?.paymentReceviedArr.length >
                            0 &&
                          QuotationObj?.paymentObj?.paymentReceviedArr.map(
                            (el, index) => {
                              return (
                                <th
                                  scope="col"
                                  className="fw-normal"
                                  key={index}
                                >
                                  {index + 1}
                                  <sup>st</sup> Installment
                                </th>
                              );
                            }
                          )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>FLIGHT</td>
                        {QuotationObj?.paymentObj?.paymentReceviedArr &&
                          QuotationObj?.paymentObj?.paymentReceviedArr.length >
                            0 &&
                          QuotationObj?.paymentObj?.paymentReceviedArr.map(
                            (el, index) => {
                              return (
                                <td
                                  key={index}
                                  scope="col"
                                  className="fw-normal"
                                >
                                  ₹ {el?.installmentAmount} on{" "}
                                  {new Date(el.receviedDate).toDateString()}
                                </td>
                              );
                            }
                          )}
                      </tr>
                    </tbody>
                  </table>
                  <ul className="amount mb-0">
                    <li>
                      <h4>Total cost including taxes and above</h4>
                      <h4 className="pink fw-semibold m-0">
                        ₹{" "}
                        {QuotationObj?.paymentObj?.paymentReceviedArr.reduce(
                          (acc, el) => acc + parseInt(el.installmentAmount),
                          0
                        )}
                      </h4>
                    </li>
                    <li className="text-end">
                      <button className="btn pink-bg text-white btn-lg px-4">
                        Pay Now
                      </button>
                      <ul className="whatsapp-gmail pe-0">
                        <li className="fw-semibold gap-2">
                          <img src={images.whatsapp} alt="" />
                          {QuotationObj?.agentObj?.phone
                            ? QuotationObj?.agentObj?.phone
                            : "+91 9310 985 146"}

                          {/* +91 9310 985 146 */}
                        </li>
                        <li className="fw-semibold gap-2">
                          <img src={images.gmail} alt="" />
                          {/* sales15.nitsaholidays@gmail.com */}
                          {QuotationObj?.agentObj?.email
                            ? QuotationObj?.agentObj?.email
                            : " sales15.nitsaholidays@gmail.com "}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="desp purple-bg py-2 px-4 my-5">
        <p className="text-white m-0 text-center">
          Prices of Flights and hotels are subject to availability
        </p>
        {/* <p className="text-white m-0 text-center">
          As quoted on {new Date(QuotationObj?.createdAt).toDateString()}{" "}
          {new Date(QuotationObj?.createdAt).getHours()}:
          {new Date(QuotationObj?.createdAt).getMinutes()}
        </p> */}
      </div>

      <section className="payment-detail mb-80">
        <div className="container">
          <h1 className="fw-bold text-center mb-5 heading">Payment Details</h1>
          <div className="row">
            <div className="col-12">
              <div className="inclusions">
                <div className="box mb-0">
                  <h4 className="purple bg-white">Account Details</h4>
                  <div className="row">
                    <div className="col-12 col-md-7">
                      <ul className="list-circle">
                        <li>
                          Payment acceptance Mode: IMPS/NEFT Bank transfer &
                          Netbanking through Payment link
                        </li>
                        <li>
                          Payment are also accepted through debit card, Credit
                          Card or through payment link then the charges of 2.84
                          % extra will be levied.
                        </li>
                        <li>
                          Emi options available through third Parties Suppliers.
                          Get in touch with us for more information
                        </li>
                        {/* <li>
                          <a href={`tel:${QuotationObj?.agentObj?.phone}`}>
                            <img src={images.paytm} alt="" />{" "}
                          </a>
                        </li> */}
                        {/* <li>
                          Travel loan with EMI Payment option is also available
                          for which third party istitutions will be provided and
                          processing fees and interest charges will be
                          applicable depending upon your CIBIL profile.
                        </li> */}
                      </ul>
                    </div>
                    <div className="col-12 col-md-5">
                      <div className="right">
                        <div className="bank">
                          <img src={images.icici} alt="" />
                        </div>
                        <ul className="list-circle">
                          <li>
                            Bank Name:{" "}
                            <span className="fw-semibold">Yes Bank</span>
                          </li>
                          {/* <li>
                            A/c Name:{" "}
                            <span className="fw-semibold">Earth Travels</span>
                          </li> */}
                          <li>
                            A/c Num:{" "}
                            {/* <span className="fw-semibold">0724 0500 0852</span> */}
                            <span className="fw-semibold">
                              0184 6190 0001 430
                            </span>
                          </li>
                          <li>
                            IFSC Code:{" "}
                            {/* <span className="fw-semibold">ICIC0000724</span> */}
                            <span className="fw-semibold">YESB0000184</span>
                          </li>
                          <li>
                            Branch:
                            <span className="fw-semibold">
                              {/* Pushpanjali Enclave, Pitampura */}
                              Yes Bank Ltd, Pitam Pura Branch
                            </span>
                          </li>
                          <li>
                            <a href={`tel:${QuotationObj?.agentObj?.phone}`}>
                              {/* Paytm : <img src={images.paytm} alt="" />{" "} */}
                              Paytm : 9999 316587{" "}
                            </a>
                          </li>
                          <li>
                            <a href={`tel:${QuotationObj?.agentObj?.phone}`}>
                              {/* Google pay : <img src={images.gpay} alt="" />{" "} */}
                              Google pay : 9999 316597{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq mb-80">
        <div className="container">
          <h1 className="fw-bold text-center mb-5 heading">FAQ</h1>
          <div className="row">
            <div className="col-12">
              <div className="inclusions">
                <div className="box mb-0">
                  <h4 className="purple bg-white">Important Notes</h4>
                  <ul className="list-auto">
                    <li>
                      We are not responsible for any Visa Rejection as it is
                      government agency that issue visa.
                    </li>
                    <li>
                      Passport should be valid of minimum 06 months till return
                      date for travelling.
                    </li>
                    <li>
                      Above quotation is valid for Indian Nationals and minimum
                      of 2 adults travelling together at all times.
                    </li>
                    <li>
                      Above all are subject to availability, no booking made
                      yet, in case of non- availability similar hotel/services
                      will be provided.
                    </li>
                    <li>
                      Any request of King Bed or Twin Bed, room near to each
                      other in case of 2 or more rooms booking in the same hotel
                      is subject to hotel availability.
                    </li>
                    <li>
                      We have limited inventory hence prices can change without
                      prior notice. In order to get benefit at the current
                      proposed prices, we recommend you to book with us
                      immediately.
                    </li>
                    <li>
                      Early check-in and late checkout is subject to
                      availability of rooms at the time of check-in and the same
                      is not guaranteed, you may be charged for guaranteed early
                      check-in and late checkout.
                    </li>
                    <li>
                      Tourism tax is imposed by Govt. of (Malaysia of 10-15
                      Ringgit) / (Dubai of 10-15 Dirham) per room per night
                      which is to be paid at hotel only, and cost is not
                      included in the cost of package.
                      <ul className="list-circle">
                        <li>
                          National Park fee is charged on island visit in
                          Thailand 400 PHB per Adult/ 200 PHB per Child which is
                          to be paid at island directly, and cost is not
                          included in the cost of package.
                        </li>
                        <li>
                          Hotels may charge security fee which is refundable at
                          Check-out time.
                        </li>
                        <li>
                          Gratuities imposed on cruise are not included in the
                          package unless mentioned separately.
                        </li>
                        <li>
                          All inclusions / Activities remain same but sometimes
                          the sequence of day to day schedule (itinerary) may
                          change depending upon availability and local
                          conditions when the final itinerary received.
                        </li>
                        <li>
                          RTPCR test is not included in the package unless
                          mentioned. RTPCR to be given by hotel/resort as
                          complimentary is solely hotel discretion. NitSa has no
                          role and liability on it.
                        </li>
                        <li>
                          Please pay in the company’s account only - Earth
                          travels (Registered name of NitSa Holidays). Payments
                          in individual account of agents are not acceptable by
                          the company.
                        </li>
                        <li>
                          Courier charges / Photo charges developed by us at the
                          time of visa are not included in the package cost as
                          it may vary and will be paid additionally by the
                          client.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Flights booking and prices are dynamic and will be
                      applicable at the time of booking; any difference in fare
                      amount will be borne by customer before flights being
                      booked.
                    </li>
                    <li>
                      USD/SGD fluctuation will be taken into consideration. ROE
                      Calculation = Current XE + 1.5. Final amount of the
                      package will be as per the USD/SGD rate on the date of
                      final payment and difference amount will be adjusted in
                      package amount.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq mb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="inclusions">
                <div className="box mb-0">
                  <h4 className="purple bg-white">CANCELLATION POLICY</h4>
                  <ul className="list-auto">
                    <li>
                      In all other cases cancellation charge will be as per the
                      booking condition of the tour and we shall be constrained
                      to levy the following cancellation charges per person.
                    </li>
                    <li>
                      If cancellation is made any time not less than 31 days
                      prior to departure, 20000/- per person shall be
                      deducted.(except ticket cancellation and Visa charges)
                      <ul className="list-circle">
                        <li>30- 16 days: 50% of the total land cost</li>
                        <li>15 – 8 days: 75% of the total land cost</li>
                        <li>7 – 0 days: 100% cancellation will apply</li>
                        <li>Visa Fee & Service charges are non-refundable.</li>
                      </ul>
                    </li>
                    <li>
                      No refund either in part or in full will be made for any
                      unused part of the services provided in the package
                    </li>
                    <li>
                      The tour cost does not include any Overseas Insurance
                      Premium, but we strongly recommend Overseas Insurance
                      Policy. The same after issuance is non-refundable
                    </li>
                    <li>
                      The above policy will change in case of Hong Kong, Genting
                      Highlands, Maldives and other destinations where 100%
                      cancellation shall be applicable after confirmation.
                    </li>
                    <li>
                      Star Classification of Hotels/Resort is based on
                      information provided by the individual Hotel/Resort you
                      may verify same by directly contacting the concerned hotel
                      by visiting their website or Telephone number. We endeavor
                      to validate and authenticate this information in utter
                      good faith. We do not own any responsibility for any
                      correct star rating and type of bedroom provide by the
                      Hotel/Resort. Descriptions, photographs, sketches and list
                      of amenities/facilities are also provided by the
                      Hotel/Resort, this may also be got verified by directly
                      communicating the Hotel/Resort by visiting their website
                      or by contacting the Hotel/Resort management on Telephone
                      number. Hope so above is in order. For any further detail,
                      feel free to contact me.
                    </li>
                    <li>
                      We need Rs. 20,000/- per person as a booking deposit with
                      passport copies - Photo page, address page.
                    </li>
                    <li>
                      Air tickets payment to be made before issuing of the
                      tickets.
                    </li>
                    <li>
                      Hotel payment to be made before time limit of hotels.
                    </li>
                    <li>
                      Vouchers will be handed over to you after final payment
                      and it will take 3 working days to process your vouchers
                      after receiving full and final payment, Itinerary will be
                      provided 7 to 8 days before the trip date.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
      // 
      
      
      
      */}
      {/* {console.log(QuotationObj, "QuotationObj?.agentObj")} */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="foter_img text-center">
              <div>
                <img
                  style={{
                    borderRadius: "55px",
                    height: "120px",
                    width: "120px",
                    backgroundColor: "red",
                  }}
                  alt={generateFilePath(QuotationObj?.agentObj?.photoUrl)}
                  src={generateFilePath(QuotationObj?.agentObj?.photoUrl)}
                />
              </div>
              {/* {generateFilePath(QuotationObj?.agentObj?.photoUrl)} */}
              {/* {QuotationObj?.agentObj?.photoUrl} */}
              {/* <img
                src={generateFilePath(QuotationObj?.agentObj?.photoUrl)}
                alt=""
                // style={{ width: 100 }}
                className="img-fluid"
              /> */}
              <h4 className="name_info">
                {QuotationObj.agentObj.firstName!=undefined
                  ? QuotationObj?.agentObj?.firstName
                  : "" + " "}
                {QuotationObj.agentObj.lastName!=undefined
                  ? QuotationObj?.agentObj?.lastName
                  : ""}
              </h4>
              <h5 className="categofy_info">
                {QuotationObj.agentObj.designation
                  ? QuotationObj?.agentObj?.designation
                  : "Sales Executive"}
              </h5>
              <h6 className="info_num">
                {QuotationObj?.agentObj?.phone
                  ? QuotationObj?.agentObj?.phone
                  : "+91 9310 985 146"}
              </h6>

              {/* <h4 className="name_info">
                {QuotationObj?.agentObj?.firstName + " "}
                {QuotationObj?.agentObj?.lastName}
              </h4> */}
              {/* <h5>{QuotationObj?.agentObj?.role}</h5>
              <h6>{QuotationObj?.agentObj?.phone}</h6>
              <h6>{QuotationObj?.agentObj?.email}</h6> */}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="text-center">
              {/* <img src={images.thankyou3} alt="" className="img-fluid" /> */}
              <img
                style={{ height: "170px", width: "200px" }}
                src={images.logo}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info_list">
              <div className="right_info">
                <ul>
                  <li>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${QuotationObj?.agentObj?.phone}`}
                      target={"_blank"}
                    >
                      {/* +91 9310 985 146{" "} */}
                      {QuotationObj?.agentObj?.phone
                        ? QuotationObj?.agentObj?.phone
                        : ""}
                      <span>
                        <img src={images.whatsapp} alt="" />{" "}
                      </span>
                      <img
                        style={{
                          borderRadius: "55px",
                          height: "120px",
                          width: "120px",
                          backgroundColor: "red",
                        }}
                        alt={generateFilePath(QuotationObj?.agentObj?.photoUrl)}
                        src={generateFilePath(QuotationObj?.agentObj?.photoUrl)}
                      />
                    </a>
                  </li>
                  {/* <li>
                  <a href="tel:9310985146">
                    {" "}
                    +91 9310 985 146 <img src={images.whatsapp} alt="" />{" "}
                  </a>
                </li> */}
                  <li>
                    <a
                      href={`mailto:${QuotationObj?.agentObj?.email}`}
                      target={"_blank"}
                    >
                      {/* sales15.nitsaholidays@gmail.com{" "} */}
                      {QuotationObj?.agentObj?.email
                        ? QuotationObj?.agentObj?.email
                        : ""}
                      <span>
                        <img src={images.gmail} alt="" />{" "}
                      </span>
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="https://goo.gl/maps/nv3JerjMBZokNV7F7"
                      target={"_blank"}
                    >
                      Northex Tower, 806, ITL, A-09, Netaji Subhash Place, Pitam
                      Pura, New Delhi, Delhi 110034, India{" "}
                    </a>
                    <span>
                      <img
                        src={images.location}
                        className="img-fluid"
                        style={{ width: "50px" }}
                      />
                    </span>
                  </li> */}
                </ul>
              </div>
              <div className="socal_link">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/FlipTripHolidays"
                      target={"_blank"}
                    >
                      <i class="fa fa-facebook-square" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/Fliptrip_h" target={"_blank"}>
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/fliptrip_holidays/"
                      target={"_blank"}
                    >
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCV_qHw1tK_x3e-IOMfrMhtw"
                      target={"_blank"}
                    >
                      <i class="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="purple-bg topftre py-3 px-4 my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p className="mb-0 text-white">
                <a
                  href="https://goo.gl/maps/nv3JerjMBZokNV7F7"
                  target={"_blank"}
                >
                  Northex Tower, 806, ITL, A-09, Netaji Subhash Place, Pitam
                  Pura, New Delhi, Delhi 110034, India
                </a>
              </p>
              <p className="mb-0 text-white">
                +91 99993 16587, +91 99993 16597
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 
      
      
      
      
      */}
    </main>
  );
}

export default Index;
