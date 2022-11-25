/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Quotation from "../../../_components/quotation/Quotation.jsx";
import addQuotation from "../../../_components/quotation/addQuotation";

import {
  User,
  Avatar_19,
  Avatar_07,
  Avatar_06,
  Avatar_14,
} from "../../../Entryfile/imagepath.jsx";

import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import "../../index.css";
import { admin, leadStatus, rolesObj } from "../../../utils/roles";
import { toastError, toastSuccess } from "../../../utils/toastUtils";

import {
  getLeadsByRole,
  getAllLeadOfTenDays,
  getLeadFilterByDate,
} from "../../../Services/lead.service";

import {
  getAll,
  getAllCost,
  getAllSalesOfTenDays,
} from "../../../Services/costingSheet.services";
import { getRemainderApi } from "../../../Services/remainder.service";

import {
  remainderGet,
  remainderGetForOneDay,
} from "../../../redux/features/remainder/remainderSlice";

import {
  notificationGet,
  addNotification,
  setNotification,
} from "../../../redux/features/notification/notificationSlice";

import { date } from "yup/lib/locale.js";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [leadsArr, setLeadsArr] = useState([]);
  const [displayLeadsArr, setDisplayLeadsArr] = useState([]);

  const [displayCostingSheetArr, setDisplayCostingSheetArr] = useState([]);
  const [costingSheetArr, setCostingSheetArr] = useState([]);
  const [displayAllCostObj, setDisplayAllCostObj] = useState({});
  const [allCostObj, setAllCostObj] = useState({});
  const [allLeadArr, setAllLeadArr] = useState([]);
  const [allSalesArr, setAllSalesArr] = useState([]);
  const [isNotificationOccurs, setIsNotificationOccurs] = useState(false);

  const [remainderArr, setRemainderArr] = useState([]);

  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const userAuthorise = useSelector((state) => state.auth);

  const [menu, setMenu] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [notificationArray, setNotificationArray] = useState([]);

  const userId = useSelector((state) => state.auth?.user?._id);
  const RemainderArray = useSelector((state) => state.remainder.remainders);

  const handleInit = async () => {
    console.log("1234");
    let obj = { userId, role };
    console.log(obj, "obj12");
    dispatch(remainderGetForOneDay(obj));
    // const arr = await getRemainderApi(role, userId);
    // console.log(arr, "arr32");
    // dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    console.log(RemainderArray, "123 RemainderArray");
    setRemainderArr(RemainderArray);
  }, [RemainderArray]);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  let { adminId } = useParams();

  useEffect(() => {
    let firstload = localStorage.getItem("firstload");
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1);
        localStorage.removeItem("firstload");
      }, 1000);
    }
  });

  const handleGetCostingSheet = async () => {
    try {
      let { data: res } = await getAll(userObj?._id, role);
      // console.log(res, "getcosting4");
      if (res.success) {
        setDisplayCostingSheetArr(res.data);
        setCostingSheetArr(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };
  let array2 = [];

  function myCallback() {
    array2 = [];
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}`;
    let temp = [];
    for (let el of remainderArr) {
      // console.log(el.followTime, "el23");
      console.log(time, "current time");
      console.log(time == el.followTime, "3time34");
      // if (el.followTime.includes("0")) {
      //   time = time + "";
      //   time = 0 + time;
      //   if (el.followTime == time) {
      //     array2.push(el);
      //   }
      // } else
      if (el.followTime == time) {
        temp.push(el);
      }

      // console.log(array2, "afwe3");
      // setNotificationArray(array2);
      // console.log(el, "el213");
      // date.setTime(
      //   new Date().getTime() + (5 * 60 * 60 * 1000 + 1 * 60 * 30 * 1000)
      // );
      // let GetHours = date.getUTCHours();
      // let currentTime = el.followTime.split(":");
      // let time = `${new Date().getHours()}:${new Date().getMinutes()}`;
      // date = new Date();
      // date.setTime(
      //   new Date().getTime() + (5 * 60 * 60 * 1000 + 1 * 60 * 30 * 1000)
      // );
      // let getMinute = date.getUTCMinutes();
      // let getHoursDB = parseInt(el.followTime[0] + el.followTime[1]);
      // if (getHoursDB == GetHours) {
      //   // console.log(el, "el234");
      //   let getMinutesDB = parseInt(el.followTime[3] + el.followTime[4]);
      //   if (getMinute == getMinutesDB) {
      //     console.log(getMinutesDB, "getMinutesDB123");
      //     array2.push(el);
      //   }
      // }
      // let date = Date.parse(new Date());
      // var currentDate = new Date(new Date().getTime()); //-30 * 100)
      // var difference = currentDate.getMinutes() - 1; //a minute ago
      // currentDate.setMinutes(difference);
      // currentDate = Date.parse(currentDate);
      // if (
      //   Date.parse(el.createdAt) <= date &&
      //   Date.parse(el.createdAt) >= currentDate
      // ) {
      //   arr.push(el);
      // }
    }
    if (array2.length == 0) {
      array2.push(...temp);
    }
  }
  let checkNotificationArray = async () => {
    if (array2.length > 0) {
      setIsNotificationOccurs(true);
      // dispatch()
      // if (notificationArray.length > 0) {
      // } else {
      //   setNotificationArray(array2);
      //   array2 = [];
      // }
      // dispatch(addNotification(array2));
    }
  };

  useEffect(() => {
    if (array2.length > 0) {
      setIsNotificationOccurs(true);
      dispatch(addNotification(array2));
      array2 = [];
    }
    // checkNotificationArray();
  }, [array2]);

  setInterval(myCallback(), 100000);
  // setInterval(checkNotificationArray(), 200000);

  // useEffect(() => {
  //   // array2 = [];

  //   let dateStart = new Date();
  //   console.log(dateStart, "date");
  //   dateStart.setHours(0, 0, 0, 0);
  //   let dateEnd = new Date();
  //   dateEnd.setHours(23, 59, 59, 59);

  //   let time = `${new Date().getHours()}:${new Date().getMinutes()}`;
  //   let time2 = `${new Date().getHours()}:${new Date().getMinutes()}`;
  //   console.log(time2 == time, "asd");
  //   //  var wetime=ISODate(time)
  //   //  var et=dateStart.toTimeString()
  //   //  var et=Date.UTC(date.getFullYear())

  //   console.log(new Date().getHours(), "23");
  // }, [array2]);

  const handleGetAllLeads = async () => {
    try {
      let { data: res } = await getLeadsByRole(userObj?._id, role);
      console.log(res, "resres4");
      if (res.success) {
        let tempArr = res.data;

        if (userAuthorise.role == "SPOKE") {
          let temp = tempArr.filter(
            (el) => `${el.agentId}` == `${userAuthorise?.user?._id}`
          );

          setDisplayLeadsArr(temp);
          setLeadsArr(temp);
        } else if (userAuthorise.role == "TEAMLEAD") {
          let temp = tempArr.filter(
            (el) =>
              el.agentId == userAuthorise?.user?._id ||
              el.leadId == userAuthorise?.user?._id
          );
          setDisplayLeadsArr(temp);
          setLeadsArr(temp);
        } else {
          setDisplayLeadsArr(res.data);
          setLeadsArr(res.data);
        }
      }
    } catch (error) {
      // console.error(error);
      toastError(error);
    }
  };

  const handleGetTotalCost = async () => {
    try {
      let { data: res } = await getAllCost(userAuthorise?.user?._id, role);
      // console.log(res.data, "getAllcost4");
      if (res.success) {
        setDisplayAllCostObj(res.data);
        setAllCostObj(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleGetAllLeadOfTenDays = async () => {
    try {
      let { data: res } = await getAllLeadOfTenDays(userObj?._id, role);
      console.log(res.data, "getAlLEAD34");

      let allLeadArr = res.data;
      let tempArray = [];
      for (let el of allLeadArr) {
        tempArray.push({
          y: el.date + "",
          "Total Lead": el.totalLead,
          "Total Convert Lead": el.closedLead,
        });
      }
      setAllLeadArr(tempArray);
    } catch (error) {
      toastError(error);
    }
  };
  const handleGetAllSalesOfTenDays = async () => {
    try {
      let { data: res } = await getAllSalesOfTenDays(
        `leadId=${userAuthorise.user?._id}`
      );
      console.log(res.data, "gew34");
      // { y: "2006", "Total Sales": 50, "Total Revenue": 90 },
      let allLeadArr = res.data;
      let tempArray = [];
      for (let el of allLeadArr) {
        tempArray.push({
          y: el.date + "",
          "Total Sales": el.totalCost,
          "Total Revenue": el.profit,
        });
      }
      setAllSalesArr(tempArray);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    handleGetAllLeads();
    handleGetCostingSheet();
    handleGetTotalCost();
    handleGetAllLeadOfTenDays();
    // handleGetAllSalesOfTenDays();
  }, []);

  let closedLeadArr = [];
  let inProgressArr = [];
  let onHoldArr = [];
  let declinedArr = [];

  // useEffect(() => {
  let temp = [...leadsArr];

  temp.map((x) => {
    if (
      x.status == leadStatus?.closed ||
      x.status == leadStatus?.closedBySpoke
    ) {
      closedLeadArr.push(x);
    } else if (
      x.status == leadStatus.open ||
      x.status == leadStatus.in_Progress ||
      x.status == leadStatus.reopened
    ) {
      inProgressArr.push(x);
    } else if (x.status == leadStatus.on_Hold) {
      onHoldArr.push(x);
    } else if (x.status == leadStatus.cancelled) {
      declinedArr.push(x);
    }
  });
  // }, []);

  const handleFilterDateFrom = async (query) => {
    setDateFrom(new Date(query).toISOString());
  };

  const handleFilterDateFromAndTo = async () => {
    if (dateTo != "" && dateFrom != "") {
      // let getfilterLead = await getLeadFilterByDate(
      let { data: res } = await getLeadFilterByDate(
        dateFrom,
        dateTo,
        role,
        userAuthorise?.user?._id
      );
      console.log(res.data, "g1");
      setDisplayLeadsArr(res.data);
      setLeadsArr(res.data); ////////////////////////
      // let allLeadArr = res.data;
      // let tempArray = [];
      // for (let el of allLeadArr) {
      //   tempArray.push({
      //     y: el.date + "",
      //     "Total Lead": el.totalLead,
      //     "Total Convert Lead": el.closedLead,
      //   });
      // }
      // setAllLeadArr(tempArray);
      let allLeadArr = res.arr;
      console.log(allLeadArr, "allLeadArr213");
      let tempArray = [];
      for (let el of allLeadArr) {
        tempArray.push({
          y: el.date + "",
          "Total Lead": el.totalLead,
          "Total Convert Lead": el.closedLead,
        });
      }
      setAllLeadArr(tempArray);
      let allLeadArray = res.data;
      // let tempArray2 = [];
      // for (let el of allLeadArray) {
      //   tempArray2.push({
      //     y: el.date + "",
      //     "Total Sales": el.totalCost,
      //     "Total Revenue": el.profit,
      //   });
      // }
      setDisplayAllCostObj(res.dataOfCosting);
      setAllCostObj(res.dataOfCosting);
      // setAllSalesArr(tempArray2);
    }
  };

  useEffect(() => {
    handleFilterDateFromAndTo();
  }, [dateFrom, dateTo]);

  const handleFilterDateTo = async (query) => {
    setDateTo(new Date(query).toISOString());
    // query = new Date(query).toISOString();
    // let getfilterLead = await getLeadFilterByDate(query);
    // console.log(getfilterLead.data, "1querytotototo");
  };
  // useEffect(() => {
  //   for (let el of allLeadArr) {
  //     tempArray.push({
  //       y: el.date + "",
  //       "Total Lead": el.totalLead,
  //       "Total Convert Lead": el.closedLead,
  //     });
  //   }
  // }, [allLeadArr]);

  // useEffect(() => {
  //   console.log(tempArray, "a1");
  // }, [tempArray]);

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Dashboard - CRM created by Fliptrip Holidays</title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">WELCOME {role} </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/*
           */}
          {role != rolesObj.ACCOUNT && (
            <div className="row">
              <div className="col-sm-6  col-lg-3 col-xl-2 ">
                <div className="form-group form-focus">
                  <input
                    type="date"
                    // value={employeeNameQuery}
                    onChange={(e) => {
                      handleFilterDateFrom(e.target.value);
                    }}
                    className="form-control floating"
                  />
                  <label className="focus-label">From </label>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3 col-xl-2 ">
                <div className="form-group form-focus">
                  <input
                    // value={employeeNameQuery}
                    onChange={(e) => {
                      handleFilterDateTo(e.target.value);
                    }}
                    type="date"
                    className="form-control floating"
                  />
                  <label className="focus-label">To </label>
                </div>
              </div>
            </div>
          )}
          {role != rolesObj.ACCOUNT && (
            <div className="row">
              <div className="col-md-12">
                <div className="card-group m-b-30">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Solved Leads</span>
                        </div>
                      </div>
                      <h3 className="mb-3">
                        {
                          leadsArr.filter((x) => {
                            return x.status == "CLOSED" ||
                              x.status == "CLOSED_BY_SPOKE"
                              ? "CLOSED"
                              : "";
                          }).length
                        }
                      </h3>
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Open Leads</span>
                        </div>
                      </div>
                      <h3 className="mb-3">
                        {
                          leadsArr.filter((x) => {
                            return x.status == "OPEN" || x.status == "REOPENED";
                          }).length
                        }
                      </h3>
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Pending Leads</span>
                        </div>
                      </div>
                      <h3 className="mb-3">
                        {
                          leadsArr.filter((x) => {
                            return (
                              x.status == "ON_HOLD" || x.status == "IN_PROGRESS"
                            );
                          }).length
                        }
                      </h3>
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Cancel Leads</span>
                        </div>
                      </div>
                      <h3 className="mb-3">
                        {
                          leadsArr.filter((x) => {
                            return x.status == "CANCELLED";
                          }).length
                        }
                      </h3>
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {role != rolesObj.ACCOUNT && (
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Total Lead</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={allLeadArr}
                            margin={{
                              top: 5,
                              right: 5,
                              left: 5,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid />
                            <XAxis dataKey="y" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total Lead" fill="#ff9b44" />
                            <Bar dataKey="Total Convert Lead" fill="#fc6075" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  {/*



                 */}
                  {/* {console.log(allSalesArr, "12allSalesArr")} */}
                  {/* <div className="col-md-6 text-center">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Sales Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart
                            data={allSalesArr}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          >
                            <CartesianGrid />
                            <XAxis dataKey="y" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="Total Sales"
                              stroke="#ff9b44"
                              fill="#ff9b44"
                              strokeWidth={3}
                              dot={{ r: 3 }}
                              activeDot={{ r: 7 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="Total Revenue"
                              stroke="#fc6075"
                              fill="#fc6075"
                              strokeWidth={3}
                              dot={{ r: 3 }}
                              activeDot={{ r: 7 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>

                      </div>
                    </div>
                  </div> */}
                  {/* 
                
                */}
                </div>
              </div>
            </div>
          )}
          {role != rolesObj.ACCOUNT && (
            <div className="row">
              <div className="col-md-12">
                <div className="card-group m-b-30">
                  {/* <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">New Employees</span>
                      </div>
                      <div>
                        <span className="text-success">+10%</span>
                      </div>
                    </div>
                    <h3 className="mb-3">10</h3>
                    <div className="progress mb-2" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "70%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="mb-0">Overall Employees 218</p>
                  </div>
                </div> */}
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Total Cost</span>
                        </div>
                        <div>
                          {/* <span className="text-success">+12.5%</span> */}
                        </div>
                      </div>
                      <h3 className="mb-3">
                        ₹ {allCostObj.totalCostingCurrentMonth}
                      </h3>
                      {/* <h3 className="mb-3">$1,42,300</h3> */}
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      {/* <p className="mb-0">
                      Previous Month
                      <span className="text-muted">
                        ₹ {allCostObj.totalCostingPreviousMonth}
                      </span>
                    </p> */}
                    </div>
                  </div>
                  {/*
                   */}
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Expenses</span>
                        </div>
                        <div>
                          {/* <span className="text-danger">-2.8%</span> */}
                        </div>
                      </div>

                      <h3 className="mb-3">
                        ₹ {allCostObj.totalExpenseCurrentMonth}
                      </h3>
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      {/* <p className="mb-0">
                      Previous Month{" "}
                      <span className="text-muted">
                        ₹ {allCostObj.totalExpensePreviousMonth}
                      </span>
                    </p> */}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Profit</span>
                        </div>
                        {/* <div>
                        <span className="text-danger">-75%</span>
                      </div> */}
                      </div>
                      <h3 className="mb-3">
                        ₹ {allCostObj.totalProfitCurrentMonth}
                      </h3>
                      <div className="progress mb-2" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      {/* <p className="mb-0">
                      Previous Month{" "}
                      <span className="text-muted">
                        ₹ {allCostObj.totalProfitPreviousMonth}
                      </span>
                    </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Statistics Widget */}
          <div className="row">
            {/* <div className="col-md-12 col-lg-12 col-xl-6 d-flex">
              <div className="card flex-fill dash-statistics">
                <div className="card-body">
                  <h5 className="card-title">Statistics</h5>
                  <div className="stats-list">
                    <div className="stats-info">
                      <p>
                        Today Leave{" "}
                        <strong>
                          4 <small>/ 65</small>
                        </strong>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "31%" }}
                          aria-valuenow={31}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>
                        Pending Invoice{" "}
                        <strong>
                          15 <small>/ 92</small>
                        </strong>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "31%" }}
                          aria-valuenow={31}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>
                        Completed Projects{" "}
                        <strong>
                          85 <small>/ 112</small>
                        </strong>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "62%" }}
                          aria-valuenow={62}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>
                        Open Leads{" "}
                        <strong>
                          190 <small>/ 212</small>
                        </strong>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "62%" }}
                          aria-valuenow={62}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>
                        Closed Leads{" "}
                        <strong>
                          22 <small>/ 212</small>
                        </strong>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "22%" }}
                          aria-valuenow={22}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* 


*/}

            <div className="col-md-12 col-lg-6 col-xl-12 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h4 className="card-title">Lead Statistics</h4>
                  <div className="statistics">
                    <div className="row">
                      <div className="col-md-6 col-6 text-center">
                        <div className="stats-box mb-4">
                          <p>Total Lead</p>
                          <h3>{leadsArr.length}</h3>
                        </div>
                      </div>
                      <div className="col-md-6 col-6 text-center">
                        <div className="stats-box mb-4">
                          <p>Pending Lead</p>
                          <h3>{leadsArr.length - closedLeadArr.length}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="progress mb-4"> */}
                  {/* <div
                      className="progress-bar bg-purple"
                      role="progressbar"
                      style={{
                        width:
                          closedLeadArr.length > 0
                            ? (closedLeadArr.length / leadsArr.length) * 100
                            : 0,
                      }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {closedLeadArr.length > 0
                        ? (closedLeadArr.length / leadsArr.length) * 100
                        : 0}
                      %
                    </div> */}
                  {/* <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{
                        width:
                          closedLeadArr.length > 0
                            ? (closedLeadArr.length / leadsArr.length) * 100
                            : 0 + "%",
                      }}
                      aria-valuenow={18}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {inProgressArr.length > 0
                        ? (inProgressArr.length / leadsArr.length) * 100
                        : 0}
                      %
                    </div> */}
                  {/* <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "24%" }}
                      aria-valuenow={12}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {onHoldArr.length > 0
                        ? (onHoldArr.length / leadsArr.length) * 100
                        : 0}
                      %
                    </div> */}
                  {/* <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "26%" }}
                      aria-valuenow={14}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {pendingArr.length > 0
                        ? (pendingArr.length / leadsArr.length) * 100
                        : 0}
                      %
                    </div> */}
                  {/* <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "10%" }}
                      aria-valuenow={14}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {declinedArr.length > 0
                        ? (declinedArr.length / leadsArr.length) * 100
                        : 0}
                      %
                    </div> */}
                  {/* </div> */}
                  <div>
                    <p>
                      <i className="fa fa-dot-circle-o text-purple me-2" />
                      Completed Lead
                      <span className="float-end">{closedLeadArr.length}</span>
                    </p>
                    <p>
                      <i className="fa fa-dot-circle-o text-warning me-2" />
                      Inprogress Lead
                      <span className="float-end">{inProgressArr.length}</span>
                    </p>
                    <p>
                      <i className="fa fa-dot-circle-o text-success me-2" />
                      On Hold Lead
                      <span className="float-end">{onHoldArr.length}</span>
                    </p>
                    {/* <p>
                      <i className="fa fa-dot-circle-o text-danger me-2" />
                      Pending Tasks <span className="float-end">47</span>
                    </p> */}
                    <p className="mb-0">
                      <i className="fa fa-dot-circle-o text-info me-2" />
                      Declined Lead
                      <span className="float-end">{declinedArr.length}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h4 className="card-title">
                    Today Absent{" "}
                    <span className="badge bg-inverse-danger ml-2">5</span>
                  </h4>
                  <div className="leave-info-box">
                    <div className="media align-items-center">
                      <Link
                        to="/app/profile/employee-profile"
                        className="avatar"
                      >
                        <img alt="" src={User} />
                      </Link>
                      <div className="media-body">
                        <div className="text-sm my-0">Martin Lewis</div>
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <h6 className="mb-0">4 Sep 2019</h6>
                        <span className="text-sm text-muted">Leave Date</span>
                      </div>
                      <div className="col-6 text-end">
                        <span className="badge bg-inverse-danger">Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="leave-info-box">
                    <div className="media align-items-center">
                      <Link
                        to="/app/profile/employee-profile"
                        className="avatar"
                      >
                        <img alt="" src={User} />
                      </Link>
                      <div className="media-body">
                        <div className="text-sm my-0">Martin Lewis</div>
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <h6 className="mb-0">4 Sep 2019</h6>
                        <span className="text-sm text-muted">Leave Date</span>
                      </div>
                      <div className="col-6 text-end">
                        <span className="badge bg-inverse-success">
                          Approved
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="load-more text-center">
                    <a className="text-dark" href="#">
                      Load More
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          {/* notificationArray */}
          {isNotificationOccurs &&
            array2.map((el, i) => {
              // array2.map((x, i) => {
              //   return (
              //     <div className="row mb-3">
              //       <div class="form-group col-md-4">
              //         <label>Hotel Name</label>
              //         <input
              //           type="text"
              //           name="hotelName"
              //           value={x.heading}
              //           class="form-control"
              //           onChange={(e) => handleinputchange(e, i)}
              //         />
              //       </div>
              //       <div class="form-group col-md-4">
              //         <label>Cost</label>
              //         <input
              //           type="number"
              //           name="cost"
              //           value={x.description}
              //           class="form-control"
              //           onChange={(e) => handleinputchange(e, i)}
              //         />
              //       </div>
              //     </div>
              //   );
              // })}
              return (
                <div
                  className={`modal custom-modal notificationArr text-danger${
                    isNotificationOccurs ? " show " : ""
                  } `}
                  role="dialog"
                  style={{
                    display: `${isNotificationOccurs ? "flex" : "none"}`,
                  }}
                >
                  <div className="modal-dialog  ">
                    <div className="modal-content  ">
                      <div className="modal-header d-block">
                        <button
                          type="button"
                          className="close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setIsNotificationOccurs(false);
                            // clearInterval(setinter1);
                            // notificationArray = [];
                          }}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                        {/* {array2.map((el) => { */}
                        {/* return ( */}
                        <div className="row">
                          <div className="col-12 mb-2">
                            <label>Heading: {el?.heading}</label>
                          </div>
                          <div className="col-12 mb-2">
                            <label>Description: {el?.description}</label>
                          </div>
                        </div>
                        {/* ); */}
                        {/* })} */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* /Statistics Widget */}
          {/* <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Invoices</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-nowrap custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th>Client</th>
                          <th>Due Date</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link to="/app/sales/invoices-view">#INV-0001</Link>
                          </td>
                          <td>
                            <h2>
                              <a href="#">Global Technologies</a>
                            </h2>
                          </td>
                          <td>11 Mar 2019</td>
                          <td>$380</td>
                          <td>
                            <span className="badge bg-inverse-warning">
                              Partially Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link to="/app/sales/invoices-view">#INV-0002</Link>
                          </td>
                          <td>
                            <h2>
                              <a href="#">Delta Infotech</a>
                            </h2>
                          </td>
                          <td>8 Feb 2019</td>
                          <td>$500</td>
                          <td>
                            <span className="badge bg-inverse-success">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link to="/app/sales/invoices-view">#INV-0003</Link>
                          </td>
                          <td>
                            <h2>
                              <a href="#">Cream Inc</a>
                            </h2>
                          </td>
                          <td>23 Jan 2019</td>
                          <td>$60</td>
                          <td>
                            <span className="badge bg-inverse-danger">
                              Unpaid
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/app/sales/invoices">View all invoices</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Payments</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th>Client</th>
                          <th>Payment Type</th>
                          <th>Paid Date</th>
                          <th>Paid Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link to="/app/sales/invoices-view">#INV-0001</Link>
                          </td>
                          <td>
                            <h2>
                              <a href="#">Global Technologies</a>
                            </h2>
                          </td>
                          <td>Paypal</td>
                          <td>11 Mar 2019</td>
                          <td>$380</td>
                        </tr>
                        <tr>
                          <td>
                            <Link to="/app/sales/invoices-view">#INV-0002</Link>
                          </td>
                          <td>
                            <h2>
                              <a href="#">Delta Infotech</a>
                            </h2>
                          </td>
                          <td>Paypal</td>
                          <td>8 Feb 2019</td>
                          <td>$500</td>
                        </tr>
                        <tr>
                          <td>
                            <Link to="/app/sales/invoices-view">#INV-0003</Link>
                          </td>
                          <td>
                            <h2>
                              <a href="#">Cream Inc</a>
                            </h2>
                          </td>
                          <td>Paypal</td>
                          <td>23 Jan 2019</td>
                          <td>$60</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/app/sales/payments">View all payments</Link>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Clients</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="#" className="avatar">
                                <img alt="" src={Avatar_19} />
                              </a>
                              <Link to="/app/profile/client-profile">
                                Barry Cuda <span>CEO</span>
                              </Link>
                            </h2>
                          </td>
                          <td>barrycuda@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a
                                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-dot-circle-o text-success" />{" "}
                                Active
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-success" />{" "}
                                  Active
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-danger" />{" "}
                                  Inactive
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="#" className="avatar">
                                <img alt="" src={Avatar_19} />
                              </a>
                              <Link to="/app/profile/client-profile">
                                Tressa Wexler <span>Manager</span>
                              </Link>
                            </h2>
                          </td>
                          <td>tressawexler@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a
                                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-dot-circle-o text-danger" />{" "}
                                Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-success" />{" "}
                                  Active
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-danger" />{" "}
                                  Inactive
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <Link
                                to="/app/profile/client-profile"
                                className="avatar"
                              >
                                <img alt="" src={Avatar_07} />
                              </Link>
                              <Link to="/app/profile/client-profile">
                                Ruby Bartlett <span>CEO</span>
                              </Link>
                            </h2>
                          </td>
                          <td>rubybartlett@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a
                                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-dot-circle-o text-danger" />{" "}
                                Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-success" />{" "}
                                  Active
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-danger" />{" "}
                                  Inactive
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <Link
                                to="/app/profile/client-profile"
                                className="avatar"
                              >
                                <img alt="" src={Avatar_06} />
                              </Link>
                              <Link to="/app/profile/client-profile">
                                {" "}
                                Misty Tison <span>CEO</span>
                              </Link>
                            </h2>
                          </td>
                          <td>mistytison@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a
                                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-dot-circle-o text-success" />{" "}
                                Active
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-success" />{" "}
                                  Active
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-danger" />{" "}
                                  Inactive
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <Link
                                to="/app/profile/client-profile"
                                className="avatar"
                              >
                                <img alt="" src={Avatar_14} />
                              </Link>
                              <Link to="/app/profile/client-profile">
                                {" "}
                                Daniel Deacon <span>CEO</span>
                              </Link>
                            </h2>
                          </td>
                          <td>danieldeacon@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a
                                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-dot-circle-o text-danger" />{" "}
                                Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-success" />{" "}
                                  Active
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-dot-circle-o text-danger" />{" "}
                                  Inactive
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/app/employees/clients">View all clients</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Recent Projects</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Project Name </th>
                          <th>Progress</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h2>
                              <Link to="/app/projects/projects-view">
                                Office Management
                              </Link>
                            </h2>
                            <small className="block text-ellipsis">
                              <span>1</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span>9</span>{" "}
                              <span className="text-muted">
                                tasks completed
                              </span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                data-bs-toggle="tooltip"
                                title="65%"
                                style={{ width: "65%" }}
                              />
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2>
                              <Link to="/app/projects/projects-view">
                                Project Management
                              </Link>
                            </h2>
                            <small className="block text-ellipsis">
                              <span>2</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span>5</span>{" "}
                              <span className="text-muted">
                                tasks completed
                              </span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                data-bs-toggle="tooltip"
                                title="15%"
                                style={{ width: "15%" }}
                              />
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2>
                              <Link to="/app/projects/projects-view">
                                Video Calling App
                              </Link>
                            </h2>
                            <small className="block text-ellipsis">
                              <span>3</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span>3</span>{" "}
                              <span className="text-muted">
                                tasks completed
                              </span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                data-bs-toggle="tooltip"
                                title="49%"
                                style={{ width: "49%" }}
                              />
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2>
                              <Link to="/app/projects/projects-view">
                                Hospital Administration
                              </Link>
                            </h2>
                            <small className="block text-ellipsis">
                              <span>12</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span>4</span>{" "}
                              <span className="text-muted">
                                tasks completed
                              </span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                data-bs-toggle="tooltip"
                                title="88%"
                                style={{ width: "88%" }}
                              />
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2>
                              <Link to="/app/projects/projects-view">
                                Digital Marketplace
                              </Link>
                            </h2>
                            <small className="block text-ellipsis">
                              <span>7</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span>14</span>{" "}
                              <span className="text-muted">
                                tasks completed
                              </span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                data-bs-toggle="tooltip"
                                title="100%"
                                style={{ width: "100%" }}
                              />
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item">
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </a>
                                <a className="dropdown-item">
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/app/projects/project_dashboard">
                    View all projects
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default AdminDashboard;
