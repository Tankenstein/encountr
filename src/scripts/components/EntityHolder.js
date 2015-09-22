import React, {Component} from 'react';

import EntityHolderHealthForm from './EntityHolderHealthForm';

class EntityHolder extends Component {
  constructor(props) {
    super(props);

    this.state = {notesOpened: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.entity !== this.props.entity ||
      nextProps.active !== this.props.active ||
      this.state.notesOpened !== nextState.notesOpened);
  }

  getEntityClass() {
    const {entity, active} = this.props;
    const isDead = entity.get('health') <= 0;

    if (isDead && !active) {
      return 'entity-dead';
    } else if (active && !isDead) {
      return 'entity-active';
    } else if (active && isDead) {
      return 'entity-dead-active';
    }

    return 'entity';
  }

  render() {
    const {entity, entityMutations} = this.props;
    const {removeEntity, changeEntityHealth} = entityMutations;
    return (
      <li className={this.getEntityClass()}>
        <div className="row">
          <div className="entity-text-column">
            <b>{entity.get('name')}</b> with
            {' '}
            <b>{entity.get('health')}</b> hp
            <button
              type="button"
              className="close visible-xs"
              onClick={() => removeEntity(entity)}>
              &times;
            </button>
          </div>

          <div className="entity-actions-column">
            <EntityHolderHealthForm
              onHealthChange={health => changeEntityHealth(entity, health)}/>
          </div>

          <div className="entity-big-close-container">
            <button
              type="button"
              className="close"
              onClick={() => removeEntity(entity)}>
              &times;
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default EntityHolder;
