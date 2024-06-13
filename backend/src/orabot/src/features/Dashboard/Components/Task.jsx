import {React, useState} from "react";
import { NavLink} from "react-router-dom";

// Styles
import "../Styles/Task.css";

// Components 
import { PopUpComment } from "../../GlobalComponents/PopUpComment";

//API
import { getComments } from "../../../api/CommentAPI";

//Hooks
import { useUser } from "../../../hooks/useUser";


export const Task = (props) => {

  const date = new Date(props.task.dueDate).toISOString().split("T")[0];
  const { userData } = useUser();

  const [activePopup, setActivePopup] = useState(null);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpComments, setPopUpComments] = useState([]);
  //const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (activePopup === "comments") {
      setActivePopup(null);
    }
  };

  const handleCommentClick = async () => {
    //setLoading(true);
    try {
      const token = userData.token;
      const comments = await getComments(props.task.id, token);
      setPopUpComments(comments || []); // Ensure comments is always an array
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setPopUpComments([]); // Set comments to an empty array on error
    } finally {
      //setLoading(false);
      setActivePopup("comments");
      setPopUpTitle("Comments");
    }
  };


  return (
    <>
      {activePopup === "comments" && (
        <PopUpComment
          title={popUpTitle}
          comments={popUpComments}
          taskID={props.task.id}
          onClose={handleClose}
        />
      )}
      <div className="taskContainer">
        <div className="task">
          <div
            className={`circle ${
              props.task.status === "ToDo"
                ? "grey"
                : props.task.status === "Ongoing"
                ? "orange"
                : "green"
            }`}
          />
          <div className="taskInfo">
            <div className="titleInfo">
              <h1 className="titleX">{props.task.title}</h1>
              <div className="iconContainer">
                <img
                  // src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fcommentary.png?alt=media&token=9232f41a-8caf-49b4-b40e-8cf7a021e63b"
                  src="https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-comment-filled-icon"
                  alt="Commentary Section"
                  width={32}
                  height={32}
                  className="commentaries"
                  onClick={handleCommentClick}
                />
                {userData.role==="Developer" && (
                  <NavLink to={"/task/:" + props.task.id} state={{ task: props.task }}>
                    <img
                    src="https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-edit-icon"
                    alt="Edit icon"
                      width={32}
                      height={32}
                    />
                  </NavLink>
                )}
              </div>
            </div>
            <div className="priorInfo">
              <div className="prior">
                <p className="textP">{`Priority: `}</p>
                <div
                  className={`priorP `}
                >
                  <p className={`xd ${
                    props.task.priority === 1
                      ? "high"
                      : props.task.priority === 2
                      ? "mid"
                      : "low"
                  }`}>{`${props.task.priority}`}</p>
                </div>
              </div>

              <div className="statusX">
                <p className="static">Due date</p>
                <p className="date">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  );
};