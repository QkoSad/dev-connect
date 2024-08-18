import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { ProfileType } from "../../types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}: {
  profile: ProfileType;
}) => (
  <Box>
    {bio && (
      <>
        <Typography>{name.trim().split(" ")[0]}s Bio</Typography>
        <Typography>{bio}</Typography>
      </>
    )}
    <Typography>Skill Set</Typography>
    <Box>
      {skills.map((skill, index) => (
        <Box>
          <Typography>{skill}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default ProfileAbout;
