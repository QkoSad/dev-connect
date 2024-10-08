import styled from "@emotion/styled";
import { Button, Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAlert } from "../../actions/alert";
import { addEducation } from "../../actions/profile";
import { useAppDispatch } from "../../utils/hooks";

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
const AddEducation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { school, degree, fieldofstudy, from, to, description, current } =
    formData;

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.degree.length > 50) {
      dispatch(createAlert("Degree is longer 50 characters", "danger"));
    } else if (formData.fieldofstudy.length > 50) {
      dispatch(createAlert("Field of study is longer 50 characters", "danger"));
    } else if (formData.description.length > 250) {
      dispatch(
        createAlert("Description name is longer 250 characters", "danger"),
      );
    } else if (formData.school.length > 50) {
      dispatch(createAlert("School name is longer 50 characters", "danger"));
    } else
      await dispatch(addEducation(formData)).then(() => navigate("/dashboard"));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Add Your Education</Typography>
      <Typography variant="body1">
        Add any school or bootcamp that you have attended
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
        onSubmit={onSubmit}
      >
        <TextField
          name="school"
          label="School or Bootcamp"
          fullWidth
          value={school}
          onChange={onChange}
          autoFocus
        />
        <TextField
          value={degree}
          onChange={onChange}
          name="degree"
          label="Gegree or Certificate"
          fullWidth
        />
        <TextField
          value={fieldofstudy}
          onChange={onChange}
          name="fieldofstudy"
          label="Field of Study"
          fullWidth
        />
        <Typography variant="body1">From Date</Typography>
        <StyledInput type="date" name="from" value={from} onChange={onChange} />
        {/*   <Typography> */}
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
          value={description}
          onChange={onChange}
          label="Program description"
          multiline
          rows={4}
          fullWidth
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

export default AddEducation;
