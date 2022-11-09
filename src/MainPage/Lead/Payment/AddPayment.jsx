import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import { quotationGet } from '../../../redux/features/quotation/quotationSlice';

export const AddPayment = () => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);
    const quotationStateArr = useSelector((state) => state.quotation.quotationArr);
    const [quotationArr, setQuotationArr] = useState([]);
    const { leadId } = useParams();
    const [selectedQuotation, setSelectedQuotation] = useState({});
    const [isQuotationapproved, setIsQuotationapproved] = useState(false);


    const [flightCharges, setFlightCharges] = useState(0);
    const [landCharges, setLandCharges] = useState(0);
    const [tcs, setTcs] = useState(0);
    const [total, setTotal] = useState(0);


    const [emiArr, setEmiArr] = useState([
        {
            date: new Date(),
            amount: 0,
            amountRecieved: 0,
            revivedOn: new Date()
        }
    ]);

    useEffect(() => { handleInit(); }, []);


    const handleInit = () => {
        dispatch(quotationGet(`leadId=${leadId}`));
    };





    useEffect(() => {

        let total = parseInt(flightCharges) + parseInt(landCharges) + parseInt(tcs)
        setTotal(total)

    }, [flightCharges, landCharges, tcs]);



    useEffect(() => {
        if (quotationStateArr) {
            let tempObj = quotationStateArr.find(el => el.status == "Approved");
            if (tempObj) {
                setIsQuotationapproved(true);
                setSelectedQuotation(tempObj)
                setFlightCharges(tempObj?.perPersonAirPortPrice ? tempObj?.perPersonAirPortPrice : 0)
                setLandCharges(tempObj?.perPersonLandPrice ? tempObj?.perPersonLandPrice : 0)
            }
            else {
                setIsQuotationapproved(false);
                setSelectedQuotation({})
            }


            setQuotationArr([...quotationStateArr]);
        }

    }, [quotationStateArr])

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
                            <h3 className="page-title"> <i className="la la-file-text-o" />Payment Details</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Payment Details</li>
                            </ul>
                        </div>
                    </div>
                </div>


                {
                    isQuotationapproved ?
                        <div className="modal-body">
                            <div style={{ fontSize: 19 }}>Quotation Details</div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Quotation Name</label>
                                        <input className="form-control" value={`${selectedQuotation?.destinationName}`} disabled type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Number Of Guest<span className="text-danger">*</span></label>
                                        <input className="form-control" value={selectedQuotation?.numberOfGuest} disabled type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Duration Of Tour <span className="text-danger">*</span></label>
                                        <input className="form-control" value={selectedQuotation?.durationOfTour} disabled type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Status</label>
                                        <input className="form-control" disabled value={selectedQuotation?.status} type="text" />
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div style={{ fontSize: 19 }}>Payment Details</div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Flight Price</label>
                                        <input className="form-control" value={flightCharges} disabled onChange={(e) => setFlightCharges(e.target.value)} type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Land Price<span className="text-danger">*</span></label>
                                        <input className="form-control" value={landCharges} disabled onChange={(e) => setLandCharges(e.target.value)} type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">TCS <span className="text-danger">*</span></label>
                                        <input className="form-control" value={tcs} onChange={(e) => setTcs(e.target.value)} type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Total</label>
                                        <input className="form-control" disabled value={total} type="number" />
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div style={{ fontSize: 19 }}>Emi Details</div>



                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Save</button>
                            </div>
                        </div>
                        :

                        <div className="modal-body">
                            <div>Please get a quotation approved to view</div>
                        </div>
                }
            </div>
        </div>
    )
}


export default AddPayment;