import axios, { all } from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { PostifyContext } from "../store/Context";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Create.module.css";
import { useNavigate } from "react-router-dom";
import Aos from "aos";

const Create = () => {
  const { Data, setData } = useContext(PostifyContext);
  const postURL = "https://6888a7caadf0e59551bad853.mockapi.io/Posts";

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.07,
        maxWidthOrHeight: 1500,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setData({ ...Data, image: reader.result });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log("Image compression error:", error);
      }
    }
  };

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handlePost = async (e) => {
    e.preventDefault();
    if (Data.image === "" && Data.title === "" && Data.description === "") {
      return alert("Kindly fill a field");
    }

    const currentUser = JSON.parse(localStorage.getItem("userDetails"));
    const posterName = currentUser?.uName || "Guest";
    const postData = {
      ...Data,
      postedBy: posterName,
      likes: 0,
    };

    try {
      await axios.post(postURL, postData);
      alert("Post Successful");
      setData({
        image: "",
        title: "",
        description: "",
        postedBy: "",
        likes: 0,
      });
      fileInputRef.current.value = "";
      setImagePreview(null);
      navigate("/home");
    } catch (error) {
      console.error("Error Posting : ", error);
      alert("Something went wrong while posting");
    }
  };

  return (
    <div className={styles.createContainer}>
      <Header />
      <div className={styles.createContent}>
        <div
          className={`${styles.createCard} card shadow-lg rounded-4`}
          data-aos="fade-up"
        >
          <div className={styles.cardContent}>
            {imagePreview && (
              <img
                key={imagePreview}
                src={imagePreview}
                className={`card-img-top p-2 rounded-4`}
                data-aos="fade"
                alt="Preview"
              />
            )}
          </div>
          <form onSubmit={handlePost}>
            <input
              type="file"
              accept="image/*"
              className="form-control my-2"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <div className="card-body">
              <h5 className="card-title ">
                <input
                  type="text"
                  placeholder="Enter Post Title"
                  className="p-2 form-control"
                  onChange={(e) => setData({ ...Data, title: e.target.value })}
                  value={Data.title}
                />
              </h5>
              <p className="card-text">
                <textarea
                  cols={27}
                  placeholder="Enter Post Text"
                  className="p-2 form-control"
                  onChange={(e) =>
                    setData({ ...Data, description: e.target.value })
                  }
                  value={Data.description}
                ></textarea>
              </p>
              <button
                className="btn btn-primary form-control"
                data-aos="zoom-in"
              >
                <i className={`${styles.postLogo} bi bi-plus-square mx-2`}></i>
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Create;
