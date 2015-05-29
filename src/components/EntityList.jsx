import React from 'react';
import EntityHolder from './EntityHolder.jsx';

class EntityList extends React.Component {
  componentDidMount() {
    this.dragPlaceHolder = document.createElement('li');
    this.dragPlaceHolder.className = 'drag-placeholder';
  }

  onDragStart(e) {
    this.dragTarget = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget); // firefox shim
  }

  onDragEnd(e) {
    if (this.dragLastParent) {
      this.dragTarget.style.display = 'block';

      this.dragLastParent.removeChild(this.dragPlaceHolder);

      let from = parseInt(this.dragTarget.dataset.id);
      let to = parseInt(this.dragOver.dataset.id);
      this.dragLastParent = null;
      this.props.onDrag(from, to);
    }
  }

  onDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    this.dragTarget.style.display = 'none';
    
    if (e.target.className !== 'drag-placeholder') {
      this.dragOver = e.target;
      let parentNode = this.dragOver.parentNode;
      if (parentNode.nodeName === 'UL') {
        this.dragLastParent = parentNode;
        parentNode.insertBefore(this.dragPlaceHolder, this.dragOver);
      }
    }
  }

  render () {
    const entities = this.props.entities;

    let entityNodes = entities.map((entity, index) => {
      let active = index === 0;
      
      return (
        <EntityHolder
          entity={entity}
          active={active}
          key={entity.id}
          onChangeHealth={this.props.onChangeHealth}
          onRemoveEntity={this.props.onRemoveEntity}
          onDragStart={this.onDragStart.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)} />
      );
    });

    return (
      <ul
        className="list-group"
        onDragOver={this.onDragOver.bind(this)} >
        {entityNodes}
      </ul>
    );
  }
}

export default EntityList;