<template v-show="errors">
  <ul class="error-messages">
    <li v-for="(value, key) in errors" :key="key">
      <span v-text="key" />
      <span v-for="err in value" :key="err" v-text="err" />
    </li>
  </ul>
</template>

<script lang= "ts">
import { Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ListErorrs extends Vue {
  @Prop() public errors?: object;
}
</script>
