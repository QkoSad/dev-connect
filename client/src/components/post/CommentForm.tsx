import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addComment } from "../../actions/post";
import { useAppDispatch } from "../../utils/hooks";

const CommentForm = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="sm">
      <Typography>Leave a Comment</Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="left"
        gap="1rem"
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(addComment(postId, { text }));
          setText("");
        }}
      >
        <TextField
          name="text"
          label="Comment the post"
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button>Submit</Button>
      </Box>
    </Container>
  );
};

export default CommentForm;
