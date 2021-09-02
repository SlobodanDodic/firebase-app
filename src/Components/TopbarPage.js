import React, { useState } from "react";
import { LeftbarData } from "./Leftbar";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import logo from "../Assets/logo.png";
import avatarV from "../Assets/avatarV.png";

function TopbarPage() {
  const [leftbar, setLeftbar] = useState(false);
  const showLeftbar = () => setLeftbar(!leftbar);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="fixed-top">
      <div className="topbar">
        <a
          href="https://www.itengine.rs/"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-img"
        >
          <img alt="logo" src={logo} width="60" height="20" />
        </a>

        <Link to="#" className="menu-bars">
          <BsChevronDoubleRight
            style={{ color: "white", marginLeft: "-70px" }}
            onClick={showLeftbar}
          />
        </Link>

        {/* User info */}
        <span className="topbar-loggedUser">
          <img
            src={currentUser.photoURL ? currentUser.photoURL : avatarV}
            className="top-user-img"
            alt="id"
          />

          <div className="dropdown">
            <button
              className="btn btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: "white", fontSize: "12px" }}
            >
              {currentUser.displayName}
            </button>
            <div
              className="dropdown-menu text-center "
              aria-labelledby="dropdownMenu2"
            >
              <button
                className="dropdown-item"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
              <button className="dropdown-item" type="button">
                <Link
                  to="/update-profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Update Profile
                </Link>
              </button>
            </div>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
        </span>
      </div>

      <div className={leftbar ? "top-menu active" : "top-menu"}>
        <ul className="top-menu-items" onClick={showLeftbar}>
          <li className="topbar-toggle">
            <Link to="#" className="menu-bars">
              <BsChevronDoubleLeft style={{ color: "white" }} />
            </Link>
          </li>

          {/* User info */}
          <div className="leftbar-loggedUser">
            <h6>{currentUser.displayName}</h6>
            <p>{currentUser.email}</p>
            <img
              src={currentUser.photoURL ? currentUser.photoURL : avatarV}
              className="user-img"
              alt="id"
            />
          </div>

          {LeftbarData.map((item, index) => {
            return (
              <li key={index} className={item.classes}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TopbarPage;
