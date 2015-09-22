import React, {Component} from 'react';

class ErrorComponent extends Component {
  render() {
    const {error} = this.props;
    return (
      <div className="row">
        <div className="col-xs-12">
          <div
            className="alert alert-danger"
            role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            <span>{error}</span>
            <button
              type="button"
              className="close"
              onClick={this.props.removeError}
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorComponent;
