// return (
//   <div id="add_quote" className="modal custom-modal fade" role="dialog">
//     {/*  <div id="add_quote" className="modal custom-modal" role="dialog"> */}
//     <div
//       className="modal-dialog modal-dialog-centered modal-lg"
//       role="document"
//     >
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">{isUpdateTour ? "Edit" : "Add"} Quote</h5>
//           <button
//             type="button"
//             // className="close"
//             // data-bs-dismiss="modal"
//             // aria-label="Close"
//           >
//             <span aria-hidden="true">×</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <form onSubmit={handleSubmit}>
//             {/* <form action="#"> */}

//             <div className="row">
//               <div className=" form-group col-md-12">
//                 <label className="col-form-label ">
//                   Destination Name <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={destinationName}
//                   onChange={(e) => setDestinationName(e.target.value)}
//                 />
//               </div>

//               <div className="content">
//                 <div className="row">
//                   <div className="col-sm-12">
//                     <h3 className="mt-3 mb-4">Tour Details </h3>
//                   </div>
//                   {/* {console.log(tourArr, "travel,23")} */}
//                   {travelList &&
//                     travelList.map((item, index) => {
//                       return (
//                         <div className="row" key={index}>
//                           <div className="col-md-4 mb-3">
//                             <label className="col-form-label ">
//                               Tour <span className="text-danger">*</span>
//                             </label>

//                             <select
//                               className="form-control"
//                               name="name"
//                               value={item?.name}
//                               onChange={(e) => handleTourValueChange(e, index)}
//                             >
//                               <option value="" disabled>
//                                 --select an option--
//                               </option>
//                               {tourArr &&
//                                 tourArr.length > 0 &&
//                                 tourArr.map((el, inde) => (
//                                   <option key={inde} value={el.name}>
//                                     {el.name}
//                                   </option>
//                                 ))}
//                             </select>
//                           </div>
//                           <div className="col-md-4">
//                             <label className="col-form-label ">
//                               Start Date
//                               <span className="text-danger">*</span>
//                             </label>
//                             <div className="col-sm-8">
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 name="startDate"
//                                 value={item.startDate}
//                                 onChange={(e) =>
//                                   handleTourValueChange(e, index)
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <label className="col-form-label ">
//                               Expiration Date
//                             </label>
//                             <div className="col-sm-8">
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 name="endDate"
//                                 value={item.endDate}
//                                 onChange={(e) =>
//                                   handleTourValueChange(e, index)
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <div className="form-group col-md-2 mt-4">
//                             {travelList.length !== 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-danger"
//                                 // className="btn btn-success"
//                                 onClick={() => handleRemoveTravel(index)}
//                               >
//                                 Remove
//                               </button>
//                             )}
//                           </div>
//                           <div className="col-md-12">
//                             {travelList.length - 1 === index && (
//                               <button
//                                 type="button"
//                                 className="btn btn-success"
//                                 onClick={handleAddClickTour}
//                               >
//                                 Add More
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>

//               <div className=" form-group col-md-6">
//                 <label className="col-form-label ">
//                   Duration Of Tour <span className="text-danger">*</span> (in
//                   Nights) ({`${durationOfTour}N/${days}D`})
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={durationOfTour}
//                   onChange={(e) => {
//                     handleEnterNumberOfDays(e.target.value);
//                   }}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="col-form-label ">
//                   Number Of Guest <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={numberOfGuest}
//                   onChange={(e) => setNumberOfGuest(e.target.value)}
//                 />
//               </div>

//               {/* <div className="col-md-6">
//                         <label className="col-form-label ">
//                             Adult Count <span className="text-danger">*</span>
//                           </label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={adultCount}
//                               onChange={(e) => setAdultCount(e.target.value)}
//                             />
//                         </div>

//                         <div className="col-md-6  ">
//                         <label className="col-form-label ">
//                           Child Without Bed
//                           <span className="text-danger">*</span>
//                         </label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             value={childWithoutBed}
//                             onChange={(e) => setChildWithoutBed(e.target.value)}
//                           />
//                         </div>
//                         <div className="col-md-6">
//                         <label className=" ">
//                           Child With Bed <span className="text-danger">*</span>
//                         </label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             value={childWithBed}
//                             onChange={(e) => setChildWithBed(e.target.value)}
//                           />
//                       </div> */}
//             </div>

//             <div className="content">
//               <div className="row">
//                 <div className="col-sm-12">
//                   <h3 className="mt-3 mb-4 ">Traveller Details</h3>
//                   <div className="row">
//                     <div className="col-3">
//                       <label className="col-form-label ">
//                         Adults
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         value={parseInt(numberofAdults)}
//                         onChange={(e) => {
//                           console.log(e.target.value, "value");
//                           handletravelersSelect(
//                             e.target.value,
//                             "numberofAdults"
//                           );
//                         }}
//                       >
//                         <option value={0}>0</option>
//                         <option value={1}>1</option>
//                         <option value={2}>2</option>
//                         <option value={3}>3</option>
//                         <option value={4}>4</option>
//                         <option value={5}>5</option>
//                         <option value={6}>6</option>
//                         <option value={7}>7</option>
//                         <option value={8}>8</option>
//                         <option value={9}>9</option>
//                         <option value={10}>10</option>
//                       </select>
//                     </div>
//                     <div className="col-3">
//                       <label className="col-form-label ">
//                         Children with Bed
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         value={parseInt(numberOfChildrenWithBed)}
//                         onChange={(e) => {
//                           handletravelersSelect(
//                             e.target.value,
//                             "numberOfChildrenWithBed"
//                           );
//                         }}
//                       >
//                         <option value={0}>0</option>
//                         <option value={1}>1</option>
//                         <option value={2}>2</option>
//                         <option value={3}>3</option>
//                         <option value={4}>4</option>
//                         <option value={5}>5</option>
//                         <option value={6}>6</option>
//                         <option value={7}>7</option>
//                         <option value={8}>8</option>
//                         <option value={9}>9</option>
//                         <option value={10}>10</option>
//                       </select>
//                     </div>
//                     <div className="col-3">
//                       <label className="col-form-label ">
//                         Children without Bed
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         value={parseInt(numberOfChildrenWithoutBed)}
//                         onChange={(e) => {
//                           handletravelersSelect(
//                             e.target.value,
//                             "numberOfChildrenWithoutBed"
//                           );
//                         }}
//                       >
//                         <option value={0}>0</option>
//                         <option value={1}>1</option>
//                         <option value={2}>2</option>
//                         <option value={3}>3</option>
//                         <option value={4}>4</option>
//                         <option value={5}>5</option>
//                         <option value={6}>6</option>
//                         <option value={7}>7</option>
//                         <option value={8}>8</option>
//                         <option value={9}>9</option>
//                         <option value={10}>10</option>
//                       </select>
//                     </div>
//                     <div className="col-3">
//                       <label className="col-form-label ">
//                         Infants
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         value={parseInt(numberOfInfants)}
//                         onChange={(e) => {
//                           handletravelersSelect(
//                             e.target.value,
//                             "numberOfInfants"
//                           );
//                         }}
//                       >
//                         <option value={0}>0</option>
//                         <option value={1}>1</option>
//                         <option value={2}>2</option>
//                         <option value={3}>3</option>
//                         <option value={4}>4</option>
//                         <option value={5}>5</option>
//                         <option value={6}>6</option>
//                         <option value={7}>7</option>
//                         <option value={8}>8</option>
//                         <option value={9}>9</option>
//                         <option value={10}>10</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="content">
//               <h3 className="mt-3 mb-4 ">Hotel details</h3>
//               {hotelList &&
//                 hotelList.map((hotel, i) => {
//                   return (
//                     <div className="row mb-3" key={i}>
//                       <div className="form-group col-md-4">
//                         <label>Hotel Name</label>
//                         <input
//                           type="text"
//                           name="hotelName"
//                           className="form-control"
//                           placeholder="Name"
//                           value={hotel.hotelName}
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         />
//                       </div>

