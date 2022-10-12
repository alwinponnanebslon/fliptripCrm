import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_11,
  Avatar_09,
  Avatar_02,
  Avatar_10,
  Avatar_05,
  Avatar_08,
} from "../../Entryfile/imagepath";
import EditLead from "../../_components/modelbox/EditLead";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAgents,
  getAllEmployees,
  getAllTeamLeadsEmployees,
  returnAllEmployees,
} from "../../redux/features/employee/employeeSlice";
import { getEmployess } from "../../Services/user.service";
import Select from "react-select";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import {
  assignLeadToagent,
  createLead,
  getLeadsByRole,
  updateLeadStatus,
} from "../../Services/lead.service";
import { admin, leadStatus, rolesObj } from "../../utils/roles";
import { tourGet } from '../../redux/features/tour/tourSlice';
const Leads = () => {
  console.log("helloe owlr");
  const agents = useSelector(getAllAgents);
  const teamLeads = useSelector(getAllTeamLeadsEmployees);
  const destinations = useSelector((state) => state.tour.tours);

  const [agentsArr, setAgentsArr] = useState([]);
  const [destinationsArr, setDestinationsArr] = useState([]);
  const [teamLeadsArr, setTeamLeadsArr] = useState([]);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const [displayLeadsArr, setDisplayLeadsArr] = useState([]);
  const [leadsArr, setLeadsArr] = useState([]);
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [agentId, setAgentId] = useState("");
  const [leadId, setLeadId] = useState("");
  const [desctinationId, setDestinationId] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [employeeNameQuery, setEmployeeNameQuery] = useState("");
  const [priorityQuery, setPriorityQuery] = useState("");

  const agentSelect = useRef();
  const teamLeadSelect = useRef();
  const destinationSelect = useRef();

  const [data, setData] = useState([
    {
      id: 1,
      image: Avatar_02,
      name: "John Doe",
      Leadid: "TKT-0001",
      Leadsubject: "Internet Issue",
      createddate: "5 Jan 2019 07:21 AM",
      lastreply: "5 Jan 2019 11.12 AM	",
      priority: "High",
      status: "New",
    },
  ]);
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: isFocused ? "black" : "black",
      backgroundColor: isFocused
        ? isSelected
          ? "rgba(255,155,68,0.5)"
          : "#FF9B44"
        : isSelected
        ? "rgba(255,155,68,0.5)"
        : "white",
      padding: 10,
      zIndex: 5,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "white",
      padding: 6,
      border: "solid 1px rgba(0,0,0,0.2)",
      borderRadius: 5,
    }),
  };

  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployess(userObj?._id, role);
      if (res.success) {
        console.log(res, "res");
        dispatch(returnAllEmployees(res.data));
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const handleGetAllLeads = async () => {
    try {
      let { data: res } = await getLeadsByRole(userObj?._id, role);
      if (res.success) {
        setDisplayLeadsArr(res.data);
        setLeadsArr(res.data);
        // dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    handleGetAllLeads();
    dispatch(tourGet());
  }, []);

  useEffect(() => {
    if (agents && agents.length > 0) {
      let tempArr = agents.map((el) => {
        let obj = {
          label: `${el.firstName} ${el.lastName}`,
          value: el?._id,
          leadId: el?.leadId,
        };
        return obj;
      });
      setAgentsArr([...tempArr]);
    }
  }, [agents]);

  useEffect(() => {

    console.log(destinations,"dfygdsfhdafjdshfdhj")
    if (destinations && destinations.length > 0) {
      let tempArr = destinations.map((el) => {
        let obj = {
          label: `${el.name}`,
          value: el?._id,
          desctinationId : el?.leadId,
        };
        return obj;
      });
      setDestinationsArr([...tempArr]);
    }
  }, [destinations]);

  useEffect(() => {
    if (teamLeads && teamLeads.length > 0) {
      let tempArr = teamLeads.map((el) => {
        let obj = {
          label: `${el.firstName} ${el.lastName}`,
          value: el?._id,
        };
        return obj;
      });
      setTeamLeadsArr([...tempArr]);
    }
  }, [agents]);

  useEffect(() => {
    handleGetAllEmployees();
  }, []);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error)
    };
  };
  const handleFileSelection = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        console.log(result, "result");
        setFileUrl(result);
      });
    }
  };

  const handleFilterWithAgentName = (query) => {
    setEmployeeNameQuery(query);
    let tempArr = leadsArr.filter(
      (el) =>
        `${el?.agentObj?.firstName} ${el?.agentObj?.lastName}`
          .toLowerCase()
          .includes(`${query}`.toLowerCase()) ||
        `${el?.leadObj?.firstName} ${el?.leadObj?.lastName}`
          .toLowerCase()
          .includes(`${query}`.toLowerCase())
    );
    setDisplayLeadsArr([...tempArr]);
  };

  const handleFilterByPriority = (query) => {
    setPriorityQuery(query.value);
    if (query.value != "") {
      let tempArr = leadsArr.filter(
        (el) =>
          `${el?.priority}`.toLowerCase() == `${query.value}`.toLowerCase()
      );
      setDisplayLeadsArr([...tempArr]);
    } else {
      setDisplayLeadsArr([...leadsArr]);
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    try {
      if (subject == "") {
        toastError("Subject cannot be empty");
        return;
      }
      if (`${phone}` == "") {
        toastError("Phone cannot be empty");
        return;
      }
      if (`${phone}`.length != 10) {
        toastError("Phone must be 10 digits long");
        return;
      }
      // if (`${agentId}` == "") {
      //   toastError("Agent cannot be empty");
      //   return
      // }
      if (`${description}` == "") {
        toastError("Description cannot be empty");
        return;
      }
      let obj = {
        subject,
        phone,
        description,
        fileUrl,
        priority,
      };

      if (agentId != "" && leadId == "") {
        obj.agentId = agentId;
      }
      if (leadId != "" && agentId == "") {
        obj.leadId = leadId;
      }
      if (leadId != "" && agentId != "") {
        obj.leadId = leadId;
      } else if (role == rolesObj.TEAMLEAD) {
        obj.leadId = userObj?._id;
      }

      let { data: res } = await createLead(obj, role);
      if (res.success) {
        toastSuccess(res.message);
        handleGetAllLeads();
      }
    } catch (err) {
      toastError(err);
      console.error(err);
    }
  };

  const handleAssignLeadToAgent = async () => {
    try {
      if (agentId == "") {
        toastError("Please Select an agent to proceed");
        return;
      }
      if (selectedLeadId == "") {
        toastError("Lead not selected");
        return;
      }
      console.log(leadId);
      let obj = {
        agentId: agentId,
      };
      let { data: res } = await assignLeadToagent(selectedLeadId, obj);
      if (res.success) {
        handleGetAllLeads();
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const handleLeadStatusUpdate = async (id, value) => {
    try {
      let obj = {
        status: value,
      };
      let { data: res } = await updateLeadStatus(id, obj);
      if (res.success) {
        handleGetAllLeads();
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const handlePriorityChange = (e) => {
    setPriority(e.value);
  };

  const handleAgentChange = (e) => {
    setLeadId("");
    setAgentId(e.value);
  };

  const handleDestinationChange = (e) => {
    setLeadId("");
    setAgentId("");
    setDestinationId(e.value);
  };

  const handleTeamLeadChange = (e) => {
    setLeadId(e.value);
    setAgentId("");
  };

  const options = [
    {
      label: "Select Priority",
      value: "",
    },
    {
      label: "High",
      value: "High",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "Low",
      value: "Low",
    },
  ];

  const handleReturndropDown = (record) => {
    console.log(role, "role");
    console.log(record?.status, "role");
    // console.log(role == "ADMIN" || role == rolesObj.SPOKE && record?.status == leadStatus.closed, "role != ADMIN || role == rolesObj.SPOKE && record?.status != leadStatus.closed")
    if (role == "ADMIN") {
      return (
        <>
          <div>
            {record?.status == leadStatus.on_Hold ||
            record?.status == leadStatus.cancelled ? (
              <i className="fa fa-dot-circle-o text-danger" />
            ) : record?.status == leadStatus.open ||
              record?.status == leadStatus.reopened ? (
              <i className="fa fa-dot-circle-o text-info" />
            ) : (
              <i className="fa fa-dot-circle-o text-success" />
            )}
            {record?.status}
          </div>
        </>
      );
    } else if (role == rolesObj.SPOKE && record?.status == leadStatus.closed) {
      return (
        <>
          <div>
            {record?.status == leadStatus.on_Hold ||
            record?.status == leadStatus.cancelled ? (
              <i className="fa fa-dot-circle-o text-danger" />
            ) : record?.status == leadStatus.open ||
              record?.status == leadStatus.reopened ? (
              <i className="fa fa-dot-circle-o text-info" />
            ) : record?.status == leadStatus.closedBySpoke ? (
              <i className="fa fa-dot-circle-o text-warning" />
            ) : (
              <i className="fa fa-dot-circle-o text-success" />
            )}
            {record?.status}
          </div>
        </>
      );
    } else if (
      role == rolesObj.SPOKE &&
      record?.status == leadStatus.closedBySpoke
    ) {
      return (
        <>
          <div>
            {record?.status == leadStatus.on_Hold ||
            record?.status == leadStatus.cancelled ? (
              <i className="fa fa-dot-circle-o text-danger" />
            ) : record?.status == leadStatus.open ||
              record?.status == leadStatus.reopened ? (
              <i className="fa fa-dot-circle-o text-info" />
            ) : record?.status == leadStatus.closedBySpoke ? (
              <i className="fa fa-dot-circle-o text-warning" />
            ) : (
              <i className="fa fa-dot-circle-o text-success" />
            )}
            {record?.status}
          </div>
        </>
      );
    } else {
      return (
        <>
          <a
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {record?.status == leadStatus.open ||
            record?.status == leadStatus.reopened ? (
              <i className="fa fa-dot-circle-o text-info" />
            ) : record?.status == leadStatus.on_Hold ||
              record?.status == leadStatus.cancelled ? (
              <i className="fa fa-dot-circle-o text-danger" />
            ) : record?.status == leadStatus.closedBySpoke ? (
              <i className="fa fa-dot-circle-o text-warning" />
            ) : (
              <i className="fa fa-dot-circle-o text-success" />
            )}
            {record?.status}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(record?._id, leadStatus.open)
              }
            >
              <i className="fa fa-dot-circle-o text-info" /> Open
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(record?._id, leadStatus.reopened)
              }
            >
              <i className="fa fa-dot-circle-o text-info" /> Reopened
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(record?._id, leadStatus.on_Hold)
              }
            >
              <i className="fa fa-dot-circle-o text-danger" /> On Hold
            </a>
            {role == rolesObj.TEAMLEAD ? (
              <a
                className="dropdown-item"
                onClick={() =>
                  handleLeadStatusUpdate(record?._id, leadStatus.closed)
                }
              >
                <i className="fa fa-dot-circle-o text-success" /> Closed
              </a>
            ) : (
              <a
                className="dropdown-item"
                onClick={() =>
                  handleLeadStatusUpdate(record?._id, leadStatus.closedBySpoke)
                }
              >
                <i className="fa fa-dot-circle-o text-warning" /> Closed By
                Spoke
              </a>
            )}
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(record?._id, leadStatus.in_Progress)
              }
            >
              <i className="fa fa-dot-circle-o text-success" /> In Progress
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(record?._id, leadStatus.cancelled)
              }
            >
              <i className="fa fa-dot-circle-o text-danger" /> Cancelled
            </a>
          </div>
        </>
      );
    }
  };

  const columns = [
    {
      title: "Lead Subject",
      dataIndex: "subject",
    },
    // {
    //   title: 'Lead Id',
    //   dataIndex: 'Leadid',
    //   render: (text, record) => (
    //     <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/employees/Lead-view">#TKT-0001</Link>
    //   ),
    //   sorter: (a, b) => a.Leadid.length - b.Leadid.length,
    // },
    {
      title: "Assigned Spoke",
      render: (text, record) => (
        <h2 className="table-avatar">
          {record.agentObj ? (
            <>
              <Link
                to={`/app/profile/employee-profile/${record?.agentObj?._id}`}
                className="avatar"
              >
                <img alt="" src={record?.image} />
              </Link>
              <Link
                to={`/app/profile/employee-profile/${record?.agentObj?._id}`}
              >{`${
                record?.agentObj?.firstName ? record?.agentObj?.firstName : "NA"
              } ${
                record?.agentObj?.lastName ? record?.agentObj?.lastName : ""
              }`}</Link>
            </>
          ) : (
            <>
              <div
                onClick={() => setSelectedLeadId(record._id)}
                className="avatar"
              >
                <img
                  alt=""
                  onClick={() => setSelectedLeadId(record._id)}
                  src={record?.image}
                />
              </div>
              <div
                data-bs-toggle="modal"
                onClick={() => setSelectedLeadId(record._id)}
                data-bs-target="#update_agent"
              >
                NA
              </div>
              {/* update_agent */}
            </>
          )}
        </h2>
      ),
    },
    {
      title: "Assigned Team Lead",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link
            to={`/app/profile/employee-profile/${record?.leadObj?._id}`}
            className="avatar"
          >
            <img alt="" src={record?.image} />
          </Link>
          <Link
            to={`/app/profile/employee-profile/${record?.leadObj?._id}`}
          >{`${record?.leadObj?.firstName} ${record?.leadObj?.lastName}`}</Link>
        </h2>
      ),
    },
    {
      title: "Created Date",
      render: (text, record) => (
        <h2 className="table-avatar">
          {new Date(record?.createdAt).toDateString()}
        </h2>
      ),
    },
    // {
    //   title: 'Last Reply',
    //   dataIndex: 'lastreply',
    //   sorter: (a, b) => a.lastreply.length - b.lastreply.length,
    // },
    {
      title: "Priority",
      render: (text, record) => (
        <div className="dropdown action-label">{record?.priority}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="dropdown action-label text-center">
          {handleReturndropDown(record)}
        </div>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
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
            <Link  className="dropdown-item" to={`/admin/lead/${record._id}`} > <i className="fa fa-pencil m-r-5" /> View</Link>
        
            <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_Lead"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_Lead"
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Leads - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Leads</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Leads</li>
              </ul>
            </div>
            {role != rolesObj.SPOKE && (
              <div className="col-auto float-end ml-auto">
                <a
                  href="#"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#add_Lead"
                >
                  <i className="fa fa-plus" /> Add Lead
                </a>
              </div>
            )}
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="card-group m-b-30">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">New Leads</span>
                    </div>
                    <div>
                      <span className="text-success">+10%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">{leadsArr.length}</h3>
                  <div className="progress mb-2" style={{ height: "5px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Solved Leads</span>
                    </div>
                    <div>
                      <span className="text-success">+12.5%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">{leadsArr.length}</h3>
                  <div className="progress mb-2" style={{ height: "5px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Open Leads</span>
                    </div>
                    <div>
                      <span className="text-danger">-2.8%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">{leadsArr.length}</h3>
                  <div className="progress mb-2" style={{ height: "5px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Pending Leads</span>
                    </div>
                    <div>
                      <span className="text-danger">-75%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">{leadsArr.length}</h3>
                  <div className="progress mb-2" style={{ height: "5px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Search Filter */}
        <div className="row filter-row">
          {role != admin && (
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <input
                  value={employeeNameQuery}
                  onChange={(e) => {
                    handleFilterWithAgentName(e.target.value);
                  }}
                  type="text"
                  className="form-control floating"
                />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
          )}
          {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option> -- Select -- </option>
                <option> Pending </option>
                <option> Approved </option>
                <option> Returned </option>
              </select>
              <label className="focus-label">Status</label>
            </div>
          </div> */}
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <Select
                onChange={handleFilterByPriority}
                menuPortalTarget={document.body}
                styles={customStyles}
                options={options}
              />
              {/* handleFilterByPriority */}
              {/* <select className="select floating">
                <option> -- Select -- </option>
                <option> High </option>
                <option> Low </option>
                <option> Medium </option>
              </select> */}
              <label className="focus-label">Priority</label>
            </div>
          </div>
          {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <div>
                <input className="form-control floating datetimepicker" type="date" />
              </div>
              <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <div>
                <input className="form-control floating datetimepicker" type="date" />
              </div>
              <label className="focus-label">To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <a href="#" className="btn btn-success btn-block w-100"> Search </a>
          </div> */}
        </div>
        {/* /Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: displayLeadsArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={displayLeadsArr}
                rowKey={(record, index) => index}
                onChange={console.log("change")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Lead Modal */}
      <div id="add_Lead" className="modal custom-modal" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Lead</h5>
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
              <form className="row"> 
                     
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Lead Subject</label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type={"tel"}
                        maxLength={10}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                      <div className="form-group">
                        <label>Destination ({destinationsArr.length})</label>
                        <Select
                          ref={destinationSelect}
                          onChange={handleDestinationChange}
                          options={destinationsArr}
                        />
                      </div>
                  </div>
             
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Client</label>
                      <select className="select">
                        <option>-</option>
                        <option>Delta Infotech</option>
                        <option>International Software Inc</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Priority</label>
                      <Select
                        onChange={handlePriorityChange}
                        options={options}
                      />
                    </div>
                  </div>
             
             
                 
                    {role != rolesObj.TEAMLEAD && (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Assign to Team Lead ({agentsArr.length})
                          </label>
                          <Select
                            ref={teamLeadSelect}
                            // defaultInputValue={{ value: leadId }}
                            onChange={handleTeamLeadChange}
                            options={teamLeadsArr}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Assign to Spoke ({agentsArr.length})</label>
                        <Select
                          ref={agentSelect}
                          onChange={handleAgentChange}
                          options={agentsArr}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Files</label>
                      <input
                        onChange={(e) => handleFileSelection(e)}
                        className="form-control"
                        type="file"
                      />
                    </div>
                 
        
                <div className="submit-section">
                  <button
                    data-bs-toggle="modal"
                    onClick={(e) => handleSubmitLead(e)}
                    className="btn btn-primary submit-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Lead Modal */}
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

      {/* Update Agent Modal */}
      <div className="modal custom-modal fade" id="update_agent" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Update Agent</h3>
                <p>Please Select a Spoke to assign !</p>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Assign to Spoke ({agentsArr.length})</label>
                  <Select
                    ref={agentSelect}
                    onChange={handleAgentChange}
                    options={agentsArr}
                  />
                </div>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      onClick={() => handleAssignLeadToAgent()}
                      className="btn btn-primary continue-btn"
                    >
                      Assign
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
      {/* Update Agent Modal */}
    </div>
  );
};

export default Leads;
