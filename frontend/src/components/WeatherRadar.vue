<template>
  <div></div>
</template>

<script>
export default {
  name: "WeatherRadar",
  data() {
    return {
      radar: {},
    };
  },
  methods: {
    setRadarData(data) {
      this.radar = data;
    },
  },
};
</script>

<style></style>
