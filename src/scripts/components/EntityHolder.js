import React, {Component} from 'react';

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
    const {removeEntity} = entityMutations;
    return (
      <li className={this.getEntityClass()}>
        <div className="row">
          <div className="entity-text-column">
            <b>{entity.get('name')}</b> with
            {' '}
            <b>{entity.get('health')}</b> hp
          </div>

          <div className="entity-actions-column">

          </div>

          <button
            type="button"
            className="close"
            onClick={() => removeEntity(entity)}>
            &times;
          </button>
        </div>
      </li>
    );
  }
}

export default EntityHolder;
