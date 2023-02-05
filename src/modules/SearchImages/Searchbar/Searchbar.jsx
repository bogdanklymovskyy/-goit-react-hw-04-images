import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState, memo } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.scss';

import initialState from './initialState';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });
  const { search } = state;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      Notify.info('Please enter what to search for!');
      return;
    }
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={styles.SearchFormButton}
          onClick={handleSubmit}
        >
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          value={search}
          onChange={handleChange}
          name="search"
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
