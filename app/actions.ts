'use server';

import { getImagesData } from '../lib/unsplash/images';
import { SearchParams } from '../types';

export async function fetchImagesData(searchParams: SearchParams) {
  const images = await getImagesData(searchParams);

  return images;
}
