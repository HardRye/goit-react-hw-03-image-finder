import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  state = {
    isModalOpen: true,
  };

  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    handleModalClose: PropTypes.func.isRequired,
  };

  overlayRef = createRef();

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress = event => {
    if (event.code !== 'Escape') return;
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    this.props.handleModalClose();
  };

  handleOverlayClick = event => {
    const { current } = this.overlayRef;
    if (current && event.target !== current) return;
    this.toggleModal();
  };

  render() {
    const { largeImageURL } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        {isModalOpen && (
          <div
            className={styles.overlay}
            onClick={this.handleOverlayClick}
            ref={this.overlayRef}
            role="presentation"
          >
            <div className={styles.modal}>
              <img src={largeImageURL} alt="" className={styles.img} />
            </div>
          </div>
        )}
      </>
    );
  }
}
Modal.propTypes = {
  // bla: PropTypes.string,
};
Modal.defaultProps = {
  // bla: 'test',
};
export default Modal;
