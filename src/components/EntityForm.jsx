import React from 'react';
import Entity from '../models/Entity.jsx';

class EntityForm extends React.Component {

  submit (e) {
    e.preventDefault();

    const nameNode = React.findDOMNode(this.refs.name);
    const initiativeNode = React.findDOMNode(this.refs.initiative);
    const healthNode = React.findDOMNode(this.refs.health);

    let name = nameNode.value.trim();
    let initiative = initiativeNode.value.trim();
    let health = healthNode.value.trim();

    if (name.length > 0 && initiative.length > 0 && health.length > 0) {
      if (!isNaN(initiative) && !isNaN(health)) {
        initiative = parseInt(initiative);
        health = parseInt(health);

        let newEntity = new Entity(name, initiative, health);

        this.props.onSubmit(newEntity);

        nameNode.value = '';
        initiativeNode.value = '';
        healthNode.value = '';
      }
    }

    return;
  }

  render () {
    return (
      <div className="row" style={this.props.style}>
        <form onSubmit={this.submit.bind(this)}>
          <div className="col-xs-6 col-sm-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              ref="name" />
          </div>
          
          <div className="col-xs-6 col-sm-3">
            <input
              type="text"
              className="form-control"
              placeholder="Initiative"
              ref="initiative" />
          </div>
          
          <div className="col-xs-6 col-sm-3">
            <br className="visible-xs-block" />
            <input
              type="text"
              className="form-control"
              placeholder="Health"
              ref="health" />
          </div>
          <div className="col-xs-6 col-sm-3">
            <br className="visible-xs-block" />
            <button
              className="btn btn-primary btn-block"
              type="submit">
              <span
                className="glyphicon glyphicon-plus"
                aria-hidden="true" /> Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EntityForm;