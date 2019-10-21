export interface Profile {
  username: string;
  bio?: string;
  image?: string;
  following: boolean;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
}
export interface RegistrationResponse {
  user: User;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserForUpdate {
  email?: string;
  username?: string;
  bio?: string;
  password?: string;
  image?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList?: (string)[] | null;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface UserSubmit {
  email: string;
  password: string;
}

export interface UserResponse {
  user: User;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface ArticlesResponse {
  articles?: (Article)[] | null;
  articlesCount: number;
}

export interface ArticleResponse {
  article: Article;
}

export interface CommentsResponse {
  comments?: (Comments)[] | null;
}
export interface Comments {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
