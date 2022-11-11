import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { admin, rolesObj } from "../../utils/roles";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
const Sidebar = (props) => {
  const role = useSelector((state) => state.auth.role);

  const [isSideMenu, setSideMenu] = useState("");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");
  const [pathname, setPathName] = useState("");
  // const [leadId, setLeadId] = useState("")

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

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };

  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);
  // console.log(pathname, "athName2");///admin/leads athName2
  const { leadId } = useParams();

  // useEffect(() => {
  //   if(params.leadId){
  //     setLeadId(params.leadId)
  //   }
  // }, [params]);
  console.log(leadId, "leadidadasdjddij");
  console.log(props, "leadidadasdjddij");
  return (
    <div className="sidebar" id="sidebar">
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
        {role == admin && (
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
                            pathname?.includes("admin/dashboard")
                              ? "active"
                              : ""
                          }
                          to="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                {/*  */}
                <li className="submenu">
                  <a
                    href="#"
                    className={isSideMenu == "costing" ? "subdrop" : ""}
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
                            pathname?.includes("admin/dashboard")
                              ? "active"
                              : ""
                          }
                          to="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                {/*  */}

                <li className={pathname?.includes("clients") ? "active" : ""}>
                  <Link to="/admin/clients">
                    <i className="la la-users" /> <span>Clients</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("destinations") ? "active" : ""}
                >
                  <Link to="/admin/destinations">
                    <i className="la la-globe" /> <span>Destinations</span>
                  </Link>
                </li>
                {/* <li
                  className={
                    pathname?.includes("costing sheet") ? "active" : ""
                  }
                >
                  <Link to="/admin/costingSheet">
                    <i className="la la-hotel" /> <span>CostingSheet</span>
                  </Link>
                </li> */}
                <li
                  className={
                    pathname?.includes("leads")
                      ? "active"
                      : pathname?.includes("Lead-view")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {role == rolesObj.TEAMLEAD && (
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
                            pathname?.includes("admin/dashboard")
                              ? "active"
                              : ""
                          }
                          to="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={isSideMenu == "employee" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "employee" ? "" : "employee")
                    }
                  >
                    <i className="la la-user" />{" "}
                    <span className="noti-dot"> Employees</span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "employee" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname?.includes("allemployees")
                              ? "active"
                              : pathname?.includes("employees-list")
                              ? "active"
                              : ""
                          }
                          to="/admin/employee"
                        >
                          All Employees
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className={pathname?.includes("clients") ? "active" : ""}>
                  <Link to="/admin/clients">
                    <i className="la la-users" /> <span>Clients</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("destinations") ? "active" : ""}
                >
                  <Link to="/admin/destinations">
                    <i className="la la-globe" /> <span>Destinations22</span>
                  </Link>
                </li>
                <li
                  className={
                    pathname?.includes("leads")
                      ? "active"
                      : pathname?.includes("Lead-view")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {role == rolesObj.SPOKE && (
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
                            pathname?.includes("admin/dashboard")
                              ? "active"
                              : ""
                          }
                          to="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li className={pathname?.includes("clients") ? "active" : ""}>
                  <Link to="/admin/clients">
                    <i className="la la-users" /> <span>Clients</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("destinations") ? "active" : ""}
                >
                  <Link to="/admin/destinations">
                    <i className="la la-globe" /> <span>Destinations11</span>
                  </Link>
                </li>
                <li
                  className={
                    pathname?.includes("leads")
                      ? "active"
                      : pathname?.includes("Lead-view")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/leads">
                    <i className="la la-ticket" /> <span>Leads</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/*--------------------------------------------- modal area------------------------ */}
        {/*--------------------------------------------- modal area------------------------ */}
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
                <i class="fa fa-volume-up" aria-hidden="true"></i>
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
        <Modal show={show2} onHide={handleClose2} className="add_note">
          <Modal.Header>
            <Modal.Title>Add Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Your Note</label>
                    <textarea
                      name=""
                      className="form-control"
                      cols="1000"
                      rows="100"
                      placeholder="Your Notes"
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
                    <Button className="btn-cancle" onClick={handleClose2}>
                      {" "}
                      Cancel{" "}
                    </Button>{" "}
                    &nbsp;
                    <Button className="btn-submit" onClick={handleClose2}>
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Scrollbars>
    </div>
  );
};

export default Sidebar;
