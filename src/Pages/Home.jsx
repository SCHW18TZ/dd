import React from "react";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const postCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);

  const [user] = useAuthState(auth);
  let navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    //Make a HTML markup to display all posts
    <div className="HomePage">
      <div className="posts">
        {posts.map((post) => (
          <>
            <a href={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </a>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
