import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const Gallery = ({ photos, handleLargeImage }) => (
  <ul className={styles.imageGallery}>
    {photos.map(photo => (
      <ImageGalleryItem
        key={photo.id}
        id={photo.id}
        imageSrc={photo.webformatURL}
        alt={photo.tags}
        handleLargeImage={handleLargeImage}
      />
    ))}
  </ul>
);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleLargeImage: PropTypes.func.isRequired,
};

export default Gallery;
