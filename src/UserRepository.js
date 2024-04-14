import React from "react";
import PropTypes from "prop-types";

const userRepository = ({ userRepository }) => (
  <div>
    <h3>Repositories:</h3>
    <ul>
      {userRepository.map((repository) => (
        <li key={repository.id}>{repository.name}</li>
      ))}
    </ul>
  </div>
);

userRepository.propTypes = {
  userRepository: PropTypes.array.isRequired,
};

export default userRepository;
