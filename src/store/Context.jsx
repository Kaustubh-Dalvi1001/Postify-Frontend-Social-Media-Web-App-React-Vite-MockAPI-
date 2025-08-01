import axios from "axios";
import { createContext, useState } from "react";

export const PostifyContext = createContext({
  barBtn: () => {},
  isSidebarVisible: false,
  setIsSidebarVisible: () => {},
  Data: {
    image: "",
    title: "",
    description: "",
    postedBy: "",
    likes: 0,
  },
  setData: () => {},
  userProfilePicture: "",
  setUserProfilePicture: () => {},
  userProfileImg: () => {},
});

const ContextProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [Data, setData] = useState({
    image: "",
    title: "",
    description: "",
    postedBy: "",
    likes: 0,
  });

  const barBtn = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // Profile Image
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const profileImgURL =
    "https://6887691e071f195ca980a325.mockapi.io/ProfileImg";
  const userProfileImg = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("userDetails"));
      if (!currentUser) return;
      const response = await axios.get(profileImgURL);
      const respData = response.data;
      const existingImg = respData.find(
        (item) => item.customId === currentUser.id
      );
      const userImg = existingImg ? existingImg.imgData : "";
      setUserProfilePicture(userImg);
    } catch (error) {
      console.error("Error in fetching profile image: ", error);
    }
  };

  return (
    <PostifyContext.Provider
      value={{
        barBtn,
        isSidebarVisible,
        setIsSidebarVisible,
        Data,
        setData,
        userProfilePicture,
        setUserProfilePicture,
        userProfileImg,
      }}
    >
      {children}
    </PostifyContext.Provider>
  );
};

export default ContextProvider;
