import {
  ADD_ENTITY,
  REMOVE_ENTITY,
  CHANGE_ENTITY_HEALTH,
  ADD_ENTITY_NOTE,
  REMOVE_ENTITY_NOTE,
  NEW_TURN,
  CHANGE_ENTITY_ORDER,
} from '../constants/entityConstants';

export function addEntity(entity) {
  return {
    type: ADD_ENTITY,
    entity,
  };
}

export function removeEntity(entity) {
  return {
    type: REMOVE_ENTITY,
    entity,
  };
}

export function changeEntityHealth(entity, healthChange) {
  return {
    type: CHANGE_ENTITY_HEALTH,
    entity,
    healthChange,
  };
}


export function addEntityNote(entity, note) {
  return {
    type: ADD_ENTITY_NOTE,
    entity,
    note,
  };
}

export function removeEntityNote(entity, note) {
  return {
    type: REMOVE_ENTITY_NOTE,
    entity,
    note,
  };
}

export function changeEntityOrder(fromIndex, toIndex) {
  return {
    type: CHANGE_ENTITY_ORDER,
    fromIndex,
    toIndex,
  };
}

export function newTurn() {
  return { type: NEW_TURN };
}
