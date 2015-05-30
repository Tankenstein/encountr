import React from 'react';

class Note extends React.Component {
  onRemove () {
    this.props.onRemove(this.props.note);
  }

  render () {
    return (
      <li
        className="notes-list-item">
        <button
          type="button"
          className="close"
          aria-label="Remove"
          onClick={this.onRemove.bind(this)}
          style={{marginRight:'5px', float:'left'}}>
          <span
            className="text-danger"
            aria-hidden="true">
            &times;
          </span>
        </button>
        {this.props.note}
      </li>
    );
  }
}

export default Note;