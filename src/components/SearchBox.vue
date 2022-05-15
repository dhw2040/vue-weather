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
    <div class="use-location"></div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    submit() {
      this.$emit("weather-query", this.query);
      this.query = "";
    },
  },
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30vh;

  /* width: 70%; */
  /* margin-bottom: 10px; */
}

.input-field {
  height: 2.3rem;
  width: 65%;
  padding-left: 2rem;

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
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 183, 255, 0.75);
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
