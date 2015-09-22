import React, {Component} from 'react';

import EntityHolder from './EntityHolder';

class EntityList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.entities !== this.props.entities;
  }

  render() {
    const {entities} = this.props;
    return (
      <ul className="entity-list">
        {
          entities.map((entity, index) => {
            return (
              <EntityHolder
                entityMutations={this.props.entityMutations}
                key={entity.get('id')}
                entity={entity}
                active={index === 0} />
            );
          })
        }
      </ul>
    );
  }
}

export default EntityList;
