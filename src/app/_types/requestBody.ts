export interface CategoryRequestBody {
  name: string;
}

export interface PostRequestBody {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
}
