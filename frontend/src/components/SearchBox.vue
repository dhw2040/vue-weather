<template>
  <div class="search-box">
    <input
      class="input-field"
      type="text"
      name="search-box"
      placeholder="Search your city"
      v-model="query"
      @keydown.enter="submit"
    />
    <div class="location" v-show="isShowing">
      <div
        class="city"
        v-for="(city, index) of weatherData"
        :key="city.id"
        @click="select(index)"
      >
        <div>{{ `${city.name}, ${city.sys.country}` }}</div>
        <div>{{ city.main.temp.toFixed(1) }} °C</div>
        <div>
          <i :class="`wi wi-owm-${city.weather[0].id}`"></i>
        </div>
        <div>{{ `${city.coord.lon}, ${city.coord.lat}` }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      query: "",
      country: "",
      shadowCssProp: "0 0 0.5rem 0.2rem ",
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("getWeatherData", {
        city: this.query,
        country: this.country,
      });
      this.query = "";
    },
    select(idx) {
      this.$emit("selected", Number(idx));
    },
  },
  computed: {
    weatherData() {
      return this.$store.getters.WEATHER_DATA.data;
    },
    isShowing() {
      if (this.$store.getters.WEATHER_DATA.success) {
        return this.$store.getters.WEATHER_DATA.success;
      } else {
        return false;
      }
    },
    message() {
      return this.$store.getters.WEATHER_DATA.message;
    },
    errors() {
      return this.$store.getters.WEATHER_DATA.errors;
    },
  },
  created() {
    const time = this.$store.getters.TIME_OF_DAY;
    if (time === "sunrise") {
      this.shadowCssProp += "rgba(255, 166, 115, 0.75)";
    } else if (time === "afternoon") {
      this.shadowCssProp += "rgba(255, 217, 82, 0.75)";
    } else if (time === "sunset") {
      this.shadowCssProp += "rgba(255, 41, 248, 0.75)";
    } else {
      this.shadowCssProp += "rgba(136, 145, 189, 0.95)";
    }
  },
};
</script>

<style scoped>
.search-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 30vh;
  padding-top: 3rem;
}

.input-field {
  height: 2.3rem;
  width: 45%;
  padding-left: 2rem;
  margin-top: 3rem;

  appearance: none;
  background: none;
  border: none;
  outline: none;

  border-radius: 0.4rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  transition: 0.3s;
}

.input-field:focus {
  box-shadow: v-bind("shadowCssProp");
  background-color: rgba(255, 255, 255, 0.75);
}

.location {
  margin-top: 0.5rem;
  padding: 0.5rem 1.3rem;
  min-height: 3.4rem;
  width: 45%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  border-radius: 0.4rem;
}

.city {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.2rem;
  padding: 0.4rem 0.7rem;
  min-height: 2rem;
}

.city:hover {
  background-color: gainsboro;
  cursor: pointer;
}

.wi {
  font-size: 1.2rem;
}
</style>
