import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
    //Make a HTML markup to disp/lay all posts
    <div className="HomePage">
      <div className="posts">
        {posts.map((post) => (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  <h1>{post.title}</h1>
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Link to={`/post/${post.id}`}>
                  <Button variant="primary">Go somewhere</Button>
                </Link>
              </Card.Body>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
