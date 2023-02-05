import { memo } from 'react';

import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './image-gallery.module.scss';

const ImageGallery = ({ items, showImageModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem items={items} showImageModal={showImageModal} />
    </ul>
  );
};

export default memo(ImageGallery);

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
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
