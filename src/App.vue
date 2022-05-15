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
    fetchWeatherData(e) {
      e.preventDefault();
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=standard&appid=${this.api_key}`
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then(this.setWeatherData);
      }
    },
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

hr {
  margin: 1rem 0;
  border: 0;
  height: 0.1rem;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.75),
    rgba(255, 255, 255, 0)
  );
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
