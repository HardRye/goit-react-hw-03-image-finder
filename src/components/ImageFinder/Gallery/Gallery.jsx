import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard/PhotoCard';
import styles from './Gallery.module.css';

const Gallery = ({ photos, handleLoadMoreButton, handleLargeImage }) => (
  <>
    <ul className={styles.gallery}>
      {photos.map(photo => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          handleLargeImage={handleLargeImage}
        />
      ))}
    </ul>
    <button
      type="button"
      className={styles.button}
      onClick={handleLoadMoreButton}
    >
      Load more
    </button>
  </>
);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      downloads: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleLoadMoreButton: PropTypes.func.isRequired,
  handleLargeImage: PropTypes.func.isRequired,
};

export default Gallery;
