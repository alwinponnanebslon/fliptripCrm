import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_07 } from "../../Entryfile/imagepath";
import Editclient from "../../_components/modelbox/Editclient";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import {
  tourGet,
  updateTour,
  deleteTour,
  setTour,
  addTour,
} from "../../redux/features/tour/tourSlice";

const ViewDestination = () => {
  const dispatch = useDispatch();
  const tourResultObj = useSelector((state) => state.tour.tourObj);
  const toursResultArr = useSelector((state) => state.tour.tours);
  const [tourMainArr, setTourMainArr] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tourId, setTourId] = useState("");
  const [isUpdateTour, setIsUpdateTour] = useState(false);

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = () => {
    dispatch(tourGet());
  };

  useEffect(() => {
    setTourMainArr(toursResultArr);
  }, [toursResultArr]);

  const handleEdit = (row) => {
    // // console.log(row, "row update"); //whole object
    setIsUpdateTour(true);

    dispatch(setTour(row));
  };

  const handleTourDelete = (id) => {
    dispatch(deleteTour(id));
  };

  const handleSatus = (row, status) => {
    let obj = {
      Id: row._id,
      status: status,
    };

    dispatch(updateTour(obj));
  };

  useEffect(() => {
    if (tourResultObj) {
      setTourId(tourResultObj._id);
      setName(tourResultObj.name);
      setDescription(tourResultObj.description);
    }
  }, [tourResultObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name == "") {
      toastError("Tour Name is mandatory");
      // throw "tour name is mandatory";
    }

    let obj = { name, description };
    if (isUpdateTour) {
      obj.Id = tourId;
      setIsUpdateTour(false);
      dispatch(updateTour(obj));
    } else {
      dispatch(addTour(obj));
    }
  };
  const tour_columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (row, record) => (
        <div className="dropdown">
          <a
            href="#"
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                record.status === true
                  ? "fa fa-dot-circle-o text-success"
                  : "fa fa-dot-circle-o text-danger"
              }
            />{" "}
            {record.status ? "Active" : "Inactive"}{" "}
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSatus(record, true)}
            >
              <i className="fa fa-dot-circle-o text-success" /> Active
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSatus(record, false)}
            >
              <i className="fa fa-dot-circle-o text-danger" /> Inactive
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      render: (row, record) => (
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
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#add_destination"
              onClick={() => handleEdit(row)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleTourDelete(row._id)}
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
        <title>Clients - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Destinations</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Destinations</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_destination"
              >
                <i className="fa fa-plus" /> Add Destination
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        {/* <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Client ID</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Client Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option>Select Company</option>
                <option>Global Technologies</option>
                <option>Delta Infotech</option>
              </select>
              <label className="focus-label">Company</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <a href="#" className="btn btn-success btn-block w-100"> Search </a>
          </div>
        </div> */}
        {/* Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: tourMainArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={tour_columns}
                // bordered
                dataSource={tourMainArr}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Client Modal */}
      <div
        id="add_destination"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isUpdateTour ? "Edit" : "Add"} Destination
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
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Tour Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                <div className="col-12">
                  <button data-bs-dismiss="modal" className="btn add-btn">
                    {" "}
                    {isUpdateTour ? "Update" : "Save"}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDestination;
