import React, { PropTypes } from 'react';
import { Icon } from '../';

export default function Pagination(props) {
  const { hasNext, hasPrev, onSelectNext, onSelectPrev } = props;

  return (
    <div className="pagination">
      <button disabled={!hasPrev} onClick={onSelectPrev}>
        <Icon value="chevron-left" />
      </button>
      <button disabled={!hasNext} onClick={onSelectNext}>
        <Icon value="chevron-right" />
      </button>
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
