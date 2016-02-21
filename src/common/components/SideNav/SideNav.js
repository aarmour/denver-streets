import React, { Component, PropTypes } from 'react';
import NavItem from './NavItem';

export default class SideNav extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
  }

  renderItem(navItem) {
    return (
      <li key={navItem.name} className="side-nav__nav-item">
        <NavItem {...navItem} />
      </li>
    );
  }

  render() {
    const { navItems } = this.props;

    return (
      <div className="side-nav">
        <ul>
          {navItems.map(this.renderItem.bind(this))}
        </ul>
      </div>
    );
  }

}

SideNav.propTypes = {
  navItems: PropTypes.array
};
