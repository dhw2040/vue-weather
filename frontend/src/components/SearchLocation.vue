<template>
  <div class="search-result">
    <div>Awesome</div>
  </div>
</template>

<script>
export default {
  name: "SearchLocation",
  props: {
    name: {
      type: String,
    },
    country: {
      type: String,
    },
    temp: {
      type: String,
    },
    icon: {
      type: String,
    },
    geo: {
      type: String,
    },
  },
  data() {
    return {
      query: "",
      shadowCssProp: "0 0 0.5rem 0.2rem ",
    };
  },
};
</script>

<style>
.search-result {
  display: flex;
}

.wi {
  font-size: 1rem;
}
</style>
