import { Link, useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Select from "react-select";
import { Table } from "antd";
import { toastError, toastSuccess } from "../../../utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { admin, leadStatus, rolesObj } from "../../../utils/roles";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import Pdfile from "../../../MainPage/Pdf/Index";
import { jsPDF } from "jspdf";
// import ReactToPdf from "react-to-pdf";
import { updateTour, setTour } from "../../../redux/features/tour/tourSlice";
import moment from "moment";
import { updateLeadStatus, getById } from "../../../Services/lead.service";

import {
  quotationGet,
  setQuotationObject,
  quotationDelete,
  quotationUpdateStatus,
  quotationFilterGet,
  quotationFilterByStatusGet,
} from "../../../redux/features/quotation/quotationSlice";

import html2canvas from "html2canvas";
import AddQuotation from "./AddQuotation";
import PopUp from "./PopUp";

import { images } from "../../../MainPage/Pdf/Utility/Images";
// import { images } from "./Utility/Images";

import {
  generateFilePath,
  generateFilePathUPload,
} from "../../../utils/FileURL";

const ref = React.createRef();

const Quotation = () => {
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const { leadId } = useParams();
  let history = useHistory();

  const quotationStateArr = useSelector(
    (state) => state.quotation.quotationArr
  );
  const toursResultArr = useSelector((state) => state.tour.tours);
  const [quotationMainArr, setQuotationMainArr] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tourId, setTourId] = useState("");
  const [isUpdateTour, setIsUpdateTour] = useState(false);
  const [leadObj, setLeadObj] = useState({});
  const [isConvert, setIsConvert] = useState(false);
  const [monthValued, setMonthValued] = useState("");
  const [statusValued, setStatusValued] = useState("");
  const [isStatusOf, setIsStatusOf] = useState(false);
  const [show, setShow] = useState(false);
  const [clearFunctionRun, setClearFunctionRun] = useState(false);
  const [printPdf, setPrintPdf] = useState(false);
  const [QuotationObj, setQuotationObj] = useState({});
  const [tourObj, settourObj] = useState({
    mainImage: images.top_left,
    itenaryImage: images.travelling,
  });

  const [spocImageBase64, setspocImageBase64] = useState("");
  const [readOnly, setReadOnly] = useState(false);
console.log( readOnly,"readOnly23")
  useEffect(() => {
    handleInit();
    // console.log(images, "tourObjonload");
  }, []);

  // useEffect(() => {
  //   if (changeStatus == false) {
  //     setShow(false);
  //   }
  //   // handleInit();
  // }, [changeStatus]);

  const handleInit = () => {
    //  handleGetAllLeads();
    dispatch(quotationGet(`leadId=${leadId}`));
  };

  const handleGetAllLeads = async () => {
    try {
      let { data: res } = await getById(leadId);
      if (res.success) {
        // setDisplayLeadsArr(res.data);
        setLeadObj(res.data);
        // dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  // const MyDoc = () => {
  //   return <Pdfile />;
  // };
  //

  const updateStatusOfLead = async (id, obj) => {
    let { data: res } = await updateLeadStatus(id, obj);
    if (res.success) {
      // handleGetAllLeads();
    }
  };

  useEffect(() => {
    if (quotationStateArr && quotationStateArr?.length > 0) {
      // let object = {
      //   status: "IN_PROGRESS",
      // };
      // updateStatusOfLead(leadId, object);
      setIsConvert(quotationStateArr.some((el) => el.status == "Convert"));
    } else {
      setIsConvert(false);
    }
    setQuotationMainArr(quotationStateArr);
  }, [quotationStateArr]);

  const getBase64 = (file, cb) => {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        // console.log('Error: ', error)
      };
    }
  };

  const handleEdit = (row) => {
    // setClearFunctionRun(false);

    setShow(true);
    // console.log(row, "row update"); //whole object
    dispatch(setQuotationObject(row)); //=============
    dispatch(setTour(row));
  };

  const sleep = async (n) => {
    return new Promise((res) => setTimeout(() => res(), n));
  };

  const handleDownload = async (row) => {
    setQuotationObj(row);
    let blob = await fetch(
      generateFilePath(QuotationObj?.agentObj?.photoUrl)
    ).then((r) => r.blob());
    getBase64(blob, (result) => {
      setspocImageBase64(result);
    });

    if (row && row?.tourListArr && row?.tourListArr.length > 0) {
      let currentObj = row.tourListArr.find((el) => el.mainImage);

      if (currentObj != "") {
        let temptour = {
          mainImage: currentObj?.mainImage
            ? generateFilePathUPload(currentObj?.mainImage)
            : images.top_left,
          itenaryImage: currentObj?.itenaryImage
            ? generateFilePathUPload(currentObj?.itenaryImage)
            : images.travelling,
        };
        settourObj(temptour);
      }
    }

    dispatch(setQuotationObject(row));
    dispatch(setTour(row));

    setPrintPdf(true);
    const input = document.getElementById("mainPdfContainer");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // console.log("en3");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [
            input?.clientHeight * window.devicePixelRatio,
            input?.clientWidth * window.devicePixelRatio,
          ],
          putOnlyUsedFonts: true,
          floatPrecision: "smart",
          hotfixes: ["px_scaling"],
        });
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save(
          `${row?.leadObj?.clientObj?.name} - ${row?.destinationName}.pdf`
        );
      });
    }
  };

  // const handleDownload = async (row) => {
  //   localStorage.setItem("quotationPdf", JSON.stringify(row));
  //   setPrintPdf(true);
  //   dispatch(setQuotationObj(row));
  //   dispatch(setTour(row));

  //   // await sleep(10000);

  //   const input = document.getElementById("mainPdfContainer");
  //   // await sleep(10000);

  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF({
  //         orientation: "portrait",
  //         unit: "px",
  //         format: [
  //           ref.current?.clientHeight * window.devicePixelRatio,
  //           ref.current?.clientWidth * window.devicePixelRatio,
  //         ],
  //         putOnlyUsedFonts: true,
  //         floatPrecision: "smart",
  //         hotfixes: ["px_scaling"],
  //       });
  //       pdf.addImage(imgData, "PNG", 0, 0);
  //       pdf.save(`downloadQuotation.pdf`);
  //       setTimeout(() => {
  //         setPrintPdf(false);
  //       }, 100);
  //     })
  //     .catch((err) => console.error(err));
  //   // setTimeout(() => {
  //   //   setClearFunctionRun(true);
  //   // }, 700);
  //   // setClearFunctionRun(true)
  // };

  const handleDelete = (id) => {
    dispatch(quotationDelete({ id, leadId }));
  };

  useEffect(() => {
    if (monthValued != "") {
      let data = {
        monthValued,
        leadId,
      };
      dispatch(quotationFilterGet(data));
    }
  }, [monthValued]);

  useEffect(() => {
    if (statusValued != "") {
      let data = {
        statusValued,
        leadId,
      };
      dispatch(quotationFilterByStatusGet(data));
    }
  }, [statusValued]);

  const submitQuotation = (row, status) => {
    confirmAlert({
      title: "Are you sure to Convert the Quotation",
      // message: "Are you sure to do this.",
      buttons: [
        {
          label: "I am sure ",
          onClick: () => {
            let obj = {
              Id: row._id,
              status: status,
              leadId: row.leadId,
            };
            setIsStatusOf(true);
            dispatch(quotationUpdateStatus(obj));
            history.push(`/admin/lead/${leadId}/quotePayment`);
            // history(`/admin/lead/${userId}/quotePayment`);
          },
        },
        {
          label: "Cancel",
          onClick: () => setIsStatusOf(false),
        },
      ],
    });
  };

  // const ad = () => {
  //   return (
  //     <div class="alert alert-primary" role="alert">
  //       A simple primary alert—check it out!
  //       <button
  //         onClick={() => {
  //           setIsStatusOf(true);
  //         }}
  //       >
  //         yes
  //       </button>
  //     </div>
  //   );
  // };

  const handleSatus = (row, status) => {
    // console.log(row, status, "3423");
    if (status == "Convert" && row && row._id) {
      submitQuotation(row, status);
    }
    if (status == "Created" || status == "Pending") {
      let obj = {
        Id: row._id,
        status: status,
        leadId: row.leadId,
      };
      dispatch(quotationUpdateStatus(obj));
    }
  };

  // useEffect(() => {
  //   if (tourResultObj) {
  //       setTourId(tourResultObj._id);
  //     setPrice(tourResultObj.name);
  //     setDescription(tourResultObj.description);
  //   }
  // }, [tourResultObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price == "") {
      toastError("Quote price is mandatory");
    }

    let obj = { name, description };
    if (isUpdateTour) {
      obj.Id = tourId;
      setIsUpdateTour(false);
      dispatch(updateTour(obj));
    } else {
      // try {
      //   let { data: res } = await getById(leadId);
      //   if (res.success) {
      //     // setDisplayLeadsArr(res.data);
      //     setLeadObj(res.data);
      //     // dispatch(returnAllEmployees(res.data))
      //   }
      // } catch (error) {
      //   console.error(error);
      //   toastError(error);
      // }
    }
  };

  const optionsOfPDF = {
    orientation: "portrait",
    unit: "px",
    format: [84, 15],
    putOnlyUsedFonts: true,
    floatPrecision: "smart",
    hotfixes: ["px_scaling"],
  };

  const tour_columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (row, record) => (
        <div>{moment(record.createdAt).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Destination Name",
      dataIndex: "destinationName",
      sorter: (a, b) => a.destinationName.length - b.destinationName.length,
    },

    {
      title: "Number Of Nights",
      dataIndex: "durationOfTour",
      sorter: (a, b) => a.durationOfTour.length - b.durationOfTour.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (row, record) => (
        <div className="dropdown">
          {isConvert ? (
            <>
              <a className="btn btn-white btn-sm  "
                data-bs-toggle={role == "ADMIN" ? "dropdown" : ""}
                aria-expanded={role == "ADMIN" ? "false" : ""}>
                <i
                  className={
                    record.status === "Convert"
                      ? "fa fa-dot-circle-o text-success"
                      : "fa fa-dot-circle-o text-danger"
                  }
                />

                {record.status}
              </a>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  onClick={() => handleSatus(record, "Created")}
                >
                  <i className="fa fa-dot-circle-o text-danger" /> Created
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleSatus(record, "Pending")}
                >
                  <i className="fa fa-dot-circle-o text-danger" /> Pending
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    handleSatus(record, "Convert");
                  }}
                >
                  <i className="fa fa-dot-circle-o text-success" /> Convert
                </a>
              </div>
            </>
          ) : (
            <>
              <a
                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className={
                    record.status === "Convert"
                      ? "fa fa-dot-circle-o text-success"
                      : "fa fa-dot-circle-o text-danger"
                  }
                />

                {record.status}
              </a>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  onClick={() => handleSatus(record, "Created")}
                >
                  <i className="fa fa-dot-circle-o text-danger" /> Created
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleSatus(record, "Pending")}
                >
                  <i className="fa fa-dot-circle-o text-danger" /> Pending
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    handleSatus(record, "Convert");
                  }}
                >
                  <i className="fa fa-dot-circle-o text-success" /> Convert
                </a>
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Download Pdf",
      render: (row, record) => (
        <div className="col-auto float-end ml-auto">
          <a
            className="btn add-btn"
            onClick={() => {
              handleDownload(row);
            }}
          >
            Download
          </a>
        </div>
      ),
    },

    {
      title: "Action",
      render: (row, record) => (
        <div className="dropdown dropdown-action text-end">
          {isConvert ? (
            <>
              <a
                href="#"
                className="action-icon dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons">more_vert</i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" onClick={() => {
                  handleEdit(row)
                  setReadOnly(true)
                }}>
                  <i className="fa fa-view m-r-5" /> View
                </a>

              </div>
              {/* <div className="dropdown-menu dropdown-menu-right">
                <ReactToPdf
                  targetRef={ref}
                  filename="div-blue.pdf"
                  options={optionsOfPDF}
                  // x={0.5}
                  // y={0.5}
                  // scale={0.8}
                >
                  {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
                </ReactToPdf>
                <div
                  style={{ width: 500, height: 500, background: "blue" }}
                  ref={ref}
                />
              </div> */}
              {/* <div className="dropdown-menu dropdown-menu-right">
                <a
                  className="dropdown-item"
                  // data-bs-toggle="modal"
                  // data-bs-target="#add_quote"
                  onClick={() => handleDownload(row)}
                >
                  <i className="fa fa-pencil m-r-5" /> Download
                </a>
              </div> */}
              {/* <span
                className="dropdown-item"
                onClick={() => handleDownload(row)}
              >
                <i className="fa fa-trash-o m-r-5" /> Download
              </span> */}
            </>
          ) : (
            <>
              <a
                href="#"
                className="action-icon dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons">more_vert</i>
              </a>

              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" onClick={() => handleEdit(row)}>
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleDelete(row._id)}
                >
                  <i className="fa fa-trash-o m-r-5" /> Delete
                </a>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  const options1 = [
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8	", label: "September	" },
    { value: "9	", label: "October	" },
    { value: "10", label: "November" },
    { value: "11", label: "December" },
  ];
  const options2 = [
    { value: "Convert", label: "Convert" },
    { value: "pending", label: "pending" },
    { value: "created", label: "created" },
  ];

  useEffect(() => {
    setShow(show);
  }, [show]);

  //  ==================================================================
  // ===============================================
  // ======================================

  // const quotationObj = useSelector((state) => state.quotation.quotationObj);

  // useEffect(() => {
  //   if (quotationObj) {
  //     setQuotationObj(quotationObj);
  //   }
  // }, [QuotationObj]);

  // useEffect(() => {
  //   let temp = localStorage.getItem("quotationPdf");
  //   temp = JSON.parse(temp);
  //   setQuotationObj(temp);
  // }, []);

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
  //
  //

  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Create Quote</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="container-fluid p-0">
          <div className="page-header caret_qotepage">
            <div className="row align-items-center">
              <div className="col">
                <Link to="/admin/dashboard">Dashboard</Link>
                <h3 className="page-title">
                  <i className="la la-file" /> Create Quote
                </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"></li>
                  <li className="breadcrumb-item active">Create Quote</li>
                </ul>
              </div>

              {isConvert == false && (
                <div className="col-auto float-end ml-auto">
                  <a
                    className="btn add-btn"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <i className="fa fa-plus" />
                    Add Quote
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="drp-area">
            <div className="row">
              <div className="col-lg-2">
                <Select
                  options={options1}
                  placeholder="Month of Travel"
                  onChange={(e) => {
                    setMonthValued(e.value);
                  }}
                />
              </div>
              <div className="col-lg-2 z-12">
                <Select
                  options={options2}
                  placeholder="Status Type"
                  onChange={(e) => {
                    setStatusValued(e.value);
                  }}
                />
              </div>
              {/* 
            <div className="col-lg-2">
              <Select options={options3} placeholder="Agent" />
            </div> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: quotationMainArr.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    // showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: "auto" }}
                  columns={tour_columns}
                  // bordered
                  dataSource={quotationMainArr}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        <AddQuotation
          show={show}
          setShow={setShow}
          clearFunction={clearFunctionRun}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
        />

      </div>

      {printPdf && (
        <div
          style={
            {
              // zIndex: "11011",
              // display:none
              // visibility:"hidden"
              opacity: "0",
            }
          }
        >
          <div main id="mainPdfContainer">
            {/* 
            
            */}

            <section className="top-banner mb-80">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12 col-md-6">
                    <div className="left">
                      <div className="image">
                        <img src={tourObj?.mainImage} alt="" />
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
                              {moment(QuotationObj?.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                              {/* {new Date(QuotationObj?.createdAt).toDateString()} */}
                              ,{new Date(QuotationObj?.createdAt).getHours()}:
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
                            {QuotationObj?.durationOfTour} N &nbsp;/ &nbsp;
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

                        <p className="desp">
                          Prices of Flights and hotels are subject to
                          availability
                        </p>
                        <button className="btn pink-bg text-white btn-lg px-4">
                          ₹ {QuotationObj?.amount?.toLocaleString("en-IN")}
                        </button>
                      </div>
                      <ul className="right-bottom whatsapp-gmail">
                        <li>
                          <img src={images.whatsapp} alt="" />
                          {QuotationObj?.agentObj?.phone
                            ? QuotationObj?.agentObj?.phone
                            : "+91 9310 985 146"}
                        </li>
                        <li>
                          <img src={images.gmail} alt="" />
                          {QuotationObj?.agentObj?.email
                            ? QuotationObj?.agentObj?.email
                            : "info@fliptrip.in"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* 
      
      
      */}
            {/* {console.log(QuotationObj, "311323")} */}
            {QuotationObj?.destinationName ? (
              <section className="payment-detail mb-80">
                <div className="container">
                  <h1 className="fw-bold text-center mb-5 heading">
                    Destination
                  </h1>
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
                                <h4
                                  style={{ fontSize: 25 }}
                                  className="purple bg-white"
                                >
                                  {el.name}
                                </h4>
                                <div className="row">
                                  <div className="col-12 ">
                                    <ul className="list-circle">
                                      {str.map((le, i) => {
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
            ) : (
              ""
            )}
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
                      <h4>Sight Seeing</h4>
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
            <section className="flight-table">
              <div className="container">
                <table className="table table-borderless align-middle">
                  <thead className="purple-bg text-white">
                    <tr>
                      <th scope="col" className="fw-normal">
                        DETAILS
                      </th>
                      <th scope="col" className="fw-normal">
                        ADULT : {QuotationObj?.travelPassengerObj?.noOfAdults}
                        {QuotationObj?.travelPassengerObj?.noOfChildrenWithBed >
                          0 &&
                          ` CHILDREN :
                        ${QuotationObj?.travelPassengerObj
                            ?.noOfChildrenWithBed +
                          QuotationObj?.travelPassengerObj
                            ?.noOfChildrenWithoutBed
                          }
                        `}
                        {QuotationObj?.travelPassengerObj?.noOfInfants > 0 &&
                          ` INFANT :
                         ${QuotationObj?.travelPassengerObj?.noOfInfants} 
                                                 `}
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
                        <td>
                          {QuotationObj?.perPersonAirPortPrice +
                            QuotationObj?.perChildrenPersonAirPortPrice +
                            QuotationObj?.perInfantAirPortPrice}{" "}
                          [
                          {`  PER ADULT (₹):
                               ${QuotationObj?.perPersonAirPortPrice} ,`}{" "}
                          {QuotationObj?.perChildrenPersonAirPortPrice > 0 &&
                            QuotationObj?.travelPassengerObj
                              ?.noOfChildrenWithBed > 0 &&
                            ` PER CHILDREN (₹) :
                         ${QuotationObj?.perChildrenPersonAirPortPrice} 
                                                 ,`}
                          {QuotationObj?.perInfantAirPortPrice > 0 &&
                            QuotationObj?.travelPassengerObj?.noOfInfants > 0 &&
                            ` PER INFANT (₹):
                         ${QuotationObj?.perInfantAirPortPrice} 
                                                 `}
                          ]
                        </td>
                        <td>
                          {parseInt(QuotationObj?.perPersonAirPortPrice) *
                            parseInt(
                              QuotationObj?.travelPassengerObj?.noOfAdults
                            ) +
                            parseInt(
                              QuotationObj?.perChildrenPersonAirPortPrice
                            ) *
                            (parseInt(
                              QuotationObj?.travelPassengerObj
                                ?.noOfChildrenWithBed
                            ) +
                              parseInt(
                                QuotationObj?.travelPassengerObj
                                  ?.noOfChildrenWithoutBed
                              )) +
                            parseInt(QuotationObj?.perInfantAirPortPrice) *
                            parseInt(
                              QuotationObj?.travelPassengerObj?.noOfInfants
                            )}
                        </td>
                      </tr>
                    )}
                    {QuotationObj?.perPersonLandPrice > 0 && (
                      <>
                        <tr>
                          <td>LAND</td>
                          <td>
                            {QuotationObj?.perPersonLandPrice +
                              QuotationObj?.perChildrenLandPrice +
                              QuotationObj?.perInfantLandPrice}
                            [
                            {`  PER ADULT (₹):
                               ${QuotationObj?.perPersonLandPrice}`}
                            ,
                            {QuotationObj?.perChildrenLandPrice > 0 &&
                              QuotationObj?.travelPassengerObj
                                ?.noOfChildrenWithBed > 0 &&
                              ` PER CHILDREN (₹):
                         ${QuotationObj?.perChildrenLandPrice} 
                                                 ,`}
                            {QuotationObj?.perInfantLandPrice > 0 &&
                              QuotationObj?.travelPassengerObj?.noOfInfants >
                              0 &&
                              ` PER INFANT (₹):
                         ${QuotationObj?.perInfantLandPrice} 
                                                 `}
                            ]
                          </td>
                          <td>
                            {parseInt(QuotationObj?.perPersonLandPrice) *
                              parseInt(
                                QuotationObj?.travelPassengerObj?.noOfAdults
                              ) +
                              parseInt(QuotationObj?.perChildrenLandPrice) *
                              (parseInt(
                                QuotationObj?.travelPassengerObj
                                  ?.noOfChildrenWithBed
                              ) +
                                parseInt(
                                  QuotationObj?.travelPassengerObj
                                    ?.noOfChildrenWithoutBed
                                )) +
                              parseInt(QuotationObj?.perInfantLandPrice) *
                              parseInt(
                                QuotationObj?.travelPassengerObj?.noOfInfants
                              )}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                  <tfoot>
                    {/* <tr>
                      <td>TOTAL</td>
                      <td>
                        {parseInt(QuotationObj?.perPersonAirPortPrice) *
                          parseInt(QuotationObj?.numberOfGuest)}
                      </td>
                      <td>
                        {parseInt(QuotationObj?.perPersonLandPrice) *
                          parseInt(QuotationObj?.numberOfGuest)}
                      </td>
                    </tr> */}
                  </tfoot>
                </table>
                <ul className="amount mb-0">
                  <li>
                    <h4>Total cost including taxes and above</h4>
                    <h4 className="pink fw-semibold m-0">
                      ₹ {QuotationObj?.amount?.toLocaleString("en-IN")}
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
              <p className="text-white m-0 text-center">
                Prices of Flights and hotels are subject to availability
              </p>
            </div>

            <section className="inclusions">
              <div className="container">
                {QuotationObj?.inclusionData &&
                  QuotationObj?.inclusionData.length > 0 && (
                    <h1 className="fw-bold text-center mb-5">Inclusions</h1>
                  )}

                <div className="row">
                  <div className="col-12">
                    <div className="box">
                      <ul className="list-circle mt-4 pt-4">
                        {
                          QuotationObj?.inclusionData &&
                          QuotationObj?.inclusionData != "" &&
                          QuotationObj.inclusionData
                            .split(/[.;]/g)
                            .filter((el) => el && el != "")
                            .map((el, index) => {
                              return <li key={index}>{el}</li>;
                            })
                          // {el.name} (
                          // {new Date(el.startDate).toDateString()})
                          // </li>
                          // );
                          // })
                        }
                      </ul>
                    </div>
                  </div>

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
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            {/* {console.log(QuotationObj, "QuotationObjQuotationObj1")} */}
            {QuotationObj &&
              QuotationObj?.flightList &&
              QuotationObj?.flightList?.length > 0 && (
                <section className="flights ptb-80">
                  <div className="container">
                    <h1 className="fw-bold text-center mb-5">Flights</h1>
                    <div className="top">
                      <img src={images.plane} alt="" className="plane" />
                    </div>
                    <div className="position-relative">
                      <div className="row">
                        {QuotationObj?.flightList &&
                          QuotationObj?.flightList.length > 0 &&
                          QuotationObj?.flightList[0]?.flightName
                            ?.split("\n")
                            .filter((el) => el && el != "")
                            .filter((el, index, arr) => arr.length - 1 != index)
                            .map((ele, index) => {
                              return (
                                <div className="col-12" key={index}>
                                  <div
                                    className={
                                      index % 2 == 0 ? "box" : "box reverse"
                                    }
                                  >
                                    <h6>
                                      <img src={images.location} alt="" />
                                      {ele}
                                    </h6>
                                  </div>
                                </div>
                              );
                            })}

                        {QuotationObj?.flightList &&
                          QuotationObj?.flightList?.length > 0 &&
                          QuotationObj?.flightList[0]?.flightName
                            ?.split("\n")
                            .filter((el) => el && el != "")[
                          QuotationObj?.flightList[0]?.flightName
                            ?.split("\n")
                            .filter((el) => el && el != "").length - 1
                          ] && (
                            <div
                              className={
                                QuotationObj?.flightList[0]?.flightName
                                  ?.split("\n")
                                  .filter((el) => el && el != "").length %
                                  2 ==
                                  0
                                  ? "destination destination-reverse"
                                  : "destination"
                              }
                              style={
                                QuotationObj?.flightList[0]?.flightName
                                  ?.split("\n")
                                  .filter((el) => el && el != "").length %
                                  2 ==
                                  0
                                  ? {
                                    left: "auto",
                                    right: 0,
                                    textAlign: "left",
                                  }
                                  : {}
                              }
                            >
                              <h6
                                style={
                                  QuotationObj?.flightList[0]?.flightName
                                    ?.split("\n")
                                    .filter((el) => el && el != "").length %
                                    2 ==
                                    0
                                    ? { flexDirection: "row-reverse" }
                                    : {}
                                }
                              >
                                {
                                  QuotationObj?.flightList[0]?.flightName
                                    ?.split("\n")
                                    .filter((el) => el && el != "")[
                                  QuotationObj?.flightList[0]?.flightName
                                    ?.split("\n")
                                    .filter((el) => el && el != "").length - 1
                                  ]
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
                                          {el?.rating
                                            ? `Rating : ${el?.rating}`
                                            : ""}{" "}
                                        </p>
                                      </h5>
                                    </div>
                                  </li>
                                  <li className="box">
                                    <img src={images.check_in} alt="" />
                                    <div>
                                      <h4>Check In</h4>
                                      <p>
                                        {new Date(el.checkIn).toDateString()}
                                      </p>
                                    </div>
                                  </li>
                                  <li className="box">
                                    <img src={images.checkout} alt="" />
                                    <div>
                                      <h4>Check Out</h4>

                                      <p>
                                        {new Date(el.checkOut).toDateString()}
                                      </p>
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
            </div>
            {QuotationObj &&
              QuotationObj?.itineraryDetails &&
              QuotationObj?.itineraryDetails?.length > 0 && (
                <section className="itinerary mb-80">
                  <div className="container">
                    <h1 className="fw-bold text-center mb-5 heading">
                      Itinerary
                    </h1>
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
                                  {/* in {(el.checkIn)} */}
                                  {/* {new Date(el.checkIn).toDateString()} */}
                                  {index == 0 &&
                                    moment(
                                      QuotationObj?.hotelDetail[0].checkIn
                                    ).format("DD-MM-YYYY")}
                                  {/* {(index ==  QuotationObj?.itineraryDetails.length-1) &&  moment(QuotationObj?.hotelDetail[0].checkOut).format("DD-MM-YYYY")} */}
                                  {index ==
                                    QuotationObj?.itineraryDetails?.length -
                                    1 &&
                                    moment(
                                      QuotationObj?.hotelDetail[
                                        QuotationObj?.hotelDetail?.length - 1
                                      ].checkOut
                                    ).format("DD-MM-YYYY")}
                                </p>
                              </div>
                              <div className="box">
                                <ul className="inner-box">
                                  <li>
                                    <div className="left">
                                      <img
                                        src={tourObj?.itenaryImage}
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
                    </div>
                  </div>
                </section>
              )}
            <section className="how-to-book">
              <div className="container">
                <div className="row">
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
                                QuotationObj?.paymentObj?.paymentReceviedArr
                                  .length > 0 &&
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
                              <td> {QuotationObj?.destinationName}</td>
                              {QuotationObj?.paymentObj?.paymentReceviedArr &&
                                QuotationObj?.paymentObj?.paymentReceviedArr
                                  .length > 0 &&
                                QuotationObj?.paymentObj?.paymentReceviedArr.map(
                                  (el, index) => {
                                    return (
                                      <td
                                        key={index}
                                        scope="col"
                                        className="fw-normal"
                                      >
                                        ₹ {el?.installmentAmount} on{" "}
                                        {new Date(
                                          el.receviedDate
                                        ).toDateString()}
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
                                (acc, el) =>
                                  acc + parseInt(el.installmentAmount),
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
                              </li>
                              <li className="fw-semibold gap-2">
                                <img src={images.gmail} alt="" />
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
                Prices of Flights and hotels are subject to availability{" "}
              </p>
            </div>

            <section className="payment-detail mb-80">
              <div className="container">
                <h1 className="fw-bold text-center mb-5 heading">
                  Payment Details
                </h1>
                <div className="row">
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">Account Details</h4>

                        <div className="row">
                          <div className="col-12 col-md-5">
                            <ul className="list-circle">
                              <li>
                                Payment acceptance Mode: IMPS/NEFT Bank transfer
                                & Netbanking through Payment link
                              </li>
                              <li>
                                Payment are also accepted through debit card,
                                Credit Card or through payment link then the
                                charges of 2.84 % extra will be levied.
                              </li>
                              <li>
                                Emi options available through third Parties
                                Suppliers. Get in touch with us for more
                                information
                              </li>
                            </ul>
                          </div>
                          <div className="col-12 col-md-7">
                            <div className="right">
                              <div className="bank">
                                <img src={images.yes_bank} alt="" />
                              </div>
                              <ul className="list-circle">
                                <li>
                                  Bank Name:{" "}
                                  <span className="fw-semibold">Yes Bank</span>
                                </li>

                                <li>
                                  A/c Num:{" "}
                                  <span className="fw-semibold">
                                    018461900001430
                                  </span>
                                </li>
                                <li>
                                  IFSC Code:{" "}
                                  <span className="fw-semibold">
                                    YESB0000184
                                  </span>
                                </li>
                                <li>
                                  Branch:
                                  <span className="fw-semibold">
                                    Yes Bank Ltd, Pitam Pura Branch
                                  </span>
                                </li>
                                <li>
                                  Paytm : &nbsp;
                                  <a
                                    href={`tel:${QuotationObj?.agentObj?.phone}`}
                                  >
                                    9999 316587{" "}
                                  </a>
                                </li>
                                <li>
                                  Google pay : &nbsp;
                                  <a
                                    href={`tel:${QuotationObj?.agentObj?.phone}`}
                                  >
                                    9999 316597{" "}
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

            {/* <section className="faq mb-80">
              <div className="container">
                <h1 className="fw-bold text-center mb-5 heading">FAQ</h1>
                <div className="row">
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">Important Notes</h4>
                        <ul className="list-auto">
                          <li>
                            We are not responsible for any Visa Rejection as it
                            is government agency that issue visa.
                          </li>
                          <li>
                            Passport should be valid of minimum 06 months till
                            return date for travelling.
                          </li>
                          <li>
                            Above quotation is valid for Indian Nationals and
                            minimum of 2 adults travelling together at all
                            times.
                          </li>
                          <li>
                            Above all are subject to availability, no booking
                            made yet, in case of non- availability similar
                            hotel/services will be provided.
                          </li>
                          <li>
                            Any request of King Bed or Twin Bed, room near to
                            each other in case of 2 or more rooms booking in the
                            same hotel is subject to hotel availability.
                          </li>
                          <li>
                            We have limited inventory hence prices can change
                            without prior notice. In order to get benefit at the
                            current proposed prices, we recommend you to book
                            with us immediately.
                          </li>
                          <li>
                            Early check-in and late checkout is subject to
                            availability of rooms at the time of check-in and
                            the same is not guaranteed, you may be charged for
                            guaranteed early check-in and late checkout.
                          </li>
                          <li>
                            Tourism tax is imposed by Govt. of (Malaysia of
                            10-15 Ringgit) / (Dubai of 10-15 Dirham) per room
                            per night which is to be paid at hotel only, and
                            cost is not included in the cost of package.
                            <ul className="list-circle">
                              <li>
                                National Park fee is charged on island visit in
                                Thailand 400 PHB per Adult/ 200 PHB per Child
                                which is to be paid at island directly, and cost
                                is not included in the cost of package.
                              </li>
                              <li>
                                Hotels may charge security fee which is
                                refundable at Check-out time.
                              </li>
                              <li>
                                Gratuities imposed on cruise are not included in
                                the package unless mentioned separately.
                              </li>
                              <li>
                                All inclusions / Activities remain same but
                                sometimes the sequence of day to day schedule
                                (itinerary) may change depending upon
                                availability and local conditions when the final
                                itinerary received.
                              </li>
                              <li>
                                RTPCR test is not included in the package unless
                                mentioned. RTPCR to be given by hotel/resort as
                                complimentary is solely hotel discretion. NitSa
                                has no role and liability on it.
                              </li>
                              <li>
                                Please pay in the company’s account only - Earth
                                travels (Registered name of NitSa Holidays).
                                Payments in individual account of agents are not
                                acceptable by the company.
                              </li>
                              <li>
                                Courier charges / Photo charges developed by us
                                at the time of visa are not included in the
                                package cost as it may vary and will be paid
                                additionally by the client.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Flights booking and prices are dynamic and will be
                            applicable at the time of booking; any difference in
                            fare amount will be borne by customer before flights
                            being booked.
                          </li>
                          <li>
                            USD/SGD fluctuation will be taken into
                            consideration. ROE Calculation = Current XE + 1.5.
                            Final amount of the package will be as per the
                            USD/SGD rate on the date of final payment and
                            difference amount will be adjusted in package
                            amount.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            <section className="faq mb-80">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">CANCELLATION POLICY</h4>
                        <ul className="list-auto">
                          <li>
                            In all other cases cancellation charge will be as
                            per the booking condition of the tour and we shall
                            be constrained to levy the following cancellation
                            charges per person.
                          </li>
                          <li>
                            If cancellation is made any time not less than 31
                            days prior to departure, 20000/- per person shall be
                            deducted.(except ticket cancellation and Visa
                            charges)
                            <ul className="list-circle">
                              <li>30- 16 days: 50% of the total land cost</li>
                              <li>15 – 8 days: 75% of the total land cost</li>
                              <li>7 – 0 days: 100% cancellation will apply</li>
                              <li>
                                Visa Fee & Service charges are non-refundable.
                              </li>
                            </ul>
                          </li>
                          <li>
                            No refund either in part or in full will be made for
                            any unused part of the services provided in the
                            package
                          </li>
                          <li>
                            The tour cost does not include any Overseas
                            Insurance Premium, but we strongly recommend
                            Overseas Insurance Policy. The same after issuance
                            is non-refundable
                          </li>
                          <li>
                            The above policy will change in case of Hong Kong,
                            Genting Highlands, Maldives and other destinations
                            where 100% cancellation shall be applicable after
                            confirmation.
                          </li>
                          <li>
                            Star Classification of Hotels/Resort is based on
                            information provided by the individual Hotel/Resort
                            you may verify same by directly contacting the
                            concerned hotel by visiting their website or
                            Telephone number. We endeavor to validate and
                            authenticate this information in utter good faith.
                            We do not own any responsibility for any correct
                            star rating and type of bedroom provide by the
                            Hotel/Resort. Descriptions, photographs, sketches
                            and list of amenities/facilities are also provided
                            by the Hotel/Resort, this may also be got verified
                            by directly communicating the Hotel/Resort by
                            visiting their website or by contacting the
                            Hotel/Resort management on Telephone number. Hope so
                            above is in order. For any further detail, feel free
                            to contact me.
                          </li>
                          <li>
                            We need Rs. 20,000/- per person as a booking deposit
                            with passport copies - Photo page, address page.
                          </li>
                          <li>
                            Air tickets payment to be made before issuing of the
                            tickets.
                          </li>
                          <li>
                            Hotel payment to be made before time limit of
                            hotels.
                          </li>
                          <li>
                            Vouchers will be handed over to you after final
                            payment and it will take 3 working days to process
                            your vouchers after receiving full and final
                            payment, Itinerary will be provided 7 to 8 days
                            before the trip date.
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
                          backgroundColor: "white",
                        }}
                        alt={QuotationObj?.agentObj?.photoUrl}
                        src={QuotationObj?.agentObj?.baseImage}
                      // src={images.yes_bank}
                      />
                    </div>
                    {/* {generateFilePath(QuotationObj?.agentObj?.photoUrl)}w */}

                    <h4 className="name_info">
                      {QuotationObj?.agentObj?.firstName + " "}
                      {QuotationObj?.agentObj?.lastName}
                    </h4>
                    <h5 className="categofy_info">
                      {QuotationObj?.agentObj?.designation
                        ? QuotationObj?.agentObj?.designation
                        : "Sales Executive"}{" "}
                    </h5>
                    <h6 className="info_num">
                      {QuotationObj?.agentObj?.phone
                        ? QuotationObj?.agentObj?.phone
                        : "+91 9310 985 146"}
                    </h6>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="text-center">
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
                            {QuotationObj?.agentObj?.phone
                              ? QuotationObj?.agentObj?.phone
                              : ""}
                            <span>
                              <img src={images.whatsapp} alt="" />{" "}
                            </span>
                          </a>
                        </li>

                        <li>
                          <a
                            href={`mailto:${QuotationObj?.agentObj?.email}`}
                            target={"_blank"}
                          >
                            {QuotationObj?.agentObj?.email
                              ? QuotationObj?.agentObj?.email
                              : ""}
                            <span>
                              <img src={images.gmail} alt="" />{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="socal_link">
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/FlipTripHolidays"
                            target={"_blank"}
                          >
                            <i
                              class="fa fa-facebook-square"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/Fliptrip_h"
                            target={"_blank"}
                          >
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
                            <i
                              class="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>
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
                        Northex Tower, 806, ITL, A-09, Netaji Subhash Place,
                        Pitam Pura, New Delhi, Delhi 110034, India
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
            {/* 
            
            
            */}
          </div>
        </div>
      )}
    </>
  );
};

export default Quotation;
