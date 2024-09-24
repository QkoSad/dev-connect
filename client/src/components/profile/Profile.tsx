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
import { Box, Button, Card, Paper, Typography } from "@mui/material";

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
    <Box display="flex" flexDirection="column" alignItems="center">
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <Button component={Link} to="/profiles">
            Back To Profiles
          </Button>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user !== null &&
            auth.user._id === profile.user._id && (
              <Button component={Link} to="/edit-profile">
                Edit Profile
              </Button>
            )}
          <Paper elevation={9} sx={{ width: "90%" }}>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <Box>
              <Typography variant="h2">Experience</Typography>
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
            </Box>
            <Box>
              <Typography variant="h2">Education</Typography>
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
            </Box>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Profile;
