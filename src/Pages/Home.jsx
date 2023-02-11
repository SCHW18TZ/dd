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
    <div className="HomePage">
      <div className="posts">
        {posts.map((post) => (
          <div className="post">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  <h1>{post.title}</h1>
                </Card.Title>
                <Card.Text>
                  <p className="PostDescription">{post.description}</p>
                </Card.Text>
                <Link to={`/post/${post.id}`}>
                  <Button variant="primary">Expand</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
