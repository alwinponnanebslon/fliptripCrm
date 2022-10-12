import FormData from "./FormData";

import React, { Component, useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import CustomButton from "../../../../_components/Utility/Button";
import { useSelector, useDispatch } from "react-redux";

// import { TOURAdd, tourGet } from "../../../../redux/features/tour/tourSlice";
function AddTour() {
  const tourObj = useSelector((state) => state.tour.tourObj);

  const [updatedObj, setUpdatedObj] = useState(null);
  useEffect(() => {
    if (tourObj) {
      console.log(tourObj, "tourObj");
      setUpdatedObj(tourObj);
    }
    // console.log(tourObj, "tourObj chec");
  }, [tourObj]);
  // console.log(brandObj, "ppop");

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          {updatedObj?._id ? (
            <h5 className="blue-1 mb-4">Update Tour</h5>
          ) : (
            <h5 className="blue-1 mb-4">Add New Tour</h5>
          )}
          {console.log("called ")}
          <FormData />
        </div>
      </section>
    </main>
  );
}
export default AddTour;

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";

// import ActionIcon from "../../../_components/Utility/ActionIcon";
// import CustomButton from "../../../_components/Utility/Button";
// import { DashboardTable } from "../../../_components/Utility/DashboardBox";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   tourDelete,
//   tourGet,
//   tourUpdate,
//   setObj,
// } from "../../../../redux/features/tour/tourSlice";

// function Quotation() {
//   const dispatch = useDispatch();
//   const tourArr = useSelector((state) => state.tour.tourArr);

//   const handleInit = () => {
//     dispatch(tourGet());
//   };

//   const handleEdit = (row) => {
//     console.log(row, "row update"); //whole object
//     // dispatch(quotationUpdate(row));
//     dispatch(setObj(row));
//   };

//   const handleTourDelete = (id) => {
//     dispatch(tourDelete(id));
//   };
//   useEffect(() => {
//     handleInit();
//   }, []);

//   const TOUR_columns = [
//     {
//       name: "ID",
//       cell: (row, index) => index + 1,
//       sortable: false,
//     },
//     {
//       name: "tourName",
//       selector: (row) => row?.tourName,
//     },
//     {
//       name: "description",
//       selector: (row) => row?.description,
//     },

//     {
//       name: "Action",
//       minWidth: "200px",
//       maxWidth: "210px",
//       cell: (row) => (
//         <ActionIcon
//           isRedirected={true}
//           onEditClick={() => handleEdit(row)}
//           // editPath="/Product/Brand-Create" //Product/Brand-Create
//           editPath="/app/tour/update"
//           onDeleteClick={() => handleTourDelete(row._id)}
//           // deletePath="/"
//           remove
//           edit
//           Uniquekey={row._id}
//         />
//       ),
//     },
//   ];

//   return (
//     <main>
//       <section className="product-category">
//         <div className="container-fluid p-0">
//           <div className="row">
//             <div className="col-12">
//               <div className="d-flex align-items-center justify-content-between mb-3">
//                 <h5 className="blue-1 m-0">Tour List</h5>
//                 <div className="d-flex align-items-center gap-3">
//                   <CustomButton
//                     isLink
//                     iconName="fa-solid fa-plus"
//                     btnName="ADD NEW Quotation"
//                     path="/Product/-Create"
//                     small
//                     roundedPill
//                   />
//                 </div>
//               </div>
//               {tourArr && tourArr.length > 0 && (
//                 <DashboardTable className="mt-5 pt-5 offset-1">
//                   <DataTable columns={TOUR_columns} data={tourArr} pagination />
//                 </DashboardTable>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Quotation;
