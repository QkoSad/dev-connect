import React, { useEffect } from "react";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

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
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Posts;
