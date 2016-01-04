import React, { Component } from 'react';

class EntityHealthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health: '',
    };
  }

  onHealthInputChange(event) {
    const health = event.target.value.trim();
    this.setState({ health });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.changeHealth(true);
  }

  changeHealth(isHeal) {
    const { health } = this.state;
    const { onHealthChange } = this.props;
    if (health.length > 0 && EntityHealthForm.isValidHealthString(health)) {
      const parsedHealth = (isHeal ? 1 : -1) * parseInt(health, 10);
      onHealthChange(parsedHealth);
      this.setState({ health: '' });
    }
  }

  static isValidHealthString(health) {
    const trimmedHealth = health.trim();
    return !isNaN(trimmedHealth) && trimmedHealth.indexOf('.') === -1;
  }

  render() {
    const { health } = this.state;
    const isValidHealth = health.length === 0 || EntityHealthForm.isValidHealthString(health);
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <div className={isValidHealth ? '' : 'has-error'}>
          <div className="input-group input-group-sm">
            <span className="input-group-btn">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => this.changeHealth(true)} >
                Heal
              </button>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              value={health}
              onChange={this.onHealthInputChange.bind(this)} />
            <span className="input-group-btn">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => this.changeHealth(false)} >
                Damage
              </button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default EntityHealthForm;
