import { api, setToken, clearToken } from '../api';

export default {
    namespaced: true,
    state: {
        user: null,
        profile: null,
    },
    getters: {
        username(state) {
            return (state.user && state.user.username) || null;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        async getUser({ commit }) {
            const user = await api.get('/user');
            commit('setUser', user);
        },
        async loginUser({ commit }, user) {
            clearToken();
            try {
                const response = await api.post('/users/login', {
                    user,
                });
                if (response.data.user) {

                    setToken(response.data.user.token);
                    commit('setUser', response.data.user);
                }
            } catch (e) {
                // tslint:disable-next-line: no-console
                console.log(e);
                throw e;
            }
        },
    },
};

