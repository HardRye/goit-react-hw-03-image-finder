import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  static propTypes = {
    handleFormSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    const { handleFormSubmit } = this.props;
    handleFormSubmit(input);
    this.setState({ input: '' });
  };

  handleInput = ({ target }) => {
    this.setState({ input: target.value });
  };

  render() {
    const { input } = this.state;
    return (
      <header className={styles.searchBar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            value={input}
            className={styles.searchFormInput}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
