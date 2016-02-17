import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.value) {
      this.setState({ value: newProps.value });
    }
  }

  render() {
    const { handleChange, handleSubmit } = this;
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
          <button
            className="search-bar__button"
            type="submit"
            disabled={disabled}>
            Search
          </button>
        </form>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.input.value);
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
