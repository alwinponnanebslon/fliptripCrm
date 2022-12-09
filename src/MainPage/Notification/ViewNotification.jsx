import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toastError } from "../../Utility/ToastUtils";
import { Helmet } from "react-helmet";
import {
  notificationGet,
  deleteNotification,
  setNotification,
  notificationGetForSpecificUser,
} from "../../redux/features/notification/notificationSlice";

import { Table } from "antd";

import { Link, useParams } from "react-router-dom";
import Select from "react-select";

import { admin, leadStatus, rolesObj } from "../../utils/roles";

import AddNotification from "./AddNotification";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Notification() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth?.user?._id);

  const NotificationArray = useSelector(
    (state) => state.notification.notifications
  );

  // const [description, setDescription] = useState("");
  // const [tourId, setTourId] = useState("");

  // const [followUpCheck, setFollowUpCheck] = useState([]);
  const { leadId } = useParams();
  const [showNotification, setShowNotification] = useState(false);

  // const [name, setName] = useState("");
  const [notificationArr, setNotificationArr] = useState([]);

  const [filterNotificationObj, setfiterNotificationObj] = useState([]);
  const [notificationvalue, setNotificationvalue] = useState("");

  const handleInit = () => {
    // dispatch(notificationGetForSpecificUser(`${userId}`));
    dispatch(notificationGet());
  };

  useEffect(() => {
    handleInit();
  }, []);
  //
  useEffect(() => {
    // console.log(NotificationArray, "12323424 NotificationArray");
    let filter = NotificationArray.filter((el) => {
      // console.log(el.createdBy._id, "123");
      if (`${el?.createdBy?._id}` == `${userId}`) {
        return el;
      }
    });
    console.log(filter, "123fiter23");

    setNotificationArr(filter);
    // setNotificationArr(NotificationArray);
  }, [NotificationArray]);
  //

  useEffect(() => {
    if (notificationvalue == "SEND") {
      let filter = NotificationArray.filter((el) => {
        // console.log(el.createdBy._id, "123");
        if (`${el?.createdBy?._id}` == `${userId}`) {
          return el;
        }
      });
      // console.log(filter, "123fiter23");

      setNotificationArr(filter);
    } else {
      if (notificationvalue == "RECEIVED") {
        // console.log(userId, "userId343");
        let filter = NotificationArray.filter((el) => {
          // console.log(el.userId, "el.user23");
          if (`${el?.userId}` == `${userId}`) {
            return el;
          }
        });
        // console.log(filter, "234");
        // console.log(userId, "u1serId343");
        setNotificationArr(filter);
      }
    }
  }, [notificationvalue]);

  const handleEdit = (row) => {
    // console.log(row, "12row update"); //whole object
    setShowNotification(true);
    dispatch(setNotification(row));
  };

  const handleNotificationDelete = (id) => {
    // dispatch(deleteNotification({ id, leadId: userLeadId }));
    dispatch(deleteNotification(id));
  };

  const filterNotificationArr = [
    { label: "SEND", value: "SEND" },
    { label: "RECEIVED", value: "RECEIVED" },
  ];

  const tour_columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      sorter: (a, b) => a?.heading?.length - b?.heading?.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      // sorter: (a, b) => a.description.length - b.description.length,
      render: (row, record) => <div>{record?.description}</div>,
    },
    {
      title: "Follow Date",
      dataIndex: "userId",
      // sorter: (a, b) => a.followDate.length - b.followDate.length,
      render: (row, record) => <div>{record?.followDate}</div>,
    },
    {
      title: "Send to ",
      dataIndex: "sendTo",
      // sorter: (a, b) => a.followDate.length - b.followDate.length,
      render: (row, record) => <div>{record?.userObj?.firstName}</div>,
    },
    {
      title: "follow time ",
      dataIndex: "followTime",
      // sorter: (a, b) => a.followDate.length - b.followDate.length,
      render: (row, record) => <div>{record?.followTime}</div>,
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
            {/* <a
              className="dropdown-item"
              onClick={() => handleEdit(row)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a> */}
            <a
              className="dropdown-item"
              onClick={() => handleNotificationDelete(row._id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const tour_columnsReceived = [
    {
      title: "Heading",
      dataIndex: "heading",
      sorter: (a, b) => a?.heading?.length - b?.heading?.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      // sorter: (a, b) => a.description.length - b.description.length,
      render: (row, record) => <div>{record?.description}</div>,
    },
    {
      title: "Follow Date",
      dataIndex: "followDate",
      // sorter: (a, b) => a.followDate.length - b.followDate.length,
      render: (row, record) => <div>{record?.followDate}</div>,
    },
    {
      title: "Received From",
      dataIndex: "ReceivedFrom",
      // sorter: (a, b) => a.followDate.length - b.followDate.length,
      render: (row, record) => <div>{record?.createdBy?.name}</div>,
    },
    // {
    //   title: "Action",
    //   render: (row, record) => (
    //     <div className="dropdown dropdown-action text-end">
    //       <a
    //         href="#"
    //         className="action-icon dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="material-icons">more_vert</i>
    //       </a>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <a
    //           className="dropdown-item"
    //           // data-bs-toggle="modal"
    //           // data-bs-target="#add_Reminder"
    //           onClick={() => handleEdit(row)}
    //         >
    //           <i className="fa fa-pencil m-r-5" /> Edit
    //         </a>
    //         <a
    //           className="dropdown-item"
    //           onClick={() => handleNotificationDelete(row._id)}
    //         >
    //           <i className="fa fa-trash-o m-r-5" /> Delete
    //         </a>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Notification</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="container-fluid p-0">
        <div className="page-header caret_qotepage">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">
                <i className="la la-file-text-o" /> General Notification
              </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">General Notification</li>
              </ul>
            </div>

            <div className="col-auto float-end ml-auto">
              <a
                href="#"
                className="btn add-btn"
                onClick={() => {
                  setShowNotification(true);
                }}
              >
                <i className="fa fa-plus" /> Add Notification
              </a>
            </div>
          </div>
        </div>
        {/* 

*/}

        <div className="form-group form-focus">
          <Select
            options={filterNotificationArr.map((el) => {
              return {
                value: el.value,
                label: el.label,
              };
            })}
            placeholder="Select from options"
            defaultInputValue={notificationvalue}
            value={filterNotificationObj}
            onChange={(e) => {
              setNotificationvalue(e.value);
              setfiterNotificationObj(e);
            }}
          />
        </div>
        {/* 


*/}
        {/* {console.log(reminderArr, "reminderArr12")} */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: notificationArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                }}
                style={{ overflowX: "auto" }}
                columns={
                  notificationvalue == "SEND" || notificationvalue == ""
                    ? tour_columns
                    : tour_columnsReceived
                }
                // dataSource={notificationvalue=="SEND"?  notificationArr:}
                dataSource={notificationArr}
                rowKey={(record) => record?.id}
              />
            </div>
          </div>
        </div> 
        
        <AddNotification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      </div>
    </div>
  );
}

export default Notification;
//
//
