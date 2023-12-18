'use client';
import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Modal from '../Modal';
import { ImageData } from '../../../types';
import styles from './Gallery.module.css';

interface GalleryProps {
  images: ImageData[];
}

function Gallery({ images }: GalleryProps) {
  const [activeImage, setActiveImage] =
    React.useState<ImageData | null>(null);

  const onCloseModal = React.useCallback(() => {
    setActiveImage(null);
  }, [setActiveImage]);
  const isOpenModal = !!activeImage;

  return (
    <>
      <div className={styles.gallery}>
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(styles.media, styles.item)}
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                onClick={() => {
                  setActiveImage(image);
                }}
              />
            </div>
          );
        })}
      </div>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <div className={styles.media}>
          <Image
            {...(activeImage as ImageData)}
            alt={(activeImage as ImageData)?.alt}
          />
        </div>
      </Modal>
    </>
  );
}

export { Gallery };
