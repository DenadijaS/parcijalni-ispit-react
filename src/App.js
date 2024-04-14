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
      setShowAlert(true);
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
      const userRepository = await reposResponse.json();
      setUserRepository(userRepository);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setUsername("");
    setUserData(null);
    setUserRepository([]);
    setShowAlert(false);
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
      <button onClick={fetchData} className="button">
        GO!
      </button>
      {showAlert && <p className="alert">Please enter a username.</p>}
      {userData && <UserDetails userData={userData} />}
      {userRepository.length > 0 && (
        <UserRepository userRepository={userRepository} />
      )}
      {userData && (
        <button onClick={handleReset} className="button">
          Reset
        </button>
      )}
    </div>
  );
};

export default App;
