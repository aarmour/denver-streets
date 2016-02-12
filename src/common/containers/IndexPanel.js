import React, { Component } from 'react';
import { Link } from 'react-router';

export default class IndexPanel extends Component {

  render() {
    return (
      <div>
        <Link to={'/search/q/light+rail'}>Search for light rail stations</Link>
      </div>
    );
  }

}
