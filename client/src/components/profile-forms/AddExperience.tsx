import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import { useAppDispatch } from "../../utils/hooks";

const AddExperience = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { company, title, location, from, to, current, description } = formData;

  const StyledInput = styled("input")`
    border-radius: 4px;
    border-color: #c4c4c4;
    border-width: 1px;
    padding: 16.5px 14px;
    min-width: 0;
    display: block;
    margin: 0;
    height: 1.4375em;
    box-sizing: content-box;
    color: currentcolor;
    letter-spacing: inherit;
    font: inherit;
    cursor: text;
    &:focus {
      outline: 2px solid #1976d2;
      border-color: transparent;
    }
  `;
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Add An Experience</Typography>
      <Typography variant="body1">
        Add any developer/programming positions that you have had in the past
      </Typography>
      <Typography variant="body2">* = required field</Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="left"
        gap="1rem"
        noValidate
        maxWidth="500px"
        sx={{ mt: 3 }}
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(addExperience(formData)).then(() =>
            navigate("/dashboard"),
          );
        }}
      >
        <TextField
          name="title"
          value={title}
          label="Job Title"
          onChange={onChange}
          fullWidth
          required
        />
        <TextField
          onChange={onChange}
          value={company}
          name="company"
          label="Company"
          required
        />
        <TextField
          onChange={onChange}
          value={location}
          name="location"
          label="Location"
        />
        <Typography variant="body1">From Date</Typography>
        <StyledInput type="date" name="from" value={from} onChange={onChange} />
        {/* <Typography> */}
        {/*   <FormControlLabel */}
        {/*     control={ */}
        {/*       <Checkbox */}
        {/*         checked={current} */}
        {/*         onChange={() => setFormData({ ...formData, current: !current })} */}
        {/*         inputProps={{ "aria-label": "controlled" }} */}
        {/*       /> */}
        {/*     } */}
        {/*     label="Current" */}
        {/*   /> */}
        {/* </Typography> */}
        <Typography>To Date</Typography>
        <StyledInput type="date" name="to" value={to} onChange={onChange} />
        <TextField
          name="description"
          label="Job description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={onChange}
        />
        <Button variant="contained" type="submit">
          Submit Changes
        </Button>
      </Box>
      <Button component={Link} to="/dashboard">
        Go Back
      </Button>
    </Container>
  );
};

export default AddExperience;
