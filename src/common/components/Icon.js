import React from 'react';

export default function Icon(props) {
  const classes = ['fa', `fa-${props.value}`];

  return <span className={classes.join(' ')}></span>;
}
