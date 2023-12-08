import { useState } from 'react';

import { ImgModal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <li>
      <img
        src={webformatURL}
        className={css.imageListItem}
        alt={tags}
        loading="lazy"
        onClick={openModal}
      />
      <ImgModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageURL={largeImageURL}
        imageDescription={tags}
      />
    </li>
  );
};
