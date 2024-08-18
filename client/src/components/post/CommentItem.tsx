import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Comment } from "../../types";
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
import DeleteIcon from "@mui/icons-material/Delete";
interface CommentItemProps {
  postId: string;
  comment: Comment;
}

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}: CommentItemProps) => {
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
          <Typography variant="subtitle1">{text}</Typography>
        </CardContent>
        <Box display={"inline"}>
          {!auth.loading && auth.user !== null && user === auth.user._id && (
            <Button
              onClick={async () => await dispatch(deleteComment(postId, _id))}
            >
              <DeleteIcon />
            </Button>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default CommentItem;
