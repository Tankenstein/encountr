import {SET_ERROR, REMOVE_ERROR} from '../constants/errorConstants';

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function removeError() {
  return {type: REMOVE_ERROR};
}
