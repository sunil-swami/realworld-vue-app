<template>
  <div class="profile-page">
    <ArticleList :favorited="favorited" :items-per-page="5">
    </ArticleList>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticleList from '@/components/article/ArticleList.vue';

@Component({
    components: {
        ArticleList,
    },
})
export default class ProfileFavorited extends Vue {
  get  favorited() {
      return this.$route.params.username;
    }
}
</script>