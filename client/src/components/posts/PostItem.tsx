import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { Post } from "../../types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
}: { post: Post }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        <button
          onClick={async () => await dispatch(addLike(_id))}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={async () => await dispatch(removeLike(_id))}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && auth.user !== null && user === auth.user._id && (
          <button
            onClick={async () => await dispatch(deletePost(_id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};
export default PostItem;
