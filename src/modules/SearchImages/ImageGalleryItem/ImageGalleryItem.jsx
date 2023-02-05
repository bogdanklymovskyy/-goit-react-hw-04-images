import { memo } from 'react';

import PropTypes from 'prop-types';

import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ items, showImageModal }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li
      onClick={() => showImageModal({ largeImageURL, tags })}
      key={id}
      className={styles.ImageGalleryItem}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  ));
};

export default memo(ImageGalleryItem);

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  showImageModal: PropTypes.func,
};
