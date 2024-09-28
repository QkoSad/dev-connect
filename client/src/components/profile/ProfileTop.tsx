import { BorderAll } from "@mui/icons-material";
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
  return (
    <>
      <img src={avatar} alt="" />
      <Typography variant="h2" color="info">
        {name}
      </Typography>
      <Typography sx={{ textWrap: "wrap" }}>
        {status} {company ? <span> at {company}</span> : null}
      </Typography>
      {location ? <Typography>{location}</Typography> : null}
      <Box>
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i>{website}</i>
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
                  style={{ display: "block" }}
                >
                  <i>{value}</i>
                </a>
              ))
          : null}
      </Box>
    </>
  );
};

export default ProfileTop;
