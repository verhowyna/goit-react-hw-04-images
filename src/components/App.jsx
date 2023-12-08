import { useState, useEffect } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { getImage } from 'components/axios';

import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getGallery() {
      try {
        setIsLoading(true);

        const finalQuery = query.split('/').pop().trim();

        if (finalQuery === '') {
          return toast('Please enter something for search');
        }

        const initialParams = {
          q: finalQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          page: page,
          per_page: 12,
        };

        const fetch = await getImage(initialParams);

        if (fetch.total === 0) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setImages(prevImages => [...prevImages, ...fetch.hits]);
          setTotalImages(fetch.totalHits);
        }
      } catch (error) {
        toast.error('Oops! Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    getGallery();
  }, [query, page]);

  const addQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery.query}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar addQuery={addQuery} />
      <div style={{ paddingTop: '10px' }}>
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {images.length >= 12 && totalImages > images.length && (
          <Button loadMore={handleLoadMore} />
        )}
        <Toaster position="right" />
      </div>
    </>
  );
};
