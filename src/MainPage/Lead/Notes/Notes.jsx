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

const Notes = () => {
  const role = useSelector((state) => state.auth.role);
  const userObj = useSelector((state) => state.auth.user);
  const params = useLocation();
  const history = useHistory();
  // console.log(params, "aparams12");
  const dispatch = useDispatch();
  const noteResultobj = useSelector((state) => state.note.noteObj);
  const notesResultArr = useSelector((state) => state.note.notes);
  const [noteMainArr, setNoteMainArr] = useState([]);
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [remainderDate, setRemainderDate] = useState("");
  const { leadId } = useParams();
  const [noteId, setNoteId] = useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [isReadyOnlyNotes, setIsReadyOnlyNotes] = useState(false);

  useEffect(() => {
    setCreatedBy(userObj);
  }, [userObj]);

  const handleInit = () => {
    dispatch(noteGet(`leadId=${leadId}`));
  };

  useEffect(() => {
    handleInit();
    // console.log(params.search.includes("true"), "params.search.include");
    if (params.search.includes("true")) {
      // console.log(true, "rewe");
      setIsReadyOnlyNotes(true);
      setShow(true);
    }
  }, []);
  useEffect(() => {
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
    } else if (remainderDate == "") {
      toastError("Remainder Date is mandatory")

    }

    let obj = {
      note,
      remainderDate,
      leadId,
      createdBy,
    };
    // console.log(obj, "obj a1folow");
    if (note != "" && note != undefined) {
      if (noteResultobj?._id) {
        obj.Id = noteId;
        dispatch(updatenote(obj));
        setShow(false);
        setIsReadyOnlyNotes(false);
      } else {
        dispatch(addnote(obj));
        setShow(false);
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
      setRemainderDate(
        moment(noteResultobj.remainderDate).format("MM/DD/YYYY")
      );
    }
  }, [noteResultobj]);
  // console.log(note, "1", remainderDate, "2", leadId, "3", createdBy);

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
        className="adnotes "
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
                    {moment(noteItem?.remainderDate).format("DD-MM-YYYY")} By{" "}
                    {noteItem?.createdBy?.name}
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
          <form onSubmit={handleSubmit}>
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
                      value={remainderDate}
                      onChange={(e) => setRemainderDate(e.target.value)}
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
                      disabled={isReadyOnlyNotes}
                      // readOnly={isReadyOnlyNotes}
                      type="button"
                      className="btn-cancle"
                      onClick={() => {
                        setShow(!show);
                        setIsReadyOnlyNotes(false);
                      }}
                    >
                      Cancel
                    </Button>
                    &nbsp;
                    <Button
                      type="submit"
                      className="btn-submit"
                      onClick={() => {
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
