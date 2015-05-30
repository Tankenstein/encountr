import Entity from '../models/Entity.jsx';

export default {
  getEntities: function() {
    const entities = localStorage.getItem('entities');
    if (entities) {
      const parsedEntities = JSON.parse(entities);
      if (parsedEntities &&
          Array.isArray(parsedEntities) &&
          parsedEntities.length > 0 &&
          typeof parsedEntities[0] === 'object') {
        const objectEntities = parsedEntities.map(entity => {
          const healthInteger = parseInt(entity.health);
          const initiativeInteger = parseInt(entity.initiative);
          const name = entity.name;
          const newEntity = new Entity(name, initiativeInteger, healthInteger);

          if (entity.notes) {
            entity.notes.forEach(note => {
              newEntity.addNote(note);
            });
          }

          return newEntity;
        })

        return objectEntities;
      }
    }
    return [];
  },

  setEntities: function(entities) {
    localStorage.setItem('entities', JSON.stringify(entities));
  }
};