import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { EducationType, ExperienceType } from "../../types";
import { Box, Button, Card, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Profile = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (typeof id === "string") await dispatch(getProfileById(id));
    }
    fetchData();
  }, [dispatch, id]);

  return (
    <>
      {profile === null ? (
        <Spinner />
      ) : (
        <Paper sx={{ display: "grid", justifyItems: "center", marginY: "5px" }}>
          <div>
            <Button
              variant="contained"
              component={Link}
              to="/profiles"
              sx={{
                width: "70px",
                margin: "5px",
              }}
            >
              Back
            </Button>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user !== null &&
              auth.user._id === profile.user._id && (
                <Button
                  component={Link}
                  to="/edit-profile"
                  variant="outlined"
                  sx={{
                    width: "70px",
                  }}
                >
                  Edit
                </Button>
              )}
          </div>
          <Grid
            container
            spacing={2}
            rowSpacing={"30px"}
            sx={{
              marginX: "20%",
            }}
          >
            <Grid size={{ sm: 12, lg: 4 }}>
              <ProfileTop profile={profile} />
            </Grid>
            <Grid size={{ sm: 12, lg: 8 }}>
              <ProfileAbout profile={profile} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" color="info">
                Experience
              </Typography>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience: ExperienceType) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <Typography variant="h4">No experience credentials</Typography>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" color="info">
                Education
              </Typography>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education: EducationType) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <Typography variant="h4">No education credentials</Typography>
              )}
            </Grid>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default Profile;
