<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors :errors="errors" />
          <form v-on:submit.prevent="onPublish(article.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)"
                >
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput)"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" v-on:click="removeTag(tag)"> </i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ArticlePreview from '@/components/article/ArticlePreview.vue';
import articles from '@/store/modules/articles';
import ArticleMeta from '@/components/ArticleMeta.vue';
import Comment from '@/components/Comment.vue';
import CommentEditor from '@/components/CommentEditor.vue';
import Tag from '@/components/Tag.vue';
import * as markedContent from 'marked';
import users from '../store/modules/users';
import ListErrors from '@/components/ListErrors.vue';
import { Article } from '@/store/models';

@Component({
  components: {ListErrors },
})
export default class ArticleEdit extends Vue {
  @Prop() public previousArticle: Article;
    public  tagInput = null;
     public inProgress = false;
     public errors = {};

 public async  beforeRouteUpdate(to, from, next) {
     await articles.articleResetState();
     return next();
  }
  public async beforeRouteEnter(to, from, next) {
     await articles.articleResetState();
     if (to.params.slug !== undefined) {
      await articles.fetchArticle(
        to.params.slug,
        to.params.previousArticle,
      );
    }
     return next();
  }
  public async beforeRouteLeave(to, from, next) {
     await articles.articleResetState();
     next();
  }

  get article() {
   return articles.getArticle;
  }

   public onPublish(slug) {
      this.inProgress = true;
      if (slug) {
          articles.editArticle().then((data) => {
          this.inProgress = false;
          this.$router.push({
            name: 'article',
            params: { slug: data.article.slug },
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
      } else {
          articles.publishArticle().then((data) => {
          this.inProgress = false;
          this.$router.push({
            name: 'article',
            params: { slug: data.article.slug },
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
      }
    }
    public removeTag(tag) {
      articles.articleEditRemoveTag(tag);
    }
    public addTag(tag) {
      articles.articleEditAddTag(tag);
      this.tagInput = null;
    }
}
</script>