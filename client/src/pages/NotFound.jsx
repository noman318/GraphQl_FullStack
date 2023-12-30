import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="d-flex flex-column mt-5 justify-content-between align-items-center">
      <FaExclamationTriangle className="text-danger" size={"5rem"} />
      <h1>404</h1>
      <p>Sorry, This page does not exist.</p>
      <Link to={"/"} className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
