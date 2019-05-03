<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Counter />
    <Counter />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import Counter from "./components/Counter.vue";

@Component({
  components: {
    Counter
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
