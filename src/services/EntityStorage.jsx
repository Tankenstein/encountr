import IDService from '../services/IDService';

export default {
  getEntities: function() {
    let entities = localStorage.getItem('entities');
    if (entities) {
      let parsedEntities = JSON.parse(entities);
      if (parsedEntities &&
          Array.isArray(parsedEntities) &&
          parsedEntities.length > 0 &&
          typeof parsedEntities[0] === 'object') {
        let objectEntities = parsedEntities.map(entity => {
          let healthInteger = parseInt(entity.health);
          let initiativeInteger = parseInt(entity.initiative);
          entity.health = healthInteger;
          entity.initiative = initiativeInteger;

          return entity;
        })

        let highestID = 0;
        objectEntities.forEach(entity => {
          if (entity.id >= highestID) {
            highestID = entity.id + 1;
          }
        });
        IDService.setId(highestID);

        return objectEntities;
      }
    }
    return [];
  },

  setEntities: function(entities) {
    localStorage.setItem('entities', JSON.stringify(entities));
  }
};