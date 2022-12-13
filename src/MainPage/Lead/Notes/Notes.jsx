import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  noteGet,
  setnote,
  deletenote,
  updatenote,
  addnote,
} from "../../../redux/features/note/noteSlice";
import moment from "moment/moment";

import { toastError } from "../../../utils/toastUtils";

const Notes = ({ show1, setShow1 }) => {
  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const params = useLocation();
  const history = useHistory();
  // console.log(params, "aparams2312");
  const dispatch = useDispatch();
  const noteResultobj = useSelector((state) => state.note.noteObj);
  const notesResultArr = useSelector((state) => state.note.notes);
  const [noteMainArr, setNoteMainArr] = useState([]);
  const [note, setNote] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const { leadId } = useParams();
  const [noteId, setNoteId] = useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [isReadyOnlyNotes, setIsReadyOnlyNotes] = useState(false);
  const [show, setShow] = useState(show1);
  useEffect(() => {
    setCreatedBy(userObj);
  }, [userObj]);

  const handleInit = () => {
    dispatch(noteGet(`leadId=${leadId}&role=${role}`));
  };

  useEffect(() => {
    handleInit();
    // console.log(params.search.includes("true"), "params.search.include");
    // console.log(params, "params.search.include");
    if (params.search.includes("true")) {
      console.log(true, "rewe");
      setIsReadyOnlyNotes(true);

      setShow(true);
    }
  }, []);
  useEffect(() => {
    // console.log(notesResultArr, "notesResultArr34");
    setNoteMainArr(notesResultArr);
  }, [notesResultArr]);

  const handleEdit = (row) => {
    // console.log(row, "row update"); //whole object
    dispatch(setnote(row));
  };

  const handleDelete = (id) => {
    dispatch(deletenote({ id, leadId }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note == "") {
      toastError("note is mandatory ");
      return;
    } else if (reminderDate == "") {
      toastError("Reminder Date is mandatory");
    }

    let obj = {
      note,
      reminderDate,
      leadId,

      createdBy: { ...createdBy, role },
    };
    // console.log(obj, "obj a1folow");
    if (note != "" && note != undefined) {
      if (noteResultobj?._id) {
        obj.Id = noteId;
        dispatch(updatenote(obj));
        setShow(false);
        // setShow1(false);
        setIsReadyOnlyNotes(false);
      } else {
        dispatch(addnote(obj));
        setShow(false);
        // setShow1(false);
        setIsReadyOnlyNotes(false);
      }
    } else {
      toastError("Note is mandatory ");
      return;
    }
  };

  useEffect(() => {
    if (noteResultobj) {
      setNoteId(noteResultobj._id);
      setNote(noteResultobj.heading);
      setReminderDate(moment(noteResultobj.reminderDate).format("MM/DD/YYYY"));
    }
  }, [noteResultobj]);
  // console.log(note, "1", reminderDate, "2", leadId, "3", createdBy);

  return (
    <div className="notes_body">
      {/* <div className="col-lg-12">
    <div className="notes_heading">
      <label> <input type="checkbox" className="radbtn" /> My Notes  </label> &nbsp; 
      <label> <input type="checkbox" className="radbtn" /> TT Admin</label> &nbsp;
      <label><input type="checkbox" className="radbtn" /> System</label> 
    </div>
    </div> */}
      <span
        className="adnotes"
        onClick={() => {
          setShow(!show);
        }}
      >
        add Notes
      </span>

      {noteMainArr &&
        noteMainArr.map((noteItem, index) => {
          return (
            <div className="note_added_by_agent mt-4" key={index}>
              <div className="textnote">
                <div className="alignright mb8">
                  <span className=" flexfull">
                    {moment(noteItem?.reminderDate).format("DD-MM-YYYY")} By{" "}
                    {noteItem?.createdBy?.name + " "}
                    {"[" + noteItem?.createdBy?.role + "]"}
                  </span>
                </div>
                <div className="noteMessage">
                  <p className="post-heading  f12">{noteItem?.note}</p>
                  {/* <span className="adnotes" onClick={()=>{handleEdit(noteItem)}}>edit Note</span> */}
                  {/* <span className="adnotes" onClick={()=>{handleDelete(noteItem._id)}}>Delete Note</span> */}
                  {/* <p className=" post-text-new pfc3 f12 m0">Getting Quote/package customized</p>
             <p className="post-heading  f12">Cna@geetanjali</p> */}
                </div>
              </div>
              <span className="notesImageCorner">
                <img
                  src={"../../../src/assets/img/NotesImageCorner.webp"}
                  alt=""
                />
              </span>
            </div>
          );
        })}

      <Modal show={show} className="add_note">
        <Modal.Header>
          <Modal.Title>{noteResultobj?._id ? "Edit" : "Add"} Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Your Note</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="form-control"
                      cols="1000"
                      rows="100"
                      placeholder="Your Notes"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="form-group">
                    <label>Set Reminder </label>
                    <input
                      type="date"
                      min={moment(new Date()).format("YYYY-MM-DD")}
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="foter-modal">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <Button
                      disabled={params.search.includes("true") ? true : false}
                      // readOnly={isReadyOnlyNotes}
                      type="button"
                      className="btn-cancle"
                      onClick={() => {
                        // setShow1(false);
                        setShow(false);
                        // setIsReadyOnlyNotes(false);
                        if (params.search.includes("true")) {
                          // if (note?.trim().length > 0) {
                          history.push(`/admin/leads`);
                          // }
                        }
                      }}
                    >
                      Cancel
                    </Button>
                    &nbsp;
                    <Button
                      type="submit"
                      className="btn-submit"
                      onClick={(e) => {
                        handleSubmit(e);
                        if (params.search.includes("true")) {
                          if (note?.trim().length > 0) {
                            history.push(`/admin/leads`);
                          }
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notes;
