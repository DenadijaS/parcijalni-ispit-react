import React from "react";
import PropTypes from "prop-types";

const UserDetails = ({ userData }) => (
  <div>
    <h2>{userData.name}</h2>
    <img src={userData.avatar_url} alt="Avatar" />
    <p>Location: {userData.location}</p>
    <p>Bio: {userData.bio}</p>
  </div>
);

UserDetails.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserDetails;
