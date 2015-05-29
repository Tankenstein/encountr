import React from 'react';

class EntityHolder extends React.Component {
  onRemoveHealth () {
    this.props.onChangeHealth(this.props.entity.id, -1);
  }

  onAddHealth () {
    this.props.onChangeHealth(this.props.entity.id, 1);
  }

  onRemoveEntity () {
    this.props.onRemoveEntity(this.props.entity.id);
  }

  render () {
    const entity = this.props.entity;
    let liCLassName = 'list-group-item';

    if (this.props.active) {
      liCLassName += ' active';
    }

    if (entity.health <= 0) {
      const dangerClass = ' list-group-item-danger';
      if (this.props.active) {
        liCLassName = liCLassName.replace(' active', '');
      }
      
      liCLassName += dangerClass;
    }

    return (
      <li
        className={liCLassName}
        draggable="true"
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
        data-id={entity.id} >
        <div className="row">
          <div className="col-xs-6" style={{paddingTop:'5px'}}>
            <b> {entity.name} </b> with
            <b> {entity.health} </b> hp
          </div>

          <div className="col-xs-6" style={{textAlign: 'right'}}>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={this.onRemoveHealth.bind(this)}
              style={{marginRight:'5px'}}>
              <b>-</b> <span aria-hidden="true" className="glyphicon glyphicon-heart"></span>
            </button>

            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={this.onAddHealth.bind(this)}
              style={{marginRight:'5px'}}>
              <b>+</b> <span aria-hidden="true" className="glyphicon glyphicon-heart"></span>
            </button>

            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.onRemoveEntity.bind(this)}
              style={{paddingTop:'4px'}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </li>
    );
  }
}
 //<span className="glyphicon glyphicon-remove"></span>
export default EntityHolder;