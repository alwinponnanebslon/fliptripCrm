import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import ActionIcon from "../../../_components/Utility/ActionIcon";
import CustomButton from "../../../_components/Utility/Button";
import { DashboardTable } from "../../../_components/Utility/DashboardBox";

import { useSelector, useDispatch } from "react-redux";
import {
  quotationDelete,
  quotationGet,
  quotationUpdate,
  setObj,
} from "../../../redux/features/quotation/quotationSlice";

function Quotation() {
  const dispatch = useDispatch();
  const quotationArr = useSelector((state) => state.quotation.quotationArr);
  // console.log(quotationArr, "quotationArr2");
  // http://localhost:8080/app/quotation/table
  const handleInit = () => {
    dispatch(quotationGet());
  };

  const handleEdit = (row) => {
    console.log(row, "row update"); //whole object
    // dispatch(quotationUpdate(row));
    dispatch(setObj(row));
  };

  const handleQuotationDelete = (id) => {
    dispatch(quotationDelete(id));
  };
  useEffect(() => {
    handleInit();
  }, []);

  const QUOTATION_columns = [
    {
      name: "ID",
      cell: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "destinationName",
      selector: (row) => row?.destinationName,
    },
    {
      name: "leadId",
      selector: (row) => row?.leadId,
    },
    {
      name: "numberOfGuest",
      selector: (row) => row?.numberOfGuest,
    },

    {
      name: "Action",
      minWidth: "200px",
      maxWidth: "210px",
      cell: (row) => (
        <ActionIcon
          isRedirected={true}
          onEditClick={() => handleEdit(row)}
          // editPath="/Product/Brand-Create" //Product/Brand-Create
          editPath="/app/quotation/table/update"
          onDeleteClick={() => handleQuotationDelete(row._id)}
          // deletePath="/"
          remove
          edit
          Uniquekey={row._id}
        />
      ),
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Quotation List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW Quotation"
                    path="/Product/-Create"
                    small
                    roundedPill
                  />
                </div>
              </div>
              {quotationArr && quotationArr.length > 0 && (
                <DashboardTable className="mt-5 pt-5 offset-1">
                  <DataTable
                    columns={QUOTATION_columns}
                    data={quotationArr}
                    pagination
                  />
                </DashboardTable>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Quotation;
