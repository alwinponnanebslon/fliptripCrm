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
  updatelead,
  getAllLead,
  getLeadFilterByDate,
} from "../../Services/lead.service";
import { admin, leadStatus, rolesObj } from "../../utils/roles";
import { tourGet } from "../../redux/features/tour/tourSlice";
import { clientGet, setObj } from "../../redux/features/client/clientSlice";
import LeadView from "./LeadView";
import LeadDetails from "./LeadDetails";
import { date } from "yup";
import { shouldForwardProp } from "@mui/system";

const Leads = () => {
  const dispatch = useDispatch();
  const agents = useSelector(getAllAgents); //spoke
  const teamLeads = useSelector(getAllTeamLeadsEmployees); //teamlead
  // // console.log(agents, "12agents");
  // // console.log(teamLeads, "12ateamLeads");
  const destinations = useSelector((state) => state.tour.tours);
  // const clients = useSelector((state) => state.client.clientArr);
  // const [clientObj, setClientObj] = useState({ id: "", name: "" })
  const [clientId, setClientId] = useState("");
  const [leadObj, setLeadObj] = useState({});
  const [leadUpdateId, setLeadUpdateId] = useState("");

  const [agentsArr, setAgentsArr] = useState([]);
  const [teamLeadsArr, setTeamLeadsArr] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const userAuthorise = useSelector((state) => state.auth);
  // console.log(userAuthorise, "role223");
  const userObj = useSelector((state) => state.auth.user);
  const [displayLeadsArr, setDisplayLeadsArr] = useState([]);
  const [leadsArr, setLeadsArr] = useState([]);
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [agentId, setAgentId] = useState("");
  let [leadId, setLeadId] = useState("");
  const [spokeId, setSpokeId] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [priority, setPriority] = useState("");

  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [employeeNameQuery, setEmployeeNameQuery] = useState("");
  const [priorityQuery, setPriorityQuery] = useState("");
  const [roleQuery, setRoleQuery] = useState("");
  ///////////////////////////////////////////
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const agentSelect = useRef();

  // // console.log(role, "role23");
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
        // console.log(res, "res");
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
      console.log(res, "Res12");
      if (res.success) {
        let tempArr = res.data;
        console.log(userAuthorise, "1te");
        // console.log(tempArr, "1tempArr2");
        if (userAuthorise.role == "SPOKE") {
          let temp = tempArr.filter(
            (el) =>
              `${el.agentId}` == `${userAuthorise?.user?._id}` ||
              `${el.spokeId}` == `${userAuthorise?.user?._id}`
          );

          setDisplayLeadsArr(temp);
          setLeadsArr(temp);
        } else if (userAuthorise.role == "TEAMLEAD") {
          let temp = tempArr.filter(
            (el) =>
              el.agentId == userAuthorise?.user?._id ||
              el.leadId == userAuthorise?.user?._id
          );
          // console.log(temp, "123temp23");
          setDisplayLeadsArr(temp);
          setLeadsArr(temp);
        } else {
          setDisplayLeadsArr(res.data);
          setLeadsArr(res.data);
        }
        // let temp = tempArr.filter((el) => {
        //   el?.agent;
        // });
        // setLeadsArr(res.data);
        // dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      // console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    handleGetAllLeads();
    // dispatch(clientGet());
  }, []);

  const handleEdit = (lead) => {
    if (lead) {
      setLeadObj(lead);
      setLeadUpdateId(lead._id);
    } else {
      setLeadObj({});
      setLeadUpdateId("");
    }
  };

  const handleDelete = (lead) => {
    if (lead) {
      setLeadObj(lead);
    } else {
      setLeadObj({});
    }
  };

  useEffect(() => {
    if (leadUpdateId) {
      setSubject(leadObj.subject);
      // setClientId(leadObj?.clientObj?._id);
      setPhone(leadObj.phone);
      setName(leadObj.phone);
      setEmail(leadObj?.clientObj?.email);
      setName(leadObj?.clientObj?.name);
      setPriority(leadObj.priority);
      setAgentId(leadObj.agentId);
      setLeadId(leadObj.leadId);
      setSpokeId(leadObj.spokeId);
      setDescription(leadObj.description);
    } else {
      setSubject("");
      setClientId("");
      setPhone("");
      setName("");
      setEmail("");
      setPriority("");
      setAgentId("");
      setSpokeId("");
      setDescription("");
    }
  }, [leadUpdateId]);

  useEffect(() => {
    // // console.log(
    //   clientsArr,
    //   "clientasdsadas---------------------------------------------+++++++++++++++++++++"
    // );
    console.log(agents, "agetn2");
    if (agents && agents.length > 0) {
      let tempArr = [];
      if (leadId != "") {
        tempArr = agents.map((el) => {
          let obj = {};
          if (el.leadId == leadId) {
            obj = {
              label: `${el.firstName} ${el.lastName}`,
              value: el?._id,
              leadId: el?.leadId,
            };
          }
          return obj;
        });
      } else {
        tempArr = agents.map((el) => {
          let obj = {
            label: `${el.firstName} ${el.lastName}`,
            value: el?._id,
            leadId: el?.leadId,
          };
          return obj;
        });
      }
      console.log(tempArr, "12tempArr12");
      setAgentsArr([...tempArr]);
    }
  }, [agents]);

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
      // // console.log('Error: ', error)
    };
  };
  const handleFileSelection = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        // // console.log(result, "result");
        setFileUrl(result);
      });
    }
  };

  const handleFilterWithAgentName = (query) => {
    // // console.log(query, "query3");
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
  const handleFilterBySpoke = (query) => {
    // // console.log(query, "query23");
    // // console.log(leadsArr, "leadsArr3");
    setRoleQuery(query.value);
    if (query.value != "") {
      let tempArr = leadsArr.filter((el) => el?.agentId == query.value);
      setDisplayLeadsArr([...tempArr]);
    } else {
      setDisplayLeadsArr([...leadsArr]);
    }
  };
  const handleFilterByTeamLead = (query) => {
    // console.log(query, "1query23");
    // console.log(leadsArr, "1leadsArr3");
    setRoleQuery(query.value);
    if (query.value != "") {
      let tempArr = leadsArr.filter(
        (el) => el?.agentId == query.value || el?.leadObj?._id == query.value
      );
      setDisplayLeadsArr([...tempArr]);
    } else {
      setDisplayLeadsArr([...leadsArr]);
    }
  };

  const handleFilterDateFrom = async (query) => {
    setDateFrom(new Date(query).toISOString());
  };

  const handleFilterDateFromAndTo = async () => {
    if (dateTo != "" && dateFrom != "") {
      let getfilterLead = await getLeadFilterByDate(
        dateFrom,
        dateTo,
        role,
        userAuthorise?.user?._id
      );
      console.log(getfilterLead.data.data, "getfilterLeadw4");
      setDisplayLeadsArr(getfilterLead.data.data);
      setLeadsArr(getfilterLead.data.data);
    }
  };

  useEffect(() => {
    handleFilterDateFromAndTo();
  }, [dateFrom, dateTo]);

  useEffect(() => {
    handleSetAgentId();
  }, [userAuthorise]);

  const handleSetAgentId = async () => {
    console.log(userAuthorise, "userAuthorise21");
    if (userAuthorise?.role == "SPOKE") {
      setAgentId(userAuthorise?.user?._id);
      setSpokeId(userAuthorise?.user?._id);
    }
  };

  const handleFilterDateTo = async (query) => {
    setDateTo(new Date(query).toISOString());
    // query = new Date(query).toISOString();
    // let getfilterLead = await getLeadFilterByDate(query);
    // console.log(getfilterLead.data, "1querytotototo");
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    try {
      let clientObj = {};
      if (subject == "") {
        toastError("Subject cannot be empty");
        return;
      }
      if (`${phone}` == "") {
        toastError("Phone cannot be empty");
        return;
      } else {
        clientObj.phone = phone;
      }
      if (`${phone}`.length != 10) {
        toastError("Phone must be 10 digits long");
        return;
      }
      if (`${email}` == "") {
        toastError("Email cannot be empty");
        return;
      } else {
        clientObj.email = email;
      }

      if (`${name}` == "") {
        toastError("Name cannot be empty");
        return;
      } else {
        clientObj.name = name;
      }

      if (`${agentId}` == "") {
        toastError("Agent cannot be empty");
        return;
      }
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
        createdBy: userObj,
        clientObj,
        agentId: spokeId,
        spokeId,
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

      // console.log(obj, "ovvjb23");
      // let { data: res } = await createLead(obj, role);
      if (!leadUpdateId) {
        let { data: res } = await createLead(obj, role);
        if (res.success) {
          toastSuccess(res.message);
          handleGetAllLeads();
        }
      } else {
        let { data: res } = await updatelead(obj, leadUpdateId);
        if (res.success) {
          toastSuccess(res.message);
          setLeadObj({});
          setLeadUpdateId("");
          handleGetAllLeads();
        }
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
    // setLeadId("");
    // console.log(e, "e23");
    setAgentId(e);
    setSpokeId(e);
  };

  const handleDestinationChange = (e) => {
    setAgentId(e.value);

    // setDestinationId(e.value);
  };

  const handleTeamLeadChange = (e) => {
    // console.log(e, "Eeeeeeeee");
    setLeadId(e);
    // setAgentId("");
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
  const options_For_Role = [
    {
      label: "Select Priority",
      value: "",
    },
    {
      label: "TEAM LEADER",
      value: "TEAMLEAD",
    },
    {
      label: "SPOKE",
      value: "SPOKE",
    },
    // {
    //   label: "Low",
    //   value: "Low",
    // },
  ];

  const handleView = (lead) => {
    // // console.log(lead, "lead32");
    if (lead) {
      setLeadObj(lead);
      setLeadUpdateId(lead._id);
    } else {
      setLeadObj({});
      setLeadUpdateId("");
    }

    // // console.log(row, "row update"); //whole object
    // dispatch(setfollowUp(row));
  };

  const handleReturndropDown = (record) => {
    // // console.log(role, "role");
    // // console.log(record?.status, "role");
    // // console.log(role == "ADMIN" || role == rolesObj.SPOKE && record?.status == leadStatus.closed, "role != ADMIN || role == rolesObj.SPOKE && record?.status != leadStatus.closed")
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
                to={`/admin/employee-profile/${record?.agentObj?._id}`}
                className="avatar"
              >
                <img alt="" src={record?.image} />
              </Link>
              <Link to={`/admin/employee-profile/${record?.agentObj?._id}`}>{`${
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

          {/* {role == rolesObj.ACCOUNT && (
            <div>
              {record?.agentObj?.firstName
                ? `${record?.agentObj?.firstName}`
                : " N / A " + record?.agentObj?.lastName
                ? record?.agentObj?.lastName
                : " 21"}
            </div>
          )} */}
        </h2>
      ),
    },

    {
      title: "Assigned Team Lead",
      render: (text, record) => (
        // role != rolesObj.ACCOUNT && (
        <h2 className="table-avatar">
          {record.leadObj ? (
            <>
              {/* {// console.log(record, "record2")} */}
              <Link
                to={`/admin/employee-profile/${record?.leadObj?._id}`}
                className="avatar"
              >
                <img alt="" src={record?.image} />
              </Link>
              <Link
                to={`/admin/employee-profile/${record?.leadObj?._id}`}
              >{`${record?.leadObj?.firstName} ${record?.leadObj?.lastName}`}</Link>
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
          {/* {role == rolesObj.ACCOUNT && (
            <div>
              {record?.leadObj?.firstName
                ? `${record?.leadObj?.firstName}`
                : " N / A " + record?.leadObj?.lastName
                ? record?.leadObj?.lastName
                : " "}
            </div>
          )} */}
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
        <div>
          {role != rolesObj.ACCOUNT ? (
            <div className="dropdown action-label text-center">
              {handleReturndropDown(record)}
            </div>
          ) : (
            <div>
              {record?.status == "CLOSED" ? "CONFIRMED" : "NOT CONFIRMED"}
            </div>
          )}
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
            {role != rolesObj.ACCOUNT ? (
              <div>
                <Link
                  className="dropdown-item"
                  to={`/admin/lead/${record._id}`}
                >
                  <i className="fa fa-pencil m-r-5" /> View
                </Link>

                <a
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_Lead"
                  onClick={() => handleEdit(record)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>

                {/* <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_Lead"
              onClick={() => handleEdit(record)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a> */}
              </div>
            ) : (
              <div>
                <Link
                  className="dropdown-item"
                  to={`/admin/lead/${record._id}/ViewDetails`}
                  onClick={() => handleEdit(record._id)}
                >
                  <i className="fa fa-pencil m-r-5" /> View
                </Link>

                {/* <a
                  // className="dropdown-item"
                  // data-bs-toggle="modal"
                  href="/admin/lead/views23"
            
                  // data-bs-target="#add_Lead"
                  // component={LeadDetails}
                  onClick={() => LeadDetails}
                >
                  {/* <i className=" m-r-5" /> 
                  View2
                </a> */}
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  const columns_TeamLeader = [
    { title: "Lead Subject", dataIndex: "subject" },
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
                to={`/admin/employee-profile/${record?.agentObj?._id}`}
                className="avatar"
              >
                <img alt="" src={record?.image} />
              </Link>
              <Link to={`/admin/employee-profile/${record?.agentObj?._id}`}>{`${
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

          {/* {role == rolesObj.ACCOUNT && (
            <div>
              {record?.agentObj?.firstName
                ? `${record?.agentObj?.firstName}`
                : " N / A " + record?.agentObj?.lastName
                ? record?.agentObj?.lastName
                : " 21"}
            </div>
          )} */}
        </h2>
      ),
    },

    // {
    //   title: "Assigned Team Lead",
    //   render: (text, record) => (
    //     // role != rolesObj.ACCOUNT && (
    //     <h2 className="table-avatar">
    //       {record.leadObj ? (
    //         <>
    //           {/* {// console.log(record, "record2")} */}
    //           <Link
    //             to={`/admin/employee-profile/${record?.leadObj?._id}`}
    //             className="avatar"
    //           >
    //             <img alt="" src={record?.image} />
    //           </Link>
    //           <Link
    //             to={`/admin/employee-profile/${record?.leadObj?._id}`}
    //           >{`${record?.leadObj?.firstName} ${record?.leadObj?.lastName}`}</Link>
    //         </>
    //       ) : (
    //         <>
    //           <div
    //             onClick={() => setSelectedLeadId(record._id)}
    //             className="avatar"
    //           >
    //             <img
    //               alt=""
    //               onClick={() => setSelectedLeadId(record._id)}
    //               src={record?.image}
    //             />
    //           </div>
    //           <div
    //             data-bs-toggle="modal"
    //             onClick={() => setSelectedLeadId(record._id)}
    //             data-bs-target="#update_agent"
    //           >
    //             NA
    //           </div>
    //           {/* update_agent */}
    //         </>
    //       )}
    //       {/* {role == rolesObj.ACCOUNT && (
    //         <div>
    //           {record?.leadObj?.firstName
    //             ? `${record?.leadObj?.firstName}`
    //             : " N / A " + record?.leadObj?.lastName
    //             ? record?.leadObj?.lastName
    //             : " "}
    //         </div>
    //       )} */}
    //     </h2>
    //   ),
    // },

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
        <div>
          {role != rolesObj.ACCOUNT ? (
            <div className="dropdown action-label text-center">
              {handleReturndropDown(record)}
            </div>
          ) : (
            <div>{record?.status} </div>
          )}
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
            {role != rolesObj.ACCOUNT ? (
              <div>
                <Link
                  className="dropdown-item"
                  to={`/admin/lead/${record._id}`}
                >
                  <i className="fa fa-pencil m-r-5" /> View
                </Link>

                <a
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_Lead"
                  onClick={() => handleEdit(record)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>

                {/* <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_Lead"
              onClick={() => handleEdit(record)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a> */}
              </div>
            ) : (
              <div>
                <Link
                  className="dropdown-item"
                  to={`/admin/lead/${record._id}/ViewDetails`}
                  onClick={() => handleEdit(record._id)}
                >
                  <i className="fa fa-pencil m-r-5" /> View
                </Link>

                {/* <a
                  // className="dropdown-item"
                  // data-bs-toggle="modal"
                  href="/admin/lead/views23"
            
                  // data-bs-target="#add_Lead"
                  // component={LeadDetails}
                  onClick={() => LeadDetails}
                >
                  {/* <i className=" m-r-5" /> 
                  View2
                </a> */}
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  const columns_SPOKE = [
    { title: "Lead Subject", dataIndex: "subject" },
    // {
    //   title: 'Lead Id',
    //   dataIndex: 'Leadid',
    //   render: (text, record) => (
    //     <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/employees/Lead-view">#TKT-0001</Link>
    //   ),
    //   sorter: (a, b) => a.Leadid.length - b.Leadid.length,
    // },

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
        <div>
          {role != rolesObj.ACCOUNT ? (
            <div className="dropdown action-label text-center">
              {handleReturndropDown(record)}
            </div>
          ) : (
            <div>{record?.status} </div>
          )}
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
            {role != rolesObj.ACCOUNT ? (
              <div>
                <Link
                  className="dropdown-item"
                  to={`/admin/lead/${record._id}`}
                >
                  <i className="fa fa-pencil m-r-5" /> View
                </Link>

                <a
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_Lead"
                  onClick={() => handleEdit(record)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>

                {/* <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_Lead"
              onClick={() => handleEdit(record)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a> */}
              </div>
            ) : (
              <div>
                <Link
                  className="dropdown-item"
                  to={`/admin/lead/${record._id}/ViewDetails`}
                  onClick={() => handleEdit(record._id)}
                >
                  <i className="fa fa-pencil m-r-5" /> View
                </Link>

                {/* <a
                  // className="dropdown-item"
                  // data-bs-toggle="modal"
                  href="/admin/lead/views23"
            
                  // data-bs-target="#add_Lead"
                  // component={LeadDetails}
                  onClick={() => LeadDetails}
                >
                  {/* <i className=" m-r-5" /> 
                  View2
                </a> */}
              </div>
            )}
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
            {/* {console.log(role, "123role23")} */}
            {/* {role != rolesObj.SPOKE && role != rolesObj.ACCOUNT && ( */}
            {role != rolesObj.ACCOUNT && (
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

        {role != rolesObj.ACCOUNT && (
          <div className="row">
            <div className="col-md-12">
              <div className="card-group m-b-30">
                {/* <div className="card">
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
                </div> */}
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Solved Leads</span>
                      </div>
                      {/* <div>
                        <span className="text-success">+12.5%</span>
                      </div> */}
                    </div>

                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return x.status == "CLOSED" ||
                            x.status == "CLOSED_BY_SPOKE"
                            ? "CLOSED"
                            : "";
                        }).length
                      }
                    </h3>
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
                      {/* <div>
                        <span className="text-danger">-2.8%</span>
                      </div> */}
                    </div>
                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return x.status == "OPEN" || x.status == "REOPENED";
                        }).length
                      }
                    </h3>
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
                      {/* <div>
                        <span className="text-danger">-75%</span>
                      </div> */}
                    </div>
                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return (
                            x.status == "ON_HOLD" || x.status == "IN_PROGRESS"
                          );
                        }).length
                      }
                    </h3>
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
                        <span className="d-block">Cancel Leads</span>
                      </div>
                      {/* <div>
                        <span className="text-danger">-75%</span>
                      </div> */}
                    </div>
                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return x.status == "CANCELLED";
                        }).length
                      }
                    </h3>
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
        )}
        {/* Search Filter */}

        {/*  */}
        <div div className="row filter-row">
          {role != rolesObj.SPOKE &&
            role != rolesObj.TEAMLEAD &&
            role != rolesObj.ACCOUNT && (
              <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                <div className="form-group form-focus select-focus">
                  {/* <select className="select form-control" >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select> */}
                  <Select
                    onChange={handleFilterByTeamLead}
                    menuPortalTarget={document.body}
                    styles={customStyles}
                    options={teamLeads.map((el) => {
                      return {
                        ...el,
                        value: el._id,
                        label: el.firstName + " " + el.lastName,
                      };
                    })}
                  />

                  <label className="focus-label">Filter By Team Lead </label>
                </div>
              </div>
            )}
          {role != rolesObj.SPOKE &&
            role != rolesObj.ACCOUNT &&
            role != rolesObj.TEAMLEAD && (
              <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                <div className="form-group form-focus select-focus">
                  {/* agents */}
                  <Select
                    onChange={handleFilterBySpoke}
                    menuPortalTarget={document.body}
                    styles={customStyles}
                    options={agents.map((el) => {
                      return {
                        ...el,
                        value: el._id,
                        label: el.firstName + el.lastName,
                      };
                    })}
                  />

                  <label className="focus-label">Filter By Spoke </label>
                </div>
              </div>
            )}
          {role != rolesObj.SPOKE && role != rolesObj.ACCOUNT && (
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
              {/* <select className="select form-control" >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select> */}
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
          {/* {role != rolesObj.SPOKE && role != rolesObj.ACCOUNT && ( */}
          <div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <input
                  type="date"
                  // value={employeeNameQuery}
                  onChange={(e) => {
                    handleFilterDateFrom(e.target.value);
                  }}
                  className="form-control floating"
                />
                <label className="focus-label">From </label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <input
                  // value={employeeNameQuery}
                  onChange={(e) => {
                    handleFilterDateTo(e.target.value);
                  }}
                  type="date"
                  className="form-control floating"
                />
                <label className="focus-label">To </label>
              </div>
            </div>
          </div>
          {/* )} */}

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
        {/* {// console.log("temam,", role)} */}
        {/* {console.log(displayLeadsArr, "role323", role, "rol2")} */}

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
                columns={
                  role == "ADMIN" || role == "ACCOUNT"
                    ? columns
                    : role == "TEAMLEAD"
                    ? columns_TeamLeader
                    : role == "SPOKE"
                    ? columns_SPOKE
                    : []
                }
                // columns={columns}
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
        {/* <div className="col-auto float-end ml-auto"> */}
        {/* <a
            href="#"
            className="btn add-btn"
            data-bs-toggle="modal"
            data-bs-target="#view_Lead1"
          >
            <i className="fa fa-plus" />
          </a> */}
        {/* </div> */}
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {leadUpdateId ? "Update" : "Add"} Lead
              </h5>
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
                {/* <div className="col-md-6">
                  <div className="form-group">
                    <label>Client ({clientsArr.length})</label>

                    <select
                      className="select form-control"
                      value={clientId}
                      onChange={(e) => {
                        setClientId(e.target.value);
                      }}
                    >
                      <option value=""> --- Select Clients</option>
                      {clientsArr &&
                        clientsArr.map((client, i) => {
                          return (
                            <option key={i} value={client._id}>
                              {client.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div> */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type={"text"}
                      className="form-control"
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
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type={"text"}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      value={priority}
                      className="form-control"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium"> Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    {/* <Select
                        onChange={handlePriorityChange}
                        options={options}
              /> */}
                  </div>
                </div>
                {/* <Select
                          options={teamLeadsArr.map((el) => {
                            return { ...el, value: el._id, label: el.name };
                          })}
                          placeholder="Select from options"
                          defaultInputValue={leadId}
                          // value={stateObj}
                          onChange={(e) => {
                            console.log(e, "asd");
                            // setStateId(e.value);
                            // setStateObj(e);
                          }}
                        >
                          {" "}
                          <option value=""> --- Select Team Lead</option>
                        </Select> */}
                {role != rolesObj.TEAMLEAD &&
                  role != rolesObj.SPOKE &&
                  role != rolesObj.ACCOUNT && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Assign to Team Lead ({teamLeadsArr.length})
                        </label>

                        <select
                          className="select form-control"
                          value={leadId}
                          onChange={(e) => {
                            handleTeamLeadChange(e.target.value);
                          }}
                        >
                          {/* {console.log(teamLeadsArr, "teamLeadsArr23")}
                          {console.log(leadId, "tleadId23")} */}
                          <option value=""> --- Select Team Lead</option>
                          {teamLeadsArr &&
                            teamLeadsArr.map((agent, i) => {
                              return (
                                <option key={i} value={agent.value}>
                                  {agent.label}
                                </option>
                              );
                            })}
                        </select>
                        {/* <Select
            options={cityArr.map((el) => {
              return { ...el, value: el._id, label: el.name };
            })}
            placeholder="Select from options"
            defaultInputValue={cityId}
            value={citiesObj}
            onChange={(e) => {
              //   console.log(e, "asd");
              setCityId(e.value);
              setCitiesObj(e);
            }}
          /> */}
                      </div>
                    </div>
                  )}

                {role != rolesObj.SPOKE && role != rolesObj.ACCOUNT && (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Assign to Spoke ({agentsArr.length})</label>
                      {console.log(agentsArr, "agentsArr123")}
                      <select
                        className="select form-control"
                        value={agentId}
                        onChange={(e) => {
                          handleAgentChange(e.target.value);
                        }}
                      >
                        <option value=""> --- Select Spoke</option>
                        {role == rolesObj.TEAMLEAD &&
                          agentsArr &&
                          agentsArr.map((spoke, i) => {
                            console.log(spoke, i, "2132");
                            // spoke.leadId == leadId;
                            return (
                              <>
                                <option key={i} value={spoke.value}>
                                  {/* {spoke.leadId == leadId ? spoke.label : ""} */}
                                  {spoke.label}
                                </option>
                              </>
                            );
                          })}
                        {role == rolesObj.ADMIN &&
                          agentsArr &&
                          agentsArr.map((spoke, i) => {
                            // console.log(spoke, i, "2132");
                            // spoke.leadId == leadId;
                            return (
                              <>
                                <option key={i} value={spoke.value}>
                                  {spoke.leadId == leadId ? spoke.label : ""}
                                  {/* {spoke.label} */}
                                </option>
                              </>
                            );
                          })}

                        {/* {agentsArr &&
                          agentsArr.filter((spoke) => {
                            spoke.leadId == leadId;

                          })} */}
                      </select>
                    </div>
                  </div>
                )}
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
                    {leadUpdateId ? "Update" : "Add"}
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
                    <div
                      onClick={() => handleDelete()}
                      className="btn btn-primary continue-btn"
                    >
                      Delete
                    </div>
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
