import React, { useState } from "react";
import UserDetails from "./UserDetails";
import UserRepository from "./UserRepository";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepository, setUserRepository] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    if (!username) {
      alert("Please enter a username.");
      return;
    }

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const userRepos = await reposResponse.json();
      setUserRepository(userRepos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setUsername("");
    setUserData(null);
    setUserRepository([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div className="app-container">
      <h1>Github User Details</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter Github username"
        className="input"
      />
      <button onClick={fetchData} className="button-59">
        SEARCH
      </button>
      <div className="user-details">
        {userData && (
          <>
            <img
              src={userData.avatar_url}
              alt="User Avatar"
              className="avatar"
            />
            <p className="username">{userData.login}</p>
          </>
        )}
      </div>
      {userRepository.length > 0 && (
        <div className="repository-container">
          {userRepository.map((repo) => (
            <div key={repo.id} className="repository-card">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </div>
          ))}
        </div>
      )}
      {userData && (
        <button onClick={handleReset} className="button-59" role="button">
          RESTART
        </button>
      )}
    </div>
  );
};

export default App;
