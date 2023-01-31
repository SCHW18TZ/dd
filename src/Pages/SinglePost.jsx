import {
  addDoc,
  doc,
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
import {Toaster,toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const SinglePost = ({ post }) => {

  let navigate = useNavigate()

  const postCollectionRef = collection(db, "posts");
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
    toast.success ("Comment added successfully  ")
  };

  const deletePost = async () => {
      deleteDoc(doc(db,'posts',post.id)).catch(err=>{console.log(err);})
      navigate('/')
      toast.success("Post Deleted")
    
  };

  return (
    <div>
      <Toaster/>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <Link to={`/user/${post.author.uid}`}>by {post.author.name}</Link>
      {post.author.uid == user.uid &&(
        <button onClick={deletePost}>Delete Post</button>
      )}
      
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
