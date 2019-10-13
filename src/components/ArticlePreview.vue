<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html">
        <img :src="article.author.image" />
      </a>
      <div class="info">
        <a href class="author">{{article.author.username}}</a>
        <span class="date">{{article.createdAt}}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i>
        {{article.favoritesCount}}
      </button>
    </div>
    <router-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["article"]
});
</script>