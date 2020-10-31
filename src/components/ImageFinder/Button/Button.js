import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ handleLoadMoreButton }) => (
  <button
    type="button"
    className={styles.button}
    onClick={handleLoadMoreButton}
  >
    Load more
  </button>
);

Button.propTypes = {
  handleLoadMoreButton: PropTypes.func.isRequired,
};

export default Button;
