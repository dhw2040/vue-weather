<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->

  <div id="app">
    <main>
      <SearchBox />
      <div class="weather-box">
        <div class="location">Toronto, Canada</div>
        <div class="date">Fri May 13, 6:14pm</div>
        <div class="weather">
          <div class="icon">
            <i class="fa-solid fa-sun"></i>
          </div>
          <div class="details">
            <span class="temp">22 °C</span>
            <hr />
            <span class="summary"> Sunny </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox.vue";
export default {
  name: "App",
  data() {
    return {
      api_key: "4adf2af9535e6bc15615b1fe824f621b",
      url_base: "https://api.openweathermap.org/data/2.5/",
    };
  },
  components: { SearchBox },
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

.weather-box {
  color: floralwhite;
}

.weather-box .location {
  font-size: 3rem;
  text-shadow: 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
}
.weather-box .date {
  font-style: italic;
  margin-bottom: 2rem;
}
.weather-box .weather {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem 0 2rem 0;
  margin: auto;
  height: 15rem;
  width: 40%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 1rem 1rem rgba(255, 102, 0, 0.5);
}

.details {
  /* font-size: 3rem; */
  margin-left: 3rem;
}

.temp {
  font-size: 5rem;
  font-weight: bolder;
  text-shadow: 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
}

.summary {
  font-size: 3rem;
  text-shadow: 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
}

/* FONT AWESOME */

.fa-sun {
  color: coral;
  font-size: 10rem;
}
</style>
