import { create } from 'zustand'

const categoriesUrl = "https://www.thestrongrope.com/wp-json/wp/v2/categories";
const postsUrl = "https://www.thestrongrope.com/wp-json/wp/v2/posts?categories=";

const usePostStore = create((set, get) => ({
  categories: [],
  currentCategory: {},
  posts: [],
  currentPage: 0,
  totalPages: 0,
  totalPosts: 0,
  post: {},

  getCategory: async (categoryId) => {
    if(categoryId == 0) return;
    const state = get();
    if(state.currentCategory.id == categoryId) return state.currentCategory;
    const response = await fetch(`https://www.thestrongrope.com/wp-json/wp/v2/categories/${categoryId}`);
    const category = await response.json();
    category.name = category.name.replace("&amp;", "&");
    set({currentCategory: category});
    return category;
  },

  getCategories: async () => {
    const state = get();
    if(state.categories.length > 0) return state.categories;
    const response = await fetch(categoriesUrl);
    const categories = await response.json();
    categories.forEach(element => {
        element.name = element.name.replace("&amp;", "&");
    });
    const filteredCategories = categories.filter(x => x.count > 0);
    set({ categories: filteredCategories });
    return filteredCategories;
  },

  getPosts: async (categoryId, pageNo) => {

    const pg = parseInt(pageNo, 10);

    if(categoryId == 0) return;
    const state = get();
    if(state.totalPages > 0 && state.currentPage >= state.totalPages) return;

    if(pg == 1) {
      set({ currentPage: 1 })
    }

    if(pg > 1 && state.currentPage == pg) return state.posts;

    // should update posts, currentPage, totalPages, totalPosts
    if(pg == 1) {
      set({
        posts: [],
        currentPage: 0,
        totalPages: 0,
        totalPosts: 0
      })
    }

    const response = await fetch(`${postsUrl}${categoryId}&page=${pg}`);
    const wpTotalPages = response.headers.get('X-WP-TotalPages');
    set({ totalPages: wpTotalPages} );

    const wpTotalPosts = response.headers.get('X-WP-Total');
    set({ totalPosts: wpTotalPosts});

    const data = await response.json();
    if(data.length > 0) {
      set({currentPage: pg});
      set({posts: [...data]});
    }

    return state.posts;
  },

  getPost: async (postId) => {
    if(postId == 0) return;
    const state = get();
    if(state.post.id == postId) return state.post;
    const response = await fetch(`https://www.thestrongrope.com/wp-json/wp/v2/posts/${postId}`);
    const data = await response.json();
    set({post: data});
  }

}))

export default usePostStore