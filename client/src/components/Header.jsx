/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const localData = localStorage?.getItem("graphQl_token");
  console.log("localData", localData);
  const navigate = useNavigate();
  const decodedToken = localData ? jwtDecode(localData) : null;
  console.log("decodedToken", decodedToken?.name);
  const handleLogOut = () => {
    localStorage.removeItem("graphQl_token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>Project Mgmt</div>
          </div>
        </a>
        {decodedToken ? (
          <>
            <h4 style={{ float: "right" }}>{decodedToken?.name}</h4>
            <button
              type="button"
              className="btn btn-secondary m-3"
              onClick={handleLogOut}
            >
              <div className="d-flex align-items-center">
                <h6>LogOut</h6>
              </div>
            </button>
          </>
        ) : (
          <>
            <div style={{ float: "right", marginRight: "10%" }}>
              <Link style={{ marginRight: "10px" }} to={`/login`}>
                Login
              </Link>
              <Link to={`/register`}>Register</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
