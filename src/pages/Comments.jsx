import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import './Comments.css';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export const Comments = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    // Add Comment
    const addComment = async () => {
        if (!auth.currentUser) {
            alert("You must be logged in to comment!");
            return;
        }
        
        try {
            await addDoc(collection(db, "comments"), {
                userId: auth.currentUser.uid,
                text: comment,
                timestamp: serverTimestamp(),
            });

            setComment(''); // Clear input field
            fetchComments(); // Refresh comments
        } catch (err) {
            console.error("Error adding comment: ", err);
        }
    };

    // Get Comments
    const fetchComments = async () => {
        const querySnapshot = await getDocs(collection(db, "comments"));
        const commentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsList);
    };

    // Get comments when ready
    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="comments">
            <h1 className='header'>Comment</h1>

            {/* Input for adding a comment */}
            <div className="comment-input">
                <textarea 
                    rows = "4" 
                    cols = "50"
                    type="textarea" 
                    placeholder="Write a comment..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={addComment}>Post</button>
            </div>

            {/* Displaying comments */}
            <div className="comments-list">
                {comments.map((c) => (
                    <div key={c.id} className="comment-container">
                        <p> {c.text}</p>
                        <small className='comment-date'>{c.timestamp?.toDate().toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;