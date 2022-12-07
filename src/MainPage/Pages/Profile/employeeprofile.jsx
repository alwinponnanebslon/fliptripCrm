/**
 * TermsCondition Page
 */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
} from "../../../Entryfile/imagepath";
import {
  serCurrentEmployee,
  getEmployeeById, userUpdateObj
} from "../../../redux/features/employee/employeeSlice";
import { rolesObj } from "../../../utils/roles";
import { getEmployesById, updateEmployee } from "../../../Services/user.service";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toastError, toastSuccess } from "../../../utils/toastUtils";

const EmployeeProfile = () => {
  const employeeObj = useSelector((state) => state.employee.employeeObj);
  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const params = useParams();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [phone, setPhone] = useState("")
  const [show, setShow] = useState(false)
  const [prevDocId, setPrevDocId] = useState("")
  // console.log(params,"sdfparerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

  const dispatch = useDispatch();

  const handleGetEmployee = () => {
    dispatch(getEmployeeById(params.id));
  };
  // console.log(params, "oarams3")

  useEffect(() => {
    // console.log(employeeObj, "234567890-")
    if (employeeObj && employeeObj._id) {

      setFirstName(employeeObj?.firstName)
      setLastName(employeeObj?.lastName)
      setDob(employeeObj?.dob)
      setPrevDocId(employeeObj?._id)
      // setAddress(employeeObj?.address)
      // setPinCode(employeeObj?.pinCode)
      setPhone(employeeObj?.phone)
    }

  }, [employeeObj])
  useEffect(() => {
    // console.log("sdfparerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    handleGetAllEmployees();
    handleGetEmployee();
  }, [params]);

  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployesById(params.id);
      if (res.success) {
        // console.log(res, "res");
        dispatch(serCurrentEmployee(res.data));
      }
    } catch (error) {
      // console.error(error);
      // toastError(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    let obj = {
      firstName,
      lastName,
      dob,
      phone,
      prevDocId
    }

    // dispatch(userUpdateObj(obj))
    let update = await updateEmployee(prevDocId, obj)
    if (update.data) {
      toastSuccess(update.data.message)
      setShow(false)
      handleGetAllEmployees();
    }
  }
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Employee Profile - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="card mb-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#">
                        <img alt="" src={Avatar_02} />
                      </a>
                    </div>
                  </div>
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 mb-0">
                            {employeeObj?.firstName} {employeeObj?.lastName}
                          </h3>
                          <h6 className="text-muted">{employeeObj?.role}</h6>
                          {/* <small className="text-muted">Web Designer</small> */}
                          <div className="staff-id">
                            Employee ID : {employeeObj?.employeeId}
                          </div>
                          <div className="small doj text-muted">
                            Date of Join :{" "}
                            {new Date(employeeObj?.doj).toDateString()}
                          </div>
                          {/* <div className="staff-msg"><Link onClick={() => localStorage.setItem("minheight", "true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <div className="title">Phone:</div>
                            <div className="text">
                              <a href="#">{employeeObj?.phone}</a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Email:</div>
                            <div className="text">
                              <a href="">{employeeObj?.email}</a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Birthday:</div>
                            <div className="text">
                              {new Date(employeeObj?.dob).toDateString()}
                            </div>
                          </li>
                          {/* { employeeObj?.address} */}
                          {/* <li>
                            <div className="title">Address:</div>
                            <div className="text">
                              1861 Bayonne Ave, Manchester Township, NJ, 08759
                            </div>
                          </li> */}
                          {/* {console.log(employeeObj, "employeeObj32")} */}
                          {employeeObj?.role == rolesObj.SPOC && (
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                {employeeObj?.leadObj?.firstName}{" "}
                                {employeeObj?.leadObj?.lastName}
                              </div>
                            </li>
                          )}
                          {/* <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  <div className="avatar avatar-xs">
                                    <img src={Avatar_16} alt="" />
                                  </div>
                                </div>
                                <Link
                                  to={`/admin/employee-profile/${employeeObj?.leadId}`}
                                >
                                  {employeeObj?.leadObj?.firstName}{" "}
                                  {employeeObj?.leadObj?.lastName}
                                </Link>
                              </div>
                            </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="pro-edit">
                    <a
                      data-bs-target="#profile_info"
                      // data-bs-toggle="modal"
                      // className="edit-icon"
                      href="#"
                      onClick={() => { setShow(true) }}
                    >
                      <i className="fa fa-pencil" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card tab-box">
          <div className="row user-tabs">
            <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul className="nav nav-tabs nav-tabs-bottom">
                <li className="nav-item">
                  <a
                    href="#emp_profile"
                    data-bs-toggle="tab"
                    className="nav-link active"
                  >
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#emp_projects"
                    data-bs-toggle="tab"
                    className="nav-link"
                  >
                    Projects
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#bank_statutory"
                    data-bs-toggle="tab"
                    className="nav-link"
                  >
                    Bank &amp; Statutory{" "}
                    <small className="text-danger">(Admin Only)</small>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      {/* /Page Content */}
      {/* Profile Modal */}
      <div id="profile_info" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile Information</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {/* <div className="modal-body"> */}
            <Modal size="lg" show={show}>
              <Modal.Header>
                {/* <Modal.Title>{isUpdateTour ? "Edit" : "Add"} Quote</Modal.Title> */}
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      {/* <div className="profile-img-wrap edit-img">
                      <img
                        className="inline-block"
                        src={Avatar_02}
                        alt="user"
                      />
                      <div className="fileupload btn">
                        <span className="btn-text">edit</span>
                        <input className="upload" type="file" />
                      </div>
                    </div> */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              // defaultValue="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Birth Date</label>
                            <div className="col-sm-8">
                              <input
                                type="date"
                                className="form-control"
                                // name="startDate"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                              />
                            </div>

                            {/* <div>
                            <input
                              className="form-control datetimepicker"
                              type="date"
                              // defaultValue="05/06/1985"
                            />
                          </div> */}
                          </div>
                        </div>
                        {/* <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender</label>
                          <select className="select form-control">
                            <option value="male selected">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div> */}
                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        // defaultValue="New York"
                      />
                    </div>
                  </div> */}
                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="United States"
                      />
                    </div>
                  </div> */}
                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>Pin Code</label>
                      <input
                        type="number"
                        className="form-control"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>
                  </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          maxLength={10}
                          type="text"
                          className="form-control"
                          // defaultValue="631-889-3206"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Department <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select Department</option>
                        <option>Web Development</option>
                        <option>IT Management</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                  </div> */}
                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Designation <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select Designation</option>
                        {/* <option>Web Designer</option> 
                        <option>Web Developer</option>
                        <option>Android Developer</option>
                      </select>
                    </div>
                  </div> */}
                    {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Reports To <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>-</option>
                        <option>Wilmer Deluna</option>
                        <option>Lesley Grauer</option>
                        <option>Jeffery Lalor</option>
                      </select>
                    </div>
                  </div> */}
                  </div>
                  {/* <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div> */}
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                    // clearFunc();
                  }}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                  {/* {isUpdateTour ? "Edit" : "Add"} Quote */}
                  update
                </Button>
              </Modal.Footer>
            </Modal>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* /Profile Modal */}
      {/* Personal Info Modal */}
      <div
        id="personal_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Passport No</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Passport Expiry Date</label>
                      <div>
                        <input
                          className="form-control datetimepicker"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tel</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Nationality <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Religion</label>
                      <div>
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Marital status <span className="text-danger">*</span>
                      </label>
                      <select className="select form-control">
                        <option>-</option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Employment of spouse</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>No. of children </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Personal Info Modal */}
      {/* Family Info Modal */}
      <div
        id="family_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Family Informations</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Family Member{" "}
                        <a href="" className="delete-icon">
                          <i className="fa fa-trash-o" />
                        </a>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Name <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Relationship{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Date of birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Informations{" "}
                        <a href="" className="delete-icon">
                          <i className="fa fa-trash-o" />
                        </a>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Name <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Relationship{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Date of birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href="">
                          <i className="fa fa-plus-circle" /> Add More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Family Info Modal */}
      {/* Emergency Contact Modal */}
      <div
        id="emergency_contact_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Emergency Contact Modal */}
      {/* Education Modal */}
      <div
        id="education_info"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Education Informations</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Informations{" "}
                        <a href="" className="delete-icon">
                          <i className="fa fa-trash-o" />
                        </a>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="Oxford University"
                              className="form-control floating"
                            />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input
                                type="date"
                                defaultValue="01/06/2002"
                                className="form-control floating datetimepicker"
                              />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input
                                type="date"
                                defaultValue="31/05/2006"
                                className="form-control floating datetimepicker"
                              />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="BE Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="Grade A"
                              className="form-control floating"
                            />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Informations{" "}
                        <a href="" className="delete-icon">
                          <i className="fa fa-trash-o" />
                        </a>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="Oxford University"
                              className="form-control floating"
                            />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input
                                type="date"
                                defaultValue="01/06/2002"
                                className="form-control floating datetimepicker"
                              />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input
                                type="date"
                                defaultValue="31/05/2006"
                                className="form-control floating datetimepicker"
                              />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="BE Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input
                              type="text"
                              defaultValue="Grade A"
                              className="form-control floating"
                            />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href="">
                          <i className="fa fa-plus-circle" /> Add More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Education Modal */}
      {/* Experience Modal */}
      <div
        id="experience_info"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Experience Informations</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience Informations{" "}
                        <a href="" className="delete-icon">
                          <i className="fa fa-trash-o" />
                        </a>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Digital Devlopment Inc"
                            />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="United States"
                            />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Web Developer"
                            />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input
                                type="date"
                                className="form-control floating datetimepicker"
                                defaultValue="01/07/2007"
                              />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input
                                type="date"
                                className="form-control floating datetimepicker"
                                defaultValue="08/06/2018"
                              />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience Informations{" "}
                        <a href="" className="delete-icon">
                          <i className="fa fa-trash-o" />
                        </a>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Digital Devlopment Inc"
                            />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="United States"
                            />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Web Developer"
                            />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input
                                type="date"
                                className="form-control floating datetimepicker"
                                defaultValue="01/07/2007"
                              />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input
                                type="date"
                                className="form-control floating datetimepicker"
                                defaultValue="08/06/2018"
                              />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href="">
                          <i className="fa fa-plus-circle" /> Add More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Experience Modal */}
    </div>
  );
};
export default EmployeeProfile;
