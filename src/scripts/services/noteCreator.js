import {Map} from 'immutable';

// TODO: maybe not use a singleton here?

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
