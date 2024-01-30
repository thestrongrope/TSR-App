import { create } from 'zustand'

const categoriesUrl = "https://www.thestrongrope.com/wp-json/wp/v2/categories";
const postsUrl = "https://www.thestrongrope.com/wp-json/wp/v2/posts?categories=";

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
  post: Post;
  getCategory: (categoryId:number) => Promise<Category>;
  getCategories: () => Promise<Category[]>;
  getPosts: (categoryId:number, pageNo:number) => Promise<Post[]>;
  getPost: (postId:number) => Promise<Post>;
};


const usePostStore = create<PostStore>((set, get) => ({
  cache: {},  
  categories: [],
  currentCategory: {id: 0, name: "", count: 0},
  posts: [],
  currentPage: 0,
  totalPages: 0,
  totalPosts: 0,
  post: {id: 0, title: {rendered: ""}},

  getCategory: async (categoryId:number):Promise<Category> => {
    if(categoryId == 0) return {id: 0, name: "", count: 0};
    const state:PostStore = get();

    const cachedCategory = state.categories.find(x => x.id == categoryId);
    if(cachedCategory) {
      set({currentCategory: cachedCategory});
      return cachedCategory;
    }

    if(state.currentCategory.id == categoryId) return state.currentCategory;
    const response = await fetch(`https://www.thestrongrope.com/wp-json/wp/v2/categories/${categoryId}`);
    const category:Category = await response.json();
    category.name = category.name.replace("&amp;", "&");
    set({currentCategory: category});
    return category;
  },

  getCategories: async () => {
    const state = get();
    if(state.categories.length > 0) return state.categories;
    const response = await fetch(categoriesUrl);
    const categories:Category[] = await response.json();
    categories.forEach(element => {
        element.name = element.name.replace("&amp;", "&");
        if(element.count > 0) {
          set({cache: {...state.cache, [element.id]: {}}});
        }
    });
    const filteredCategories = categories.filter(x => x.count > 0);
    set({ categories: filteredCategories });
    return filteredCategories;
  },

  getPosts: async (categoryId, pg) : Promise<Post[]> => {
    const state = get();
    if(state.cache[categoryId] && state.cache[categoryId][pg]) {
      set({posts: state.cache[categoryId][pg]});
      return state.cache[categoryId][pg];
    }
    const url = `${postsUrl}${categoryId}&page=${pg}`;
    const response = await fetch(url);
    const wpTotalPages = parseInt(response.headers.get('X-WP-TotalPages') ?? '0', 10);
    set({ totalPages: wpTotalPages} );
    const wpTotalPosts = parseInt(response.headers.get('X-WP-Total') ?? '0', 10);
    set({ totalPosts: wpTotalPosts});
    const data = await response.json();
    if(data.length > 0) {
      set({currentPage: pg});
      set({posts: [...data]});
    }
    set({cache: {...state.cache, [categoryId]: {...state.cache[categoryId], [pg]: data}}});
    return data;
  },

  getPost: async (postId) : Promise<Post> => {
    if(postId == 0) return {id: 0, title: {rendered: ""}};
    const state = get();

    const categoryIds : number[] = Object.keys(state.cache).map(x => parseInt(x, 10));
    for(let i = 0; i < categoryIds.length; i++) {
      const categoryId = categoryIds[i];
      const cachedCategory = state.cache[categoryId];
      const pageNos : number[] = Object.keys(cachedCategory).map(x => parseInt(x, 10));
      for(let j = 0; j < pageNos.length; j++) {
        const pageNo = pageNos[j];
        const cachedPage = cachedCategory[pageNo];
        const cachedPost = cachedPage.find(x => x.id == postId);
        if(cachedPost) {
          set({post: cachedPost});
          return cachedPost;
        }
      }
    }

    if(state.post.id == postId) return state.post;
    const response = await fetch(`https://www.thestrongrope.com/wp-json/wp/v2/posts/${postId}`);
    const data = await response.json();
    set({post: data});
    return data;
  }

}))

export default usePostStore