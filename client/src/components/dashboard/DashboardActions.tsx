import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
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
    </Box>
  );
};

export default DashboardActions;
