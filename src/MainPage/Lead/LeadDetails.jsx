import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import "../antdstyle.css";
import Table from "react-bootstrap/Table";
import { costingSheetGet } from "../../redux/features/CostingSheet/CostingSheetSlice.js";

const ViewCostingSheetForm = () => {
  const location = useLocation();
  // console.log(location.pathname, "location.pathname321");
  const dispatch = useDispatch();
  const params = useParams();
  const leadId = params.leadId;

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
    { hotelName: "", hotelAddress: "", cost: "", isBooked: false },
  ]);

  const [flightList, setFlightList] = useState([{ cost: "", flightName: "" }]);
  const [totalCost, setTotalCost] = useState(0);
  const [obj, setObj] = useState({});
  const [paymentList, setPaymentList] = useState({});

  useEffect(() => {
    handleInit(leadId);
  }, []);

  const handleInit = (leadId) => {
    dispatch(costingSheetGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    console.log(costingSheetResultObj, "costingSheetResultObj234");
    setObj(costingSheetResultObj);
  }, [costingSheetResultObj]);

  useEffect(() => {
    console.log(obj, "09");
  }, [obj]);

  useEffect(() => {
    if (obj && obj._id) {
      // console.log(obj, "obj43");
      setLeadName(obj.leadName);
      setLocationName(obj.locationName);
      setProfit(+obj.profit);
      setLeadsId(obj.leadsId);
      setLandCost(obj.landCost);

      setflightCost(obj.flightCost);
      setTotalExpense(obj.totalExpense);
      setinputList([...obj.hotelDetails]);
      setFlightList(obj.flightDetails);
      setPaymentList(obj.paymentObj?.paymentReceviedArr);
      setTotalCost(obj.totalCost);
    }
  }, [obj]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="col-12 col-md-8 mb-3">
          <h3 className="blue-1">Travel Agent Details</h3>
          <div className="row">
            <div className="col-12 col-md-8 mb-2">
              <label className="blue-1 ">
                Agent Name : &nbsp;{obj?.leadObj?.createdBy?.name}
              </label>
            </div>

            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Agent Email : &nbsp;{obj?.leadObj?.createdBy?.email}
              </label>
            </div>

            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Phone: &nbsp;{obj?.leadObj?.createdBy?.phone}
              </label>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="col-12 col-md-8 mb-4">
          <h3 className="blue-1 "> Lead Details</h3>
          <div className="row">
            <div className="col-12 col-md-8 mb-2">
              <label className="blue-1 ">
                Lead Name : &nbsp;{obj?.leadName}
              </label>
            </div>

            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Subject : &nbsp;{obj?.leadObj?.subject}
              </label>
            </div>
            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Priority : &nbsp;{obj?.leadObj?.priority}
              </label>
            </div>
            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Status : &nbsp;{obj?.leadObj?.status}
              </label>
            </div>
            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Description : &nbsp;{obj?.leadObj?.description}
              </label>
            </div>

            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Location Name: &nbsp;{obj?.locationName}
              </label>
            </div>
            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Booked At: &nbsp;{obj?.bookedAt}
              </label>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 mb-4">
          <h3 className="blue-1 "> Client Details</h3>
          <div className="row">
            <div className="col-12 col-md-8 mb-2">
              <label className="blue-1 ">
                Client Name : &nbsp;{obj?.leadObj?.clientObj?.name}
              </label>
            </div>

            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Phone : &nbsp;{obj?.leadObj?.clientObj?.phone}
              </label>
            </div>

            <div className="col-12  col-md-8 mb-2">
              <label className="blue-1 fs-12">
                Email: &nbsp;{obj?.leadObj?.clientObj?.email}
              </label>
            </div>
          </div>
        </div>

        {/* 


*/}
        <div className="row">
          {inputList.length > 0 && (
            <div>
              <h3 className="mt-3 mb-4 ">Hotel Details</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Hotel Name</th>
                    <th>Hotel Address</th>
                    <th>Cost</th>
                    <th>Booked</th>
                  </tr>
                </thead>
                {inputList.map((x, i) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{x.hotelName}</td>
                          <td>{x.hotelAddress}</td>
                          <td>{x.cost}</td>
                          <td>
                            {x.isBooked == true
                              ? "Booked Succssfully"
                              : " Booking pending"}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </Table>
            </div>
          )}
          {flightList.length > 0 && (
            <div className="row">
              <div className="col-sm-12">
                <h3 className="mt-3 mb-4">Flight Details</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>flight Name</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  {flightList.map((x, i) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{x.flightName}</td>
                          <td>{x.cost}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </div>
            </div>
          )}

          {paymentList.length > 0 && (
            <div className="row">
              <div className="col-sm-12">
                <h3 className="mt-3 mb-4">Payment Details</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Received Date</th>
                      <th>Istallment Amount</th>
                      <th>Transfer Status </th>
                      <th>Transfer Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {paymentList.map((x, i) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{x?.receviedDate}</td>
                          <td>{x.installmentAmount}</td>
                          <td>{x.transferStatus}</td>
                          <td>{x.transferAmount}</td>
                          <td>{x.status}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </div>
            </div>
          )}

          <div className="content">
            <div className="col-12 col-md-4 mb-3 text-danger">
              <label className="blue-1 fs-12">
                Land Cost: &nbsp;{landCost}
              </label>
            </div>
            <div className="col-12 col-md-4 mb-3 text-danger">
              <label className="blue-1 fs-12">
                Flight Cost: &nbsp;{flightCost}
              </label>
            </div>

            <div className="col-12 col-md-4 mb-3 text-danger">
              <label className="blue-1 fs-12">
                Total Cost: &nbsp;{totalCost}
              </label>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <label className="blue-1 fs-12">Profit: &nbsp;{profit}</label>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="col-12 col-md-8 mb-3">
            <h2 className="blue-1 "> Quotation Details</h2>
            <div className="row">
              <div className="col-12 col-md-8 mb-2">
                <label className="blue-1 ">
                  Destination Name : &nbsp;{obj?.quotationObj?.destinationName}
                </label>
              </div>

              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Duration Of Tour : &nbsp;
                  {parseInt(obj?.quotationObj?.durationOfTour) + 1} Days
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Airport Transfer : &nbsp;{obj?.quotationObj?.airportTransfer}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Amount : &nbsp;{obj?.quotationObj?.amount}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Flight Availability : &nbsp;
                  {obj?.quotationObj?.isFlight == true ? "YES" : "NO"}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Land Availability : &nbsp;
                  {obj?.quotationObj?.isLand == true ? "YES" : "NO"}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Number Of Guest : &nbsp;{obj?.quotationObj?.numberOfGuest}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Number Of Adults : &nbsp;
                  {obj?.quotationObj?.travelPassengerObj?.noOfAdults}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Number Of Children With Bed : &nbsp;
                  {obj?.quotationObj?.travelPassengerObj?.noOfChildrenWithBed}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Number Of Children Without Bed : &nbsp;
                  {
                    obj?.quotationObj?.travelPassengerObj
                      ?.noOfChildrenWithoutBed
                  }
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Number Of Infants : &nbsp;{obj?.quotationObj?.noOfInfants}
                </label>
              </div>
              {/*  */}
              {obj?.quotationObj?.travellersDetails.length > 0 && (
                <div>
                  <h3 className="mt-3 mb-4 ">Travellers Details</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Guest Name</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    {obj?.quotationObj?.travellersDetails.map((x, i) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{x.guestName}</td>
                              <td>{x.age}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </Table>
                </div>
              )}
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Per Person AirPort Price : &nbsp;
                  {obj?.quotationObj?.perPersonAirPortPrice}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Per Person Land Price : &nbsp;
                  {obj?.quotationObj?.perPersonLandPrice}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Status : &nbsp;{obj?.quotationObj?.status}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Term And Condition : &nbsp;
                  {obj?.quotationObj?.termAndCondition}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Visa On Arrival : &nbsp;
                  {obj?.quotationObj?.visOnArrival == true ? "YES" : "NO"}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Visa : &nbsp;{obj?.quotationObj?.visa == true ? "YES" : "NO"}
                </label>
              </div>
              <div className="col-12  col-md-8 mb-2">
                <label className="blue-1 fs-12">
                  Visa Required : &nbsp;
                  {obj?.quotationObj?.visaRequired == true ? "YES" : "NO"}
                </label>
              </div>
            </div>
          </div>
          {obj?.quotationObj?.itineraryDetails.length > 0 && (
            <div>
              <h3 className="mt-3 mb-4 ">Itinerary Details</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Itinerary Heading</th>
                    <th>Itinerary Name</th>
                    {/* <th>Booked</th> */}
                  </tr>
                </thead>

                {obj?.quotationObj?.itineraryDetails.map((x, i) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{x.day}</td>
                          <td>{x.itineraryHeading}</td>
                          <td>{x.itineraryName}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </Table>
            </div>
          )}
          {obj?.quotationObj?.itineraryList.length > 0 && (
            <div>
              <h3 className="mt-3 mb-4 ">Itinerary List</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Itinerary Name</th>
                  </tr>
                </thead>
                {obj?.quotationObj?.itineraryList.map((x, i) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{x.day}</td>
                          <td>{x.itineraryName}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </Table>
            </div>
          )}
          {obj?.quotationObj?.tourListArr.length > 0 && (
            <div>
              <h3 className="mt-3 mb-4 ">Tour List</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                {obj?.quotationObj?.tourListArr.map((x, i) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{x.name}</td>
                          <td>{x.startDate}</td>
                          <td>{x.endDate}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </Table>
            </div>
          )}
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default ViewCostingSheetForm;
