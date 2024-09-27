import { Box, List, ListItem, Typography } from "@mui/material";
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
  <Box sx={{ textWrap: "wrap", maxWidth: "100%" }}>
    {bio && (
      <>
        <Typography color="info" variant="h5">
          <b>{name.trim().split(" ")[0]}'s Bio</b>
        </Typography>
        <Typography
          sx={{
            textWrap: "wrap",
            wordBreak: "break-word",
          }}
        >
          {bio}
        </Typography>
      </>
    )}
    <Typography color="info" variant="h5">
      <b>Skill Set</b>
    </Typography>
    <List>
      {skills.map((skill, index) => (
        <ListItem key={index}>
          <Typography>{skill}</Typography>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default ProfileAbout;
