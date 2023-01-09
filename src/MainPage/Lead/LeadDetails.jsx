import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import "../antdstyle.css";
import Table from "react-bootstrap/Table";
import { costingSheetGet } from "../../redux/features/CostingSheet/CostingSheetSlice.js";
import { handleNotificationGetForSpecificLeadId } from "../../Services/notification.service";
import moment from "moment"
import Button from "react-bootstrap/Button";

import { getEmployessLinkedWithLeadId } from "../../Services/user.service";
import { addNotification, setNotification } from "../../redux/features/notification/notificationSlice";


const ViewCostingSheetForm = () => {
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);
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
  const [notificationArr, setNotificationArr] = useState([]);
  const [comment    , setComment] = useState("");

  const userObj = useSelector((state) => state.auth.user);
  const [createdBy, setCreatedBy] = useState({});
  const [connectEmplyeeWithThisLead, setConnectEmplyeeWithThisLead] = useState(
    []
    );

useEffect(() => {
  setCreatedBy(userObj);
}, [userObj]);
  

  const handleGetCommentFromNtoifcation = async () => {
    let { data: response } = await handleNotificationGetForSpecificLeadId(
      `${leadId}`
    );
    // console.log(response, "get2342");
    setNotificationArr(response?.data);
  };

  
const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployessLinkedWithLeadId(leadId);
      // console.log(res, "resonp");
      if (res?.message) {
        setConnectEmplyeeWithThisLead(res.data);
        // dispatch(returnAllEmployees(res.data));
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };





  useEffect(() => {
    handleInit(leadId);
    handleGetCommentFromNtoifcation();
    handleGetAllEmployees()
  }, []);




  const handleInit = (leadId) => {
    dispatch(costingSheetGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    // console.log(costingSheetResultObj, "costingSheetResultObj234");
    setObj(costingSheetResultObj);
  }, [costingSheetResultObj]);

 

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



  
  const handleKeyPress = (event) => {
    let object = {
      heading: comment,
      // description,
      // userId, 
      CommentUserId:[],
      leadId,
      followDate: new Date().toLocaleDateString(),
      createdBy: { ...createdBy, role },
      followTime: new Date().toLocaleTimeString(),
      isComment:true
    };
    if (event.key === "Enter") {
      // dispatch(addNotification(object));
      if (role == "SPOC") {
        object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.adminObj?._id}) 
        object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.leadId}) 

     
      } else if (role == "TEAMLEAD") {
   object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.agentId}) 
   object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.adminObj?._id}) 

    
      } else if (role == "ADMIN") {
        
        object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.agentId}) 
        object.CommentUserId.push({ userId:connectEmplyeeWithThisLead?.leadId}) 

        }else if (role=="ACCOUNT"){
        object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.adminObj?._id})
        object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.agentId}) 
        object.CommentUserId.push({ userId:connectEmplyeeWithThisLead?.leadId}) 
      } 
      // for (let el of connectEmplyeeWithThisLead?.AccountArr) {

      //   object.CommentUserId.push({userId:el._id}) 
      // }
      dispatch(addNotification(object));
    }
  };


  const handleSubmitComment = (event) => {
    let object = {
      heading: comment,
      // userId, 
      CommentUserId:[],
      leadId,
      followDate: new Date().toLocaleDateString(),
      createdBy: { ...createdBy, role },
      followTime: new Date().toLocaleTimeString(),
      isComment:true
    };
    // console.log(role,"role23")
        if (role == "SPOC") {
          object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.adminObj?._id}) 
          object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.leadId}) 
  
       
        } else if (role == "TEAMLEAD") {
     object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.agentId}) 
     object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.adminObj?._id}) 
  
      
        } else if (role == "ADMIN") {
          
          object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.agentId}) 
          object.CommentUserId.push({ userId:connectEmplyeeWithThisLead?.leadId}) 
  
        }else if (role=="ACCOUNT"){
          object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.adminObj?._id})
          object.CommentUserId.push({userId:connectEmplyeeWithThisLead?.agentId}) 
          object.CommentUserId.push({ userId:connectEmplyeeWithThisLead?.leadId}) 
        } 
        
        dispatch(addNotification(object)); 
  };




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
                    <th>Booking Source</th>
                    <th>Cost</th>
                    <th>Booked</th>
                  </tr>
                </thead>
                {inputList.map((x, i) => {
                  return (
                    <>
                      <tbody key={i}>
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
                      <tbody key={i}>
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
                      <th>Installment Amount</th>
                      <th>Transfer Status </th>
                      <th>Transfer Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {paymentList.map((x, i) => {
                    return (
                      <tbody key={i}>
                        <tr>
                          <td>{new Date(x?.receviedDate).toLocaleString()}</td>
                          {/*.toLocaleString()------- 2022-11-25T13:04:06.625Z */}
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
                          <tbody key={i}>
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
          {/* {obj?.quotationObj?.itineraryDetails.length > 0 && (
            <div>
              <h3 className="mt-3 mb-4 ">Itinerary Details</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Itinerary Heading</th>
                    <th>Itinerary Name</th>
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
          )} */}
          {/* {obj?.quotationObj?.itineraryList.length > 0 && (
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
          )} */}
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
                      <tbody key={i}>
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


        <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    {/* <TextareaAutosize */}
                    <input
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className="form-control"
                      cols="1000"
                      rows="100"
                      placeholder="Add Comment"
                    />
                  </div>
                </div>
               

                {/* {showButtonVisibility && ( */}
                  <Button
                    type="submit"
                    className="btn-submit col-md-2" 
                    onClick={(e) => {
                      handleSubmitComment(e);
                    }}
                  >
                    Submit-
                  </Button>
                {/* // )} */}
              </div>
            </div>


        {notificationArr &&
          notificationArr.map((noteItem, index) => {
            return (
              <div className="note_added_by_agent mt-4" key={index}>
                <div className="textnote">
                  <div className="alignright mb7">
                    <span className=" flexfull">
                      {moment(noteItem?.reminderDate).format("DD-MM-YYYY")} By{" "}
                      {noteItem?.createdBy?.name
                        ? noteItem?.createdBy?.name
                        : "" + " "}
                      {"[" + noteItem?.createdBy?.role
                        ? noteItem?.createdBy?.role
                        : "" + "]"}
                    </span>
                  </div>
                  <div className="noteMessage">
                    <p className="post-heading  f10">{noteItem?.heading}</p>
                  </div>
                </div>
                {/* <span className="notesImageCorner">
                <img
                  src={"../../../src/assets/img/NotesImageCorner.webp"}
                  alt=""
                />
              </span> */}
              </div>
            );
          })}
        {/*  */}
      </div>
    </div>
  );
};

export default ViewCostingSheetForm;
