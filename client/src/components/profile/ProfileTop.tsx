import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import { ProfileType } from "../../types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}: {
  profile: ProfileType;
}) => {
  console.log(avatar)
  return (
    <>
      <img className="round-img my-1" src={avatar} alt="" />
      <Typography variant="h1">{name}</Typography>
      <Typography>
        {status} {company ? <span> at {company}</span> : null}
      </Typography>
      <Typography>{location ? <span>{location}</span> : null}</Typography>
      <Box>
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </Box>
    </>
  );
};

export default ProfileTop;
