export type UserSliceData = {
    isLoggedIn: boolean,
    userData: ProfileData | null
}

export type ProfileData = {
    fullname: string;
    email: string;
    isVerified: boolean;
}