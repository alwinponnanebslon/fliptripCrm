import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  // remainderGet
  // addRemainder
  // updateRemainder
  // deleteRemainder
  // setRemainder

  addRemainder,
  updateRemainder,
  setRemainder,
} from "../../../redux/features/remainder/remainderSlice";
import Select from "react-select";
import {
  addEmployeeToDb,
  getEmployess,
  getAllEmployess,
} from "../../../Services/user.service";

import moment from "moment/moment";
import DatePicker from "react-date-picker";

const AddRemainder = () => {
  const dispatch = useDispatch();
  const remainderObj = useSelector((state) => state.remainder.remainderObj);

  const [heading, setHeading] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [followDate, setFollowDate] = useState("");
  const [followTime, setFollowTime] = useState("");
  const [description, setDescription] = useState("");
  const [followupId, setFollowupId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState([]);
  const [employeeObj, setEmployeeObj] = useState([]);
  const userLeadId = useSelector((state) => state.auth?.user?._id);
  const params = useParams();

  const userObj = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const [createdBy, setCreatedBy] = useState(null);

  useEffect(() => {
    handleGetAllEmployees();
  }, []);

  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getAllEmployess();
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
    setCreatedBy(userObj);
  }, []);

  const handleSubmit = () => {
    let obj = {
      heading,
      description,
      leadId: userLeadId,
      followDate,
      createdBy: { ...createdBy, role },
      followTime,
    };

    console.log(obj, "ob23");

    if (remainderObj?._id) {
      obj.Id = followupId;
      dispatch(updateRemainder(obj));
      setIsUpdate(false);
    } else {
      dispatch(addRemainder(obj));
    }
  };

  // console.log(followDate, "fooldate");

  const handleClose = () => {
    dispatch(setRemainder(null));
    setIsUpdate(false);
    setFollowupId("");
    setHeading("");
    setDescription("");
    setFollowDate("");
  };

  useEffect(() => {
    if (remainderObj) {
      setIsUpdate(true);
      setFollowupId(remainderObj._id);
      setHeading(remainderObj.heading);
      setDescription(remainderObj.description);
      setFollowDate(moment(remainderObj.followDate).format("YYYY-MM-DD "));
    } else {
      setIsUpdate(false);
      setFollowupId("");
      setHeading("");
      setDescription("");
      setFollowDate("");
      setFollowTime("");
    }
  }, [remainderObj]);

  return (
    <div id="add_Remainder" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {remainderObj?._id ? "Edit" : "Add"} Remainder
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
          </div>
          <div className="modal-body">
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

              {/* <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Assign to <span className="red">*</span>
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
                    defaultInputValue={employeeId}
                    value={employeeObj}
                    onChange={(e) => {
                      setEmployeeId(e.value);
                      setEmployeeObj(e);
                    }}
                  />
                </div>
              </div> */}
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
                <label className="col-form-label col-md-2"> Follow Date </label>
                <div className="col-md-10">
                  DatePicker
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
                  {console.log(followTime, "follow23")}
                  <input
                    type="time"
                    className="form-control"
                    value={followTime}
                    onChange={(e) => {
                      setFollowTime(e.target.value);
                      // console.log(e.target.value, "insie23");
                    }}
                    // onChange={(e) =>
                    //   setFollowDate(
                    //     moment(e.target.value).format("YYYY-MM-DD, h:mm:ss a")
                    //   )
                    // }
                  />
                </div>
              </div>
              <div className="col-12">
                <button
                  onClick={() => handleSubmit()}
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn add-btn"
                >
                  {remainderObj?._id ? "Update" : "Save"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRemainder;
