import { useContext, useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { PostifyContext } from "../store/Context";
const Header = () => {
  const { barBtn } = useContext(PostifyContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Profile Image
  const { userProfilePicture, userProfileImg } = useContext(PostifyContext);
  useEffect(() => {
    userProfileImg();
  }, []);
  return (
    <div>
      <div>
        <header
          className={`${styles.mainDiv} d-flex flex-wrap justify-content-center py-3 mb-4`}
        >
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
            <button
              className={`${styles.bars} btn btn-secondary btn-sm mx-2`}
              onClick={barBtn}
            >
              <i className="bi bi-list"></i>
            </button>
            <Link to={"/home"}>
              <img
                src="images/Postify_crop.PNG"
                width={25}
                alt="Postify logo"
                className="mx-2"
              />
            </Link>
            <span className="fs-4 text-white">Postify</span>
          </div>
          <ul className={`${styles.navList} nav nav-pills`}>
            <li className="nav-item">
              <Link
                to="/home"
                className={`nav-link text-white ${
                  isActive("/home") ? "active" : ""
                }`}
                aria-current="page"
              >
                <i className="bi bi-house mx-2" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/create"
                className={`nav-link text-white ${
                  isActive("/create") ? "active" : ""
                }`}
              >
                <i className="bi bi-plus-square mx-2"></i>
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link text-white ${
                  isActive("/about") ? "active" : ""
                }`}
              >
                <i className="bi bi-app mx-2"></i>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link text-white ${
                  isActive("/contact") ? "active" : ""
                }`}
              >
                <i className="bi bi-person-lines-fill mx-2"></i>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className={`nav-link text-white ${
                  isActive("/profile") ? "active" : ""
                }`}
              >
                {userProfilePicture ? (
                  <img
                    src={userProfilePicture}
                    alt="mdo"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                ) : (
                  <i className="bi bi-person-circle mx-2"></i>
                )}
              </Link>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
};

export default Header;
