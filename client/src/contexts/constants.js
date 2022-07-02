export const LOCAL_TOKEN_STORAGE = "MTEORANN";

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "someDeployUrl";
export const SET_AUTH = "SET_AUTH";
export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAILED = "POSTS_LOADED_FAILED";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
