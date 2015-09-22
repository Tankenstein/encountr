import React, {Component} from 'react';

class EntityNote extends Component {
  render() {
    return (
      <li>
        {this.props.note}
      </li>
    );
  }
}

export default EntityNote;
