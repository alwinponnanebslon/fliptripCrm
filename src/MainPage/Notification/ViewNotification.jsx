import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toastError } from "../../Utility/ToastUtils";
import { Helmet } from "react-helmet";
import {
  notificationGet,
  setNotification,
  notificationGetForSpecificUser,
} from "../../redux/features/notification/notificationSlice";
import { Table } from "antd";

function Notification({ makeChange }) {
  console.log("inisde notiification");
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth?.user?._id);

  const NotificationArray = useSelector(
    (state) => state.notification.notifications
  );

  const [name, setName] = useState("");
  // const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const [stateArr, setStateArr] = useState([]);
  const [stateId, setStateId] = useState("");
  const [notificationArr, setNotificationArr] = useState([]);

  const handleInit = () => {
    dispatch(notificationGetForSpecificUser(`${userId}`));
    // dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    console.log(NotificationArray, "12323424 NotificationArray");
    setNotificationArr(NotificationArray);
  }, [NotificationArray]);

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
      // render: (row, record) => <div>{row.description}</div>,
    },
    {
      title: "Follow Date",
      dataIndex: "followDate",
      sorter: (a, b) => a.followDate.length - b.followDate.length,
      // render: (row, record) => <div>{row.description}</div>,
    },

    // {
    //   title: "Remainder Date",
    //   dataIndex: "followDate",
    //   render: (row, record) => (
    //     <div>{new Date(record.followDate).toDateString()}</div>
    //   ),
    // },
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
    //           data-bs-toggle="modal"
    //           data-bs-target="#add_Remainder"
    //           // onClick={() => handleEdit(row)}
    //         >
    //           <i className="fa fa-pencil m-r-5" /> Edit
    //         </a>
    //         <a
    //           className="dropdown-item"
    //           // onClick={() => handleRemainderDelete(row._id)}
    //         >
    //           <i className="fa fa-trash-o m-r-5" /> Delete
    //         </a>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  // const statesObj = useSelector((state) => state.states.statesObj);
  // const cityObj = useSelector((state) => state.city.citiesObj);
  // const statesArr = useSelector((state) => state.states.states);
  // const handleAddCategory = () => {
  //   //
  //   if (name == "") {
  //     toastError("Name is mandatory");
  //     return;
  //   }
  //   if (stateId == "") {
  //     toastError("state is mandatory");
  //     return;
  //   }

  //   let obj = {
  //     name,
  //     stateId: stateId,
  //     status,
  //   };
  //   console.log(obj, "category obj");
  //   if (cityObj?._id) {
  //     dispatch(CITYUPDATE(cityObj._id, obj));
  //     dispatch(SETCITYOBJ(null));
  //     window.location.reload();
  //   } else {
  //     dispatch(CITYADD(obj));
  //   }
  // };

  // useEffect(() => {
  //   if (statesArr) {
  //     setStateArr(statesArr);
  //   }
  // }, [statesArr]);

  return (
    <div className="page-wrapper">
      <div className={makeChange ? "makeChange" : ""}>
        <form className="form row">
          <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
            <label className="blue-1 fs-12">{name}</label>
            <input
              readOnly
              value={name}
              // onChange={(event) => setName(event.target.value)}
              // type="text"
              className="form-control"
            />
            {/* </div> */}

            {/* <div className="col-12 col-md-12">
          <label>
            Description <span className="red">*</span>
          </label>
          {/* <label>
            {description} <span className="red">*</span>
          </label>
        </div> */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: NotificationArray.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      // showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                    }}
                    style={{ overflowX: "auto" }}
                    columns={tour_columns}
                    dataSource={NotificationArray}
                    rowKey={(record) => record.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Notification;
