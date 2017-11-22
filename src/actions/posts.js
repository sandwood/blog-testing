import { POSTS_FETCHED, POST_CREATED } from "../types";
import api from "../api";

const postsFetched = data => ({
  type: POSTS_FETCHED,
  data
});

const postCreated = data => ({
  type: POST_CREATED,
  data
});

export const fetchPosts = () => dispatch =>
  api.posts.fetchAll().then(posts => dispatch(postsFetched(posts)));

export const createPost = data => dispatch =>
  api.posts
    .create(data)
    .then(post => dispatch(postCreated(post)));