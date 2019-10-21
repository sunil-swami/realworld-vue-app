<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :data-test="`page-link-${page}`"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href v-text="page" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Article } from '@/store/models';

@Component
export default class Pagination extends Vue {
  @Prop() public pages?: Array<[]>;

  @Prop() public currentPage?: number;

 @Emit('update:currentPage')
  public changePage(goToPage) {
    if (goToPage === this.currentPage) { return; }
  }
  public paginationClass(page) {
    return {
      'page-item': true,
      'active': this.currentPage === page,
    };
  }
}
</script>
