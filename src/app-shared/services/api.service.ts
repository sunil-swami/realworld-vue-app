import axios from 'axios';
import {
  UserSubmit,
  UserResponse,
  User,
  ArticlesResponse,
  Profile,
  ProfileResponse,
  UserForUpdate,
  Article,
  UserRegister,
  RegistrationResponse,
} from '../../store/models';

import {getToken , saveToken , destroyToken} from './Jwt.service';
export const conduitApi = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

const ApiService = {

query(resource, params) {
    return conduitApi.get(resource, params).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, slug = '') {
    return conduitApi.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    return conduitApi.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return conduitApi.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return conduitApi.put(`${resource}`, params);
  },

  delete(resource) {
    return conduitApi.delete(resource).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;

export function setAuthHeader() {
  conduitApi.defaults.headers.common.Authorization = `Token ${getToken()}`;
}

export function clearAuthHeader() {
  delete conduitApi.defaults.headers.common.Authorization;
}

export async function loginUser(user: UserSubmit): Promise<User> {
  const response = await conduitApi.post('/users/login', {
    user,
  });
  return (response.data as UserResponse).user;
}

export async function registerUser(user: UserRegister): Promise<RegistrationResponse> {
  const response = await conduitApi.post('/users', {
    user,
  });
  return (response.data as RegistrationResponse);
}

export async function fetchProfile(username: string): Promise<Profile> {
  const response = await conduitApi.get(`/profiles/${username}`);
  return (response.data as ProfileResponse).profile;
}

export async function fetchUser(): Promise<User> {
  const response = await conduitApi.get('/user');
  return (response.data as UserResponse).user;
}

export async function getGlobalFeed() {
  const response = await conduitApi.get('/articles');
  return response.data as ArticlesResponse;
}


export async function updateUser(user: UserForUpdate): Promise<User> {
  const response = await conduitApi.put('/user', user);
  return (response.data as UserResponse).user;
}


export const ArticlesService = {
  async query(type, params) {
    const response = await ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
      params,
    });
    return response.data;
  },
  async get(slug) {
    const response = await ApiService.get('articles', slug);
    return response.data as Article;
  },
  async create(params) {
    const response = await ApiService.post('articles', { article: params });
    return response.data;
  },
  async update(slug, params) {
    const response = await ApiService.update('articles', slug, { article: params });
    return response.data;
  },
  async destroy(slug) {
    const response = await ApiService.delete(`articles/${slug}`);
    return response.data;
  },
};

export const CommentsService = {
  async get(slug) {
    if (typeof slug !== 'string') {
      throw new Error(
        'CommentsService.get() article slug required to fetch comments',
      );
    }
    const response = await ApiService.get('articles', `${slug}/comments`);
    return response.data;
  },

  async post(slug, payload) {
    const response = await ApiService.post(`articles/${slug}/comments`, {
      comment: { body: payload },
    });
    return response.data;
  },

  async destroy(slug, commentId) {
    const response = await ApiService.delete(`articles/${slug}/comments/${commentId}`);
    return response.data;
  },
};
