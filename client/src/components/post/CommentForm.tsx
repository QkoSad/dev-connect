import React, { useState } from "react";
import { addComment } from "../../actions/post";
import { useAppDispatch } from "../../utils/hooks";

const CommentForm = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(addComment(postId, { text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Comment the post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
