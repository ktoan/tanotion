import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
} from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    case POSTS_LOADED_FAILED:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => {
          return item._id !== payload;
        }),
      };
    case EDIT_POST:
      const newPosts = state.posts.map((item) =>
        item._id === payload._id ? payload : item
      );
      return {
        ...state,
        posts: newPosts,
      };
    default:
      return state;
  }
};
