<template>
  <div class="home-my-feed"><ArticleList type="feed" /></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticleList from '@/components/article/ArticleList.vue';

@Component({
  components: {
    ArticleList,
  },
})
export default class HomeMyFeed extends Vue {

}
</script>

