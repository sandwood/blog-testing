import { combineReducers } from 'redux';

import user from './reducers/user';
import posts from './reducers/posts';
import titles from './reducers/titles';

export default combineReducers({
  user,
  posts,
  titles
})