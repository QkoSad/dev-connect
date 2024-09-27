import { Paper, Typography } from "@mui/material";
import React from "react";
import { EducationType } from "../../types";
import formatDate from "../../utils/formatDate";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}: {
  education: EducationType;
}) => (
  <Paper elevation={12} sx={{ margin: "10px", padding: "4px" }}>
    <Typography
      variant="h4"
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      {school}
    </Typography>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </Typography>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      <b>Degree:</b> {degree}
    </Typography>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      <b>Field Of Study:</b> {fieldofstudy}
    </Typography>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      <b>Description:</b> {description}
    </Typography>
  </Paper>
);

export default ProfileEducation;
