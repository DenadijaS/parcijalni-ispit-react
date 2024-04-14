import React from "react";
import PropTypes from "prop-types";

const UserDetails = ({ userData }) => (
  <div>
    <h2>{userData.name}</h2>
    <img src={userData.avatar_url} alt="Avatar" />
    <p>Bio: {userData.bio}</p>
    <p>Location: {userData.location}</p>
  </div>
);

UserDetails.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserDetails;
