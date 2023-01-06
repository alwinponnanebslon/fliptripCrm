import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import {
  Avatar_11,
  Avatar_08,
  Avatar_09,
  Avatar_02,
  Avatar_10,
  Avatar_05,

} from "../../Entryfile/imagepath";
import EditLead from "../../_components/modelbox/EditLead";
import { leadGetById } from "../../redux/features/lead/leadSlice";
import { handleCheckCostingSheetExist } from "../../Services/costingSheet.services";
import { useDispatch, useSelector } from "react-redux";
import { generateFilePath } from "../../utils/FileURL";
import Notes from "../Lead/Notes/Notes";
import Quotation from "./Quotation/Quotation";
import moment from "moment";


const LeadView = () => {
  const dispatch = useDispatch();
  const { leadId } = useParams();
  const params = useLocation();
  const currentLead = useSelector((state) => state.lead.lead);





  const [leadObj, setLeadObj] = useState(null);
  const role = useSelector((state) => state.auth.role);
  const [show, setShow] = useState(false);


  useEffect(() => {
    // console.log(currentLead, "123currentLead");
    setLeadObj(currentLead);
  }, [currentLead]);



  const handleCheckCostingSheet = async () => {
    let check = await handleCheckCostingSheetExist(leadId);
  };



  useEffect(() => {
    dispatch(leadGetById(leadId));
    handleCheckCostingSheet();
    // handleCheckCostingSheetExist(leadId);
  }, []);

  useEffect(() => {}, [currentLead]);


  useEffect(() => {
    // console.log(params.search.includes("true"), "params.search.include");
    // console.log(params, "params.search.include");
    if (params.search.includes("true")) {
      // console.log(true, "rewe");
      // setIsReadyOnlyNotes(true);
      setShow(true);
    }
  }, []);


  useEffect(() => {
    let firstload = localStorage.getItem("minheight");
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1);
        localStorage.removeItem("minheight");
      }, 1000);
    }
  });

  
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Leads - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>





      <div id="view_Lead1" className="chat-main-row" >
        {/* <div id="view_Lead1" className="modal custom-modal fade" role="dialog"> */}
        <div className="chat-main-wrapper">
          <div className="col-lg-8 message-view task-view">
            <div className="chat-window">
              <div className="fixed-header">
                <div className="navbar">
                  <div className="float-start Lead-view-details">
                    <div className="Lead-header">
                      <span>Status: </span>{" "}
                      <span className="badge badge-warning">
                        {leadObj?.status}
                      </span>
                      <span className="m-l-15 text-muted">Client: </span>
                      <a href="#">
                        {leadObj?.clientObj?.name}
                        <span className="m-l-15 text-muted">Phone Number: </span>
                        {leadObj?.clientObj?.phone}
                      </a>
                      <span className="m-l-15 text-muted">Created: </span>
                       {/* <span>{new Date(leadObj?.createdAt).toDateString()}</span> */}
                       <span> {moment(leadObj?.createdAt).format("DD/MM/YYYY")}</span>

                      <span className="m-l-15 text-muted">Created by:</span>
                      <span>
                        <Link to="/app/profile/employee-profile">
                          {leadObj?.createdBy.name?leadObj?.createdBy.name:"" + 
                            " [ " +
                            leadObj?.createdBy?.role +
                            " ]"}

                          {/* {leadObj?.createdBy?.lastName} */}
                          {/* {!leadObj?.createdBy?.lastName &&
                            !leadObj?.createdBy?.firstName &&
                            "ADMIN"} */}
                          {/* {!leadObj?.createdBy?.name && "ADMIN"} */}
                        </Link>
                      </span>
                      {/* <span> Phone : </span> */}
                    </div>
                  </div>
                  <a
                    className="task-chat profile-rightbar float-end"
                    id="task_chat"
                    href="#task_window"
                  >
                    <i className="fa fa fa-comment" />
                  </a>
                </div>
              </div>
              <div className="chat-contents">
                <div className="chat-content-wrap">
                  <div className="chat-wrap-inner">
                    <div className="chat-box">
                      <div className="task-wrapper">
                        <div className="card">
                          <div className="card-body">
                            <div className="project-title">
                              <div className="m-b-20">
                                <span className="h5 card-title ">
                                  {leadObj?.subject}
                                </span>

                                {/* {console.log(leadObj, "lad")} */}
                                <div className="float-end Lead-priority">
                                  <span>Priority: {leadObj?.priority}</span>

                                  {/* <div className="btn-group">
                                    <a href="#" className="badge badge-danger dropdown-toggle" data-bs-toggle="dropdown">Highest </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Highest priority</a>
                                      <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-info" /> High priority</a>
                                      <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-primary" /> Normal priority</a>
                                      <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Low priority</a>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <p>{leadObj?.description}</p>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title m-b-20">
                              Uploaded image files
                            </h5>
                            <div className="row">
                              <div className="col-md-3 col-sm-6">
                                <div className="uploaded-box">
                                  {leadObj?.fileUrl != "" &&
                                    leadObj?.fileUrl && (
                                      <div className="uploaded-img">
                                        <img
                                          src={generateFilePath(
                                            leadObj?.fileUrl
                                          )}
                                          className="img-fluid"
                                          alt=""
                                        />
                                      </div>
                                    )}
                                  <div className="uploaded-img-name">
                                    {leadObj?.fileUrl != ""
                                      ? leadObj?.fileUrl
                                      : "NA"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="card mb-0">
                          <div className="card-body">
                            <h5 className="card-title m-b-20">Uploaded files</h5>
                            <ul className="files-list">
                              <li>
                                <div className="files-cont">
                                  <div className="file-type">
                                    <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                                  </div>
                                  <div className="files-info">
                                    <span className="file-name text-ellipsis"><a href="#">Lead_document.xls</a></span>
                                    <span className="file-author"><a href="#">John Doe</a></span> <span className="file-date">May 5th at 8:21 PM</span>
                                    <div className="file-size">Size: 14.8Mb</div>
                                  </div>
                                  <ul className="files-action">
                                    <li className="dropdown dropdown-action">
                                      <a className="dropdown-toggle btn btn-link" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#">Download</a>
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                                        <a className="dropdown-item" href="#">Delete</a>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <div className="files-cont">
                                  <div className="file-type">
                                    <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                                  </div>
                                  <div className="files-info">
                                    <span className="file-name text-ellipsis"><a href="#">Issue_report.xls</a></span>
                                    <span className="file-author"><a href="#">John Doe</a></span> <span className="file-date">May 5th at 5:41 PM</span>
                                    <div className="file-size">Size: 14.8Mb</div>
                                  </div>
                                  <ul className="files-action">
                                    <li className="dropdown dropdown-action">
                                      <a href className="dropdown-toggle btn btn-link" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#">Download</a>
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                                        <a className="dropdown-item" href="#">Delete</a>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div> */}
                      </div>
                      <div className="notification-popup hide">
                        <p>
                          <span className="task" />
                          <span className="notification-text" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 message-view task-chat-view Lead-chat-view"
            id="task_window"
          >
            <div className="chat-window">
              <div className="fixed-header">
                <div className="navbar">
                  <div className="task-assign">
                    <span className="assign-title">Assigned to Admin</span>
                    {/* <a href="#" data-bs-toggle="tooltip" data-placement="bottom" title="John Doe" className="avatar">
                      <img src={Avatar_02} alt="" />
                    </a> */}
                    {/* <a href="#" className="followers-add" title="Add Assignee" data-bs-toggle="modal" data-bs-target="#assignee"><i className="material-icons">add</i></a> */}
                  </div>
                  {/* <ul className="nav float-end custom-menu">
                    <li className="nav-item dropdown dropdown-action">
                      <a href className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_Lead">Edit Lead</a>
                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_Lead">Delete Lead</a>
                      </div>
                    </li>
                  </ul> */}
                </div>
              </div>
              <div className="chat-contents task-chat-contents">
                <div className="chat-content-wrap">
                  <div className="chat-wrap-inner">
                    <div className="chat-box">
                      <div className="chats">
                        {leadObj?.spocObj ? (
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <div className="avatar">
                                <img src={Avatar_02} alt="" />
                              </div>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <span className="task-chat-user">
                                    Spoc : {leadObj?.spocObj?.firstName + " "}
                                    {leadObj?.spocObj?.lastName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <div className="avatar">
                                <img src={Avatar_02} alt="" />
                              </div>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <span className="task-chat-user">
                                    Spoc : NA
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {leadObj?.agentObj ? (
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <div className="avatar">
                                <img src={Avatar_02} alt="" />
                              </div>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <span className="task-chat-user">
                                    Team Lead :
                                    {leadObj?.TeamLeaderOBJECT?.firstName + " "}
                                    {" " + leadObj?.TeamLeaderOBJECT?.lastName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <div className="avatar">
                                <img src={Avatar_02} alt="" />
                              </div>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <span className="task-chat-user">
                                    Team Lead : NA
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Edit Lead Modal */}
      <EditLead />
      {/* /Edit Lead Modal */}
      {/* Delete Lead Modal */}
      <div className="modal custom-modal fade" id="delete_Lead" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Lead</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Lead Modal */}
      {/* Assignee Modal */}
      <div id="assignee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign to this task</h5>
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
              <div className="input-group m-b-30">
                <input
                  placeholder="Search to add"
                  className="form-control search-input"
                  type="text"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
              </div>
              <div>
                <ul className="chat-user-list">

                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img src={Avatar_10} alt="" />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Jeffery Lalor</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Assign</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Assignee Modal */}
      {/* Task Followers Modal */}
      <div
        id="task_followers"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add followers to this task</h5>
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
              <div className="input-group m-b-30">
                <input
                  placeholder="Search to add"
                  className="form-control search-input"
                  type="text"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
              </div>
              <div>
                <ul className="chat-user-list">
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img src={Avatar_11} alt="" />
                        </span>
                        <div className="media-body media-middle text-nowrap">
                          <div className="user-name">Wilmer Deluna</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">
                  Add to Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        <Notes show1={show} setShow1={setShow} />
      </div>
    </div>
  );
};

export default LeadView;
