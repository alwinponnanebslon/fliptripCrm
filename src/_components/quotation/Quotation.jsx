// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill"; // ES6
// import Select from "react-select";
// import CustomButton from "../../Utility/Button";
// import { DashboardBox } from "../../Utility/DashboardBox";
// import FileUpload from "../../Utility/FileUpload";
// import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
// // import { getAllNestedCategories } from "../../../redux/actions/Category/Category.actions";
// // import { BrandGet } from "../../../redux/actions/Brand/brand.actions";
// // import { PRODUCTAdd } from "../../../redux/actions/Product/Product.actions";
// // import { ATTRIBUTEGet } from "../../../redux/actions/Attribute/Attribute.actions";

import React, { useState, useEffect } from "react";
import Select from "react-select";
// import ReactQuill from "react-quill"; // ES6
// import { AddModal } from "../Utility/Modal";
import CustomButton from "../Utility/Button";
// import Attribute from "./Attribute";
import { DashboardBox } from "../Utility/DashboardBox";
// import FileUpload from "../Utility/FileUpload";

// function GeneralProduct() {
//     const dispatch = useDispatch();
//     const [destinationName, setDestinationName] = useState("");
//     const [durationOfTour, setDurationOfTour] = useState(0);
//     const [numberOfGuest, setNumberOfGuest] = useState(0);
//     const [adultCount, setAdultCount] = useState(0);
//     /////
//     const [childWithoutBed, setChildWithoutBed] = useState(0);
//     const [childWithBed, setChildWithBed] = useState(0);
//     const [hotelDetail, setHotelDetail] = useState([]); ////////////

//     const [visaRequired, setVisaRequired] = useState("");
//     const [visaOnArrival, setVisaOnArrival] = useState("");
//     ///////warehouse address
//     const [airportTransfer, setAirportTransfer] = useState("");
//     const [tour, setTour] = useState("");
//     const [leadId, setLeadId] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [expirationDate, setExpirationDate] = useState("");
//     ///////Country of Origin
//     const [termAndCondition, setTermAndCondition] = useState("");
//     //////product details
//     const [amount, setAmount] = useState(0);
//     const [tax, setTax] = useState(0);
//     const [amountWithTax, setAmountWithTax] = useState(0);
//     const [dayOfItinerary, setDayOfItinerary] = useState("");

//     ////////////////////////////////////////
//     //   const authUser = useSelector((state) => state.auth.user);
//     //   const brands = useSelector((state) => state.brand.brands);

//     const handleSubmit = () => {
//         let obj = {
//             destinationName,
//             durationOfTour,
//             numberOfGuest,
//             adultCount,
//             childWithoutBed,
//             childWithBed: Number,

//             hotelDetail,
//             // tourDetails,
//             visaRequired,
//             visaOnArrival,

//             airportTransfer,
//             tour,
//             leadId,
//             startDate,
//             expirationDate,
//             termAndCondition,
//             amount,
//             tax,
//             amountWithTax,
//             dayOfItinerary,
//         };
//         console.log(obj, "send Obj");
//         //   dispatch(QUOTATIONAdd(obj));
//     };

//     useEffect(() => {
//         //   dispatch(QUOTATIONGet());
//     }, []);

//     return (
//         <form className="form">
//             <div className="row">
//                 <div className="col-12 col-md-8">
//                     <DashboardBox>
//                         <div className="border-bottom pb-3 mb-4 row">
//                             <h5 className="blue-1 mb-4">QUOTATION Information</h5>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Destination Name <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={destinationName}
//                                     onChange={(event) => setDestinationName(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Duration Of Tour <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={durationOfTour}
//                                     onChange={(event) => setDurationOfTour(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//

