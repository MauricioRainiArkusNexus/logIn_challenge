import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AuthService } from "../../services";
import { setIsAuthenticated } from "../../store/slices/authSlice";

export const LandingPage = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    AuthService.logout();
    dispatch(setIsAuthenticated(false));
  };

  return (
    <Box>
      <h1>Welcome to the Main Page</h1>
      <Link to="/login">
        <Button onClick={handleLogOut}>Logout</Button>
      </Link>
    </Box>
  );
};
