import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  EDIT_POST,
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [showModalAddPost, setShowModalAddPost] = useState(false);
  const [showModalEditPost, setShowModalEditPost] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  const [editPost, setEditPost] = useState({
    _id: "",
    title: "",
    description: "",
    url: "",
    status: "TO DO",
  });
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });
  // GET ALL
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/post`);
      if (res.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: res.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAILED });
    }
  };
  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/post`, newPost);
      if (res.data.success) {
        dispatch({ type: ADD_POST, payload: res.data.post });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error!" };
    }
  };
  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/post/${id}`);
      if (res.data.success) {
        dispatch({ type: DELETE_POST, payload: id });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error!" };
    }
  };
  const updatePost = async (updatedPost) => {
    try {
      const res = await axios.put(
        `${apiUrl}/post/${updatedPost._id}`,
        updatedPost
      );
      if (res.data.success) {
        dispatch({ type: EDIT_POST, payload: res.data.post });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error!" };
    }
  };
  const postContextData = {
    postState,
    getPosts,
    showModalAddPost,
    setShowModalAddPost,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    editPost,
    setEditPost,
    showModalEditPost,
    setShowModalEditPost,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
