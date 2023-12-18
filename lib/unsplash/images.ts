import { URLSearchParams } from 'node:url';
import pick from 'lodash/pick';
import { ImagesData, ErrorData, SearchParams } from '../../../types';

const BASE_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'OBvv8GpEiToO4-May6x-pyyKvLI6017DpcNo675YGm4';
const INITIAL_SEARCH_PARAMS: SearchParams = {
  query: '',
  page: '1',
};
const EMPTY_RESULTS: ImagesData = {
  results: [],
  total: 0,
  total_pages: 0,
};
const ERROR_TEXT = 'Ошибка получения данных об изображениях';

function getUrl(searchParams: SearchParams) {
  const urlParams = new URLSearchParams(searchParams).toString();
  const url = `${BASE_URL}?client_id=${ACCESS_KEY}&${urlParams}`;
  return url;
}

async function getImagesData(
  searchParams: SearchParams = INITIAL_SEARCH_PARAMS
): Promise<ImagesData | ErrorData> {
  if (!searchParams.query) {
    return Promise.resolve(EMPTY_RESULTS);
  }

  try {
    const url = getUrl(searchParams);
    const response = await fetch(url);

    if (response.ok) {
      const responseJSON = await response.json();

      return {
        results: responseJSON.results?.map(
          (item: { urls: { [x: string]: any } }) => ({
            ...pick(item, ['id', 'width', 'height', 'alt']),
            src: item.urls['regular'],
          })
        ),
        ...pick(responseJSON, ['total', 'total_pages']),
      };
    }

    const error = await response.json();
    throw new Error(error);
  } catch (error) {
    return { error: ERROR_TEXT };
  }
}

export { getImagesData };
