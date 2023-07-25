import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getPost } from "../../actions/post";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const Post = () => {
  const dispatch = useAppDispatch();
  const { post, loading } = useAppSelector((state) => state.post);
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      if (id !== undefined) await dispatch(getPost(id));
    }
    fetchData();
  }, [dispatch, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

export default Post;
