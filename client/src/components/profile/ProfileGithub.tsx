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
    <div>
      <h2>Github Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id}>
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li>Stars: {repo.stargazers_count}</li>
              <li>Watchers: {repo.watchers_count}</li>
              <li>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGithub;
