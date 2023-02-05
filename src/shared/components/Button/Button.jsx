import PropTypes from 'prop-types';

import styles from './button.module.scss';

const Button = ({ children, loadMore }) => {
  return (
    <button onClick={loadMore} className={styles.Button}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  loadMore: PropTypes.func.isRequired,
};
