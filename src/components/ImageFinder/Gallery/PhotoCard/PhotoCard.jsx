import React from 'react';
import styles from './PhotoCard.module.css';

const GalleryItem = ({
  photo: {
    id,
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    downloads,
    tags,
  },
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

    {/* <!-- Кнопка для открытия модалки с большим изображением, появляется при наведении --> */}
    <button type="button" className={styles.fullscreenButton}>
      <i className="material-icons">zoom_out_map</i>
    </button>
  </div>
);

export default GalleryItem;
