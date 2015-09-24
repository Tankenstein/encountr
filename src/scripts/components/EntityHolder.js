import React, {Component} from 'react';

import EntityHealthForm from './EntityHealthForm';
import EntityNoteList from './EntityNoteList';
import EntityNoteForm from './EntityNoteForm';

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

  getNotesButtonIconClass() {
    if (this.state.notesOpened) {
      return 'entity-notes-icon-close';
    } else if (this.props.entity.get('notes').size > 0) {
      return 'entity-notes-icon-open';
    }

    return 'entity-notes-icon-write';
  }

  toggleNotes() {
    this.setState({notesOpened: !this.state.notesOpened});
  }

  render() {
    const {entity, entityMutations} = this.props;
    const {
      removeEntity,
      changeEntityHealth,
      addEntityNote,
      removeEntityNote,
    } = entityMutations;
    const {notesOpened} = this.state;

    const noteNodes = [
      <EntityNoteForm
        addEntityNote={note => addEntityNote(entity, note)}
        key="EntityNoteForm"/>,
      <EntityNoteList
        removeEntityNote={note => removeEntityNote(entity, note)}
        notes={entity.get('notes')}
        key="EntityNoteList" />,
    ];

    return (
      <li className={this.getEntityClass()}>
        <div className="row">
          <div className="entity-text-column">
            <b>{entity.get('name')}</b> with
            {' '}
            <b>{entity.get('health')}</b> hp
            <button
              type="button"
              className="entity-small-close-button"
              onClick={() => removeEntity(entity)}>
              &times;
            </button>
          </div>

          <div className="entity-actions-column">
            <div className="entity-health-form-column">
              <EntityHealthForm
                onHealthChange={health => changeEntityHealth(entity, health)} />
            </div>
            <div className="entity-notes-toggler-column">
              <button
                className="entity-notes-toggler"
                onClick={this.toggleNotes.bind(this)}>
                <span className={this.getNotesButtonIconClass()} />
              </button>
            </div>
          </div>

          <div className="entity-big-close-container">
            <button
              type="button"
              className="close"
              onClick={() => removeEntity(entity)}>
              &times;
            </button>
          </div>

          {notesOpened ? noteNodes : ''}
        </div>
      </li>
    );
  }
}

export default EntityHolder;
