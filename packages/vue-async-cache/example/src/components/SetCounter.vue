<template>
  <div class="hello">
    <button @click="increment()">+</button>
    <button @click="reset()">reset</button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Inject,
  Emit,
  Watch
} from "vue-property-decorator";
// import { Responses, Call } from '../App.vue';
import { api } from "../mockapi";
import { asyncCache, getId, Responses, Res, useAsyncCacheWatch } from "vue-async-cache";

@Component
export default class SetCounter extends Vue {
  private cacheWatch = useAsyncCacheWatch(api, "/counter");
  private cacheState!: any;

  async increment() {
      const count = asyncCache.cache(api, '/counter');
      const response = await api('/counter', 'POST', { value: count + 1 });
      await asyncCache.update(response, api, '/counter');
  }

  async reset() {
      const response = await api('/counter', 'POST', { value: 1 });
      await asyncCache.update(response, api, '/counter');
  }

  get response() {
    return this.cacheWatch.getResponse();
  }

  async mounted() {
    this.cacheWatch.load();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
