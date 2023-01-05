import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { quotationGet } from "../../../redux/features/quotation/quotationSlice";
import { toastError } from "../../../utils/toastUtils";
import { confirmAlert } from "react-confirm-alert";

import {
  paymentAdd,
  paymentGetByQuotation,
  paymentUpdate,
} from "../../../redux/features/payment/paymentSlice";
import { getEmployessLinkedWithLeadId } from "../../../Services/user.service";
import { handleNotificationGetForSpecificLeadId } from "../../../Services/notification.service";

import {
  addPaymentInvoice,
  deletePaymentInvoice,
  paymentInvoiceGet,
  setPaymentInvoice,
  updatePaymentInvoice,
} from "../../../redux/features/paymentInvoice/paymentInvoiceSlice";

import { addNotification } from "../../../redux/features/notification/notificationSlice";
import { add } from "../../../Services/costingSheet.services";

export const AddPayment = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.user._id);

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
  const [isStatusOf, setIsStatusOf] = useState(false);

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

  const [handleEditInputInTcs, setHandleEditInputInTcs] = useState(false);

  const [comment, setComment] = useState("");
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showButtonVisibility, setShowButtonVisibility] = useState(false);
  const [connectEmplyeeWithThisLead, setConnectEmplyeeWithThisLead] = useState(
    []
  );

  const userObj = useSelector((state) => state.auth.user);
  const [createdBy, setCreatedBy] = useState({});

  useEffect(() => {
    setCreatedBy(userObj);
  }, [userObj]);

  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployessLinkedWithLeadId(leadId);
      // console.log(res, "resonp");
      if (res?.message) {
        setConnectEmplyeeWithThisLead(res.data);
        // dispatch(returnAllEmployees(res.data));
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const handleGetCommentFromNtoifcation = async () => {
    let get = await handleNotificationGetForSpecificLeadId(`${leadId}`);
  };

  const handleInit = () => {
    dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    handleInit();
    handleGetAllEmployees();
    handleGetCommentFromNtoifcation();
  }, []);

  useEffect(() => {
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
      let tempObj = quotationStateArr.find((el) => el.status == "Convert");
      if (tempObj) {
        console.log(tempObj, "temp12");
        setIsQuotationapproved(true);
        setSelectedQuotation(tempObj);
        let totalFlightCharges =
          parseInt(tempObj?.perPersonAirPortPrice) *
            parseInt(tempObj?.travelPassengerObj?.noOfAdults) +
          parseInt(tempObj?.perChildrenPersonAirPortPrice) *
            (parseInt(tempObj?.travelPassengerObj?.noOfChildrenWithBed) +
              parseInt(tempObj?.travelPassengerObj?.noOfChildrenWithoutBed)) +
          parseInt(tempObj?.perInfantAirPortPrice) *
            parseInt(tempObj?.travelPassengerObj?.noOfInfants);

        setFlightCharges(totalFlightCharges);
        // setFlightCharges(
        //   tempObj?.perPersonAirPortPrice
        //     ? tempObj?.perPersonAirPortPrice * tempObj?.numberOfGuest
        //     : 0
        // );
        let totalLandCost =
          parseInt(tempObj?.perPersonLandPrice) *
            parseInt(tempObj?.travelPassengerObj?.noOfAdults) +
          parseInt(tempObj?.perChildrenLandPrice) *
            (parseInt(tempObj?.travelPassengerObj?.noOfChildrenWithBed) +
              parseInt(tempObj?.travelPassengerObj?.noOfChildrenWithoutBed)) +
          parseInt(tempObj?.perInfantLandPrice) *
            parseInt(tempObj?.travelPassengerObj?.noOfInfants);

        setLandCharges(totalLandCost);
        // setLandCharges(
        //   tempObj?.perPersonLandPrice
        //     ? tempObj?.perPersonLandPrice * tempObj?.numberOfGuest
        //     : 0
        // );
        setQuotationId(tempObj._id);
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
    // console.log(name, value);
    let tempList = [...paymentReceviedArr];
    let totalAmount = 0;

    if (name == "installmentAmount") {
      for (let el of tempList) {
        // console.log(el.installmentAmount, "cost23");
        if (el.installmentAmount) {
          totalAmount = totalAmount + parseInt(el.installmentAmount);
        }
      }
      // console.log(totalAmount, "totalAmount213", parseInt(value), "value1");
      // if (parseInt(totalAmount) + parseInt(value) > parseInt(total)) {
      //   toastError(
      //     "Amount must be greate than zero ot less than total Amount*"
      //   );
      //   return;
      // }
      if ((value && value > total) || value < 0) {
        toastError("Amount must be greate than zero ot less than total Amount");
        return;
      }
    }
    let list = [...paymentReceviedArr];
    // console.log(list[index], "paymentReceviedArr");
    // list[index][name] = value;
    setPaymentReceviedArr((pr) =>
      pr.map((el, i) => (i == index ? { ...el, [name]: value } : el))
    );
  };

  // const handlePaymentInput = (e, index) => {
  //   const { name, value } = e.target;

  //   let previousValue = paymentReceviedArr.find((el, i) => i == index);
  //   // console.log(name, value)
  //   const list = [...paymentReceviedArr];
  //   // let list = [...paymentReceviedArr];

  //   setPaymentReceviedArr((pr) =>
  //     pr.map((el, i) => (i == index ? { ...el, [name]: value } : el))
  //   );
  // if (name == "installmentAmount") {
  //   console.log(
  //     list.reduce(
  //       (acc, el) =>
  //         acc + parseInt(el.installmentAmount ? el.installmentAmount : 0),
  //       0
  //     ) >= parseInt(total),
  //     list.reduce(
  //       (acc, el) =>
  //         acc + parseInt(el.installmentAmount ? el.installmentAmount : 0),
  //       0
  //     ),
  //     parseInt(total)
  //   );
  //   if (
  //     list.reduce(
  //       (acc, el) =>
  //         acc + parseInt(el.installmentAmount ? el.installmentAmount : 0),
  //       0
  //     ) >= parseInt(total)
  //   ) {
  //     toastError("Amount must be greater than zero or less than total Amount");
  //     setPaymentReceviedArr((pr) =>
  //       pr.map((el, i) =>
  //         i == index ? { ...el, [name]: previousValue.installmentAmount } : el
  //       )
  //     );
  //   } else {
  //     setPaymentReceviedArr((pr) =>
  //       pr.map((el, i) => (i == index ? { ...el, [name]: value } : el))
  //     );
  //   }
  // }
  // console.log(list[index], "paymentReceviedArr")

  // list[index][name] = value;
  // };

  const handleRemovePaymentRow = (index) => {
    const list = [...paymentReceviedArr];
    list.splice(index, 1);
    setPaymentReceviedArr(list);
  };

  const submitPayment = (obj) => {
    confirmAlert({
      title: "Are you sure to Add Payment",
      // message: "Are you sure to do this.",
      buttons: [
        {
          label: "I Am Sure",
          onClick: () => {
            if (paymentId) {
              obj.paymentId = paymentId;
              // history.push(`/admin/lead/${leadId}/costingSheetAdd`);
              dispatch(paymentUpdate(obj));
            } else {
              // history.push(`/admin/lead/${leadId}/costingSheetAdd`);
              dispatch(paymentAdd(obj));
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => setIsStatusOf(false),
        },
      ],
    });
  };

  const handleSubmit = () => {
    const validation = paymentReceviedArr.every(
      (item) => item.installmentAmount
    );
    // console.log(validation, "validation4");
    if (!validation) {
      toastError("Please fill all installmentAmount ");
      return;
    }

    let sum = paymentReceviedArr.reduce(
      (accumulator, curValue) =>
        accumulator + parseInt(curValue.installmentAmount),
      0
    );

    if (sum > total || sum < total) {
      toastError("installmentAmount must be  less than or equal to total");
      return;
    } else if (sum == total) {
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
      submitPayment(obj);
    }
  };

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
    }
    if (invoiceDescription == "") {
      toastError("invoiceDescription  is mandatory");
      return;
    }
    if (invoiceAmount == "") {
      toastError("invoiceAmount  is mandatory");
      return;
    }
    if (invoiceDate == "") {
      toastError("invoiceDate  is mandatory");
      return;
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

  const handleCheckTcs = (e) => {
    // console.log(e,"elllll")
    if (e < 0) {
      toastError("TCS cannot be negative");
      return;
    }
    setTcs(e);
  };

  const handleKeyPress = (event) => {
    let object = {
      heading: comment,
      // description,
      // userId,
      leadId,
      followDate: new Date().toLocaleDateString(),
      createdBy: { ...createdBy, role },
      followTime: new Date().toLocaleTimeString(),
      isComment:true
    };
    if (event.key === "Enter") {
      console.log("0987");
      dispatch(addNotification(object));
      if (role == "SPOC") {
        object.userId = connectEmplyeeWithThisLead?.leadId;
        dispatch(addNotification(object));
        //   console.log(leadObj, "leadObj?.adminObj?._id");
        object.userId = connectEmplyeeWithThisLead?.adminObj?._id;
        dispatch(addNotification(object));
      } else if (role == "TEAMLEAD") {
        object.userId = connectEmplyeeWithThisLead?.agentId;
        dispatch(addNotification(object));
        object.userId = connectEmplyeeWithThisLead?.adminObj?._id;
        dispatch(addNotification(object));
      } else if (role == "ADMIN") {
        object.userId = connectEmplyeeWithThisLead?.agentId;
        dispatch(addNotification(object));
        object.userId = connectEmplyeeWithThisLead?.leadId;
        dispatch(addNotification(object));
      }
      for (let el of connectEmplyeeWithThisLead?.AccountArr) {
        object.userId = el._id;
        dispatch(addNotification(object));
      }
      // handleSubmit(event);
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
        {/* {console.log(selectedQuotation, "selectedQuotation213")} */}
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
                    {/* <button> edit</button> */}
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
                  readOnly={handleEditInputInTcs == false ? true : false}
                  className="form-control mt-2"
                  value={tcs}
                  onChange={(e) => handleCheckTcs(e.target.value)}
                  type="number"
                  // button="edit"
                />
                <button
                  className="btn btn-primary mt-4"
                  onClick={(e) => {
                    setHandleEditInputInTcs(!handleEditInputInTcs);
                  }}
                >
                  {handleEditInputInTcs ? "FREEZE" : "EDIT"}
                </button>
                <p className="mt-5">Rs. {total}</p>
              </div>
            </div>
            <hr />

            <div style={{ fontSize: 19 }}>Payment Details</div>

            <div className="row">
              <div className="col-md-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Receiving Date</th>
                      <th scope="col">Installment Amount</th>
                      <th scope="col">Amount Transfer/ Status</th>
                      {/* <th scope="col">Transferable to You</th> */}
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
                              className="form-control mt-2"
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
                            {/* <input
                  className="form-control mt-2"
                  value={tcs}
                  onChange={(e) => setTcs(e.target.value)}
                  type="number"
                /> */}
                            <input
                              className="form-control"
                              type="number"
                              name="installmentAmount"
                              value={item.installmentAmount}
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                            />{" "}
                          </td>
                          <td>
                            <input
                              className="form-control"
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                              name="transferStatus"
                              value={item.transferStatus}
                            ></input>
                          </td>
                          {/* <td>
                            <input
                              type="text"
                              name="transferAmount"
                              value={item.transferAmount}
                              onChange={(e) => {
                                handlePaymentInput(e, index);
                              }}
                            />{" "}
                          </td> */}

                          <td>
                            <select
                              className="form-control"
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
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    {/* <TextareaAutosize */}
                    <input
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className="form-control"
                      cols="1000"
                      rows="100"
                      placeholder="Add Comment"
                    />
                  </div>
                </div>
                {/* <div className="col-lg-12 mt-3">
                  <div className="form-group">
                    <input
                      type="date"
                      min={moment(new Date()).format("YYYY-MM-DD")}
                      value={reminderDate}
                      onChange={(e) => {
                        setReminderDate(e.target.value);
                        setShowButtonVisibility(true);
                      }}
                      className="form-control"
                    />
                  </div>
                </div> */}

                {showButtonVisibility && (
                  <Button
                    type="submit"
                    className="btn-submit"
                    onClick={(e) => {
                      handleSubmitComment(e);
                    }}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
            {/* {
        noteMainArr &&
        noteMainArr.map((noteItem, index) => {
          return (
            <div className="note_added_by_agent mt-4" key={index}>
              <div className="textnote">
                <div className="alignright mb8">
                  <span className=" flexfull">
                    {moment(noteItem?.reminderDate).format("DD-MM-YYYY")} By{" "}
                    {noteItem?.createdBy?.name ? noteItem?.createdBy?.name : "" + " "}
                    {"[" + noteItem?.createdBy?.role + "]"}
                  </span>
                </div>
                <div className="noteMessage">
                  <p className="post-heading  f12">{noteItem?.note}</p>
               
                </div>
              </div>
              <span className="notesImageCorner">
                <img
                  src={"../../../src/assets/img/NotesImageCorner.webp"}
                  alt=""
                />
              </span>
            </div>
          );
        })
      } */}
            {/* <div style={{ fontSize: 19 }}>Payment Invoice</div>

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
            </div> */}

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
            <div>Please get a quotation Converted to view</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPayment;
