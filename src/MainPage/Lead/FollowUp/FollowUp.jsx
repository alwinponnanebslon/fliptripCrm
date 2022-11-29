import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { admin, leadStatus, rolesObj } from "../../../utils/roles";
import moment from "moment";
import {
  tourGet,
  updateTour,
  deleteTour,
  setTour,
  addTour,
} from "../../../redux/features/tour/tourSlice";

import AddFolowUp from "./AddFolowUp";

import {
  followUpGet,
  setfollowUp,
  deletefollowUp,
  updatefollowUp,
  followUpGetByStatus,
  followUpGetByMonth,
  followUpGetFilterByDate,
} from "../../../redux/features/followup/followUpSlice";

import { Table } from "antd";

import {
  getfollowUpApi,
  getfollowUpCheckForNotificatin,
} from "../../../Services/followUp";

export const QuotationFollowup = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const followUpResultArr = useSelector((state) => state.followUp.followUps);
  const [followUpMainArr, setFollowUpMainArr] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tourId, setTourId] = useState("");
  const [followUpCheck, setFollowUpCheck] = useState([]);
  const [statusValued, setStatusValued] = useState("");
  const [monthValued, setMonthValued] = useState("");
  const [handleDateFilter, setHandleDateFilter] = useState("");

  const { leadId } = useParams();

  useEffect(() => {
    handleInit();
    handleCheckFollowUpForNotification();
  }, []);

  const handleCheckFollowUpForNotification = async () => {
    let getData = await getfollowUpCheckForNotificatin();
    setFollowUpCheck(getData.data.data);
  };

  const handleInit = () => {
    dispatch(followUpGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    setFollowUpMainArr(followUpResultArr);
  }, [followUpResultArr]);

  const handleEdit = (row) => {
    dispatch(setfollowUp(row));
  };

  const handleFollowupDelete = (id) => {
    dispatch(deletefollowUp({ id, leadId }));
  };

  const handleSatus = (row, status) => {
    let obj = {
      Id: row._id,
      leadId: leadId,
      status: status,
    };

    dispatch(updatefollowUp(obj));
  };

  useEffect(() => {
    if (handleDateFilter != "") {
      let obj = {
        handleDateFilter,
        leadId,
      };
      dispatch(followUpGetFilterByDate(obj));
    }
  }, [handleDateFilter]);

  useEffect(() => {
    if (statusValued && statusValued.length > 1) {
      let obj = {
        statusValued,
        leadId,
      };
      dispatch(followUpGetByStatus(obj));
    }
  }, [statusValued]);

  useEffect(() => {
    console.log(monthValued, "setMonthValued34");
    if (monthValued != "") {
      let obj = {
        monthValued,
        leadId,
      };
      dispatch(followUpGetByMonth(obj));
    }
  }, [monthValued]);

  const tour_columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      sorter: (a, b) => a.heading.length - b.heading.length,
    },

    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   sorter: (a, b) => a.followDate.length - b.followDate.length,
    // },
    {
      title: "Status",
      dataIndex: "status",
      render: (row, record) => (
        <div className="dropdown">
          <a
            href="#"
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                record.status === true
                  ? "fa fa-dot-circle-o text-success"
                  : "fa fa-dot-circle-o text-danger"
              }
            />{" "}
            {record.status == true ? "Active" : "Inactive"}{" "}
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSatus(record, true)}
            >
              <i className="fa fa-dot-circle-o text-success" /> Active
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSatus(record, false)}
            >
              <i className="fa fa-dot-circle-o text-danger" /> Inactive
            </a>
          </div>
        </div>
      ),
    },

    {
      title: "Action",
      render: (row, record) => (
        <div className="dropdown dropdown-action text-end">
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
              data-bs-toggle="modal"
              data-bs-target="#add_followup"
              onClick={() => handleEdit(row)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleFollowupDelete(row._id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const options5 = [
    { value: "Goa", label: "Goa" },
    { value: "Europe", label: "Europe" },
    { value: "Bali", label: "Bali" },
    { value: "Switzerland", label: "Switzerland" },
  ];
  const options1 = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September	" },
    { value: 9, label: "October	" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];
  // const options2 = [
  //   {
  //     value: "Still dreaming not sure Im going to take this trip",
  //     label: "Still dreaming  not sure Im going to take this trip",
  //   },
  //   {
  //     value: "Im definitely goingI know which place let go!",
  //     label: "Im definitely goingI know which place let go!",
  //   },
  //   { value: "In Progress", label: "In Progress" },
  // ];

  const options3 = [
    { value: "Active", label: "Active" },
    // { value: "Hot", label: "Me" },
    { value: "inActive", label: "In Active" },
    // { value: "Book Know", label: "Book Know" },
  ];
  // const options4 = [
  //   { value: "Active", label: "Active" },
  //   { value: "Hot", label: "Me" },
  //   { value: "in progrees", label: "in progrees" },
  //   { value: "Book Know", label: "Book Know" },
  // ];
  // const options5 = [
  //   { value: "Active", label: "Active" },
  //   { value: "Hot", label: "Me" },
  //   { value: "in progrees", label: "in progrees" },
  //   { value: "Book Know", label: "Book Know" },
  // ];
  // const options6 = [
  //   { value: "Active", label: "Active" },
  //   { value: "Hot", label: "Me" },
  //   { value: "in progrees", label: "in progrees" },
  //   { value: "Book Know", label: "Book Know" },
  // ];

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
                <i className="la la-file-text-o" /> Quotation Followup
              </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Quotation Followup</li>
              </ul>
            </div>

            <div className="col-auto float-end ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_followup"
              >
                <i className="fa fa-plus" /> Add Followup
              </a>
            </div>
          </div>
          {/* <div className="list_group_qoute pt-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="list_qoute">
                  <ul>
                    <li>
                      <Link className="active">All</Link>{" "}
                    </li>
                    <li>
                      <Link>Pending Followup</Link>{" "}
                    </li>
                    <li>
                      <Link>Phone no. released</Link>{" "}
                    </li>
                    <li>
                      <Link>Reminders</Link>{" "}
                    </li>
                    <li>
                      <Link>Reminders</Link>{" "}
                    </li>
                    <li>
                      <Link>My Hot</Link>{" "}
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
                onChange={(e) => {
                  setMonthValued(e.value);
                }}
              />
            </div>
            {/* <div className="col-lg-2">
              <Select options={options2} placeholder="Trip Stage" />
            </div> */}
            <div className="col-lg-2">
              <Select
                options={options3}
                placeholder="Status Type"
                onChange={(e) => {
                  // console.log(e, "asd");
                  setStatusValued(e.value);
                  // setCitiesObj(e);
                }}
              />
            </div>
            <div className="col-lg-2">
              <input
                placeholder="Follow Date"
                type="date"
                // name="checkIn"
                // value={`${moment(hotel.checkIn).format("YYYY-MM-DD")}`}
                className="form-control"
                onChange={(e) => setHandleDateFilter(e.target.value)}
              />

              {/* <Select options={options4} placeholder="Followed UP" /> */}
            </div>
            {/* <div className="col-lg-2">
              <Select options={options5} placeholder="agents" />
            </div> */}
            {/* <div className="row mt-2">
              <div className="col-lg-2">
                <Select options={options6} placeholder="No Followup" />
              </div>
              <div className="col-lg-2">
                <Select options={options6} placeholder="Special Leads" />
              </div>
              <div className="col-lg-2">
                <Select
                  options={options6}
                  placeholder="Follow-up eligibility"
                />
              </div>
            </div> */}
          </div>
        </div>
        {console.log(followUpMainArr, "followUpMainArr123")}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: followUpMainArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  // showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: "auto" }}
                columns={tour_columns}
                // bordered
                dataSource={followUpMainArr}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
        <AddFolowUp />
      </div>
    </div>
  );
};
export default QuotationFollowup;
