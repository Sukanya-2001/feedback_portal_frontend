export const baseUrlApi = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;
export const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}`;

export const getImage = (value: string) => {
  return `${imageUrl}${value}`;
};

export const endpoints = {
  auth: {
    login: "auth/signin",
    signUp: "auth/signup",
    emailVerify: "auth/verify-email",
    forgotPassword: "auth/forgot-password",
    otpVerify: "auth/verify-otp",
    resetPassword: "auth/reset-password",
    changePassword: "change-password",
    profileDetails: "profile",
    profileUpdate: "",
  },
  projects: {
    List: "projects/getall",
    details: "projects",
    create: "projects/create",
    update: "projects",
    delete: "projects",
    allProjectList: "allProjects",
  },
  categories: {
    list: "categories/get",
  },
  feedback: {
    create: "feedbacks/create",
    list: "feedbacks/getall",
    update: "feedbacks/update",
    delete: "feedbacks",
    reply: "feedbacks/reply/update",
    feedbackSave: "feedbacks/save",
    allSavedFeedback: "savedFeedbacks"
  },
};
