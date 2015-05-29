import React from 'react/addons';
import Entity from '../models/Entity.jsx';

class EntityForm extends React.Component {
  constructor (props) {
    super(props);

    this.linkState = React.addons.LinkedStateMixin.linkState;

    this.cleanState = {
      name: '',
      initiative: '',
      health: ''
    };

    this.state = this.cleanState;
  }

  submit () {
    let oldState = this.state;
    if (oldState.name.length > 0 && oldState.initiative.length > 0 && oldState.health.length > 0) {
      if (!isNaN(oldState.initiative) && !isNaN(oldState.health)) {
        let initiative = parseInt(oldState.initiative);
        let health = parseInt(oldState.health);

        let newEntity = new Entity(oldState.name, initiative, health);
        
        this.props.onSubmit(newEntity);

        this.setState(this.cleanState);
      }
    }
  }

  render () {
    return (
      <div className="row" style={this.props.style}>
        <div className="col-xs-6 col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            valueLink={this.linkState('name')} />
        </div>
        
        <div className="col-xs-6 col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="Initiative"
            valueLink={this.linkState('initiative')} />
        </div>
        
        <div className="col-xs-6 col-sm-3">
          <br className="visible-xs-block" />
          <input
            type="text"
            className="form-control"
            placeholder="Health"
            valueLink={this.linkState('health')} />
        </div>
        <div className="col-xs-6 col-sm-3">
          <br className="visible-xs-block" />
          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={this.submit.bind(this)}>
            <span
              className="glyphicon glyphicon-plus"
              aria-hidden="true" /> Add
          </button>
        </div>
      </div>
    );
  }
}

export default EntityForm;