<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  :to="{ name: 'home-my-feed' }"
                  class="nav-link"
                  active-class="active"
                >
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'home' }"
                  exact
                  class="nav-link"
                  active-class="active"
                >
                  Global Feed
                </router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{ name: 'home-tag', params: { tag } }"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="ion-pound"></i> {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <Tag v-for="(tag, index) in tags" :name="tag" :key="index">
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import articles from '@/store/modules/articles';
import Tag from '@/components/Tags/Tag.vue';
import users from '@/store/modules/users';

@Component({
  components: {
    Tag,
  },
})
export default class Home extends Vue {
//   get articles() {
//     return articles.articles;
//   }

 public mounted() {
     articles.fetchTags();
  }
//   public async created() {
//     await articles.refreshFeed('global');
//   }

    get isAuthenticated() {
       return users.isAuthenticated;
    }

    get tags() {
       return articles.getTags;
    }
   get tag() {
      return this.$route.params.tag;
    }
}
</script>