import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addPost } from "../../actions/post";
import { useAppDispatch } from "../../utils/hooks";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const handleSumbit = {};
  return (
    <Container>
      <Typography>Say Something...</Typography>
      <Box
        component="form"
        display="flex"
        gap="1rem"
        noValidate
        sx={{ mt: 3, mb: 3 }}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PostForm;
