import React, { useState } from "react";
import { appRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../store/slices/authSlice";
import "./Login.styles.css";
import { LOG_IN_ASSETS, LOG_IN_ERROR } from "./LogIn.constants";
import { LogInAssetsProps, LoginErrorProps } from "../../types";

export const Login = () => {
  //#region stateManagement
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isPasswordTextFieldOpen, setIsPasswordTextFieldOpen] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isInputMissingField = email.trim() === "" || password.trim() === "";
  const buttonDisabled =
    (isPasswordTextFieldOpen && emailError) ||
    (isPasswordTextFieldOpen && isInputMissingField) ||
    (isPasswordTextFieldOpen && passwordError) ||
    isLoading;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //#endregion stateManagement

  //#region handlers
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError || isPasswordTextFieldOpen) {
      handleVerifyEmail();
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    passwordError && setPasswordError(false);
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleVerifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    !isPasswordTextFieldOpen && setIsPasswordTextFieldOpen(true);
  };

  const handleHidPasswordTextField = () => {
    setIsPasswordTextFieldOpen(false);
    setPassword("");
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    handleVerifyEmail();
    try {
      await AuthService.login(email, password);
      dispatch(setIsAuthenticated(true));
      navigate(appRoutes.main);
    } catch (error) {
      setPasswordError(true);
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectUser = (route: string) => {
    window.location.href = appRoutes[route];
  };
  //#endregion handlers

  return (
    <>
      <Box className="main-container">
        <img
          src={LOG_IN_ASSETS.get(LogInAssetsProps.LogInImage)}
          className="login-image"
        />
        <img
          src={LOG_IN_ASSETS.get(LogInAssetsProps.PetCloudLogo)}
          className="pet-cloud-logo"
        />

        <Box className="actions-container">
          <Card className="login-actions">
            <Typography className="header-sign-in">Sign In</Typography>
            <Typography className="text-log-in">
              From insurance to play dates and everything in between, the Pet
              Cloud makes pet parenting a breeze
            </Typography>
            <TextField
              label="EMAIL"
              variant="standard"
              type="email"
              className="text-field-email"
              value={email}
              error={emailError}
              helperText={
                emailError && LOG_IN_ERROR.get(LoginErrorProps.emailFormat)
              }
              onChange={handleEmailChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      src={LOG_IN_ASSETS.get(LogInAssetsProps.InfoButton)}
                      className="add-info"
                    />
                  </InputAdornment>
                ),
              }}
            />

            {isPasswordTextFieldOpen && (
              <TextField
                label="password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                className="text-field-password"
                value={password}
                error={passwordError}
                helperText={
                  passwordError &&
                  LOG_IN_ERROR.get(LoginErrorProps.incorrectPassword)
                }
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <Button
              disabled={buttonDisabled}
              className={
                buttonDisabled ? "sign-in-button-disabled" : "sign-in-button"
              }
              onClick={
                isPasswordTextFieldOpen ? handleSignIn : handleVerifyEmail
              }
            >
              {isPasswordTextFieldOpen ? "Sign In" : "Next"}
            </Button>

            {isPasswordTextFieldOpen && (
              <Button
                className="back-button"
                onClick={handleHidPasswordTextField}
              >
                Back
              </Button>
            )}

            {isLoading && <Box className="spinner" />}
            <Box className="download-app">
              <img
                onClick={() => handleRedirectUser("playStore")}
                src={LOG_IN_ASSETS.get(LogInAssetsProps.playStore)}
                className="img-redirection"
              />
              <img
                onClick={() => handleRedirectUser("appStore")}
                src={LOG_IN_ASSETS.get(LogInAssetsProps.appStore)}
                className="img-redirection"
              />
            </Box>
          </Card>
          <Box className="download-QR">
            <img
              className="QR-image"
              src={LOG_IN_ASSETS.get(LogInAssetsProps.QRDownloadImage)}
            />
            <Typography className="download-typography">
              Download our mobile app
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="footer">
        <Box className="footer-subcontainer">
          <Typography className="questions-typography">
            Have questions?
          </Typography>
          <Typography className="copyright-typography">
            Copyright © 2015–2023 Figo Pet insurance LLC. All rights reserved.
          </Typography>
        </Box>
        <Box className="email-contact">
          <img src={LOG_IN_ASSETS.get(LogInAssetsProps.emailIcon)} />
          <Typography className="support-typography">
            help@support.mypetcloud.com
          </Typography>
        </Box>
      </Box>
    </>
  );
};
