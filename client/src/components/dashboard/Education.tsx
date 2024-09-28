import React, { Fragment } from "react";
import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";
import { EducationType } from "../../types";
import { useAppDispatch } from "../../utils/hooks";
import {
  Box,
  Button,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";

const Education = ({ education }: { education: EducationType[] }) => {
  const dispatch = useAppDispatch();
  if (!education) return <></>;
  const educations = education.map((edu) => (
    <TableRow key={edu._id}>
      <TableCell
        sx={{
          textWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {edu.school}
      </TableCell>
      <TableCell
        sx={{
          textWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {edu.degree}
      </TableCell>
      <TableCell
        sx={{
          textWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </TableCell>
      <TableCell>
        <Button onClick={async () => await dispatch(deleteEducation(edu._id))}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
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
    <Box>
      <Typography variant="h2">Education Credentials</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>School</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Years</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{educations}</TableBody>
      </Table>
    </Box>
  );
};

export default Education;
