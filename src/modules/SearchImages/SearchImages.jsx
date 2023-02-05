import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState, useEffect, useCallback } from 'react';

import Modal from 'shared/components/Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import ImageModal from './ImageModal/ImageModal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../../shared/components/Button/Button';
import Loader from 'shared/components/Loader/Loader';
import { getImages } from '../../shared/services/pixabey-api';

import './search-images.module.scss';

const SearchImages = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getImages(search, page);
        const { hits, totalHits } = data;
        setTotalHits(totalHits);
        if (hits.length <= 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        Notify.success(`Hooray! We found ${totalHits} images.`);
        setItems(prevState => [...prevState, ...hits]);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, search]);

  const imagesSearch = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const showImageModal = useCallback(data => {
    setImageModal(data);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImageModal(null);
  }, []);

  return (
    <>
      <Searchbar onSubmit={imagesSearch} />
      <ImageGallery items={items} showImageModal={showImageModal} />
      {error && <p>{error.massage}</p>}
      {loading && <Loader />}
      {items.length > 0 && items.length < totalHits && (
        <Button loadMore={loadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal closeModal={closeModal}>
          <ImageModal {...imageModal} />
        </Modal>
      )}
    </>
  );
};

export default SearchImages;
