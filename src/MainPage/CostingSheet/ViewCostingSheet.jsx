import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
// import { Avatar_07 } from "../../Entryfile/imagepath";
// import Editclient from "../../_components/modelbox/Editclient";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import {
  costingSheetGet,
  deleteCostingSheet,
  setCostingSheet,
} from "../../redux/features/CostingSheet/CostingSheetSlice";

const ViewCostingSheet = () => {
  // console.log("ppppppppppppp");
  const params = useParams();
  const leadId = params.leadId;
  // // console.log(params.leadId, "lead Id 34");
  // // console.log("po9")
  const dispatch = useDispatch();

  const costingSheetObj = useSelector(
    (state) => state.costingSheet.costingSheets
  );
  const [costingSheetMainArr, setCostingSheetMainArr] = useState([]);
  const [isUpdateCostingSheet, setIsUpdateCostingSheet] = useState(false);

  useEffect(() => {
    handleInit(leadId);
  }, []);

  const handleInit = (leadId) => {
    dispatch(costingSheetGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    // // console.log(costingSheetObj, "11costingSheetObj2113");
    if (costingSheetObj && costingSheetObj._id) {
      setCostingSheetMainArr([costingSheetObj]);
    }
  }, [costingSheetObj]);
  // useEffect(() => {}, [costingSheetMainArr]);

  const handleEdit = (row) => {
    // // console.log(row, "row23");
    // window.sessionStorage.setItem("obj", JSON.stringify(row));
    dispatch(setCostingSheet(row));
  };

  const handleCostingSheetDelete = (id) => {
    dispatch(deleteCostingSheet(id));
  };

  const tour_columns = [
    {
      title: "Lead Name",
      dataIndex: "leadName",
      width: "15%",
    },

    {
      title: "Location name",
      dataIndex: "locationName",
      sorter: (a, b) => a.locationName.length - b.locationName.length,
      width: "15%",
    },

    {
      title: "Total Cost",
      dataIndex: "totalCost",
      // sorter: (a, b) => a.totalCost.length - b.totalCost.length,
      width: "15%",
    },
    {
      title: "Profit ",
      dataIndex: "profit",
      // sorter: (a, b) => a.profit.length - b.profit.length,
      width: "15%",
    },
    {
      title: "Action",
      width: "15%",
      render: (row, record) => (
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
            <Link
              className="dropdown-item"
              to={`/admin/lead/${leadId}/costingSheetAdd`}
              onClick={() => handleEdit(row)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <a
              className="dropdown-item"
              onClick={() => handleCostingSheetDelete(row._id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Clients - CRM created by Fliptrip Holidays</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Costing Sheet</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Costing Sheet</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              {/* <Link className="btn add-btn" to="/admin/costingSheet/Add"> */}
              <Link
                className="btn add-btn"
                to={`/admin/lead/${leadId}/costingSheetAdd`}
              >
                <i className="fa fa-plus" /> Add Costing Sheet
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: costingSheetMainArr.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={tour_columns}
                dataSource={costingSheetMainArr}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCostingSheet;
