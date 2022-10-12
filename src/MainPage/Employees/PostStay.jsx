import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Select from 'react-select';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar_11, Avatar_08, Avatar_09, Avatar_02, Avatar_10, Avatar_05, PlaceHolder, User, Attachment } from "../../Entryfile/imagepath"
import EditLead from "../../_components/modelbox/EditLead"
import { admin, leadStatus, rolesObj } from '../../utils/roles';

export const PostStay = () => {
    const role = useSelector((state) => state.auth.role);
    const options = [
        { value: 'Goa', label: 'Goa' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Bali', label: 'Bali' },
        { value: 'Switzerland', label: 'Switzerland' },
     
      ]
    
      const [startDate, setStartDate] = useState(new Date());
      const [startDate1, setStartDate1] = useState(new Date());
  return (
    <div className="page-wrapper">
    <Helmet>
      <title>Post Stay</title>
      <meta name="description" content="Login page" />
    </Helmet>
    <div className='container-fluid p-0'>
    <div className="page-header caret_qotepage">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title"> <i className="la la-file-text-o" /> Post Stay</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">Post Stay</li>
            </ul>
          </div>
          {
            role != rolesObj.SPOKE &&
            <div className="col-auto float-end ml-auto">
              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_Lead"><i className="fa fa-plus" /> Add Lead</a>
            </div>
          }
        </div>
        <div className='list_group_qoute pt-5'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='list_qoute'>
                <ul>
                  <li><Link to='/' className="active">All</Link> </li>
                  <li><Link to='/'>Good Reviews</Link> </li>
                  <li><Link to='/'>Bad Reviews</Link> </li>
                  <li><Link to='/'>Review Not received</Link> </li>
                  
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
     
          <div className='col-lg-3'>
            <div className='d-flex align-items-center'>
              <span className='mx-2'>From</span>
              <div className='box_date'>
              <span class="input-icon"></span><img src={'../../../src/assets/img/calendar.svg'} width={20} height={20} alt="" />
               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  />
              </div>
            </div>
          </div> 

          <div className='col-lg-3'>
            <div className='d-flex align-items-center'>
              <span className='mx-2'>To</span>
              <div className='box_date'>
              <span class="input-icon"></span><img src={'../../../src/assets/img/calendar.svg'} width={20} height={20} alt="" /> 
              <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)}  />
              </div>
            </div>
          </div> 
         
         
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default PostStay;