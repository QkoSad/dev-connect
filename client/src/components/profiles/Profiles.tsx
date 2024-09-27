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
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography variant="h2">Developers</Typography>
          <Typography variant="h6">
            Browse and connect with developers
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {profiles.length > 0 && Array.isArray(profiles) ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <Typography>No profiles found...</Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Profiles;
