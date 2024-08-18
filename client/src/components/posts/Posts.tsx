import React, { useEffect } from "react";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Box, Container, Typography } from "@mui/material";

const Posts = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(getPosts());
    }
    fetchData();
  }, [dispatch]);
  const posts = useAppSelector((state) => state.post.posts);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Posts</Typography>
      <Typography variant='h4'>Welcome to the community</Typography>
      <PostForm />
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
