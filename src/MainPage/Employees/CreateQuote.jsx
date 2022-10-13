import React, { useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import { Link,useParams } from 'react-router-dom';
import Select from 'react-select';
import { toastError,toastSuccess } from '../../utils/toastUtils';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar_11, Avatar_08, Avatar_09, Avatar_02, Avatar_10, Avatar_05, PlaceHolder, User, Attachment } from "../../Entryfile/imagepath"
import EditLead from "../../_components/modelbox/EditLead"
import { admin, leadStatus, rolesObj } from '../../utils/roles';
import { tourGet,updateTour,deleteTour,setTour,addTour} from '../../redux/features/tour/tourSlice';
import { getById } from '../../Services/lead.service';
 const CreateQuote = () => {
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const {leadId } =  useParams();
    const tourResultObj = useSelector((state) => state.tour.tourObj);
    const toursResultArr = useSelector((state) => state.tour.tours);
    const [tourMainArr, setTourMainArr] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tourId, setTourId] = useState("");
    const [isUpdateTour, setIsUpdateTour] = useState(false);
    const [leadObj, setLeadObj] = useState({})
    
    useEffect(() => { handleInit(); }, []);


    const handleInit = () => {
      // handleGetAllLeads();
        // dispatch(tourGet());
      };

      const handleGetAllLeads = async () => {
        try {
          let { data: res } = await getById(leadId);
          if (res.success) {
            // setDisplayLeadsArr(res.data);
            setLeadObj(res.data);
            // dispatch(returnAllEmployees(res.data))
          }
        } catch (error) {
          console.error(error);
          toastError(error);
        }
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
      setPrice(tourResultObj.name);
      setDescription(tourResultObj.description);
    }
  }, [tourResultObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price == "") {
        toastError("Quote price is mandatory");
        // throw "tour name is mandatory";
      }
   
    let obj = {name,description};
    if (isUpdateTour) {
      obj.Id = tourId;
      setIsUpdateTour(false);
      dispatch(updateTour(obj));

    } else {
      
          // try {
          //   let { data: res } = await getById(leadId);
          //   if (res.success) {
          //     // setDisplayLeadsArr(res.data);
          //     setLeadObj(res.data);
          //     // dispatch(returnAllEmployees(res.data))
          //   }
          // } catch (error) {
          //   console.error(error);
          //   toastError(error);
          // }
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
              <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_Lead" onClick={() => handleEdit(row)}><i className="fa fa-pencil m-r-5" /> Edit</a>
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
    {value:'Active', label:'Active'},
    {value:'Hot', label:'Hot'},
    {value:'In Progress', label:'In Progress'},

  ]
  const options3 =[
    {value:'Honey gupta', label:'Honey gupta'},
    {value:'Me', label:'Me'},
    {value:'Mohit Bawa', label:'Mohit Bawa'},
    {value:'Deepika', label:'Deepika'},

  ]
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Create Qoute</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="container-fluid p-0">
      <div className="page-header caret_qotepage">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title"> <i className="la la-file" /> Create Quote</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Create Quote</li>
              </ul>
            </div>
            {
              role != rolesObj.SPOKE &&
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_Lead"><i className="fa fa-plus" /> Add Quote</a>
              </div>
            }
          </div>
          <div className='list_group_qoute pt-5'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='list_qoute'>
                  <ul>
                    <li><Link className="active">All</Link> </li>
                    <li><Link>Home</Link> </li>
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
              <Select options={options2} placeholder="Lead Type" />
            </div>
            <div className='col-lg-2'>
              <Select options={options3} placeholder="Agent" />
            </div>
          
          </div>
        </div>
      </div>

      <div id="add_Lead" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isUpdateTour ? "Edit":"Add"} Quote</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                      Quote Price <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Description
                      </label>
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
                      <button   data-bs-dismiss="modal"  className='btn add-btn'> {isUpdateTour ? "Update":"Save"} </button>
                    </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateQuote;