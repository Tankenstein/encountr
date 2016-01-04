import { Map, List } from 'immutable';
import { v4 as uuid } from 'uuid';

export default function createEntity(entityMap) {
  const { name, initiative, health } = entityMap;
  return new Map({
    id: uuid(),
    notes: new List(),
    name,
    initiative,
    health,
  });
}
