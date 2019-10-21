<template>
  <div class="home-global"><ArticleList type="all" /></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticleList from '@/components/article/ArticleList.vue';

@Component({
  components: {
    ArticleList,
  },
})
export default class HomeGlobal extends Vue {

}
</script>
