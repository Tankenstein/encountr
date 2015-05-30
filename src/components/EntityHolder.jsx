import React from 'react';

class EntityHolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notesOpened: false
    };
  }

  onHeal () {
    const inputNode = React.findDOMNode(this.refs.healthInput)
    let amount = inputNode.value.trim();

    if (amount.length > 0 && !isNaN(amount)) {
      amount = parseInt(amount);
      this.props.onChangeHealth(this.props.entity.id, amount);
      inputNode.value = '';
    }
  }

  onDamage () {
    const inputNode = React.findDOMNode(this.refs.healthInput)
    let amount = inputNode.value.trim();

    if (amount.length > 0 && !isNaN(amount)) {
      amount = parseInt(amount);
      this.props.onChangeHealth(this.props.entity.id, 0 - amount);
      inputNode.value = '';
    }
  }

  onRemoveEntity () {
    this.props.onRemoveEntity(this.props.entity.id);
  }

  getLiClassName () {
    const entity = this.props.entity;
    let liClassName = 'list-group-item';

    if (this.props.active) {
      liClassName += ' active';
    }

    if (entity.health <= 0) {
      const dangerClass = ' list-group-item-danger';
      if (this.props.active) {
        liClassName = liClassName.replace(' active', '');
      }
      
      liClassName += dangerClass;
    }

    return liClassName;
  }


  render () {
    const liClassName = this.getLiClassName();
    const entity = this.props.entity;

    return (
      <li
        className={liClassName}
        draggable="true"
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
        data-id={entity.id} >
        <div className="row">
          <div className="col-xs-4 col-sm-6 col-lg-7" style={{paddingTop:'5px'}}>
            <b> {entity.name} </b> with
            <b> {entity.health} </b> hp
          </div>

          <div className="col-xs-8 col-sm-6 col-lg-5" style={{textAlign: 'right'}}>

            <div className="col-xs-11">
              <div className="input-group input-group-sm">
                <span className="input-group-btn">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={this.onHeal.bind(this)} >
                    Heal
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  ref="healthInput" />
                <span className="input-group-btn">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.onDamage.bind(this)} >
                    Damage
                  </button>
                </span>
              </div>
            </div>

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