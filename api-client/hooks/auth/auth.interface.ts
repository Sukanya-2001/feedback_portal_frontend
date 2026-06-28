import { BaseApiResponse } from "@/api/common/interface";
import { ProfileData } from "@/redux-toolkit/interface/interface";

export interface LoginResponse extends BaseApiResponse {
  data: {
    userExist: ProfileData;
    accessToken: string;
    refreshToken: string;
  };
}

export interface SignUpResponse extends BaseApiResponse {
  data: {
    fullname: string;
    email: string;
  };
}

export interface ProfileDetailsResponse extends BaseApiResponse {
  data: ProfileData;
}

export interface UserData {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  isVerified: boolean;
}
