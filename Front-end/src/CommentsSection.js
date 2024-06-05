import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentsSection.css";

const CommentsSection = ({ posterId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:5000/comments/${posterId}`);
      setComments(response.data);
    };
    fetchComments();
  }, [posterId]);

  const handleAddComment = async () => {
    if (rating === "") {
      alert("Будь ласка, оберіть оцінку.");
      return;
    }
    const comment = { posterId, text: newComment, rating };
    const response = await axios.post('http://localhost:5000/comments', comment);
    setComments([...comments, response.data]);
    setNewComment("");
    setRating("");
  };

  return (
    <div className="comments-section">
      <h3>Коментарі та оцінки:</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <p>{comment.text}</p>
          <p>Оцінка: {comment.rating}</p>
        </div>
      ))}
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Додати коментар"
        ></textarea>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Оцінка</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={handleAddComment}>Додати коментар</button>
      </div>
    </div>
  );
};

export default CommentsSection;