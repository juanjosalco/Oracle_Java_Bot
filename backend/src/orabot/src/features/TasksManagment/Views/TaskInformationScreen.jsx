import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import "../Styles/TaskInformation.css";

// Components
import { Header } from "../../GlobalComponents/Header";
import { PopUp } from "../../GlobalComponents/PopUp";

import { postTask, deleteTask, updateTask } from "../../../api/TasksAPI";
import { useUser } from "../../../hooks/useUser";
import { MyTextInput } from "../../GlobalComponents/TextInput";
import { MyButton } from "../../GlobalComponents/Button";

const Statuses = ["ToDo", "Ongoing", "Done"];

export const TaskInformationScreen = () => {
  const { userData } = useUser();

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) navigate("/dashboard");
  if (!userData) navigate("/");

  const { state } = location;

  const MAX_TITLE_CHAR_LIMIT = 64;
  const MAX_DESCRIPTION_CHAR_LIMIT = 320;

  const statusIdx = Statuses.indexOf(state.task.status);

  const assignee = userData.UID;
  const role = userData.role;
  const [title, setTitle] = useState(state.task.title);
  const [description, setDescription] = useState(state.task.description);
  const [status, setStatus] = useState(statusIdx);
  const [priority, setPriority] = useState(state.task.priority);
  const [dueDate, setDueDate] = useState(state.task.dueDate);
  const creationDate = new Date();
  const statusChangeDate = new Date();

  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUpConfirm, setPopUpConfirm] = useState("");
  const [titleCharCount, setTitleCharCount] = useState(state.task.title.length);
  const [descriptionCharCount, setDescriptionCharCount] = useState(
    state.task.description.length
  );

  const dateX = new Date(state.task.dueDate).toISOString().split("T")[0];
  const [date, setDate] = useState(dateX);

  const handleCancel = () => {
    setPopUp(false);
  };

  const handleDelete = async () => {
    const response = await deleteTask(
      userData.token,
      state.task.id,
      state.task
    );
    if (response.error) {
      setError(response.error);
    } else {
      navigate("/dashboard", { state: { toast: "taskDeleted" } });
    }
  };

  const handleUpdate = async () => {
    const newTask = {
      assignee: assignee,
      title: title,
      description: description,
      status: Statuses[status],
      priority: priority,
      dueDate: dueDate,
      creationDate: creationDate,
      statusChangeDate: statusChangeDate,
    };
    const response = await updateTask(userData.token, state.task.id, newTask);
    if (response.error) {
      setError(response.error);
    } else {
      navigate("/dashboard", { state: { toast: "taskUpdated" } });
    }
  };

  const handleCreate = async () => {
    const newTask = {
      assignee: assignee,
      title: title,
      description: description,
      status: Statuses[status],
      priority: priority,
      dueDate: dueDate,
      creationDate: creationDate,
      statusChangeDate: statusChangeDate,
    };

    const response = await postTask(userData.token, newTask);
    if (response.error) {
      setError(response.error);
    } else {
      navigate("/dashboard", { state: { toast: "taskCreated" } });
    }
  };

  const handleConfirm = () => {
    if (popUpConfirm === "Cancel") {
      navigate("/dashboard", { state: {} });
    }
    if (popUpConfirm === "Delete") {
      handleDelete();
    }
  };

  const handleClick = (e) => {
    if (e.target.innerText === "Save") {
      handleUpdate();
    } else if (e.target.innerText === "Delete") {
      setPopUp(true);
      setPopUpConfirm("Delete");
      setPopUpTitle("Are you sure you want to delete the task?");
      setPopUpMessage(
        "You will lose all the information related to this task. Do you wish to continue?"
      );
    } else if (e.target.innerText === "Cancel") {
      setPopUp(true);
      setPopUpConfirm("Cancel");
      setPopUpTitle("Are you sure you want to cancel?");
      setPopUpMessage("You will lose all changes. Do you wish to continue?");
    }
  };

  const handlePriorityChange = (e) => {
    const newPriority = parseInt(e.target.value); // Convert value to integer
    setPriority(newPriority); // Update state with new priority
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value; // Obtener la nueva fecha seleccionada por el usuario
    const formattedDate = new Date(newDate).toISOString().split("T")[0]; // Convertir la fecha al formato ISO 8601
    setDate(formattedDate); // Actualizar el estado `date` con la nueva fecha
    setDueDate(new Date(formattedDate)); // Asegurarse de que `dueDate` también se actualiza con la nueva fecha
  };

  // Update title character count
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= MAX_TITLE_CHAR_LIMIT) {
      setTitle(newTitle);
      setTitleCharCount(newTitle.length);
    }
  };

  // Update description character count
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_DESCRIPTION_CHAR_LIMIT) {
      setDescription(newDescription);
      setDescriptionCharCount(newDescription.length);
    }
  };

  return (
    <>
      <Header back={true} />
      {popUp ? (
        <PopUp
          title={popUpTitle}
          message={popUpMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        ></PopUp>
      ) : null}
      <div className="taskContainerV">
        <div className="titleCharCounter">
          <h1>Task title ({titleCharCount}/{MAX_TITLE_CHAR_LIMIT})</h1>
        </div>
        {role === "Developer" ? (
          <MyTextInput 
            type={"text"}
            value={title}
            onChange={handleTitleChange}
            placeholder={"Title"}
            maxLength={MAX_TITLE_CHAR_LIMIT}
            className={"inputsSpe"}
            >
          </MyTextInput>

        ) : (
          <p className="taskTitle">{state.task.title}</p>
        )}
        <div className="titleCharCounter">
          <h1 style={{ marginTop: 16 }}>
            Description ({descriptionCharCount}/{MAX_DESCRIPTION_CHAR_LIMIT})
          </h1>
        </div>
        {role === "Developer" ? (
          <textarea
            placeholder="Description"
            className="inputArea"
            defaultValue={description}
            maxLength={MAX_DESCRIPTION_CHAR_LIMIT}
            rows={5}
            onChange={handleDescriptionChange}
            style={{ resize: "none" }}
          />
        ) : (
          <p className="taskTitle">{state.task.description}</p>
        )}
        <h1 className="statusText">Status</h1>
        <div className={role === "Developer" ? "buttonsContainer" : ""}>
          {role === "Developer" ? (
            Statuses.map((st, index) => (
              <button
                className={index === status ? "button red" : "button gray"}
                key={st}
                onClick={() => setStatus(index)}
              >
                {st}
              </button>
            ))
          ) : (
            <p className="taskTitle">{state.task.status}</p>
          )}
        </div>
        <div className={role !== "Developer" ? "groups" : ""}>
          <div
            className={role === "Developer" ? "priorityContainer" : ""}
            style={{ marginBlock: 16, flex: 1 }}
          >
            {role === "Developer" ? (
              <p>Priority:</p>
            ) : (
              <h1 style={{ marginTop: 16 }}>Priority:</h1>
            )}
            {role === "Developer" ? (
              <select value={priority} onChange={handlePriorityChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            ) : (
              <p className="taskTitle">{state.task.priority}</p>
            )}
          </div>
          <div
            className={role === "Developer" ? "priorityContainer" : ""}
            style={{ marginBlock: 16, flex: 1 }}
          >
            {role === "Developer" ? (
              <p>Due date:</p>
            ) : (
              <h1 style={{ marginTop: 16 }}>Due date:</h1>
            )}
            {role === "Developer" ? (
              <input
                type="date"
                className="dueDate"
                value={date}
                onChange={handleDateChange}
              />
            ) : (
              <p>{state.task.date}</p>
            )}
          </div>
        </div>
        <div style={{ marginBottom: 16, marginTop: 8 }}>
          {role === "Developer" && (
            <div className="buttonsContainer">
              <MyButton text={"Cancel"} onClick={handleClick}></MyButton>
              {state.isNewTask ? (
                <MyButton text={"Create"} onClick={handleCreate} className={"button red"}></MyButton>
              ) : (
                <MyButton text={"Delete"} onClick={handleClick}></MyButton>
              )}
            </div>
          )}
          {error && <p className="error">{error}</p>}
          {role === "Developer" ? (
            !state.isNewTask && (
              <div className="buttonsContainer">
                <MyButton text={"Save"} onClick={handleClick} className={"button red"}></MyButton>

              </div>
            )
          ) : (
            <div className="buttonsContainer">
              <MyButton text={"Return to Dashboard"} onClick={handleConfirm} ></MyButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
