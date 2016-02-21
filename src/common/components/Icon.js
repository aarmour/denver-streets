import React, { PropTypes } from 'react';

export default function Icon(props) {
  let classes = ['fa', `fa-${props.value}`];

  if (props.size) {
    classes = [...classes, `fa-${props.size}`];
  }

  return <span className={classes.join(' ')}></span>;
}

Icon.propTypes = {
  value: PropTypes.string,
  size: PropTypes.string
};
