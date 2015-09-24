import {List} from 'immutable';

import {
  ADD_ENTITY,
  REMOVE_ENTITY,
  CHANGE_ENTITY_HEALTH,
  ADD_ENTITY_NOTE,
  REMOVE_ENTITY_NOTE,
  NEW_TURN,
} from '../constants/entityConstants';

function entities(state = new List(), action) {
  switch (action.type) {
  case ADD_ENTITY: {
    for (let i = 0; i <= state.size; i++) {
      if (i === state.size) {
        return state.push(action.entity);
      } else if (action.entity.get('initiative') >= state.get(i).get('initiative')) {
        return state.splice(i, 0, action.entity);
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
    const {entity} = action;
    const index = state.findIndex(e => e.get('id') === entity.get('id'));
    if (index === -1) {
      return state;
    }
    return state.delete(index);
  }

  case CHANGE_ENTITY_HEALTH: {
    const {entity, healthChange} = action;
    const index = state.findIndex(e => e.get('id') === entity.get('id'));
    if (index === -1) {
      return state;
    }
    const healthPath = [index, 'health'];
    return state.setIn(healthPath, state.getIn(healthPath) + healthChange);
  }

  case ADD_ENTITY_NOTE: {
    const {entity, note} = action;
    const index = state.findIndex(e => e.get('id') === entity.get('id'));
    if (index === -1) {
      return state;
    }
    const notePath = [index, 'notes'];
    return state.setIn(notePath, state.getIn(notePath).unshift(note));
  }

  case REMOVE_ENTITY_NOTE: {
    const {entity, note} = action;
    const index = state.findIndex(e => e.get('id') === entity.get('id'));
    if (index === -1) {
      return state;
    }
    const notePath = [index, 'notes'];
    const entityNotes = state.getIn(notePath);
    const noteIndex = entityNotes.findIndex(n => n.get('id') === note.get('id'));
    if (noteIndex === -1) {
      return state;
    }
    return state.setIn(notePath, state.getIn(notePath).delete(noteIndex));
  }

  default: {
    return state;
  }
  }
}

export default entities;
