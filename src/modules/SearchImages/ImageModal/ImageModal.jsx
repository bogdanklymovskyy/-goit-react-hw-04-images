import PropTypes from 'prop-types';

const ImageModal = ({ largeImageURL, tags }) => {
  return <img src={largeImageURL} alt={tags} />;
};
export default ImageModal;

ImageModal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
