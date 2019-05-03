<template>
  <div class="hello">
    <p>A {{responses['dbe5d477a168e97237d469f8a06ce137']}}</p>
    <p>E {{response}}</p>
    <p>R {{res}}</p>
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
import { cache, getId, Responses, Res, UseAsyncCache } from "vue-async-cache";

@Component
export default class HelloWorld extends Vue {
  private responses!: Responses;
  private id!: string;
  // private res!: Res | null;
  private useAsyncCache = new UseAsyncCache();

  get response() {
    return this.responses[this.id];
  }

  get res() {
    return this.useAsyncCache.response;
  }

  data() {
    return {
      id: null,
      responses: cache.state.responses,
      // res: null,
    };
  }

  async mounted() {
    await this.useAsyncCache.call(api, "/counter");

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
