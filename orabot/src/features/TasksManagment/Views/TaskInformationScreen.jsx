import React, {useState} from "react";

// Styles
import "../Styles/TaskInformation.css";

// Components
import { Header } from "../../GlobalComponents/Header";

const Statuses = ["To do", "Ongoing", "Done"];

export const TaskInformationScreen = ({isNewTask}) => {
  const [status, setStatus] = useState(0);

  return (
    <>
      <Header />
      <div className="taskContainerV">
        <h1>Title</h1>
        <input type="text" placeholder="Title" className="inputsSpe" />
        <h1>Description</h1>
        <textarea placeholder="Description" className="inputArea" rows={5} />
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
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="priorityContainer">
          <p>Due date:</p>
          <input type="date" className="dueDate" />
        </div>
        <div style={{marginBottom: 16, marginTop: 8}}>
          <div className="buttonsContainer">
          <button className="button black">Save</button>
          <button className="button black">Cancel</button>
          </div>
          {!isNewTask && <div className="buttonsContainer">
          <button className="button red">Delete</button>
          </div>}
        </div>
      </div>
    </>
  );
};
