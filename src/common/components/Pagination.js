import React, { PropTypes } from 'react';

export default function Pagination(props) {
  const { hasNext, hasPrev, onSelectNext, onSelectPrev } = props;

  return (
    <div>
      <button disabled={!hasPrev} onClick={onSelectPrev}>Previous</button>
      <button disabled={!hasNext} onClick={onSelectNext}>Next</button>
    </div>
  );
}

Pagination.propTypes = {
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  onSelectNext: PropTypes.func.isRequired,
  onSelectPrev: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  hasNext: true,
  hasPrev: true
};
