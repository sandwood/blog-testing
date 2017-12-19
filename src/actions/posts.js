import {
  POSTS_FETCHED,
  POST_CREATED,
  POST_EDITED,
  POST_DELETED
} from "../types";
import api from "../api";

const postsFetched = data => ({
  type: POSTS_FETCHED,
  data
});

const postCreated = () => ({
  type: POST_CREATED
});

const postEdited = () => ({
  type: POST_EDITED
});

const postDeleted = () => ({
  type: POST_DELETED
});

export const fetchPosts = data => dispatch =>
  api.posts.fetchAll(data).then(posts => dispatch(postsFetched(posts)));

export const createPost = data => dispatch =>
  api.posts.create(data).then(post => dispatch(postCreated(post)));

export const editPost = data => dispatch =>
  api.posts.edit(data).then(post => dispatch(postEdited(post)));

export const deletePost = data => dispatch =>
  api.posts.delete(data).then(post => dispatch(postDeleted(post)));