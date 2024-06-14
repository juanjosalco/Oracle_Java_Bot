import React, { useState } from "react";
import "./Styles/PopUpComment.css";

//Hooks
import { useUser } from "../../hooks/useUser";

//API
import { createComment } from "../../api/CommentAPI";

// COMPONENTS
import { MyTextInput } from "../GlobalComponents/TextInput";
import { MyButton } from "./Button";

const MAX_CHAR_LIMIT = 120;

export const PopUpComment = ({ title, comments, onClose, taskID}) => {
    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState(Array.isArray(comments) ? comments : []);
    const [error, setError] = useState("");
    const { userData } = useUser();

    const handleAddComment = async () => {
        if (newComment.trim() === ""){
            setError("Comment cannot be empty");
            return;
        };
    
        const token = userData.token;
        const comment = { commenterId: userData.UID, message: newComment, taskId: taskID, creationDate: new Date()}; 
    
        const response = await createComment(comment, token);
        if (response.error) {
            setError(response.error);
        } else {
            setAllComments([...allComments, response]);
            setNewComment("");
          }
      };

      const renderComments = () => {
        if (!Array.isArray(allComments) || allComments.length === 0) {
            return null;
        }
    
        return allComments.map((comment, index) => {
            const isCurrentUser = comment.commenterId === userData.UID;
            const isYou = userData.role === "Developer";
            return (
                <div key={index} className={`comment ${isCurrentUser ? "comment" : "manager-comment"}`}>
                    <strong className={`userID ${isCurrentUser ? "user" : "manager-user"}`}>
                        {isCurrentUser ? "You" : (isYou ? "Manager" : "Developer")}:{" "}
                    </strong>
                    {comment.message}
                </div>
            );
        });
    };

    return (
        <div className="modal-blur">
            <div className="popUpContainerComment">
                <div className="titleSection">
                    <button type="button" onClick={onClose} className="close-button">
                        <img
                            src="https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-cross-icon"
                            alt="Close"
                            width="24"
                            height="24"
                        />
                    </button>
                    <h1 className="titleComment">{title}</h1>
                </div>
                
                <div className="commentsSection">
                    {renderComments()}
                </div>
                {/* TODO BUG this input is not erased after sending the comment */}
                <div className="inputSection">
                    <MyTextInput
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        type="text"
                        placeholder="Write a comment..."
                        className="comment-input"
                        maxLength={MAX_CHAR_LIMIT}
                    />
                    <MyButton text="Add" onClick={handleAddComment} type="button"/>
                </div>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};