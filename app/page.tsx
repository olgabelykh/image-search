import Script from 'next/script';
import Search from './components/Search';
import InfiniteGallery from './components/InfiniteGallery';
import { fetchImagesData } from './actions';
import { ErrorData, ImagesData, SearchParams } from '../types';
import styles from './page.module.css';

const POLYFILL_URL =
  'https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js"';

export default async function Home({
  searchParams: { search = '' } = {},
}: {
  searchParams: SearchParams;
}) {
  const imagesData = await fetchImagesData({ query: search });
  const error = (imagesData as ErrorData).error;

  return (
    <>
      <main className={styles.page}>
        <Search search={search} />
        <div className={styles.galleryWrapper}>
          {!error && (
            <InfiniteGallery
              initialImagesData={imagesData as ImagesData}
              search={search}
            />
          )}
          {error}
        </div>
      </main>
      <Script src={POLYFILL_URL} />
    </>
  );
}
