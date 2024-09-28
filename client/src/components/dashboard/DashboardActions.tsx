import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

const DashboardActions = () => {
  const { profile }: { profile: any } = useAppSelector(
    (state) => state.profile,
  );
  return (
    <Box
      sx={{
        display: { xs: "grid", md: "flex" },
        rowGap: { xs: "5px" },
      }}
    >
      <Button
        component={Link}
        to="/edit-profile"
        variant="outlined"
        sx={{ marginX: "1rem" }}
      >
        Edit Profile
      </Button>
      <Button
        component={Link}
        to="/add-experience"
        variant="outlined"
        sx={{ marginX: "1rem" }}
      >
        Add Experience
      </Button>
      <Button
        component={Link}
        to="/add-education"
        variant="outlined"
        sx={{ marginX: "1rem" }}
      >
        Add Education
      </Button>
      <Button
        sx={{ marginX: "1rem" }}
        component={Link}
        to={`/profile/${profile.user._id}`}
        variant="outlined"
      >
        View Profile
      </Button>
    </Box>
  );
};

export default DashboardActions;
