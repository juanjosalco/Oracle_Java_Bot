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
  const [priority, setPriority] = useState(state.task.priority);
  const [date, setDate] = useState(state.task.date);

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
  

  const handlePriorityChange = (e) => {
    const newPriority = parseInt(e.target.value); // Convert value to integer
    setPriority(newPriority); // Update state with new priority
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value; // Get new date
    setDate(newDate); // Update state with new date
  };

  return (
    <>
      <Header back={true}/>
      {popUp ? <PopUp title={popUpTitle} message={popUpMessage} onConfirm={handleConfirm} onCancel={handleCancel}></PopUp> : null}
      <div className="taskContainerV">
        <h1>Task title</h1>
        {state.isDeveloper ? <input type="text" placeholder="Title" className="inputsSpe" value={state.task.title}/> : <p className="taskTitle">{state.task.title}</p>}
        <h1 style={{marginTop: 16}}>Description</h1>
        {state.isDeveloper ? <textarea placeholder="Description" className="inputArea" value={state.task.description}  rows={5} /> : <p className="taskTitle">{state.task.description}</p>}
        <h1 className="statusText" >Status</h1>
        <div className={state.isDeveloper ? "buttonsContainer" : ''}>
          {state.isDeveloper ? Statuses.map((st, index) => (
            <button
              className={index === status ? "button red" : "button gray"}
              key={st}
              onClick={() => setStatus(index)}
            >
              {st}
            </button>
          )) : <p className="taskTitle">{state.task.status}</p>}
        </div>
        <div className={!state.isDeveloper ? "groups" : ""} >
        <div className={state.isDeveloper ? "priorityContainer"  : "" } style={{marginBlock: 16, flex: 1}}>
          {state.isDeveloper ? <p>Priority:</p> : <h1 style={{marginTop: 16,}}>Priority:</h1>}
         {state.isDeveloper ? <select value={priority} onChange={handlePriorityChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> : <p className="taskTitle">{state.task.priority}</p>}
        </div>
        <div className={state.isDeveloper ? "priorityContainer" : ''} style={{marginBlock: 16, flex: 1}}>
          {state.isDeveloper ? <p>Due date:</p> : <h1 style={{marginTop: 16}}>Due date:</h1>}
          {state.isDeveloper ? <input type="date" className="dueDate" value={date} onChange={handleDateChange}/> : <p>{state.task.date}</p>}
        </div>
        </div>
        <div style={{marginBottom: 16, marginTop: 8}}>
          { state.isDeveloper && <div className="buttonsContainer">
          <button className="button black" onClick={handleClick}>Cancel</button>
          <button className="button black" onClick={handleClick}>Save</button>
          </div>}
          {state.isDeveloper ? !state.isNewTask && 
          <div className="buttonsContainer"> 
            <button className="button red" onClick={handleClick}>Delete</button>
          </div> : <div className="buttonsContainer">
          <button className="button black"  onClick={handleConfirm}>Return to Dashboard</button> 
          </div>} 
        </div>
      </div>
    </>
  );
};
