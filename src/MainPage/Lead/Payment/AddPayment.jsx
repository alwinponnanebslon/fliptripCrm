import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { quotationGet } from "../../../redux/features/quotation/quotationSlice";
import { toastError } from "../../../utils/toastUtils";
import { confirmAlert } from "react-confirm-alert";
import html2canvas from "html2canvas";
import {
  paymentAdd,
  paymentGetByQuotation,
  paymentUpdate,
} from "../../../redux/features/payment/paymentSlice";
import { jsPDF } from "jspdf";

import { getEmployessLinkedWithLeadId } from "../../../Services/user.service";
import { handleNotificationGetForSpecificLeadId } from "../../../Services/notification.service";
import Button from "react-bootstrap/Button";
import { images } from "../../../MainPage/Pdf/Utility/Images";

import {
  addPaymentInvoice,
  deletePaymentInvoice,
  paymentInvoiceGet,
  setPaymentInvoice,
  updatePaymentInvoice,
} from "../../../redux/features/paymentInvoice/paymentInvoiceSlice";

import {
  addNotification,
  setNotification,
} from "../../../redux/features/notification/notificationSlice";
import { add } from "../../../Services/costingSheet.services";
import { updateLeadStatus, getById } from "../../../Services/lead.service";
import { getApprovedQuotation } from "../../../Services/quotation.service.js";

