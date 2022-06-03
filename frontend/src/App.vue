<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->

  <div id="app">
    <main :style="getBackgroundProps">
      <SearchBox @weather-query="getWeatherQuery" @selected="getIndex" />
      <WeatherBox :select="index" />
    </main>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox.vue";
import WeatherBox from "./components/WeatherBox.vue";
export default {
  name: "App",
  data() {
    return { query: null, index: null };
  },
  methods: {
    getWeatherQuery(data) {
      this.query = data;
    },
    getIndex(i) {
      this.index = i;
    },
  },
  computed: {
    getBackgroundProps() {
      const time = this.$store.getters.TIME_OF_DAY;
      let caption = time + ".jpg";
      return "url(" + require("@/assets/img/" + caption) + ")";
    },
  },
  created() {
    this.$store.dispatch("getTimeOfDay");
  },
  components: { SearchBox, WeatherBox },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: v-bind("getBackgroundProps");
  /* background-image: url("./assets/img/afternoon.jpg"); */
  background-size: cover;
  background-position: bottom;
  transition: 0.3s;
}

nav {
  padding: 30px;
  position: fixed;
  margin: 0 auto;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.5)
  );
}
</style>
