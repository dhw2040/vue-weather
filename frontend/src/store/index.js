import { createStore } from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";

export default createStore({
  state: {
    weatherData: {},
  },
  getters: {
    WEATHER_DATA: (state) => {
      return state.weatherData;
    },
  },
  mutations,
  actions,
  modules: {},
});
