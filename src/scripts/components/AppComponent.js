import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  addEntity,
  removeEntity,
  changeEntityHealth,
  addEntityNote,
  removeEntityNote,
  newTurn,
  changeEntityOrder,
} from '../actions/entityActions';
import {setError, removeError} from '../actions/errorActions';

import EntityForm from './EntityForm';
import EntityList from './EntityList';
import ErrorComponent from './ErrorComponent';
import NewTurnButton from './NewTurnButton';

@connect(state => state)
class AppComponent extends Component {

  getEntityMutations() {
    const {dispatch} = this.props;

    return {
      removeEntity: entity => dispatch(removeEntity(entity)),
      changeEntityHealth: (entity, healthChange) => dispatch(changeEntityHealth(entity, healthChange)),
      addEntityNote: (entity, note) => dispatch(addEntityNote(entity, note)),
      removeEntityNote: (entity, note) => dispatch(removeEntityNote(entity, note)),
    };
  }

  render() {
    const {dispatch, entities, error} = this.props;
    const entityMutations = this.getEntityMutations();

    const entityAdder = entity => dispatch(addEntity(entity));
    const newTurnCreator = () => dispatch(newTurn());
    const errorSetter = errorName => dispatch(setError(errorName));
    const errorRemover = () => dispatch(removeError());
    const entityOrderChanger = (from, to) => dispatch(changeEntityOrder(from, to));

    const entityHandlerNodes = [
      <NewTurnButton
        key="newTurnButton"
        onNewTurn={newTurnCreator}/>,
      <EntityList
        key="entityList"
        changeEntityOrder={entityOrderChanger}
        entityMutations={entityMutations}
        entities={entities}/>,
    ];

    const noEntitiesNode = (
      <div className="row">
        <div className="col-xs-12">
          <div className="no-entities-alert">
            You haven't added any entities yet.
          </div>
        </div>
      </div>
    );

    const errorComponent = (
      <ErrorComponent
        error={error}
        removeError={errorRemover} />
    );

    return (
      <div>
        <EntityForm
          addEntity={entityAdder}
          setError={errorSetter}
          removeError={errorRemover}/>
        {error ? errorComponent : ''}
        {entities.size ? entityHandlerNodes : noEntitiesNode}
      </div>
    );
  }
}

export default AppComponent;
