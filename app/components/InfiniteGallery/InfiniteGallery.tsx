'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsync } from '../../../hooks/useAsync';
import { fetchImagesData } from '../../actions';
import { Gallery } from '../Gallery';
import { Spinner } from '../Spinner';
import { ImagesData, ErrorData } from '../../../types';
import styles from './InfiniteGallery.module.css';

const NO_DATA_MESSAGE = 'К сожалению, поиск не дал результатов';
const ERROR_MESSAGE =
  'К сожалению при загрузке данных произошла ошибка';

interface InfiniteGalleryProps {
  search?: string;
  initialImagesData: ImagesData;
}

function InfiniteGallery({
  initialImagesData,
  search = '',
}: InfiniteGalleryProps) {
  const [ref, inView] = useInView();

  const {
    data: imagesData,
    error,
    isLoading,
    run,
    setData,
  } = useAsync<ImagesData>({
    data: initialImagesData,
    error: null,
    fetched: true,
    isLoading: true,
  });

  useEffect(() => {
    setData(initialImagesData);
  }, [initialImagesData, setData]);

  const page = Math.round(
    imagesData?.results
      ? imagesData.results.length /
          (imagesData.total / imagesData.total_pages)
      : 0
  );

  useEffect(() => {
    if (inView && search) {
      const fetchMoreImagesData = async () => {
        const nextImagesData = await fetchImagesData({
          query: search,
          page: (page + 1).toString(),
        });

        const error = (nextImagesData as ErrorData).error;
        if (error) {
          throw Error(error);
        }

        return {
          ...imagesData,
          results: [
            ...(imagesData.results ?? []),
            ...((nextImagesData as ImagesData).results ?? []),
          ],
        };
      };
      run(fetchMoreImagesData);
    }
  }, [inView, search, page, imagesData, run]);

  return (
    <div className={styles.gallery}>
      {imagesData?.results?.length > 0 && (
        <Gallery images={imagesData?.results} />
      )}
      {!!search && !error && page < imagesData?.total_pages && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
      {!!search &&
        !error &&
        imagesData?.results?.length === 0 &&
        !isLoading && (
          <p className={styles.message}>{NO_DATA_MESSAGE}</p>
        )}
      {!!search && !!error && ERROR_MESSAGE}
    </div>
  );
}

export { InfiniteGallery };
export type { InfiniteGalleryProps };
