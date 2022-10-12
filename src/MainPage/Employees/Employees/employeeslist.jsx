
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { Avatar_02, Avatar_05, Avatar_11, Avatar_12, Avatar_09, Avatar_10, Avatar_13 } from "../../../Entryfile/imagepath"
import Editemployee from "../../../_components/modelbox/Editemployee"
import Addemployee from "../../../_components/modelbox/Addemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees, returnAllEmployees } from '../../../redux/features/employee/employeeSlice';
import { deleteEmployees, getEmployess } from '../../../Services/user.service';
import { rolesObj } from '../../../utils/roles';

const Employeeslist = () => {







  const employees = useSelector(getAllEmployees)
  const [menu, setMenu] = useState(false)
  const [employeeArr, setEmployeeArr] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [displayEmployeeArr, setDisplayEmployeeArr] = useState([]);
  const [employeeIdQuery, setEmployeeIdQuery] = useState("");
  const [employeeNameQuery, setEmployeeNameQuery] = useState("");
  const [employeeRoleQuery, setEmployeeRoleQuery] = useState("");

  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);

  const dispatch = useDispatch()
  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });

  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployess(userObj._id, role)
      if (res.success) {
        console.log(res, "res")
        dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }


  const handleEmployeeDelete = async () => {
    try {

      console.log(selectedEmployee, "setSelectedEmployee")
      let { data: res } = await deleteEmployees(selectedEmployee._id)
      if (res.success) {
        handleGetAllEmployees()
        // console.log(res, "res")
        // dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }



  useEffect(() => {
    handleGetAllEmployees()
  }, [])


  useEffect(() => {
    if (employees && employees.length > 0) {
      setEmployeeArr(employees)
      setDisplayEmployeeArr(employees)
    }
  }, [employees])


  const handleFilterByEmployeeId = (query) => {
    setEmployeeIdQuery(query)
    let tempArr = employeeArr.filter(el => `${el.employeeId}`.toLowerCase().includes(query.toLowerCase()))
    setDisplayEmployeeArr([...tempArr])
  }


  const handleFilterByEmployeeName = (query) => {
    setEmployeeNameQuery(query)
    let tempArr = employeeArr.filter(el => `${el.firstName} ${el.lastName}`.toLowerCase().includes(query.toLowerCase()))
    setDisplayEmployeeArr([...tempArr])
  }

  const handleFilter = () => {
    let tempArr = employeeArr.filter(el => el.role == employeeRoleQuery)
    setDisplayEmployeeArr([...tempArr])
  }


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
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to={`/app/profile/employee-profile/${record._id}`} className="avatar"><img alt="" src={Avatar_02} /></Link>
          <Link to={`/app/profile/employee-profile/${record._id}`}>{record?.firstName} {record?.lastName} </Link>
        </h2>
      ),
      sorter: (a, b) => a.firstName - b.firstName,
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: 'Mobile',
      dataIndex: 'phone',
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },

    {
      title: 'Date Of Joining',
      render: (text, record) => (
        <a className="dropdown-item" href="#">{new Date(text.doj).toDateString()}</a>
      ),
    },
    {
      title: 'Role',
      render: (text, record) => (
        <a className="dropdown-item" href="#">{text.role}</a>
      ),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
            <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_employee" onClick={() => setSelectedEmployee(record)} ><i className="fa fa-trash-o m-r-5" /> Delete</a>
          </div>
        </div>
      ),
    },
  ]
  return (

    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Employeeslist - CRM created by Fliptrip Holidays</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Employee</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Employee</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" /> Add Employee</a>
                <div className="view-icons">
                  <Link to="/app/employee/allemployees" className="grid-view btn btn-link"><i className="fa fa-th" /></Link>
                  <Link to="/app/employee/employees-list" className="list-view btn btn-link active"><i className="fa fa-bars" /></Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input value={employeeIdQuery} onChange={(e) => handleFilterByEmployeeId(e.target.value)} type="text" className="form-control floating" />
                <label className="focus-label">Employee ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input value={employeeNameQuery} onChange={(e) => handleFilterByEmployeeName(e.target.value)} type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            {/* <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus select-focus">
                <label className="focus-label">Designation</label>
                <select value={employeeRoleQuery} onChange={(e) => setEmployeeRoleQuery(e.target.value)} className="select floating">
                  <option>Select Role</option>
                  <option value={rolesObj.SPOKE}>{rolesObj.SPOKE}</option>
                  <option value={rolesObj.TEAMLEAD}>{rolesObj.TEAMLEAD}</option>
                </select>
              </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-3">
                <a className="btn btn-success btn-block w-100" onClick={() => handleFilter()}> Search </a>
              </div> */}
          </div>
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table className="table-striped"
                  pagination={{
                    total: displayEmployeeArr.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: 'auto' }}
                  columns={columns}
                  // bordered
                  dataSource={displayEmployeeArr}
                  rowKey={record => record.id}
                  onChange={console.log("change")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Employee Modal */}
        <Addemployee />
        {/* /Add Employee Modal */}
        {/* Edit Employee Modal */}
        <Editemployee />
        {/* /Edit Employee Modal */}
        {/* Delete Employee Modal */}
        <div className="modal custom-modal fade" id="delete_employee" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Employee</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a data-bs-dismiss="modal" onClick={() => handleEmployeeDelete()} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Employee Modal */}
      </div>
    </div>
  );
}

export default Employeeslist;
