import React, { Component, PropTypes } from 'react';
import { Icon } from '../';

export default class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: props.isOpen };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  render() {
    const { isOpen } = this.state;
    const { handleToggleClick } = this;
    const rootClass = 'panel ' + (isOpen ? 'panel--open' : '');

    return (
      <div className={rootClass}>
        <div className="panel__toggle">
          <button onClick={handleToggleClick}>
            {isOpen ? <Icon value="caret-left" /> : <Icon value="caret-right" />}
          </button>
        </div>
        <div className="panel__content">{this.props.children}</div>
      </div>
    );
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleToggleClick() {
    this.toggle();
  }

}

Panel.propTypes = {
  isOpen: PropTypes.bool
};

Panel.defaultProps = {
  isOpen: false
};
