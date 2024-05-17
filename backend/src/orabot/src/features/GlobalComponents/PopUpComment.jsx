import React, { useState } from "react";
import "./Styles/PopUpComment.css";


export const PopUpComment = ({ title, comments, onClose, state }) => {
    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState(comments);

    const handleAddComment = () => {
        if (newComment.trim() === "") return;
        const updatedComments = [
            ...allComments,
            { userID: "Developer", message: newComment } //Si el ID es diferente al mío == Es manager
            // ...(state.isDeveloper? [{ userID: "Developer", message: newComment }] : [{ userID: "Manager", message: newComment }])
        ];
        setAllComments(updatedComments);
        setNewComment("");
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