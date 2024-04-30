import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import "../Styles/TaskInformation.css";

// Components
import { Header } from "../../GlobalComponents/Header";
import { PopUp } from "../../GlobalComponents/PopUp";

const Statuses = ["To do", "Ongoing", "Done"];

export const TaskInformationScreen = (props) => {
  
  // Router
  const location = useLocation();
  const navigate = useNavigate();


  const { state } = location;

  const statusIdx = Statuses.indexOf(state.task.status);

  const [status, setStatus] = useState(statusIdx);
  const [popUp, setPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");

  console.log(state.isDeveloper)

  const handleConfirm = () => {
    navigate("/dashboard", { state: { isDeveloper: state.isDeveloper } } );
  };

  const handleCancel = () => {
    setPopUp(false);
  }

  const handleClick = (e) => {
    setPopUp(true);
    if(e.target.innerText === "Save") {
      setPopUpTitle("Changes saved!");
      setPopUpMessage("The changes have been saved successfully.");
    }
    if(e.target.innerText === "Delete") {
      setPopUpTitle("Are you sure you want to delete the task?");
      setPopUpMessage("You will lose all the information related to this task. Do you wish to continue?");
    }
    if(e.target.innerText === "Cancel") {
      setPopUpTitle("Are you sure you want to cancel?");
      setPopUpMessage("You will lose all changes. Dou you wish to continue?");
    }
  }
  

  return (
    <>
      <Header back={true}/>
      {popUp ? <PopUp title={popUpTitle} message={popUpMessage} onConfirm={handleConfirm} onCancel={handleCancel}></PopUp> : null}
      <div className="taskContainerV">
        <h1>Task title</h1>
        <input type="text" placeholder="Title" className="inputsSpe" value={state.task.title}/>
        <h1>Description</h1>
        <textarea placeholder="Description" className="inputArea" value={state.task.description}  rows={5} />
        <h1 className="statusText">Status</h1>
        <div className="buttonsContainer">
          {Statuses.map((st, index) => (
            <button
              className={index === status ? "button red" : "button gray"}
              key={st}
              onClick={() => setStatus(index)}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="priorityContainer">
          <p>Priority:</p>
          <select value={state.task.priority}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="priorityContainer">
          <p>Due date:</p>
          <input type="date" className="dueDate" value={state.task.date}/>
        </div>
        <div style={{marginBottom: 16, marginTop: 8}}>
          <div className="buttonsContainer">
          <button className="button black" onClick={handleClick}>Cancel</button>
          <button className="button black" onClick={handleClick}>Save</button>
          </div>
          {!props.isNewTask && <div className="buttonsContainer">
          <button className="button red" onClick={handleClick}>Delete</button>
          </div>}
        </div>
      </div>
    </>
  );
};
