import { POSTS_FETCHED, POST_CREATED, POST_EDITED } from "../types";
import api from "../api";

const postsFetched = data => ({
  type: POSTS_FETCHED,
  data
});

const postCreated = data => ({
  type: POST_CREATED,
  data
});

const postEdited = data => ({
  type: POST_EDITED,
  data
})

export const fetchPosts = () => dispatch =>
  api.posts.fetchAll().then(posts => dispatch(postsFetched(posts)));

export const createPost = data => dispatch =>
  api.posts
    .create(data)
    .then(post => dispatch(postCreated(post)));

export const editPost = data => dispatch =>
  api.posts
    .edit(data)
    .then(post => dispatch(postEdited(post)));