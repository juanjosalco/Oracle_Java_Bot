import React, { useState,useEffect } from "react";
import "./Styles/PopUpComment.css";

//Hooks
import { useUser } from "../../hooks/useUser";

//API
import { createComment } from "../../api/CommentAPI";

const MAX_CHAR_LIMIT = 120;

export const PopUpComment = ({ title, comments, onClose, taskID}) => {
    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState(comments);
    const { userData } = useUser();
    const [userID, setUserID] = useState("");

    useEffect(() => {
        setUserID(userData.UID); // Assuming userData.UID is the correct property for the user's ID
    }, [userData]);

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

      const renderComments = () => {
        if (!allComments || allComments.length === 0) return null;
    
        return allComments.map((comment, index) => {
            console.log(`Comment ID: ${comment.commenterId}, User ID: ${userID}`); // Debug log
            const isDeveloper = comment.commenterId === userID;
            return (
                <div key={index} className={`comment ${isDeveloper ? "comment" : "manager-comment"}`}>
                    <strong className={`userID ${isDeveloper ? "user" : "manager-user"}`}>
                        {`${isDeveloper ? "You" : "Manager"}: `}
                    </strong>
                    {comment.message}
                </div>
            );
        });
    };

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
                    maxLength={MAX_CHAR_LIMIT}
                />
                <div className={`charCounter ${newComment.length === MAX_CHAR_LIMIT ? 'limit-reached' : ''}`}>
                    {newComment.length}/{MAX_CHAR_LIMIT}
                </div>
                <button type="button" onClick={handleAddComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
};