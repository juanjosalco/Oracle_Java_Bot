import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import "../Styles/TaskInformation.css";

// Components
import { Header } from "../../GlobalComponents/Header";

const Statuses = ["To do", "Ongoing", "Done"];

export const TaskInformationScreen = ({isNewTask, task}) => {
  
  // Router
  const location = useLocation();
  const navigate = useNavigate();


  const { state } = location;

  const statusIdx = Statuses.indexOf(state.status);

  const [status, setStatus] = useState(statusIdx);

  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="taskContainerV">
        <h1>Task title</h1>
        <input type="text" placeholder="Title" className="inputsSpe" value={state.title}/>
        <h1>Description</h1>
        <textarea placeholder="Description" className="inputArea" value={state.description}  rows={5} />
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
          <select value={state.priority}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="priorityContainer">
          <p>Due date:</p>
          <input type="date" className="dueDate" value={state.date}/>
        </div>
        <div style={{marginBottom: 16, marginTop: 8}}>
          <div className="buttonsContainer">
          <button className="button black" onClick={handleButtonClick}>Save</button>
          <button className="button black" onClick={handleButtonClick}>Cancel</button>
          </div>
          {!isNewTask && <div className="buttonsContainer">
          <button className="button red" onClick={handleButtonClick}>Delete</button>
          </div>}
        </div>
      </div>
    </>
  );
};
