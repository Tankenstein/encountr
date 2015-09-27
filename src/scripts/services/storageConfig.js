import {fromJS} from 'immutable';

import entityCreator from './entityCreator';
import noteCreator from './noteCreator';

const STORAGE_KEY = 'encountr_entities';

function highestIdReducer(highestId, immutableMapWithId) {
  const id = immutableMapWithId.get('id');
  if (id >= highestId) {
    return id;
  }
  return highestId;
}

const storageConfig = {

  key: STORAGE_KEY,

  serialize(subset) {
    return JSON.stringify(subset.toJS());
  },

  deserialize(serializedData) {
    return fromJS(JSON.parse(serializedData));
  },

  slicer() {
    return state => state.entities;
  },

  merge(__, entities) {
    if (entities !== null) {
      const entityId = entities.reduce(highestIdReducer, -1);
      if (entityId > entityCreator.id) {
        entityCreator.id = entityId + 1;
      }

      const noteId = entities.reduce((highestNoteId, entity) => {
        const notes = entity.get('notes');
        const highestEntityNoteId = notes.reduce(highestIdReducer, -1);
        if (highestEntityNoteId >= highestNoteId) {
          return highestEntityNoteId;
        }

        return highestNoteId;
      }, -1);

      if (noteId > noteCreator.id) {
        noteCreator.id = noteId + 1;
      }

      return {
        error: '',
        entities,
      };
    }
  },
};

export default storageConfig;
