<template>
  <div class="hello">
    <p>Hello world for test</p>
    <p>cacheState {{cacheState.responses}}</p>
    <p>Response {{response}}</p>
    <button @click="addNumber()">Add new number</button>
    <button @click="loadCache()">Load</button>
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
import { store } from "../store";
import { cache, getId, Responses, Res } from "../asyncCache";
// import { cache, getId, Responses, Res } from "vue-async-cache";

@Component
export default class HelloWorld extends Vue {
  private cacheState!: any;
  private id!: string;
  // private res!: Res | null;

  addNumber() {
    store.addNumber();
  }

  loadCache() {
    cache.call(api, "/yo");
  }

  get response() {
    return this.cacheState.responses[this.id] && this.cacheState.responses[this.id].response;
  }

  data() {
    return {
      id: null,
      cacheState: cache.state,
      state: cache.state,
      // res: null,
    };
  }

  async mounted() {
    this.id = await cache.call(api, "/counter");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  border: 1px solid rgb(71, 184, 130);
  padding: 10px;
  margin: 10px;
}
</style>
