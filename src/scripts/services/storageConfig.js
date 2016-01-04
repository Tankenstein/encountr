import { fromJS } from 'immutable';

const STORAGE_KEY = 'encountr_entities';

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
      return {
        error: '',
        entities,
      };
    }
  },
};

export default storageConfig;
