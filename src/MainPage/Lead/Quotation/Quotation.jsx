import React, { useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import { Link,useParams } from 'react-router-dom';
import Select from 'react-select';
import { Table } from 'antd';
import { toastError,toastSuccess } from '../../../utils/toastUtils';
import { useDispatch, useSelector } from 'react-redux';
import { admin, leadStatus, rolesObj } from '../../../utils/roles';
import { tourGet,updateTour,setTour} from '../../../redux/features/tour/tourSlice';
import { getById } from '../../../Services/lead.service';
import { quotationGet,setQuotationObj,quotationDelete } from '../../../redux/features/quotation/quotationSlice';
import AddQuotation from './AddQuotation';
 const Quotation = () => {
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const {leadId } =  useParams();
    const quotationStateArr = useSelector((state) => state.quotation.quotationArr);
    const toursResultArr = useSelector((state) => state.tour.tours);
    const [quotationMainArr, setTourQuotationArr] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tourId, setTourId] = useState("");
    const [isUpdateTour, setIsUpdateTour] = useState(false);
    const [leadObj, setLeadObj] = useState({})
    
    useEffect(() => { handleInit(); }, []);


    const handleInit = () => {
      
        //  handleGetAllLeads(); 
        console.log(leadId,"djklvdskljdsafdsdsfsdafkasdlfsdkf;l")
        dispatch(quotationGet(`leadId=${leadId}`));
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
        setTourQuotationArr(quotationStateArr)
         }, [quotationStateArr]) ; 
  

    const handleEdit = (row) => {

      console.log(row, "row update"); //whole object
      dispatch(setQuotationObj(row));

      dispatch(setTour(row));
    };
  
    const handleDelete = (id) => {
      dispatch(quotationDelete(id));
    };
  
    const handleSatus = (row,status) => {
    let obj = {
      Id:row._id,
      status:status
    }
   
      dispatch(updateTour(obj));
     
    };

  // useEffect(() => {
  //   if (tourResultObj) {
  //       setTourId(tourResultObj._id);
  //     setPrice(tourResultObj.name);
  //     setDescription(tourResultObj.description);
  //   }
  // }, [tourResultObj]);

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
        dataIndex: 'destinationName',
        sorter: (a, b) => a.destinationName.length - b.destinationName.length,
      },
  
      {
        title: 'Number Of Nights',
        dataIndex: 'durationOfTour',
        sorter: (a, b) => a.durationOfTour.length - b.durationOfTour.length,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount.length - b.amount.length,
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
              <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_quote" onClick={() => handleEdit(row)}><i className="fa fa-pencil m-r-5" /> Edit</a>
              <a className="dropdown-item" onClick={() => handleDelete(row._id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
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
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Create Quote</li>
              </ul>
            </div>
            {
              role != rolesObj.SPOKE &&
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_quote"><i className="fa fa-plus" /> Add Quote</a>
              </div>
            }
          </div>
          <div className='list_group_qoute pt-5'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='list_qoute'>
                  <ul>
                    <li><a className="active">All</a> </li>
                    <li><a>Home</a> </li>
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

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
        
              <Table className="table-striped"
                pagination={{
                  total: quotationMainArr.length,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  // showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={tour_columns}
                // bordered
                dataSource={quotationMainArr}
                rowKey={record => record.id}
              
              />
            </div>
          </div>
        </div>
      </div>


            <AddQuotation/>

    </div>
  )
}


export default Quotation;