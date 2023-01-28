import {
  addDoc,
  deleteDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  const commentsCollectionRef = collection(db, "comments");
  const [commentText, setcommentText] = useState("");
  const [user] = useAuthState(auth);
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      commentsCollectionRef,
      where("postId", "==", post.id)
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setcomments(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText == "") return;
    await addDoc(commentsCollectionRef, {
      comment: commentText,
      name: user.displayName,
      postId: post.id,
      uid: user.uid,
    });
    setcommentText("");
  };

  const deletePost = async () => {};

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <Link to={`/user/${post.author.uid}`}>by {post.author.name}</Link>
      <button onClick={deletePost}>Delete Post</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type a comment"
          value={commentText}
          onChange={(e) => setcommentText(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
      {comments.map((comment) => (
        <div>
          <h2>{comment.comment}</h2>
          <Link to={`/user/${comment.uid}`}>{comment.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default SinglePost;
