import React, { PropTypes } from 'react';

export default function List(props) {
  return (
    <div className="list">
      <ul>
        {props.items.map(item => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired
};
