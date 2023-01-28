import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import CreatePost from "./Pages/CreatePost";
import SinglePost from "./Pages/SinglePost";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [posts, setposts] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setposts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<CreatePost />} />
        {posts.map((post) => (
          <Route
            path={`/post/${post.id}`}
            element={<SinglePost post={post} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
