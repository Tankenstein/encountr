import React, { Component } from 'react';

import createNote from '../services/createNote';

class EntityNoteForm extends Component {
  constructor() {
    super();
    this.state = {note: ''};
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.addNote();
  }

  onNoteChange(event) {
    const note = event.target.value;
    this.setState({note});
  }

  addNote() {
    const { note } = this.state;
    const { addEntityNote } = this.props;
    const trimmedNote = note.trim();
    if (trimmedNote.length > 0) {
      addEntityNote(createNote(trimmedNote));
      this.setState({ note: '' });
    }
  }

  render() {
    const { note } = this.state;

    return (
      <div className="entity-note-form-container">
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Note"
              value={note}
              onChange={this.onNoteChange.bind(this)} />
            <span className="input-group-btn">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.addNote.bind(this)}>
                Add
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default EntityNoteForm;
