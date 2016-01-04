import React, { Component } from 'react';

class EntityNote extends Component {
  render() {
    const { removeEntityNote, note } = this.props;

    return (
      <li className="entity-note">
        <button
          onClick={() => removeEntityNote(note)}
          className="entity-note-remove">
          &times;
        </button>
        {note.get('text')}
      </li>
    );
  }
}

export default EntityNote;
