import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get styles() {
    const { disabled } = this.props;

    return {
      input: {
        width: '100%',
        padding: '8px 72px 10px 20px',
        border: 0,
        color: disabled ? '#b6b6b6' : '#333333',
        outline: 0,
        transition: 'color 0.1s ease-out'
      },

      button: {
        display: 'inline-block',
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 6,
        border: 0,
        fontSize: '0.8em',
        color: '#ffffff',
        backgroundColor: disabled ? '#b2dbff' : '#0074e4',
        transition: 'background 0.1s ease-out'
      }

    };
  }

  render() {
    const { styles, handleSubmit } = this;
    const { placeholder, disabled } = this.props;

    return (
      <div>
        <form role="search" onSubmit={handleSubmit}>
          <input
            ref={ref => this.input = ref}
            style={styles.input}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            tabIndex="1"
            placeholder={placeholder}
            disabled={disabled} />
          <button style={styles.button} type="submit" disabled={disabled}>Search</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.input.value);
  }

}

SearchBar.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  disabled: false,
  placeholder: ''
};
