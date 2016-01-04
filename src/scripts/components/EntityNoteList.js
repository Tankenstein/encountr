import React, { Component } from 'react';

import EntityNote from './EntityNote';

class EntityNoteList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notes !== this.props.notes;
  }

  render() {
    const { notes, removeEntityNote } = this.props;

    const noteNodes = notes.map(note => (
      <EntityNote
        removeEntityNote={removeEntityNote}
        note={note}
        key={note.get('id')} />
    ));

    return (
      <div className="entity-note-list-container">
        <ul className="entity-note-list">
          {noteNodes}
        </ul>
      </div>
    );
  }
}

export default EntityNoteList;
