import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Category,
  Post,
  VideoItem,
  YouTubeApiResponseItem,
  CacheEntry,
  CacheItem,
} from "@/types/types";
import { YOUTUBEURL } from "@/constants/YouTube";

const getData = async <TIn, TOut>(
  url: string,
  resolver: (input: TIn[]) => TOut[]
): Promise<CacheEntry<TOut>> => {
  const cachedString = await AsyncStorage.getItem(url);
  const cachedData = cachedString
    ? (JSON.parse(cachedString) as CacheEntry<TOut>)
    : null;
  if (cachedData && cachedData.expiration > Date.now()) {
    return cachedData;
  }
  try {
    console.log("Fetching data from: " + url);
    const response = await axios.get<TIn[]>(url);
    console.log("Response Status: " + response.status + " " + response.statusText);
    const totalPages = response.headers["x-wp-totalpages"];
    const totalRows = response.headers["x-wp-total"];
    const data = resolver(response.data);
    const cacheItem = {
      data,
      expiration: Date.now() + 1000 * 60 * 60 * 24,
      totalPages,
      totalRows,
    };
    await AsyncStorage.setItem(url, JSON.stringify(cacheItem));
    return cacheItem;
  } catch (error) {
    console.log("Error fetching data: " + error);
    return (
      cachedData || { data: [], totalPages: 0, totalRows: 0, expiration: 0 }
    );
  }
};

const getSingleData = async <TIn, TOut>(
  url: string,
  resolver: (input: TIn) => TOut
): Promise<CacheItem<TOut>> => {
  const cachedString = await AsyncStorage.getItem(url);
  const cachedData = cachedString
    ? (JSON.parse(cachedString) as CacheItem<TOut>)
    : null;
  if (cachedData && cachedData.expiration > Date.now()) {
    return cachedData;
  }
  try {
    console.log("Fetching data from: " + url);
    const response = await axios.get<TIn>(url);
    console.log("Response Status: " + response.status + " " + response.statusText);
    const totalPages = 0;
    const totalRows = 0;
    const data = resolver(response.data);
    console.log('Data: ' + JSON.stringify(data));
    const cacheItem = {
      data,
      expiration: Date.now() + 1000 * 60 * 60 * 24,
      totalPages,
      totalRows,
    };
    await AsyncStorage.setItem(url, JSON.stringify(cacheItem));
    return cacheItem;
  } catch (error) {
    console.log("Error fetching data: " + error);
    return cachedData || { data: {} as TOut, expiration: 0 };
  }
};

const getCategoriesFetcher = () => {
  const categoriesUrl =
    "https://www.thestrongrope.com/wp-json/wp/v2/categories";
  const getCategories = async (): Promise<Category[]> => {
    const categories = await getData<Category, Category>(
      categoriesUrl,
      function (categories: Category[]) {
        return categories
          .map((x) => ({ ...x, name: x.name.replace(/&amp;/g, "&") }))
          .filter((x) => x.count > 0);
      }
    );
    return categories.data;
  };

  const getCategory = async (id: number) => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/categories/${id}`;
    const cachedData = await getCategories();
    return cachedData.find((category) => category.id === id);
  };

  return { getCategories, getCategory };
};

const getVideosFetcher = () => {
  const getVideos = async () =>
    await getSingleData<YouTubeApiResponseItem, VideoItem>(
      YOUTUBEURL,
      function (video: YouTubeApiResponseItem): VideoItem {
        if (video.items.length > 0) {
          const firstVideo = video.items[0];
          return {
            id: firstVideo.id.videoId,
            title: firstVideo.snippet.title,
            description: firstVideo.snippet.description,
            thumbnail: firstVideo.snippet.thumbnails.high.url,
          };
        } else {
          return {} as VideoItem;
        }
      }
    );
  return { getVideos };
};

const getPostsFetcher = () => {
  const getPostsByCategory = async (
    categoryId: number,
    page: number
  ): Promise<CacheEntry<Post>> => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/posts?categories=${categoryId}&page=${page}`;
    return await getData<Post, Post>(url, function (posts: Post[]): Post[] {
      return posts.map((post) => post);
    });
  };

  const getPost = async (id: number): Promise<Post> => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/posts/${id}`;
    const posts = await getSingleData<Post, Post>(
      url,
      function (post: Post): Post {
        return post;
      }
    );
    return posts.data ?? ({} as Post);
  };

  const searchPosts = async (search: string, page: number) => {
    const url = `https://www.thestrongrope.com/wp-json/wp/v2/posts?search=${search}&page=${page}`;
    return await getData<Post, Post>(url, function (posts: Post[]): Post[] {
      return posts.map((post) => post);
    });
  };
  return { getPostsByCategory, getPost, searchPosts };
};

export { getCategoriesFetcher, getPostsFetcher, getVideosFetcher };
