import { combineReducers } from 'redux';

import user from './reducers/user';
import posts from './reducers/posts';
import modals from './reducers/modals';

export default combineReducers({
  user,
  posts,
  modals
})