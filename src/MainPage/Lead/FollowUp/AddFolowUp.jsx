import React, { useState,useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { addfollowUp,updatefollowUp,setfollowUp } from "../../../redux/features/followup/followUpSlice";
import moment from "moment/moment";
const AddFolowUp = () => {
  const dispatch = useDispatch();
  const followUpResultObj = useSelector((state) => state.followUp.followUpObj);
  const [heading, setHeading] = useState("");
  const [followDate, setFollowDate] = useState("");
  const [description, setDescription] = useState("");
  const [followupId, setFollowupId] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const params = useParams();
  
  const handleSubmit = () => {
    let obj = {
      heading,
      description,
      leadId: params?.leadId,
    };

    if(followUpResultObj?._id){
      obj.Id = followupId;
    dispatch(updatefollowUp(obj));
    setIsUpdateFollowUp(false);
    } else{
    dispatch(addfollowUp(obj));
    }
  };

  const handleClose = () =>{

      dispatch(setfollowUp(null));
      setIsUpdate(false);
      setFollowupId("");
      setHeading("");
      setDescription("");
      setFollowDate("");
  }
  
  useEffect(() => {
    if (followUpResultObj) {
      setIsUpdate(true);
      setFollowupId(followUpResultObj._id);
      setHeading(followUpResultObj.heading);
      setDescription(followUpResultObj.description);
      setFollowDate(moment(followUpResultObj.followDate).format("YYYY-MM-DD"));
    } else {
      setIsUpdate(false);
      setFollowupId("");
      setHeading("");
      setDescription("");
      setFollowDate("");

    }
  }, [followUpResultObj]);

  return (
    <div id="add_followup" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{followUpResultObj?._id ? "Edit" : "Add"} FollowUp</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose}>
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
                  {followUpResultObj?._id ? "Update" : "Save"}{" "}
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
