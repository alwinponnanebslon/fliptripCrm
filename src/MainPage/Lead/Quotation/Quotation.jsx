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

import AddQuotation from "./AddQuotation";
import PopUp from "./PopUp";

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

  useEffect(() => {
    if (quotationStateArr && quotationStateArr.length > 0) {
      setIsConvert(quotationStateArr.some((el) => el.status == "Convert"));
    }
    setQuotationMainArr(quotationStateArr);
  }, [quotationStateArr]);

  const handleEdit = (row) => {
    setShow(true);
    // console.log(row, "row update"); //whole object
    dispatch(setQuotationObj(row));
    dispatch(setTour(row));
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
      // console.log(row, status, "1231werwers3243");
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
      // throw "tour name is mandatory";
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
            <></>
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
                <a
                  className="dropdown-item"
                  // data-bs-toggle="modal"
                  // data-bs-target="#add_quote"
                  onClick={() => handleEdit(row)}
                >
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

  // const options = [
  //   { value: "Goa", label: "Goa" },
  //   { value: "Europe", label: "Europe" },
  //   { value: "Bali", label: "Bali" },
  //   { value: "Switzerland", label: "Switzerland" },
  // ];

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
  // const options3 = [
  //   { value: "Honey gupta", label: "Honey gupta" },
  //   { value: "Me", label: "Me" },
  //   { value: "Mohit Bawa", label: "Mohit Bawa" },
  //   { value: "Deepika", label: "Deepika" },
  // ];
  // const box=show

  useEffect(() => {
    setShow(show);
  }, [show]);

  return (
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

            <div className="col-auto float-end ml-auto">
              {isConvert == false && (
                <a
                  href="#"
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
              )}
            </div>
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
            <div className="col-lg-2">
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
    </div>
  );
};

export default Quotation;
