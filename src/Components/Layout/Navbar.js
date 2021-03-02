/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import Login from "../../container/Login/Login";
import authContext from "../../container/Context/authContext";
import { Link, useHistory } from "react-router-dom";

function Navbar(props) {
  let history = useHistory();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { authenticated, setAuthenticated } = useContext(authContext);

  const onClickLogout = () => {
    setAuthenticated(false);
  };
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <a className="navbar-brand" href="#">
          Admin Panel
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {authenticated !== true ? (
            <ul
              style={{ marginLeft: "80%", fontSize: "25px" }}
              className="navbar-nav mr-auto my-2"
            >
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Login <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/personalDetailsRegistration">
                  Registration
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto my-2">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Education Details <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  User Details
                </a>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={onClickLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      {props.children}
    </div>
  );
}

export default Navbar;
