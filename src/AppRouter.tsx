import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage, Login } from "./components";
import { appRoutes } from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setIsAuthenticated } from "./store/slices/authSlice";

export const AppRouter = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("isAuth");
    if (token) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route path={appRoutes.main} element={<LandingPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={appRoutes.login} element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
};
