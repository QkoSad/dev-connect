import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { Box, Typography } from "@mui/material";

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
    <Box component='main' justifyContent='center' flexDirection='column' minHeight='50vh' display='flex' alignItems='center'>
      <Typography variant="h3"  component='h2'>Dashboard </Typography>
      <Typography variant="h5" component='h3' display='block'> Welcome {user && user.name}</Typography>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={async () => await dispatch(deleteAccount())}
            >
              <i className="fas fa-user" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <Typography>You have not yet setup a profile, please add some info</Typography>
          <Link to="/create-profile">
            Create Profile
          </Link>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
