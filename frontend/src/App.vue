<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->

  <div id="app">
    <main>
      <SearchBox @weather-query="getWeatherQuery" />
      <WeatherBox :qry="query" />
      <WeatherRadar />
    </main>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox.vue";
import WeatherBox from "./components/WeatherBox.vue";
export default {
  name: "App",
  data() {
    return {
      api_key: "4adf2af9535e6bc15615b1fe824f621b",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
    };
  },
  methods: {
    getWeatherQuery(data) {
      this.query = data;
    },
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
  background-image: url("./assets/sunset.png");
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
