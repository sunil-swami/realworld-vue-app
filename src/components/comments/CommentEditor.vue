<template>
  <div>
    <ListErrors :errors="errors" />
    <form class="card comment-form" @submit.prevent="onSubmit(slug, comment)">
      <div class="card-block">
        <textarea class="form-control" v-model="comment" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script lang= "ts">
import ListErrors from '../ListErrors.vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import articles from '../../store/modules/articles';


@Component({
    components: {ListErrors},
})
export default class CommentEditor extends Vue {
  @Prop() public slug?: string;
  @Prop() public content?: string;
  @Prop() public userImage?: string;
    public comment =  this.content || null;
    public errors = {};

   public onSubmit(slug, comment) {

     articles.createComment({ slug, comment }).then(() => {
          this.comment = null;
          this.errors = {};
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
}
</script>
