import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = () => {
  const RegistrationURL =
    "https://6888a7caadf0e59551bad853.mockapi.io/Registration";
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const handleLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevent default
    e.preventDefault();
    // Condition for empty input
    if (!loginData.loginEmail || !loginData.loginPassword) {
      return alert("Please fill both the fields");
    }
    // login email and password
    const email = loginData.loginEmail.trim().toLowerCase();
    const password = loginData.loginPassword.trim().toLowerCase();
    try {
      const response = await axios.get(RegistrationURL);
      const users = response.data;
      const loggedInUser = users.find(
        (user) => user.uEmail === email && user.uPassword === password
      );
      if (!loggedInUser) {
        return alert("Invalid Credentails");
      }
      // Store user data in localStorage
      localStorage.setItem("userDetails", JSON.stringify(loggedInUser));
      // Login success
      alert("Login successful");
      // navigate to home page
      navigate("/home");
    } catch (error) {
      console.error("Unexpected Error: ", error);
      alert("Something went wrong. Please try again");
    }
  };

  return (
    <div className={`bg-dark ${styles.pageLayout}`}>
      <main className="form-signin w-100 m-auto container">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={`${import.meta.env.BASE_URL}images/Postify_Logo_crop.png`}
              alt="Postify-logo"
              className={styles.postifyImg}
            />
          </div>
          <h1 className="h3 mb-3 fw-normal text-white my-4">Login : </h1>
          <div className="form-floating my-1">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="loginEmail"
              onChange={handleLogin}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-1">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="loginPassword"
              onChange={handleLogin}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Login
          </button>
          <p className="text-white mt-4">
            If you don't have an account please <Link to="/">Register</Link>
          </p>
          <p className="mt-4 mb-3 text-white">
            © 2025 Kaustubh Dalvi. All rights reserved.
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
