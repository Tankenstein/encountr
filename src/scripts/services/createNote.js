import { Map } from 'immutable';
import { v4 as uuid } from 'uuid';

export default function createNote(text) {
  return new Map({
    id: uuid(),
    text,
  });
}
