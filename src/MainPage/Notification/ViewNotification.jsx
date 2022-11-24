import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toastError } from "../../Utility/ToastUtils";

import {
  notificationGet,
  addNotification,
  CITYADD,
  CITYUPDATE,
  SETCITYOBJ,
} from "../../redux/features/notification/notificationSlice";

import {
  deleteRemainder,
  remainderGet,
  updateRemainder,
  setRemainder,
} from "../../redux/features/remainder/remainderSlice";

function Notification({ makeChange }) {
  console.log("inisde notiification");
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth?.user?._id);

  const RemainderArray = useSelector((state) => state.remainder.remainders);

  const [name, setName] = useState("");
  // const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const [stateArr, setStateArr] = useState([]);
  const [stateId, setStateId] = useState("");
  const [stateObj, setStateObj] = useState({});

  const handleInit = () => {
    dispatch(remainderGet(role, userId));
    // dispatch(quotationGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    console.log(RemainderArray, "12323424 RemainderArray");
  }, [RemainderArray]);

  // const statesObj = useSelector((state) => state.states.statesObj);
  // const cityObj = useSelector((state) => state.city.citiesObj);
  // const statesArr = useSelector((state) => state.states.states);
  // const handleAddCategory = () => {
  //   //
  //   if (name == "") {
  //     toastError("Name is mandatory");
  //     return;
  //   }
  //   if (stateId == "") {
  //     toastError("state is mandatory");
  //     return;
  //   }

  //   let obj = {
  //     name,
  //     stateId: stateId,
  //     status,
  //   };
  //   console.log(obj, "category obj");
  //   if (cityObj?._id) {
  //     dispatch(CITYUPDATE(cityObj._id, obj));
  //     dispatch(SETCITYOBJ(null));
  //     window.location.reload();
  //   } else {
  //     dispatch(CITYADD(obj));
  //   }
  // };

  // useEffect(() => {
  //   if (statesArr) {
  //     setStateArr(statesArr);
  //   }
  // }, [statesArr]);

  return (
    <div className={makeChange ? "makeChange" : ""}>
      <form className="form row">
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">{name}</label>
          <input
            readOnly
            value={name}
            // onChange={(event) => setName(event.target.value)}
            // type="text"
            className="form-control"
          />
        </div>

        <div className="col-12 col-md-12">
          <label>
            Description <span className="red">*</span>
          </label>
          <label>
            {description} <span className="red">*</span>
          </label>
        </div>
      </form>
    </div>
  );
}

export default Notification;
