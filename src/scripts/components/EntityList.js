import React, {Component} from 'react';

import EntityHolder from './EntityHolder';

class EntityList extends Component {
  constructor(props) {
    super(props);
    this.state = {dragging: undefined};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.entities !== this.props.entities ||
      this.state.dragging !== nextState.dragging);
  }

  onDragStart(event) {
    this.dragged = event.currentTarget.dataset ?
      parseInt(event.currentTarget.dataset.index, 10) :
      parseInt(event.currentTarget.getAttribute('data-index'), 10);
    event.dataTransfer.effectAllowed = 'move';
    try {
      event.dataTransfer.setData('text/html', null);
    } catch (__) {
      event.dataTransfer.setData('text', '');
    }
  }

  onDragEnd() {
    this.setState({dragging: undefined});
  }

  onDragOver(event) {
    event.preventDefault();
    const {changeEntityOrder} = this.props;
    const {dragging} = this.state;
    const over = event.currentTarget;
    const from = dragging !== undefined ? dragging : this.dragged;
    let to = parseInt(over.dataset.index, 10);
    const boundingRect = over.getBoundingClientRect();
    const relY = event.clientY - boundingRect.top;
    const height = over.offsetHeight / 2;
    if (relY > height) {
      to++;
    }
    if (from < to) {
      to--;
    }
    this.setState({dragging: to});
    changeEntityOrder(from, to);
  }

  render() {
    const {entities} = this.props;
    const dragEvents = {
      onDragEnd: this.onDragEnd.bind(this),
      onDragStart: this.onDragStart.bind(this),
      onDragOver: this.onDragOver.bind(this),
    };
    const entityNodes = entities.map((entity, index) => (
      <EntityHolder
        entityMutations={this.props.entityMutations}
        key={entity.get('id')}
        index={index}
        entity={entity}
        dragging={index === this.state.dragging}
        active={index === 0}
        dragEvents={dragEvents} />
    ));

    return (
      <ul
        className="entity-list">
        {entityNodes}
      </ul>
    );
  }
}

export default EntityList;
