import { api } from '../api';

export default {
    namespace: true,
    state: {
        feed: [],
        count: 0,
    },
    mutations: {
        setArticle(state, { articles, articlesCount }) {
            state.feed = articles;
            state.count = articlesCount;
        },
    },
    actions: {
        async getGlobalFeed({ commit }, payload = { page: 1 }) {
            let route = '/articles';

            if (payload) {
                const {
                    tag = null,
                    author = null,
                    favourited = null,
                    page = 1,
                } = payload;

                route += tag ? `?tag=${tag}&` : '';
                route += author ? `?author=${author}&` : '';
                route += favourited ? `?favourited=${favourited}&` : '';
                route += page ? `?offset=${(page - 1) * 10}&limit=10` : '';
            }
            const response = await api.get(route);
            commit('setArticles', response.data);
        },

        async getUserFeed({ commit }, payload = { page: 1 }) {
            let route = '/articles/feed';

            if (payload) {
                const { page = 1 } = payload;
                route += page ? `?offset = ${ (page - 1) * 10 }& limit=10` : '';
            }
            const response = await api.get(route);
            commit('setArticles', response.data);
        },
    },

};














export interface Articleresponse {
    articles?: (ArticlesEntity)[] | null;
    articlesCount: number;
}
export interface ArticlesEntity {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList?: Array<string | null> | null;
    description: string;
    author: Author;
    favorited: boolean;
    favoritesCount: number;
}
export interface Author {
    username: string;
    bio?: string | null;
    image: string;
    following: boolean;
}
