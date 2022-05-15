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
        <div class="temp">{{ weatherData.main.temp }} °C</div>
        <span>feels like: {{ weatherData.main.feels_like }} °C</span>
        <div>
          max: {{ weatherData.main.temp_max }} °C, min:
          {{ weatherData.main.temp_min }} °C
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
      api_key: "4adf2af9535e6bc15615b1fe824f621b",
      url_base: "https://api.openweathermap.org/data/2.5/",
      weatherData: {},
    };
  },
  watch: {
    qry: function () {
      this.weatherData = this.fetchWeatherData();
      console.log(this.weatherData);
    },
  },
  methods: {
    fetchWeatherData() {
      fetch(
        `${this.url_base}weather?q=${this.qry}&units=metric&appid=${this.api_key}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(this.setWeatherData);
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
