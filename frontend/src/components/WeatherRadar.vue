<template>
  <div></div>
</template>

<script>
export default {
  name: "WeatherRadar",
  data() {
    return {
      api_key: "4adf2af9535e6bc15615b1fe824f621b",
      url_base: "https://tile.openweathermap.org/map",
      layer: "clouds_new",
      radar: {},
    };
  },
  methods: {
    fetchRadarData() {
      fetch(
        `${this.url_base}/${this.layer}/2/43.7001/-79.4163.png?appid=${this.api_key}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(this.setWeatherData);
    },
    setRadarData(data) {
      this.radar = data;
    },
  },
};
</script>

<style></style>
