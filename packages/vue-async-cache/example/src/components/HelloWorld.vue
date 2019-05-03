<template>
  <div class="hello">
    <p>Hello world for test</p>
    <!-- <p>cacheState {{cacheState.responses}}</p> -->
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
import { cache, getId, Responses, Res, useAsyncCacheWatch } from "../asyncCache";
// import { cache, getId, Responses, Res } from "vue-async-cache";

@Component
export default class HelloWorld extends Vue {
  private cacheWatch = useAsyncCacheWatch(api, "/counter");
  private cacheState!: any;
  private id!: string;
  // private res!: Res | null;

  addNumber() {
    store.addNumber();
  }

  async loadCache() {
    // cache.call(api, "/yo");
    // cache.update()
      const count = cache.cache(api, '/counter');
      const response = await api('/counter', 'POST', { value: count + 1 });
      // Update cache
      await cache.update(response, api, '/counter');
  }

  get response() {
    // return this.cacheState.responses[this.id] && this.cacheState.responses[this.id].response;
    return this.cacheWatch.getResponse();
  }

  data() {
    return {
      id: null,
      // cacheState: cache.state,
      // res: null,
    };
  }

  async mounted() {
    // this.id = await cache.call(api, "/counter");
    this.id = await this.cacheWatch.load();
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
