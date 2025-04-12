export interface Category {
  id: number;
  name: string;
}

export interface PostCategory {
  id: number;
  postId: number;
  categoryId: number;
  createdAt: string;
  updateAt: string;
  category: Category;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  updateAt: string;
  postCategories: PostCategory[];
}
