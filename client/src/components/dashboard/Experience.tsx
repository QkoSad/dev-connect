import React from "react";
import { deleteExperience } from "../../actions/profile";
import { ExperienceType } from "../../types";
import formatDate from "../../utils/formatDate";
import { useAppDispatch } from "../../utils/hooks";
import {
  Box,
  Button,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";

const Experience = ({ experience }: { experience: ExperienceType[] }) => {
  const dispatch = useAppDispatch();
  if (!experience) return <></>;
  const experiences = experience.map((exp) => (
    <TableRow key={exp._id}>
      <TableCell
        sx={{
          textWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {exp.company}
      </TableCell>
      <TableCell
        sx={{
          textWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {exp.title}
      </TableCell>
      <TableCell
        sx={{
          textWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </TableCell>
      <TableCell>
        <Button onClick={async () => dispatch(deleteExperience(exp._id))}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  if (experiences.length === 0)
    return (
      <Typography variant="h5">
        You have no experiences, consider adding some.
      </Typography>
    );

  return (
    <Box>
      <Typography variant="h2">Experience Credentials</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{experiences}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Experience;
