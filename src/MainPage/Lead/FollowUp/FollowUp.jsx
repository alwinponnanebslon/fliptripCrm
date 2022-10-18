import React, { useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import { admin, leadStatus, rolesObj } from '../../../utils/roles';
import { tourGet,updateTour,deleteTour,setTour,addTour } from '../../../redux/features/tour/tourSlice';
import AddFolowUp from './AddFolowUp';

export const QuotationFollowup = () => {
    const role = useSelector((state) => state.auth.role);

    const dispatch = useDispatch();
    const tourResultObj = useSelector((state) => state.tour.tourObj);
    const toursResultArr = useSelector((state) => state.tour.tours);
    const [tourMainArr, setTourMainArr] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tourId, setTourId] = useState("");
    const [isUpdateTour, setIsUpdateTour] = useState(false);
    
    useEffect(() => { handleInit(); }, []);


    const handleInit = () => {
        dispatch(tourGet());
      };

      useEffect(() => {
            setTourMainArr(toursResultArr)
         }, [toursResultArr]) ; 
  

    const handleEdit = (row) => {

      console.log(row, "row update"); //whole object
      setIsUpdateTour(true);

      dispatch(setTour(row));
    };
  
    const handleTourDelete = (id) => {
      dispatch(deleteTour(id));
    };
  
    const handleSatus = (row,status) => {
    let obj = {
      Id:row._id,
      status:status
    }
   
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
   
    let obj = {name,description};
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
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
  
      {
        title: 'Description',
        dataIndex: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (row, record) => (
          <div className="dropdown">
            <a href="#" className="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i className={record.status ===true ? "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger"} /> {record.status ?'Active':'Inactive'} </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#" onClick={() => handleSatus(record,true)} ><i className="fa fa-dot-circle-o text-success" /> Active</a>
              <a className="dropdown-item" href="#" onClick={() => handleSatus(record,false)}><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
            </div>
          </div>
        ),
      },
      {
        title: 'Action',
        render: (row, record) => (
          <div className="dropdown dropdown-action text-end">
            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_followup" onClick={() => handleEdit(row)}><i className="fa fa-pencil m-r-5" /> Edit</a>
              <a className="dropdown-item" onClick={() => handleTourDelete(row._id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
            </div>
          </div>
        ),
      },
    ];
  
    const options = [
        { value: 'Goa', label: 'Goa' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Bali', label: 'Bali' },
        { value: 'Switzerland', label: 'Switzerland' },
     
      ]
      const options1= [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September	', label: 'September	' },
        { value: 'October	', label: 'October	' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
      ]
      const options2 =[
        {value:'Still dreaming not sure Im going to take this trip', label:'Still dreaming  not sure Im going to take this trip'},
        {value:'Im definitely goingI know which place let go!', label:'Im definitely goingI know which place let go!'},
        {value:'In Progress', label:'In Progress'},
    
      ]
      const options3 =[
        {value:'Active', label:'Active'},
        {value:'Hot', label:'Me'},
        {value:'in progrees', label:'in progrees'},
        {value:'Book Know', label:'Book Know'},
    
      ]
      const options4 =[
        {value:'Active', label:'Active'},
        {value:'Hot', label:'Me'},
        {value:'in progrees', label:'in progrees'},
        {value:'Book Know', label:'Book Know'},
    
      ]
      const options5 =[
        {value:'Active', label:'Active'},
        {value:'Hot', label:'Me'},
        {value:'in progrees', label:'in progrees'},
        {value:'Book Know', label:'Book Know'},
    
      ]
      const options6 =[
        {value:'Active', label:'Active'},
        {value:'Hot', label:'Me'},
        {value:'in progrees', label:'in progrees'},
        {value:'Book Know', label:'Book Know'},
    
      ]
 return (
    <div className="page-wrapper">
      <Helmet>
        <title>Create Qoute</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className='container-fluid p-0'>
      <div className="page-header caret_qotepage">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title"> <i className="la la-file-text-o" /> Quotation Followup</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Quotation Followup</li>
              </ul>
            </div>
            {
              role != rolesObj.SPOKE &&
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_followup"><i className="fa fa-plus" /> Add Lead</a>
              </div>
            }
          </div>
          <div className='list_group_qoute pt-5'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='list_qoute'>
                  <ul>
                    <li><Link className="active">All</Link> </li>
                    <li><Link>Pending Followup</Link> </li>
                    <li><Link>Phone no. released</Link> </li>
                    <li><Link>Reminders</Link> </li>
                    <li><Link>Reminders</Link> </li>
                    <li><Link>My Hot</Link> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='drp-area'>
          <div className='row'>
            <div className='col-lg-2'>
                <Select options={options} placeholder="Destinations "/>
            </div>
            <div className='col-lg-2'>
              <Select options={options1}  placeholder="Month of Travel"/>
            </div>
            <div className='col-lg-2'>
              <Select options={options2} placeholder="Trip Stage" />
            </div>
            <div className='col-lg-2'>
              <Select options={options3} placeholder="Lead Type" />
            </div>
            <div className='col-lg-2'>
              <Select options={options4} placeholder="Followed UP" />
            </div>
            <div className='col-lg-2'>
              <Select options={options5} placeholder="agents" />
            </div>
            <div className='row mt-2'>
                <div className='col-lg-2'>
                <Select options={options6} placeholder="No Followup" />
                </div>
                <div className='col-lg-2'>
                <Select options={options6} placeholder="Special Leads" />
                </div>
                <div className='col-lg-2'>
                <Select options={options6} placeholder="Follow-up eligibility" />
                </div>
            </div>
            
          </div>
        </div>
            <AddFolowUp />

      </div>
    </div>
    
  )
}
export default QuotationFollowup;