import {
  generateFilePath,
  generateFilePathUPload,
} from "../../../utils/FileURL";

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
  console.log(leadId, "leadid12");
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

  const [notificationArr, setNotificationArr] = useState([]);
  const [printPdf, setPrintPdf] = useState(false);
  const [QuotationObj, setQuotationObj] = useState({});
  const [spocImageBase64, setspocImageBase64] = useState("");
  const [tourObj, settourObj] = useState({
    mainImage: images.top_left,
    itenaryImage: images.travelling,
  });

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
    let { data: response } = await handleNotificationGetForSpecificLeadId(
      `${leadId}`
    );
    console.log(response, "get2342");
    setNotificationArr(response?.data);
  };

  const handleInit = () => {
    dispatch(quotationGet(`leadId=${leadId}`));
    // dispatch(notificationGet(`leadId=${leadId}&role=${role}`));
  };

  useEffect(() => {
    handleInit();
    handleGetAllEmployees();
    handleGetCommentFromNtoifcation();
  }, []);

  // useEffect(() => {
  //   setNoteMainArr(notesResultArr);
  // }, [notesResultArr]);
  const getBase64 = (file, cb) => {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        // console.log('Error: ', error)
      };
    }
  };

  const handleDownload = async () => {
    let arr = await getApprovedQuotation(leadId);
    let row = arr?.data?.data;
    setQuotationObj(arr?.data?.data);
    // const input = ;
    // localStorage.setItem("quotationPdf", JSON.stringify(row));
    // setQuotationObj(row);
    let blob = await fetch(
      generateFilePath(QuotationObj?.agentObj?.photoUrl)
    ).then((r) => r.blob());
    getBase64(blob, (result) => {
      setspocImageBase64(result);
    });

    if (row && row?.tourListArr && row?.tourListArr.length > 0) {
      let currentObj = row.tourListArr.find((el) => el.mainImage);

      if (currentObj != "") {
        let temptour = {
          mainImage: currentObj?.mainImage
            ? generateFilePathUPload(currentObj?.mainImage)
            : images.top_left,
          itenaryImage: currentObj?.itenaryImage
            ? generateFilePathUPload(currentObj?.itenaryImage)
            : images.travelling,
        };
        settourObj(temptour);
      }
    }

    // dispatch(setQuotationObject(row));
    // dispatch(setTour(row));

    setPrintPdf(true);
    // setTimeout(() => {
    const input = document.getElementById("mainPdfContainer");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // console.log("en3");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [
            input?.clientHeight * window.devicePixelRatio,
            input?.clientWidth * window.devicePixelRatio,
          ],
          putOnlyUsedFonts: true,
          floatPrecision: "smart",
          hotfixes: ["px_scaling"],
        });
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save(
          `${row?.leadObj?.clientObj?.name} - ${row?.destinationName}.pdf`
        );
      });
    }
  };

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
        // console.log(tempObj, "temp12");
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

  const updateStatusOfLead = async (id, obj) => {
    let { data: res } = await updateLeadStatus(id, obj);
    if (res.success) {
      // handleGetAllLeads();
    }
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
      let object = {
        status: "CONVERT",
      };
      // handleLeadStatusUpdate(leadId, "Convert", "FROMCOSTING");
      updateStatusOfLead(leadId, object);
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
      CommentUserId: [],
      leadId,
      followDate: new Date().toLocaleDateString(),
      createdBy: { ...createdBy, role },
      followTime: new Date().toLocaleTimeString(),
      isComment: true,
    };
    console.log(role, "12313");
    if (event.key === "Enter") {
      // dispatch(addNotification(object));
      if (role == "SPOC") {
        object.CommentUserId.push({
          userId: connectEmplyeeWithThisLead?.adminObj?._id,
        });
        object.CommentUserId.push({
          userId: connectEmplyeeWithThisLead?.leadId,
        });
      } else if (role == "TEAMLEAD") {
        object.CommentUserId.push({
          userId: connectEmplyeeWithThisLead?.agentId,
        });
        object.CommentUserId.push({
          userId: connectEmplyeeWithThisLead?.adminObj?._id,
        });
      } else if (role == "ADMIN") {
        object.CommentUserId.push({
          userId: connectEmplyeeWithThisLead?.agentId,
        });
        object.CommentUserId.push({
          userId: connectEmplyeeWithThisLead?.leadId,
        });
      }
      for (let el of connectEmplyeeWithThisLead?.AccountArr) {
        object.CommentUserId.push({ userId: el._id });
      }
      dispatch(addNotification(object));
      setComment("");
      handleGetCommentFromNtoifcation();
    }
  };

  const handleSubmitComment = (event) => {
    // console.log(role,"role23")
    let object = {
      heading: comment,
      // userId,
      CommentUserId: [],
      leadId,
      followDate: new Date().toLocaleDateString(),
      createdBy: { ...createdBy, role },
      followTime: new Date().toLocaleTimeString(),
      isComment: true,
    };
    if (role == "SPOC") {
      object.CommentUserId.push({
        userId: connectEmplyeeWithThisLead?.adminObj?._id,
      });
      object.CommentUserId.push({ userId: connectEmplyeeWithThisLead?.leadId });
    } else if (role == "TEAMLEAD") {
      object.CommentUserId.push({
        userId: connectEmplyeeWithThisLead?.agentId,
      });
      object.CommentUserId.push({
        userId: connectEmplyeeWithThisLead?.adminObj?._id,
      });
    } else if (role == "ADMIN") {
      object.CommentUserId.push({
        userId: connectEmplyeeWithThisLead?.agentId,
      });
      object.CommentUserId.push({ userId: connectEmplyeeWithThisLead?.leadId });
    }
    for (let el of connectEmplyeeWithThisLead?.AccountArr) {
      object.CommentUserId.push({ userId: el._id });
    }
    dispatch(addNotification(object));
    handleGetCommentFromNtoifcation();
    setComment("");
  };

  const getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }

    return dateArray.map((el, index) => {
      return <li key={index}>{new Date(el).toDateString()}</li>;
    });
  };

  return (
    <>
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
                  <li className="breadcrumb-item active"></li>
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
                              />
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
                {/* <div className="col-auto float-end ml-auto"> */}
                <Link to={`/admin/lead/${leadId}/quotes`} className="card">
                  Download
                </Link>
                {/* <a className="btn add-btn" onClick={() => handleDownload()}>
            Download
          </a> */}
                {/* </div> */}
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
                        // onKeyDown={(e) => handleKeyPress(e)}
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

                  {/* {showButtonVisibility && ( */}
                  <Button
                    type="submit"
                    className="btn-submit col-md-2"
                    onClick={(e) => {
                      handleSubmitComment(e);
                    }}
                  >
                    Submit
                  </Button>
                  {/* // )} */}
                </div>
              </div>
              {notificationArr &&
                notificationArr.map((noteItem, index) => {
                  return (
                    <div className="note_added_by_agent mt-4" key={index}>
                      <div className="textnote">
                        <div className="alignright mb7">
                          <span className=" flexfull">
                            {moment(noteItem?.reminderDate).format(
                              "DD-MM-YYYY"
                            )}{" "}
                            By{" "}
                            {noteItem?.createdBy?.name
                              ? noteItem?.createdBy?.name
                              : "" + " "}
                            {"[" + noteItem?.createdBy?.role
                              ? noteItem?.createdBy?.role
                              : "" + "]"}
                          </span>
                        </div>
                        <div className="noteMessage">
                          <p className="post-heading  f10">
                            {noteItem?.heading}
                          </p>
                        </div>
                      </div>
                      {/* <span className="notesImageCorner">
                <img
                  src={"../../../src/assets/img/NotesImageCorner.webp"}
                  alt=""
                />
              </span> */}
                    </div>
                  );
                })}

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

      {printPdf && (
        <div
          style={{
            // zIndex: "11011",
            // display:none
            // visibility:"hidden"
            opacity: "0",
          }}
        >
          <div main id="mainPdfContainer">
            {/* 
            
            */}

            <section className="top-banner mb-80">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12 col-md-6">
                    <div className="left">
                      <div className="image">
                        <img src={tourObj?.mainImage} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="right">
                      <div className="d-flex align-items-end justify-content-between right-top">
                        <img src={images.logo} alt="" className="main-logo" />
                        <ul>
                          <li>
                            <h5>
                              TRIP ID :
                              <span className="pink fw-bold">
                                {QuotationObj?.leadObj?.uniqueTripId
                                  ? QuotationObj?.leadObj?.uniqueTripId
                                  : QuotationObj?._id}
                              </span>
                            </h5>
                          </li>
                          <li>As quoted on</li>
                          <li>
                            <h5 className="mb-0">
                              {moment(QuotationObj?.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                              {/* {new Date(QuotationObj?.createdAt).toDateString()} */}
                              ,{new Date(QuotationObj?.createdAt).getHours()}:
                              {new Date(QuotationObj?.createdAt).getMinutes()}
                            </h5>
                          </li>
                        </ul>
                      </div>
                      <div className="right-middle">
                        <div className="destination">
                          <h2 className="text-white">
                            {QuotationObj?.leadObj?.clientObj?.name}
                          </h2>
                          <h2 className="text-white">
                            {QuotationObj?.destinationName}
                          </h2>
                        </div>
                        <ul className="dot-line">
                          <li>
                            <div className="dot"></div>
                          </li>
                          <li>
                            <div className="line"></div>
                          </li>
                          <li>
                            <div className="dot"></div>
                          </li>
                        </ul>
                        <ul className="detail list-circle">
                          <li>
                            {QuotationObj?.durationOfTour} N &nbsp;/ &nbsp;
                            {parseInt(QuotationObj?.durationOfTour) + 1} D
                          </li>
                          <li>{QuotationObj?.numberOfGuest} Passengers</li>
                          <li>
                            {QuotationObj?.tourListArr &&
                              QuotationObj?.tourListArr.length > 0 &&
                              new Date(
                                QuotationObj?.tourListArr[0]?.startDate
                              ).toDateString()}
                          </li>
                        </ul>

                        <p className="desp">
                          Prices of Flights and hotels are subject to
                          availability
                        </p>
                        <button className="btn pink-bg text-white btn-lg px-4">
                          ₹ {QuotationObj?.amount?.toLocaleString("en-IN")}
                        </button>
                      </div>
                      <ul className="right-bottom whatsapp-gmail">
                        <li>
                          <img src={images.whatsapp} alt="" />
                          {QuotationObj?.agentObj?.phone
                            ? QuotationObj?.agentObj?.phone
                            : "+91 9310 985 146"}
                        </li>
                        <li>
                          <img src={images.gmail} alt="" />
                          {QuotationObj?.agentObj?.email
                            ? QuotationObj?.agentObj?.email
                            : "info@fliptrip.in"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* 
      
      
      */}
            {/* {console.log(QuotationObj, "311323")} */}
            {QuotationObj?.destinationName ? (
              <section className="payment-detail mb-80">
                <div className="container">
                  <h1 className="fw-bold text-center mb-5 heading">
                    Destination
                  </h1>
                  {QuotationObj &&
                    QuotationObj?.tourListArr &&
                    QuotationObj?.tourListArr.length > 0 &&
                    QuotationObj?.tourListArr.map((el, i) => {
                      var str = el?.destinationObj?.description.split(/[.;]/g);
                      return (
                        <div className="row" key={i}>
                          <div className="col-12">
                            <div className="inclusions">
                              <div className="box mb-0">
                                <h4
                                  style={{ fontSize: 25 }}
                                  className="purple bg-white"
                                >
                                  {el.name}
                                </h4>
                                <div className="row">
                                  <div className="col-12 ">
                                    <ul className="list-circle">
                                      {el?.destinationObj?.description
                                        .split(/[.;]/g)
                                        .map((le, i) => {
                                          return <li key={i}>{le}.</li>;
                                        })}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            ) : (
              ""
            )}
            {/* 
      
      
      
      */}
            <section className="summary mb-80">
              <div className="container">
                <h1 className="fw-bold text-center mb-5">Summary</h1>
                <ul>
                  {QuotationObj?.hotelDetail?.length > 0 && (
                    <li>
                      <div className="box">
                        <div className="icon">
                          <img src={images.hotel} alt="" />
                        </div>
                        <h4>Hotel</h4>
                      </div>
                    </li>
                  )}
                  {QuotationObj?.flightList?.length > 0 && (
                    <li>
                      <div className="box">
                        <div className="icon">
                          <img src={images.flight} alt="" />
                        </div>
                        <h4>Flights</h4>
                      </div>
                    </li>
                  )}
                  <li>
                    <div className="box">
                      <div className="icon">
                        <img src={images.activity} alt="" />
                      </div>
                      <h4>Sight Seeing</h4>
                    </div>
                  </li>
                  <li>
                    <div className="box">
                      <div className="icon">
                        <img src={images.transfer} alt="" />
                      </div>
                      <h4>Transfers</h4>
                    </div>
                  </li>
                  {QuotationObj?.visaRequired == true && (
                    <li>
                      <div className="box">
                        <div className="icon">
                          <img src={images.visa} alt="" />
                        </div>
                        <h4>Visa</h4>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </section>
            <section className="flight-table">
              <div className="container">
                <table className="table table-borderless align-middle">
                  <thead className="purple-bg text-white">
                    <tr>
                      <th scope="col" className="fw-normal">
                        DETAILS
                      </th>
                      <th scope="col" className="fw-normal">
                        PER PAX (₹)
                      </th>
                      <th scope="col" className="fw-normal">
                        TOTAL (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {QuotationObj?.perPersonAirPortPrice > 0 && (
                      <tr>
                        <td>FLIGHT</td>
                        <td>
                          {QuotationObj?.perPersonAirPortPrice +
                            QuotationObj?.perChildrenPersonAirPortPrice +
                            QuotationObj?.perInfantAirPortPrice}
                        </td>
                        <td>
                          {parseInt(QuotationObj?.perPersonAirPortPrice) *
                            parseInt(
                              QuotationObj?.travelPassengerObj?.noOfAdults
                            ) +
                            parseInt(
                              QuotationObj?.perChildrenPersonAirPortPrice
                            ) *
                              (parseInt(
                                QuotationObj?.travelPassengerObj
                                  ?.noOfChildrenWithBed
                              ) +
                                parseInt(
                                  QuotationObj?.travelPassengerObj
                                    ?.noOfChildrenWithoutBed
                                )) +
                            parseInt(QuotationObj?.perInfantAirPortPrice) *
                              parseInt(
                                QuotationObj?.travelPassengerObj?.noOfInfants
                              )}
                        </td>
                      </tr>
                    )}
                    {QuotationObj?.perPersonLandPrice > 0 && (
                      <tr>
                        <td>LAND</td>
                        <td>
                          {QuotationObj?.perPersonLandPrice +
                            QuotationObj?.perChildrenLandPrice +
                            QuotationObj?.perInfantLandPrice}
                        </td>
                        <td>
                          {parseInt(QuotationObj?.perPersonLandPrice) *
                            parseInt(
                              QuotationObj?.travelPassengerObj?.noOfAdults
                            ) +
                            parseInt(QuotationObj?.perChildrenLandPrice) *
                              (parseInt(
                                QuotationObj?.travelPassengerObj
                                  ?.noOfChildrenWithBed
                              ) +
                                parseInt(
                                  QuotationObj?.travelPassengerObj
                                    ?.noOfChildrenWithoutBed
                                )) +
                            parseInt(QuotationObj?.perInfantLandPrice) *
                              parseInt(
                                QuotationObj?.travelPassengerObj?.noOfInfants
                              )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    {/* <tr>
                      <td>TOTAL</td>
                      <td>
                        {parseInt(QuotationObj?.perPersonAirPortPrice) *
                          parseInt(QuotationObj?.numberOfGuest)}
                      </td>
                      <td>
                        {parseInt(QuotationObj?.perPersonLandPrice) *
                          parseInt(QuotationObj?.numberOfGuest)}
                      </td>
                    </tr> */}
                  </tfoot>
                </table>
                <ul className="amount mb-0">
                  <li>
                    <h4>Total cost including taxes and above</h4>
                    <h4 className="pink fw-semibold m-0">
                      ₹ {QuotationObj?.amount?.toLocaleString("en-IN")}
                    </h4>
                  </li>
                  <li>
                    <button className="btn pink-bg text-white btn-lg px-4">
                      Pay Now
                    </button>
                  </li>
                </ul>
              </div>
            </section>
            {/* } */}
            <div className="desp purple-bg py-2 px-4 my-5">
              <p className="text-white m-0 text-center">
                Prices of Flights and hotels are subject to availability
              </p>
            </div>

            <section className="inclusions">
              <div className="container">
                <h1 className="fw-bold text-center mb-5">Inclusions</h1>
                <div className="row">
                  <div className="col-12">
                    <div className="box">
                      <h4 className="purple bg-white">Tours</h4>
                      <ul className="list-circle">
                        {QuotationObj?.tourListArr &&
                          QuotationObj?.tourListArr.length > 0 &&
                          QuotationObj?.tourListArr.map((el, index) => {
                            return (
                              <li key={index}>
                                {el.name} (
                                {new Date(el.startDate).toDateString()})
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>

                  {QuotationObj?.visaRequired && (
                    <div className="col-12">
                      <div className="box">
                        <h4 className="purple bg-white">Visa</h4>
                        <ul className="list-circle">
                          {QuotationObj?.visOnArrival ? (
                            <li>Visa cost also included in the package</li>
                          ) : (
                            <li>Visa cost not included in the package</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            {/* {console.log(QuotationObj, "QuotationObjQuotationObj1")} */}
            {QuotationObj &&
              QuotationObj?.flightList &&
              QuotationObj?.flightList?.length > 0 && (
                <section className="flights ptb-80">
                  <div className="container">
                    <h1 className="fw-bold text-center mb-5">Flights</h1>
                    <div className="top">
                      <img src={images.plane} alt="" className="plane" />
                    </div>
                    <div className="position-relative">
                      <div className="row">
                        {QuotationObj?.flightList &&
                          QuotationObj?.flightList.length > 0 &&
                          QuotationObj?.flightList[0]?.flightName
                            ?.split("\n")
                            .filter((el, index, arr) => arr.length - 1 != index)
                            .map((ele, index) => {
                              return (
                                <div className="col-12" key={index}>
                                  <div
                                    className={
                                      index % 2 == 0 ? "box" : "box reverse"
                                    }
                                  >
                                    <h6>
                                      <img src={images.location} alt="" />
                                      {ele} {index % 2}
                                    </h6>
                                  </div>
                                </div>
                              );
                            })}

                        {QuotationObj?.flightList &&
                          QuotationObj?.flightList?.length > 0 &&
                          QuotationObj?.flightList[0]?.flightName?.split("\n")[
                            QuotationObj?.flightList[0]?.flightName?.split("\n")
                              .length - 1
                          ] && (
                            <div className="destination">
                              <h6>
                                {
                                  QuotationObj?.flightList[0]?.flightName?.split(
                                    "\n"
                                  )[
                                    QuotationObj?.flightList[0]?.flightName?.split(
                                      "\n"
                                    ).length - 1
                                  ]
                                }
                                <img src={images.location} alt="" />
                              </h6>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

            {QuotationObj &&
              QuotationObj?.hotelDetail &&
              QuotationObj?.hotelDetail?.length > 0 && (
                <section className="hotels">
                  <div className="container">
                    <h1 className="fw-bold text-center mb-5">Hotels</h1>
                    {QuotationObj?.hotelDetail &&
                      QuotationObj?.hotelDetail?.length > 0 &&
                      QuotationObj?.hotelDetail.map((el, index) => {
                        return (
                          <div className="row align-items-center" key={index}>
                            <div className="col-12 col-md-8">
                              <div className="left">
                                <ul>
                                  <li className="box">
                                    <img src={images.room} alt="" />
                                    <div>
                                      <h4>{el?.hotelName} / 1 Rooms</h4>
                                      <h5>
                                        {el?.hotelAddress}
                                        <p>
                                          ({el?.numberOfNight} Night Stay){" "}
                                          {el?.rating
                                            ? `Rating : ${el?.rating}`
                                            : ""}{" "}
                                        </p>
                                      </h5>
                                    </div>
                                  </li>
                                  <li className="box">
                                    <img src={images.check_in} alt="" />
                                    <div>
                                      <h4>Check In</h4>
                                      <p>
                                        {new Date(el.checkIn).toDateString()}
                                      </p>
                                    </div>
                                  </li>
                                  <li className="box">
                                    <img src={images.checkout} alt="" />
                                    <div>
                                      <h4>Check Out</h4>

                                      <p>
                                        {new Date(el.checkOut).toDateString()}
                                      </p>
                                    </div>
                                  </li>
                                  <li className="box">
                                    <img src={images.stay} alt="" />
                                    <div>
                                      <h4>Staying Dates</h4>
                                      <ul className="list-circle">
                                        {getDates(el.checkIn, el.checkOut)}
                                      </ul>
                                    </div>
                                  </li>
                                  <li className="box">
                                    <img src={images.room_bed} alt="" />
                                    <div>
                                      <h4>{el.roomType} X 1</h4>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-12 col-md-4">
                              <div className="right">
                                <div className="image">
                                  <img
                                    src={images.hotel_left}
                                    className="w-100 img-contain"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </section>
              )}

            <div className="desp purple-bg py-2 px-4 my-5">
              <p className="text-white m-0 text-center">
                Prices of Flights and hotels are subject to availability
              </p>
            </div>
            {QuotationObj &&
              QuotationObj?.itineraryDetails &&
              QuotationObj?.itineraryDetails?.length > 0 && (
                <section className="itinerary mb-80">
                  <div className="container">
                    <h1 className="fw-bold text-center mb-5 heading">
                      Itinerary
                    </h1>
                    <div className="row">
                      {QuotationObj?.itineraryDetails &&
                        QuotationObj?.itineraryDetails.length > 0 &&
                        QuotationObj?.itineraryDetails.map((el, index) => {
                          return (
                            <div className="col-12" key={index}>
                              <div className="day">
                                <h4>
                                  <img src={images.location} alt="" />
                                  Day {index + 1}
                                </h4>
                                <p className="small">
                                  {/* in {(el.checkIn)} */}
                                  {/* {new Date(el.checkIn).toDateString()} */}
                                  {index == 0 &&
                                    moment(
                                      QuotationObj?.hotelDetail[0].checkIn
                                    ).format("DD-MM-YYYY")}
                                  {/* {(index ==  QuotationObj?.itineraryDetails.length-1) &&  moment(QuotationObj?.hotelDetail[0].checkOut).format("DD-MM-YYYY")} */}
                                  {index ==
                                    QuotationObj?.itineraryDetails?.length -
                                      1 &&
                                    moment(
                                      QuotationObj?.hotelDetail[
                                        QuotationObj?.hotelDetail?.length - 1
                                      ].checkOut
                                    ).format("DD-MM-YYYY")}
                                </p>
                              </div>
                              <div className="box">
                                <ul className="inner-box">
                                  <li>
                                    <div className="left">
                                      <img
                                        src={tourObj?.itenaryImage}
                                        alt=""
                                        style={{ width: 100 }}
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="right">
                                      <h4>{el?.itineraryHeading}</h4>
                                      <p>{el?.itineraryName}</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </section>
              )}
            <section className="how-to-book">
              <div className="container">
                <div className="row">
                  {QuotationObj?.paymentObj?.paymentReceviedArr.length > 0 && (
                    <div className="col-12">
                      <div className="flight-table">
                        <table className="table table-bordered">
                          <thead className="purple-bg text-white">
                            <tr>
                              <th scope="col" className="fw-normal">
                                Initial payment & confirmation
                              </th>
                              {QuotationObj?.paymentObj?.paymentReceviedArr &&
                                QuotationObj?.paymentObj?.paymentReceviedArr
                                  .length > 0 &&
                                QuotationObj?.paymentObj?.paymentReceviedArr.map(
                                  (el, index) => {
                                    return (
                                      <th
                                        scope="col"
                                        className="fw-normal"
                                        key={index}
                                      >
                                        {index + 1}
                                        <sup>st</sup> Installment
                                      </th>
                                    );
                                  }
                                )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> {QuotationObj?.destinationName}</td>
                              {QuotationObj?.paymentObj?.paymentReceviedArr &&
                                QuotationObj?.paymentObj?.paymentReceviedArr
                                  .length > 0 &&
                                QuotationObj?.paymentObj?.paymentReceviedArr.map(
                                  (el, index) => {
                                    return (
                                      <td
                                        key={index}
                                        scope="col"
                                        className="fw-normal"
                                      >
                                        ₹ {el?.installmentAmount} on{" "}
                                        {new Date(
                                          el.receviedDate
                                        ).toDateString()}
                                      </td>
                                    );
                                  }
                                )}
                            </tr>
                          </tbody>
                        </table>
                        <ul className="amount mb-0">
                          <li>
                            <h4>Total cost including taxes and above</h4>
                            <h4 className="pink fw-semibold m-0">
                              ₹{" "}
                              {QuotationObj?.paymentObj?.paymentReceviedArr.reduce(
                                (acc, el) =>
                                  acc + parseInt(el.installmentAmount),
                                0
                              )}
                            </h4>
                          </li>
                          <li className="text-end">
                            <button className="btn pink-bg text-white btn-lg px-4">
                              Pay Now
                            </button>
                            <ul className="whatsapp-gmail pe-0">
                              <li className="fw-semibold gap-2">
                                <img src={images.whatsapp} alt="" />
                                {QuotationObj?.agentObj?.phone
                                  ? QuotationObj?.agentObj?.phone
                                  : "+91 9310 985 146"}
                              </li>
                              <li className="fw-semibold gap-2">
                                <img src={images.gmail} alt="" />
                                {QuotationObj?.agentObj?.email
                                  ? QuotationObj?.agentObj?.email
                                  : " sales15.nitsaholidays@gmail.com "}
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="desp purple-bg py-2 px-4 my-5">
              <p className="text-white m-0 text-center">
                Prices of Flights and hotels are subject to availability{" "}
              </p>
            </div>

            <section className="payment-detail mb-80">
              <div className="container">
                <h1 className="fw-bold text-center mb-5 heading">
                  Payment Details
                </h1>
                <div className="row">
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">Account Details</h4>
                        <div className="row">
                          <div className="col-12 col-md-5">
                            <ul className="list-circle">
                              <li>
                                Payment acceptance Mode: IMPS/NEFT Bank transfer
                                & Netbanking through Payment link
                              </li>
                              <li>
                                Payment are also accepted through debit card,
                                Credit Card or through payment link then the
                                charges of 2.84 % extra will be levied.
                              </li>
                              <li>
                                Emi options available through third Parties
                                Suppliers. Get in touch with us for more
                                information
                              </li>
                            </ul>
                          </div>
                          <div className="col-12 col-md-7">
                            <div className="right">
                              <div className="bank">
                                <img src={images.yes_bank} alt="" />
                              </div>
                              <ul className="list-circle">
                                <li>
                                  Bank Name:{" "}
                                  <span className="fw-semibold">Yes Bank</span>
                                </li>

                                <li>
                                  A/c Num:{" "}
                                  <span className="fw-semibold">
                                    018461900001430
                                  </span>
                                </li>
                                <li>
                                  IFSC Code:{" "}
                                  <span className="fw-semibold">
                                    YESB0000184
                                  </span>
                                </li>
                                <li>
                                  Branch:
                                  <span className="fw-semibold">
                                    Yes Bank Ltd, Pitam Pura Branch
                                  </span>
                                </li>
                                <li>
                                  Paytm : &nbsp;
                                  <a
                                    href={`tel:${QuotationObj?.agentObj?.phone}`}
                                  >
                                    9999 316587{" "}
                                  </a>
                                </li>
                                <li>
                                  Google pay : &nbsp;
                                  <a
                                    href={`tel:${QuotationObj?.agentObj?.phone}`}
                                  >
                                    9999 316597{" "}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* <section className="faq mb-80">
              <div className="container">
                <h1 className="fw-bold text-center mb-5 heading">FAQ</h1>
                <div className="row">
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">Important Notes</h4>
                        <ul className="list-auto">
                          <li>
                            We are not responsible for any Visa Rejection as it
                            is government agency that issue visa.
                          </li>
                          <li>
                            Passport should be valid of minimum 06 months till
                            return date for travelling.
                          </li>
                          <li>
                            Above quotation is valid for Indian Nationals and
                            minimum of 2 adults travelling together at all
                            times.
                          </li>
                          <li>
                            Above all are subject to availability, no booking
                            made yet, in case of non- availability similar
                            hotel/services will be provided.
                          </li>
                          <li>
                            Any request of King Bed or Twin Bed, room near to
                            each other in case of 2 or more rooms booking in the
                            same hotel is subject to hotel availability.
                          </li>
                          <li>
                            We have limited inventory hence prices can change
                            without prior notice. In order to get benefit at the
                            current proposed prices, we recommend you to book
                            with us immediately.
                          </li>
                          <li>
                            Early check-in and late checkout is subject to
                            availability of rooms at the time of check-in and
                            the same is not guaranteed, you may be charged for
                            guaranteed early check-in and late checkout.
                          </li>
                          <li>
                            Tourism tax is imposed by Govt. of (Malaysia of
                            10-15 Ringgit) / (Dubai of 10-15 Dirham) per room
                            per night which is to be paid at hotel only, and
                            cost is not included in the cost of package.
                            <ul className="list-circle">
                              <li>
                                National Park fee is charged on island visit in
                                Thailand 400 PHB per Adult/ 200 PHB per Child
                                which is to be paid at island directly, and cost
                                is not included in the cost of package.
                              </li>
                              <li>
                                Hotels may charge security fee which is
                                refundable at Check-out time.
                              </li>
                              <li>
                                Gratuities imposed on cruise are not included in
                                the package unless mentioned separately.
                              </li>
                              <li>
                                All inclusions / Activities remain same but
                                sometimes the sequence of day to day schedule
                                (itinerary) may change depending upon
                                availability and local conditions when the final
                                itinerary received.
                              </li>
                              <li>
                                RTPCR test is not included in the package unless
                                mentioned. RTPCR to be given by hotel/resort as
                                complimentary is solely hotel discretion. NitSa
                                has no role and liability on it.
                              </li>
                              <li>
                                Please pay in the company’s account only - Earth
                                travels (Registered name of NitSa Holidays).
                                Payments in individual account of agents are not
                                acceptable by the company.
                              </li>
                              <li>
                                Courier charges / Photo charges developed by us
                                at the time of visa are not included in the
                                package cost as it may vary and will be paid
                                additionally by the client.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Flights booking and prices are dynamic and will be
                            applicable at the time of booking; any difference in
                            fare amount will be borne by customer before flights
                            being booked.
                          </li>
                          <li>
                            USD/SGD fluctuation will be taken into
                            consideration. ROE Calculation = Current XE + 1.5.
                            Final amount of the package will be as per the
                            USD/SGD rate on the date of final payment and
                            difference amount will be adjusted in package
                            amount.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            <section className="faq mb-80">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="inclusions">
                      <div className="box mb-0">
                        <h4 className="purple bg-white">CANCELLATION POLICY</h4>
                        <ul className="list-auto">
                          <li>
                            In all other cases cancellation charge will be as
                            per the booking condition of the tour and we shall
                            be constrained to levy the following cancellation
                            charges per person.
                          </li>
                          <li>
                            If cancellation is made any time not less than 31
                            days prior to departure, 20000/- per person shall be
                            deducted.(except ticket cancellation and Visa
                            charges)
                            <ul className="list-circle">
                              <li>30- 16 days: 50% of the total land cost</li>
                              <li>15 – 8 days: 75% of the total land cost</li>
                              <li>7 – 0 days: 100% cancellation will apply</li>
                              <li>
                                Visa Fee & Service charges are non-refundable.
                              </li>
                            </ul>
                          </li>
                          <li>
                            No refund either in part or in full will be made for
                            any unused part of the services provided in the
                            package
                          </li>
                          <li>
                            The tour cost does not include any Overseas
                            Insurance Premium, but we strongly recommend
                            Overseas Insurance Policy. The same after issuance
                            is non-refundable
                          </li>
                          <li>
                            The above policy will change in case of Hong Kong,
                            Genting Highlands, Maldives and other destinations
                            where 100% cancellation shall be applicable after
                            confirmation.
                          </li>
                          <li>
                            Star Classification of Hotels/Resort is based on
                            information provided by the individual Hotel/Resort
                            you may verify same by directly contacting the
                            concerned hotel by visiting their website or
                            Telephone number. We endeavor to validate and
                            authenticate this information in utter good faith.
                            We do not own any responsibility for any correct
                            star rating and type of bedroom provide by the
                            Hotel/Resort. Descriptions, photographs, sketches
                            and list of amenities/facilities are also provided
                            by the Hotel/Resort, this may also be got verified
                            by directly communicating the Hotel/Resort by
                            visiting their website or by contacting the
                            Hotel/Resort management on Telephone number. Hope so
                            above is in order. For any further detail, feel free
                            to contact me.
                          </li>
                          <li>
                            We need Rs. 20,000/- per person as a booking deposit
                            with passport copies - Photo page, address page.
                          </li>
                          <li>
                            Air tickets payment to be made before issuing of the
                            tickets.
                          </li>
                          <li>
                            Hotel payment to be made before time limit of
                            hotels.
                          </li>
                          <li>
                            Vouchers will be handed over to you after final
                            payment and it will take 3 working days to process
                            your vouchers after receiving full and final
                            payment, Itinerary will be provided 7 to 8 days
                            before the trip date.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 
      // 
      
      
      
      */}
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="foter_img text-center">
                    <div>
                      <img
                        style={{
                          borderRadius: "55px",
                          height: "120px",
                          width: "120px",
                          backgroundColor: "white",
                        }}
                        alt={QuotationObj?.agentObj?.photoUrl}
                        src={QuotationObj?.agentObj?.baseImage}
                        // src={images.yes_bank}
                      />
                    </div>
                    {/* {generateFilePath(QuotationObj?.agentObj?.photoUrl)}w */}

                    <h4 className="name_info">
                      {QuotationObj?.agentObj?.firstName + " "}
                      {QuotationObj?.agentObj?.lastName}
                    </h4>
                    <h5 className="categofy_info">
                      {QuotationObj?.agentObj?.designation
                        ? QuotationObj?.agentObj?.designation
                        : "Sales Executive"}{" "}
                    </h5>
                    <h6 className="info_num">
                      {QuotationObj?.agentObj?.phone
                        ? QuotationObj?.agentObj?.phone
                        : "+91 9310 985 146"}
                    </h6>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="text-center">
                    <img
                      style={{ height: "170px", width: "200px" }}
                      src={images.logo}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="info_list">
                    <div className="right_info">
                      <ul>
                        <li>
                          <a
                            href={`https://api.whatsapp.com/send?phone=${QuotationObj?.agentObj?.phone}`}
                            target={"_blank"}
                          >
                            {QuotationObj?.agentObj?.phone
                              ? QuotationObj?.agentObj?.phone
                              : ""}
                            <span>
                              <img src={images.whatsapp} alt="" />{" "}
                            </span>
                          </a>
                        </li>

                        <li>
                          <a
                            href={`mailto:${QuotationObj?.agentObj?.email}`}
                            target={"_blank"}
                          >
                            {QuotationObj?.agentObj?.email
                              ? QuotationObj?.agentObj?.email
                              : ""}
                            <span>
                              <img src={images.gmail} alt="" />{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="socal_link">
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/FlipTripHolidays"
                            target={"_blank"}
                          >
                            <i
                              class="fa fa-facebook-square"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/Fliptrip_h"
                            target={"_blank"}
                          >
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/fliptrip_holidays/"
                            target={"_blank"}
                          >
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/channel/UCV_qHw1tK_x3e-IOMfrMhtw"
                            target={"_blank"}
                          >
                            <i
                              class="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="purple-bg topftre py-3 px-4 my-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <p className="mb-0 text-white">
                      <a
                        href="https://goo.gl/maps/nv3JerjMBZokNV7F7"
                        target={"_blank"}
                      >
                        Northex Tower, 806, ITL, A-09, Netaji Subhash Place,
                        Pitam Pura, New Delhi, Delhi 110034, India
                      </a>
                    </p>
                    <p className="mb-0 text-white">
                      +91 99993 16587, +91 99993 16597
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* 
      
      
      
      
      */}
            {/* 
            
            
            */}
          </div>
        </div>
      )}
    </>
  );
};

export default AddPayment;
