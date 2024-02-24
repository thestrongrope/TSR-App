interface Category {
    id: number;
    name: string;
    count: number;
  };
  
  interface Post {
    id: number;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
  };
  
  interface PostCache {
    [categoryId: number]: {
      [pageNo: number]: Post[];
    };  
  };
  
  type CachedCategory = {
    [pageNo: number]: Post[];
  };
  
  type CachedCategories = {
    [categoryId: number]: CachedCategory;
  };
  
  interface PostStore {
    cache: PostCache;
    categories: Category[];
    currentCategory: Category;
    posts: Post[];
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    loading: boolean;
    post: Post;
    videos: VideoItem[];
    videosLastFetchedAt: number;
    getVideos: () => Promise<VideoItem[]>;
    getCategory: (categoryId:number) => Promise<Category>;
    getCategories: () => Promise<Category[]>;
    getPosts: (categoryId:number, pageNo:number) => Promise<Post[]>;
    searchPosts: (searchTerm:string, pageNo:number) => Promise<Post[]>;
    getPost: (postId:number) => Promise<Post>;
  };
  
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
  };
  
  interface VideoItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
  
  // export the post Store and all the types
export type { Category, Post, PostStore, YouTubeApiResponseItem, VideoItem };