import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { createAlert } from "../../actions/alert";
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
        onSubmit={(e) => {
          e.preventDefault();
          if (text.length > 250) {
            dispatch(
              createAlert("Comment longer than 250 characters", "danger"),
            );
          } else {
            dispatch(addComment(postId, { text }));
            setText("");
          }
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
        <Button type="submit">Submit</Button>
      </Box>
    </Container>
  );
};

export default CommentForm;
