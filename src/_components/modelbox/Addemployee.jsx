
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeamLeadsEmployees, returnAllEmployees } from '../../redux/features/employee/employeeSlice';
import { getAllEmployees } from '../../redux/features/employee/employeeSlice';
import { addEmployeeToDb, getEmployess } from '../../Services/user.service';
import { rolesObj } from '../../utils/roles';
import { toastError, toastSuccess } from '../../utils/toastUtils';
import styles from "./selectStyles.module.css"
const Addemployee = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [doj, setDoj] = useState(new Date());
  const [dob, setDob] = useState(new Date());
  const [role, setRole] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [leadId, setLeadId] = useState("");
  const dispatch = useDispatch()
  const [teamLeadsArr, setTeamLeadsArr] = useState([]);
  const employees = useSelector(getAllEmployees)

  const reduxrole = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);

  useEffect(() => {
    handleGetAllEmployees()
  }, [])

  const handleEmployeeCreate = async (e) => {
    e.preventDefault()
    try {
      if (firstName == "") {
        toast.error("First name cannot be empty")
        return
      }
      if (lastName == "") {
        toast.error("Last name cannot be empty")
        return
      }
      if (email == "") {
        toast.error("Email cannot be empty")
        return
      }
      if (phone == "") {
        toast.error("Phone cannot be empty")
        return
      }
      if (`${phone}`.length != 10) {
        toast.error("Phone cannot be less than 10 digits")
        return
      }
      if (emergencyContact == "") {
        toast.error("Emergency Contact cannot be empty")
        return
      }
      if (`${emergencyContact}`.length != 10) {
        toast.error("Emergency Contact cannot be less than 10 digits")
        return
      }
      if (password != confirmPassword) {
        toast.error("Password and confirm password cannot be different")
        return
      }
      if (employeeId == "") {
        toast.error("EmployeeId cannot be empty")
        return
      }
      if (password == "") {
        toast.error("Password cannot be empty")
        return
      }
      if (confirmPassword == "") {
        toast.error("Confirm Password cannot be empty")
        return
      }
      if (role == "") {
        toast.error("Role cannot be empty")
        return
      }
      if (role == rolesObj.SPOKE && leadId == "") {
        toast.error("Team Lead cannot be empty")
        return
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
      }
      if (role == rolesObj.SPOKE) {
        obj.leadId = leadId
      }
      let { data: res } = await addEmployeeToDb(obj)

      if (res.success) {
        // dispatch(addEmployee(obj))
        toastSuccess(res.message)
        console.log(obj)
      }
    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }
  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployess(userObj._id, reduxrole)
      if (res.success) {
        console.log(res, "res")
        dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }
  useEffect(() => {
    if (employees && employees.length > 0) {
      setTeamLeadsArr(employees.filter(el => el.role == rolesObj.TEAMLEAD))
    }
  }, [employees])

  return (
    <>
      {/* Add Employee Modal */}
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">First Name <span className="text-danger">*</span></label>
                      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Last Name</label>
                      <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Email <span className="text-danger">*</span></label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Confirm Password</label>
                      <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" type="password" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Employee ID <span className="text-danger">*</span></label>
                      <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Joining Date <span className="text-danger">*</span></label>
                      <div><input onChange={(e) => setDoj(e.target.value)} className="form-control datetimepicker" type="date" /></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Birth Date <span className="text-danger">*</span></label>
                      <div><input onChange={(e) => setDob(e.target.value)} className="form-control datetimepicker" type="date" /></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Phone </label>
                      <input value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value)} className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Emergency Contact</label>
                      <input value={emergencyContact} maxLength={10} onChange={(e) => setEmergencyContact(e.target.value)} className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label>Role <span className="text-danger">*</span></label>
                      <select value={role} onChange={(e) => { setRole(e.target.value) }} className={styles.selectStyle}>
                        <option value="">Please Select Role</option>
                        <option value={rolesObj.TEAMLEAD}>{rolesObj.TEAMLEAD}</option>
                        <option value={rolesObj.SPOKE}>{rolesObj.SPOKE}</option>
                      </select>
                    </div>
                  </div>

                  {
                    role == rolesObj.SPOKE &&

                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label>Team Lead<span className="text-danger">*</span></label>
                        <select value={leadId} onChange={(e) => { setLeadId(e.target.value) }} className={styles.selectStyle}>
                          <option value="">Please Select Team Lead</option>
                          {
                            teamLeadsArr && teamLeadsArr.length > 0 && teamLeadsArr.map((el, index) => {
                              return (
                                <option value={el._id}>{`${el.firstName} ${el.lastName}`}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                  }
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
                  <button className="btn btn-primary submit-btn" onClick={(e) => handleEmployeeCreate(e)}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Employee Modal */}
    </>
  )
}

export default Addemployee