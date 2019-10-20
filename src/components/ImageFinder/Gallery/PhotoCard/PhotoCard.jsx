import React from 'react';
import PropTypes from 'prop-types';
import styles from './PhotoCard.module.css';

const GalleryItem = ({
  photo: { id, webformatURL, likes, views, comments, downloads, tags },
  handleLargeImage,
}) => (
  <div className={styles.photoCard}>
    <img src={webformatURL} alt={tags} className={styles.image} />

    <div className={styles.stats}>
      <p className={styles.statsItem}>
        <i className="material-icons">thumb_up</i>
        {likes}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">visibility</i>
        {views}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">comment</i>
        {comments}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">cloud_download</i>
        {downloads}
      </p>
    </div>

    <button
      type="button"
      className={styles.fullscreenButton}
      data-id={id}
      onClick={handleLargeImage}
    >
      <i className="material-icons" data-id={id}>
        zoom_out_map
      </i>
    </button>
  </div>
);

GalleryItem.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  handleLargeImage: PropTypes.func.isRequired,
};

export default GalleryItem;
