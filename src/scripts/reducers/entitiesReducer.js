import { List } from 'immutable';

import {
  ADD_ENTITY,
  REMOVE_ENTITY,
  CHANGE_ENTITY_HEALTH,
  ADD_ENTITY_NOTE,
  REMOVE_ENTITY_NOTE,
  NEW_TURN,
  CHANGE_ENTITY_ORDER,
} from '../constants/entityConstants';

function entities(state = new List(), action) {
  switch (action.type) {
    case ADD_ENTITY: {
      for (let index = 0; index <= state.size; index++) {
        if (index === state.size) {
          return state.push(action.entity);
        } else if (action.entity.get('initiative') >= state.get(index).get('initiative')) {
          return state.splice(index, 0, action.entity);
        }
      }
      return state;
    }

    case NEW_TURN: {
      if (state.size) {
        const first = state.first();
        return state.shift().push(first);
      }
      return state;
    }

    case REMOVE_ENTITY: {
      const { entity } = action;
      const index = state.findIndex(en => en.get('id') === entity.get('id'));
      if (index === -1) {
        return state;
      }
      return state.delete(index);
    }

    case CHANGE_ENTITY_HEALTH: {
      const { entity, healthChange } = action;
      const index = state.findIndex(en => en.get('id') === entity.get('id'));
      if (index === -1) {
        return state;
      }
      const healthPath = [index, 'health'];
      return state.setIn(healthPath, state.getIn(healthPath) + healthChange);
    }

    case ADD_ENTITY_NOTE: {
      const { entity, note } = action;
      const index = state.findIndex(en => en.get('id') === entity.get('id'));
      if (index === -1) {
        return state;
      }
      const notePath = [index, 'notes'];
      return state.setIn(notePath, state.getIn(notePath).unshift(note));
    }

    case REMOVE_ENTITY_NOTE: {
      const { entity, note } = action;
      const index = state.findIndex(en => en.get('id') === entity.get('id'));
      if (index === -1) {
        return state;
      }
      const notePath = [index, 'notes'];
      const entityNotes = state.getIn(notePath);
      const noteIndex = entityNotes.findIndex(no => no.get('id') === note.get('id'));
      if (noteIndex === -1) {
        return state;
      }
      return state.setIn(notePath, state.getIn(notePath).delete(noteIndex));
    }

    case CHANGE_ENTITY_ORDER: {
      const { fromIndex, toIndex } = action;
      return state.delete(toIndex, 1).splice(fromIndex, 0, state.get(toIndex));
    }

    default: {
      return state;
    }
  }
}

export default entities;
