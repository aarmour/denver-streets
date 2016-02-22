import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Icon(props) {
  const { style, size } = props;
  const classes = classNames(
    'fa', `fa-${props.value}`, { [`fa-${size}`]: typeof size !== 'undefined' });

  return <span className={classes} style={style}></span>;
}

Icon.propTypes = {
  value: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object
};

Icon.defaultProps = {
  style: {}
};
