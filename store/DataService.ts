import { Category, Post, VideoItem, YouTubeApiResponseItem } from "../types/types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheEntry, CacheItem } from "types/types";

const getData = async <TIn, TOut>(url: string, resolver:(input: TIn[]) => TOut[] ): Promise<CacheEntry<TOut>> => {
  const cachedString = await AsyncStorage.getItem(url);
  const cachedData = cachedString
    ? (JSON.parse(cachedString) as CacheEntry<TOut>)
    : null;
  if (cachedData && cachedData.expiration > Date.now()) {
    return cachedData;
  }
  try {
    const response = await axios.get<TIn[]>(url);
    const totalPages = response.headers["x-wp-totalpages"];
    const totalRows = response.headers["x-wp-total"];
    const data = resolver(response.data);
    const cacheItem = {
      data,
      expiration: Date.now() + 1000 * 60 * 60 * 24,
      totalPages,
      totalRows,
    };
    await AsyncStorage.setItem(
      url,
      JSON.stringify(cacheItem),
    );
    return cacheItem;
  } catch (error) {
    return cachedData || { data: [], totalPages: 0, totalRows: 0, expiration: 0 };
  }
};

const getSingleData = async <TIn, TOut>(url: string, resolver:(input: TIn) => TOut ): Promise<CacheItem<TOut>> => {
  const cachedString = await AsyncStorage.getItem(url);
  const cachedData = cachedString
    ? (JSON.parse(cachedString) as CacheItem<TOut>)
    : null;
  if (cachedData && cachedData.expiration > Date.now()) {
    return cachedData;
  }
  try {
    const response = await axios.get<TIn>(url);
    const totalPages = 0;
    const totalRows = 0;
    const data = resolver(response.data);
    const cacheItem = {
      data,
      expiration: Date.now() + 1000 * 60 * 60 * 24,
      totalPages,
      totalRows,
    };
    await AsyncStorage.setItem(
      url,
      JSON.stringify(cacheItem),
    );
    return cacheItem;
  } catch (error) {
    return cachedData || { data: {} as TOut, expiration: 0 };
  }
};


const getCategoriesFetcher = () => {
  const categoriesUrl =
    "https://www.thestrongrope.com/wp-json/wp/v2/categories";
  const getCategories = async () : Promise<Category[]> => {
    const categories = await getData<Category, Category>(categoriesUrl, function (categories: Category[]) {
      return categories
        .map((x) => ({ ...x, name: x.name.replace(/&amp;/g, "&") }))
        .filter((x) => x.count > 0);
    });
    return categories.data;
  }

  const getCategory = async (id: number) => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/categories/${id}`;
    const cachedData = await getCategories();
    return cachedData.find((category) => category.id === id);
  };

  return { getCategories, getCategory };
};

const getVideosFetcher = () => {
  const channelId = "UC2eGh6XJ8gR0W3Zt6bO5k9A";
  const key = "AIzaSyD5T0j3A1y0YF8Gz7jw3Q1L5cF6bBc9K1k";
  const maxVideos = 1;
  const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxVideos}&order=date&type=video&key=${key}`;
  const getVideos = async () => await getData<YouTubeApiResponseItem, VideoItem>(
    videosUrl,
    function (videos: YouTubeApiResponseItem[]) : VideoItem[] {
      return videos.map((video) => ({
        id: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnail: video.snippet.thumbnails.high.url,
        }));
    }
  );
  return { getVideos };
};

const getPostsFetcher = () => {

  const getPostsByCategory = async (categoryId: number, page: number) : Promise<CacheEntry<Post>> => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/posts?categories=${categoryId}&page=${page}`;
    return await getData<Post, Post>(
      url,
      function (posts: Post[]) : Post[] {
        return posts.map((post) => post);
      }
    );
  }

  const getPost = async (id: number) : Promise<Post> => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/posts/${id}`;
    const posts = await getSingleData<Post, Post>(
      url,
      function (post: Post) : Post {
        return post;
      }
    );
    return posts.data ?? {} as Post;
  };

  const searchPosts = async (search: string, page: number) => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/posts?search=${search}&page=${page}`;
    return await getData<Post, Post>(
      url,
      function (posts: Post[]) : Post[] {
        return posts.map((post) => post);
      }
    );
  };
  return { getPostsByCategory, getPost, searchPosts };
}

export {
  getCategoriesFetcher,
  getPostsFetcher,
  getVideosFetcher,
};
