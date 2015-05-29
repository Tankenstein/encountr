import IDService from '../services/IDService';

class Entity {
  constructor (name, initiative, health) {
    this.id = IDService.getId();
    this.name = name;
    this.initiative = initiative;
    this.health = health;
  }
}

export default Entity;