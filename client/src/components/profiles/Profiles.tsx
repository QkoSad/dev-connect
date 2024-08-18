import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Box, Container, Typography } from "@mui/material";

const Profiles = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getProfiles());
    }
    fetchData();
  }, [dispatch]);

  const { profiles, loading } = useAppSelector((state) => state.profile);
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Typography variant="h2">Developers</Typography>
            <Typography variant="h6">
              Browse and connect with developers
            </Typography>
            <Box>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <Typography>No profiles found...</Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Profiles;
