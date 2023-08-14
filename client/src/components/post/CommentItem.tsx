import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Comment } from "../../types";
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
        {!auth.loading && auth.user !== null && user === auth.user._id && (
          <button
            onClick={async () => await dispatch(deleteComment(postId, _id))}
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

export default CommentItem;
