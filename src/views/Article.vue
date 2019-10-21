<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <Tag
                :name="tag"
                className="tag-default tag-pill tag-outline"
              ></Tag>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentEditor
            v-if="isAuthenticated"
            :slug="slug"
            :userImage="currentUser.image"
          >
          </CommentEditor>
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
          </p>
          <Comment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          >
          </Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ArticlePreview from '@/components/article/ArticlePreview.vue';
import settings from '@/store/modules/settings';
import ArticleMeta from '@/components/article/ArticleMeta.vue';
import Comment from '@/components/comments/Comment.vue';
import CommentEditor from '@/components/comments/CommentEditor.vue';
import Tag from '@/components/Tags/Tag.vue';
import * as markedContent from 'marked';
import users from '../store/modules/users';
import articles from '@/store/modules/articles';


@Component({
  components: {
    ArticleMeta,
    Comment,
    CommentEditor,
    Tag  },
})
export default class Article extends Vue {
    @Prop() public slug: string;
    public parseMarkdown(content) {
      return markedContent(content);
    }

    get article() {
      return articles.getArticle;
    }
    get currentUser() {
      return users.user;
    }
    get comments() {
     return articles.getComments;
    }
    get isAuthenticated() {
      return users.isAuthenticated;
    }
}
</script>