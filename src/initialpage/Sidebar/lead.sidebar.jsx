import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import { admin, rolesObj } from "../../utils/roles";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Notes from "../../MainPage/Lead/Notes/Notes";
// import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addReminder,
  updateReminder,
  setReminder,
} from "../../redux/features/reminder/reminderSlice";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { toastError } from "../../utils/toastUtils";
const LeadSidebar = (props) => {
  const userObj = useSelector((state) => state.auth.user);
  const [createdBy, setCreatedBy] = useState(null);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isSideMenu, setSideMenu] = useState("");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");
  const [pathname, setPathName] = useState("");

  const [leadStatusDate, setLeadStatusDate] = useState(new Date());
  const [leadStatusTime, setLeadStatusTime] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [showLeadStatusModal, setShowLeadStatusModal] = useState(false);
  const [isOtherReason, setIsOtherReason] = useState(false);

  const [otherReason, setOtherReason] = useState("");
  const [sendDataToDb, setSendDataToDb] = useState(false);
  const [notesData, setNotesData] = useState("");

  // const ParamsPathName = location.pathname.split("/").length;

  const [leadStatusReason, setLeadStatusReason] = useState([
    {
      heading: "Call Not Picked",
      followDate: new Date().toLocaleDateString(),
      followTime: new Date().toLocaleTimeString(),
    },
    {
      heading: "Call Not Answer",
      followDate: new Date().toLocaleDateString(), //  date: new Date().toDateString(),
      followTime: new Date().toLocaleTimeString(),
    },
    {
      heading: "Call Back Later",
      followDate: new Date().toLocaleDateString(),
      followTime: new Date().toLocaleTimeString(),
    },
    {
      heading: "Not Interested",
      followDate: new Date().toLocaleDateString(),
      followTime: new Date().toLocaleTimeString(),
    },
    {
      heading: "Other Reason",
      followDate: new Date().toLocaleDateString(),
      followTime: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    setCreatedBy(userObj);
  }, [userObj]);

  const toggleSidebar = (value) => {
    // // console.log(value);
    setSideMenu(value);
  };

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const params = useParams();
  const leadId = params.leadId;
  // console.log(params.leadId, "lead Id ");
  const clearFunc = () => {
    setOtherReason("");
    setSendDataToDb(false);
    setIsOtherReason(false);
  };
  useEffect(() => {
    if (notesData == "Other Reason") {
      setIsOtherReason(true);
    }
  }, [notesData]);

  const handleSubmitStatusOfLead = (e) => {
    // console.log(e, "e.");
    let obj = {
      leadStatusDate,
      leadStatusTime,
      heading: notesData,
      otherReason,
    };

    obj.leadId = leadId;
    obj.createdBy = createdBy;
    if (notesData == "Other Reason") {
      // setIsOtherReason(true);
      // obj.otherReason = otherReason;
      if (obj.otherReason.length <= 0) {
        toastError("Other Reason is mandatory");
        return;
      } else {
        // setSendDataToDb(true);
        setShowLeadStatusModal(false);
        dispatch(addReminder(obj));
        clearFunc();
      }
      // if (sendDataToDb) {
      // setShowLeadStatusModal(false);
      // dispatch(addReminder(obj));
      // clearFunc();
      // }
    } else {
      dispatch(addReminder(obj));
      setShowLeadStatusModal(false);
    }
    console.log(obj, "object  get");
  };

  return (
    <div className="sidebar leadsidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}
      >
        {role != rolesObj.ACCOUNT && (
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <Link to="/admin/leads" className="active">
                    <i className="fa fa-back-arrow"></i> Back
                  </Link>
                </li>
                <li className={pathname?.includes("lead") ? "active" : ""}>
                  <Link to={`/admin/lead/${leadId}`}>
                    <i className="la la-file" />
                    <div className="textblock2">
                      <span>Traveller Details</span>
                    </div>
                  </Link>
                </li>
                {role != "SUPERVISOR" && (
                  <li className={pathname?.includes("quotes") ? "active" : ""}>
                    <Link to={`/admin/lead/${leadId}/quotes`}>
                      <i className="la la-file" />
                      <div className="textblock2">
                        <span>Create Quote</span>
                        <span className="textsmall">PENDING TASKS</span>
                      </div>
                    </Link>
                  </li>
                )}
                {/* <li
                  className={
                    pathname?.includes("quotation-follow-up") ? "active" : ""
                  }
                >
                  <Link to={`/admin/lead/${leadId}/quotation-follow-up`}>
                    <i className="la la-file-text-o" />
                    <div className="textblock2">
                      <span>Quotation Followup</span>{" "}
                      <span className="textsmall">PENDING TASKS</span>{" "}
                    </div>
                  </Link>
                </li> */}
                {role != "SUPERVISOR" && (
                  <li
                    className={
                      pathname?.includes("quotePayment") ? "active" : ""
                    }
                  >
                    <Link to={`/admin/lead/${leadId}/quotePayment`}>
                      <i className="la la-file-text-o" />
                      <div className="textblock2">
                        <span>Quotation Payment</span>
                        <span className="textsmall">CREATE AND MANAGE</span>
                      </div>
                    </Link>
                  </li>
                )}
                {role != "SUPERVISOR" && (
                  <li
                    className={
                      pathname?.includes("costingSheet") ? "active" : ""
                    }
                  >
                    <Link to={`/admin/lead/${leadId}/costingSheet`}>
                      <i className="la la-file-text-o" />
                      <div className="textblock2">
                        <span>Costing Sheet</span>
                        <span className="textsmall">CREATE AND MANAGE</span>
                      </div>
                    </Link>
                  </li>
                )}
                {/* <li
                  className={
                    pathname?.includes("costingSheetAdd") ? "active" : ""
                  }
                >
                  <Link to={`/admin/lead/${leadId}/costingSheetAdd`}>
                    <i className="la la-file-text-o" />
                    <div className="textblock2">
                      <span>Costing Sheet</span>
                      <span className="textsmall">CREATE AND MANAGE</span>
                    </div>
                  </Link>
                </li> */}
                {/* <li
                  className={
                    pathname?.includes("VoucherPayment") ? "active" : ""
                  }
                >
                  <Link to="/admin/employees/VoucherPayment">
                    <i className="la la-gift" />{" "}
                    <div className="textblock2">
                      {" "}
                      <span>Voucher & Payment </span>{" "}
                      <span className="textsmall">PENDING TASKS</span>{" "}
                    </div>
                  </Link>
                </li> */}
                {/* <li
                className={pathname?.includes("DuringStay") ? "active" : ""}
              >
                <Link to="/admin/employees/DuringStay">
                  <i className="la la-hotel" />{" "}
                  <div className="textblock2">
                    {" "}
                    <span>During Stay</span>{" "}
                    <span className="textsmall">PENDING TASKS</span>{" "}
                  </div>
                </Link>
              </li> */}
                {/* <li className={pathname?.includes("PostStay") ? "active" : ""}>
                <Link to="/admin/employees/PostStay">
                  <i className="la la-thumbs-o-up" />{" "}
                  <div className="textblock2">
                    {" "}
                    <span> Post Stay</span>{" "}
                    <span className="textsmall">PENDING TASKS </span>
                  </div>
                </Link>
              </li> */}
                {/* <li className="submenu">
                <a
                  href="#"
                  className={isSideMenu == "userinfo" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "userinfo" ? "" : "userinfo")
                  }
                >
                  <i className="la la-user" /> <span>Traveler Detail</span>{" "}
                  <span className="menu-arrow" />
                </a>
                {isSideMenu == "userinfo" ? (
                  <ul>
                    <li>
                      <div className="user_name_details">
                        <div className="user_img">
                          <img
                            src={"../../../src/assets/img/profilepic.webp"}
                            width={90}
                            height={90}
                            alt=""
                          />
                        </div>
                        <div className="usr_name">
                          <h4>Rahul Ghunavat</h4>
                          <i className="fa fa-user"></i>
                        </div>
                        <div className="trav-basic-details">
                          <ul>
                            <li>
                              <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                              <span> 8233882595 </span>
                            </li>
                            <li>
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>{" "}
                              <span>Quote@reply.traveltriangle.com</span>{" "}
                            </li>
                            <li>
                              <i
                                className="fa fa-briefcase"
                                aria-hidden="true"
                              ></i>{" "}
                              <span>NA</span>
                            </li>
                            <li>
                              <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>{" "}
                              <span>NA</span>
                            </li>
                          </ul>

                          <div className="travelerDocDetails mt-4">
                            <ul>
                              <li>
                                <div className="box_child">
                                  <div className="adlt_adddetls">
                                    <p>Adult 1</p>
                                    <p onClick={handleShow}>Add Details</p>
                                  </div>
                                  <p className="mt-2">
                                    <span>Passport missing</span>,{" "}
                                    <span>PAN missing</span>
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="box_child">
                                  <div className="adlt_adddetls">
                                    <p>Adult 2</p>
                                    <p onClick={handleShow}>Add Details</p>
                                  </div>
                                  <p className="mt-2">
                                    <span>Passport missing</span>,{" "}
                                    <span>PAN missing</span>
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li> */}
                {/* <li className="submenu">
                <a
                  className={isSideMenu == "leadprogress" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "leadprogress" ? "" : "leadprogress"
                    )
                  }
                >
                  <i className="fa fa-line-chart" />{" "}
                  <span> Lead Progress</span> <span className="menu-arrow" />
                </a>
                {isSideMenu == "leadprogress" ? (
                  <div className="trav-basic-details">
                    <div className="leadStatgeHead">
                      <p>
                        Simpler way to keep a track by adding relevant notes.{" "}
                        <Link to="/"> Know More! </Link>
                      </p>
                      <p>Ph. No.: +910000000000</p>
                    </div>
                    <div className="sub_accrodion">
                      <Accordion>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Quoting
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="adlt_adddetls">
                              <p>Lead Received2</p>
                              <span>over 3 years ago</span>
                            </div>
                            <div className="adlt_adddetls">
                              <p>Phone Number Unlocked </p>
                              <span>over 3 years ago </span>
                            </div>
                            <div className="number_panelarea">
                              + 91 0000000000
                            </div>
                            <div className="focsuedligh"><i className="fa fa-lightbulb-o" aria-hidden="true"></i> Tip: Ask for best time to contact on Whatsapp </div>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Contacting
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="contact_share">
                              <p><i className="fa fa-check" aria-hidden="true"></i> +910000000000 <Link to='/'>Report if incorrect</Link></p>
                              <div>
                                <ul>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-phone" aria-hidden="true"></i></div>
                                      <div className="datanumber">
                                        <span className="pfc3">Call not picked?</span>
                                        <span className="pfc2" onClick={handleShow1}>Mark unable to reach customer</span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-whatsapp" ></i></div>
                                      <div className="datanumber">
                                        <span className="pfc3">Share quote on Whatsapp?</span>
                                      </div>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3">Quote not seen?</span>
                                        <span className="pfc2" onClick={handleShow1}>Resend quote set a reminder</span>

                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-hourglass-end"></i>
                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3">Quote not seen?</span>
                                        <span className="pfc2" onClick={handleShow1}>Resend quote set a reminder</span>

                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Customizing
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="contact_share">
                              <p><i className="fa fa-check" aria-hidden="true"></i> +910000000000 <Link to='/'>Report if incorrect</Link></p>
                              <div>
                                <ul>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon whatappicon">
                                        <i className="fa fa-whatsapp" ></i></div>
                                      <div className="datanumber">
                                        <span className="pfc3">Share quote on Whatsapp?</span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-hourglass-end"></i></div>
                                      <div className="datanumber">
                                        <span className="pfc3">Talk in progress?</span>
                                        <span className="pfc2" onClick={handleShow1}>Set reminder for when to call next</span>
                                      </div>
                                    </div>
                                  </li>


                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3">Call not picked?</span>
                                        <span className="pfc2" onClick={handleShow1}>Mark unable to reach customer</span>

                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3">Booking Soon?</span>
                                        <span className="pfc2" onClick={handleShow1}>Mark as my priority</span>

                                      </div>
                                    </div>
                                  </li>
                                </ul>
                                <div className="focsuedligh"><i className="fa fa-lightbulb-o" aria-hidden="true"></i> Tip: Ask for best time to contact on Whatsapp </div>
                              </div>

                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Finalizing
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="contact_share">

                              <div>
                                <ul>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon whatappicon">
                                        <i className="fa fa-whatsapp" ></i></div>
                                      <div className="datanumber">
                                        <span className="pfc3"> Already customised?</span>
                                        <span className="pfc2">Send WhatsApp confirmation</span>

                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3">Call not picked?</span>
                                        <span className="pfc2" onClick={handleShow1}>Mark unable to reach customer</span>
                                      </div>
                                    </div>
                                  </li>


                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-money" aria-hidden="true"></i>

                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3"> Traveler going to pay soon?</span>
                                        <span className="pfc2" onClick={handleShow1}>Set reminder for when to follow up next</span>

                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="flex-row">
                                      <div className="icon">
                                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                                      </div>
                                      <div className="datanumber">
                                        <span className="pfc3">Booked with someone else?</span>
                                        <span className="pfc2" onClick={handleShow1}>Remove Lead</span>

                                      </div>
                                    </div>
                                  </li>
                                </ul>
                                <div className="focsuedligh"><i className="fa fa-lightbulb-o" aria-hidden="true"></i> Tip: Ask for best time to contact on Whatsapp </div>
                              </div>

                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Converted
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="adlt_adddetls">
                              <p>Lead Received2</p>
                            </div>
                            <p className="leadperagrph"> Congratulations! We have received the payment from the traveler. We trust you with providing the best service. </p>
                          </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Trip Completed
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <p className="leadperagrph">Good reviews help in improving your ratings and get more business.</p>
                            <div className="btn-block snp100">
                              <button className="btn btn-danger btn-sm btn-block">ASK FOR REVIEW</button>
                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>


                      </Accordion>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </li> */}
                {/* <li className="submenu">
                  <a
                    href="#"
                    className={isSideMenu == "notes" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "notes" ? "" : "notes")
                    }
                  >
                    <i className="fa fa-sticky-note-o" /> <span> NOTES </span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  <Notes />
                </li> */}

                {/* 
                
                */}
                {role != "SUPERVISOR" && (
                  <li className="submenu">
                    <a
                      href="#"
                      className={isSideMenu == "notes" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu == "notes" ? "" : "notes")
                      }
                    >
                      <i className="fa fa-sticky-note-o" /> <span> NOTES</span>{" "}
                      <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "notes" ? (
                      <ul>
                        <li>
                          <Notes />
                          {/* <Link
                          // className={
                          //   pathname?.includes("admin/dashboard")
                          //     ? "active"
                          //     : ""
                          // }
                          // to="/admin/dashboard"
                          ></Link> */}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {/* 
                

                
                */}
                {/* z */}
                {role != "SUPERVISOR" && (
                  <li
                    className={pathname?.includes("LeadStatus") ? "active" : ""}
                  >
                    <Link
                      to={`/admin/lead/${leadId}`}
                      onClick={() => setShowLeadStatusModal(true)}
                    >
                      <i className="la la-file-text-o" />
                      <div className="textblock2">
                        <span>Lead Status Update</span>
                      </div>
                    </Link>
                  </li>
                )}
                {/* <li
                  className={
                    pathname?.includes("Notification")
                      ? "active"
                      : pathname?.includes("Notification")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/notification">
                    <i className="la la-bell" /> <span>Notification</span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        )}
        {role == rolesObj.ACCOUNT && (
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <Link to="/admin/leads" className="active">
                    <i className="fa fa-back-arrow"></i> Back
                  </Link>
                </li>
                {/* <li className={pathname?.includes("lead") ? "active" : ""}>
                  <Link to={`/admin/lead/${leadId}`}>
                    <i className="la la-file" />
                  
                  </Link>
                </li> */}

                {role != "SUPERVISOR" && (
                  <li className="submenu">
                    <a
                      href="#"
                      className={isSideMenu == "notes" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu == "notes" ? "" : "notes")
                      }
                    >
                      <i className="fa fa-sticky-note-o" /> <span> NOTES</span>{" "}
                      <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "notes" ? (
                      <ul>
                        <li>
                          <Notes />
                          {/* <Link
                          // className={
                          //   pathname?.includes("admin/dashboard")
                          //     ? "active"
                          //     : ""
                          // }
                          // to="/admin/dashboard"
                          ></Link> */}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                <li
                  className={
                    pathname?.includes("Notification")
                      ? "active"
                      : pathname?.includes("Notification")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/notification">
                    <i className="la la-bell" /> <span>Notification</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* 
        
        
        
        
        
        
        
        */}

        {/* {role == rolesObj.SPOC && (
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={isSideMenu == "dashboard" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "dashboard" ? "" : "dashboard"
                      )
                    }
                  >
                    <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "dashboard" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname?.includes("main/employee-") ? "active" : ""
                          }
                          to="/admin/main/employee-dashboard"
                        >
                          Employee Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={
                    pathname?.includes("Leads")
                      ? "active"
                      : pathname?.includes("Lead-view")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/employees/Leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )} */}
        {/*--------------------------------------------- modal area------------------------ */}
        {/*--------------------------------------------- modal area------------------------ */}
        {console.log(notesData, "setNotesData")}
        <Modal
          show={showLeadStatusModal}
          onHide={handleClose}
          className="add_details_modal"
        >
          <Modal.Header>
            <Modal.Title> Lead Status </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid add_detail_frm">
              <div className="row">
                <div className="col-lg-12 text-end mb-4">
                  {leadStatusReason.map((el, key) => {
                    return (
                      <button
                        key={key}
                        className="btn-cancle col-lg-12 mb-3"
                        // onChange={()=>{setNotesData(el.heading)}}
                        onClick={(e) => {
                          setNotesData(el.heading);
                        }}
                      >
                        {el.heading}
                      </button>
                    );
                  })}

                  <input
                    type="date"
                    placeholder="Date"
                    class="form-control"
                    value={leadStatusDate}
                    onChange={(e) => setLeadStatusDate(e.target.value)}
                  />
                  <input
                    type="time"
                    placeholder="Time"
                    class="form-control"
                    value={leadStatusTime}
                    onChange={(e) => setLeadStatusTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {isOtherReason && (
              <div>
                <div className="col-lg-12">
                  <textarea
                    type="text"
                    name="OtherReason"
                    class="form-control"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                  />
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowLeadStatusModal(false);
                clearFunc();
              }}
            >
              Close
            </Button>
            {/* <Button
              variant="secondary"
              onClick={(e) => {
                handleSubmit(e)
                setShowLeadStatusModal(false);
                clearFunc();
              }}
            >
              Close
            </Button> */}
            {/* {isOtherReason &&
              leadStatusReason.map((el, i) => { */}
            {/* if (el.heading == "Other Reason") {
                  return ( */}
            <Button
              // key={i}
              variant="primary"
              className="btn-cancle col-lg-8   mt-3"
              onClick={(el) => {
                handleSubmitStatusOfLead(el);
                setSendDataToDb(true);
              }}
            >
              Submit
            </Button>
            {/* );
                }
              // })} */}
          </Modal.Footer>
        </Modal>
        <Modal show={show} onHide={handleClose} className="add_details_modal">
          <Modal.Header>
            <Modal.Title> Add Details </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid add_detail_frm">
              <div className="row">
                <div className="col-lg-12">
                  <p>Traveler Details</p>
                </div>
                <div className="col-lg-5 col-sm-6">
                  <div className="form-group">
                    <label>
                      Full Name <span>*</span>{" "}
                    </label>
                    <input type="text" name="name" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-4">
                  <div className="form-group">
                    <label>
                      age <span>*</span>{" "}
                    </label>
                    <input type="text" name="name" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="form-group">
                    <label>Passport Number </label>
                    <input type="text" name="" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="form-group">
                    <label>Issued Date DD/MM/YY</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="form-group">
                    <label>Expiry Date DD/MM/YY</label>
                    <DatePicker
                      selected={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="form-group">
                    <label>Issued place</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label>Passport Front Page </label>
                    <input type="file" name="file" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label>Pancard Number </label>
                    <input type="text" name="file" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label>Pancard Front Page </label>
                    <input type="file" name="file" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label>Other Documents </label>
                    <input type="file" name="file" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div className="foter-modal">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <p>
                      Note: Please select multiple files to upload in one go.
                    </p>
                  </div>
                  <div className="col-lg-6 text-end">
                    <Button className="btn-cancle" onClick={handleClose}>
                      {" "}
                      Cancel{" "}
                    </Button>{" "}
                    &nbsp;
                    <Button className="btn-submit" onClick={handleClose}>
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* sedasdfasdfdddddddddddddddddddddddddddddddddddddd */}
        <Modal show={show1} onHide={handleClose1} className="add_note">
          <Modal.Header>
            <Modal.Title>
              Add Note<span>TRIP ID 3852943</span>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="section_progress ">
              <div className="icon_note">
                <i className="fa fa-volume-up" aria-hidden="true"></i>
              </div>

              <div className="icon_text">
                <p>Talk in progress with traveler</p>
                <p>Traveler interested, but will book after few weeks </p>
              </div>
            </div>
            <div className="container mt-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Your Note</label>
                    <textarea
                      name=""
                      className="form-control"
                      rows="100"
                      placeholder="Enter additional information..."
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="form-group">
                    <label>Set Reminder </label>
                    <DatePicker
                      selected={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="foter-modal">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <Button className="btn-cancle" onClick={handleClose1}>
                      {" "}
                      Cancel{" "}
                    </Button>{" "}
                    &nbsp;
                    <Button className="btn-submit" onClick={handleClose1}>
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/*------------------------------------------- addddddd notsssss-------------------------------------- */}
        {/*------------------------------------------- addddddd notsssss-------------------------------------- */}
      </Scrollbars>
    </div>
  );
};

export default LeadSidebar;
