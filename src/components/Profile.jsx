import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { PostifyContext } from "../store/Context";
import MyPosts from "./MyPosts";

const Profile = () => {
  const RegistrationURL =
    "https://6888a7caadf0e59551bad853.mockapi.io/Registration";

  const profileImgURL =
    "https://6887691e071f195ca980a325.mockapi.io/ProfileImg";

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  const navigate = useNavigate();

  //Logout Btn
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userDetails");
      navigate("/login");
    }
  };

  // ** Most importantly, to delete a specific user in MockAPI, you must use the user’s unique ID in the URL. **
  // ** .filter() always returns an array, even if there's only one match. Use .find() instead of .filter() to get the single object directly. **

  // Del Acc Btn
  const handleDeleteAcc = async () => {
    if (confirm("Are you sure you want to delete the account?")) {
      try {
        // fetch profile photo
        const photoDetails = await axios.get(profileImgURL);
        const photoData = photoDetails.data;
        const myPhoto = photoData.find((item) => item.customId === userData.id);
        // delete user's profile photo
        if (myPhoto) {
          await axios.delete(`${profileImgURL}/${myPhoto.id}`);
        }

        //delete account details
        await axios.delete(`${RegistrationURL}/${userData.id}`);

        // delete account details from locatlstorage
        localStorage.removeItem("userDetails");

        // delete like details
        localStorage.removeItem(`likedPosts_${userData.uName}`);

        // go to registration page
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("Some error occurred in deleting data.");
      }
    }
  };

  const [updatedVal, setUpdatedVal] = useState({
    upUname: "",
    upUpass: "",
  });

  const [dispInp, setDispInp] = useState(false);

  // Handle Update Btn
  const handleUpdate = () => {
    setUpdatedVal({
      upUname: userData.uName,
      upUpass: userData.uPassword,
    });
    setDispInp((prev) => !prev);
  };

  // ** Difference between find and some :- some only returs true/false if it passes the condition whereas, find returns the whole object if it passes the condition. **

  // Update Data btn
  const updateData = async () => {
    try {
      const response = await axios.get(RegistrationURL);
      const responseData = response.data;
      const existingData = responseData.some(
        (item) =>
          item.uName === updatedVal.upUname &&
          item.uPassword === updatedVal.upUpass
      );
      if (existingData) {
        console.log(existingData);
        return alert("User Name Already Exists");
      } else {
        const dataId = responseData.find((item) => item.id === userData.id);
        if (dataId) {
          const newData = {
            ...dataId,
            uName: updatedVal.upUname,
            uPassword: updatedVal.upUpass,
          };
          await axios.put(`${RegistrationURL}/${userData.id}`, newData);

          const localUser = JSON.parse(localStorage.getItem("userDetails"));
          localUser.uName = updatedVal.upUname;
          localUser.uPassword = updatedVal.upUpass;
          console.log(localUser);
          localStorage.setItem("userDetails", JSON.stringify(localUser));
          setUserData(JSON.parse(localStorage.getItem("userDetails")));
          setDispInp(false);
          alert("Data Updated");
        }
      }
    } catch (error) {
      console.error("Update Error: ", error);
      alert("Some error occured in updating the data. Please try again.");
    }
  };

  // cancel update
  const cancelUpdate = () => {
    setDispInp(false);
  };

  // All Profile image code from here
  const [displayPictureInp, setDisplayPictureInp] = useState(false);
  //handle Profile Picture
  const handleProfilePicture = () => {
    setDisplayPictureInp((prev) => !prev);
  };

  // Cancel Picture
  const cancelPicture = () => {
    setDisplayPictureInp(false);
  };

  const [profileImg, setProfileImg] = useState({
    customId: 0, // so we are using customId here instead of actual id because mockApi.io dosent allow us to modify it's id
    imgData: "",
  });

  const [imgPrev, setImgPrev] = useState(null);

  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedImage = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgPrev(reader.result);
          setProfileImg({ ...profileImg, imgData: reader.result });
        };
        reader.readAsDataURL(compressedImage);
      } catch (error) {
        console.error("Error in image compression: ", error);
      }
    }
  };

  const updatePicture = async () => {
    // setProfileImg({ ...profileImg, id: userData.id });
    // console.log(profileImg.id);
    // In the upper code it will log 0 because ** state updates in React (via useState) are asynchronous .** to solve this problem, Instead of logging profileImg.id after the update, store the updated value in a temporary variable and log the value directly:
    const updatedProImgVal = { ...profileImg, customId: userData.id };
    setProfileImg(updatedProImgVal);
    if (updatedProImgVal.imgData === "") {
      return alert("Kindly choose an image");
    }
    // Posting image in server
    try {
      const response = await axios.get(profileImgURL);
      const responseData = response.data;
      const existingData = responseData.find(
        (item) => item.customId === userData.id
      );
      if (existingData) {
        // await axios.patch(`${profileImgURL}/${userData.id}`, {
        //   imgData: updatedProImgVal.imgData,
        // });
        // Before sending your PATCH request, the browser sends a CORS preflight request (an HTTP OPTIONS request) to check if the API allows it.
        // But MockAPI.io, in many cases, does not allow the PATCH method by default — or doesn't handle preflight properly for it. Hence we use PUT method instead of PATCH method.

        await axios.put(`${profileImgURL}/${existingData.id}`, {
          customId: userData.id,
          imgData: updatedProImgVal.imgData,
        });
        // the summary here is, because we cannot modify the default id we are making a custom id then saving the custom id then we are retriving the object on the basis of customId and then we are using the actual id of that object to madify the data of that object.
      } else {
        await axios.post(profileImgURL, {
          customId: userData.id,
          imgData: updatedProImgVal.imgData,
        });
      }
      userProfileImg();
      alert("Profile Picture Updated");
      setDisplayPictureInp(false);
    } catch (error) {
      console.error("Error in updating profile image in server: ", error);
    }
  };

  // Update image from context
  const { userProfilePicture, userProfileImg, setUserProfilePicture } =
    useContext(PostifyContext);

  useEffect(() => {
    userProfileImg();
  }, []);

  useEffect(() => {
    setImgPrev(userProfilePicture);
  }, [userProfilePicture]);

  // Delete Profile Image code
  const delImg = async () => {
    if (confirm("Do you really want to delete the profile picture?")) {
      try {
        const existingImages = await axios.get(profileImgURL);
        const imageData = existingImages.data;
        const myImg = imageData.find((item) => item.customId === userData.id);
        await axios.delete(`${profileImgURL}/${myImg.id}`);
        setImgPrev(null);
        setUserProfilePicture("");
        setDisplayPictureInp(false);
      } catch (error) {
        console.error("Error in deletion of profile picture: ", error);
      }
      alert("Profile Picture Deleted");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <Header />
      <div className={styles.profileContent}>
        <div
          className={`card ${styles.cardFixedWidth} shadow rounded-4`}
          data-aos="fade-up"
        >
          {userProfilePicture && (
            <div className={styles.profileCardImg}>
              <img
                src={userProfilePicture}
                className={`card-img-top rounded-4 p-2`}
                alt="Profile Image"
                key={userProfilePicture}
                data-aos="zoom-in"
              />
            </div>
          )}
          <div className="card-body">
            <h5 className="card-title" data-aos="fade-up">
              User Name : {userData.uName}
            </h5>
            <p className="card-text" data-aos="fade-up">
              User Email : {userData.uEmail}
            </p>
            <p className="card-text" data-aos="fade-up">
              User Password : {userData.uPassword}
            </p>
            <button
              className="btn btn-info shadow"
              onClick={handleUpdate}
              data-aos="zoom-in"
            >
              Update User Details
            </button>
            <button
              className="btn btn-primary mx-2 shadow"
              onClick={handleProfilePicture}
              data-aos="zoom-in"
            >
              Update Profile Picture
            </button>
            <button
              className="btn btn-warning mx-2 shadow"
              onClick={handleLogout}
              data-aos="zoom-in"
            >
              Log-out
            </button>
            <button
              className="btn btn-outline-danger my-2 shadow"
              onClick={handleDeleteAcc}
              data-aos="zoom-in"
            >
              Delete Account
            </button>
          </div>
        </div>
        {dispInp === true && (
          <div
            className={`card text-center ${styles.updateCard} shadow rounded-4`}
            data-aos="zoom-in"
          >
            <div className="card-body">
              <p className="card-title">
                <label htmlFor="upUser">Change User Name</label>
                <input
                  type="text"
                  value={updatedVal.upUname}
                  className="form-control"
                  id="upUser"
                  onChange={(e) =>
                    setUpdatedVal({ ...updatedVal, upUname: e.target.value })
                  }
                />
              </p>
              <label htmlFor="upPass">Change Password</label>
              <input
                type="text"
                value={updatedVal.upUpass}
                className="form-control"
                id="upPass"
                onChange={(e) =>
                  setUpdatedVal({ ...updatedVal, upUpass: e.target.value })
                }
              />
              <button
                className="btn btn-outline-success my-2 shadow"
                onClick={updateData}
              >
                Update
              </button>
              <button
                className="btn btn-secondary m-2 shadow"
                onClick={cancelUpdate}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {displayPictureInp === true && (
          <div
            className={`${styles.profileCard} card shadow rounded-4`}
            data-aos="zoom-in"
          >
            {imgPrev && (
              <div className={styles.profileCardImg}>
                <img
                  key={imgPrev}
                  src={imgPrev}
                  className={`card-img-top p-2 rounded-4`}
                  alt="profile image prev"
                  data-aos="zoom-in"
                />
              </div>
            )}
            <div className="card-body">
              <p className="card-title">Update Profile Picture</p>
              <input type="file" onChange={handleImgChange} className="form-control" />
              <button
                className="btn btn-outline-success shadow"
                onClick={updatePicture}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger m-2 shadow"
                onClick={delImg}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary shadow"
                onClick={cancelPicture}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <MyPosts />
      <Footer />
    </div>
  );
};

export default Profile;
