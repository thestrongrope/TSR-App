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
  etag: string;
  items: YouTubeApiResponseItemItem[];
}

interface YouTubeApiResponseItemItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
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