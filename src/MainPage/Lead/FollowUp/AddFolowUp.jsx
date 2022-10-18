import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addfollowUp } from "../../../redux/features/followup/followUpSlice";
const AddFolowUp = () => {
  const dispatch = useDispatch();
  const [isUpdateTour, setisUpdateTour] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  console.log(params);
  const handleSubmit = () => {
    let obj = {
      heading,
      description,
      leadId: params?.leadId,
    };
    dispatch(addfollowUp(obj));
  };

  return (
    <div id="add_followup" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isUpdateTour ? "Edit" : "Add"} FollowUp</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Tour Name <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <input type="text" className="form-control" value={heading} onChange={(e) => setHeading(e.target.value)} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-md-2">Description</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>

              <div className="col-12">
                <button onClick={() => handleSubmit()} type="button" data-bs-dismiss="modal" className="btn add-btn">
                  {isUpdateTour ? "Update" : "Save"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFolowUp;
