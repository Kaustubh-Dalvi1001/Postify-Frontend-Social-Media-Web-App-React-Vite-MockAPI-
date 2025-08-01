import Footer from "./Footer";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={`${styles.aboutContent}`} data-aos="fade-up">
        <div className="container col-xxl-8 px-4 py-5" data-aos="fade-up">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5 shadow-lg rounded-4 ">
            <div className={`col-10 col-sm-8 col-lg-6 ${styles.imgDiv}`}>
              <img
                src="../images/Postify_Logo.png"
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
                Welcome to Postify
              </h1>
              <h2 data-aos="fade-up">
                Your Space to Share, Explore, and Connect
              </h2>
              <p className="lead" data-aos="fade-up">
                Postify is a responsive, user-friendly social blogging platform
                built with the MERN stack. Whether you're looking to express
                yourself, discover content from others, or simply explore a
                clean and intuitive UI — Postify delivers a seamless experience.
                Every page is thoughtfully crafted to give users speed, clarity,
                and ease of navigation across devices.
              </p>
            </div>
          </div>
        </div>
        <div
          className="px-4 py-5 my-5 text-center border-bottom container shadow-lg rounded-4"
          data-aos="fade-up"
        >
          <h1
            className="display-4 fw-bold text-body-emphasis"
            data-aos="fade-up"
          >
            Registration Page
          </h1>
          <h2 data-aos="fade-up">Start Your Journey with a Simple Sign Up</h2>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4" data-aos="fade-up">
              Creating your Postify account is just a few clicks away. The
              registration page is built with smooth validations and secure form
              handling to make onboarding easy for everyone. Responsive design
              ensures it looks perfect on all screens — from mobiles to
              desktops.
            </p>
          </div>
          <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
            <div className="container px-5">
              <img
                src="images/Postify_Registration_ss.png"
                className="img-fluid border rounded-3 shadow-lg mb-4"
                alt="Example image"
                width="700"
                height="500"
                loading="lazy"
                data-aos="fade-up"
              />
            </div>
          </div>
        </div>
        <div className="container my-5 py-5" data-aos="fade-up">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-4 border shadow-lg">
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
              <h1
                className="display-4 fw-bold lh-1 text-body-emphasis"
                data-aos="fade-up"
              >
                Login Page
              </h1>
              <h2 data-aos="fade-up">Secure & Streamlined Access</h2>
              <p className="lead" data-aos="fade-up">
                Our login page offers quick and secure access to your account
                using optimized backend authentication. With responsive design
                and intuitive layout, you're just one step away from exploring
                the world of Postify again.
              </p>
            </div>
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img
                className="rounded-lg-3"
                src="images/Postify_Login_ss.png"
                alt=""
                width="720"
                data-aos="fade-up"
              />
            </div>
          </div>
        </div>
        <div className="container col-xxl-8 px-4 py-5" data-aos="fade-up">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5 shadow-lg rounded-4">
            <div className="col-lg-6">
              <h1
                className="display-5 fw-bold text-body-emphasis lh-1 mb-3"
                data-aos="fade-up"
              >
                Home Page
              </h1>
              <h2 data-aos="fade-up">Explore, Engage, and Stay Connected</h2>
              <p className="lead" data-aos="fade-up">
                The Home page is the heart of Postify — where users can browse
                all posts shared by the community. You can like posts to show
                appreciation and delete your own content with ease. The layout
                is clean, responsive, and optimized for fast loading and easy
                interaction across all devices. It brings everyone together in
                one space to share and discover.
              </p>
            </div>
            <div className={`col-10 col-sm-8 col-lg-6 ${styles.imgDiv}`}>
              <img
                src="images/Home_page_ss.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
                data-aos="fade-up"
              />
            </div>
          </div>
        </div>
        <div
          className="px-4 py-5 my-5 text-center border-bottom container shadow-lg rounded-4"
          data-aos="fade-up"
        >
          <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
            <div className="container px-5">
              <img
                src="images/Postify_create_ss.png"
                className="img-fluid border rounded-3 shadow-lg mb-4"
                alt="Example image"
                width="700"
                height="500"
                loading="lazy"
                data-aos="fade-up"
              />
            </div>
          </div>
          <h1
            className="display-4 fw-bold text-body-emphasis"
            data-aos="fade-up"
          >
            Create Post Page
          </h1>
          <h2 data-aos="fade-up">Share Your Thoughts Effortlessly</h2>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4" data-aos="fade-up">
              The create post page is where your voice comes alive. With image
              upload support, rich text input, and intuitive UI elements, this
              page helps you express more with less effort. All data is stored
              persistently through our mock backend.
            </p>
          </div>
        </div>
        <div className="container my-5 py-5" data-aos="fade-up">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-4 border shadow-lg">
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img
                className="rounded-lg-3"
                src="images/Postify_about_ss.png"
                alt="About_image"
                width="720"
                data-aos="fade-up"
              />
            </div>
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-1">
              <h1
                className="display-4 fw-bold lh-1 text-body-emphasis"
                data-aos="fade-up"
              >
                About Page
              </h1>
              <h2 data-aos="fade-up">Behind the Scenes of Postify</h2>
              <p className="lead" data-aos="fade-up">
                This page highlights the essence and technical journey of
                building Postify. From conceptualization to UI/UX, every detail
                was thoughtfully structured. Built with React, React Router,
                Context API, and integrated with MockAPI for a backend-like
                experience.
              </p>
            </div>
          </div>
        </div>
        <div className="container col-xxl-8 px-4 py-5" data-aos="fade-up">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5 shadow-lg rounded-4 ">
            <div className={`col-10 col-sm-8 col-lg-6 ${styles.imgDiv}`}>
              <img
                src="images/Postify_contact_ss.png"
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
                Contact Page
              </h1>
              <h2 data-aos="fade-up"> We’re Here to Hear You</h2>
              <p className="lead" data-aos="fade-up">
                Whether you have feedback or just want to connect, our contact
                page is always open. With form validation and a clean layout,
                users can easily send messages. It's fully responsive and
                includes smooth animation to enhance user engagement.
              </p>
            </div>
          </div>
        </div>
        <div
          className="px-4 py-5 my-5 text-center border-bottom container shadow-lg rounded-4"
          data-aos="fade-up"
        >
          <h1
            className="display-4 fw-bold text-body-emphasis"
            data-aos="fade-up"
          >
            Profile Page
          </h1>
          <h2 data-aos="fade-up">Your Personal Dashboard</h2>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4" data-aos="fade-up">
              The profile page puts your content in one place. Update details,
              and manage your presence on Postify. Designed for clarity and
              ease, it ensures users stay in control of their account
              effortlessly.
            </p>
          </div>
          <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
            <div className="container px-5">
              <img
                src="images/Postify_Profile_ss.png"
                className="img-fluid border rounded-3 shadow-lg mb-4"
                alt="Example image"
                width="700"
                height="500"
                loading="lazy"
                data-aos="fade-up"
              />
            </div>
          </div>
        </div>
        <div
          className="px-4 py-5 my-5 text-center container shadow-lg rounded-4 bg-dark text-white"
          data-aos="fade-up"
        >
          <h1 className="display-5 fw-bold text-secondary" data-aos="fade-up">
            Tech Stack & Credits
          </h1>
          <h2 data-aos="fade-up">Built with Passion & MERN</h2>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4" data-aos="fade-up">
              Postify is developed using React.js, React Router, Bootstrap,
              MockAPI, and modern CSS modules. It’s a full-stack inspired
              frontend project aimed at mastering component structure, state
              management, and responsive design. Every line of code reflects a
              step in the learning journey.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