//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Number Of Guest <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={numberOfGuest}
//                                     onChange={(event) => setNumberOfGuest(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     adult Count <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={adultCount}
//                                     onChange={(event) => setAdultCount(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Child Without Bed <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={childWithoutBed}
//                                     onChange={(event) => setChildWithoutBed(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Child With Bed<span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={childWithBed}
//                                     onChange={(event) => setChildWithBed(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Visa Required <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={visaRequired}
//                                     onChange={(event) => setVisaRequired(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Visa On Arrival <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={visaOnArrival}
//                                     onChange={(event) => setVisaOnArrival(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Airport Transfer <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={airportTransfer}
//                                     onChange={(event) => setAirportTransfer(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             {/* /////////// ..................................... */}
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     tour <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={tour}
//                                     onChange={(event) => setTour(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Lead Id <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={leadId}
//                                     onChange={(event) => setLeadId(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Start Date <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={startDate}
//                                     onChange={(event) => setStartDate(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Expiration Date <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={expirationDate}
//                                     onChange={(event) => setExpirationDate(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Term And Condition <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={termAndCondition}
//                                     onChange={(event) => setTermAndCondition(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Amount <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={amount}
//                                     onChange={(event) => setAmount(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             setDayOfItinerary
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Tax<span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={tax}
//                                     onChange={(event) => setTax(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Amount With Tax <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={amountWithTax}
//                                     onChange={(event) => setAmountWithTax(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12 col-md-6 mb-3">
//                                 <label>
//                                     Day Of Itinerary <span className="red">*</span>
//                                 </label>
//                                 <input
//                                     value={dayOfItinerary}
//                                     onChange={(event) => setDayOfItinerary(event.target.value)}
//                                     type="text"
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="col-12">
//                                 <CustomButton
//                                     btntype="button"
//                                     ClickEvent={handleSubmit}
//                                     isBtn
//                                     iconName="fa-solid fa-check"
//                                     btnName="Save"
//                                 />
//                             </div>
//                         </div>
//                     </DashboardBox>
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default GeneralProduct;

//

//

