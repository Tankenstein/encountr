import React from 'react';
import EntityForm from './EntityForm.jsx';
import EntitiesArea from './EntitiesArea.jsx';

import Entity from '../models/Entity.jsx';

import EntityStorage from '../services/EntityStorage.jsx';

class MainComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      entities: []
    };
  }

  getEntityIndexById(entityId) {
    for (let i = 0; i < this.state.entities.length; i++) {
      if (this.state.entities[i].id === entityId) {
        return i;
      }
    }

    return -1;
  }

  componentWillMount () {
    let state = this.state;
    state.entities = EntityStorage.getEntities();
    this.setState(state);
  }

  doTurn () {
    let state = this.state;
    let firstEntity = state.entities.shift();
    state.entities.push(firstEntity);
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  changeEntityHealth (entityId, health) {
    let state = this.state;
    let entityIndex = this.getEntityIndexById(entityId);
    state.entities[entityIndex].health += health;
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  removeEntity (entityId) {
    let state = this.state;
    let entityIndex = this.getEntityIndexById(entityId);
    state.entities.splice(entityIndex, 1);
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  addEntityNote (entityId, note) {
    let state = this.state;
    let entityIndex = this.getEntityIndexById(entityId);
    state.entities[entityIndex].addNote(note);
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  removeEntityNote (entityId, note) {
    let state = this.state;
    let entityIndex = this.getEntityIndexById(entityId);
    state.entities[entityIndex].removeNote(note);
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  addNewEntity (entity) {
    let state = this.state;
    for (let i = 0; i <= state.entities.length; i++) {
      if (i === state.entities.length) {
        state.entities.push(entity);
        break;
      } else if (entity.initiative >= state.entities[i].initiative) {
        state.entities.splice(i, 0, entity);
        break;
      }
    }
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  changeOrderByDrag(from, to) {
    let fromIndex = this.getEntityIndexById(from);
    let toIndex = this.getEntityIndexById(to);
    let state = this.state;
    state.entities.splice(toIndex, 0, state.entities.splice(fromIndex, 1)[0]);
    this.setState(state);
    EntityStorage.setEntities(state.entities);
  }

  render () {
    return (
      <div>
        <EntityForm
          onSubmit={this.addNewEntity.bind(this)}
          style={{marginBottom: "15px"}}/>
      
        <EntitiesArea
          entities={this.state.entities}
          onNewTurn={this.doTurn.bind(this)}
          onChangeHealth={this.changeEntityHealth.bind(this)}
          onRemoveEntity={this.removeEntity.bind(this)}
          onDrag={this.changeOrderByDrag.bind(this)} 
          onRemoveNote={this.removeEntityNote.bind(this)}
          onAddNote={this.addEntityNote.bind(this)} />
      </div>
    );
  }
}

export default MainComponent;