<template>
  <div class="article-preview">
    <ArticleMeta isPreview :article="article" />
    <router-link :to="{
        name: 'article',
        params: {
          slug: this.article.slug,
        },
      }" class="preview-link">
      <h1 v-text="article.title" />
      <p v-text="article.description" />
      <span>Read more...</span>
      <TagList :tags="article.tagList" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Article } from '@/store/models';
import ArticleMeta from './ArticleMeta.vue';
import TagList from '../Tags/TagList.vue';

@Component({
  components: {
    ArticleMeta,
    TagList,
  },
})
export default class ArticlePreview extends Vue {
  @Prop() public article?: Article;
}
</script>
