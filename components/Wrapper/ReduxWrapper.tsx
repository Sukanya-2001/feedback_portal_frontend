"use client";

import { Provider } from "react-redux";
import store from "@/redux-toolkit/store/store";
import ProfileLoader from "./ProfileLoader";

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      <ProfileLoader />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
