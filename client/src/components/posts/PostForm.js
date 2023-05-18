import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  //const onChange = (e) =>
    //setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, category });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <p className="lead">Choose a category:</p>
        <select name="category" value={category} onChange={setCategory}>
          <option>* Select Category</option>
          <option value="opinion">Opinion</option>
          <option value="question">Question</option>
          <option value="asssitance">Asking for asssitance</option>
          <option value="news">News</option>
          <option value="other">Other</option>
        </select>

        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
