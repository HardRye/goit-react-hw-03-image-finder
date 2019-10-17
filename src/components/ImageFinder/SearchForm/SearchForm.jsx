import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    input: '',
  };

  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleFormInput: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    const { handleFormSubmit } = this.props;
    handleFormSubmit(input);
    this.setState({ input: '' });
  };

  handleInput = ({ target }) => {
    // const { handleFormInput } = this.props;
    // handleFormInput(event);
    this.setState({ input: target.value });
  };

  render() {
    const { input } = this.state;
    return (
      <form className={styles.searchForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          className={styles.input}
          onChange={this.handleInput}
          value={input}
        />
      </form>
    );
  }
}

export default SearchForm;
