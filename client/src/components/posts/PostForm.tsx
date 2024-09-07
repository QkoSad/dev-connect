import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addPost } from "../../actions/post";
import { useAppDispatch } from "../../utils/hooks";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Typography>Say Something...</Typography>
      <Box
        component="form"
        display="flex"
        gap="1rem"
        noValidate
        sx={{ mt: 3, mb: 3 }}
        onSubmit={async (e) => {
          console.log(1);
          e.preventDefault();
          await dispatch(addPost({ text }));
          setText("");
        }}
      >
        <TextField
          name="text"
          label="Create a post"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={3}
          required
        />
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
};

export default PostForm;
