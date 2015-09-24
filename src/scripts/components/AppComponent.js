import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  addEntity,
  removeEntity,
  changeEntityHealth,
  addEntityNote,
  removeEntityNote,
  newTurn,
} from '../actions/entityActions';
import {setError, removeError} from '../actions/errorActions';

import EntityForm from './EntityForm';
import EntityList from './EntityList';
import ErrorComponent from './ErrorComponent';
import NewTurnButton from './NewTurnButton';

@connect(state => state)
class AppComponent extends Component {

  render() {
    const {dispatch, entities, error} = this.props;
    const entityMutations = {
      removeEntity: entity => dispatch(removeEntity(entity)),
      changeEntityHealth: (e, hp) => dispatch(changeEntityHealth(e, hp)),
      addEntityNote: (e, n) => dispatch(addEntityNote(e, n)),
      removeEntityNote: (e, n) => dispatch(removeEntityNote(e, n)),
    };

    const entityAdder = entity => dispatch(addEntity(entity));

    const entityHandlerNodes = [
      <NewTurnButton
        key="newTurnButton"
        onNewTurn={() => dispatch(newTurn())}/>,
      <EntityList
        key="entityList"
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
        removeError={() => dispatch(removeError())} />
    );

    return (
      <div>
        <EntityForm
          addEntity={entityAdder}
          setError={errorName => dispatch(setError(errorName))}
          removeError={() => dispatch(removeError())}/>
        {error ? errorComponent : ''}
        {entities.size ? entityHandlerNodes : noEntitiesNode}
      </div>
    );
  }
}

export default AppComponent;
