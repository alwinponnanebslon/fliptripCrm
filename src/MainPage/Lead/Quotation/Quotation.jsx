import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import { Table } from "antd";
import { toastError, toastSuccess } from "../../../utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { admin, leadStatus, rolesObj } from "../../../utils/roles";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import Pdf from "../MainPage/Pdf/Index";
import Pdfile from "../../../MainPage/Pdf/Index";
import { jsPDF } from "jspdf";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import ReactToPdf from "react-to-pdf";
import ReactDOM from "react-dom";
import {
  tourGet,
  updateTour,
  setTour,
} from "../../../redux/features/tour/tourSlice";

import { getById } from "../../../Services/lead.service";

import {
  quotationGet,
  setQuotationObj,
  quotationDelete,
  quotationUpdateStatus,
  quotationFilterGet,
  quotationFilterByStatusGet,
} from "../../../redux/features/quotation/quotationSlice";
import html2canvas from "html2canvas";
import AddQuotation from "./AddQuotation";
import PopUp from "./PopUp";

const ref = React.createRef();

const Quotation = () => {
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const { leadId } = useParams();
  // console.log(leadId, "leadId3q4");
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

  useEffect(() => {
    handleInit();
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
  const MyDoc = () => {
    return <Pdfile />;
  };
  useEffect(() => {
    // console.log(quotationStateArr, "quotationStateArr231");
    if (quotationStateArr && quotationStateArr?.length > 0) {
      setIsConvert(quotationStateArr.some((el) => el.status == "Convert"));
    } else {
      setIsConvert(false);
    }
    setQuotationMainArr(quotationStateArr);
  }, [quotationStateArr]);

  useEffect(() => {
    console.log(isConvert, "isConvert");
  }, [isConvert]);

  const handleEdit = (row) => {
    setShow(true);
    // console.log(row, "row update"); //whole object
    dispatch(setQuotationObj(row));
    dispatch(setTour(row));
  };

  // const handleDownload = (row, toPdf, e) => {
  const handleDownload = (row) => {
    // const input = ;
    localStorage.setItem("quotationPdf", JSON.stringify(row));

    dispatch(setQuotationObj(row));
    dispatch(setTour(row));

    setTimeout(() => {
      const input = document.getElementById("mainPdfContainer");

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [
            ref.current?.clientHeight * window.devicePixelRatio,
            ref.current?.clientWidth * window.devicePixelRatio,
          ],
          putOnlyUsedFonts: true,
          floatPrecision: "smart",
          hotfixes: ["px_scaling"],
        });
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save(`downloadFileName.pdf`);
      });
      // if (toPdf) {
      //   toPdf(e);
      // }
    }, 300);

    // console.log(row, "row update"); //whole object
    // history.push("/pdf");
  };

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
            // navigate("/path/to/push");
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
    console.log(row, status, "3423");
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
      title: "Created On",
      dataIndex: "createdAt",
      render: (row, record) => (
        <div>
          {new Date(record.createdAt).toDateString()} at (
          {new Date(record.createdAt).getHours()}:
          {new Date(record.createdAt).getMinutes()})
        </div>
      ),
    },
    {
      title: "Name",
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
            <a className="btn btn-white btn-sm ">
              <i
                className={
                  record.status === "Convert"
                    ? "fa fa-dot-circle-o text-success"
                    : "fa fa-dot-circle-o text-danger"
                }
              />
              {/* <i
              className={
                // record.status === "Approved"
                record.status === "Convert"
                  ? //window.confirm("Are you sure to convert this Quotation?")
                    // deleteFleet()
                    // confirmAlert(options)

                  : // alert('"Are you sure to convert this Quotation?"')
                    "fa fa-dot-circle-o text-danger"
              } 
              />*/}
              {record.status}
            </a>
          ) : (
            <>
              <a
                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className={
                    // record.status === "Approved"
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
                <span
                  className="dropdown-item"
                  onClick={() => handleDownload(row)}
                >
                  <i className="fa fa-trash-o m-r-5" /> Download
                </span>
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
                <span
                  className="dropdown-item"
                  onClick={() => handleDownload(row)}
                >
                  <i className="fa fa-trash-o m-r-5" /> Download
                </span>

                {/* {ref.current?.clientHeight && (
                  <ReactToPdf
                    targetRef={ref}
                    filename="div-blue.pdf"
                    options={{
                      orientation: "portrait",
                      unit: ref.current?.clientHeight ? "px" : "in",
                      format: [
                        ref.current?.clientHeight
                          ? ref.current?.clientHeight
                          : 90,
                        ref.current?.clientWidth
                          ? ref.current?.clientWidth
                          : 20,
                      ],
                      putOnlyUsedFonts: true,
                      floatPrecision: "smart",
                      hotfixes: ["px_scaling"],
                    }}
                    // x={0.5}
                    // y={0.5}
                    // scale={0.8}
                  >
                    {({ toPdf }) => (
                      <button
                        onClick={(e) => {
                          handleDownload(row, toPdf, e);
                        }}
                      >
                        Generate pdf
                      </button>
                    )}
                  </ReactToPdf>
                )} */}

                {/* <div
                  style={{ width: 50, height: 50, background: "blue" }}
                  ref={ref}
                /> */}

                {/* <div>
                  <Pdf targetRef={ref} filename="pdf-example.pdf">
                    {({ toPdf }) => (
                      <button onClick={handleDownload(row)}>
                        Generate Pdf
                      </button>
                    )}
                  </Pdf>
              
                </div> */}
                {/* <div>
                  <PDFDownloadLink document={Pdfile} fileName="somename.pdf" >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download now!"
                    }
                  </PDFDownloadLink>
                </div> */}
                {/* 
                <a
                  className="dropdown-item"
                  onClick={() => handleDownload(row)}
                >
                
                  <i className="fa fa-world m-r-5" /> Download
                </a> */}
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

  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Create Qoute</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="container-fluid p-0">
          <div className="page-header caret_qotepage">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">
                  <i className="la la-file" /> Create Quote
                </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Create Quote</li>
                </ul>
              </div>

              {isConvert == false && (
                <div className="col-auto float-end ml-auto">
                  <a
                    className="btn add-btn"
                    // data-bs-toggle="modal"
                    // data-bs-target="#add_quote"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <i
                      className="fa fa-plus"
                      // onClick={() => {
                      //   setShow(true);
                      // }}
                    />
                    Add Quote
                  </a>
                </div>
              )}
            </div>
            {/* <div className="list_group_qoute pt-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="list_qoute">
                  <ul>
                    <li>
                      <a className="active">All</a>{" "}
                    </li>
                    <li>
                      <a>Home</a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          <div className="drp-area">
            <div className="row">
              {/* <div className="col-lg-2">
              <Select options={options} placeholder="Destinations " />
            </div> */}
              <div className="col-lg-2">
                <Select
                  options={options1}
                  placeholder="Month of Travel"
                  // value={Obj}
                  onChange={(e) => {
                    // console.log(e, "asd");
                    setMonthValued(e.value);
                    // setCitiesObj(e);
                  }}
                />
              </div>
              <div className="col-lg-2 z-12">
                <Select
                  options={options2}
                  placeholder="Status Type"
                  onChange={(e) => {
                    // console.log(e, "asd");
                    setStatusValued(e.value);
                    // setCitiesObj(e);
                  }}
                />
              </div>
              {/* 
            <div className="col-lg-2">
              <Select options={options3} placeholder="Agent" />
            </div> */}
            </div>
          </div>
          {/* {console.log(quotationMainArr, "quotationMainArr234")} */}

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
        <AddQuotation show={show} setShow={setShow} />
        {/* <div style={{ opacity: 0, height: 0 }}> */}
        {/* </div> */}
      </div>
      <div style={{ opacity: 0, pointerEvents: "none", zIndex: -5, height: 0 }}>
        <div ref={ref}>
          <Pdfile />
        </div>
      </div>
    </>
  );
};

export default Quotation;
