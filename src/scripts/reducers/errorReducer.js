import {SET_ERROR, REMOVE_ERROR} from '../constants/errorConstants';

function error(state = '', action) {
  switch (action.type) {
  case SET_ERROR:
    return action.error;

  case REMOVE_ERROR:
    return '';

  default:
    return state;
  }
}

export default error;
