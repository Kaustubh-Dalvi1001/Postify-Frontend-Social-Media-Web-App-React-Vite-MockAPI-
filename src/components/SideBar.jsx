import { useContext, useEffect } from "react";
import styles from "../styles/SideBar.module.css";
import { PostifyContext } from "../store/Context";
import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
  const {
    isSidebarVisible,
    setIsSidebarVisible,
    userProfilePicture,
    userProfileImg,
  } = useContext(PostifyContext);

  const navLinkClick = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    userProfileImg();
  }, []);

  return (
    <div>
      <div
        className={`${styles.mainDiv} ${
          isSidebarVisible ? styles.mainDivActive : ""
        } d-flex flex-column flex-shrink-0 p-3 text-white bg-dark`}
      >
        <ul className="nav nav-pills flex-column ">
          <li className="nav-item">
            <Link
              to="/profile"
              className={`nav-link text-white ${
                isActive("/profile") ? "active" : ""
              }`}
              onClick={navLinkClick}
            >
              {userProfilePicture ? (
                <img
                  src={userProfilePicture}
                  alt="Profile Picture"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
              ) : (
                <i className="bi bi-person-circle mx-2"></i>
              )}
              <span>My Profile</span>
            </Link>
          </li>
        </ul>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/home"
              className={`nav-link text-white ${
                isActive("/home") ? "active" : ""
              }`}
              onClick={navLinkClick}
            >
              <i className="bi bi-house mx-2" style={{ fontSize: "20px" }} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className={`nav-link text-white  ${
                isActive("/create") ? "active" : ""
              }`}
              onClick={navLinkClick}
            >
              <i
                className="bi bi-plus-square mx-2"
                style={{ fontSize: "19px" }}
              ></i>
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link text-white  ${
                isActive("/about") ? "active" : ""
              }`}
              onClick={navLinkClick}
            >
              <i className="bi bi-app mx-2" style={{ fontSize: "20px" }}></i>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link text-white  ${
                isActive("/contact") ? "active" : ""
              }`}
              onClick={navLinkClick}
            >
              <i
                className="bi bi-person-lines-fill mx-2"
                style={{ fontSize: "20px" }}
              ></i>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
