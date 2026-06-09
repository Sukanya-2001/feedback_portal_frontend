import { createSlice } from "@reduxjs/toolkit";
import { ProfileData, UserSliceData } from "../interface/interface";

const initialState: UserSliceData = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setProfileData: (state, { payload }: { payload: ProfileData | null }) => {
      ((state.userData = payload), (state.isLoggedIn = true));
    },
    setLogout: (state) => {
      ((state.isLoggedIn = false), (state.userData = null));
    },
  },
});

export const {setProfileData, setLogout} = userSlice.actions;

export default userSlice.reducer;