import React, { PropTypes } from 'react';
import Tooltip from 'react-tooltip';
import { Icon } from '../';

export default function NavItem(props) {
  const { name, tooltip } = props;
  const tooltipId = `nav-item-tooltip-${name}`;

  return (
    <div className="nav-item">
      <button data-tip data-for={tooltipId}>
        <Icon value={props.icon} size="lg" />
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

NavItem.propTypes = {
  icon: PropTypes.string
};
