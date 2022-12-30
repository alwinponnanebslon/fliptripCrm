import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import {
  Avatar_02,
} from "../../Entryfile/imagepath";
import EditLead from "../../_components/modelbox/EditLead";
import { Table } from "antd";
import "antd/dist/antd.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { itemRender, onShowSizeChange } from "../paginationfunction";

import "../antdstyle.css";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllAgents,
  getAllEmployees,
  getAllTeamLeadsEmployees,
  returnAllEmployees,
} from "../../redux/features/employee/employeeSlice";
import { quotationGet } from "../../redux/features/quotation/quotationSlice";

import { getEmployess } from "../../Services/user.service";

import Select from "react-select";

import { toastError, toastSuccess } from "../../utils/toastUtils";
import { confirmAlert } from "react-confirm-alert";
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

import {
  setclientObj,
} from "../../redux/features/client/clientSlice";
import { get, updateClient, getFilter } from "../../Services/client.service";
import { handleCheckCostingSheetExist } from "../../Services/costingSheet.services";
import { getAllLeadSearchFilter } from "../../Services/lead.service";
import ViewCostingSheetForm from "../CostingSheet/Forms/basicinputs/CostingSheetForm";





const Leads = () => {
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.employee.employeesArr); //spoc
  const history = useHistory();
  // const teamLeads = useSelector(getAllTeamLeadsEmployees); //teamlead



  const teamLeads = useSelector((state) => state.employee.employeesArr);
  // // console.log(agents, "12agents");


  const quotationArray = useSelector((state) => state.quotation.quotationArr);

  const [clientId, setClientId] = useState("");
  const [leadObj, setLeadObj] = useState({});
  const [leadUpdateId, setLeadUpdateId] = useState("");

  const [agentsArr, setAgentsArr] = useState([]);
  const [teamLeadsArr, setTeamLeadsArr] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const userAuthorise = useSelector((state) => state.auth);

  const [clientArr, setClientArr] = useState([]);





  const userObj = useSelector((state) => state.auth.user);
  const [displayLeadsArr, setDisplayLeadsArr] = useState([]);
  const [leadsArr, setLeadsArr] = useState([]);
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [agentId, setAgentId] = useState("");
  let [leadId, setLeadId] = useState("");
  const [spocId, setSpocId] = useState("");
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
  const [isStatusOfLead, setIsStatusOfLead] = useState(false);
  const [show, setShow] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [quotationArrData, setQuotationArrData] = useState([]);
  const [quotationApproved, setQuotationApproved] = useState(false);
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [clientIdForUpdate, setClientIdForUpdate] = useState("");

  const [passwordNumber, setPassportNumber] = useState("");
  const [passPortExpiryDate, setPassPortExpiryDates] = useState("");
  const [filterClientByName, setFilterClientByName] = useState("");
  const [dob, setDob] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");

  const [penCardImg, setPenCardImg] = useState("");
  const [passPortFrontImg, setPassPortFrontImg] = useState("");
  const [passPortBackImg, setPassPortBackImg] = useState("");
  const [leadArrFilterStatus, setLeadArrFilterStatus] = useState("");
  const [teamLeadFilterId, setTeamLeadFilterId] = useState("");






  const agentSelect = useRef();

  const getAllClients = async () => {
    try {
      const { data: res } = await get();
      if (res) {
        setClientArr(res?.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (newClient) {
      setPhone("");
      setEmail("");
      setName("");
      setClientId("");
    }
  }, [newClient]);

  const handleGetClient = async () => {
    console.log(filterClientByName)
    let get1 = await getFilter(`name=${filterClientByName}`);

    setClientArr(get1.data.data);
  };

  useEffect(() => {
    handleGetClient();
  }, [filterClientByName]);

  useEffect(() => {
    dispatch(quotationGet());
  }, []);

  useEffect(() => {
    if (quotationArray.length > 0) {
      setQuotationArrData(quotationArray);
    }
  }, [quotationArray]);

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
      // console.log(res, "Res12");
      if (res.success) {
        let tempArr = res.data;
        // console.log(tempArr, "1tempArr2");
        if (userAuthorise.role == "SPOC") {
          let temp = tempArr.filter(
            (el) =>
              `${el.agentId}` == `${userAuthorise?.user?._id}` ||
              `${el.spocId}` == `${userAuthorise?.user?._id}`
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
      toastError(error);
    }
  };

  useEffect(() => {
    handleGetAllLeads();
    // dispatch(clientGet());
  }, []);

  const handleEdit = (lead) => {
    // console.log(lead, "rlad23q");
    if (lead) {
      setLeadObj(lead);
      setLeadUpdateId(lead._id);
      setShow(true);
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
    // console.log(leadObj, "setLeadObj2134");
    if (leadObj && leadObj._id) {
      setSubject(leadObj?.subject);
      // setClientId(leadObj?.clientObj?._id);
      setPhone(leadObj?.phone);
      setName(leadObj?.phone);
      setEmail(leadObj?.clientObj?.email);
      setName(leadObj?.clientObj?.name);
      setPriority(leadObj?.priority);
      setAgentId(leadObj?.agentId);
      setLeadId(leadObj?.leadId);
      setSpocId(leadObj?.spocId);
      setDescription(leadObj?.description);
    }
  }, [leadObj, leadUpdateId]);

  // useEffect(() => {
  //   if (agents && agents.length > 0) {
  //     let tempArr = [];
  //     if (leadId != "") {
  //       tempArr = agents.map((el) => {
  //         let obj = {};
  //         if (el.leadId == leadId) {
  //           obj = {
  //             label: `${el.firstName} ${el.lastName}`,
  //             value: el?._id,
  //             leadId: el?.leadId,
  //           };
  //         }
  //         return obj;
  //       });
  //     } else {
  //       tempArr = agents.map((el) => {
  //         let obj = {
  //           label: `${el.firstName} ${el.lastName}`,
  //           value: el?._id,
  //           leadId: el?.leadId,
  //         };
  //         return obj;
  //       });
  //     }
  //     // console.log(tempArr, "12tempArr12");
  //     setAgentsArr([...tempArr]);
  //   }
  // }, [agents]);
  useEffect(() => {
    // console.log(teamLeads, "teamslead23");
    if (teamLeads && teamLeads.length > 0) {
      let arr = teamLeads.filter((e) => e.role == "TEAMLEAD");
      console.group(arr, "arr231231");
      // let tempArr = teamLeads.map((el) => {
      let tempArr = arr.map((el) => {
        let obj = {
          label: `${el.firstName} ${el.lastName}`,
          value: el?._id,
        };
        return obj;
      });
      setTeamLeadsArr([...tempArr]);
    }
  }, [teamLeads]);

  useEffect(() => {
    // if (teamLeads && teamLeads.length > 0) {
    //   let tempArr = teamLeads.map((el) => {
    //     let obj = {
    //       label: `${el.firstName} ${el.lastName}`,
    //       value: el?._id,
    //     };
    //     return obj;
    //   });
    //   setTeamLeadsArr([...tempArr]);
    // }

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
      // console.log(tempArr, "12tempArr12");
      setAgentsArr([...tempArr]);
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
    reader.onerror = function (error) { };
  };

  const handleFileSelection = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        setFileUrl(result);
      });
    }
  };
  const handleFileSelectionPenCard = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        setPenCardImg(result);
      });
    }
  };

  const handleFileSelectionPassPortFront = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        setPassPortFrontImg(result);
      });
    }
  };

  const handleFileSelectionPassPortBack = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        setPassPortBackImg(result);
      });
    }
  };

  const handleFilterWithAgentName = (query) => {
    // console.log(query, "query3");
    setEmployeeNameQuery(query);
    if (leadArrFilterStatus != "") {
    } else {
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
    }
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

  const handleFilterBySpoc = (query) => {
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
  const handleClientByAllFilter = async (value1, value2, value3) => {
    // console.log(value1, value2, "value1, value2");(userObj?._id, role)
    let getFilterByTeam = await getAllLeadSearchFilter(
      userObj?._id,
      role,
      `leadStatus=${value1}&teamLeadId=${value2}`
    );
    if (getFilterByTeam?.data?.data?.length > 0) {
      setDisplayLeadsArr(getFilterByTeam?.data?.data);
    }
  };

  useEffect(() => {
    handleClientByAllFilter(leadArrFilterStatus, teamLeadFilterId);
  }, [teamLeadFilterId]);

  const handleFilterByTeamLead = (query) => {
    setRoleQuery(query.value);
    if (leadArrFilterStatus != "") {
      setTeamLeadFilterId(query.value);
      // let getFilterByTeam = await getAllLeadSearchFilter(`leadStatus=${leadArrFilterStatus}&teamLead=${query.value} `)
      // getAllLeadSearchFilter
      // handleUpdateLeadsArray(query.value)
      // // let tempArr = leadsArr.filter(
      //  let displayLeadsArr=
      // let tempArr = displayLeadsArr.filter(
      //   (el) => el?.agentId == query.value || el?.leadObj?._id == query.value
      // );
      // console.log(tempArr, "12312321");
      // setDisplayLeadsArr([...tempArr]);
    } else {
      // console.log("else23232332");
      if (query.value != "") {
        let tempArr = leadsArr.filter(
          (el) => el?.agentId == query.value || el?.leadObj?._id == query.value
        );
        setDisplayLeadsArr([...tempArr]);
      } else {
        setDisplayLeadsArr([...leadsArr]);
      }
    }
  };

  const handleFilterDateFrom = async (query) => {
    setDateFrom(new Date(query).toISOString());
  };

  const handleFilterDateFromAndTo = async () => {
    if (leadArrFilterStatus != "") {
    } else {
      if (dateTo != "" && dateFrom != "") {
        if (Date.parse(dateFrom) > Date.parse(dateTo)) {
          toastError("In valid date");
        } else {
          let getfilterLead = await getLeadFilterByDate(
            dateFrom,
            dateTo,
            role,
            userAuthorise?.user?._id
          );
          // console.log(getfilterLead.data.data, "getfilterLeadw4");
          setDisplayLeadsArr(getfilterLead.data.data);
          setLeadsArr(getfilterLead.data.data);
        }
      }
    }
  };

  const handleFilterDateFromAndToAndStatus = async () => {
    if (dateTo != "" && dateFrom != "") {
      if (Date.parse(dateFrom) > Date.parse(dateTo)) {
        toastError("In valid date");
      } else {
        let getfilterLead = await getAllLeadSearchFilter(
          dateFrom,
          dateTo,
          role,
          userAuthorise?.user?._id,
          leadArrFilterStatus
        );
        setDisplayLeadsArr(getfilterLead.data.data);
      }
    }
  };

  useEffect(() => {
    if (leadArrFilterStatus != "") {
      handleFilterDateFromAndToAndStatus();
    } else {
      handleFilterDateFromAndTo();
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    //////////////////////////////////////////////
    handleSetAgentId();
  }, [userAuthorise]);

  const handleSetAgentId = async () => {
    // console.log(userAuthorise, "userAuthorise21");
    if (userAuthorise?.role == "SPOC") {
      setAgentId(userAuthorise?.user?._id);
      setSpocId(userAuthorise?.user?._id);
    }
  };

  const handleFilterDateTo = async (query) => {
    setDateTo(new Date(query).toISOString());
  };

  const clearFunc = () => {
    setSubject("");
    // setClientId("");
    setPhone("");
    setName("");
    setEmail("");
    setPriority("");
    // setAgentId("");
    // setSpocId("");
    setDescription("");
    // setLeadObj({});
    setLeadUpdateId("");
    // setAgentsArr([]);
    // setLeadsArr([]);
    // setTeamLeadsArr([]);
  };

  const handleUpdateLeadsArray = (value1, value2, value3) => {
    // handleUpdateLeadsArray("OPEN", "REOPENED");

    let tempArr = leadsArr;
    // console.log(tempArr, "atemp23");
    if (value1 == "OPEN") {
      let temp = tempArr.filter(
        (el) => `${el.status}` == value1 //|| `${el.status}` == value2
      );

      setDisplayLeadsArr(temp);
    } else if (value1 == "CONVERT" && value2 == "CONVERT_BY_SPOC") {
      let temp = tempArr.filter(
        (el) => `${el.status}` == value1 || `${el.status}` == value2
      );
      setDisplayLeadsArr(temp);
      // setLeadsArr(temp);
    } else if (value1 == "CANCELLED") {
      let temp = tempArr.filter((el) => `${el.status}` == value1);
      setDisplayLeadsArr(temp);
      // setLeadsArr(temp);
    } else if (
      value1 == "ON_HOLD" ||
      value1 == "REOPENED" ||
      value1 == "IN_PROGRESS"
    ) {
      let temp = tempArr.filter(
        (el) =>
          `${el.status}` == value1 ||
          `${el.status}` == value2 ||
          `${el.status}` == value3
      );
      // if (leadArrFilterStatus != "") {
      //   // let tempArr = leadsArr.filter(

      //   let tempArr = displayLeadsArr.filter(
      //     (el) => el?.agentId == query.value || el?.leadObj?._id == query.value
      //   );
      //   console.log(tempArr, "12312321");
      //   setDisplayLeadsArr([...tempArr]);
      // }else{

      setDisplayLeadsArr(temp);
      // }
    }

    // } else if (userAuthorise.role == "TEAMLEAD") {
    //   let temp = tempArr.filter(
    //     (el) =>
    //       el.agentId == userAuthorise?.user?._id ||
    //       el.leadId == userAuthorise?.user?._id
    //   );
    //   // console.log(temp, "123temp23");
    //   setDisplayLeadsArr(temp);
    //   setLeadsArr(temp);
    // } else {
    //   setDisplayLeadsArr(res.data);
    //   setLeadsArr(res.data);
    // }
    // let temp = tempArr.filter((el) => {
    //   el?.agent;
    // });
    // setLeadsArr(res.data);
    // dispatch(returnAllEmployees(res.data))
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
        // toastError("Email cannot be empty");
        // return;
      } else {
        clientObj.email = email;
      }

      if (`${name}` == "") {
        toastError("Name cannot be empty");
        return;
      } else {
        clientObj.name = name;
      }

      // if (`${agentId}` == "") {
      //   toastError("Agent cannot be empty");
      //   return;
      // }
      // if (`${description}` == "") {
      //   toastError("Description cannot be empty");
      //   return;
      // }

      let obj = {
        subject,
        phone,
        description,
        fileUrl,
        priority,
        clientId: clientId,
        createdBy: userObj,
        clientObj,
        agentId: spocId,
        spocId,
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
          setShow(!show);
          clearFunc();
        }
      } else {
        let { data: res } = await updatelead(obj, leadUpdateId);
        if (res.success) {
          toastSuccess(res.message);
          setLeadObj({});
          setLeadUpdateId("");
          handleGetAllLeads();
          setShow(!show);
          clearFunc();
        }
      }
    } catch (err) {
      toastError(err);
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

  const updateStatusOfLead = async (id, obj) => {
    let { data: res } = await updateLeadStatus(id, obj);
    if (res.success) {
      handleGetAllLeads();
    }
  };

  const handleLeadStatusUpdate = async (id, value, status) => {
    try {
      // console.log(id, value, status, "value123");

      if (value == "CONVERT" || value == leadStatus.convertBySpoc) {
        if (isStatusOfLead == false && status != "CONVERT") {
          confirmAlert({
            title: "Are you sure to close this Lead",
            // message: "Are you sure to do this.",
            buttons: [
              {
                label: "I Am Sure",
                onClick: () => {
                  let obj = {
                    status: value,
                  };
                  let existQuotation = quotationArrData.filter((el) => {
                    return el.leadId == id && el.status == "Convert";
                  });
                  // console.log(existQuotation, "existQuotation21");

                  if (existQuotation.length > 0) {
                    setShowNotes(true);
                    setIsStatusOfLead(true);
                    updateStatusOfLead(id, obj);
                    history.push(`/admin/lead/${id}/?${true}`);
                    setQuotationApproved(false);
                  } else {
                    // if (quotationApproved == false) {
                    toastError("Kindly convert quotation for this lead");
                    return;
                    // }
                  }
                },
              },
              {
                label: "Cancel",
                onClick: () => setIsStatusOfLead(false),
                isStatusofLEAD: false,
              },
            ],
          });
        }
      } else {
        let obj = {
          status: value,
        };
        let { data: res } = await updateLeadStatus(id, obj);
        if (res.success) {
          handleGetAllLeads();
        }
      }
      // handleLeadStatusUpdate(leadId,"Convert","FROMCOSTING")
      // console.log(id, value, status, "3r221");
      if (value == "Convert" && status == "FROMCOSTING") {
        // setIsStatusOfLead(true);
        // console.log("1234789inside ");
        let obj = {
          status: "CONVERT",
        };
        updateStatusOfLead(id, obj);
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };
  const handleCheckCostingSheet = async () => {
    let check = await handleCheckCostingSheetExist(leadId);
  };

  useEffect(() => {
    handleCheckCostingSheet(leadId);
  }, []);

  const handlePriorityChange = (e) => {
    setPriority(e.value);
  };

  const handleAgentChange = (e) => {
    // setLeadId("");
    // console.log(e, "e23");
    setAgentId(e);
    setSpocId(e);
  };

  const handleDestinationChange = (e) => {
    setAgentId(e.value);
    // setDestinationId(e.value);
  };

  const handleTeamLeadChange = (e) => {
    // let tempArr = teamLeads.map((el) => {
    //   let obj = {
    //     label: `${el.firstName} ${el.lastName}`,
    //     value: el?._id,
    //   };
    //   return obj;
    // });
    // setTeamLeadsArr([...tempArr]);

    let arr = [];
    if (agents && agents.length > 0) {
      arr = agents
        .filter((el) => el.leadId == e)
        .map((el) => {
          let obj = {
            label: `${el.firstName} ${el.lastName}`,
            value: el?._id,
          };
          return obj;
        });
    }
    // console.log(arr, "Arr23s123");
    setAgentsArr(arr);
    setLeadId(e);
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
      label: "SPOC",
      value: "SPOC",
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
    if (role == "ADMIN") {
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
            ) : record?.status == leadStatus.convertBySpoc ? (
              <i className="fa fa-dot-circle-o text-warning" />
            ) : (
              <i className="fa fa-dot-circle-o text-success" />
            )}

            {record?.status}
          </a>
          {/* {record?.status != leadStatus.convert && ( */}
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.open,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-info" /> Open
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.reopened,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-info" /> Reopened
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.on_Hold,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-danger" /> On Hold
            </a>
            {role == rolesObj.ADMIN ? (
              <a
                className="dropdown-item"
                onClick={() =>
                  handleLeadStatusUpdate(
                    record?._id,
                    leadStatus.convert,

                    record?.status
                  )
                }
              >
                <i className="fa fa-dot-circle-o text-success" /> Convert
              </a>
            ) : (
              <a
                className="dropdown-item"
                onClick={() =>
                  handleLeadStatusUpdate(
                    record?._id,
                    leadStatus.convertBySpoc,
                    record?._status
                  )
                }
              >
                <i className="fa fa-dot-circle-o text-warning" /> Convert By
                Spoc
              </a>
            )}
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.in_Progress,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-success" /> In Progress
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.cancelled,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-danger" /> Cancelled
            </a>
          </div>
          {/* )} */}
        </>
      );
    } else if (role == rolesObj.SPOC && record?.status == leadStatus.convert) {
      return (
        <>
          <div>
            {record?.status == leadStatus.on_Hold ||
              record?.status == leadStatus.cancelled ? (
              <i className="fa fa-dot-circle-o text-danger" />
            ) : record?.status == leadStatus.open ||
              record?.status == leadStatus.reopened ? (
              <i className="fa fa-dot-circle-o text-info" />
            ) : record?.status == leadStatus.convertBySpoc ? (
              <i className="fa fa-dot-circle-o text-warning" />
            ) : (
              <i className="fa fa-dot-circle-o text-success" />
            )}
            {record?.status}
          </div>
        </>
      );
    } else if (
      role == rolesObj.SPOC &&
      record?.status == leadStatus.convertBySpoc
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
            ) : record?.status == leadStatus.convertBySpoc ? (
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
            ) : record?.status == leadStatus.convertBySpoc ? (
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
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.open,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-info" /> Open
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.reopened,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-info" /> Reopened
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.on_Hold,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-danger" /> On Hold
            </a>
            {/* {role == rolesObj.TEAMLEAD ? (
              <a
                className="dropdown-item"
                onClick={() =>
                  handleLeadStatusUpdate(record?._id, leadStatus.convert)
                }
              >
                <i className="fa fa-dot-circle-o text-success" /> Convert
              </a>
            ) : ( */}
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.convertBySpoc,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-warning" /> Convert By Spoc
            </a>
            {/* )} */}
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.in_Progress,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-success" /> In Progress
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                handleLeadStatusUpdate(
                  record?._id,
                  leadStatus.cancelled,
                  record?.status
                )
              }
            >
              <i className="fa fa-dot-circle-o text-danger" /> Cancelled
            </a>
          </div>
        </>
      );
    }
  };


  const handleUpdateClentDetails = (record) => {
    setShowClientDetails(true);
    console.log(record, "Record23");
    setClientIdForUpdate(record?.clientObj?._id);
  };

  const handleSubmitDetailsClient = async (e) => {
    e.preventDefault();
    // console.log(setClientIdForUpdate, "clientid");
    if (passwordNumber == "") {
      toastError("Passport Number is mandatory");
      return;
    }
    if (passPortExpiryDate == "") {
      toastError("Passport Expiry date is mandatory");
      return;
    }
    if (anniversaryDate == "") {
      toastError("Anniversary date is mandatory");
      return;
    }
    if (penCardImg == "") {
      toastError("Pen Card Image is mandatory");
      return;
    }
    if (passPortFrontImg == "") {
      toastError("PassPort Front Image is mandatory");
      return;
    }
    if (passPortBackImg == "") {
      toastError("PassPort Back Image is mandatory");
      return;
    }
    let obj = {
      passportNumber: passwordNumber,
      passportExpiry: passPortExpiryDate,
      dob,
      anniversaryDate,
      penCardImg,
      passPortFrontImg,
      passPortBackImg,
    };
    // console.log(obj, "obj123");
    // console.log (clientIdForUpdate, "clientIdForUpdate1234");
    let { data: res } = await updateClient(obj, clientIdForUpdate);
    if (res?.success) {
      toastSuccess(res.message);
      setShowClientDetails(false);
    }
  };



  // const handleReturndropDown = (record) => {
  //   // // console.log(record?.status, "role");
  //   // // console.log(role == "ADMIN" || role == rolesObj.SPOC && record?.status == leadStatus.convert, "role != ADMIN || role == rolesObj.SPOC && record?.status != leadStatus.convert")
  //   if (role == "ADMIN") {
  //     return (
  //       <>
  //         <div>
  //           <a
  //             className="btn btn-white btn-sm btn-rounded dropdown-toggle"
  //             href="#"
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             {record?.status == leadStatus.on_Hold ||
  //               record?.status == leadStatus.cancelled ? (
  //               <i className="fa fa-dot-circle-o text-danger" />
  //             ) : record?.status == leadStatus.open ||
  //               record?.status == leadStatus.reopened ? (
  //               <i className="fa fa-dot-circle-o text-info" />
  //             ) : (
  //               <i className="fa fa-dot-circle-o text-success" />
  //             )}
  //             {record?.status}
  //           </a>
  //         </div>
  //       </>
  //     );
  //   } else
  //   if (role == rolesObj.SPOC && record?.status == leadStatus.convert) {
  //     return (
  //       <>
  //         <div>
  //           {record?.status == leadStatus.on_Hold ||
  //           record?.status == leadStatus.cancelled ? (
  //             <i className="fa fa-dot-circle-o text-danger" />
  //           ) : record?.status == leadStatus.open ||
  //             record?.status == leadStatus.reopened ? (
  //             <i className="fa fa-dot-circle-o text-info" />
  //           ) : record?.status == leadStatus.convertBySpoc ? (
  //             <i className="fa fa-dot-circle-o text-warning" />
  //           ) : (
  //             <i className="fa fa-dot-circle-o text-success" />
  //           )}
  //           {record?.status}
  //         </div>
  //       </>
  //     );
  //   } else if (
  //     role == rolesObj.SPOC &&
  //     record?.status == leadStatus.convertBySpoc
  //   ) {
  //     return (
  //       <>
  //         <div>
  //           {record?.status == leadStatus.on_Hold ||
  //           record?.status == leadStatus.cancelled ? (
  //             <i className="fa fa-dot-circle-o text-danger" />
  //           ) : record?.status == leadStatus.open ||
  //             record?.status == leadStatus.reopened ? (
  //             <i className="fa fa-dot-circle-o text-info" />
  //           ) : record?.status == leadStatus.convertBySpoc ? (
  //             <i className="fa fa-dot-circle-o text-warning" />
  //           ) : (
  //             <i className="fa fa-dot-circle-o text-success" />
  //           )}
  //           {record?.status}
  //         </div>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <a
  //           className="btn btn-white btn-sm btn-rounded dropdown-toggle"
  //           href="#"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false"
  //         >
  //           {record?.status == leadStatus.open ||
  //           record?.status == leadStatus.reopened ? (
  //             <i className="fa fa-dot-circle-o text-info" />
  //           ) : record?.status == leadStatus.on_Hold ||
  //             record?.status == leadStatus.cancelled ? (
  //             <i className="fa fa-dot-circle-o text-danger" />
  //           ) : record?.status == leadStatus.convertBySpoc ? (
  //             <i className="fa fa-dot-circle-o text-warning" />
  //           ) : (
  //             <i className="fa fa-dot-circle-o text-success" />
  //           )}
  //           {record?.status}
  //         </a>
  //         <div className="dropdown-menu dropdown-menu-right">
  //           <a
  //             className="dropdown-item"
  //             onClick={() =>
  //               handleLeadStatusUpdate(record?._id, leadStatus.open)
  //             }
  //           >
  //             <i className="fa fa-dot-circle-o text-info" /> Open
  //           </a>
  //           <a
  //             className="dropdown-item"
  //             onClick={() =>
  //               handleLeadStatusUpdate(record?._id, leadStatus.reopened)
  //             }
  //           >
  //             <i className="fa fa-dot-circle-o text-info" /> Reopened
  //           </a>
  //           <a
  //             className="dropdown-item"
  //             onClick={() =>
  //               handleLeadStatusUpdate(record?._id, leadStatus.on_Hold)
  //             }
  //           >
  //             <i className="fa fa-dot-circle-o text-danger" /> On Hold
  //           </a>
  //           {role == rolesObj.TEAMLEAD ? (
  //             <a
  //               className="dropdown-item"
  //               onClick={() =>
  //                 handleLeadStatusUpdate(record?._id, leadStatus.closed)
  //               }
  //             >
  //               <i className="fa fa-dot-circle-o text-success" /> Convert
  //             </a>
  //           ) : (
  //             <a
  //               className="dropdown-item"
  //               onClick={() =>
  //                 handleLeadStatusUpdate(record?._id, leadStatus.closedBySpoc)
  //               }
  //             >
  //               <i className="fa fa-dot-circle-o text-warning" /> Convert By Spoc
  //             </a>
  //           )}
  //           <a
  //             className="dropdown-item"
  //             onClick={() =>
  //               handleLeadStatusUpdate(record?._id, leadStatus.in_Progress)
  //             }
  //           >
  //             <i className="fa fa-dot-circle-o text-success" /> In Progress
  //           </a>
  //           <a
  //             className="dropdown-item"
  //             onClick={() =>
  //               handleLeadStatusUpdate(record?._id, leadStatus.cancelled)
  //             }
  //           >
  //             <i className="fa fa-dot-circle-o text-danger" /> Cancelled
  //           </a>
  //         </div>
  //       </>
  //     );
  //   }
  // };

  const columns_SUPERVISOR = [
    // {
    //   title: "Guest Name",
    //   render: (text, record) => <div>{record.clientName}</div>,
    // },
    {
      title: "Guest Name",
      dataIndex: "clientName",
      render: (text, record) => (
        <div>
          <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
            {record.clientName}
          </Link>
        </div>
      ),
    },
    {
      title: "Assigned Spoc",
      render: (text, record) => (
        <h2 className={`table-avatar `}>
          <div>
            {record?.agentObj?.firstName
              ? record?.agentObj?.firstName + " "
              : "NA"}
            {record?.agentObj?.lastName ? record?.agentObj?.lastName : ""}
          </div>
        </h2>
      ),
    },
    {
      title: "Trip Id",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.uniqueTripId}
          </div>
        </h2>
      ),
    },
    {
      title: "Lead Subject",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.subject}
          </div>
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
    {
      title: "Priority",
      render: (text, record) => (
        <div className="dropdown action-label">{record?.priority}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <div>{record?.status}</div>,
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
            <div>
              {/* <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
                <i className="fa fa-pencil m-r-5" /> View
              </Link> */}
              <a
                className="dropdown-item"
                href="#"
                // data-bs-toggle="modal"
                // data-bs-target="#add_Lead"
                onClick={() => handleEdit(record)}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </a>
            </div>
          </div>
        </div>
        // </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Guest Name",
      dataIndex: "clientName",
      render: (text, record) => (
        <div>
          <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
            {record.clientName}
          </Link>
        </div>
      ),
    },

    {
      title: "Assigned Spoc",
      render: (text, record) => (
        <h2 className="table-avatar">
          {record.agentObj ? (
            <>
              <Link
                to={`/admin/employee-profile/${record?.agentObj?._id}`}
                className="avatar"
              >
                {/* <img alt="" src={record?.image} /> */}
              </Link>
              <Link to={`/admin/employee-profile/${record?.agentObj?._id}`}>{`${record?.agentObj?.firstName ? record?.agentObj?.firstName : "NA"
                } ${record?.agentObj?.lastName ? record?.agentObj?.lastName : ""
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
      title: "Trip Id",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.uniqueTripId}
          </div>
        </h2>
      ),
    },
    {
      title: "Lead Subject",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.subject}
          </div>
        </h2>
      ),
    },


    // {
    //   title: "Assigned Team Lead",
    //   render: (text, record) => (
    //     <h2 className="table-avatar">
    //       {record.leadObj ? (
    //         <>
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
    //         </>
    //       )}
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
              {record?.status == "CONVERT" ? "CONFIRMED" : "NOT CONFIRMED"}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Profit",
      dataIndex: "profit",
      render: (text, record) => (
        <div>
          {role != rolesObj.ACCOUNT ? (
            <div className="dropdown action-label text-center">
              {record?.profit > 0 ? (
                <h4 style={{ color: "green" }}> {record?.profit} </h4>
              ) : (
                <h4 style={{ color: "red" }}>{record?.profit}</h4>
              )}
            </div>
          ) : (
            <div>{record?.status} </div>
          )}
        </div>
      ),
    },
    {
      title: "Personal Details",
      dataIndex: "aasd",
      render: (text, record) => (
        <div>
          {record.status == "CONVERT" && role != rolesObj.ACCOUNT ? (
            <a
              className="btn add-btn"
              onClick={() => handleUpdateClentDetails(record)}
            >
              <i className="fa fa-plus" /> Personal Details
            </a>
          ) : (
            <div>Not converted yet</div>
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
                  <i className=" m-r-5" /> View
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
    // { title: "Lead Subject", dataIndex: "subject" },
    {
      title: "Guest Name",
      // dataIndex: "clientName",
      render: (text, record) => (
        <div>
          <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
            {record.clientName}
          </Link>
        </div>
      ),
    },

    {
      title: "Assigned Spoc",
      render: (text, record) => (
        <h2 className="table-avatar">
          {record.agentObj ? (
            <>
              <Link
                to={`/admin/employee-profile/${record?.agentObj?._id}`}
                className="avatar"
              >
                {/* <img alt="" src={record?.image} /> */}
              </Link>
              <Link to={`/admin/employee-profile/${record?.agentObj?._id}`}>{`${record?.agentObj?.firstName ? record?.agentObj?.firstName : "NA"
                } ${record?.agentObj?.lastName ? record?.agentObj?.lastName : ""
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
      title: "Trip Id",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.uniqueTripId}
          </div>
        </h2>
      ),
    },
    {
      title: "Lead Subject",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.subject}
          </div>
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
              {/* <h4 style={{ color: "red" }}>
                {+" " + record?.profit < 0 ? record?.profit : ""}
              </h4> */}
            </div>
          ) : (
            <div>{record?.status} </div>
          )}
        </div>
      ),
    },
    {
      title: "Profit",
      dataIndex: "profit",
      render: (text, record) => (
        <div>
          {role != rolesObj.ACCOUNT ? (
            <div className="dropdown action-label text-center">
              {record?.profit > 0 ? (
                <h4 style={{ color: "green" }}> {record?.profit} </h4>
              ) : (
                <h4 style={{ color: "red" }}>{record?.profit}</h4>
              )}
            </div>
          ) : (
            <div>{record?.status} </div>
          )}
        </div>
      ),
    },
    {
      title: "Personal Details",
      dataIndex: "aasd",
      render: (text, record) => (
        <div>
          {record.status == "CONVERT" ? (
            <a
              className="btn add-btn"
              onClick={() => handleUpdateClentDetails(record)}
            >
              <i className="fa fa-plus" /> Personal Details
            </a>
          ) : (
            <div>Not converted yet</div>
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
                  // data-bs-toggle="modal"
                  // data-bs-target="#add_Lead"
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
  const columns_SPOC = [
    {
      title: "Guest Name",
      // dataIndex: "clientName",
      render: (text, record) => (
        <div>
          <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
            {record.clientName}
          </Link>
        </div>
      ),
    },
    {
      title: "Trip Id",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.uniqueTripId}
          </div>
        </h2>
      ),
    },
    {
      title: "Lead Subject",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>
            {record?.subject}
          </div>
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
      title: "Profit",
      dataIndex: "profit",
      render: (text, record) => (
        <div>
          {role != rolesObj.ACCOUNT ? (
            <div className="dropdown action-label text-center">
              {record?.profit > 0 ? (
                <h4 style={{ color: "green" }}> {record?.profit} </h4>
              ) : (
                <h4 style={{ color: "red" }}>{record?.profit}</h4>
              )}
            </div>
          ) : (
            <div>{record?.status} </div>
          )}
        </div>
      ),
    },
    {
      title: "Personal Details",
      dataIndex: "aasd",
      render: (text, record) => (
        <div>
          {record.status == "CONVERT" ? (
            <a
              className="btn add-btn"
              onClick={() => handleUpdateClentDetails(record)}
            >
              <i className="fa fa-plus" /> Personal Details
            </a>
          ) : (
            <div>Not converted yet</div>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div>
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
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleClientSelection = (id) => {
    // console.log(id, "id23");
    let tempIndex = clientArr.findIndex((el) => el?._id == id);
    if (tempIndex != -1) {
      let obj = clientArr[tempIndex];
      setName(obj?.name);
      setPhone(obj?.phone);
      setEmail(obj?.email);
      setClientId(obj?._id);
      setclientObj(obj);
    }
  };

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
            {role != rolesObj.ACCOUNT && (
              <div className="col-auto float-end ml-auto">
                <a className="btn add-btn" onClick={() => setShow(true)}>
                  <i className="fa fa-plus" /> Add Lead
                </a>
              </div>
            )}
          </div>
        </div>
        {/* /Page Header */}

        {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR && (
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
                <Link
                  to="/admin/leads"
                  className="card"
                  onClick={() => {
                    setLeadArrFilterStatus("OPEN");
                    handleUpdateLeadsArray("OPEN", "REOPENED");
                    setIsActiveFilter(true);
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">New Leads</span>
                      </div>
                      {/* <div>
                        <span className="text-danger">-75%</span>
                      </div> */}
                    </div>
                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return (
                            x.status == "OPEN" //|| x.status == "REOPENED"
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
                </Link>
                <Link
                  to="/admin/leads"
                  className="card"
                  onClick={() => {
                    setLeadArrFilterStatus("CONVERT");
                    handleUpdateLeadsArray("CONVERT", "CONVERT_BY_SPOC");
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Converted Leads</span>
                      </div>
                      {/* <div>
                        <span className="text-success">+12.5%</span>
                      </div> */}
                    </div>

                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return x.status == "CONVERT" ||
                            x.status == "CONVERT_BY_SPOC"
                            ? "CONVERT"
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
                </Link>
                <Link
                  to="/admin/leads"
                  className="card"
                  onClick={() => {
                    setLeadArrFilterStatus("REOPENED");
                    handleUpdateLeadsArray(
                      "ON_HOLD",
                      "REOPENED",
                      "IN_PROGRESS"
                    );
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Working Leads</span>
                      </div>
                    </div>
                    <h3 className="mb-3">
                      {
                        leadsArr.filter((x) => {
                          return (
                            x.status == "ON_HOLD" ||
                            x.status == "REOPENED" ||
                            x.status == "IN_PROGRESS"
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
                </Link>

                <Link
                  to="/admin/leads"
                  className="card"
                  onClick={() => {
                    setLeadArrFilterStatus("CANCELLED");
                    handleUpdateLeadsArray("CANCELLED");
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Cancel Leads</span>
                      </div>
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
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* Search Filter */}
        {/* {console.log(teamLeadsArr, "teamLeads213")} */}
        <div div className="row filter-row">
          {role != rolesObj.SPOC &&
            role != rolesObj.TEAMLEAD &&
            role != rolesObj.ACCOUNT &&
            leadArrFilterStatus == "" && (
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
                    options={teamLeadsArr.map((el, i) => {
                      // return (
                      //   <option key={i} value={el?.value}>
                      //     {el?.firstName + el?.lastName}
                      //   </option>
                      // );
                      return {
                        ...el,
                        value: el.value,
                        label: el.label,
                      };
                      // return {
                      //   ...el,
                      //   value: el._id,
                      //   label: el.firstName + " " + el.lastName,
                      // };
                    })}
                  />

                  <label className="focus-label">Filter By Team Lead </label>
                </div>
              </div>
            )}
          {/* {role != rolesObj.SPOC &&
            role != rolesObj.ACCOUNT &&
            role != rolesObj.TEAMLEAD && (
              <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                <div className="form-group form-focus select-focus">
                  <Select
                    onChange={handleFilterBySpoc}
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

                  <label className="focus-label">Filter By Spoc </label>
                </div>
              </div>
            )} */}

          {role != rolesObj.SPOC &&
            role != rolesObj.ACCOUNT &&
            leadArrFilterStatus == "" && (
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


          {leadArrFilterStatus == "" && (
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
                {/* <select className="select floating">
                <option> -- Select -- </option>
                <option> High </option>
                <option> Low </option>
                <option> Medium </option>
              </select> */}
                <label className="focus-label">Priority</label>
              </div>
            </div>
          )}
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus">
              <input
                type="date"
                // value={employeeNameQuery}
                onChange={(e) => {
                  handleFilterDateFrom(e.target.value);
                }}
                className="form-control "
              />
              <label className="focus-label">From </label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus">
              <input
                onChange={(e) => {
                  handleFilterDateTo(e.target.value);
                }}
                type="date"
                className="form-control "
              />
              <label className="focus-label">To </label>
            </div>
          </div>
        </div>
        {console.log(displayLeadsArr, "displayLeadsArrdisplayLeadsArr")}
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
                      : role == "SPOC"
                        ? columns_SPOC
                        : role == "SUPERVISOR"
                          ? columns_SUPERVISOR
                          : []
                }
                // columns={columns}
                // bordered
                dataSource={displayLeadsArr}
                rowKey={(record, index) => index}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        > */}
      {/* <div className="modal-content"> */}
      {/* <div className="modal-header">
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
            </div> */}
      {/* <div className="modal-body"> */}
      <Modal size="lg" show={show}>
        <Modal.Header>
          <Modal.Title className="d-flex justify-content-between w-75">
            {leadObj && leadObj._id ? " Edit " : " Add "}Lead
            <div >
              <Button
                variant="secondary"
                onClick={() => {
                  setShow(false);
                  clearFunc();
                }}
              >
                Close
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="col-md-12">
              <div className="form-group">
                <label>
                  Lead Subject <span className="text-danger">*</span>{" "}
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-md-6">
              {newClient ? (
                <div></div>
              ) : (
                <div>
                  <label>
                    Existing Client ({newClient ? 0 : clientArr.length})
                  </label>
                  <input
                    type={"text"}
                    onChange={(e) => {
                      setFilterClientByName(e.target.value);
                    }}
                  />
                  {clientArr.length > 0 && (
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientArr.map((client, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td
                                onClick={() =>
                                  handleClientSelection(client?._id)
                                }
                              >
                                {client?.name}
                              </td>
                              <td
                                onClick={() =>
                                  handleClientSelection(client?._id)
                                }
                              >
                                {client?.email}
                              </td>
                              <td
                                onClick={() =>
                                  handleClientSelection(client?._id)
                                }
                              >
                                {client?.phone}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                  {/* <Select
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                    classNamePrefix="select"
                    isDisabled={newClient ? "" : isDisabled}
                    isSearchable={newClient ? "" : isSearchable}
                    name="color"
                    className="select"
                    onChange={(e) => {
                      console.log(e.value, "e323s"); // setClientId(e.target.value);
                      handleClientSelection(e?.value);
                      setFilterClientByName(e.target.value);
                    }}
                    // defaultValue={(e) => {
                    //   newClient ? "" : e?.label;
                    // }}
                    // isLoading={isLoading}
                    // isClearable={isClearable}
                    // isRtl={isRtl}
                    // value={name}
                    // defaultInputValue={(e) => {
                    //   console.log(e, "ewqw");
                    //   e?.label;
                    // }}
                    options={
                      newClient
                        ? ""
                        : clientArr &&
                          clientArr.map((client, i) => {
                            return {
                              value: `${client._id}`,
                              label: `${client?.name}                            
                              ${client?.email}
                              ${client?.phone}`,
                            };
                          })
                    }
                  /> */}
                  {/*                 
                <select
                  className="select form-control"
                  value={clientId}
                  onChange={(e) => {
                    setClientId(e.target.value);
                    handleClientSelection(e.target.value);
                  }}
                >
                  <option value=""> --- Select Clients</option>
                  {newClient
                    ? 0
                    : clientArr &&
                      clientArr.map((client, i) => {
                        return (
                          <option key={i} value={client._id}>
                            {newClient
                              ? ""
                              : client.name +
                                " " +
                                client.phone +
                                " " +
                                " " +
                                client.email}
                          </option>
                        );
                      })}
                </select> */}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Name <span className="text-danger">*</span>
                </label>
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
                <label>
                  Phone <span className="text-danger">*</span>
                </label>
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
                <label>
                  Email
                </label>
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
              role != rolesObj.SPOC &&
              role != rolesObj.ACCOUNT && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      Assign to Team Lead ({teamLeadsArr.length}){" "}
                    </label>

                    <select
                      className="select form-control"
                      value={leadId}
                      onChange={(e) => {
                        handleTeamLeadChange(e.target.value);
                      }}
                    >
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

            {role != rolesObj.SPOC && role != rolesObj.ACCOUNT && (
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Assign to Spoc (
                    {agentsArr && agentsArr.length > 0 ? agentsArr.length : 0})
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <select
                    className="select form-control"
                    value={agentId}
                    onChange={(e) => {
                      handleAgentChange(e.target.value);
                    }}
                  >
                    <option value=""> --- Select Spoc</option>
                    {role == rolesObj.TEAMLEAD &&
                      agentsArr &&
                      agentsArr.map((spoc, i) => {
                        return (
                          <>
                            <option key={i} value={spoc.value}>
                              {spoc.label}
                            </option>
                          </>
                        );
                      })}
                    {role == rolesObj.ADMIN &&
                      agentsArr &&
                      agentsArr.map((spoc, i) => {
                        // console.log(spoc, i, "2132");
                        // spoc .leadId == leadId;
                        return (
                          <option key={i} value={spoc.value}>
                            {spoc.label}
                          </option>
                        );
                      })}
                    {role == rolesObj.SUPERVISOR &&
                      agentsArr &&
                      agentsArr.map((spoc, i) => {
                        // console.log(spoc, i, "2132");
                        // spoc .leadId == leadId;
                        return (
                          <option key={i} value={spoc.value}>
                            {spoc.label}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>
                Description
              </label>
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

            {/* <div className="submit-section">
              <button
                // data-bs-toggle="modal"
                onClick={(e) => handleSubmitLead(e)}
                className="btn btn-primary submit-btn"
              >
                {leadUpdateId ? "Update" : "Add"}
              </button>
            </div> */}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              clearFunc();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmitLead(e)}>
            {leadObj && leadObj._id ? " Edit " : " Add "}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showClientDetails}>
        <Modal.Header>
          <Modal.Title>Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="col-md-12">
              <div className="form-group">
                <label>
                  PassPort Number<span className="text-danger">*</span>{" "}
                </label>
                <input
                  value={passwordNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Expiry Date <span className="text-danger">*</span>
                </label>
                <input
                  value={passPortExpiryDate}
                  onChange={(e) => setPassPortExpiryDates(e.target.value)}
                  type="date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Date Of Birth <span className="text-danger">*</span>
                </label>
                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Anniversary Date <span className="text-danger">*</span>
                </label>
                <input
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  type="date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                Pen Card Image <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleFileSelectionPenCard(e);
                }}
                className="form-control"
                type="file"
                name="pencardImg"
              />
            </div>

            <div className="form-group">
              <label>
                Pass port Front Image <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleFileSelectionPassPortFront(e);
                }}
                className="form-control"
                type="file"
                name="passPortFrontImg"
              />
            </div>

            <div className="form-group">
              <label>
                Pass port back image <span className="text-danger">*</span>
              </label>
              <input
                // onChange={(e) => handleFileSelectionPassportBack(e)}
                onChange={(e) => {
                  // setFileName("passPortBackImg")
                  handleFileSelectionPassPortBack(e);
                }}
                className="form-control"
                type="file"
                name="passPortback"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowClientDetails(false);
              clearFunc();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => handleSubmitDetailsClient(e)}
          >
            Add Client Details
          </Button>
        </Modal.Footer>
      </Modal>

      <EditLead />
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
      <div className="modal custom-modal fade" id="update_agent" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Update Agent</h3>
                <p>Please Select a Spoc to assign !</p>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label>
                    Assign to Spoc (
                    {agentsArr && agentsArr.length > 0 ? agentsArr.length : 0})
                  </label>
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

          {/* <ViewCostingSheetForm
            handleLeadStatusUpdate={handleLeadStatusUpdate}
          /> */}

          {/* // const handleLeadStatusUpdate = async (id, value, status) => {} */}
          {/* <Notes show1={showNotes} setShow1={setShowNotes} /> */}
        </div>
      </div>
    </div>
  );
};

export default Leads;
