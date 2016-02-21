import React, { Component, PropTypes } from 'react';

export default class SideNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="side-nav">
        {children}
      </div>
    );
  }

}

SideNav.propTypes = {
  children: PropTypes.node
};
