import React, { Component, PropTypes } from 'react';
import { Icon } from '../';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.value) {
      this.setState({ value: newProps.value });
    }
  }

  render() {
    const { handleChange, handleSubmit, handleClickClear } = this;
    const { value } = this.state;
    const { placeholder, disabled } = this.props;

    return (
      <div className="search-bar">
        <form role="search" onSubmit={handleSubmit}>
          <input
            ref={ref => this.input = ref}
            className="search-bar__input"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            tabIndex="1"
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={handleChange} />
          <div className="search-bar__button-container">
            <button
              className="search-bar__button"
              type="submit"
              disabled={disabled}>
              <Icon value="search" />
            </button>
            <button
              className="search-bar__button"
              disabled={disabled}
              onClick={handleClickClear}>
              <Icon value="close" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  clear() {
    this.setState({ value: '' });
  }

  focus() {
    this.input.focus();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.input.value);
  }

  handleClickClear() {
    this.clear();
    this.focus();
  }

}

SearchBar.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  value: '',
  disabled: false,
  placeholder: ''
};
