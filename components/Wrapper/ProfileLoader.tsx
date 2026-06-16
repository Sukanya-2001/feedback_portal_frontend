"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileData } from "@/redux-toolkit/slices/user.slice";
import { useProfileDetails } from "@/Functions/react-queries/auth.query";

const ProfileLoader = () => {
  const dispatch = useDispatch();

  const profileData = useProfileDetails();

  useEffect(() => {
    if (profileData.isSuccess && profileData.data) {
      dispatch(setProfileData(profileData.data.data));
    }
  }, [profileData.isSuccess, profileData.data, dispatch]);

  return null;
};

export default ProfileLoader;
