import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tooltip from 'react-tooltip';
import { Icon } from '../';

export default class NavItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { name, icon, tooltip, active } = this.props;
    const tooltipId = `nav-item-tooltip-${name}`;
    const rootClass = classNames({ 'nav-item': true, 'nav-item--active': active });

    return (
      <div className={rootClass}>
        <button data-tip data-for={tooltipId} onClick={this.handleClick}>
          <Icon value={icon} size="lg" />
        </button>
        <Tooltip
          id={tooltipId}
          effect="solid"
          place="right"
        >
          <span>{tooltip}</span>
        </Tooltip>
      </div>
    );
  }

  handleClick() {
    const { onClick, name } = this.props;

    if (onClick) {
      onClick.call(null, name);
    }
  }
}

NavItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func
};

NavItem.defaultProps = {
  active: false
};
