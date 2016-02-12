import React, { Component, PropTypes } from 'react';

export default class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: props.isOpen };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  get styles() {
    const { isOpen } = this.state;

    return {

      root: {
        position: 'absolute',
        top: 0,
        left: isOpen ? 0 : -350,
        width: 350,
        height: '100%',
        zIndex: 1,
        backgroundColor: '#ffffff',
        boxShadow: '1px 0px 2px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease-in-out'
      },

      toggle: {
        position: 'absolute',
        top: '50%',
        left: '100%',
        marginTop: -21
      },

      toggleButton: {
        height: 42,
        color: '#ffffff',
        background: '#0074e4',
        border: 0,
        outline: 0
      },

      content: {
        height: 'inherit',
        overflowY: 'scroll'
      }

    };
  }

  render() {
    const styles = this.styles;
    const { isOpen } = this.state;
    const { handleToggleClick } = this;

    return (
      <div style={styles.root}>
        <div style={styles.toggle}>
          <button style={styles.toggleButton} onClick={handleToggleClick}>
            {isOpen ? '≪' : '≫'}
          </button>
        </div>
        <div style={styles.content}>{this.props.children}</div>
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
