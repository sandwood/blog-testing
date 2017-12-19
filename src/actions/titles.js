import { TITLES_FETCHED, SEARCH_TITLES_FETCHED } from "../types";
import api from "../api";

const titlesFetched = titles => ({
  type: TITLES_FETCHED,
  titles
});

const searchTitlesFetched = post => ({
  type: SEARCH_TITLES_FETCHED,
  post
});

export const fetchTitles = () => dispatch =>
  api.titles.fetchAllTitles().then(titles => dispatch(titlesFetched(titles)));

export const searchTitle = title => dispatch =>
  api.titles.search(title).then(post => dispatch(searchTitlesFetched(post)));
