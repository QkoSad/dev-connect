import React, { Fragment } from "react";
import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";
import { EducationType } from "../../types";
import { useAppDispatch } from "../../utils/hooks";
import { Box, Typography } from "@mui/material";

const Education = ({ education }: { education: EducationType[] }) => {
  const dispatch = useAppDispatch();
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button
          onClick={async () => await dispatch(deleteEducation(edu._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  if (education.length === 0)
    return (
      <Box>
        <Typography variant="h5">
          You have no education added to your profile, consider adding some.
        </Typography>
      </Box>
    );
  return (
    <>
      <Typography variant='h5'>Education Credentials</Typography>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
