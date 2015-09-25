import {Map, List} from 'immutable';

// TODO: maybe not use a singleton here?

class EntityCreator {
  id = 0;

  createEntity(entityMap) {
    const {name, initiative, health} = entityMap;
    return new Map({
      id: this.id++,
      notes: new List(),
      name,
      initiative,
      health,
    });
  }
}

export default new EntityCreator();
