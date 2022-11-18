import React, { useState, useEffect } from "react";
import { toastError } from "../../utils/toastUtils";
import { useSelector, useDispatch } from "react-redux";

import {
  clientAdd,
  clientUpdate,
} from "../../redux/features/client/clientSlice";

const AddClient = () => {
  const dispatch = useDispatch();
  const clientResultObj = useSelector((state) => state.client.clientObj);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [clientObj, setClientObj] = useState({});
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    if (clientResultObj) {
      setClientObj(clientResultObj);
    }
  }, [clientResultObj]);

  useEffect(() => {
    if (clientObj) {
      setClientId(clientObj._id);
      setName(clientObj.name);
      setEmail(clientObj.email);
      setDob(clientObj.dob);
      setPhone(clientObj.phone);
      setAnniversaryDate(clientObj.anniversaryDate);
    }
  }, [clientObj]);

  const handleSubmit = (e) => {
    // console.log('jksdfjksdafdashfdslfhdslfhsdalkfsdklfdsfsdkl');
    e.preventDefault();

    let obj = { name, email, phone, dob, anniversaryDate };
    if (clientId) {
      dispatch(clientUpdate({ obj, clientId }));
    } else {
      dispatch(clientAdd(obj));
    }
  };

  return (
    <div id="add_client" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{clientId ? "Edit" : "Add"} Client</h5>
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
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      {" "}
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control floating"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">Phone </label>
                    <input
                      className="form-control"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">Dob</label>
                    <input
                      className="form-control"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">Anniversary Date</label>
                    <input
                      className="form-control"
                      type="date"
                      value={anniversaryDate}
                      onChange={(e) => setAnniversaryDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="table-responsive m-t-15">
              <table className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th>Module Permission</th>
                    <th className="text-center">Read</th>
                    <th className="text-center">Write</th>
                    <th className="text-center">Create</th>
                    <th className="text-center">Delete</th>
                    <th className="text-center">Import</th>
                    <th className="text-center">Export</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Projects</td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Tasks</td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Chat</td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Estimates</td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Invoices</td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Timing Sheets</td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                    <td className="text-center">
                      <input defaultChecked type="checkbox" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
              <div className="submit-section">
                <button className="btn btn-primary submit-btn" ttype="submit">
                  {clientId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
