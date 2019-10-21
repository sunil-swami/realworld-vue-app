<template>
  <div class="home-tag"><ArticleList :tag="tag"></ArticleList></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticleList from '@/components/article/ArticleList.vue';

@Component({
  components: {
    ArticleList,
  },
})
export default class HomeTag extends Vue {
 get tag() {
      return this.$route.params.tag;
    }
}
</script>