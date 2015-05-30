import IDService from '../services/IDService';

class Entity {
  constructor (name, initiative, health) {
    this.id = IDService.getId();
    this.name = name;
    this.initiative = initiative;
    this.health = health;
    this.notes = [];
  }

  addNote(note) {
    this.notes.unshift(note);
  }

  removeNote(note) {
    let noteIndex = this.notes.indexOf(note);
    this.notes.splice(noteIndex, 1);
  }
}

export default Entity;