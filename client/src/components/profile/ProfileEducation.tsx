import { Box, Typography } from "@mui/material";
import React from "react";
import { EducationType } from "../../types";
import formatDate from "../../utils/formatDate";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}: {
  education: EducationType;
}) => (
  <Box>
    <Typography variant="h3">{school}</Typography>
    <Typography>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </Typography>
    <Typography>Degree: {degree}</Typography>
    <Typography>Field Of Study: {fieldofstudy}</Typography>
    <Typography>Description: {description}</Typography>
  </Box>
);

export default ProfileEducation;
