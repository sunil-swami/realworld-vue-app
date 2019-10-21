import {
  Module,
  VuexModule,
  getModule,
  MutationAction, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';
import { Article, ArticlesResponse } from '../models';
import * as api from '@/app-shared/services/api.service';
type FeedType = 'global' | 'user';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'articles',
  store,
})


class ArticlesModule extends VuexModule {
  public articles: Article[] = [];
  public tags: [] = [];
  public isLoading = true;
  public articlesCount = 0;
  public comments = [];
  public article = {
    author: {},
    title: '',
    description: '',
    body: '',
    tagList: [],
  };


  get getArticlesCount() {
    return this.articlesCount;
  }
  get getArticles() {
    return this.articles;
  }
  get getLoadingState() {
    return this.isLoading;
  }
  get getComments() {
    return this.comments;
  }
  get getTags() {
    return this.tags;
  }
  get getArticle() {
    return this.article;
  }

  @Action({ rawError: true })
  public async fetchArticles(params) {
    this.context.commit('fetchStart');
    return api.ArticlesService.query(params.type, params.filters)
          .then((data) => {
          this.context.commit('setArticles', data);
          // this.setArticle(data);
              })
              .catch((error) => {
                throw new Error(error);
              });
  }
  @Mutation
 public fetchStart() {
    this.isLoading = true;
  }

  @Mutation
  public setArticles(data: ArticlesResponse) {
    this.articles  = data.articles;
    this.articlesCount = data.articlesCount;
    this.isLoading = false;
  }

  @Action({ rawError: true })
  public fetchTags() {
    return api.TagsService.get()
      .then(({data}) => {
        this.setTags(data.tags);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  @Action({ rawError: true })
  public async fetchArticle(articleSlug, prevArticle) {
    if (prevArticle !== undefined) {
      this.setArticle(prevArticle);
    }
    const articles = await api.ArticlesService.get(articleSlug);
    this.setArticle(articles);
    return articles;
  }

  @Action({ rawError: true })
  public async fetchComments(articleSlug) {
    const  data  = await api.CommentsService.get(articleSlug);
    this.setComment(data.comments);
    return { comments: data.comments };
  }

  @Action({ rawError: true })
  public async createComment(payload) {
    await api.CommentsService.post(payload.slug, payload.comment);
    this.context.dispatch('fetchComments', payload.slug);
  }

  @Action({ rawError: true })
  public async destroyComment(payload) {
    await api.CommentsService.destroy(payload.slug, payload.commentId);
    this.context.dispatch('fetchComments', payload.slug);
  }

  @Action({ rawError: true })
  public async addFavorite(slug) {
    const data = await api.FavoriteService.add(slug);
    this.context.commit('updateArticleInList', data.article);
    this.context.commit('setArticle', data);
  }
  @Action({ rawError: true })
  public async removeFavorite(slug) {
    const data = await api.FavoriteService.remove(slug);
    this.context.commit('updateArticleInList', data.article);
    this.context.commit('setArticle', data);
  }
  @Action({ rawError: true })
  public publishArticle() {
    return api.ArticlesService.create(this.article);
  }
  @Action({ rawError: true })
  public deleteArticle() {
    return api.ArticlesService.destroy(this.article.slug);
  }
  @Action({ rawError: true })
  public editArticle() {
    return api.ArticlesService.update(this.article.slug, this.article);
  }

  @Action({ rawError: true })
  public articleEditAddTag(tag) {
    this.context.commit('addTag', tag);
  }
  @Action({ rawError: true })
  public articleEditRemoveTag(tag) {
    this.context.commit('removeTag', tag);
  }
  @Action({ rawError: true })
  public articleResetState() {
    this.context.commit('resetState');
  }

  @Mutation
  public setArticle(article) {
    this.article = article.article;
  }

  @Mutation
  public setTags(tags) {
    this.tags = tags;
  }
  @Mutation
  public setComment(comments) {
    this.comments = comments;
  }
  @Mutation
  public addTag(tag) {
    this.article.tagList = this.article.tagList.push(tag);
  }
  @Mutation
  public removeTag(tag) {
    this.article.tagList = this.article.tagList.filter((ele) => ele !== tag);
  }
  @Mutation
  public resetState(state) {
    Object.assign(state, () => {
      return {
        article: {
          author: {},
          title: '',
          description: '',
          body: '',
          tagList: [],
        },
        comments: [],
        feed: [],
        tags: [],
        isLoading: true,
        articlesCount: 0,
      };
    });
  }
  @Mutation
  public updateArticleInList(data) {
    this.articles = this.articles.map((feed) => {
      if (feed.slug !== data.slug) {
        return feed;
      }
      feed.favorited = data.favorited;
      feed.favoritesCount = data.favoritesCount;
      return feed;
    });
  }
}

export default getModule(ArticlesModule);
