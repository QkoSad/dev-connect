import setAuthToken from './utils/setAuthToken';
import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './reducers/alert';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile'
import postReducer from './reducers/post'


const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
  }
})

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    if (typeof token === 'string') setAuthToken(token);
    else throw new Error("token not string")
  }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

