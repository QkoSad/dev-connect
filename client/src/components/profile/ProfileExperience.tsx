import { Paper, Typography } from "@mui/material";
import React from "react";
import { ExperienceType } from "../../types";
import formatDate from "../../utils/formatDate";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}: {
  experience: ExperienceType;
}) => (
  <Paper elevation={12} sx={{ margin: "10px", padding: "4px" }}>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      <b>{company}</b>
    </Typography>
    <Typography>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </Typography>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      <b>Position:</b> {title}
    </Typography>
    <Typography
      sx={{
        textWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      <b>Location:</b> {location}
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

export default ProfileExperience;
