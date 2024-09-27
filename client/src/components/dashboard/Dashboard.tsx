import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { Box, Button, Typography } from "@mui/material";
import { compose } from "redux";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(getCurrentProfile());
    }
    fetchData();
  }, [dispatch]);
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.profile.profile);
  return (
    <Box
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h3" component="h2">
        Dashboard{" "}
      </Typography>
      <Typography variant="h5" component="h3" display="block">
        Welcome {user && user.name}
      </Typography>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <Box sx={{ marginTop: "2vh" }}>
            <Button
              variant="contained"
              color="error"
              onClick={async () => await dispatch(deleteAccount())}
            >
              Delete My Account
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6">
            You have not yet setup a profile, please add some info
          </Typography>
          <Button component={Link} to="/create-profile" variant="contained">
            Create Profile
          </Button>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
