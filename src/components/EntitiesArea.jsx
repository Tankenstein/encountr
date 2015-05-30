import React from 'react';
import EntityList from './EntityList.jsx';

class EntitiesArea extends React.Component {
  render () {
    const entities = this.props.entities;

    if (entities.length > 0) {
      return (
        <div className="row">
          <div className="col-xs-12" style={{marginBottom: "15px"}}>
            <button
              className="btn btn-success btn-block"
              onClick={this.props.onNewTurn}>
              <span className="glyphicon glyphicon-repeat"></span>  New turn
            </button>
          </div>
          <div className="col-xs-12">
            <EntityList
              entities={entities}
              onChangeHealth={this.props.onChangeHealth}
              onRemoveEntity={this.props.onRemoveEntity}
              onDrag={this.props.onDrag}
              onAddNote={this.props.onAddNote}
              onRemoveNote={this.props.onRemoveNote} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-xs-12">
            <div
              className="alert alert-info"
              role="alert">
              <p>You haven't added any entities yet.</p>
            </div>
          </div>    
        </div>
      );
    }
  }
}

export default EntitiesArea;