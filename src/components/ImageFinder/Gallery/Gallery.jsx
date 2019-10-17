import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard/PhotoCard';
import styles from './Gallery.module.css';

class Gallery extends Component {
  state = {};

  static propTypes = {
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        views: PropTypes.number.isRequired,
        comments: PropTypes.number.isRequired,
        downloads: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  render() {
    const { photos, handleLoadMoreButton } = this.props;
    return (
      <>
        <ul className={styles.gallery}>
          {photos.map(photo => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </ul>
        <button type="button" onClick={handleLoadMoreButton}>
          Load More
        </button>
      </>
    );
  }
}

export default Gallery;
