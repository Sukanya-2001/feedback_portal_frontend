export type UserSliceData = {
    isLoggedIn: boolean,
    userData: ProfileData | null
}

export type ProfileData = {
    _id: string;
    fullName: string;
    email: string;
    isVerified: boolean;
}