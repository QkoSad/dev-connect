import { Typography } from "@mui/material";
import React from "react";
import { deleteExperience } from "../../actions/profile";
import { ExperienceType } from "../../types";
import formatDate from "../../utils/formatDate";
import { useAppDispatch } from "../../utils/hooks";

const Experience = ({ experience }: { experience: ExperienceType[] }) => {
  const dispatch = useAppDispatch();
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>
      <td>
        <button
          onClick={async () => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  if (experiences.length === 0)
    return (
      <Typography variant="h5">You have no experiences, consider adding some.</Typography>
    );

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default Experience;
