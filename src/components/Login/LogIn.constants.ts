import LogInImage from "../../assets/LoginImage.jpg";
import InfoButton from "../../assets/info-icon.svg";
import appStore from "../../assets/app-store.svg";
import playStore from "../../assets/google-play.svg";
import PetCloudLogo from "../../assets/petcloud-logo.svg";
import emailIcon from "../../assets/mail.e.svg";
import QRDownloadImage from "../../assets/petcloud-qr-code.svg";
import { LogInAssetsProps, LoginErrorProps, UserInfoProps } from "../../types";

export const USER_INFO_MOCK = new Map<UserInfoProps, string>([
  [UserInfoProps.email, "test@user.com"],
  [UserInfoProps.password, "password"],
]);

export const LOG_IN_ASSETS = new Map<LogInAssetsProps, string>([
  [LogInAssetsProps.LogInImage, LogInImage],
  [LogInAssetsProps.InfoButton, InfoButton],
  [LogInAssetsProps.appStore, appStore],
  [LogInAssetsProps.playStore, playStore],
  [LogInAssetsProps.PetCloudLogo, PetCloudLogo],
  [LogInAssetsProps.emailIcon, emailIcon],
  [LogInAssetsProps.QRDownloadImage, QRDownloadImage],
]);

export const LOG_IN_ERROR = new Map<LoginErrorProps, string>([
  [LoginErrorProps.emailFormat, "Incorrect Email Format"],
  [LoginErrorProps.incorrectPassword, "Incorrect Email or Password"],
]);
