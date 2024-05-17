import {React, useState} from "react";
import { NavLink, useNavigate, useLocation} from "react-router-dom";

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

  const [activePopup, setActivePopup] = useState(null);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpComments, setPopUpComments] = useState([]);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData } = useUser();

  const handleClose = () => {
    if (activePopup === "comments") {
      setActivePopup(null);
    }
  };

  const handleCommentClick = async () => {
    setLoading(true);
    try {
      const token = userData.token;
      const comments = await getComments(props.task.id, token);
      setPopUpComments(comments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
      setActivePopup("comments");
      setPopUpTitle("Comments");
    }
  };
    // const popUpComments = [
    //   { userID: "Manager", message: "Just a quick note on this feature." },
    //   { userID: "Developer", message: "Wow, that's a lot of details I'm overwhelmed." },
    //   { userID: "Developer", message: "Hey Manager, got a juicy piece of gossip to share!, Hey Manager, got a juicy piece of gossip to share!, Hey Manager, got a juicy piece of gossip to share!, Hey Manager, got a juicy piece of gossip to share!" },
    //   { userID: "Manager", message: "I see what you're saying about the UI design." },
    //   { userID: "Manager", message: "Hey Manager, got a juicy piece of gossip to share!, Hey Manager, got a juicy piece of gossip to share!, Hey Manager, got a juicy piece of gossip to share!, Hey Manager, got a juicy piece of gossip to share!" },
    //   { userID: "Developer", message: "I'm stuck on this bug. Any ideas?" },
    //   { userID: "Manager", message: "Let's brainstorm solutions together." },
    //   { userID: "Manager", message: "I have a new idea for improving performance." },
    //   { userID: "Developer", message: "That sounds promising Can't wait to hear more." },
    // ];
    // setPopUpComments(popUpComments);


  return (
    <>
      {activePopup === "comments" && (
        <PopUpComment
          title={popUpTitle}
          comments={popUpComments}
          userID={userID}
          onClose={handleClose}
        />
      )}
      <div className="taskContainer">
        <div className="task">
          <div
            className={`circle ${
              props.task.status === "To do"
                ? "gris"
                : props.task.status === "Ongoing"
                ? "orange"
                : "green"
            }`}
          />
          <div className="taskInfo">
            <div className="titleInfo">
              <h1 className="titleX">{props.task.title}</h1>
              {props.isDeveloper && (
                <div className="iconContainer">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fcommentary.png?alt=media&token=9232f41a-8caf-49b4-b40e-8cf7a021e63b" // URL del icono
                    alt="Commentary Section"
                    width={27}
                    height={27}
                    className="commentaries"
                    onClick={handleCommentClick}
                  />
                  
                  <NavLink to={"/task/:"+props.task.id} state={{task: props.task, isDeveloper: props.isDeveloper}}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fediting.png?alt=media&token=4a4f5588-1d15-450c-9e7b-ec2c7e6ecd68"
                    alt="Edit icon"
                    width={30}
                    height={30}
                  />
                  </NavLink>
                </div>
              )}
            </div>
            <div className="priorInfo">
              <div className="prior">
                <p className="textP">{`Priority: `}</p>
                <div
                  className={`priorP `}
                >
                  <p className={`xd ${
                    props.task.priority === 1
                      ? "red"
                      : props.task.priority === 2
                      ? "orange"
                      : "green"
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
