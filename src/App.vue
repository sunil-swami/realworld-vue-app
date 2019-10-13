<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view/>
    <AppFooter></AppFooter>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';


@Component({
  components: {
    AppFooter,
    AppHeader,
  },
})
export default class App extends Vue {

}
</script>
<style lang="scss" scoped>

</style>