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
import { ArticleResponse } from '../models';

@Module({
    namespaced: true,
    name: 'settings',
    store,
    dynamic: true,
})
class SettingsModule extends VuexModule {
    public article: any;
    public comments = [];

    get getArticle() {
        return this.article;
    }

    get getComments() {
        return this.comments;
    }
    @Action({ rawError: true })
    public fetchArticle(articleSlug) {
        return api.ArticlesService.get(articleSlug)
            .then((data: any) => {
                this.updateArticle(data);
                return data.article;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    @Action({ rawError: true })
    public fetchComment(articleSlug) {
        return api.CommentsService.get(articleSlug)
            .then((data) => {
                // this.context.commit('setComments', data.comments);
                this.setComments(data);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    @Mutation
    public updateArticle(data: any) {
        this.article = data.article;
    }
    @Mutation
    public setComments(data: any) {
        this.comments = data.comments;
    }
}

export default getModule(SettingsModule);
