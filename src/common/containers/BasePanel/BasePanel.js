import React, { Component } from 'react';

export default class BasePanel extends Component {

  render() {
    const props = this.props;

    return (
      <div className="base-panel">
        <div className="base-panel__search-bar-spacer"></div>
        {props.children}
      </div>
    );
  }

}
