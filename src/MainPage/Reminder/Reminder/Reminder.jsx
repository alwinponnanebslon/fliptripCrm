import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { admin, leadStatus, rolesObj } from "../../../utils/roles";
import {
  tourGet,
  updateTour,
  deleteTour,
  setTour,
  addTour,
} from "../../../redux/features/tour/tourSlice";
import AddReminder from "./AddReminder";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  deleteReminder,
  reminderGet,
  updateReminder,
  setReminder,
} from "../../../redux/features/reminder/reminderSlice";

import { Table } from "antd";

// import {
//   getfollowUpApi,
//   getfollowUpCheckForNotificatin,
// } from "../../../Services/followUp";

export const GeneralReminder = () => {
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const reminderResultArr = useSelector((state) => state.reminder.reminders);
  const [reminderArr, setReminderArr] = useState([]);

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [tourId, setTourId] = useState("");

  const [followUpCheck, setFollowUpCheck] = useState([]);
  const userLeadId = useSelector((state) => state.auth?.user?._id);
  const { leadId } = useParams();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    handleInit();
    // handleCheckFollowUpForNotification();
  }, []);

  // console.log(followUpCheck, "followUpCheck32");
  // const handleCheckFollowUpForNotification = async () => {
  //   let getData = await getfollowUpCheckForNotificatin();
  //   setFollowUpCheck(getData.data.data);
  //   console.log(getData, "getData2");
  // };
  //   const getData = async () => {
  //     console.log("hello");
  //     let Arr = await followUp.find().lean().exec();
  //     console.log(Arr, "Ar43");
  // };
  // let time = Date.now();
  // console.log(time, "time23");
  // setTimeout(getData, time);

  const handleInit = () => {
    dispatch(reminderGet(userLeadId));
    // dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    // console.log(reminderArr, "reminderArr32");
    setReminderArr(reminderResultArr);
  }, [reminderResultArr]);

  const handleEdit = (row) => {
    // console.log(row, "row update"); //whole object
    setShowReminder(true);
    dispatch(setReminder(row));
  };

  const handleReminderDelete = (id) => {
    dispatch(deleteReminder({ id, leadId: userLeadId }));
  };

  const handleSatus = (row, status) => {
    let obj = {
      Id: row._id,
      leadId: leadId,
      status: status,
    };

    dispatch(updateReminder(obj));
  };

  const tour_columns = [
    {
      title: "Heading ",
      dataIndex: "heading",
      sorter: (a, b) => a.heading.length - b.heading.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (row, record) => <div>{record.description}</div>,
      // sorter: (a, b) => a.description.length - b.description.length,
    },

    {
      title: "Reminder Date",
      dataIndex: "followDate",
      render: (row, record) => <div>{record.followDate}</div>,
    },
    {
      title: "Reminder Time",
      dataIndex: "followTime",
      render: (row, record) => <div>{record.followTime}</div>,
      // sorter: (a, b) => a.followTime.length,
    },
    // {
    //   title: "Reminder Date",
    //   dataIndex: "followDate",
    //   sorter: (a, b) => new Date(a.followDate + "").toDateString(),
    //   // -        new Date(b.followDate + "").toLocaleString(),
    //   // render: (a) =>
    //   //   <div className="dropdown action-label">
    //   // new Date(a.followDate + "").toLocaleString(),
    //   //   </div>
    //   //  - b.followDate,
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (row, record) => (
    //     <div className="dropdown">
    //       <a
    //         href="#"
    //         className="btn btn-white btn-sm btn-rounded dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i
    //           className={
    //             record.status === true
    //               ? "fa fa-dot-circle-o text-success"
    //               : "fa fa-dot-circle-o text-danger"
    //           }
    //         />{" "}
    //         {record.status == true ? "Active" : "Inactive"}{" "}
    //       </a>
    //       <div className="dropdown-menu">
    //         <a
    //           className="dropdown-item"
    //           href="#"
    //           onClick={() => handleSatus(record, true)}
    //         >
    //           <i className="fa fa-dot-circle-o text-success" /> Active
    //         </a>
    //         <a
    //           className="dropdown-item"
    //           href="#"
    //           onClick={() => handleSatus(record, false)}
    //         >
    //           <i className="fa fa-dot-circle-o text-danger" /> Inactive
    //         </a>
    //       </div>
    //     </div>
    //   ),
    // },

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
            {/* <a
              className="dropdown-item"
              onClick={() => handleEdit(row)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a> */}
            <a
              className="dropdown-item"
              onClick={() => handleReminderDelete(row._id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const options = [
    //   { value: "Goa", label: "Goa" },
    //   { value: "Europe", label: "Europe" },
    //   { value: "Bali", label: "Bali" },
    //   { value: "Switzerland", label: "Switzerland" },
  ];
  const options1 = [
    // { value: "January", label: "January" },
    // { value: "February", label: "February" },
    // { value: "March", label: "March" },
    // { value: "April", label: "April" },
    // { value: "May", label: "May" },
    // { value: "June", label: "June" },
    // { value: "July", label: "July" },
    // { value: "August", label: "August" },
    // { value: "September	", label: "September	" },
    // { value: "October	", label: "October	" },
    // { value: "November", label: "November" },
    // { value: "December", label: "December" },
  ];
  const options2 = [
    // {
    //   value: "Still dreaming not sure Im going to take this trip",
    //   label: "Still dreaming  not sure Im going to take this trip",
    // },
    // {
    //   value: "Im definitely goingI know which place let go!",
    //   label: "Im definitely goingI know which place let go!",
    // },
    // { value: "In Progress", label: "In Progress" },
  ];
  const options3 = [
    // { value: "Active", label: "Active" },
    // { value: "Hot", label: "Me" },
    // { value: "in progrees", label: "in progrees" },
    // { value: "Book Know", label: "Book Know" },
  ];
  const options4 = [
    // { value: "Active", label: "Active" },
    // { value: "Hot", label: "Me" },
    // { value: "in progrees", label: "in progrees" },
    // { value: "Book Know", label: "Book Know" },
  ];
  const options5 = [
    // { value: "Active", label: "Active" },
    // { value: "Hot", label: "Me" },
    // { value: "in progrees", label: "in progrees" },
    // { value: "Book Know", label: "Book Know" },
  ];
  const options6 = [
    // { value: "Active", label: "Active" },
    // { value: "Hot", label: "Me" },
    // { value: "in progrees", label: "in progrees" },
    // { value: "Book Know", label: "Book Know" },
  ];

  useEffect(() => {
    // console.log(reminderArr, "reminderArr32");
    setShowReminder(showReminder);
  }, [showReminder]);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Create Reminder</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="container-fluid p-0">
        <div className="page-header caret_qotepage">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">
                <i className="la la-file-text-o" /> General Reminder
              </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active"> General Reminder</li>
              </ul>
            </div>

            <div className="col-auto float-end ml-auto">
              <a
                href="#"
                className="btn add-btn"
                // data-bs-toggle="modal"
                // data-bs-target="#add_Reminder"
                onClick={() => {
                  setShowReminder(true);
                }}
              >
                <i className="fa fa-plus" /> Add Reminder
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
        {/* <div className="drp-area">
          <div className="row">
            <div className="col-lg-2">
              <Select options={options} placeholder="Destinations " />
            </div>
            <div className="col-lg-2">
              <Select options={options1} placeholder="Month of Travel" />
            </div>
            <div className="col-lg-2">
              <Select options={options2} placeholder="Trip Stage" />
            </div>
            <div className="col-lg-2">
              <Select options={options3} placeholder="Lead Type" />
            </div>
            <div className="col-lg-2">
              <Select options={options4} placeholder="Followed UP" />
            </div>
            <div className="col-lg-2">
              <Select options={options5} placeholder="agents" />
            </div>
            <div className="row mt-2">
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
            </div>
          </div>
        </div> */}
        {/* {console.log(reminderArr, "reminderArr12")} */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: reminderArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  // showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: "auto" }}
                columns={tour_columns}
                dataSource={reminderArr}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
        <AddReminder
          showReminder={showReminder}
          setShowReminder={setShowReminder}
          // setIsChangeCheckBox={setIsChangeCheckBox}
        />
      </div>
    </div>
  );
};
export default GeneralReminder;
