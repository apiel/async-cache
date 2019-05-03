<template>
  <div class="hello">
    <p>Hello world for test</p>
    <p>cacheState {{cacheState.responses}}</p>
    <p>Responses {{responses}}</p>
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

@Component
export default class HelloWorld extends Vue {
  private responses!: Responses;
  private id!: string;
  // private res!: Res | null;

  addNumber() {
    store.addNumber();
  }

  loadCache() {
    cache.call(api, "/yo");
  }

  get response() {
    return this.responses[this.id];
  }

  data() {
    return {
      id: null,
      responses: cache.state.responses,
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
