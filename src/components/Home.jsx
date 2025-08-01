import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import { PostifyContext } from "../store/Context";

const Home = () => {
  const RegistrationURL =
    "https://6888a7caadf0e59551bad853.mockapi.io/Registration";

  const postURL = "https://6888a7caadf0e59551bad853.mockapi.io/Posts";

  const [everyData, setEveryData] = useState([]);
  // as we are using a vertical column layout (flex-direction: column) for .homeContent, it will show the older post first by order, to show the latest post first we reverse the array and map the reversed array so that the latest post will appear first. We do it by the following :
  const latestPosts = [...everyData].reverse();
  const userPoster = JSON.parse(localStorage.getItem("userDetails"));
  const posterName = userPoster?.uName;

  // key to identify liked posts for this user
  const localStorageKey = `likedPosts_${posterName}`;
  const likedPosts = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(postURL);
        setEveryData(response.data);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };
    fetchPost();
    myData();
  }, []);

  const handleDelete = async (dataId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${postURL}/${dataId}`).then(() => {
          setEveryData(everyData.filter((itemData) => itemData.id !== dataId));
        });
        alert("Post Deleted Successfully");
      } catch (error) {
        console.log("Error in deleting data:", error);
      }
    }
  };

  const handleLike = async (eachData) => {
    const isLiked = likedPosts.includes(eachData.id);
    const updatedLikes = isLiked ? eachData.likes - 1 : eachData.likes + 1;
    try {
      await axios.put(`${postURL}/${eachData.id}`, { likes: updatedLikes });

      //Update UI
      const updatedData = everyData.map((item) =>
        item.id === eachData.id ? { ...item, likes: updatedLikes } : item
      );
      setEveryData(updatedData);

      // Update LocalStorage
      let updatedLikedPosts;
      if (isLiked) {
        // Unlike
        updatedLikedPosts = likedPosts.filter((id) => id !== eachData.id);
      } else {
        // Like
        updatedLikedPosts = [...likedPosts, eachData.id];
      }

      localStorage.setItem(localStorageKey, JSON.stringify(updatedLikedPosts));
    } catch (error) {
      console.error("like error : ", error);
    }
  };

  // Personal Data
  const [personalData, setPersonalData] = useState("");
  const myData = async () => {
    try {
      const User = await axios.get(RegistrationURL);
      const userData = User.data;
      const exactUser = userData.find((item) => item.uName === posterName);
      setPersonalData(exactUser);
    } catch (error) {
      console.error("Error in getting User Data: ", error);
    }
  };

  const { userProfilePicture } = useContext(PostifyContext);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.leftSidebar} data-aos="fade-up">
          <div className={`card shadow rounded-4`}>
            {userProfilePicture ? (
              <div className={styles.imgDiv}>
                <img
                  src={userProfilePicture}
                  alt="mdo"
                  width="200"
                  height="200"
                  className="rounded-circle my-2"
                />
              </div>
            ) : (
              <i className={`bi bi-person-circle my-2 ${styles.imgIcon}`}></i>
            )}
            <div className="card-body">
              <h5 className="card-title">{personalData.uName}</h5>
              <Link to="/profile">
                <button className="btn btn-outline-primary form-control">
                  Go To My Profile
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.homeContent}>
          {latestPosts.map((eachData, index) => {
            const isLiked = likedPosts.includes(eachData.id);
            return (
              <div
                key={index}
                className={`${styles.card} card shadow rounded-4`}
                data-aos="fade-up"
                style={{ width: "80vmin" }}
              >
                {eachData.image && (
                  <img
                    src={eachData.image}
                    className="card-img-top rounded-top-4"
                    alt="Post Image"
                    data-aos="fade"
                  />
                )}
                <div className="card-body">
                  <b>
                    Posted by <i> {eachData.postedBy} </i>
                  </b>
                  {eachData.title && (
                    <h5 className="card-title">{eachData.title}</h5>
                  )}
                  {eachData.description && (
                    <p className={`card-text ${styles.truncateDescription}`}>
                      {eachData.description}
                    </p>
                  )}
                  <button
                    className={`btn ${
                      isLiked ? "btn-success" : "btn-outline-primary"
                    }`}
                    onClick={() => handleLike(eachData)}
                  >
                    <i
                      className={`bi bi-hand-thumbs-up${
                        isLiked ? "-fill" : ""
                      }`}
                    ></i>
                  </button>
                  <span className="mx-2">{eachData.likes} likes</span>
                  {eachData.postedBy === posterName ? (
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div data-aos="fade-up">
          <div className={`card shadow rounded-4 ${styles.rightSidebar}`}>
            <div className="card-body">
              <h5 className="card-title">Postify News</h5>
              <p className="card-text text-secondary">Top Stories</p>
              <button className="btn btn-outline-primary form-control">
                View Story
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
