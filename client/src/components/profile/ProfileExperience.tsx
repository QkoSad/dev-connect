import { Box, Typography } from "@mui/material";
import React from "react";
import { ExperienceType } from "../../types";
import formatDate from "../../utils/formatDate";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}: {
  experience: ExperienceType;
}) => (
  <Box>
    <Typography variant="h3">{company}</Typography>
    <Typography>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </Typography>
    <Typography>Position: {title}</Typography>
    <Typography>Location: {location}</Typography>
    <Typography>Description: {description}</Typography>
  </Box>
);

export default ProfileExperience;
