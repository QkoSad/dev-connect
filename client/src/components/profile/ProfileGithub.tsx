import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getGithubRepos } from "../../actions/profile";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const ProfileGithub = ({ username }: { username: string }) => {
  const repos = useAppSelector((state) => state.profile.repos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(getGithubRepos(username));
    }
    fetchData();
  }, [dispatch, username]);

  return (
    <Box sx={{ width: { md: "50%", xs: "100%" } }}>
      <Typography variant="h2" color="info">
        Github Repos
      </Typography>
      {repos.map((repo) => {
        return (
          <Paper
            key={repo.id}
            elevation={12}
            sx={{ margin: "10px", padding: "4px" }}
          >
            <Typography variant="h4">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </Typography>
            <Typography
              sx={{
                textWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              {repo.description}
            </Typography>
            <List>
              <ListItem>Stars: {repo.stargazers_count}</ListItem>
              <ListItem>Watchers: {repo.watchers_count}</ListItem>
              <ListItem>Forks: {repo.forks_count}</ListItem>
            </List>
          </Paper>
        );
      })}
    </Box>
  );
};

export default ProfileGithub;
