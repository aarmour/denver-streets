import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class InfoListItem extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { title, query } = this.props;

    return (
      <div className="info-list-item">
        <div className="info-list-item__title">
          <Link to={`/search/q/${query}`}>{title}</Link>
        </div>
        <div className="info-list-item__content">
        </div>
      </div>
    );
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleClick() {
    this.toggle();
  }

}

InfoListItem.propTypes = {
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};
