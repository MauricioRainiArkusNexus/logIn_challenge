import { USER_INFO_MOCK } from "../components/Login/LogIn.constants";
import { UserInfoProps } from "../types";

export const AuthService = {
  login: (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockEmail = USER_INFO_MOCK.get(UserInfoProps.email);
        const mockPassword = USER_INFO_MOCK.get(UserInfoProps.password);

        if (email === mockEmail && password === mockPassword) {
          sessionStorage.setItem("isAuth", "true");
          resolve(true);
        } else {
          reject("Authentication failed");
        }
      }, 2000);
    });
  },
  logout: () => {
    sessionStorage.removeItem("isAuth");
  },
};
