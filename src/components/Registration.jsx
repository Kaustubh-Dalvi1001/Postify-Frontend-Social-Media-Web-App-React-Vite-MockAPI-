import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Registration.module.css";

const Registration = () => {
  const RegistrationURL =
    "https://6888a7caadf0e59551bad853.mockapi.io/Registration";
  const [RegistratrionData, setRegistratrionData] = useState({
    uName: "",
    uEmail: "",
    uPassword: "",
  });

  const handleRegistration = (e) => {
    setRegistratrionData({
      ...RegistratrionData,
      [e.target.name]: e.target.value.trim().toLowerCase(),
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !RegistratrionData.uName ||
      !RegistratrionData.uEmail ||
      !RegistratrionData.uPassword
    ) {
      return alert("Kindly fill all the fields");
    }

    try {
      const response = await axios.get(RegistrationURL);
      const users = response.data;
      const existingUname = users.some(
        (user) => user.uName === RegistratrionData.uName
      );
      if (existingUname) {
        return alert("User Name Already Exists");
      }
      const existingEmail = users.some(
        (user) => user.uEmail === RegistratrionData.uEmail
      );
      if (existingEmail) {
        return alert("User Email Already exists");
      }

      await axios.post(RegistrationURL, RegistratrionData);
      alert("Registration Done");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error ", error);
      alert("Something went wrong. Please try again");
    }
  };

  return (
    <div className={`bg-dark ${styles.pageLayout}`}>
      <main className="form-signin w-100 m-auto container">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="images/Postify_Logo_crop.png"
              alt="Postify-logo"
              className={styles.postifyImg}
            />
          </div>
          <h1 className="h3 fw-normal text-white my-4">Registration : </h1>
          <div className="form-floating my-1">
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="User Name"
              name="uName"
              onChange={handleRegistration}
            />
            <label htmlFor="userName">User Name</label>
          </div>
          <div className="form-floating my-1">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="uEmail"
              onChange={handleRegistration}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-1">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="uPassword"
              onChange={handleRegistration}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Register
          </button>
          <p className="text-white mt-4">
            If you already have an account please <Link to="/login">Login</Link>
          </p>
          <p className="mt-4 mb-3 text-white">
            © 2025 Kaustubh Dalvi. All rights reserved.
          </p>
        </form>
      </main>
    </div>
  );
};

export default Registration;
