import {List} from 'immutable';

import EntityCreator from './EntityCreator';
import NoteCreator from './NoteCreator';

const STORAGE_KEY = 'entities';

export function saveEntities(entities) {
  const entitiesString = JSON.stringify(entities.toJS());
  localStorage.setItem(STORAGE_KEY, entitiesString);
}

export function getEntities() {
  const entities = localStorage.getItem(STORAGE_KEY);
  if (entities) {
    const parsedEntities = JSON.parse(entities);
    if (parsedEntities &&
      Array.isArray(parsedEntities) &&
      parsedEntities.length > 0 &&
      typeof parsedEntities[0] === 'object') {
      return parsedEntities.map(entity => {
        const health = parseInt(entity.health, 10);
        const initiative = parseInt(entity.initiative, 10);
        const name = entity.name;
        const newEntity = EntityCreator.createEntity({
          name,
          health,
          initiative,
        });

        if (entity.notes) {
          entity.notes.forEach(note => {
            if (note.text) {
              const notes = newEntity.get('notes');
              newEntity.set('notes', notes.push(NoteCreator.createNote(note)));
            }
          });
        }

        return newEntity;
      });
    }
  }
  return new List();
}
