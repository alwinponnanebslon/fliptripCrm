/**
 * App Header
 */
import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
// import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { DashboardBox, DashboardTable } from "../../utils/DashboardBox";
import DataTable from "react-data-table-component";

import {
  Avatar_02,
  Avatar_03,
  Avatar_06,
  Avatar_13,
  Avatar_17,
  Avatar_21,
  headerlogo,
} from "../../Entryfile/imagepath";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";

import { useSelector } from "react-redux";

import { notificationGetForSpecificUser } from "../../redux/features/notification/notificationSlice";
import { getAllLeadSearchQuery } from "../../Services/lead.service";

import {
  reminderGetForOneDay,
  reminderGet,
} from "../../redux/features/reminder/reminderSlice";
import { leadGet } from "../../redux/features/lead/leadSlice";
// import { Bell, BookOpen, AlertTriangle } from 'react-feather';

const Header = (props) => {
  let history = useHistory();
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.user?._id);

  const [query, setQuery] = useState("");
  const notificationResultArr = useSelector(
    (state) => state.notification.notifications
  );
  const reminderArray = useSelector((state) => state.reminder.reminders);
  const leadArray = useSelector((state) => state.lead.leadArr);
  const [dataArr, setDataArr] = useState([]);
  const [reminderArr, setReminderArr] = useState([]);
  const [reminderArrData, setReminderArrData] = useState([]);
  const [leadArr, setLeadArr] = useState([]);
  const [isNotificationRead, setIsNotificationRead] = useState(false);
  const [messageCount, setMessageCount] = useState(dataArr.length);
  const [changeNotificationColor, setChangeNotificationColor] =
    useState("Gray");
  // reminderArrData
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchDataArr, setSearchDataArr] = useState([]);
  const dispatch = useDispatch();

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  useEffect(() => {
    dispatch(leadGet());
  }, []);
  useEffect(() => {
    // console.log(leadArray, "leadArray123");
    setLeadArr(leadArray);
    // dispatch(leadGet());
  }, [leadArray]);

  const onMenuClik = () => {
    props.onMenuClick();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let pathname = location.pathname;
  const handleInit = () => {
    // console.log("user123");
    let obj = {
      role,
      userId,
    };
    dispatch(notificationGetForSpecificUser(userId));
    dispatch(reminderGetForOneDay(obj));
    dispatch(reminderGet(userId));
  };

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    // console.log(notificationResultArr, "notificationResultArr23");
    // console.log(userId, "userId343");
    let filter = notificationResultArr.filter((el) => {
      // console.log(el.userId, "el.user23");
      if (`${el?.userId}` == `${userId}`) {
        return el;
      }
    });
    // console.log(filter, "234");
    // console.log(userId, "u1serId343");
    setDataArr(filter);

    // setDataArr(notificationResultArr);
  }, [notificationResultArr]);

  useEffect(() => {
    // console.log(reminderArray, "reminderArray324");
    setReminderArrData(reminderArray);
  }, [reminderArray]);

  // const handleSearchLead = (value) => {
  //   // console.log(value, "vlue");
  //   // console.log(leadArr, "123vlue");

  //   const filteredData = leadArr.filter((el) => {
  //     if (value === "") {
  //       return el.clientObj.name;
  //     } else {
  //       // return el.clientObj.name.toLowerCase().includes(value);
  //       setShowSearchResult(true);
  //       return el?.clientObj?.phone.toLowerCase().includes(value);
  //     }
  //   });
  //   setSearchDataArr(filteredData);

  // };
  const handleSearchLead = async () => {
    console.log(query, "vlue");
    // console.log(leadArr, "123vlue");

    const filteredData = await getAllLeadSearchQuery(`name=${query}`);
    console.log(filteredData, "filteredData34 ");

    if (filteredData && filteredData?.data && filteredData?.data?.data) {
      setSearchDataArr(filteredData?.data?.data);
      setShowSearchResult(true);
    }
    // const filteredData = await getAllLeadSearchQuery.filter((el) => {
    // if (value === "") {
    //   return el.clientObj.name;
    // } else {
    //   // return el.clientObj.name.toLowerCase().includes(value);
    //   setShowSearchResult(true);
    //   return el?.clientObj?.phone.toLowerCase().includes(value);
    // }
    // });
    // setSearchDataArr(filteredData);
  };
  // console.log(dataArr, "data23")
  const handleClick = (index) => {
    // let tempArr = [...dataArr]
    // ("use strict");
    let tempList = [...dataArr];
    // let totalAmount = 0;

    // if (currentObj) {
    if (tempList[index]) {
      // console.log(currentObj, "1325465")
      setChangeNotificationColor("LightGray");
    }

    setDataArr([...tempList]);

    // console.log(value, "234567890")
    // setChangeNotificationColor("LightGray")
    // props.onMenuClick();
    // setIsNotificationRead(true);
  };

  const handleReadNotification = (value) => {
    props.onMenuClick();
    setIsNotificationRead(true);
  };

  const category_columns = [
    {
      name: "S.NO.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Subject",
      selector: (row) => row?.subject,
      width: "14%",
    },
    {
      name: "Client Name",
      selector: (row) => row?.clientObj?.name,
      width: "10%",
    },
    {
      name: "Client Phone",
      selector: (row) => row?.clientObj?.phone,
      width: "10%",
    },
    {
      name: "Created At",
      selector: (row) =>
        new Date(row?.createdAt).toLocaleDateString() +
        " at " +
        new Date(row?.createdAt).toLocaleTimeString(),
      width: "20%",
    },
    {
      name: "Created By",
      selector: (row) => row?.createdBy?.name + " " + row?.createdBy?.email,
      width: "18%",
    },

    {
      name: "View In Brief",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => (
        // <div className="col-auto float-end ml-auto">
        //   <a
        //     href={`/admin/lead/${row._id}`}
        //     className="btn add-btn"
        //     onClick={() => {
        //       history.push(`/admin/lead/${row._id}`);
        //       // href={`/admin/lead/${row._id}`}
        //     }}
        //   >
        //     <i className="fa fa-view" />
        //     click to view
        //   </a>
        // </div>

        <button
          onClick={() => {
            history.push(`/admin/lead/${row._id}`);
          }}
        >
          VIEW
        </button>
      ),
      width: "5%",
    },
    {
      name: (
        <div className="col-auto float-end ml-auto">
          <a
            href="#"
            className="btn add-btn"
            onClick={() => {
              setShowSearchResult(false);
            }}
          >
            <i className="fa fa-close" />
            Close Tab
          </a>
        </div>

        // <button
        //   onClick={() => {
        //     setShowSearchResult(false);
        //   }}
        // >
        //   {" "}
        //   close tab
        // </button>
      ),

      // selector: (row) => row?.createdBy?.name + " " + row?.createdBy?.email,
    },
  ];

  const mystyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    padding: "1px",
    fontFamily: "Arial",
  };

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      {/* <div className="header-left">
       <Link to="/app/main/dashboard" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </Link> 
      </div> */}
      {/* /Logo */}
      {/* <a
        id="toggle_btn"
        href="#"
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
        onClick={handlesidebar}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </a> */}
      {/* Header Title */}
      <div className="page-title-box">
        <h3>Fliptrip Holidays</h3>
      </div>
      {/* /Header Title */}
      {/* <a
        id="mobile_btn"
        className="mobile_btn"
        href="#"
        onClick={() => onMenuClik()}
      >
        <i className="fa fa-bars" />
      </a> */}
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item">
          <div className="top-nav-search">
            <a href="#" className="responsive-search">
              <i className="fa fa-search" />
            </a>
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search Here"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
              />
              <button className="btn" type="button">
                <i
                  className="fa fa-search"
                  // type="text"
                  onClick={() => {
                    handleSearchLead();
                  }}
                />
              </button>
            </form>
          </div>
        </li>
        {/* 

*/}

        {/* {searchDataArr && */}

        {/* 

 */}
        <li className="nav-item dropdown">
          <a
            // href=""
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            {/* <i className="fa fa-bell-o" /> */}
            {/* <span className="badge badge-pill">{dataArr.length}</span> */}
          </a>
          <div className="dropdown-menu notifications">
            {/* <div className="topnav-dropdown-header"> */}
            {/* <span className="notification-title">Notifications</span> */}
            {/* <a href="" className="clear-noti">
                Clear All
              </a> */}
            {/* </div> */}
            {/* {console.log(dataArr, "123213")} */}
            <div className="search-content">
              <ul className="search-list">
                {dataArr &&
                  dataArr.map((el, index) => {
                    return (
                      // <li className="notification-message" key={index}>
                      <li className="notification-message" key={index}>
                        {/* <div className="float-end">
                          <a
                            className="btn btn-blue"
                            readOnly={isNotificationRead ? true : false}
                            onClick={(e) => {
                              handleReadNotification(e.target.value);
                            }}
                          >
                            <i /> mark as read
                          </a>
                        </div> */}
                        <Link
                          onClick={() =>
                            localStorage.setItem("minheight", "true")
                          }
                          to="/admin/notification"
                        >
                          <div className="media">
                            {/* <span className="avatar">
                              <img alt="" src={Avatar_02} />
                            </span> */}
                            <div className="media">
                              <p className="noti-details d-flex">
                                <h5> Heading : </h5> {el?.heading}&nbsp;
                              </p>
                              <p className="noti-details d-flex">
                                <h5> Decription : </h5> {el?.description}&nbsp;
                              </p>
                              <p className="noti-details d-flex">
                                <h5>Name : </h5> {el?.createdBy?.name}&nbsp;
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                {/* <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">
                                  {el?.heading}&nbsp;
                                  {el?.description}
                                </span>
                                from &nbsp;
                           
                                <span className="noti-title">
                                  {el?.createdBy?.name}
                                </span>
                              </p>
                            </div> */}
                {/* <li className="notification-message">
                  <Link
                    onClick={() => localStorage.setItem("minheight", "true")}
                    to="/app/administrator/activities"
                  >
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_03} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Tarah Shropshire</span>{" "}
                          changed the task name{" "}
                          <span className="noti-title">
                            Appointment booking with payment gateway
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li> */}

                {/* <li className="notification-message">
                  <Link
                    onClick={() => localStorage.setItem("minheight", "true")}
                    to="/app/administrator/activities"
                  >
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_13} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Bernardo Galaviz</span>{" "}
                          added new task{" "}
                          <span className="noti-title">
                            Private chat module
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">2 days ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* <div className="topnav-dropdown-footer">
              <Link
                onClick={() => localStorage.setItem("minheight", "true")}
                to="/admin/notification"
              >
                View all Notifications
              </Link>
            </div> */}
          </div>
        </li>

        {/*
         */}
        <li className="nav-item dropdown">
          <a
            // href=""
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell-o" />
            <span className="badge badge-pill">{dataArr.length}</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              {/* <a href="" className="clear-noti">
                Clear All
              </a> */}
            </div>
            {/* {console.log(dataArr, "123213")} */}
            <div className="noti-content">
              <ul className="notification-list">
                {dataArr &&
                  dataArr.map((el, index) => {
                    return (
                      // <li className="notification-message" key={index}>

                      <li key={index}>
                        {/* <div className="float-end">
                          <a
                            className="btn btn-blue"
                            readOnly={isNotificationRead ? true : false}
                            onClick={(e) => {
                              handleReadNotification(e.target.value);
                            }}
                          >
                            <i /> mark as read
                          </a>
                        </div> */}
                        {/* <div className="notification-container">
                          <div className=
                            {
                              el ?
                                'notification notify show-count' :
                                'notification notify'
                            }
                            data-count={messageCount}
                            onClick={event => handleClick(event)}>
                            <Bell color={'#282828'} size={30} />
                          </div>
                        </div> */}
                        <Link
                          onClick={() => {
                            localStorage.setItem("minheight", "true");
                            handleClick(index);
                          }}
                          to="#"
                          // to="/admin/notification"
                        >
                          {/* <div
                            style={{ backgroundColor: changeNotificationColor }}
                            index={index}
                          > */}
                          <div className="media ">
                            <p className="noti-details d-flex">
                              {/* <div > */}
                              <h5> {el?.createdBy?.name + "  "} :</h5>
                              <h5>{" " + el?.heading}</h5>
                              &nbsp;
                              {/* </div> */}
                            </p>
                            <p className="noti-details d-flex">
                              <h5> {el?.description} </h5> &nbsp;
                            </p>

                            <p className="noti-details d-flex">
                              <h5>
                                {new Date(el?.followDate).toLocaleDateString()}{" "}
                                at {el?.followTime}
                              </h5>
                              &nbsp;
                            </p>

                            {/* </div> */}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                {/* <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">
                                  {el?.heading}&nbsp;
                                  {el?.description}
                                </span>
                                from &nbsp;
                           
                                <span className="noti-title">
                                  {el?.createdBy?.name}
                                </span>
                              </p>
                            </div> */}

                {/* <li className="notification-message">
                  <Link
                    onClick={() => localStorage.setItem("minheight", "true")}
                    to="/app/administrator/activities"
                  >
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_17} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Rolland Webber</span>{" "}
                          completed task{" "}
                          <span className="noti-title">
                            Patient and Doctor video conferencing
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <Link
                onClick={() => localStorage.setItem("minheight", "true")}
                to="/admin/notification"
              >
                View all Notifications
              </Link>
            </div>
          </div>
        </li>
        {/* 
        
        */}
        <li className="nav-item dropdown">
          <a
            href=""
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            {/* <i class="fa-solid fa-alarm-clock"></i> */}
            {/*   <FontAwesomeIcon icon="fa-solid fa-alarm-clock" /> */}
            <i className="fa fa-clock-o" />
            <span className="badge badge-pill">{reminderArrData.length}</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Reminder</span>
              {/* <a href="" className="clear-noti">
                Clear All
              </a> */}
            </div>
            {/* {console.log(reminderArrData, "reminderArrData123213")} */}
            <div className="noti-content">
              <ul className="notification-list">
                {reminderArrData &&
                  reminderArrData.map((el, index) => {
                    return (
                      <li className="notification-message" key={index}>
                        <Link
                          onClick={() =>
                            localStorage.setItem("minheight", "true")
                          }
                          to="/admin/reminder"
                        >
                          {/* <div
                            style={{ backgroundColor: changeNotificationColor }}
                            index={index}
                          > */}
                          <div className="media ">
                            <p className="noti-details d-flex">
                              <h5>{" " + el?.heading}</h5>
                              &nbsp;
                              {/* </div> */}
                            </p>

                            <p className="noti-details d-flex">
                              <h5>
                                {el.description
                                  ? el?.description
                                  : el?.otherReason}
                              </h5>
                              &nbsp;
                            </p>
                            <p className="noti-details d-flex">
                              <h5>
                                {el.followDate
                                  ? new Date(
                                      el?.followDate
                                    ).toLocaleDateString()
                                  : new Date(
                                      el?.leadStatusDate
                                    ).toLocaleDateString()}
                                at
                                {el.followTime
                                  ? el?.followTime
                                  : el?.leadStatusTime}
                                {/* {new Date(el?.followDate).toLocaleDateString()}{" "}
                                at {el?.followTime} */}
                              </h5>
                              &nbsp;
                            </p>
                          </div>
                          {/* 
                          <div className="media">
                            <p className="noti-details d-flex">
                              <h5> follow date : </h5>{" "}
                              {new Date(el?.followDate).toLocaleDateString()}
                              &nbsp;
                            </p>
                            <p className="noti-details d-flex">
                              <h5> follow Time : </h5> {el?.followTime}&nbsp;
                            </p>
                          </div> */}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <Link
                onClick={() => localStorage.setItem("minheight", "true")}
                to="/admin/reminder"
              >
                View all Reminders
              </Link>
            </div>
          </div>
        </li>
        {/* /Notifications */}
        {/* Message Notifications */}

        {/* /Message Notifications */}
        <li className="nav-item dropdown has-arrow main-drop">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img me-1">
              <img src={Avatar_21} alt="" />
              <span className="status online" />
            </span>
            <span>{role}</span>
          </a>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to={`/admin/employee-profile/${user?._id}`}
            >
              My Profile
            </Link>
            {/* <Link className="dropdown-item" to="/settings/companysetting">
              Settings
            </Link> */}
            <p className="dropdown-item" onClick={() => handleLogout()}>
              Logout
            </p>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      {showSearchResult && (
        <div className="container">
          <DashboardTable>
            <DataTable
              columns={category_columns}
              data={
                searchDataArr && searchDataArr.length > 0 ? searchDataArr : []
              }
              pagination
            />
          </DashboardTable>
        </div>
      )}
      <div className="dropdown mobile-user-menu">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/app/profile/employee-profile">
            My Profile
          </Link>
          {/* <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link> */}
          <p className="dropdown-item" onClick={() => handleLogout()}>
            Logout
          </p>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default withRouter(Header);
