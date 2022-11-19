import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { quotationGet } from "../../../redux/features/quotation/quotationSlice";
import { toastError } from "../../../utils/toastUtils";
import {
  paymentAdd,
  paymentGetByQuotation,
  paymentUpdate,
} from "../../../redux/features/payment/paymentSlice";
import {
  addPaymentInvoice,
  deletePaymentInvoice,
  paymentInvoiceGet,
  setPaymentInvoice,
  updatePaymentInvoice,
} from "../../../redux/features/paymentInvoice/paymentInvoiceSlice";

export const AddPayment = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const quotationStateArr = useSelector(
    (state) => state.quotation.quotationArr
  );
  const payMentInvoiceArr = useSelector(
    (state) => state.paymentInvoice.paymentInvoices
  );
  const quotationPaymentObj = useSelector((state) => state.payment.paymentObj);
  const perfomaInvoiceObj = useSelector(
    (state) => state.paymentInvoice.paymentInvoiceObj
  );
  const [quotationArr, setQuotationArr] = useState([]);
  const { leadId } = useParams();
  const [selectedQuotation, setSelectedQuotation] = useState({});
  const [isQuotationapproved, setIsQuotationapproved] = useState(false);
  const [quotationId, setQuotationId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentObj, setPaymentObj] = useState();

  const [flightCharges, setFlightCharges] = useState(0);
  const [landCharges, setLandCharges] = useState(0);
  const [tcs, setTcs] = useState(1);
  const [total, setTotal] = useState(0);
  const [paymentReceviedArr, setPaymentReceviedArr] = useState([
    {
      receviedDate: new Date(),
      installmentAmount: 0,
      transferStatus: "",
      transferAmount: 0,
      status: "Pending",
    },
  ]);

  const [perfomaInvoiceArr, setPerfomaInvoiceArr] = useState([]);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDescription, setInvoiceDescription] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState(1);
  const [invoiceId, setInvoiceId] = useState("");

  const [emiArr, setEmiArr] = useState([
    {
      date: new Date(),
      amount: 0,
      amountRecieved: 0,
      revivedOn: new Date(),
    },
  ]);

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    console.log(quotationStateArr, "quotationStateArr");
  }, [quotationStateArr]);

  const handleInit = () => {
    dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    console.log(quotationPaymentObj, "q32uotationPaymentObj");
    setPaymentObj(quotationPaymentObj);
  }, [quotationPaymentObj]);

  useEffect(() => {
    if (paymentObj) {
      setFlightCharges(paymentObj?.flightPrice);
      setLandCharges(paymentObj?.landPrice);
      setTcs(paymentObj?.tcs);
      setTotal(paymentObj?.total);
      setPaymentReceviedArr(paymentObj?.paymentReceviedArr);
      setPaymentId(paymentObj?._id);
    }
  }, [paymentObj]);

  useEffect(() => {
    let total = parseInt(flightCharges) + parseInt(landCharges) + parseInt(tcs);
    setTotal(total);
  }, [flightCharges, landCharges, tcs]);

  useEffect(() => {
    if (quotationStateArr) {
      let tempObj = quotationStateArr.find((el) => el.status == "Approved");
      if (tempObj) {
        setIsQuotationapproved(true);
        setSelectedQuotation(tempObj);
        setFlightCharges(
          tempObj?.perPersonAirPortPrice
            ? tempObj?.perPersonAirPortPrice * tempObj?.numberOfGuest
            : 0
        );
        setLandCharges(
          tempObj?.perPersonLandPrice
            ? tempObj?.perPersonLandPrice * tempObj?.numberOfGuest
            : 0
        );
        setQuotationId(tempObj._id);
        // console.log(tempObj, "quotationId")
        dispatch(paymentGetByQuotation(tempObj?._id));
        dispatch(paymentInvoiceGet(`quotationId=${tempObj?._id}`));
      } else {
        setIsQuotationapproved(false);
        setSelectedQuotation({});
      }

      setQuotationArr([...quotationStateArr]);
    }
  }, [quotationStateArr]);

  const handleAddPaymentReceviedRow = () => {
    const list = [...paymentReceviedArr];
    list.push({
      receviedDate: moment(new Date()).format("YYYY-MM-DD"),
      installmentAmount: 0,
      transferStatus: "",
      transferAmount: 0,
      status: "Pending",
    });
    setPaymentReceviedArr(list);
  };

  const handlePaymentInput = (e, index) => {
    const { name, value } = e.target;
    // console.log(name, value)
    if (name == "installmentAmount") {
      if (value > total || value <= 0) {
        toastError(
          "Ammount must be greate than zero ot less than total Amount"
        );
      }
    }
    let list = [...paymentReceviedArr];
    // console.log(list[index], "paymentReceviedArr")

    // list[index][name] = value;
    setPaymentReceviedArr((pr) =>
      pr.map((el, i) => (i == index ? { ...el, [name]: value } : el))
    );
  };

  const handleRemovePaymentRow = (index) => {
    const list = [...paymentReceviedArr];
    list.splice(index, 1);
    setPaymentReceviedArr(list);
  };

  const handleSubmit = () => {
    const validation = paymentReceviedArr.every(
      (item) => item.installmentAmount
    );
    let sum = paymentReceviedArr.reduce(
      (accumulator, curValue) =>
        accumulator + parseInt(curValue.installmentAmount),
      0
    );
    if (!validation) {
      toastError("Please fill all  installmentAmount ");
      return;
    }

    if (sum > total) {
      toastError("installmentAmount must be  less than or equal to total");
      return;
    }

    let obj = {
      leadId,
      quotationId,
      flightPrice: flightCharges,
      landPrice: landCharges,
      tcs,
      total,
      paymentReceviedArr,
      createdby: user,
    };
    if (paymentId) {
      obj.paymentId = paymentId;
      dispatch(paymentUpdate(obj));
    } else {
      dispatch(paymentAdd(obj));
    }
  };

  //  Payment Invoice Crud

  const handlePaymentEdit = (row) => {
    dispatch(setPaymentInvoice(row));
  };

  const handlePaymentDelete = (id) => {
    dispatch(deletePaymentInvoice(id));
  };

  useEffect(() => {
    setPerfomaInvoiceArr(payMentInvoiceArr);
  }, [payMentInvoiceArr]);

  useEffect(() => {
    if (perfomaInvoiceObj) {
      setInvoiceId(perfomaInvoiceObj._id);
      setInvoiceAmount(perfomaInvoiceObj.invoiceAmount);
      setInvoiceDescription(perfomaInvoiceObj.invoiceDescription);
      setInvoiceNo(perfomaInvoiceObj.invoiceNo);
      setInvoiceDate(
        moment(perfomaInvoiceObj.invoiceDate).format("YYYY-MM-DD")
      );
    }
  }, [perfomaInvoiceObj]);

  const handlePerfomaInvoiceSubmit = (e) => {
    e.preventDefault();
    if (invoiceNo == "") {
      toastError("invoiceNo  is mandatory");
      return;
      // throw "tour name is mandatory";
    }

    if (invoiceDescription == "") {
      toastError("invoiceDescription  is mandatory");
      return;
      // throw "tour name is mandatory";
    }

    if (invoiceAmount == "") {
      toastError("invoiceAmount  is mandatory");
      return;
      // throw "tour name is mandatory";
    }

    if (invoiceDate == "") {
      toastError("invoiceDate  is mandatory");
      return;
      // throw "tour name is mandatory";
    }

    let obj = {
      leadId,
      quotationId,
      invoiceNo,
      invoiceDate,
      invoiceDescription,
      invoiceAmount,
    };
    // console.log(obj)

    if (invoiceId) {
      obj.Id = invoiceId;
      dispatch(updatePaymentInvoice(obj));
    } else {
      obj.createdby = user;
      dispatch(addPaymentInvoice(obj));
    }
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="container-fluid p-0">
        <div className="page-header caret_qotepage">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">
                {" "}
                <i className="la la-file-text-o" />
                Payment Details
              </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Payment Details</li>
              </ul>
            </div>
          </div>
        </div>

        {isQuotationapproved ? (
          <div className="modal-body">
            <div style={{ fontSize: 19 }}>
              Quotation Details{" "}
              <Link
                to={`/admin/lead/${leadId}/viewquotePayment`}
                className="btn btn-primary"
              >
                View Payment
              </Link>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="col-form-label">
                    Quotation Name : {selectedQuotation?.destinationName}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="col-form-label">
                    Number Of Guest : {selectedQuotation?.numberOfGuest}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="col-form-label">
                    Duration Of Tour: {selectedQuotation?.durationOfTour}{" "}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="col-form-label">
                    Status:{selectedQuotation?.status}
                  </label>
                </div>
              </div>
            </div>
            <hr />

            <div style={{ fontSize: 19 }}>Payment Details</div>

            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="col-form-label">Flight Price</label>
                  <br />
                  <label className="col-form-label">
                    Land Price<span className="text-danger">*</span>
                  </label>
                  <br />
                  <label className="col-form-label mt-4">
                    TCS <span className="text-danger">*</span>
                  </label>
                  <br />

                  <label className="col-form-label mt-3">TOTAL</label>
                  <br />
                </div>
              </div>
              <div className="col-sm-4">
                {/* <input className="form-control" value={flightCharges} disabled onChange={(e) => setFlightCharges(e.target.value)} type="number" /> */}
                {/* <input className="form-control mt-2" value={landCharges} disabled onChange={(e) => setLandCharges(e.target.value)} type="number" /> */}
                <p>Rs. {flightCharges}</p>
                <p>Rs. {landCharges}</p>

                <input
                  className="form-control mt-2"
                  value={tcs}
                  onChange={(e) => setTcs(e.target.value)}
                  type="number"
                />
                <p className="mt-5">Rs. {total}</p>
              </div>
            </div>
            <hr />

            <div style={{ fontSize: 19 }}>Payment Received Details</div>

            <div className="row">
              <div className="col-md-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Receiving Date</th>
                      <th scope="col">Installment Amount</th>
                      <th scope="col">Amount Transfer/ Status</th>
                      <th scope="col">Transferable to You</th>
                      <th scope="col">Mark Payment</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentReceviedArr &&
                      paymentReceviedArr.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <input
                              type="date"
                              min={moment(new Date()).format("YYYY-MM-DD")}
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                              name="receviedDate"
                              value={moment(item.receviedDate).format(
                                "YYYY-MM-DD"
                              )}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="installmentAmount"
                              value={item.installmentAmount}
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                            />{" "}
                          </td>
                          <td>
                            <input
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                              name="transferStatus"
                              value={item.transferStatus}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="transferAmount"
                              value={item.transferAmount}
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                            />{" "}
                          </td>

                          <td>
                            <select
                              value={item.status}
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                              name="status"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Marked">Marked</option>
                            </select>
                          </td>
                          <td>
                            {index > 0 && (
                              <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                  handleRemovePaymentRow(index);
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="col-md-12">
                  <button
                    className="btn btn-primary"
                    onClick={handleAddPaymentReceviedRow}
                  >
                    <i className="fa fa-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>

            <div className="submit-section">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Payment
              </button>
            </div>

            <div style={{ fontSize: 19 }}>Perfoma Invoice</div>

            <div className="row">
              <div className="col-md-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col"> Date</th>
                      <th scope="col">Invoice No.</th>
                      <th scope="col">Description</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfomaInvoiceArr &&
                      perfomaInvoiceArr.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {moment(item.invoiceDate).format("YYYY-MM-DD")}
                          </td>
                          <td>{item.invoiceNo}</td>
                          <td>{item.invoiceDescription}</td>
                          <td>{item.invoiceAmount}</td>

                          <td>
                            {
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
                                    onClick={() => handlePaymentEdit(item)}
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    onClick={() =>
                                      handlePaymentDelete(item._id)
                                    }
                                  >
                                    <i className="fa fa-trash-o m-r-5" /> Delete
                                  </a>
                                </div>
                              </div>
                            }
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="col-md-12">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#add_destination"
                  >
                    <i className="fa fa-plus" /> Add Invoice
                  </button>
                </div>
              </div>
            </div>

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
                    <h5 className="modal-title"> Invoice</h5>
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
                          Invoice No <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control"
                            value={invoiceNo}
                            onChange={(e) => setInvoiceNo(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Invoice Date
                        </label>
                        <div className="col-md-10">
                          <input
                            type="date"
                            className="form-control"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Invoice Description
                        </label>
                        <div className="col-md-10">
                          <textarea
                            className="form-control"
                            value={invoiceDescription}
                            onChange={(e) =>
                              setInvoiceDescription(e.target.value)
                            }
                          >
                            {invoiceDescription}
                          </textarea>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Invoice Amount
                        </label>
                        <div className="col-md-10">
                          <input
                            type="number"
                            className="form-control"
                            value={invoiceAmount}
                            onChange={(e) => setInvoiceAmount(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          data-bs-dismiss="modal"
                          className="btn add-btn"
                          onClick={handlePerfomaInvoiceSubmit}
                        >
                          {" "}
                          Save{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            <div>Please get a quotation approved to view</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPayment;
