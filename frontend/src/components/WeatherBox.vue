<template>
  <div class="weather-box" v-if="weatherData.main !== undefined">
    <div class="location">
      {{ weatherData.name }},
      {{ weatherData.sys.country }}
    </div>
    <div class="date">{{ formatDate() }}</div>
    <div class="weather">
      <div class="icon">
        <i class="fa-solid fa-sun"></i>
      </div>
      <div class="details">
        <div class="temp">{{ weatherData.main.temp.toFixed(1) }} °C</div>
        <span>feels like: {{ weatherData.main.feels_like.toFixed(1) }} °C</span>
        <div>
          max: {{ weatherData.main.temp_max.toFixed(1) }} °C, min:
          {{ weatherData.main.temp_min.toFixed(1) }} °C
        </div>
        <hr />
        <span class="summary">
          {{ weatherData.weather[0].main }},
          {{ weatherData.weather[0].description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherBox",
  props: {
    qry: {
      type: String,
    },
  },
  data() {
    return {
      country: "",
    };
  },
  watch: {
    qry: function () {
      this.fetchWeatherData();
    },
  },
  methods: {
    fetchWeatherData() {
      this.$store.dispatch("getWeatherData", {
        city: this.qry,
        country: this.country,
      });
    },
    setWeatherData(data) {
      this.weatherData = data;
    },
    formatDate() {
      let now = new Date();
      now = now.toString().substring(0, 25);
      return now;
    },
  },
  computed: {
    weatherData() {
      return { ...this.$store.state.weatherData.data };
    },
    message() {
      return { ...this.$store.state.weatherData.message };
    },
  },
};
</script>

<style>
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
  font-size: 2rem;
  text-shadow: 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
}

/* FONT AWESOME */

.fa-sun {
  color: coral;
  font-size: 10rem;
}
</style>
