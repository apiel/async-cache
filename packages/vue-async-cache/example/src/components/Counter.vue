<template>
  <div class="counter">
    <p>Counter: {{responses}}</p>
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
import { cache, Responses, Res } from "../asyncCache";
// import { cache, Responses, Res } from "vue-async-cache";

@Component
export default class Counter extends Vue {
  private cacheState!: any;
  private id!: string;

  get responses() {
    return this.cacheState.responses;
  }

  data() {
    return {
      id: null,
      cacheState: cache.state,
    };
  }

  async mounted() {
    // this.id = await cache.call(api, "/counter");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
