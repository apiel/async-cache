<template>
  <div class="hello">
    <p>Counter: {{response}}</p>
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
import { cache, Responses, Res } from "vue-async-cache";

@Component
export default class Counter extends Vue {
  private responses!: Responses;
  private id!: string;

  get response() {
    return this.responses[this.id] ? this.responses[this.id].response : null;
  }

  data() {
    return {
      id: null,
      responses: cache.state.responses,
    };
  }

  async mounted() {
    this.id = await cache.call(api, "/counter");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
