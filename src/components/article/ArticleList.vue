<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">No feeds available.</div>
      <ArticlePreview
        v-for="(article, index) in articles"
        :article="article"
        :key="article.title + index"
      />
      <Pagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Article } from '@/store/models';
import ArticlePreview from './ArticlePreview.vue';
import Pagination from '../Pagination.vue';
import articles from '@/store/modules/articles';

@Component({
  components: { ArticlePreview, Pagination },
})
export default class ArticleList extends Vue {
  public currentPage = 1;
  @Prop({ default: 'all' }) public type: string | undefined;
  @Prop(String) public author: string | undefined;
  @Prop(String) public tag: string | undefined;
  @Prop(String) public favorited: string | undefined;
  @Prop({ default: 10 }) public itemsPerPage;

  public fetchArticles() {
    return articles.fetchArticles(this.listConfig);
  }
  public resetPagination() {
    this.listConfig.offset = 0;
    this.currentPage = 1;
  }

  public mounted() {
    this.fetchArticles();
  }

  get listConfig() {
    const { type } = this;
    const filters = {
      offset: (this.currentPage - 1) * this.itemsPerPage,
      limit: this.itemsPerPage,
    };
    if (this.author) {
      filters.author = this.author;
    }
    if (this.tag) {
      filters.tag = this.tag;
    }
    if (this.favorited) {
      filters.favorited = this.favorited;
    }
    return {
      type,
      filters,
    };
  }
  get pages() {
    if (this.isLoading || this.articlesCount <= this.itemsPerPage) {
      return [];
    }
    return [
      ...Array(Math.ceil(this.articlesCount / this.itemsPerPage)).keys(),
    ].map((e) => e + 1);
  }

  get articlesCount() {
    return articles.getArticlesCount;
  }

  get isLoading() {
    return articles.getLoadingState;
  }

  get articles() {
    
    return articles.getArticles;
  }

  @Watch('currentPage')
  public currentPageChange(newValue) {
    this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
    this.fetchArticles();
  }
  @Watch('type')
  public typeChange() {
    this.resetPagination();
    this.fetchArticles();
  }
  @Watch('author')
  public authorChange() {
    this.resetPagination();
    this.fetchArticles();
  }
  @Watch('tag')
  public tagChange() {
    this.resetPagination();
    this.fetchArticles();
  }
  @Watch('favorited')
  public favoritedChange() {
    this.resetPagination();
    this.fetchArticles();
  }
}
</script>
