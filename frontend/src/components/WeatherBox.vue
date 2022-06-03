<template>
  <div class="weather-box" v-if="weatherData">
    <div class="location">
      {{ weatherData.name }},
      {{ weatherData.sys.country }}
    </div>
    <div class="date">{{ formatDate() }}</div>
    <div class="weather">
      <div class="icon">
        <i :class="`wi wi-owm-${weatherData.weather[0].id}`"></i>
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
    select: {
      type: Number,
    },
  },
  data() {
    return {
      country: "",
      shadowCssProp: "0 0 1rem 1rem ",
      iconProp: "",
      weatherData: null,
    };
  },
  watch: {
    select: function () {
      let wd = this.$store.getters.WEATHER_DATA.data;
      this.weatherData = wd[this.select];
    },
  },
  methods: {
    fetchWeatherData() {
      this.$store.dispatch("getWeatherData", {
        city: this.qry,
        country: this.country,
      });
    },
    formatDate() {
      let now = new Date();
      now = now.toString().substring(0, 25);
      return now;
    },
  },
  computed: {},
  created() {
    const time = this.$store.getters.TIME_OF_DAY;
    if (time === "sunrise") {
      this.shadowCssProp += "rgba(255, 166, 115, 0.75)";
    } else if (time === "afternoon") {
      this.shadowCssProp += "rgba(255, 217, 82, 0.75)";
    } else if (time === "sunset") {
      this.shadowCssProp += "rgba(255, 41, 248, 0.75)";
    } else {
      this.shadowCssProp += "rgba(27, 35, 64, 0.75)";
    }
  },
};
</script>

<style scoped>
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
  padding: 1rem 1.8rem;
  height: 17rem;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: v-bind("shadowCssProp");
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

.wi {
  font-size: 9.2rem;
}

.fa-sun {
  color: rgba(255, 217, 82);
}
</style>
