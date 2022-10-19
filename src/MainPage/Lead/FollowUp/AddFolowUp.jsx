import React, { useState,useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { addfollowUp,updatefollowUp } from "../../../redux/features/followup/followUpSlice";
import moment from "moment/moment";
const AddFolowUp = () => {
  const dispatch = useDispatch();
  const followUpResultObj = useSelector((state) => state.followUp.followUpObj);
  const [isUpdateFollowUp, setisUpdateFolloUp] = useState(false);
  const [heading, setHeading] = useState("");
  const [followDate, setFollowDate] = useState("");
  const [description, setDescription] = useState("");
  const [followupId, setFollowupId] = useState()
  const params = useParams();
  console.log(params);
  const handleSubmit = () => {
    let obj = {
      heading,
      description,
      leadId: params?.leadId,
    };
    if(isUpdateFollowUp){
    dispatch(updatefollowUp(obj,followupId));
    } else{
    dispatch(addfollowUp(obj));
    }
  };

  useEffect(() => {
    if (followUpResultObj) {
      setFollowupId(followUpResultObj._id);
      setHeading(followUpResultObj.heading);
      setDescription(followUpResultObj.description);
      setFollowDate(moment(followUpResultObj.followDate).format('MM/DD/YYYY'));
    }
  }, [followUpResultObj]);

  return (
    <div id="add_followup" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isUpdateFollowUp ? "Edit" : "Add"} FollowUp</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Title <span className="text-danger">*</span>
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
              <div className="form-group row">
                <label className="col-form-label col-md-2"> Follow Date  </label>
                <div className="col-md-10">
                  <input type="date" className="form-control" value={followDate} onChange={(e) => setFollowDate(e.target.value)} />
                </div>
              </div>
              <div className="col-12">
                <button onClick={() => handleSubmit()} type="button" data-bs-dismiss="modal" className="btn add-btn">
                  {isUpdateFollowUp ? "Update" : "Save"}{" "}
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
