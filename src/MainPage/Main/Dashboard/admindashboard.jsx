/**
 * Signin Firebase
 */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Quotation from "../../../_components/quotation/Quotation.jsx";
import addQuotation from "../../../_components/quotation/addQuotation";
import { useForm, Controller } from "react-hook-form";
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
// import { loginUser } from "../redux/features/auth/authSlice.js";
import { loginUser } from "../../../redux/features/auth/authSlice";
import { handleCheckValidUserDashboard } from "../../../Services/user.service";

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
import { getReminderApi } from "../../../Services/reminder.service";

import { reminderGetForOneDay } from "../../../redux/features/reminder/reminderSlice";

import { addNotification } from "../../../redux/features/notification/notificationSlice";

// import { date } from "yup/lib/locale.js";
import { fetchToken } from "../../../firebase.js";
import { registerUserFcmToken } from "../../../Services/user.service.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { toastError } from "../../../utils/toastUtils";
// import { toastError } from "../../../utils/toastUtils";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [leadsArr, setLeadsArr] = useState([]);
  const [displayLeadsArr, setDisplayLeadsArr] = useState([]);
  const location = useLocation();
  // const params = useParams();
  console.log(location, "location32 ");
  // console.log(params, "23location32 ");
  const [displayCostingSheetArr, setDisplayCostingSheetArr] = useState([]);
  const [costingSheetArr, setCostingSheetArr] = useState([]);
  const [displayAllCostObj, setDisplayAllCostObj] = useState({});
  const [allCostObj, setAllCostObj] = useState({});
  const [allLeadArr, setAllLeadArr] = useState([]);
  const [allSalesArr, setAllSalesArr] = useState([]);
  const [isNotificationOccurs, setIsNotificationOccurs] = useState(false);
  const [reminderArr, setReminderArr] = useState([]);

  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const userAuthorise = useSelector((state) => state.auth);
  // console.log(userObj, "userObj213");
  const [menu, setMenu] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [notificationArray, setNotificationArray] = useState([]);
  const [data2, setData2] = useState([]);

  const userId = useSelector((state) => state.auth?.user?._id);
  const ReminderArray = useSelector((state) => state.reminder.reminders);
  const counterRef = useRef([]);
  const [currentReminder, setCurrentReminder] = useState([]);

  const counterReminderRef = useRef([]);
  const authObj = useSelector((state) => state.auth);
  const [passwordProtection, setPasswordProtection] = useState(true);
  const schema = yup.object({
    // email: yup
    //   .string()
    //   .matches(emailrgx, "Email is required")
    //   .required("Email is required")
    //   .trim(),
    password: yup.string().required("Password is required").trim(),
  });
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [eye, seteye] = useState(true);
  const onEyeClick = () => {
    seteye(!eye);
  };

  const getUserFcmToken = async () => {
    try {
      let temp = await fetchToken();
      // console.log(temp);
      let { data: res } = await registerUserFcmToken({
        fcmToken: temp,
        userId: authObj?.user?._id,
      });
      if (res) {
        // console.log(res);
      }
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    getUserFcmToken();
  }, []);
  useEffect(() => {
    if (location.pathname == "/admin/dashboard") {
      setPasswordProtection(true);
    }
  }, [location]);

  const handleInit = async () => {
    let obj = { userId, role };
    dispatch(reminderGetForOneDay(obj));
    // const arr = await getReminderApi(role, userId);
    // console.log(arr, "arr32");
    // dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    // handleInit();
  }, []);

  useEffect(() => {
    // console.log(ReminderArray, "123 ReminderArray");
    setReminderArr(ReminderArray);
  }, [ReminderArray]);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  let { adminId } = useParams();

  useEffect(() => {
    //========================================================================
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

  useEffect(() => {
    // console.log(reminderArr, "reminderArr34");
  }, [reminderArr]);

  useEffect(() => {
    counterRef.current = ReminderArray;
  }, [ReminderArray]);

  function myCallback() {
    let temp = [];
    let date = new Date();
    // console.log(date, "date2134");

    let tempHour = date.getHours();
    if (tempHour > 10) {
      tempHour = 0 + tempHour;
    }
    let tempMinute = date.getMinutes();
    if (tempMinute > 10) {
      tempMinute = 0 + tempMinute;
    }
    let time = `${tempHour}:${tempMinute}`; //13:9

    // console.log(time, "curenttime123");
    let DbTemp = counterRef.current;

    for (let el of DbTemp) {
      if (el.followTime == time) {
        // console.log(el.followTime, time, "time");
        array2.push(...temp);
        // temp.push(el);
        setCurrentReminder([...currentReminder, el]);
      }
      // console.log(temp, "temp123");
    }
    // if (array2.length == 0) {
    //   array2.push(...temp);
    // }
    // console.log(array2, "12array123");
  }

  useEffect(() => {
    let timer = setInterval(myCallback, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
    // console.log(currentReminder, "Array231");
    if (currentReminder.length > 0) {
      dispatch(addNotification(currentReminder));
      setData2(currentReminder);
      setIsNotificationOccurs(true);
      setCurrentReminder([]);
    }
  }, [currentReminder]);

  const handleGetAllLeads = async () => {
    try {
      let { data: res } = await getLeadsByRole(userObj?._id, role);
      if (res.success) {
        let tempArr = res.data;

        if (userAuthorise.role == "SPOC") {
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
      // console.log(res.data, "getAlLEAD34");

      let allLeadArr = res.data;
      let tempArray = [];
      // console.log(allLeadArr, "12allLeadArr213s");
      for (let el of allLeadArr) {
        tempArray.push({
          y: el.date + "",
          "Total Lead": el.totalLead,
          "Total Convert Lead": el.convertLead,
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
      // console.log(res.data, "gew34");
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

  let convertLeadArr = [];
  let inProgressArr = [];
  let onHoldArr = [];
  let declinedArr = [];

  // useEffect(() => {
  let temp = [...leadsArr];

  temp.map((x) => {
    if (
      x.status == leadStatus?.convert ||
      x.status == leadStatus?.convertBySpoc
    ) {
      convertLeadArr.push(x);
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
      if (Date.parse(dateFrom) > Date.parse(dateTo)) {
        toastError("In valid date");
      } else {
        // let getfilterLead = await getLeadFilterByDate(
        let { data: res } = await getLeadFilterByDate(
          dateFrom,
          dateTo,
          role,
          userAuthorise?.user?._id
        );
        // console.log(res.data, "g1");
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
        let allLeadArr = res.arr;
        let tempArray = [];
        for (let el of allLeadArr) {
          tempArray.push({
            y: el.date + "",
            "Total Lead": el.totalLead,
            "Total Convert Lead": el.convertLead,
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
  const [Data123, setData123] = useState([]);
  var data12 = [
    { heading: "12", description: "23", followTime: "wer" },
    {
      heading: "xs",
      description: "vfbg",
      followTime: "12343",
    },
    {
      heading: "w",
      description: "s",
      followTime: "4",
    },
    {
      heading: "2",
      description: "t",
      followTime: "4",
    },
  ];

  const handleDeleteNotification = (el, index) => {
    console.log(el, index);
    // data12.splice(index, 1);
    // data12[index].remove;
    // delete data12[index];
    data12.filter((x) => x.heading == el.heading);
    // array;
  };

  const onSubmit = async (data) => {
    // const handleGetAllEmployees = async () => {
    try {
      //     // let { data: res } = await getAllEmployess({`role`= `${role}`});
      //     let { data: res } = await getAllEmployess(
      //       `role=${role}&id=${userLeadId}`
      //     );
      //     console.log(res, "1Res23");
      //     if (res.status) {
      //       setAllEmployees(res.data);
      //       // dispatch(returnAllEmployees(res.data));
      //     }
      //   } catch (error) {
      //     console.error(error);
      //     toastError(error);
      //   }
      // };
      data.email = userObj.email;
      console.log("data13", data);
      if (!data.password) {
        setError("password", {
          message: "Please Enter Password",
        });
      } else {
        clearErrors("password");
        let findAuthenticity = await handleCheckValidUserDashboard(data);
        console.log(findAuthenticity, "findAuthenticity23")
        if (findAuthenticity?.data?.success) {
          toastSuccess(findAuthenticity?.data?.success)
          setPasswordProtection(false);
        }
        // dispatch(loginUser(data));
        // props.history.push('/app/main/dashboard')
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };
  // const handleVerifyUserAuthentication=()=>{
  //   let data={
  //     email:userObj.email,
  //     password:
  //    }
  //   if (!data.password) {
  //     setError("password", {
  //       message: "Please Enter Password",
  //     });
  //   } else {
  //     clearErrors("password");
  //     dispatch(loginUser(data));
  //     // props.history.push('/app/main/dashboard')
  //   }
  // }
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
        {passwordProtection && (
          <div className="account-box">
            <div className="account-wrapper">
              <p className="account-subtitle">Access To Your Dashboard</p>

              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group"></div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Enter Password </label>
                      </div>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div className="pass-group">
                            <input
                              type={eye ? "password" : "text"}
                              className={`form-control  ${errors?.password ? "error-input" : ""
                                }`}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              onClick={onEyeClick}
                              className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"
                                }`}
                            />
                          </div>
                        )}
                      />
                      <small>{errors?.password?.message}</small>
                    </div>
                  </div>

                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                    >
                      Check Dashboard
                    </button>
                  </div>
                </form>


                {/* 
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          className={`form-control  ${
                            errors?.email ? "error-input" : ""
                          }`}
                          type="text"
                          value={value}
                          onChange={onChange}
                          autoComplete="false"
                        />
                      )}
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input
                            type={eye ? "password" : "text"}
                            className={`form-control  ${
                              errors?.password ? "error-input" : ""
                            }`}
                            value={value}
                            onChange={onChange}
                            autoComplete="false"
                          />
                          <span
                            onClick={onEyeClick}
                            className={`fa toggle-password" ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                        </div>
                      )}
                    />
                    <small>{errors?.password?.message}</small>
                  </div>
                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
                
                 */}
              </div>
            </div>
          </div>
        )}
        {passwordProtection == false && (
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
            {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR && (
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
                    {/* <span className="">From </span> */}
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
            {console.log(leadsArr, "leads23")}
            {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR && (
              <div className="row">
                <div className="col-md-12">
                  <div className="card-group m-b-30">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div>
                            <span className="d-block">Converted Leads</span>
                          </div>
                        </div>
                        <h3 className="mb-3">
                          {
                            leadsArr.filter((x) => {
                              return x.status == "CONVERT" ||
                                x.status == "CONVERT_BY_SPOC"
                                ? "CONVERT"
                                : "";
                            }).length
                          }
                        </h3>
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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
                              return (
                                x.status == "OPEN" ||
                                x.status == "REOPENED" ||
                                x.status == "IN_PROGRESS"
                              );
                            }).length
                          }
                        </h3>
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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
                              return x.status == "ON_HOLD";
                            }).length
                          }
                        </h3>
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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

            {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR && (
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
                              <Bar
                                dataKey="Total Convert Lead"
                                fill="#fc6075"
                              />
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
            {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR && (
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
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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
                        <div
                          className="progress mb-2"
                          style={{ height: "5px" }}
                        >
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
                        Convert Leads{" "}
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
                            <h3>{leadsArr.length - convertLeadArr.length}</h3>
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
                        Converted Lead
                        <span className="float-end">
                          {convertLeadArr.length}
                        </span>
                      </p>
                      <p>
                        <i className="fa fa-dot-circle-o text-warning me-2" />
                        Inprogress Lead
                        <span className="float-end">
                          {inProgressArr.length}
                        </span>
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
            {/* {console.log(isNotificationOccurs, "isNotificationOccurs3q")} */}
            {/* {console.log(data2, "data23q")} */}
            {isNotificationOccurs && (
              <div className="notification-container">
                {data12.map((el, index) => {
                  return (
                    <div className="notification-box" key={index}>
                      <button
                        className="btn-close"
                        onClick={() => {
                          handleDeleteNotification(el, index);
                        }}
                      ></button>
                      <p>Heading: {el.heading}</p>
                      <p>Description: {el.description}</p>
                      <p>Follow time: {el.followTime}</p>
                    </div>
                  );
                })}

                {/* <div className="notification-box">
                <button className="btn-close"></button>
                <p>heading: asdf</p>
                <p>
                  description: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
              </div> */}
                {/* <div className="notification-box">
                <button className="btn-close"></button>
                <p>heading: asdf</p>
                <p>
                  description: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
              </div> */}
              </div>
            )}
            {/* {isNotificationOccurs &&
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
                        {/* {array2.map((el) => { 
                        {/* return ( 
                        <div className="row">
                          <div className="col-12 mb-2">
                            <label>Heading: {el?.heading}</label>
                          </div>
                          <div className="col-12 mb-2">
                            <label>Description: {el?.description}</label>
                          </div>
                        </div>
                         ); 
                        })} 
                      </div>
                    </div>
                  </div>
                </div>
              );
            })} */}

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
        )}
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default AdminDashboard;
