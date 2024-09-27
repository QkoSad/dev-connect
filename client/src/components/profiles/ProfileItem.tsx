import {
  Box,
  Button,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ProfileType } from "../../types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}: {
  profile: ProfileType;
}) => {
  return (
    <Paper sx={{ width: "250px", paddingX: "10px" }}>
      <img src={avatar} alt="" />
      <Typography color="info">
        <b>{name}</b>
      </Typography>
      <Typography>
        {status} {company && <span> at {company}</span>}
      </Typography>
      <Typography>{location && <span>{location}</span>}</Typography>
      <Button component={Link} to={`/profile/${_id}`} variant="outlined">
        View Profile
      </Button>
      <Typography color="info">
        <b>Skills:</b>
      </Typography>
      <List>
        {skills.slice(0, 4).map((skill, index) => (
          <ListItemText key={index}>{skill}</ListItemText>
        ))}
      </List>
    </Paper>
  );
};

export default ProfileItem;
