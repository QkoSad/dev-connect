import { Button, Box, Container, CssBaseline, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
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

  const { profile, loading }: { profile: any; loading: boolean } =
    useAppSelector((state) => state.profile);
  const [formData, setFormData] = useState(initialState);

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


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const editing = profile ? true : false;
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const website = data.get('website') as string
    const location = data.get('location') as string
    const skills = data.get('skills') as string
    const githubusername = data.get('githubUser') as string
    const company = data.get('company') as string
    const bio = data.get('bio') as string
    const twitter = data.get('twitter') as string
    const facebook = data.get('facebook') as string
    const youtube = data.get('youtube') as string
    const linkedin = data.get('linkedin') as string
    const instagram = data.get('instagram') as string
    const status =data.get('status') as string
    console.log(data)
    await dispatch(createProfile({
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
      status
    }, editing)).then(() => {
      if (!editing) navigate("/dashboard");
    });
  };

  return (
    <Container className="container">
      <CssBaseline />
      <Typography component='h1' variant="h4">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </Typography>
      <Typography component='p' variant='body1'>
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </Typography>
      <Typography variant="body2">* = required field</Typography>
      <Box
        component="form"
        noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="company"
              fullWidth
              label="Company"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <Typography paddingY='1rem'>
              Could be your own company or onee you work for
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="website"
              fullWidth
              label="Website"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography paddingY='1rem'>
              Could be your own a or a company website
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="location"
              fullWidth
              label="Location"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography paddingY='1rem'>
              City & state suggest(eg. Boston MA)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="skills"
              required
              fullWidth
              label="Skills"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Please use comma separeted values(eg. HTML, CSS, JavaScript, PHP)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="githubUser"
              fullWidth
              label="Github Username"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>
              If you want your latest reepos add a Github link, include your username
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id='status'>Status *</InputLabel>
            <Select fullWidth
              labelId="status"
              name='status'
              required
              placeholder='Select Profesional status'
              defaultValue={""}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Junior Developer">Junior Developer</MenuItem>
              <MenuItem value="Senior Developer">Senior Developer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Student or Learning">Student or Learning</MenuItem>
              <MenuItem value="Instructor">Instructor or Teacher</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography paddingTop='2.3rem' >Select Profesional Status</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Tell us a little about yourself
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              name="bio"
              multiline
              rows={4}
              fullWidth
              label="A short bio of yourself"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              onClick={() => toggleSocialInputs(!displaySocialInputs)}>
              Add Social Network Links
            </Button>
          </Grid>
          {displaySocialInputs ? (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="twitter"
                  label="Twitter URL"
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="facebook"
                  label="FaceBook URL"
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="youtube"
                  label="YouTube URL"
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="linkedin"
                  label="Linkedin URL"
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="instagram"
                  label="Instagram URL"
                />
              </Grid>
            </>) : null}
          <Grid item xs={8}>
            <Button variant='contained' type="submit">Sumbit query</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant='outlined' >
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/dashboard'>Go Back</Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileForm;
