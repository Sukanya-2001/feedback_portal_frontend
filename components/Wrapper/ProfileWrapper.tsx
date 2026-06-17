"use client";

import { useProfileDetails } from "@/Functions/react-queries/auth.query";
import { setProfileData } from "@/redux-toolkit/slices/user.slice";
import { getCookieValue } from "@/util/common";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const ProfileWrapper = async () => {
  const dispatch = useDispatch();
  const accessToken = await getCookieValue(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
  );

  let profileData = null;

  if (accessToken) {
    profileData = useProfileDetails();
  }

  useEffect(() => {
    if (profileData?.isSuccess && profileData?.data) {
      
      dispatch(setProfileData(profileData?.data?.data));
    }
  }, [
    profileData?.isSuccess,
    profileData?.isError,
    profileData?.error,
    profileData?.data,
    dispatch,
  ]);

  return null;
};
