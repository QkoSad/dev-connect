import React, { useState } from "react";
import { addPost } from "../../actions/post";
import { useAppDispatch } from "../../utils/hooks";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(addPost({ text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;