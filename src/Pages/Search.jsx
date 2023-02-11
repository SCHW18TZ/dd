import React from "react";
import { useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Search = () => {
  const userRef = collection(db, "users");
  const [username, setUsername] = useState(null);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const q = query(
      collection(db, "users"),
      where("name".toLowerCase(), "==", username.toLowerCase())
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().name === username) {
        setUsername(doc.data());
      } else {
        setUsername(null);
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <button>Search</button>
      </form>
      <div>
        {setUsername != null ? (
          <h1>
            <Link to={`/user/${username?.uid}`}>{username?.name}</Link>
          </h1>
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
