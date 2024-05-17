import React, { useState } from "react";
import "./Styles/PopUpComment.css";

//Hooks
import { useUser } from "../../hooks/useUser";

//API
import { createComment } from "../../api/CommentAPI";

export const PopUpComment = ({ title, comments, onClose, taskID}) => {
    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState(comments);
    const { userData } = useUser();
    const [userID, setUserID] = useState(userData.UID);

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;
    
        const token = userData.token;
        const comment = { commenterId: userID, message: newComment, taskId: taskID, creationDate: new Date()}; 
    
        try {
          const createdComment = await createComment(comment, token);
          if (!createdComment.error) {
            setAllComments([...allComments, createdComment]);
            setNewComment("");
          }
        } catch (error) {
          console.error("Failed to create comment:", error);
        }
      };

    const renderComments = () =>
        allComments && allComments.length > 0 ? allComments.map((comment, index) => (
            <div key={index} className={`comment ${comment.userID === "Manager" ? "manager-comment" : ""}`}>
                <strong className={`userID ${comment.userID === "Manager" ? "manager-user" : ""}`}>
                    {`${comment.userID}: `}   
                </strong>
                    {comment.message}
            </div>
        )) : null;

    return (
        <div className="popUpContainerComment">
            <div className="titleSection">
                <button type="button" onClick={onClose} className="close-button">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fcross.png?alt=media&token=8a61e868-ce6b-4e0f-b8a6-1f3705e11c5e"
                        alt="Close"
                        width="20"
                        height="20"
                    />
                </button>
                <h1 className="titleComment">{title}</h1>
            </div>
            
            <div className="commentsSection">
                {renderComments()}
            </div>

            <div className="inputSection">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="button" onClick={handleAddComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
};