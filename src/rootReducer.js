import { combineReducers } from 'redux';

import user from './reducers/user';
import posts from './reducers/posts';

export default combineReducers({
  user,
  posts
})