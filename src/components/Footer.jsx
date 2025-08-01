import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to={"/home"}>
            <img
              src="images/Postify_crop.PNG"
              alt="Postify Icon"
              className={`mx-2 ${styles.postifyImg}`}
            />
          </Link>
          <span
            className={`mb-md-0 text-body-secondary ${styles.allRights}`}
          >
            © 2025 Kaustubh Dalvi. All rights reserved.
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-2">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://github.com/Kaustubh-Dalvi1001"
              aria-label="Github"
              target="_blank"
            >
              <i className={`bi bi-github ${styles.icon}`}></i>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              // href="www.linkedin.com/in/kaustubh-dalvi-0431662a8/"
              // A major difference and observation here is that when you past the external link like linkedin etc without https the brwoser treats it as a relative path i.e like a route inside your app. Hence, when you click it, your app thinks it's page inside postify. That route dosent exists, so it redirects to your apps 404 or home depending on how routing is handled. Hence, you must always write https for external links.

              href="https://www.linkedin.com/in/kaustubh-dalvi-0431662a8/"
              aria-label="Linkedin"
              target="_blank"
            >
              <i className={`bi bi-linkedin ${styles.icon}`}></i>
            </a>
          </li>
          <li className="ms-3">
            <i
              className={`bi bi-arrow-up-circle ${styles.upArrow}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            ></i>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
