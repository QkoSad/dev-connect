import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { Post } from "../../types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
}: {
  post: Post;
}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar src={avatar}>R</Avatar>}
          title={<Link to={`/profile/${user}`}>{name}</Link>}
          subheader={formatDate(date)}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{ textWrap: "wrap", wordBreak: "break-word" }}
          >
            {text}
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button onClick={async () => await dispatch(addLike(_id))}>
          <ThumbUpIcon />
        </Button>
        <Typography display="inline-flex" variant="button">
          {likes.length}
        </Typography>
        <Button onClick={async () => await dispatch(removeLike(_id))}>
          <ThumbDownIcon />
        </Button>
        <Button component={Link} to={`/posts/${_id}`}>
          <Typography>Comments </Typography>
        </Button>
        <Typography display="inline-flex" variant="button">
          {comments.length}
        </Typography>
        {!auth.loading && auth.user !== null && user === auth.user._id && (
          <Button onClick={async () => await dispatch(deletePost(_id))}>
            <DeleteIcon />
          </Button>
        )}
      </Box>
    </Container>
  );
};
export default PostItem;
