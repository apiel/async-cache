<template>
  <div class="counter">
    <p>Counter: {{count}}</p>
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
import { api } from "../mockapi";
// import { asyncCache, Responses, Res, useAsyncCacheWatch } from "../asyncCache";
import { asyncCache, Responses, Res, useAsyncCacheWatch } from "vue-async-cache";

@Component
export default class Counter extends Vue {
  private cacheWatch = useAsyncCacheWatch(api, "/counter");

  get count() {
    return this.cacheWatch.getResponse();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
