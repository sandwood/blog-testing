import {
  POSTS_FETCHED,
  POST_CREATED,
  POST_UPDATED,
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

const postUpdated = () => ({
  type: POST_UPDATED
});

const postDeleted = () => ({
  type: POST_DELETED
});

export const fetchPosts = data => dispatch =>
  api.posts.fetchAll(data).then(posts => dispatch(postsFetched(posts)));

export const createPost = data => dispatch =>
  api.posts.create(data).then(post => dispatch(postCreated(post)));

export const updatePost = data => dispatch =>
  api.posts.update(data).then(post => dispatch(postUpdated(post)));

export const deletePost = data => dispatch =>
  api.posts.delete(data).then(post => dispatch(postDeleted(post)));