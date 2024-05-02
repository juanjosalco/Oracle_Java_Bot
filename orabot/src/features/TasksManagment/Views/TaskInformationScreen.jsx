import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import "../Styles/TaskInformation.css";

// Components
import { Header } from "../../GlobalComponents/Header";
import { PopUp } from "../../GlobalComponents/PopUp";

import {postTask, deleteTask, updateTask} from "../../../api/TasksAPI";
import { useUser } from "../../../hooks/useUser";

const Statuses = ["To do", "Ongoing", "Done"];

export const TaskInformationScreen = (props) => {

  const { userData } = useUser();
  
  // Router
  const location = useLocation();
  const navigate = useNavigate();


  const { state } = location;

  const statusIdx = Statuses.indexOf(state.task.status);

  const assignee = userData.UID;
  const [title, setTitle] = useState(state.task.title);
  const [description, setDescription] = useState(state.task.description);
  const [status, setStatus] = useState(statusIdx);
  const [priority, setPriority] = useState(state.task.priority);
  const [dueDate, setDueDate] = useState(state.task.dueDate);
  const creationDate = Date.now();
  const statusChangeDate = Date.now();

  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUpConfirm, setPopUpConfirm] = useState("");

  const dateX = new Date(state.task.dueDate).toISOString().split("T")[0];
  const [date, setDate] = useState(dateX);

  const handleCancel = () => {
    setPopUp(false);
  }

  const handleDelete = async () => {
    const response = await deleteTask(userData.token, state.task.id, state.task);
    if (response.error) {
      setError(response.error);
    } else {
      // TOAST TASK DELETED
      navigate("/dashboard", { state: { isDeveloper: state.isDeveloper } } );
    } 
  }

  const handleUpdate = async () => {
    const newTask = {
      assignee: assignee,
      title: title,
      description: description,
      status: Statuses[status],
      priority: priority,
      dueDate: dueDate,
      creationDate: creationDate,
      statusChangeDate: statusChangeDate
    } 
    console.log(newTask);
    const response = await updateTask(userData.token, state.task.id, newTask);
    if (response.error) {
      setError(response.error);
    } else {
      // TOAST TASK Updated
      navigate("/dashboard", { state: { isDeveloper: state.isDeveloper } } );
    } 
  }

  const handleCreate = async () => {
        const newTask = {
          assignee: assignee,
          title: title,
          description: description,
          status: Statuses[status],
          priority: priority,
          dueDate: dueDate,
          creationDate: creationDate,
          statusChangeDate: statusChangeDate
        } 

        const response = await postTask(userData.token, newTask);
        if (response.error) {
          setError(response.error);
        } else {
          // TOAST TASK CREATED
          navigate("/dashboard", { state: { isDeveloper: state.isDeveloper } } );
        } 
  }

  const handleConfirm = () => {
    if(popUpConfirm === "Cancel") {
      navigate("/dashboard", { state: { isDeveloper: state.isDeveloper } } );
    }
    if(popUpConfirm === "Delete"){
      handleDelete();
    }
  };

  const handleClick = (e) => {
    if(e.target.innerText === "Save") {
      handleUpdate();
    }
    else if(e.target.innerText === "Delete") {
      setPopUp(true);
      setPopUpConfirm("Delete")
      setPopUpTitle("Are you sure you want to delete the task?");
      setPopUpMessage("You will lose all the information related to this task. Do you wish to continue?");
    }
    else if(e.target.innerText === "Cancel") {
      setPopUp(true);
      setPopUpConfirm("Cancel")
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
      {error && <p className="error">{error}</p>}
      {popUp ? <PopUp title={popUpTitle} message={popUpMessage} onConfirm={handleConfirm} onCancel={handleCancel}></PopUp> : null}
      <div className="taskContainerV">
        <h1>Task title</h1>
        {state.isDeveloper ? <input type="text" placeholder="Title" className="inputsSpe" defaultValue={state.task.title} onChange={(e) => {setTitle(e.target.value)}}/> : <p className="taskTitle">{state.task.title}</p>}
        <h1 style={{marginTop: 16}}>Description</h1>
        {state.isDeveloper ? <textarea placeholder="Description" className="inputArea" defaultValue={state.task.description}  rows={5} onChange={(e) => {setDescription(e.target.value)}} /> : <p className="taskTitle">{state.task.description}</p>}
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
          {state.isNewTask ? 
          <button className="button black" onClick={handleCreate}>Create</button> : 
          <button className="button black" onClick={handleClick}>Save</button>
          }
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
