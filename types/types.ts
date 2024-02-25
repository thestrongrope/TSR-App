interface Category {
  id: number;
  name: string;
  count: number;
  cached: boolean;
}

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  cached: boolean;
}

interface YouTubeApiResponseItem {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    description: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface CacheEntry<T> {
  data: T[];
  totalPages: number;
  totalRows: number;
  expiration: number;
}

interface CacheItem<T> {
  data: T;
  expiration: number;
}

// export the post Store and all the types
export type {
  Category,
  Post,
  YouTubeApiResponseItem,
  VideoItem,
  CacheEntry,
  CacheItem,
};