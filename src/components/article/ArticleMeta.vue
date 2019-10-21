<template>
  <div class="article-meta">
    <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
        class="author"
      >{{ article.author.username }}</router-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <template v-if="actions">
      <ArticleActions :article="article" :canModify="isCurrentUser()"></ArticleActions>
    </template>
    <template v-else>
      <button
        class="btn btn-sm pull-xs-right"
        v-if="!actions"
        v-on:click="toggleFavorite"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
      >
        <i class="ion-heart"></i>
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import ArticleActions from './ArticleActions.vue';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Article } from '@/store/models';
import articles from '@/store/modules/articles';
import users from '@/store/modules/users';

@Component({
  components: {
    ArticleActions,
  },
})
export default class ArticleMeta extends Vue {
  @Prop() public article?: Article;
  @Prop({ default: false }) public actions?: boolean;

  get currentUser() {
    return users.getuser;
  }

  get isAuthenticated() {
    return users.isAuthenticated;
  }

  public isCurrentUser() {
    if (this.currentUser!.username && this.article!.author.username) {
      return this.currentUser!.username === this.article!.author.username;
    }
    return false;
  }
  public toggleFavorite() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: 'login' });
      return;
    }

    if (this.article!.favorited) {
      articles.removeFavorite(this.article!.slug);
    } else {
      articles.addFavorite(this.article!.slug);
    }
  }
}
</script>