//                       <div className="form-group col-md-4">
//                         <label> Room Type</label>
//                         <input
//                           type="text"
//                           name="roomType"
//                           value={hotel.roomType}
//                           className="form-control"
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         />
//                       </div>
//                       <div className="form-group col-md-4">
//                         <label>Rating</label>
//                         <select
//                           className="form-control"
//                           name="rating"
//                           value={parseInt(hotel.rating)}
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         >
//                           <option value={2}>2</option>
//                           <option value={3}>3</option>
//                           <option value={4}>4</option>
//                           <option value={5}>5</option>
//                         </select>
//                       </div>

//                       <div className="form-group col-md-4">
//                         <label> Check In </label>
//                         <input
//                           type="date"
//                           // type="text"
//                           name="checkIn"
//                           value={`${moment(hotel.checkIn).format(
//                             "YYYY-MM-DD"
//                           )}`}
//                           className="form-control"
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         />
//                       </div>

//                       <div className="form-group col-md-4">
//                         <label> Number Of Night</label>
//                         <input
//                           type="number"
//                           name="numberOfNight"
//                           value={`${hotel.numberOfNight}`}
//                           className="form-control"
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         />
//                       </div>

//                       <div className="form-group col-md-4">
//                         <label> Check Out </label>
//                         <input
//                           type="date"
//                           // type="text"
//                           name="checkOut"
//                           value={`${moment(hotel.checkOut).format(
//                             "YYYY-MM-DD"
//                           )}`}
//                           disabled
//                           className="form-control"
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         />
//                       </div>

//                       {/* <div className="form-group col-md-4">
//                           <label>Hotel Address</label>
//                           <input
//                             type="text"
//                             name="hotelAddress"
//                             className="form-control"
//                             value={hotel.hotelAddress}
//                             onChange={(e) => handleinputchangeHotel(e, i)}
//                           />
//                         </div> */}
//                       <div className="form-group col-md-4">
//                         <label>Hotel Address</label>
//                         <input
//                           type="text"
//                           name="hotelAddress"
//                           className="form-control"
//                           value={hotel.hotelAddress}
//                           onChange={(e) => handleinputchangeHotel(e, i)}
//                         />
//                       </div>

