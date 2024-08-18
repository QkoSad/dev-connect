import { Box, Button, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box
      component="main"
      justifyContent="center"
      flexDirection="column"
      minHeight="75vh"
      display="flex"
      alignItems="center"
    >
      <Typography variant="h3">Developer Connector</Typography>
      <Typography variant="body1">
        Create a developer profile/portfolio, share posts and get help from
        other developers
      </Typography>
      <Box>
        <Button
          component={Link}
          variant="contained"
          sx={{ margin: 3 }}
          to="/register"
        >
          Sign Up
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ margin: 3 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
