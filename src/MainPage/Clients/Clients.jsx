import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import {
  clientAdd,
  clientGet,
  setclientObj,
  clientUpdate,
  clientDelete,
} from "../../redux/features/client/clientSlice";
import { getClientFilterByDate } from "../../Services/client.service.js";

import { toastError, toastSuccess } from "../../utils/toastUtils";

import AddClient from "./AddClient";

const Clients = () => {
  const role = useSelector((state) => state.auth.role);
  const auth = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });
  const userAuthorise = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const clientResultArr = useSelector((state) => state?.client.clientArr);
  const [clientMainArr, setClientMainArr] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tourId, setTourId] = useState("");
  const [isUpdateTour, setIsUpdateTour] = useState(false);
  const [clientName, setClientName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clientNameQuery, setClientNameQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = () => {
    dispatch(clientGet(userId));
  };

  useEffect(() => {
    // console.log(clientResultArr, "clientResultArr241");
    setClientMainArr(clientResultArr);
  }, [clientResultArr]);

  const handleEdit = (row) => {
    // // console.log(row, "row update"); //whole object

    dispatch(setclientObj(row));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(clientDelete(id));
  };

  const handleSatus = (row, status) => {
    let obj = {
      Id: row._id,
      status: status,
    };

    dispatch(clientUpdate(obj));
  };

  const tour_columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => (
        <h2 className="table-avatar">
          <div>{record?.email}</div>
        </h2>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (row, record) => (
    //     <div className="dropdown">
    //       <a href="#" className="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    //         <i className={record.status ===true ? "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger"} /> {record.status ?'Active':'Inactive'} </a>
    //       <div className="dropdown-menu">
    //         <a className="dropdown-item" href="#" onClick={() => handleSatus(record,true)} ><i className="fa fa-dot-circle-o text-success" /> Active</a>
    //         <a className="dropdown-item" href="#" onClick={() => handleSatus(record,false)}><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Action",
      render: (row, record) => (
        <div className="d-flex">
          <a
            className="dropdown-item"
            // data-bs-toggle="modal"
            // data-bs-target="#add_client"
            onClick={() => handleEdit(row)}
          >
            <i className="fa fa-pencil m-r-5" /> Edit
          </a>
          <a className="dropdown-item" onClick={() => handleDelete(row._id)}>
            <i className="fa fa-trash-o m-r-5" /> Delete
          </a>
        </div>
      ),
    },
  ];

  // const handleGetClientByName = (name) => {
  //   // console.log("pouiop");
  //   if (name) {
  //     console.log(name, "name12");
  //     dispatch(clientGet(name));
  //   }
  // };

  // useEffect(() => {
  //   // console.log(clientName, "clientName3qs");
  //   handleGetClientByName(clientName);
  // }, [clientName]);

  const handleFilterByClientName = (query) => {
    setClientNameQuery(query);
    let tempArr = clientResultArr.filter((el) =>
      `${el.name}`.toLowerCase().includes(query.toLowerCase())
    );
    setClientMainArr([...tempArr]);
  };

  const handleFilterDateFrom = async (query) => {
    setDateFrom(new Date(query).toISOString());
  };

  const handleFilterDateFromAndTo = async () => {
    if (dateTo != "" && dateFrom != "") {
      if (Date.parse(dateFrom) > Date.parse(dateTo)) {
        toastError("In valid date");
      } else {
        let getfilterLead = await getClientFilterByDate(
          dateFrom,
          dateTo,
          role,
          userAuthorise?.user?._id
        );
        // console.log(getfilterLead.data.data, "getfilterLeadw4");
        // setDisplayLeadsArr(getfilterLead.data.data);
        // setLeadsArr(getfilterLead.data.data);
        setClientMainArr(getfilterLead.data.data);
      }
    }
  };

  useEffect(() => {
    handleFilterDateFromAndTo();
  }, [dateFrom, dateTo]);

  const handleFilterDateTo = async (query) => {
    setDateTo(new Date(query).toISOString());
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Clients - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Clients</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Clients</li>
              </ul>
            </div>

            <div className="col-auto float-end ml-auto">
              <a
                href="#"
                className="btn add-btn"
                // data-bs-toggle="modal"
                // data-bs-target="#add_client"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <i className="fa fa-plus" /> Add Client
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          {/* <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Client ID</label>
            </div>
          </div> */}
          {/* <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              />
              <label className="focus-label">Client Name2</label>
            </div>
          </div> */}
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                value={clientNameQuery}
                Client
                onChange={(e) => handleFilterByClientName(e.target.value)}
                type="text"
                className="form-control floating"
              />
              <label className="focus-label">Client Name-</label>
            </div>
          </div>
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
                // value={employeeNameQuery}
                onChange={(e) => {
                  handleFilterDateTo(e.target.value);
                }}
                type="date"
                className="form-control "
              />
              <label className="focus-label">To </label>
            </div>
          </div>
          {/* <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option>Select Company</option>
                <option>Global Technologies</option>
                <option>Delta Infotech</option>
              </select>
              <label className="focus-label">Company</label>
            </div>
          </div> */}
          {/* <div className="col-sm-6 col-md-3">
            <a href="#" className="btn btn-success btn-block w-100">
              Search
            </a>
          </div> */}
        </div>
        {/* Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: clientMainArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={tour_columns}
                // bordered
                dataSource={clientMainArr}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* /Page Content */}
      {/* Add Client Modal */}
      <AddClient show={showModal} setShowModal={setShowModal} />

      {/* /Add Client Modal */}
    </div>
  );
};

export default Clients;