//                       <div className="form-group col-md-2 mt-4">
//                         {hotelList.length !== 1 && (
//                           <button
//                             type="button"
//                             // className="btn btn-success"
//                             className="btn btn-danger mx-1"
//                             onClick={() => handleremoveHotel(i)}
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                       {durationOfTour &&
//                       hotelList.reduce(
//                         (acc, el) => acc + parseInt(el.numberOfNight),
//                         0
//                       ) < durationOfTour ? (
//                         <div className="col-md-12">
//                           {/* {hotelList.length - 1 === i && ( */}
//                           <button
//                             type="button"
//                             className="btn btn-success"
//                             onClick={handleaddclickHotel}
//                           >
//                             Add More
//                           </button>
//                           {/* )} */}
//                         </div>
//                       ) : (
//                         ""
//                       )}
//                     </div>
//                   );
//                 })}
//             </div>

//             <div className="row">
//               <div className="form-group col-3">
//                 <label className="col-form-label ">
//                   Visa Required
//                   <span className="text-danger">*</span>
//                 </label>
//               </div>
//               <div className="col-md-9">
//                 <select
//                   className="form-control"
//                   value={visaRequired}
//                   onChange={(e) => {
//                     setVisaRequired(e.target.value);
//                   }}
//                 >
//                   <option value="Visa is required">Visa is Required</option>
//                   <option value="Visa not Required">Visa not Required</option>
//                   <option value="Visa on Arrival">Visa on Arrival</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group row">
//               <label className="col-form-label col-md-3">
//                 Airport Transfer
//               </label>
//               <div className="col-md-9">
//                 <select
//                   className="form-control"
//                   value={airportTransfer}
//                   onChange={(e) => {
//                     setAirportTransfer(e.target.value);
//                   }}
//                 >
//                   <option value="Private">Private</option>
//                   <option value="Seat in coach basis">
//                     Seat in coach basis
//                   </option>
//                   <option value="Private + Seat in coach basis">
//                     Private + Seat in coach basis
//                   </option>
//                 </select>
//                 {/* <input
//                     type="text"
//                     className="form-control"
//                     value={airportTransfer}
//                     onChange={(e) => setAirportTransfer(e.target.value)}
//                   /> */}
//               </div>
//             </div>

//             <div className="content">
//               <div className="row">
//                 <div className="col-sm-12">
//                   <h3 className="mt-3 mb-4">Itinerary Details</h3>
//                   {itineraryList &&
//                     itineraryList.map((itinerary, i) => {
//                       return (
//                         <div className="row mb-3" key={i}>
//                           <div className="form-group col-md-1">
//                             <label>Day </label>
//                             <div style={{ paddingTop: 10 }}>
//                               {itinerary.day}
//                             </div>
//                           </div>
//                           <div className="form-group col-md-5">
//                             <label>Itinerary Heading</label>
//                             <input
//                               type="text"
//                               name="itineraryHeading"
//                               className="form-control"
//                               value={itinerary.itineraryHeading}
//                               placeholder="Enter Itinerary Heading"
//                               onChange={(e) => handleinputchangeItinerary(e, i)}
//                             />
//                           </div>
//                           <div className="form-group col-md-12">
//                             <label>Itinerary Description</label>
//                             <textarea
//                               type="text"
//                               name="itineraryName"
//                               className="form-control"
//                               value={itinerary.itineraryName}
//                               placeholder="Enter Itinerary Description"
//                               onChange={(e) => handleinputchangeItinerary(e, i)}
//                             />
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-form-label col-md-2">
//                 Term And Condition
//               </label>
//               <div className="col-md-10">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={termAndCondition}
//                   onChange={(e) => setTermAndCondition(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="form-group col-md-6">
//               <label className="col-form-label ">
//                 Flight
//                 <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="checkbox"
//                 name="IsAirport"
//                 style={{ marginLeft: 10 }}
//                 value={isAirport}
//                 checked={isAirport}
//                 onChange={(e) => {
//                   setIsAirport(!isAirport);
//                 }}
//               />
//             </div>

//             <div className="form-group col-md-6">
//               <label className="col-form-label ">
//                 Land Packages
//                 <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="checkbox"
//                 name="Island"
//                 style={{ marginLeft: 10 }}
//                 value={island}
//                 checked={island}
//                 onChange={(e) => {
//                   setIsLand(!island);
//                 }}
//               />
//             </div>

//             <div className="form-group row">
//               <label className="col-form-label col-md-2">Summary</label>
//               <div className="col-md-12">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <td>Mode</td>
//                       <td>Person</td>
//                       <td>per Person Price</td>
//                       <td>Total</td>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isAirport && (
//                       <tr>
//                         <td>Flight</td>
//                         <td>{numberOfGuest}</td>
//                         <td>
//                           <input
//                             type="text"
//                             value={[perPersonAirPortPrice]}
//                             onChange={(e) => {
//                               setPerPersonAirportPrice(e.target.value);
//                               setTotalPersonAirportPrice(
//                                 numberOfGuest * e.target.value
//                               );
//                             }}
//                           />
//                         </td>
//                         <td>{totalPersonAirPortPrice}</td>
//                       </tr>
//                     )}

//                     {island && (
//                       <tr>
//                         <td>Land Package</td>
//                         <td>{numberOfGuest}</td>
//                         <td>
//                           <input
//                             type="text"
//                             value={[perPersonLandPrice]}
//                             onChange={(e) => {
//                               setPerPersonLandPrice(e.target.value);
//                               setTotalPersonLandPrice(
//                                 numberOfGuest * e.target.value
//                               );
//                             }}
//                           />
//                         </td>
//                         <td>{totalPersonLandPrice}</td>
//                       </tr>
//                     )}

//                     <tr>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                     </tr>

//                     <tr>
//                       <td></td>
//                       <td></td>
//                       <td>Total</td>
//                       <td>{amount}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="col-12">
//               <button
//                 className="btn add-btn"
//                 type="submit"
//                 data-bs-dismiss="modal"
//               >
//                 {isUpdateTour ? "Update" : "Save"}
//               </button>
//             </div>
//             {/*
//               <div className="col-12">
//                 <button
//                   data-bs-dismiss="modal"
//                   className="btn add-btn"
//                   onClick={handlePerfomaInvoiceSubmit}
//                 >
//                   Save{" "}
//                 </button>
//               </div> */}
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// // /
// //
// //
// //
// //
// //
// //
// //
// //
// // /
// //
// //
// return (
//   <Modal show={show} id="add_quote">
//     <Modal.Header>
//       <Modal.Title> {isUpdateTour ? "Edit" : "Add"} Quote</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       {/* <div id="add_quote" className="modal custom-modal fade" role="dialog"> */}
//       {/*  <div id="add_quote" className="modal custom-modal" role="dialog"> */}

//       <form onSubmit={handleSubmit}>
//         {/* <form action="#"> */}

//         <div className="row">
//           <div className=" form-group col-md-12">
//             <label className="col-form-label ">
//               Destination Name <span className="text-danger">*</span>
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               value={destinationName}
//               onChange={(e) => setDestinationName(e.target.value)}
//             />
//           </div>

//           <div className="content">
//             <div className="row">
//               <div className="col-sm-12">
//                 <h3 className="mt-3 mb-4">Tour Details </h3>
//               </div>
//               {/* {console.log(tourArr, "travel,23")} */}
//               {travelList &&
//                 travelList.map((item, index) => {
//                   return (
//                     <div className="row" key={index}>
//                       <div className="col-md-4 mb-3">
//                         <label className="col-form-label ">
//                           Tour <span className="text-danger">*</span>
//                         </label>

//                         <select
//                           className="form-control"
//                           name="name"
//                           value={item?.name}
//                           onChange={(e) => handleTourValueChange(e, index)}
//                         >
//                           <option value="" disabled>
//                             --select an option--
//                           </option>
//                           {tourArr &&
//                             tourArr.length > 0 &&
//                             tourArr.map((el, inde) => (
//                               <option key={inde} value={el.name}>
//                                 {el.name}
//                               </option>
//                             ))}
//                         </select>
//                       </div>
//                       <div className="col-md-4">
//                         <label className="col-form-label ">
//                           Start Date
//                           <span className="text-danger">*</span>
//                         </label>
//                         <div className="col-sm-8">
//                           <input
//                             type="date"
//                             className="form-control"
//                             name="startDate"
//                             value={item.startDate}
//                             onChange={(e) => handleTourValueChange(e, index)}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4">
//                         <label className="col-form-label ">
//                           Expiration Date
//                         </label>
//                         <div className="col-sm-8">
//                           <input
//                             type="date"
//                             className="form-control"
//                             name="endDate"
//                             value={item.endDate}
//                             onChange={(e) => handleTourValueChange(e, index)}
//                           />
//                         </div>
//                       </div>
//                       <div className="form-group col-md-2 mt-4">
//                         {travelList.length !== 1 && (
//                           <button
//                             type="button"
//                             className="btn btn-danger"
//                             // className="btn btn-success"
//                             onClick={() => handleRemoveTravel(index)}
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                       <div className="col-md-12">
//                         {travelList.length - 1 === index && (
//                           <button
//                             type="button"
//                             className="btn btn-success"
//                             onClick={handleAddClickTour}
//                           >
//                             Add More
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>

//           <div className=" form-group col-md-6">
//             <label className="col-form-label ">
//               Duration Of Tour <span className="text-danger">*</span> (in
//               Nights) ({`${durationOfTour}N/${days}D`})
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               value={durationOfTour}
//               onChange={(e) => {
//                 handleEnterNumberOfDays(e.target.value);
//               }}
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="col-form-label ">
//               Number Of Guest <span className="text-danger">*</span>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               value={numberOfGuest}
//               onChange={(e) => setNumberOfGuest(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="content">
//           <div className="row">
//             <div className="col-sm-12">
//               <h3 className="mt-3 mb-4 ">Traveller Details</h3>
//               <div className="row">
//                 <div className="col-3">
//                   <label className="col-form-label ">
//                     Adults
//                     <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-control"
//                     value={parseInt(numberofAdults)}
//                     onChange={(e) => {
//                       console.log(e.target.value, "value");
//                       handletravelersSelect(e.target.value, "numberofAdults");
//                     }}
//                   >
//                     <option value={0}>0</option>
//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
//                     <option value={4}>4</option>
//                     <option value={5}>5</option>
//                     <option value={6}>6</option>
//                     <option value={7}>7</option>
//                     <option value={8}>8</option>
//                     <option value={9}>9</option>
//                     <option value={10}>10</option>
//                   </select>
//                 </div>
//                 <div className="col-3">
//                   <label className="col-form-label ">
//                     Children with Bed
//                     <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-control"
//                     value={parseInt(numberOfChildrenWithBed)}
//                     onChange={(e) => {
//                       handletravelersSelect(
//                         e.target.value,
//                         "numberOfChildrenWithBed"
//                       );
//                     }}
//                   >
//                     <option value={0}>0</option>
//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
//                     <option value={4}>4</option>
//                     <option value={5}>5</option>
//                     <option value={6}>6</option>
//                     <option value={7}>7</option>
//                     <option value={8}>8</option>
//                     <option value={9}>9</option>
//                     <option value={10}>10</option>
//                   </select>
//                 </div>
//                 <div className="col-3">
//                   <label className="col-form-label ">
//                     Children without Bed
//                     <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-control"
//                     value={parseInt(numberOfChildrenWithoutBed)}
//                     onChange={(e) => {
//                       handletravelersSelect(
//                         e.target.value,
//                         "numberOfChildrenWithoutBed"
//                       );
//                     }}
//                   >
//                     <option value={0}>0</option>
//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
//                     <option value={4}>4</option>
//                     <option value={5}>5</option>
//                     <option value={6}>6</option>
//                     <option value={7}>7</option>
//                     <option value={8}>8</option>
//                     <option value={9}>9</option>
//                     <option value={10}>10</option>
//                   </select>
//                 </div>
//                 <div className="col-3">
//                   <label className="col-form-label ">
//                     Infants
//                     <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-control"
//                     value={parseInt(numberOfInfants)}
//                     onChange={(e) => {
//                       handletravelersSelect(e.target.value, "numberOfInfants");
//                     }}
//                   >
//                     <option value={0}>0</option>
//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
//                     <option value={4}>4</option>
//                     <option value={5}>5</option>
//                     <option value={6}>6</option>
//                     <option value={7}>7</option>
//                     <option value={8}>8</option>
//                     <option value={9}>9</option>
//                     <option value={10}>10</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="content">
//           <h3 className="mt-3 mb-4 ">Hotel details</h3>
//           {hotelList &&
//             hotelList.map((hotel, i) => {
//               return (
//                 <div className="row mb-3" key={i}>
//                   <div className="form-group col-md-4">
//                     <label>Hotel Name</label>
//                     <input
//                       type="text"
//                       name="hotelName"
//                       className="form-control"
//                       placeholder="Name"
//                       value={hotel.hotelName}
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     />
//                   </div>

//                   <div className="form-group col-md-4">
//                     <label> Room Type</label>
//                     <input
//                       type="text"
//                       name="roomType"
//                       value={hotel.roomType}
//                       className="form-control"
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     />
//                   </div>
//                   <div className="form-group col-md-4">
//                     <label>Rating</label>
//                     <select
//                       className="form-control"
//                       name="rating"
//                       value={parseInt(hotel.rating)}
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     >
//                       <option value={2}>2</option>
//                       <option value={3}>3</option>
//                       <option value={4}>4</option>
//                       <option value={5}>5</option>
//                     </select>
//                   </div>

//                   <div className="form-group col-md-4">
//                     <label> Check In </label>
//                     <input
//                       type="date"
//                       // type="text"
//                       name="checkIn"
//                       value={`${moment(hotel.checkIn).format("YYYY-MM-DD")}`}
//                       className="form-control"
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     />
//                   </div>

//                   <div className="form-group col-md-4">
//                     <label> Number Of Night</label>
//                     <input
//                       type="number"
//                       name="numberOfNight"
//                       value={`${hotel.numberOfNight}`}
//                       className="form-control"
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     />
//                   </div>

//                   <div className="form-group col-md-4">
//                     <label> Check Out </label>
//                     <input
//                       type="date"
//                       // type="text"
//                       name="checkOut"
//                       value={`${moment(hotel.checkOut).format("YYYY-MM-DD")}`}
//                       disabled
//                       className="form-control"
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     />
//                   </div>

//                   {/* <div className="form-group col-md-4">
//                           <label>Hotel Address</label>
//                           <input
//                             type="text"
//                             name="hotelAddress"
//                             className="form-control"
//                             value={hotel.hotelAddress}
//                             onChange={(e) => handleinputchangeHotel(e, i)}
//                           />
//                         </div> */}
//                   <div className="form-group col-md-4">
//                     <label>Hotel Address</label>
//                     <input
//                       type="text"
//                       name="hotelAddress"
//                       className="form-control"
//                       value={hotel.hotelAddress}
//                       onChange={(e) => handleinputchangeHotel(e, i)}
//                     />
//                   </div>

//                   <div className="form-group col-md-2 mt-4">
//                     {hotelList.length !== 1 && (
//                       <button
//                         type="button"
//                         // className="btn btn-success"
//                         className="btn btn-danger mx-1"
//                         onClick={() => handleremoveHotel(i)}
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                   {durationOfTour &&
//                   hotelList.reduce(
//                     (acc, el) => acc + parseInt(el.numberOfNight),
//                     0
//                   ) < durationOfTour ? (
//                     <div className="col-md-12">
//                       {/* {hotelList.length - 1 === i && ( */}
//                       <button
//                         type="button"
//                         className="btn btn-success"
//                         onClick={handleaddclickHotel}
//                       >
//                         Add More
//                       </button>
//                       {/* )} */}
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               );
//             })}
//         </div>

//         <div className="row">
//           <div className="form-group col-3">
//             <label className="col-form-label ">
//               Visa Required
//               <span className="text-danger">*</span>
//             </label>
//           </div>
//           <div className="col-md-9">
//             <select
//               className="form-control"
//               value={visaRequired}
//               onChange={(e) => {
//                 setVisaRequired(e.target.value);
//               }}
//             >
//               <option value="Visa is required">Visa is Required</option>
//               <option value="Visa not Required">Visa not Required</option>
//               <option value="Visa on Arrival">Visa on Arrival</option>
//             </select>
//           </div>
//         </div>
//         <div className="form-group row">
//           <label className="col-form-label col-md-3">Airport Transfer</label>
//           <div className="col-md-9">
//             <select
//               className="form-control"
//               value={airportTransfer}
//               onChange={(e) => {
//                 setAirportTransfer(e.target.value);
//               }}
//             >
//               <option value="Private">Private</option>
//               <option value="Seat in coach basis">Seat in coach basis</option>
//               <option value="Private + Seat in coach basis">
//                 Private + Seat in coach basis
//               </option>
//             </select>
//             {/* <input
//                     type="text"
//                     className="form-control"
//                     value={airportTransfer}
//                     onChange={(e) => setAirportTransfer(e.target.value)}
//                   /> */}
//           </div>
//         </div>

//         <div className="content">
//           <div className="row">
//             <div className="col-sm-12">
//               <h3 className="mt-3 mb-4">Itinerary Details</h3>
//               {itineraryList &&
//                 itineraryList.map((itinerary, i) => {
//                   return (
//                     <div className="row mb-3" key={i}>
//                       <div className="form-group col-md-1">
//                         <label>Day </label>
//                         <div style={{ paddingTop: 10 }}>{itinerary.day}</div>
//                       </div>
//                       <div className="form-group col-md-5">
//                         <label>Itinerary Heading</label>
//                         <input
//                           type="text"
//                           name="itineraryHeading"
//                           className="form-control"
//                           value={itinerary.itineraryHeading}
//                           placeholder="Enter Itinerary Heading"
//                           onChange={(e) => handleinputchangeItinerary(e, i)}
//                         />
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>Itinerary Description</label>
//                         <textarea
//                           type="text"
//                           name="itineraryName"
//                           className="form-control"
//                           value={itinerary.itineraryName}
//                           placeholder="Enter Itinerary Description"
//                           onChange={(e) => handleinputchangeItinerary(e, i)}
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         </div>

//         <div className="form-group row">
//           <label className="col-form-label col-md-2">Term And Condition</label>
//           <div className="col-md-10">
//             <input
//               type="text"
//               className="form-control"
//               value={termAndCondition}
//               onChange={(e) => setTermAndCondition(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="form-group col-md-6">
//           <label className="col-form-label ">
//             Flight
//             <span className="text-danger">*</span>
//           </label>
//           <input
//             type="checkbox"
//             name="IsAirport"
//             style={{ marginLeft: 10 }}
//             value={isAirport}
//             checked={isAirport}
//             onChange={(e) => {
//               setIsAirport(!isAirport);
//             }}
//           />
//         </div>

//         <div className="form-group col-md-6">
//           <label className="col-form-label ">
//             Land Packages
//             <span className="text-danger">*</span>
//           </label>
//           <input
//             type="checkbox"
//             name="Island"
//             style={{ marginLeft: 10 }}
//             value={island}
//             checked={island}
//             onChange={(e) => {
//               setIsLand(!island);
//             }}
//           />
//         </div>

//         <div className="form-group row">
//           <label className="col-form-label col-md-2">Summary</label>
//           <div className="col-md-12">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <td>Mode</td>
//                   <td>Person</td>
//                   <td>per Person Price</td>
//                   <td>Total</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isAirport && (
//                   <tr>
//                     <td>Flight</td>
//                     <td>{numberOfGuest}</td>
//                     <td>
//                       <input
//                         type="text"
//                         value={[perPersonAirPortPrice]}
//                         onChange={(e) => {
//                           setPerPersonAirportPrice(e.target.value);
//                           setTotalPersonAirportPrice(
//                             numberOfGuest * e.target.value
//                           );
//                         }}
//                       />
//                     </td>
//                     <td>{totalPersonAirPortPrice}</td>
//                   </tr>
//                 )}

//                 {island && (
//                   <tr>
//                     <td>Land Package</td>
//                     <td>{numberOfGuest}</td>
//                     <td>
//                       <input
//                         type="text"
//                         value={[perPersonLandPrice]}
//                         onChange={(e) => {
//                           setPerPersonLandPrice(e.target.value);
//                           setTotalPersonLandPrice(
//                             numberOfGuest * e.target.value
//                           );
//                         }}
//                       />
//                     </td>
//                     <td>{totalPersonLandPrice}</td>
//                   </tr>
//                 )}

//                 <tr>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                 </tr>

//                 <tr>
//                   <td></td>
//                   <td></td>
//                   <td>Total</td>
//                   <td>{amount}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="col-12">
//           <button className="btn add-btn" type="submit" data-bs-dismiss="modal">
//             {isUpdateTour ? "Update" : "Save"}
//           </button>
//         </div>
//       </form>
//     </Modal.Body>
//   </Modal>
// );
// //
// //
// //
// // /
// // /
// // /
// // /
// // /
// // /
// // /
// //
// //
// //
// //
// //
// const columns_SUPERVISOR = [
//   // {
//   //   title: "Lead Subject",
//   //   dataIndex: "subject",
//   // },
//   {
//     title: "Guest Name",
//     // dataIndex: "clientName",
//     render: (text, record) => (
//       <div>
//         {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR ? (
//           <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
//             {record.clientName}
//           </Link>
//         ) : (
//           record.clientName
//         )}
//       </div>
//     ),
//   },
//   // {
//   //   title: 'Lead Id',
//   //   dataIndex: 'Leadid',
//   //   render: (text, record) => (
//   //     <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/employees/Lead-view">#TKT-0001</Link>
//   //   ),
//   //   sorter: (a, b) => a.Leadid.length - b.Leadid.length,
//   // },
//   {
//     title: "Assigned Spoc",
//     render: (text, record) => (
//       <h2 className="table-avatar">
//         {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR ? (
//           record.agentObj ? (
//             <>
//               <Link
//                 to={`/admin/employee-profile/${record?.agentObj?._id}`}
//                 className="avatar"
//               >
//                 <img alt="" src={record?.image} />
//               </Link>
//               <Link to={`/admin/employee-profile/${record?.agentObj?._id}`}>{`${
//                 record?.agentObj?.firstName ? record?.agentObj?.firstName : "NA"
//               } ${
//                 record?.agentObj?.lastName ? record?.agentObj?.lastName : ""
//               }`}</Link>
//             </>
//           ) : (
//             <>
//               <div
//                 onClick={() => setSelectedLeadId(record._id)}
//                 className="avatar"
//               >
//                 <img
//                   alt=""
//                   onClick={() => setSelectedLeadId(record._id)}
//                   src={record?.image}
//                 />
//               </div>
//               <div
//                 data-bs-toggle="modal"
//                 onClick={() => setSelectedLeadId(record._id)}
//                 data-bs-target="#update_agent"
//               >
//                 NA
//               </div>
//               {/* update_agent */}
//             </>
//           )
//         ) : (
//           `${
//             record?.agentObj?.firstName ? record?.agentObj?.firstName : "NA"
//           } ${record?.agentObj?.lastName ? record?.agentObj?.lastName : ""}`
//         )}
//         {/* {role == rolesObj.ACCOUNT && (
//             <div>
//               {record?.agentObj?.firstName
//                 ? `${record?.agentObj?.firstName}`
//                 : " N / A " + record?.agentObj?.lastName
//                 ? record?.agentObj?.lastName
//                 : " 21"}
//             </div>
//           )} */}
//       </h2>
//     ),
//   },
//   // {
//   //   title: "Assigned Spoc",
//   //   render: (text, record) => (
//   //     <h2 className="table-avatar">
//   //       {record.agentObj ? (
//   //         <>
//   //           <Link
//   //             to={`/admin/employee-profile/${record?.agentObj?._id}`}
//   //             className="avatar"
//   //           >
//   //             <img alt="" src={record?.image} />
//   //           </Link>
//   //           <Link to={`/admin/employee-profile/${record?.agentObj?._id}`}>{`${
//   //             record?.agentObj?.firstName ? record?.agentObj?.firstName : "NA"
//   //           } ${
//   //             record?.agentObj?.lastName ? record?.agentObj?.lastName : ""
//   //           }`}</Link>
//   //         </>
//   //       ) : (
//   //         <>
//   //           <div
//   //             onClick={() => setSelectedLeadId(record._id)}
//   //             className="avatar"
//   //           >
//   //             <img
//   //               alt=""
//   //               onClick={() => setSelectedLeadId(record._id)}
//   //               src={record?.image}
//   //             />
//   //           </div>
//   //           <div
//   //             data-bs-toggle="modal"
//   //             onClick={() => setSelectedLeadId(record._id)}
//   //             data-bs-target="#update_agent"
//   //           >
//   //             NA
//   //           </div>
//   //         </>
//   //       )}
//   //     </h2>
//   //   ),
//   // },

//   {
//     title: "Assigned Team Lead",
//     render: (text, record) => (
//       <h2 className="table-avatar">
//         {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR ? (
//           record.leadObj ? (
//             <>
//               <Link
//                 to={`/admin/employee-profile/${record?.leadObj?._id}`}
//                 className="avatar"
//               >
//                 <img alt="" src={record?.image} />
//               </Link>
//               <Link
//                 to={`/admin/employee-profile/${record?.leadObj?._id}`}
//               >{`${record?.leadObj?.firstName} ${record?.leadObj?.lastName}`}</Link>
//             </>
//           ) : (
//             <>
//               <div
//                 onClick={() => setSelectedLeadId(record._id)}
//                 className="avatar"
//               >
//                 <img
//                   alt=""
//                   onClick={() => setSelectedLeadId(record._id)}
//                   src={record?.image}
//                 />
//               </div>
//               <div
//                 data-bs-toggle="modal"
//                 onClick={() => setSelectedLeadId(record._id)}
//                 data-bs-target="#update_agent"
//               >
//                 NA
//               </div>
//             </>
//           )
//         ) : (
//           `${record?.leadObj?.firstName} ${record?.leadObj?.lastName}`
//         )}
//       </h2>
//     ),
//   },
//   // {
//   //   title: "Assigned Team Lead",
//   //   render: (text, record) => (
//   //     <h2 className="table-avatar">
//   //       {record.leadObj ? (
//   //         <>
//   //           <Link
//   //             to={`/admin/employee-profile/${record?.leadObj?._id}`}
//   //             className="avatar"
//   //           >
//   //             <img alt="" src={record?.image} />
//   //           </Link>
//   //           <Link
//   //             to={`/admin/employee-profile/${record?.leadObj?._id}`}
//   //           >{`${record?.leadObj?.firstName} ${record?.leadObj?.lastName}`}</Link>
//   //         </>
//   //       ) : (
//   //         <>
//   //           <div
//   //             onClick={() => setSelectedLeadId(record._id)}
//   //             className="avatar"
//   //           >
//   //             <img
//   //               alt=""
//   //               onClick={() => setSelectedLeadId(record._id)}
//   //               src={record?.image}
//   //             />
//   //           </div>
//   //           <div
//   //             data-bs-toggle="modal"
//   //             onClick={() => setSelectedLeadId(record._id)}
//   //             data-bs-target="#update_agent"
//   //           >
//   //             NA
//   //           </div>
//   //         </>
//   //       )}
//   //     </h2>
//   //   ),
//   // },

//   {
//     title: "Created Date",
//     render: (text, record) => (
//       <h2 className="table-avatar">
//         {new Date(record?.createdAt).toDateString()}
//       </h2>
//     ),
//   },
//   // {
//   //   title: 'Last Reply',
//   //   dataIndex: 'lastreply',
//   //   sorter: (a, b) => a.lastreply.length - b.lastreply.length,
//   // },
//   {
//     title: "Priority",
//     render: (text, record) => (
//       <div className="dropdown action-label">{record?.priority}</div>
//     ),
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     render: (text, record) => (
//       <div>
//         {/* {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR ? (
//             <div className="dropdown action-label text-center">
//               {handleReturndropDown(record)}
//             </div>
//           ) : (
//             <div>
//               {record?.status == "CLOSED" ? "CONFIRMED" : "NOT CONFIRMED"}
//             </div>
//           )} */}
//         {role != rolesObj.ACCOUNT && role != rolesObj.SUPERVISOR ? (
//           <div className="dropdown action-label text-center">
//             {handleReturndropDown(record)}
//           </div>
//         ) : role == rolesObj.SUPERVISOR ? (
//           <div>{record?.status}</div>
//         ) : (
//           <div>
//             {record?.status == "CLOSED" ? "CONFIRMED" : "NOT CONFIRMED"}
//           </div>
//         )}
//       </div>
//     ),
//   },
//   {
//     title: "Action",
//     render: (text, record) => (
//       <div className="dropdown dropdown-action text-end">
//         <a
//           href="#"
//           className="action-icon dropdown-toggle"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <i className="material-icons">more_vert</i>
//         </a>

//         <div className="dropdown-menu dropdown-menu-right">
//           {role != rolesObj.ACCOUNT ? (
//             <div>
//               <Link className="dropdown-item" to={`/admin/lead/${record._id}`}>
//                 <i className="fa fa-pencil m-r-5" /> View
//               </Link>

//               <a
//                 className="dropdown-item"
//                 href="#"
//                 data-bs-toggle="modal"
//                 data-bs-target="#add_Lead"
//                 onClick={() => handleEdit(record)}
//               >
//                 <i className="fa fa-pencil m-r-5" /> Edit
//               </a>

//               {/* <a
//               className="dropdown-item"
//               href="#"
//               data-bs-toggle="modal"
//               data-bs-target="#delete_Lead"
//               onClick={() => handleEdit(record)}
//             >
//               <i className="fa fa-trash-o m-r-5" /> Delete
//             </a> */}
//             </div>
//           ) : (
//             <div>
//               <Link
//                 className="dropdown-item"
//                 to={`/admin/lead/${record._id}/ViewDetails`}
//                 onClick={() => handleEdit(record._id)}
//               >
//                 <i className=" m-r-5" /> View
//               </Link>

//               {/* <a
//                   // className="dropdown-item"
//                   // data-bs-toggle="modal"
//                   href="/admin/lead/views23"

//                   // data-bs-target="#add_Lead"
//                   // component={LeadDetails}
//                   onClick={() => LeadDetails}
//                 >
//                   {/* <i className=" m-r-5" />
//                   View2
//                 </a> */}
//             </div>
//           )}
//         </div>
//       </div>
//     ),
//   },
// ];
// //

// //
// //

// //

// //

// <Modal
// dialogClassName="modal-90w"
// // className="w-100"
// show={show}
// // className="add_note"
// aria-labelledby="example-custom-modal-styling-title"
// // onHide={() => {
// //   setShow(!show);
// // }}
// >
// <Modal.Header>
//   <Modal.Title> {setLeadObj._id ? " Edit " : " Add "}Lead </Modal.Title>
// </Modal.Header>
// <Modal.Body>
//   <form onSubmit={handleSubmit}>
//     <div className="col-md-12">
//       <div className="form-group">
//         <label>Lead Subject <span className="danger">*</span> </label>
//         <input
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="form-control"
//           type="text"
//         />
//       </div>
//     </div>
//     {/* <div className="col-md-6">
//           <div className="form-group">
//             <label>Client ({clientsArr.length})</label>

//             <select
//               className="select form-control"
//               value={clientId}
//               onChange={(e) => {
//                 setClientId(e.target.value);
//               }}
//             >
//               <option value=""> --- Select Clients</option>
//               {clientsArr &&
//                 clientsArr.map((client, i) => {
//                   return (
//                     <option key={i} value={client._id}>
//                       {client.name}
//                     </option>
//                   );
//                 })}
//             </select>
//           </div>
//         </div> */}
//     <div className="col-md-6">
//       <div className="form-group">
//         <label>Name</label>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           type={"text"}
//           className="form-control"
//         />
//       </div>
//     </div>

//     <div className="col-md-6">
//       <div className="form-group">
//         <label>Phone</label>
//         <input
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           type={"tel"}
//           maxLength={10}
//           className="form-control"
//         />
//       </div>
//     </div>

//     <div className="col-md-6">
//       <div className="form-group">
//         <label>Email</label>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type={"text"}
//           className="form-control"
//         />
//       </div>
//     </div>

//     <div className="col-md-6">
//       <div className="form-group">
//         <label>Priority</label>
//         <select
//           value={priority}
//           className="form-control"
//           onChange={(e) => setPriority(e.target.value)}
//         >
//           <option value="">Select Priority</option>
//           <option value="High">High</option>
//           <option value="Medium"> Medium</option>
//           <option value="Low">Low</option>
//         </select>
//         {/* <Select
//                 onChange={handlePriorityChange}
//                 options={options}
//       /> */}
//       </div>
//     </div>
//     {/* {console.log("234789047890")} */}
//     {/* <Select
//                   options={teamLeadsArr.map((el) => {
//                     return { ...el, value: el._id, label: el.name };
//                   })}
//                   placeholder="Select from options"
//                   defaultInputValue={leadId}
//                   // value={stateObj}
//                   onChange={(e) => {
//                     console.log(e, "asd");
//                     // setStateId(e.value);
//                     // setStateObj(e);
//                   }}
//                 >
//                   {" "}
//                   <option value=""> --- Select Team Lead</option>
//                 </Select> */}

//     {role != rolesObj.TEAMLEAD &&
//       role != rolesObj.SPOC &&
//       role != rolesObj.ACCOUNT && (
//         <div className="col-md-6">
//           <div className="form-group">
//             <label>Assign to Team Lead ({teamLeadsArr.length})</label>

//             <select
//               className="select form-control"
//               value={leadId}
//               onChange={(e) => {
//                 handleTeamLeadChange(e.target.value);
//               }}
//             >
//               {/* {console.log(teamLeadsArr, "teamLeadsArr23")}
//                   {console.log(leadId, "tleadId23")} */}
//               <option value=""> --- Select Team Lead</option>
//               {teamLeadsArr &&
//                 teamLeadsArr.map((agent, i) => {
//                   return (
//                     <option key={i} value={agent.value}>
//                       {agent.label}
//                     </option>
//                   );
//                 })}
//             </select>
//             {/* <Select
//     options={cityArr.map((el) => {
//       return { ...el, value: el._id, label: el.name };
//     })}
//     placeholder="Select from options"
//     defaultInputValue={cityId}
//     value={citiesObj}
//     onChange={(e) => {
//       //   console.log(e, "asd");
//       setCityId(e.value);
//       setCitiesObj(e);
//     }}
//   /> */}
//           </div>
//         </div>
//       )}

//     {role != rolesObj.SPOC && role != rolesObj.ACCOUNT && (
//       <div className="col-md-6">
//         <div className="form-group">
//           <label>
//             Assign to Spoc (
//             {agentsArr && agentsArr.length > 0 ? agentsArr.length : 0})
//           </label>
//           {/* {console.log(agentsArr, "agentsArr123")} */}
//           <select
//             className="select form-control"
//             value={agentId}
//             onChange={(e) => {
//               handleAgentChange(e.target.value);
//             }}
//           >
//             <option value=""> --- Select Spoc</option>
//             {role == rolesObj.TEAMLEAD &&
//               agentsArr &&
//               agentsArr.map((spoc, i) => {
//                 // console.log(spoc, i, "2132");
//                 // spoc.leadId == leadId;
//                 return (
//                   <>
//                     <option key={i} value={spoc.value}>
//                       {/* {spoc.leadId == leadId ? spoc.label : ""} */}
//                       {spoc.label}
//                     </option>
//                   </>
//                 );
//               })}
//             {role == rolesObj.ADMIN &&
//               agentsArr &&
//               agentsArr.map((spoc, i) => {
//                 console.log(spoc, i, "2132");
//                 // spoc .leadId == leadId;
//                 return (
//                   <>
//                     <option key={i} value={spoc.value}>
//                       {/* {spoc.leadId == leadId ? spoc.label : ""} */}
//                       {spoc.label}
//                     </option>
//                   </>
//                 );
//               })}
//             {role == rolesObj.SUPERVISOR &&
//               agentsArr &&
//               agentsArr.map((spoc, i) => {
//                 console.log(spoc, i, "2132");
//                 // spoc .leadId == leadId;
//                 return (
//                   <>
//                     <option key={i} value={spoc.value}>
//                       {/* {spoc.leadId == leadId ? spoc.label : ""} */}
//                       {spoc.label}
//                     </option>
//                   </>
//                 );
//               })}

//             {/* {agentsArr &&
//                   agentsArr.filter((spoc) => {
//                     spoc.leadId == leadId;

//                   })} */}
//           </select>
//         </div>
//       </div>
//     )}
//     <div className="form-group">
//       <label>Description</label>
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="form-control"
//       />
//     </div>
//     <div className="form-group">
//       <label>Upload Files</label>
//       <input
//         onChange={(e) => handleFileSelection(e)}
//         className="form-control"
//         type="file"
//       />
//     </div>

//     {/* <div className="submit-section">
//       <button
//         // data-bs-toggle="modal"
//         onClick={(e) => handleSubmitLead(e)}
//         className="btn btn-primary submit-btn"
//       >
//         {leadUpdateId ? "Update" : "Add"}
//       </button>
//     </div> */}
//   </form>
// </Modal.Body>

// <Modal.Footer>
//   <Button
//     variant="secondary"
//     onClick={() => {
//       setShow(!show);
//     }}
//   >
//     Close
//   </Button>
//   <Button variant="primary" onClick={(e) => handleSubmitLead(e)}>
//     {setLeadObj._id ? " Edit " : " Add "}
//   </Button>
// </Modal.Footer>
// </Modal>
//

//

//

// <Modal
// size="lg"
// show={show}
// // className="add_note"
// >
// <Modal.Header>
//   <Modal.Title>
//     {/* {leadObj && leadObj._id ? " Edit " : " Add "}Lead{" "} */}
//     <h5 className="modal-title">
//       {isUpdateTour ? "Edit" : "Add"} Quote
//     </h5>
//   </Modal.Title>
// </Modal.Header>
// <Modal.Body>
//   <form>
//     <div className="row">
//       <div className=" form-group col-md-12">
//         <label className="col-form-label ">
//           Destination Name <span className="text-danger">*</span>
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           value={destinationName}
//           onChange={(e) => setDestinationName(e.target.value)}
//         />
//       </div>

//       <div className="content">
//         <div className="row">
//           <div className="col-sm-12">
//             <h3 className="mt-3 mb-4">Tour Details </h3>
//           </div>
//           {/* {console.log(tourArr, "travel,23")} */}
//           {travelList &&
//             travelList.map((item, index) => {
//               return (
//                 <div className="row" key={index}>
//                   <div className="col-md-4 mb-3">
//                     <label className="col-form-label ">
//                       Tour <span className="text-danger">*</span>
//                     </label>

//                     <select
//                       className="form-control"
//                       name="name"
//                       value={item?.name}
//                       onChange={(e) => handleTourValueChange(e, index)}
//                     >
//                       <option value="" disabled>
//                         --select an option--
//                       </option>
//                       {tourArr &&
//                         tourArr.length > 0 &&
//                         tourArr.map((el, inde) => (
//                           <option key={inde} value={el.name}>
//                             {el.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <label className="col-form-label ">
//                       Start Date
//                       <span className="text-danger">*</span>
//                     </label>
//                     <div className="col-sm-8">
//                       <input
//                         type="date"
//                         className="form-control"
//                         name="startDate"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           handleTourValueChange(e, index)
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <label className="col-form-label ">
//                       Expiration Date
//                     </label>
//                     <div className="col-sm-8">
//                       <input
//                         type="date"
//                         className="form-control"
//                         name="endDate"
//                         value={item.endDate}
//                         onChange={(e) =>
//                           handleTourValueChange(e, index)
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group col-md-2 mt-4">
//                     {travelList.length !== 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-danger"
//                         // className="btn btn-success"
//                         onClick={() => handleRemoveTravel(index)}
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                   <div className="col-md-12">
//                     {travelList.length - 1 === index && (
//                       <button
//                         type="button"
//                         className="btn btn-success"
//                         onClick={handleAddClickTour}
//                       >
//                         Add More
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>

//       <div className=" form-group col-md-6">
//         <label className="col-form-label ">
//           Duration Of Tour <span className="text-danger">*</span> (in
//           Nights) ({`${durationOfTour}N/${days}D`})
//         </label>
//         <input
//           type="number"
//           className="form-control"
//           value={durationOfTour}
//           onChange={(e) => {
//             handleEnterNumberOfDays(e.target.value);
//           }}
//         />
//       </div>
//       <div className="col-md-6">
//         <label className="col-form-label ">
//           Number Of Guest <span className="text-danger">*</span>
//         </label>
//         <input
//           type="number"
//           className="form-control"
//           value={numberOfGuest}
//           onChange={(e) => setNumberOfGuest(e.target.value)}
//         />
//       </div>

//       {/* <div className="col-md-6">
//                 <label className="col-form-label ">
//                     Adult Count <span className="text-danger">*</span>
//                   </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={adultCount}
//                       onChange={(e) => setAdultCount(e.target.value)}
//                     />
//                 </div>

//                 <div className="col-md-6  ">
//                 <label className="col-form-label ">
//                   Child Without Bed
//                   <span className="text-danger">*</span>
//                 </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={childWithoutBed}
//                     onChange={(e) => setChildWithoutBed(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                 <label className=" ">
//                   Child With Bed <span className="text-danger">*</span>
//                 </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={childWithBed}
//                     onChange={(e) => setChildWithBed(e.target.value)}
//                   />
//               </div> */}
//     </div>

//     <div className="content">
//       <div className="row">
//         <div className="col-sm-12">
//           <h3 className="mt-3 mb-4 ">Traveller Details</h3>
//           <div className="row">
//             <div className="col-3">
//               <label className="col-form-label ">
//                 Adults
//                 <span className="text-danger">*</span>
//               </label>
//               <select
//                 className="form-control"
//                 value={parseInt(numberofAdults)}
//                 onChange={(e) => {
//                   console.log(e.target.value, "value");
//                   handletravelersSelect(
//                     e.target.value,
//                     "numberofAdults"
//                   );
//                 }}
//               >
//                 <option value={0}>0</option>
//                 <option value={1}>1</option>
//                 <option value={2}>2</option>
//                 <option value={3}>3</option>
//                 <option value={4}>4</option>
//                 <option value={5}>5</option>
//                 <option value={6}>6</option>
//                 <option value={7}>7</option>
//                 <option value={8}>8</option>
//                 <option value={9}>9</option>
//                 <option value={10}>10</option>
//               </select>
//             </div>
//             <div className="col-3">
//               <label className="col-form-label ">
//                 Children with Bed
//                 <span className="text-danger">*</span>
//               </label>
//               <select
//                 className="form-control"
//                 value={parseInt(numberOfChildrenWithBed)}
//                 onChange={(e) => {
//                   handletravelersSelect(
//                     e.target.value,
//                     "numberOfChildrenWithBed"
//                   );
//                 }}
//               >
//                 <option value={0}>0</option>
//                 <option value={1}>1</option>
//                 <option value={2}>2</option>
//                 <option value={3}>3</option>
//                 <option value={4}>4</option>
//                 <option value={5}>5</option>
//                 <option value={6}>6</option>
//                 <option value={7}>7</option>
//                 <option value={8}>8</option>
//                 <option value={9}>9</option>
//                 <option value={10}>10</option>
//               </select>
//             </div>
//             <div className="col-3">
//               <label className="col-form-label ">
//                 Children without Bed
//                 <span className="text-danger">*</span>
//               </label>
//               <select
//                 className="form-control"
//                 value={parseInt(numberOfChildrenWithoutBed)}
//                 onChange={(e) => {
//                   handletravelersSelect(
//                     e.target.value,
//                     "numberOfChildrenWithoutBed"
//                   );
//                 }}
//               >
//                 <option value={0}>0</option>
//                 <option value={1}>1</option>
//                 <option value={2}>2</option>
//                 <option value={3}>3</option>
//                 <option value={4}>4</option>
//                 <option value={5}>5</option>
//                 <option value={6}>6</option>
//                 <option value={7}>7</option>
//                 <option value={8}>8</option>
//                 <option value={9}>9</option>
//                 <option value={10}>10</option>
//               </select>
//             </div>
//             <div className="col-3">
//               <label className="col-form-label ">
//                 Infants
//                 <span className="text-danger">*</span>
//               </label>
//               <select
//                 className="form-control"
//                 value={parseInt(numberOfInfants)}
//                 onChange={(e) => {
//                   handletravelersSelect(
//                     e.target.value,
//                     "numberOfInfants"
//                   );
//                 }}
//               >
//                 <option value={0}>0</option>
//                 <option value={1}>1</option>
//                 <option value={2}>2</option>
//                 <option value={3}>3</option>
//                 <option value={4}>4</option>
//                 <option value={5}>5</option>
//                 <option value={6}>6</option>
//                 <option value={7}>7</option>
//                 <option value={8}>8</option>
//                 <option value={9}>9</option>
//                 <option value={10}>10</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="content">
//       <h3 className="mt-3 mb-4 ">Hotel details</h3>
//       {hotelList &&
//         hotelList.map((hotel, i) => {
//           return (
//             <div className="row mb-3" key={i}>
//               <div className="form-group col-md-4">
//                 <label>Hotel Name</label>
//                 <input
//                   type="text"
//                   name="hotelName"
//                   className="form-control"
//                   placeholder="Name"
//                   value={hotel.hotelName}
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 />
//               </div>

//               <div className="form-group col-md-4">
//                 <label> Room Type</label>
//                 <input
//                   type="text"
//                   name="roomType"
//                   value={hotel.roomType}
//                   className="form-control"
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <label>Rating</label>
//                 <select
//                   className="form-control"
//                   name="rating"
//                   value={parseInt(hotel.rating)}
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 >
//                   <option value={2}>2</option>
//                   <option value={3}>3</option>
//                   <option value={4}>4</option>
//                   <option value={5}>5</option>
//                 </select>
//               </div>

//               <div className="form-group col-md-4">
//                 <label> Check In </label>
//                 <input
//                   type="date"
//                   // type="text"
//                   name="checkIn"
//                   value={`${moment(hotel.checkIn).format(
//                     "YYYY-MM-DD"
//                   )}`}
//                   className="form-control"
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 />
//               </div>

//               <div className="form-group col-md-4">
//                 <label> Number Of Night</label>
//                 <input
//                   type="number"
//                   name="numberOfNight"
//                   value={`${hotel.numberOfNight}`}
//                   className="form-control"
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 />
//               </div>

//               <div className="form-group col-md-4">
//                 <label> Check Out </label>
//                 <input
//                   type="date"
//                   // type="text"
//                   name="checkOut"
//                   value={`${moment(hotel.checkOut).format(
//                     "YYYY-MM-DD"
//                   )}`}
//                   disabled
//                   className="form-control"
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 />
//               </div>

//               {/* <div className="form-group col-md-4">
//                   <label>Hotel Address</label>
//                   <input
//                     type="text"
//                     name="hotelAddress"
//                     className="form-control"
//                     value={hotel.hotelAddress}
//                     onChange={(e) => handleinputchangeHotel(e, i)}
//                   />
//                 </div> */}
//               <div className="form-group col-md-4">
//                 <label>Hotel Address</label>
//                 <input
//                   type="text"
//                   name="hotelAddress"
//                   className="form-control"
//                   value={hotel.hotelAddress}
//                   onChange={(e) => handleinputchangeHotel(e, i)}
//                 />
//               </div>

//               <div className="form-group col-md-2 mt-4">
//                 {hotelList.length !== 1 && (
//                   <button
//                     type="button"
//                     // className="btn btn-success"
//                     className="btn btn-danger mx-1"
//                     onClick={() => handleremoveHotel(i)}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//               {durationOfTour &&
//               hotelList.reduce(
//                 (acc, el) => acc + parseInt(el.numberOfNight),
//                 0
//               ) < durationOfTour ? (
//                 <div className="col-md-12">
//                   {/* {hotelList.length - 1 === i && ( */}
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={handleaddclickHotel}
//                   >
//                     Add More
//                   </button>
//                   {/* )} */}
//                 </div>
//               ) : (
//                 ""
//               )}
//             </div>
//           );
//         })}
//     </div>

//     <div className="row">
//       <div className="form-group col-3">
//         <label className="col-form-label ">
//           Visa Required
//           <span className="text-danger">*</span>
//         </label>
//       </div>
//       <div className="col-md-9">
//         <select
//           className="form-control"
//           value={visaRequired}
//           onChange={(e) => {
//             setVisaRequired(e.target.value);
//           }}
//         >
//           <option value="Visa is required">Visa is Required</option>
//           <option value="Visa not Required">Visa not Required</option>
//           <option value="Visa on Arrival">Visa on Arrival</option>
//         </select>
//       </div>
//     </div>
//     <div className="form-group row">
//       <label className="col-form-label col-md-3">
//         Airport Transfer
//       </label>
//       <div className="col-md-9">
//         <select
//           className="form-control"
//           value={airportTransfer}
//           onChange={(e) => {
//             setAirportTransfer(e.target.value);
//           }}
//         >
//           <option value="Private">Private</option>
//           <option value="Seat in coach basis">
//             Seat in coach basis
//           </option>
//           <option value="Private + Seat in coach basis">
//             Private + Seat in coach basis
//           </option>
//         </select>
//         {/* <input
//             type="text"
//             className="form-control"
//             value={airportTransfer}
//             onChange={(e) => setAirportTransfer(e.target.value)}
//           /> */}
//       </div>
//     </div>

//     <div className="content">
//       <div className="row">
//         <div className="col-sm-12">
//           <h3 className="mt-3 mb-4">Itinerary Details</h3>
//           {itineraryList &&
//             itineraryList.map((itinerary, i) => {
//               return (
//                 <div className="row mb-3" key={i}>
//                   <div className="form-group col-md-1">
//                     <label>Day </label>
//                     <div style={{ paddingTop: 10 }}>
//                       {itinerary.day}
//                     </div>
//                   </div>
//                   <div className="form-group col-md-5">
//                     <label>Itinerary Heading</label>
//                     <input
//                       type="text"
//                       name="itineraryHeading"
//                       className="form-control"
//                       value={itinerary.itineraryHeading}
//                       placeholder="Enter Itinerary Heading"
//                       onChange={(e) => handleinputchangeItinerary(e, i)}
//                     />
//                   </div>
//                   <div className="form-group col-md-12">
//                     <label>Itinerary Description</label>
//                     <textarea
//                       type="text"
//                       name="itineraryName"
//                       className="form-control"
//                       value={itinerary.itineraryName}
//                       placeholder="Enter Itinerary Description"
//                       onChange={(e) => handleinputchangeItinerary(e, i)}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>

//     <div className="form-group row">
//       <label className="col-form-label col-md-2">
//         Term And Condition
//       </label>
//       <div className="col-md-10">
//         <input
//           type="text"
//           className="form-control"
//           value={termAndCondition}
//           onChange={(e) => setTermAndCondition(e.target.value)}
//         />
//       </div>
//     </div>
//     <div className="form-group col-md-6">
//       <label className="col-form-label ">
//         Flight
//         <span className="text-danger">*</span>
//       </label>
//       <input
//         type="checkbox"
//         name="IsAirport"
//         style={{ marginLeft: 10 }}
//         value={isAirport}
//         checked={isAirport}
//         onChange={(e) => {
//           setIsAirport(!isAirport);
//         }}
//       />
//     </div>

//     <div className="form-group col-md-6">
//       <label className="col-form-label ">
//         Land Packages
//         <span className="text-danger">*</span>
//       </label>
//       <input
//         type="checkbox"
//         name="Island"
//         style={{ marginLeft: 10 }}
//         value={island}
//         checked={island}
//         onChange={(e) => {
//           setIsLand(!island);
//         }}
//       />
//     </div>

//     <div className="form-group row">
//       <label className="col-form-label col-md-2">Summary</label>
//       <div className="col-md-12">
//         <table className="table">
//           <thead>
//             <tr>
//               <td>Mode</td>
//               <td>Person</td>
//               <td>per Person Price</td>
//               <td>Total</td>
//             </tr>
//           </thead>
//           <tbody>
//             {isAirport && (
//               <tr>
//                 <td>Flight</td>
//                 <td>{numberOfGuest}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={[perPersonAirPortPrice]}
//                     onChange={(e) => {
//                       setPerPersonAirportPrice(e.target.value);
//                       setTotalPersonAirportPrice(
//                         numberOfGuest * e.target.value
//                       );
//                     }}
//                   />
//                 </td>
//                 <td>{totalPersonAirPortPrice}</td>
//               </tr>
//             )}

//             {island && (
//               <tr>
//                 <td>Land Package</td>
//                 <td>{numberOfGuest}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={[perPersonLandPrice]}
//                     onChange={(e) => {
//                       setPerPersonLandPrice(e.target.value);
//                       setTotalPersonLandPrice(
//                         numberOfGuest * e.target.value
//                       );
//                     }}
//                   />
//                 </td>
//                 <td>{totalPersonLandPrice}</td>
//               </tr>
//             )}

//             <tr>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>

//             <tr>
//               <td></td>
//               <td></td>
//               <td>Total</td>
//               <td>{amount}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     {/* <div className="col-12">
//       <button
//         className="btn add-btn"
//         type="submit"
//         data-bs-dismiss="modal"
//       >
//         {isUpdateTour ? "Update" : "Save"}
//       </button> */}
//     {/* </div> */}
//     {/*
//       <div className="col-12">
//         <button
//           data-bs-dismiss="modal"
//           className="btn add-btn"
//           onClick={handlePerfomaInvoiceSubmit}
//         >
//           {" "}
//           Save{" "}
//         </button>
//       </div> */}
//   </form>
// </Modal.Body>

// <Modal.Footer>
//   <Button
//     onClick={() => {
//       setShow(false);
//     }}
//   >
//     Close
//   </Button>
//   <Button variant="primary" onClick={(e) => handleSubmit(e)}>
//     {isUpdateTour && isUpdateTour._id ? " Edit " : " Add "}
//     {/* addd */}
//   </Button>
// </Modal.Footer>
// </Modal>
