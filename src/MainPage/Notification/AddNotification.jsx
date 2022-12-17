import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import {
//   addReminder,
//   updateReminder,
//   setReminder,
// } from "../../../redux/features/reminder/reminderSlice";
import Select from "react-select";

import {
  addEmployeeToDb,
  getEmployess,
  getAllEmployess,
} from "../../Services/user.service";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment/moment";
import DatePicker from "react-date-picker";
import { toastError } from "../../utils/toastUtils";
import {
  addNotification,
  setNotification,
  updateNotification,
} from "../../redux/features/notification/notificationSlice";
// import { toastError } from "../../../utils/toastUtils";

const AddNotification = ({
  showNotification,
  setShowNotification,
  // setIsChangeCheckBox,
}) => {
  const dispatch = useDispatch();
  const notificationObj = useSelector(
    (state) => state.notification.notificationObj
  );

  const [heading, setHeading] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [followDate, setFollowDate] = useState("");
  const [followTime, setFollowTime] = useState("");
  const [description, setDescription] = useState("");
  const [followupId, setFollowupId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeObj, setEmployeeObj] = useState([]);
  const userLeadId = useSelector((state) => state.auth?.user?._id);
  const params = useParams();

  const userObj = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const [createdBy, setCreatedBy] = useState(null);

  useEffect(() => {
    handleGetAllEmployees();
  }, []);

  const handleEdit = (row) => {
    // console.log(row, "row update"); //whole object
    setShowNotification(true);
    dispatch(setNotification(row));
  };

  const handleGetAllEmployees = async () => {
    try {
      // let { data: res } = await getAllEmployess({`role`= `${role}`});
      let { data: res } = await getAllEmployess(
        `role=${role}&id=${userLeadId}`
      );
      console.log(res, "1Res23");
      if (res.status) {
        setAllEmployees(res.data);
        // dispatch(returnAllEmployees(res.data));
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    setCreatedBy(userObj);
  }, [userObj]);

  useEffect(() => {
    console.log(notificationObj, "notificationObj23");
    if (notificationObj && notificationObj._id) {
      setIsUpdate(true);
      setEmployeeId(notificationObj?._id);
      setFollowupId(notificationObj._id);
      setHeading(notificationObj.heading);
      setDescription(notificationObj.description);
      setFollowDate(moment(notificationObj.followDate).format("YYYY-MM-DD"));
      setFollowTime(moment(notificationObj.followTime).format("YYYY-MM-DD"));
    }
    // else {
    //   setIsUpdate(false);
    //   setFollowupId("");
    //   setHeading("");
    //   setDescription("");
    //   setFollowDate("");
    //   setFollowTime("");
    // }
  }, [notificationObj]);

  // useEffect(() => {
  //
  //   setEmployeeId(notificationObj?._id);
  // }, [notificationObj]);

  useEffect(() => {
    setCreatedBy(userObj);
  }, []);

  const clearFunc = () => {
    setHeading("");
    setDescription("");
    setEmployeeId("");
    setFollowDate("");
    setFollowTime("");
    setFollowupId("");
    setIsUpdate(false);
    // dispatch(setNotification({}));
    // setAllEmployees([]);
  };
  const handleSubmit = () => {
    // console.log(heading, "heading23");
    if (heading == "" || heading == undefined) {
      toastError("Heading is mandatory ");
      return;
    } else if (employeeId == "" || employeeId == undefined) {
      toastError("kindly add whom you send this notification ");
    } else if (followTime == "") {
      toastError("Follow time is mandatory ");
      return;
    } else {
      // setIsChangeCheckBox(true);
      let obj = {
        heading,
        description,
        userId: employeeId,
        leadId: employeeId,
        followDate,
        createdBy: { ...createdBy, role },
        followTime,
      };
      // console.log(obj, "obj23");
      if (notificationObj && notificationObj._id) {
        // console.log()
        obj.id = followupId;
        // dispatch(updateReminder(obj));
        dispatch(updateNotification(obj));
        // console.log("12348");
        setShowNotification(false);
        setIsUpdate(false);
        clearFunc();
      } else {
        // setIsChangeCheckBox(true);
        dispatch(addNotification(obj));
        setShowNotification(false);
        setIsUpdate(false);
        clearFunc();
      }
    }
  };

  // console.log(followDate, "fooldate");

  return (
    <div id="add_Reminder" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          {/* <div className="modal-header">
            <h5 className="modal-title">
              {notificationObj?._id ? "Edit" : "Add"} Reminder
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div> */}
          {/* <div className="modal-body"> */}

          {/* <Modal show={showNotification} className="add_note"> */}
          <Modal show={showNotification}>
            <Modal.Header>
              <Modal.Title>
                {isUpdate ? "Edit" : "Add"} Notification
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Heading <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                </div>
                {/* console.log(A ) */}
                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Send to <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Select
                      options={allEmployees.map((el) => {
                        return {
                          ...el,
                          value: el._id,
                          label:
                            el.firstName +
                            " " +
                            "[" +
                            el.role +
                            "]" +
                            " " +
                            el.employeeId,
                        };
                      })}
                      placeholder="Select from options"
                      // defaultInputValue={employeeId}
                      // value={employeeObj}
                      onChange={(e) => {
                        setEmployeeId(e.value);
                        setEmployeeObj(e);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">Description</label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Follow Date <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    {/* DatePicker */}
                    <input
                      type="date"
                      className="form-control"
                      value={followDate}
                      onChange={(e) => {
                        setFollowDate(e.target.value);
                        // console.log(e.target.value, "insie");
                      }}
                      // onChange={(e) =>
                      //   setFollowDate(
                      //     moment(e.target.value).format("YYYY-MM-DD, h:mm:ss a")
                      //   )
                      // }
                    />
                    <input
                      type="time"
                      className="form-control"
                      value={followTime}
                      onChange={(e) => {
                        setFollowTime(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowNotification(false);
                  clearFunc();
                }}
              >
                Close
              </Button>
              <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                {isUpdate ? "Edit" : "Add"} Notification
              </Button>
            </Modal.Footer>
          </Modal>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
