import { combineReducers } from 'redux';

import entities from './entitiesReducer';
import error from './errorReducer';

export default combineReducers({
  entities,
  error,
});
