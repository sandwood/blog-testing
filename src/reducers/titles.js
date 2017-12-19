import {
  TITLES_FETCHED,
  SEARCH_TITLES_FETCHED
} from "../types";

export default function titles(state = {}, action = {}) {
  switch (action.type) {
    case TITLES_FETCHED:
      return action.titles
    case SEARCH_TITLES_FETCHED:
      return action.post
    default:
      return state;
  }
}