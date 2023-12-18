interface ImageData {
  id: string;
  src: string;
  srcThumb: string;
  width: number;
  height: number;
  alt: string;
}

interface ImagesData {
  results: ImageData[];
  total: number;
  total_pages: number;
}

interface ErrorData {
  error: string;
}

type SearchParams = {
  [key: string]: string;
};

export type { ErrorData, ImageData, ImagesData, SearchParams };
