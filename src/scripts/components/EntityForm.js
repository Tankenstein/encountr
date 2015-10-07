import React, {Component} from 'react';
import entityCreator from '../services/entityCreator';

// TODO: split this module out more, maybe store form state in reducer

class EntityForm extends Component {
  static NAME_ERROR = 'Please name your entity.';
  static INITIATIVE_ERROR = 'Please add an initiative number';
  static HEALTH_ERROR = 'Please add a health number';

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      initiative: '',
      health: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const {health, initiative, name} = this.state;
    const {removeError, addEntity} = this.props;
    const {isValidNumberString, isValidString} = EntityForm;

    if (!isValidString(name)) {
      return this.props.setError(EntityForm.NAME_ERROR);
    } else if (initiative.trim().length === 0 || !isValidNumberString(initiative)) {
      return this.props.setError(EntityForm.INITIATIVE_ERROR);
    } else if (health.trim().length === 0 || !isValidNumberString(health)) {
      return this.props.setError(EntityForm.HEALTH_ERROR);
    }

    removeError();
    addEntity(entityCreator.createEntity({
      health: parseInt(health.trim(), 10),
      initiative: parseInt(initiative.trim(), 10),
      name: name.trim(),
    }));

    this.setState({
      name: '',
      health: '',
      initiative: '',
    });
  }

  linkState(stateName) {
    return (event) => {
      const oldState = this.state;
      oldState[stateName] = event.target.value;
      this.setState(oldState);
    };
  }

  static isValidNumberString(str) {
    const trimmedString = str.trim();
    return !isNaN(trimmedString) && trimmedString.indexOf('.') === -1;
  }

  static isValidString(str) {
    return str.trim().length > 0;
  }

  render() {
    const valids = {
      name: true,
      initiative: EntityForm.isValidNumberString(this.state.initiative),
      health: EntityForm.isValidNumberString(this.state.health),
    };

    const invalidClass = 'has-error';

    return (
      <div className="entity-form-row">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-column">
            <div className={valids.name ? '' : invalidClass}>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={this.state.name}
                onChange={this.linkState('name')} />
            </div>
          </div>

          <div className="form-column">
            <br className="visible-xs-block" />
            <div className={valids.initiative ? '' : invalidClass}>
              <input
                type="text"
                className="form-control"
                placeholder="Initiative"
                value={this.state.initiative}
                onChange={this.linkState('initiative')} />
            </div>
          </div>

          <div className="form-column">
            <br className="visible-xs-block" />
            <div className={valids.health ? '' : invalidClass}>
              <input
                type="text"
                className="form-control"
                placeholder="Health"
                value={this.state.health}
                onChange={this.linkState('health')} />
            </div>
          </div>

          <div className="form-column">
            <br className="visible-xs-block" />
            <button
              className="entity-form-button"
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
