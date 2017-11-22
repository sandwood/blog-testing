import { createSelector } from "reselect";
import { POSTS_FETCHED, POST_CREATED } from "../types";

export default function posts(state = {}, action = {}) {
  switch (action.type) {
    case POSTS_FETCHED:
    case POST_CREATED:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

// SELECTORS

export const postsSelector = state => state.posts;

export const allPostsSelector = createSelector(postsSelector, postsHash =>
  Object.values(postsHash)
);