function Quotation() {
  // const dispatch = useDispatch();
  const [destinationName, setDestinationName] = useState("");
  const [durationOfTour, setDurationOfTour] = useState(0);
  const [numberOfGuest, setNumberOfGuest] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  /////
  const [childWithoutBed, setChildWithoutBed] = useState(0);
  const [childWithBed, setChildWithBed] = useState(0);
  const [hotelDetail, setHotelDetail] = useState([]); ////////////

  const [visaRequired, setVisaRequired] = useState("");
  const [visaOnArrival, setVisaOnArrival] = useState("");
  ///////warehouse address
  const [airportTransfer, setAirportTransfer] = useState("");
  const [tour, setTour] = useState("");
  const [leadId, setLeadId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  ///////Country of Origin
  const [termAndCondition, setTermAndCondition] = useState("");
  //////product details
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [amountWithTax, setAmountWithTax] = useState(0);
  const [dayOfItinerary, setDayOfItinerary] = useState("");

  const [Type, setType] = useState("single");

  const [despcription, setdespcription] = useState("");
  const [Specifications, setSpecifications] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [IsPhysicalProduct, setIsPhysicalProduct] = useState(false);
  console.log("quotation alled ");
  return (
    <form action="#" className="form">
      <div className="row">
        <div className="col-12 col-md-8">
          <DashboardBox>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">QUOTATION Information</h5>
              <div className="col-12 mb-3">
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Destination Name <span className="red">*</span>
                  </label>
                  <input
                    value={destinationName}
                    onChange={(event) => setDestinationName(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                {Type === "single" && (
                  <div className="col-12 col-md-6 mb-3">
                    <label>
                      Duration Of Tour <span className="red">*</span>
                    </label>
                    <input
                      value={durationOfTour}
                      onChange={(event) =>
                        setDurationOfTour(event.target.value)
                      }
                      type="text"
                      className="form-control"
                    />
                  </div>
                )}

                <div className="col-12 col-md-4 mb-3">
                  <label>
                    Number Of Guest <span className="red">*</span>
                  </label>
                  <input
                    value={numberOfGuest}
                    onChange={(event) => setNumberOfGuest(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <label>
                    adult Count <span className="red">*</span>
                  </label>
                  <input
                    value={adultCount}
                    onChange={(event) => setAdultCount(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Child Without Bed <span className="red">*</span>
                  </label>
                  <input
                    value={childWithoutBed}
                    onChange={(event) => setChildWithoutBed(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Child With Bed<span className="red">*</span>
                  </label>
                  <input
                    value={childWithBed}
                    onChange={(event) => setChildWithBed(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Visa Required <span className="red">*</span>
                  </label>
                  <input
                    value={visaRequired}
                    onChange={(event) => setVisaRequired(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Visa On Arrival <span className="red">*</span>
                  </label>
                  <input
                    value={visaOnArrival}
                    onChange={(event) => setVisaOnArrival(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Airport Transfer <span className="red">*</span>
                  </label>
                  <input
                    value={airportTransfer}
                    onChange={(event) => setAirportTransfer(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                {/* /////////// ..................................... */}
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    tour <span className="red">*</span>
                  </label>
                  <input
                    value={tour}
                    onChange={(event) => setTour(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Lead Id <span className="red">*</span>
                  </label>
                  <input
                    value={leadId}
                    onChange={(event) => setLeadId(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Start Date <span className="red">*</span>
                  </label>
                  <input
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Expiration Date <span className="red">*</span>
                  </label>
                  <input
                    value={expirationDate}
                    onChange={(event) => setExpirationDate(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Term And Condition <span className="red">*</span>
                  </label>
                  <input
                    value={termAndCondition}
                    onChange={(event) =>
                      setTermAndCondition(event.target.value)
                    }
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Amount <span className="red">*</span>
                  </label>
                  <input
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                {/* setDayOfItinerary */}
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Tax<span className="red">*</span>
                  </label>
                  <input
                    value={tax}
                    onChange={(event) => setTax(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Amount With Tax <span className="red">*</span>
                  </label>
                  <input
                    value={amountWithTax}
                    onChange={(event) => setAmountWithTax(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    Day Of Itinerary <span className="red">*</span>
                  </label>
                  <input
                    value={dayOfItinerary}
                    onChange={(event) => setDayOfItinerary(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <CustomButton
                    btntype="button"
                    // ClickEvent={handleSubmit}
                    isBtn
                    iconName="fa-solid fa-check"
                    btnName="Save"
                  />
                </div>
              </div>

              {/* 
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Name <span className="red">*</span>
                                </label>
                                <input type="text" className="form-control" />
                            </div>
                            {Type === "single" && (
                                <div className="col-12 col-md-6 mb-3">
                                    <label>
                                        PRODUCT SKU <span className="red">*</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                            )}
                            <div className="col-12 col-md-3 mb-3">
                                <label>MODEL NUMBER</label>
                                <input type="tel" className="form-control" />
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <div className="d-flex align-items-baseline justify-content-between">
                                    <label>
                                        CATEGORY<span className="red">*</span>
                                    </label>
                                    <CustomButton
                                        isBtn
                                        iconName="fa-solid fa-circle-plus"
                                        btnName="ADD NEW"
                                        changeClass="green fs-12 border-0 bg-white"
                                        ClickEvent={(e) => {
                                            e.preventDefault();
                                            setModalBox(true);
                                            setModalType("addCategoryModal");
                                            setModalName("Create Category");
                                        }}
                                    />
                                    <AddModal
                                        ModalBox={ModalBox}
                                        setModalBox={setModalBox}
                                        name={ModalName}
                                        ModalType={ModalType}
                                    />
                                </div>
                                {/* <Select options={options} /> */}
              {/* </div>
                            <div className="col-12 col-md-3 mb-3">
                                <div className="d-flex align-items-baseline justify-content-between">
                                    <label>BRAND</label>
                                    <CustomButton
                                        isBtn
                                        iconName="fa-solid fa-circle-plus"
                                        btnName="ADD NEW"
                                        changeClass="green fs-12 border-0 bg-white"
                                        ClickEvent={(e) => {
                                            e.preventDefault();
                                            setModalBox(true);
                                            setModalType("addBrandModal");
                                            setModalName("Create Brand");
                                        }}
                                    />
                                    <AddModal
                                        ModalBox={ModalBox}
                                        setModalBox={setModalBox}
                                        name={ModalName}
                                        ModalType={ModalType}
                                    />
                                </div>
                                {/* <Select options={options} /> }
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <label>BARCODE TYPE</label>
                                { <Select options={options} /> }
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <label>
                                    MINIMUM ORDER QTY <span className="red">*</span>
                                </label>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <label>MAX ORDER QTY</label>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="col-12 mb-3">
                                <label>
                                    Tags (Comma Separated)
                                    <span className="red">*</span>
                                </label>
                                <input type="text" className="form-control" />
                            </div>

                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <div className="col-12 mb-2">
                                <div className="form-check form-check-inline d-flex align-items-center pointer">
                                    <input
                                        className="form-check-input pointer"
                                        type="checkbox"
                                        name="physical-product"
                                        value="option1"
                                        id="physical-product"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setIsPhysicalProduct(true);
                                            } else {
                                                setIsPhysicalProduct(false);
                                            }
                                        }}
                                    />
                                    <label
                                        className="form-check-label fs-14 pointer"
                                        htmlFor="physical-product"
                                    >
                                        Is physical Product?
                                    </label>
                                </div>
                            </div>
                            {IsPhysicalProduct && (
                                <>
                                    <div className="col-12 mb-0">
                                        <h5 className="blue-1 mb-4">Weight Height Info</h5>
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label>Weight [Gm]</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label>Length [Cm]</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label>Breadth [Cm]</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label>Height [Cm]</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Additional Shipping Charge</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value="0"
                                            className="form-control"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Price Info And Stock</h5>
                            <div className="col-12 col-md-6 mb-3">
                                <label>STOCK MANAGE</label>
                                { <Select options={yes_no} /> }
                            </div>
                            {Type === "single" && (
                                <>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label>PRODUCT STOCK</label>
                                        <input type="tel" className="form-control" />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label>
                                            SELLING PRICE<span className="red">*</span>
                                        </label>
                                        <input type="tel" className="form-control" />
                                    </div>
                                </>
                            )}
                            <div className="col-12 col-md-3 mb-3">
                                <label>DISCOUNT</label>
                                <input type="tel" className="form-control" />
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <label>DISCOUNT TYPE</label>
                                {/* <Select options={discount} /> }
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>GST/VAT/TAX GROUP</label>
                                {/* <Select options={options} /> }
                            </div>
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Description</h5>
                            <div className="col-12 mb-3">
                                <ReactQuill
                                    theme="snow"
                                    value={despcription}
                                    onChange={(e) => setdespcription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Specifications</h5>
                            <div className="col-12 mb-3">
                                <ReactQuill
                                    value={Specifications}
                                    onChange={(e) => setSpecifications(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <h5 className="blue-1 mb-4">SEO info</h5>
                            <div className="col-12 mb-3">
                                <label>META TITLE</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12 mb-3">
                                <label>META DESCRIPTION</label>
                                <textarea
                                    name="META DESCRIPTION"
                                    className="form-control"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="col-12 mb-3">
                                <label>META IMAGE (300X300)PX</label>
                                <FileUpload />
                            </div> 
                            { <div className="col-12">
                                <CustomButton
                                    isBtn
                                    iconName="fa-solid fa-check"
                                    btnName="Save"
                                />
                            </div> */}
            </div>
          </DashboardBox>
        </div>
      </div>
    </form>
  );
}

export default Quotation;
