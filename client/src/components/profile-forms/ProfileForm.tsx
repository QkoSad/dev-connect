import {
  Button,
  Box,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { createAlert } from "../../actions/alert";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const ProfileForm = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(initialState);

  const { profile, loading }: { profile: any; loading: boolean } =
    useAppSelector((state) => state.profile);

  const creatingProfile = useMatch("/create-profile");

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    async function fetchData() {
      await dispatch(getCurrentProfile());
    }
    if (!profile) fetchData();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData: any = { ...initialState };
      // cant figure out how to type key to be keyof profile  so they are any now
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, dispatch, profile]);

  const {
    website,
    location,
    skills,
    githubusername,
    company,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
    status,
  } = formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const editing = profile ? true : false;
    e.preventDefault();
    if (facebook?.length > 100) {
      dispatch(createAlert("Facebook link is longer 100 characters", "danger"));
    } else if (linkedin?.length > 100) {
      dispatch(createAlert("LinkedIn link is longer 100 characters", "danger"));
    } else if (youtube?.length > 100) {
      dispatch(createAlert("Youtube link is longer 100 characters", "danger"));
    } else if (instagram?.length > 100) {
      dispatch(
        createAlert("Instagram link is longer 100 characters", "danger"),
      );
    } else if (website?.length > 100) {
      dispatch(createAlert("Website link is longer 100 characters", "danger"));
    } else if (skills.length > 100) {
      dispatch(createAlert("Skills is longer 100 characters", "danger"));
    } else if (skills.length === 0) {
      dispatch(createAlert("Skills is required", "danger"));
    } else if (skills.length > 100 || skills.length === 0) {
      dispatch(createAlert("Status is required", "danger"));
    } else if (status?.length === 0) {
      dispatch(createAlert("Location is longer 100 characters", "danger"));
    } else if (githubusername?.length > 50) {
      dispatch(
        createAlert("Github username is longer 50 characters", "danger"),
      );
    } else if (company?.length > 50) {
      dispatch(createAlert("Company name is longer 50 characters", "danger"));
    } else if (bio?.length > 250) {
      dispatch(createAlert("Bio name is longer 250 characters", "danger"));
    } else
      await dispatch(
        createProfile(
          {
            website,
            location,
            skills,
            githubusername,
            company,
            bio,
            twitter,
            facebook,
            youtube,
            linkedin,
            instagram,
            status,
          },
          editing,
        ),
      ).then(() => {
        if (!editing) navigate("/dashboard");
      });
  };

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h4">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </Typography>
      <Typography component="p" variant="body1">
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </Typography>
      <Typography variant="body2">* = required field</Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="company"
              fullWidth
              label="Company"
              autoFocus
              onChange={onChange}
              value={company}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography paddingY="1rem">
              Could be your own company or one you work for
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="website"
              fullWidth
              label="Website"
              onChange={onChange}
              value={website}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography paddingY="1rem">
              Could be your own a or a company website
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="location"
              fullWidth
              label="Location"
              onChange={onChange}
              value={location}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography paddingY="1rem">
              City & state suggest(eg. Boston MA)
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="skills"
              required
              fullWidth
              label="Skills"
              onChange={onChange}
              value={skills}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography>
              Please use comma separeted values (eg. HTML, CSS, JavaScript, PHP)
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="githubUser"
              fullWidth
              label="Github Username"
              onChange={onChange}
              value={githubusername}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography>
              If you want your latest repositories, add a Github link and
              include your username
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <InputLabel id="status">Status *</InputLabel>
            <Select
              fullWidth
              labelId="status"
              name="status"
              required
              placeholder="Select Profesional status"
              defaultValue={""}
              value={status}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Junior Developer">Junior Developer</MenuItem>
              <MenuItem value="Senior Developer">Senior Developer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Student or Learning">
                Student or Learning
              </MenuItem>
              <MenuItem value="Instructor">Instructor or Teacher</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography paddingTop="2.3rem">
              Select Profesional Status
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography>Tell us a little about yourself</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="bio"
              multiline
              rows={4}
              fullWidth
              onChange={onChange}
              value={bio}
              label="A short bio of yourself"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
              Add Social Network Links
            </Button>
          </Grid>
          {displaySocialInputs ? (
            <>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  name="twitter"
                  label="Twitter URL"
                  onChange={onChange}
                  value={twitter}
                />
              </Grid>
              <Grid size={{ xs: 6 }}></Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  name="facebook"
                  label="FaceBook URL"
                  onChange={onChange}
                  value={facebook}
                />
              </Grid>
              <Grid size={{ xs: 6 }}></Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  name="youtube"
                  label="YouTube URL"
                  onChange={onChange}
                  value={youtube}
                />
              </Grid>
              <Grid size={{ xs: 6 }}></Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  name="linkedin"
                  label="Linkedin URL"
                  onChange={onChange}
                  value={linkedin}
                />
              </Grid>
              <Grid size={{ xs: 6 }}></Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  name="instagram"
                  label="Instagram URL"
                  onChange={onChange}
                  value={instagram}
                />
              </Grid>
            </>
          ) : null}
          <Grid size={{ xs: 8 }}>
            <Button variant="contained" type="submit">
              Submit Changes
            </Button>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Button variant="outlined">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/dashboard"
              >
                Go Back
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileForm;
