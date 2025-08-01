import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/MyPosts.module.css";

const MyPosts = () => {
  const postURL = "https://6888a7caadf0e59551bad853.mockapi.io/Posts";

  const userData = JSON.parse(localStorage.getItem("userDetails"));
  // My Posts
  const [myPosts, setMyPosts] = useState([]);
  const dispPosts = async () => {
    const response = await axios.get(postURL);
    const respData = response.data;
    const userPosts = respData.filter(
      // if you want to get multiple objects then you use filter method or you can use .find() method if you want only one object
      (item) => item.postedBy === userData.uName
    );
    setMyPosts(userPosts);
  };
  // console.log(myPosts);
  // by only adding this directly here it will return the old value which is an empty array, so to get the updated array we have to use the hook useEffect(() => {console.log(myPosts);},[myPosts] );

  // Likes
  const localStorageKey = `likedPosts_${userData.uName}`;
  const likedPosts = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // handle like
  const handleLike = async (eachPost) => {
    const isLiked = likedPosts.includes(eachPost.id);
    const updatedLikes = isLiked ? eachPost.likes - 1 : eachPost.likes + 1;
    try {
      // Update json-server
      const response = await axios.put(`${postURL}/${eachPost.id}`, {
        likes: updatedLikes,
      });

      // Update UI
      const updatedData = myPosts.map((item) =>
        item.id === eachPost.id ? { ...item, likes: updatedLikes } : item
      );

      setMyPosts(updatedData);

      // Update Local Storage
      let updatedLikedPosts;
      if (isLiked) {
        // unlike
        updatedLikedPosts = likedPosts.filter((id) => id !== eachPost.id);
      } else {
        // like
        updatedLikedPosts = [...likedPosts, eachPost.id];
      }
      localStorage.setItem(localStorageKey, JSON.stringify(updatedLikedPosts));
    } catch (error) {
      console.error("Error in Post Likes : ", error);
    }
  };

  // Edit Post
  const [impVal, setImpVal] = useState({
    postTitle: "",
    postDescription: "",
  });
  const [editPostId, setEditPostId] = useState(null);
  const handleEdit = async (postId) => {
    if (editPostId === postId) {
      setEditPostId(null);
    } else {
      setEditPostId(postId);
    }
    try {
      const response = await axios.get(postURL);
      const respData = response.data;
      const exactData = respData.find((item) => item.id === postId);
      setImpVal({
        ...impVal,
        postTitle: exactData.title,
        postDescription: exactData.description,
      });
    } catch (error) {
      console.error("Error in setting postVal: ", error);
    }
  };

  // handle Post Update
  const handlePostUpdate = async (eachPost) => {
    try {
      await axios.put(
        `${postURL}/${eachPost.id}`,
        { title: impVal.postTitle },
        { description: impVal.postDescription }
      );

      // Update UI ** You need to update the UI also after updating everything in the server **
      const updatedData = myPosts.map((item) =>
        item.id === eachPost.id
          ? {
              ...item,
              title: impVal.postTitle,
              description: impVal.postDescription,
            }
          : item
      );
      setMyPosts(updatedData);
      setEditPostId(null);
      alert("Post Updated!");
    } catch (error) {
      console.error("Error in Updating Post: ", error);
    }
  };

  // Delete Post
  const handleDelPost = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${postURL}/${postId}`);
        // Update UI
        setMyPosts(myPosts.filter((item) => item.id !== postId));
        alert("Post Successfully Deleted");
      } catch (error) {
        console.error("Error in deleting Post: ", error);
      }
    }
  };

  useEffect(() => {
    dispPosts();
  }, []);
  return (
    <div>
      <div data-aos="fade-up">
        <hr />
        <div className={styles.headerContainer}>
          <i className="display-4 text">My Posts</i>
        </div>
      </div>
      <div className={styles.postContainer}>
        {myPosts.map((eachPost) => {
          const isLiked = likedPosts.includes(eachPost.id);
          return (
            <div
              key={eachPost.id}
              className={`card shadow my-4 rounded-4 ${styles.postCard}`}
              data-aos="fade-up"
            >
              <img
                src={eachPost.image}
                className="card-img-top rounded-top-4"
                alt="Post Image"
              />
              <div className="card-body">
                {eachPost.id === editPostId ? (
                  <input
                    type="text"
                    className="form-control"
                    value={impVal.postTitle}
                    onChange={(e) =>
                      setImpVal({ ...impVal, postTitle: e.target.value })
                    }
                  ></input>
                ) : (
                  <h5 className="card-title">{eachPost.title}</h5>
                )}
                {eachPost.id === editPostId ? (
                  <textarea
                    className="form-control my-2"
                    value={impVal.postDescription}
                    onChange={(e) =>
                      setImpVal({
                        ...impVal,
                        postDescription: e.target.value,
                      })
                    }
                  ></textarea>
                ) : (
                  <p className="card-text">{eachPost.description}</p>
                )}
                <button
                  type="button"
                  className={`btn ${
                    isLiked ? "btn-success" : "btn-outline-primary"
                  }`}
                  onClick={() => handleLike(eachPost)}
                >
                  <i className={`bi bi-hand-thumbs-up`}></i>
                </button>
                <span className="mx-2">{eachPost.likes} likes</span>
                {eachPost.id === editPostId ? (
                  <button
                    className="btn btn-outline-success mx-2"
                    onClick={() => handlePostUpdate(eachPost)}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-success mx-2 shadow"
                    onClick={() => handleEdit(eachPost.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-outline-danger my-2 shadow"
                  onClick={() => handleDelPost(eachPost.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPosts;
