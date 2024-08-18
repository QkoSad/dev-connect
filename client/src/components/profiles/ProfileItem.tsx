import { Box, Button, Paper, Typography } from "@mui/material";
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
    <Paper>
      <img src={avatar} alt="" className="round-img" />
      <Box>
        <Typography>{name}</Typography>
        <Typography>
          {status} {company && <span> at {company}</span>}
        </Typography>
        <Typography>{location && <span>{location}</span>}</Typography>
        <Button component={Link} to={`/profile/${_id}`}>
          View Profile
        </Button>
      </Box>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default ProfileItem;
