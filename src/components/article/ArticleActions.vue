<template>
  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link class="btn btn-sm btn-outline-secondary" :to="editArticleLink">
      <i class="ion-edit"></i>
      <span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i>
      <span>&nbsp;Delete Article</span>
    </button>
  </span>
  <!-- Used in ArticleView when not author -->
  <span v-else>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i>
      <span>&nbsp;</span>
      <span v-text="followUserLabel" />
    </button>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-sm" @click="toggleFavorite" :class="toggleFavoriteButtonClasses">
      <i class="ion-heart"></i>
      <span>&nbsp;</span>
      <span v-text="favoriteArticleLabel" />
      <span>&nbsp;</span>
      <span class="counter" v-text="favoriteCounter" />
    </button>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Article } from '@/store/models';
import articles from '@/store/modules/articles';
import users from '@/store/modules/users';
import profile from '@/store/modules/profile';

@Component
export default class ArticleActions extends Vue {
  @Prop() public article!: Article;
  @Prop() public canModify?: boolean;

  get profile() {
   return users.fetchProfile;
  }

  get isAuthenticated() {
    return users.isAuthenticated;
  }

 public created() {
    users.loadProfile(this.$route.params.username);
  }

  public editArticleLink() {
    return { name: 'article-edit', params: { slug: this.article!.slug } };
  }
  public toggleFavoriteButtonClasses() {
    return {
      'btn-primary': this.article!.favorited,
      'btn-outline-primary': !this.article!.favorited,
    };
  }
  public followUserLabel() {
    return `${this.profile!.following ? 'Unfollow' : 'Follow'} ${
      this.article!.author.username
    }`;
  }
  public favoriteArticleLabel() {
    return this.article!.favorited ? 'Unfavorite Article' : 'Favorite Article';
  }
  public favoriteCounter() {
    return `(${this.article!.favoritesCount})`;
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
  public toggleFollow() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: 'login' });
      return;
    }

    if (this.article!.following) {
      profile.fetchProfileUnfollow(this.profile!.username);
    } else {
      profile.fetchProfileFollow(this.profile!.username);

    }
  }
  public async deleteArticle() {
    try {
      await articles.deleteArticle(this.article!.slug);
      this.$router.push('/');
    } catch (err) {
      // console.error(err);
    }
  }
}
</script>
