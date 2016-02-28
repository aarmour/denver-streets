import React, { Component } from 'react';

export default class InfoList extends Component {

  render() {
    return (
      <div className="info-list">
        {this.props.children}
      </div>
    );
  }

}
