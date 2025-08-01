import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Contact.module.css";
import { useState } from "react";
import axios from "axios";
import authorImg from "../images/kaustubh profile img.jpg";

const Contact = () => {
  const url = "https://6887691e071f195ca980a325.mockapi.io/Contacts";
  const [contact, setContact] = useState({
    contEmail: "",
    contPhone: "",
    contComment: "",
  });

  const contInp = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContact = async () => {
    if (!contact.contEmail && !contact.contPhone && !contact.contComment) {
      return alert("Please fill Email or Phone number");
    }
    if (contact.contComment && !contact.contEmail && !contact.contPhone) {
      return alert("Please provide at least an Email or Phone number.");
    }
    try {
      await axios.post(url, contact);
      alert("Response Submitted");
      setContact({
        contEmail: "",
        contPhone: "",
        contComment: "",
      });
    } catch (error) {
      console.error("Error in contact: ", error);
      alert("Some error occured in sending the contact. Please try again.");
    }
  };
  return (
    <div className={styles.contactContainer}>
      <Header />
      <div className={`${styles.contactContent}`} data-aos="fade-up">
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5 shadow-lg rounded-4 ">
            <div className={`col-10 col-sm-8 col-lg-6 ${styles.imgDiv}`}>
              <img
                src={authorImg}
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
                data-aos="fade-up"
              />
            </div>
            <div className="col-lg-6">
              <h1
                className="display-5 fw-bold text-body-emphasis lh-1 mb-3"
                data-aos="fade-up"
              >
                Hi, I'm Kaustubh Dalvi
              </h1>
              <p className="lead" data-aos="fade-up">
                I'm a passionate Full Stack Web Developer currently learning the
                MERN stack. I have a background in Hospitality and professional
                experience at Mumbai Airport, and now I’m fully focused on
                building real-world web applications. I'm available for
                freelance projects, collaborations, or full-time roles.
              </p>
              <p className="lead" data-aos="fade-up">
                Feel free to reach out to me through the contact form or
                directly via the links below.
              </p>
              <ul className="list-unstyled">
                <li data-aos="fade-up">
                  📧
                  <a href="mailto:kaustubhdalvi1001@gmail.com">
                    kaustubhdalvi1002@gmail.com
                  </a>
                </li>
                <li data-aos="fade-up">
                  📞 <a href="tel:+918424882254">+91 84248 82254</a>
                </li>
                <li data-aos="fade-up">
                  💼
                  <a
                    href="https://www.linkedin.com/in/kaustubh-dalvi-0431662a8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </li>
                <li data-aos="fade-up">
                  💻
                  <a
                    href="https://github.com/Kaustubh-Dalvi1001"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container shadow-lg rounded-4 p-5" data-aos="fade-up">
          <form>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                data-aos="fade-up"
              >
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="contEmail"
                onChange={contInp}
                value={contact.contEmail}
                data-aos="fade-up"
              />
              <div id="emailHelp" className="form-text" data-aos="fade-up">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputNumber"
                className="form-label"
                data-aos="fade-up"
              >
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                name="contPhone"
                onChange={contInp}
                value={contact.contPhone}
                data-aos="fade-up"
              />
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Comments"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                name="contComment"
                onChange={contInp}
                value={contact.contComment}
                data-aos="fade-up"
              ></textarea>
              <label htmlFor="floatingTextarea2" data-aos="fade-up">
                Comments
              </label>
            </div>
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContact}
              data-aos="fade-up"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
