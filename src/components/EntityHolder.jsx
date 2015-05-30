import React from 'react';
import Note from './Note.jsx';

class EntityHolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notesOpened: false
    };
  }

  onHeal () {
    const inputNode = React.findDOMNode(this.refs.healthInput)
    let amount = inputNode.value.trim();

    if (amount.length > 0 && !isNaN(amount)) {
      amount = parseInt(amount);
      this.props.onChangeHealth(this.props.entity.id, amount);
      inputNode.value = '';
    }
  }

  onDamage () {
    const inputNode = React.findDOMNode(this.refs.healthInput)
    let amount = inputNode.value.trim();

    if (amount.length > 0 && !isNaN(amount)) {
      amount = parseInt(amount);
      this.props.onChangeHealth(this.props.entity.id, 0 - amount);
      inputNode.value = '';
    }
  }

  onRemoveEntity () {
    this.props.onRemoveEntity(this.props.entity.id);
  }

  onAddNote (e) {
    e.preventDefault();
    const inputNode = React.findDOMNode(this.refs.noteInput);
    const inputValue = inputNode.value.trim();
    if (inputValue.length > 0) {
      this.props.onAddNote(this.props.entity.id, inputValue);
      inputNode.value = '';
    }
  }

  onRemoveNote (note) {
    this.props.onRemoveNote(this.props.entity.id, note);
  }

  getLiClassName () {
    const entity = this.props.entity;
    let liClassName = 'list-group-item';

    if (this.props.active) {
      liClassName += ' active';
    }

    if (entity.health <= 0) {
      const dangerClass = ' list-group-item-danger';
      if (this.props.active) {
        liClassName = liClassName.replace(' active', '');
      }
      
      liClassName += dangerClass;
    }

    return liClassName;
  }

  getNotesNode () {
    if (this.state.notesOpened) {
      let notesList = '';
      if (this.props.entity.notes.length > 0) {
        const notes = this.props.entity.notes.map((note, index) => {
          return (
            <Note
              className="notes-list-item"
              key={index}
              note={note}
              onRemove={this.onRemoveNote.bind(this)} />
          );
        });

        notesList = <ul className="notes-list" > {notes} </ul>;
      }

      return (
        <div
          className="col-xs-12"
          style={{marginTop: '10px'}}>
          <form onSubmit={this.onAddNote.bind(this)}>
            <input
              type="text"
              className="form-control"
              placeholder="Add note"
              ref="noteInput" />
          </form>
          {notesList}
        </div>
      );
    } else {
      return;
    }
  }

  toggleNotes () {
    let state = this.state;
    state.notesOpened = state.notesOpened ? false : true;
    this.setState(state);
  }

  getNotesIconClass () {
    let iconClass = 'glyphicon ';
    
    if (this.state.notesOpened) {
      iconClass += 'glyphicon-menu-up';
    } else if (this.props.entity.notes.length > 0) {
      iconClass += 'glyphicon-menu-down';
    } else {
      iconClass += 'glyphicon-pencil';
    }

    return iconClass;
  }

  render () {
    const liClassName = this.getLiClassName();
    const entity = this.props.entity;
    const notesNode = this.getNotesNode();
    const notesIconClass = this.getNotesIconClass();

    return (
      <li
        className={liClassName}
        draggable="true"
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
        data-id={entity.id} >
        <div className="row">
          <div className="col-xs-4 col-sm-5 col-lg-6" style={{paddingTop:'5px'}}>
            <b> {entity.name} </b> with
            <b> {entity.health} </b> hp
          </div>

          <div className="col-xs-8 col-sm-7 col-lg-6" style={{textAlign:'right'}}>

            <div className="col-xs-9">
              <div className="input-group input-group-sm">
                <span className="input-group-btn">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={this.onHeal.bind(this)} >
                    Heal
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  ref="healthInput" />
                <span className="input-group-btn">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.onDamage.bind(this)} >
                    Damage
                  </button>
                </span>
              </div>
            </div>

            <div className="col-xs-1">
              <button
                type="button"
                className="btn btn-info btn-sm"
                aria-label="note"
                onClick={this.toggleNotes.bind(this)} >
                <span
                  aria-hidden="true"
                  className={notesIconClass} />
              </button>
            </div>
            
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.onRemoveEntity.bind(this)}
              style={{paddingTop:'4px'}}>
              <span aria-hidden="true">&times;</span>
            </button>
            
          </div>

          {notesNode}
        </div>
      </li>
    );
  }
}

export default EntityHolder;