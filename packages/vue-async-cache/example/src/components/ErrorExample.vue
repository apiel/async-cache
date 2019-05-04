<template>
  <div>
    <!-- <p>store {{store}}</p> -->
    <p class="error"><b>Some error handling example:</b> {{error}} </p>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from "vue-property-decorator";
import { api } from "../mockapi";
import { asyncCache, useAsyncCacheWatch } from "vue-async-cache";

@Component
export default class ErrorExample extends Vue {
  private cacheWatch = useAsyncCacheWatch(api, "/no-route");

  get error() {
    return this.cacheWatch.getError();
  }

  // data() {
  //   return {
  //     store: asyncCache.state,
  //   };
  // }

  mounted() {
    this.cacheWatch.call();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
