import { CalendarDataManager } from "@fullcalendar/react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import {
  getAllTeamLeadsEmployees,
  returnAllEmployees,
  serCurrentEmployee,
} from "../../redux/features/employee/employeeSlice";
import { getAllEmployees } from "../../redux/features/employee/employeeSlice";
import {
  addEmployeeToDb,
  getEmployess,
  updateEmployeeToDb,
  getAllEmployess,
} from "../../Services/user.service";
import { rolesObj } from "../../utils/roles";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import styles from "./selectStyles.module.css";
// import styles from ".";
// import {
//   getAllEmployees,
//   returnAllEmployees,
// } from "../../../redux/features/employee/employeeSlice";

const Addemployee = ({ show, setShow }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  // const [doj, setDoj] = useState(new Date());
  const [doj, setDoj] = useState("");
  // const [dob, setDob] = useState(new Date());
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [leadId, setLeadId] = useState("");
  const dispatch = useDispatch();
  const [teamLeadsArr, setTeamLeadsArr] = useState([]);
  const employees = useSelector(getAllEmployees);
  const [employeeObj, setEmployeeObj] = useState({});
  const [prevDocUpdated, setPrevDocUpdated] = useState(false);
  const [docId, setDocId] = useState("");

  const reduxrole = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.user._id);
  const employeeObject = useSelector((state) => state.employee.employeeObj);

  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployess(userObj._id, reduxrole);
      if (res.success) {
        dispatch(returnAllEmployees(res.data));
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };
  useEffect(() => {
    handleGetAllEmployees();
  }, []);

  useEffect(() => {
    // console.log(reduxrole, "redux123");
    if (reduxrole == rolesObj.TEAMLEAD) {
      setLeadId(userId);
    }
    // if (role == "SPOC") {
    //   setLeadId(userId);
    // }
  }, [role]);

  useEffect(() => {
    if (employeeObject && employeeObject._id) {
      setEmployeeObj(employeeObject);
    }
  }, [employeeObject]);

  useEffect(() => {
    // console.log(employeeObj, "21employeeObj234");
    // console.log(new Date(employeeObj.doj).toLocaleDateString(), "1234");
    // console.log(new Date(employeeObj.dob).toLocaleDateString(), "7890");
    // console.log(moment(employeeObj.doj).format("YYYY-MM-DD"), "7890");
    // console.log(moment(employeeObj.dob).format("YYYY-MM-DD"), "71213");
    if (employeeObj && employeeObj._id) {
      setFirstName(employeeObj.firstName);
      setLastName(employeeObj?.lastName);
      setEmail(employeeObj.email);
      setPhone(employeeObj.phone);
      setPassword(employeeObj.password);
      setConfirmPassword(employeeObj.confirmPassword);
      setEmployeeId(employeeObj.employeeId);
      setDoj(moment(employeeObj.doj).format("YYYY-MM-DD"));
      setDob(moment(employeeObj.dob).format("YYYY-MM-DD"));
      setRole(employeeObj.role);
      setEmergencyContact(employeeObj.emergencyContact);
      setLeadId(employeeObj.leadId);
      setPrevDocUpdated(true);
      setDocId(employeeObj._id);
      //
    }
  }, [employeeObj]);

  const ClearFunc = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setEmployeeId("");
    setDoj("");
    setDob("");
    setRole("");
    setEmergencyContact("");
    // setLeadId("");
    // setTeamLeadsArr("");
    dispatch(serCurrentEmployee({}));
    // setDocId("");
    setPrevDocUpdated(false);
  };

  const handleEmployeeEdit = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        firstName,
        lastName,
        employeeId,
        doj,
        phone,
        dob,

        emergencyContact,
      };
      // if (role == rolesObj.SPOC) {
      //   obj.leadId = leadId;
      // }
      // console.log(obj, "obj23");
      let { data: res } = await updateEmployeeToDb(docId, obj);

      if (res.success) {
        // dispatch(addEmployee(obj))
        toastSuccess(res.message);
        handleGetAllEmployees();
        // getAllEmployess();
        window.location.reload();
        ClearFunc();
        dispatch(returnAllEmployees);
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const handleCheckIsUpdateOrCreate = async (e) => {
    {
      prevDocUpdated ? handleEmployeeEdit(e) : handleEmployeeCreate(e);
    }
  };

  const handleEmployeeCreate = async (e) => {
    e.preventDefault();
    try {
      if (firstName == "") {
        toast.error("First name cannot be empty");
        return;
      }

      if (email == "") {
        toast.error("Email cannot be empty");
        return;
      }
      if (phone == "") {
        toast.error("Phone cannot be empty");
        return;
      }
      if (`${phone}`.length != 10) {
        toast.error("Phone cannot be less than 10 digits");
        return;
      }
      if (emergencyContact == "") {
        toast.error("Emergency Contact cannot be empty");
        return;
      }
      if (`${emergencyContact}`.length != 10) {
        toast.error("Emergency Contact cannot be less than 10 digits");
        return;
      }
      if (password.trim().length == 0) {
        toast.error("Password can't be empty");
        return;
      } else if (password.trim().length < 5) {
        toast.error("Password length should not be less than five digits");
        return;
      }
      if (password != confirmPassword) {
        toast.error("Password and confirm password cannot be different");
        return;
      }
      if (employeeId == "") {
        toast.error("EmployeeId cannot be empty");
        return;
      }
      if (password == "") {
        toast.error("Password cannot be empty");
        return;
      }
      if (confirmPassword == "") {
        toast.error("Confirm Password cannot be empty");
        return;
      }
      if (role == "") {
        toast.error("Role cannot be empty");
        return;
      }
      if (role == rolesObj.SPOC && leadId == "") {
        toast.error("Team Lead cannot be empty");
        return;
      }
      if (doj == "") {
        toast.error("Date of joining is mandatory");
        return;
      }
      if (dob == "") {
        toast.error("Date of birth is mandatory");
        return;
      }
      let obj = {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        employeeId,
        doj,
        dob,
        role,
        emergencyContact,
      };
      if (role == rolesObj.SPOC) {
        obj.leadId = leadId;
      }
      // console.log(obj, "obj123132");
      let { data: res } = await addEmployeeToDb(obj);

      if (res.success) {
        // dispatch(addEmployee(obj))
        toastSuccess(res.message);
        handleGetAllEmployees();
        // window.location.reload();
        setShow(false);
        ClearFunc();
        // // console.log(obj)
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    if (employees && employees.length > 0) {
      setTeamLeadsArr(employees.filter((el) => el.role == rolesObj.TEAMLEAD));
    }
  }, [employees]);

  return (
    <>
      {/* Add Employee Modal */}
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title">
                {prevDocUpdated ? "Update" : "Add"} Employee
              </h5>
              <button
                type="button"
                className="close"
                // data-bs-dismiss="modal"
                // aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div> */}
            {/* <div className="modal-body"> */}
            <Modal size="lg" show={show} className="add_employee">
              <Modal.Header>
                <Modal.Title>
                  {prevDocUpdated ? "Update" : "Add"} Employee
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Last Name</label>
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    {!prevDocUpdated && (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            type="email"
                          />
                        </div>
                      </div>
                    )}
                    {!prevDocUpdated && (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Password</label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            type="password"
                          />
                        </div>
                      </div>
                    )}
                    {!prevDocUpdated && (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Confirm Password
                          </label>
                          <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            type="password"
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Employee ID <span className="text-danger">*</span>
                        </label>
                        <input
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Joining Date <span className="text-danger">*</span>
                        </label>
                        <div>
                          <input
                            //   // checked={employeeObj.doj ? employeeObj.doj : ""}
                            value={doj}
                            onChange={(e) => setDoj(e.target.value)}
                            className="form-control datetimepicker"
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Birth Date <span className="text-danger">*</span>
                        </label>
                        <div>
                          <input
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="form-control datetimepicker"
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Phone<span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          value={phone}
                          maxLength={10}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Emergency Contact
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={emergencyContact}
                          maxLength={10}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* {console.log(prevDocUpdated, "prevDocUpdated34")} */}
                    {
                      <div>
                        {prevDocUpdated == false ? (
                          <div className="col-md-6 mt-3">
                            <div className="form-group">
                              <label>
                                Role <span className="text-danger">*</span>
                              </label>
                              {reduxrole == "ADMIN" && (
                                <select
                                  value={role}
                                  onChange={(e) => {
                                    setRole(e.target.value);
                                  }}
                                  className={styles.selectStyle}
                                >
                                  <option value="">Please Select Role</option>

                                  <option value={rolesObj.SPOC}>
                                    {rolesObj.SPOC}
                                  </option>
                                  <option value={rolesObj.SUPERVISOR}>
                                    {rolesObj.SUPERVISOR}
                                  </option>
                                  <option value={rolesObj.ACCOUNT}>
                                    {rolesObj.ACCOUNT}
                                  </option>

                                  <option value={rolesObj.TEAMLEAD}>
                                    {rolesObj.TEAMLEAD}
                                  </option>
                                </select>
                              )}

                              {reduxrole == "TEAMLEAD" && (
                                <select
                                  // readOnly={prevDocUpdated == false ? true : false}
                                  value={role}
                                  onChange={(e) => {
                                    setRole(e.target.value);
                                  }}
                                  className={styles.selectStyle}
                                >
                                  <option value="">Please Select Role</option>
                                  <option value={rolesObj.SPOC}>
                                    {rolesObj.SPOC}
                                  </option>
                                </select>
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    }
                    {prevDocUpdated == false
                      ? role == rolesObj.SPOC &&
                        reduxrole == "ADMIN" && (
                          <div className="col-md-6 mt-3">
                            <div className="form-group">
                              <label>
                                Team Lead<span className="text-danger">*</span>
                              </label>
                              <select
                                value={leadId}
                                onChange={(e) => {
                                  setLeadId(e.target.value);
                                }}
                                className={styles.selectStyle}
                              >
                                <option value="">
                                  Please Select Team Lead
                                </option>
                                {teamLeadsArr &&
                                  teamLeadsArr.length > 0 &&
                                  teamLeadsArr.map((el, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={el._id}
                                      >{`${el.firstName} ${el.lastName}`}</option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        )
                      : ""}
                    {/* {reduxrole == "TEAMLEAD" && setLeadId(userId)} */}
                  </div>
                  {/* <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td>Holidays</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={2}>
                        <td>Leaves</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={3}>
                        <td>Clients</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={4}>
                        <td>Projects</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={5}>
                        <td>Tasks</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={6}>
                        <td>Chats</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={7}>
                        <td>Assets</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={8}>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
                      onClick={(e) => {
                        handleCheckIsUpdateOrCreate(e);
                      }}
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                    ClearFunc();
                  }}
                >
                  Close
                </Button>
                {/* <Button variant="primary">Save changes</Button> */}
              </Modal.Footer>
            </Modal>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* /Add Employee Modal */}
    </>
  );
};

export default Addemployee;
