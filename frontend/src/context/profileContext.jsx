import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import axios from "axios";
const ProfileContext = createContext();
import { useLocation } from "react-router-dom";

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState(null); 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "https://ally-chat-express-app.onrender.com/api/user/profile",
          { authtoken: token }, // Payload with the token
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content type
            },
          }
        );
        // console.log(response.data);
        setUserDetails(response.data);
        
      } catch (error) {
        // console.log("Error fetching user details in profile", error);
      }
    };

    fetchUserDetails();
  }, [isAuthenticated]);

  return (
    <ProfileContext.Provider value={{ isAuthenticated, userDetails }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};