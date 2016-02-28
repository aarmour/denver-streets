import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tooltip from 'react-tooltip';
import { Icon } from '../';

export default class NavItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  get tooltipId() {
    return `nav-item-tooltip-${this.props.name}`;
  }

  renderTooltip() {
    const { tooltip } = this.props;

    if (tooltip) {
      return (
        <Tooltip
          id={this.tooltipId}
          effect="solid"
          place="right"
        >
          <span>{tooltip}</span>
        </Tooltip>
      );
    }
  }

  render() {
    const { icon, tooltip, active } = this.props;
    const rootClass = classNames({ 'nav-item': true, 'nav-item--active': active });
    const tooltipAttrs = tooltip ? { 'data-tip': true, 'data-for': this.tooltipId } : {};

    return (
      <div className={rootClass}>
        <button {...tooltipAttrs} onClick={this.handleClick}>
          <Icon value={icon} size="lg" />
        </button>
        {this.renderTooltip()}
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
  tooltip: PropTypes.string,
  onClick: PropTypes.func
};

NavItem.defaultProps = {
  active: false
};
