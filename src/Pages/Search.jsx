import React, { useEffect } from "react";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Search = () => {
  const UsersCollectionRef = collection(db, "users");
  const [search, SetSearch] = useState("");
  const [userlist, setuserlist] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(UsersCollectionRef);
      setuserlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  console.log((userlist.length = 10));

  return (
    <div className="HomePage">
      <div>
        <input type="text" onChange={(e) => SetSearch(e.target.value)} />
        {userlist
          .filter((user) => {
            if (search == "") {
              return user;
            } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
              return user;
            }
          })
          .map((user) => (
            <div>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Search;
