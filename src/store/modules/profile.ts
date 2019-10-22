import {
    getModule,
    Module,
    MutationAction,
    VuexModule,
    Mutation,
    Action,
} from 'vuex-module-decorators';
import store from '@/store';

import * as api from '@/app-shared/services/api.service';
import { Profile } from '../models';

@Module({
    namespaced: true,
    name: 'profile',
    store,
    dynamic: true,
})

class ProfileModule extends VuexModule {
    public errors = {};
    public profile: Profile = {} as Profile;
    get getprofile() {
        return this.profile;
    }

    @Action({ rawError: true })
    public fetchProfile(username: string) {
        return api.ApiService.get('profiles', username)
            .then((data: any) => {
                this.context.commit('setProfile', data.profile);
                return data.profile;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    @Action({ rawError: true })
    public fetchProfileFollow(payload) {
        const { username } = payload;
        return api.ApiService.post(`profiles/${username}/follow`, { username })
            .then((data: any) => {
                this.context.commit('setProfile', data.profile);
                return data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    @Action({ rawError: true })
    public fetchProfileUnfollow(payload) {
        const { username } = payload;
        return api.ApiService.delete(`profiles/${username}/follow`)
            .then((data: any) => {
                this.context.commit('setProfile', data.profile);
                return data;
            })
            .catch((err) => {
                throw err;
            });
    }

    @Mutation
    public setProfile(profile) {
        this.profile = profile;
        this.errors = {};
    }
}

export default getModule(ProfileModule);
