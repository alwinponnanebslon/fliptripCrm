/**
 * Signin Firebase
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_02 } from "../../Entryfile/imagepath"

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../paginationfunction"
import "../antdstyle.css"

const Promotion = () => {
  const [data, setData] = useState([
    { id: 1, image: Avatar_02, name: "John Doe", department: "Web Development", promotiondesignationfrom: "Web Developer", promotiondesignationto: "Sr Web Developer", promotiondate: "09 Jan 2019" }
  ]);
  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });

  const columns = [

    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: 'Promoted Employee',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
          <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      sorter: (a, b) => a.department.length - b.department.length,
    },

    {
      title: 'Promotion Designation From',
      dataIndex: 'promotiondesignationfrom',
      sorter: (a, b) => a.promotiondesignationfrom.length - b.promotiondesignationfrom.length,
    },

    {
      title: 'Promotion Designation To',
      dataIndex: 'promotiondesignationto',
      sorter: (a, b) => a.promotiondesignationto.length - b.promotiondesignationto.length,
    },
    {
      title: 'Promotion Date',
      dataIndex: 'promotiondate',
      sorter: (a, b) => a.promotiondate.length - b.promotiondate.length,
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_promotion"><i className="fa fa-pencil m-r-5" /> Edit</a>
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_promotion"><i className="fa fa-trash-o m-r-5" /> Delete</a>
          </div>
        </div>
      ),
    },

  ]
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Promotion - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Promotion</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Promotion</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_promotion"><i className="fa fa-plus" /> Add Promotion</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              {/* Promotion Table */}
              <Table className="table-striped"
                pagination={{
                  total: data.length,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}
                // bordered
                dataSource={data}
                rowKey={record => record.id}
              // onChange={this.handleTableChange}
              />
              {/* /Promotion Table */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Promotion Modal */}
      <div id="add_promotion" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Promotion</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Promotion For <span className="text-danger">*</span></label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Promotion From <span className="text-danger">*</span></label>
                  <input className="form-control" type="text" defaultValue="Web Developer" readOnly />
                </div>
                <div className="form-group">
                  <label>Promotion To <span className="text-danger">*</span></label>
                  <select className="select">
                    <option>Web Developer</option>
                    <option>Web Designer</option>
                    <option>SEO Analyst</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Promotion Date <span className="text-danger">*</span></label>
                  <div>
                    <input type="date" className="form-control datetimepicker" />
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
      {/* /Add Promotion Modal */}
      {/* Edit Promotion Modal */}
      <div id="edit_promotion" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Promotion</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Promotion For <span className="text-danger">*</span></label>
                  <input className="form-control" type="text" defaultValue="John Doe" />
                </div>
                <div className="form-group">
                  <label>Promotion From <span className="text-danger">*</span></label>
                  <input className="form-control" type="text" defaultValue="Web Developer" readOnly />
                </div>
                <div className="form-group">
                  <label>Promotion To <span className="text-danger">*</span></label>
                  <select className="select">
                    <option>Web Developer</option>
                    <option>Web Designer</option>
                    <option>SEO Analyst</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Promotion Date <span className="text-danger">*</span></label>
                  <div>
                    <input type="date" className="form-control datetimepicker" />
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Promotion Modal */}
      {/* Delete Promotion Modal */}
      <div className="modal custom-modal fade" id="delete_promotion" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Promotion</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Promotion Modal */}
    </div>
  );

}

export default Promotion;
