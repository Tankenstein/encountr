import React, { Component } from 'react';

class NewTurnButton extends Component {
  render() {
    return (
      <button
        className="new-turn-button"
        onClick={this.props.onNewTurn}>
        <span className="glyphicon glyphicon-repeat"></span>  New turn
      </button>
    );
  }
}

export default NewTurnButton;
