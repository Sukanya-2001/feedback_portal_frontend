import { BaseApiResponse } from "@/api/common/interface";

export interface LoginResponse extends BaseApiResponse {
  data: {
    userExist: { fullname: string; email: string; isVerified: boolean };
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
  data: UserData;
}

export interface UserData {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  isVerified: boolean;
}
