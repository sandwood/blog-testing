import {
  POSTS_FETCHED,
  POST_CREATED,
  POST_DELETED,
  POST_UPDATED
} from "../types";

export default function posts(state = {}, action = {}) {
  switch (action.type) {
    case POSTS_FETCHED:
      return action.data;
    case POST_DELETED:
    case POST_UPDATED:
    case POST_CREATED:
    default:
      return state;
  }
}
