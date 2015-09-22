import {Map} from 'immutable';

class NoteCreator {
  id = 0;

  createNote(text) {
    return new Map({
      id: this.id++,
      text,
    });
  }
}

export default new NoteCreator();
