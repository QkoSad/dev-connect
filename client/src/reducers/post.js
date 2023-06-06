import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsAction(state, action) {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    },
    getPostAction(state, action) {
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    },
    addPostAction(state, action) {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    },
    deletePostAction(state, action) {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    },
    postError(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
    updateLikes(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    },
    addCommentAction(state, action) {
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    },
    removeComment(state, action) {
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        loading: false,
      };
    },
  },
});
export const {
  removeComment,
  addCommentAction,
  updateLikes,
  postError,
  deletePostAction,
  getPostAction,
  getPostsAction,
  addPostAction,
} = postSlice.actions;

export default postSlice.reducer;
