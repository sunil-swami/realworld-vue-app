<template>
  <div class="profile-page">
    <ArticleList :author="author" :items-per-page="5"></ArticleList>
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
export default class ProfileArticles extends Vue {
 get author() {
      return this.$route.params.username;
    }
}
</script>
