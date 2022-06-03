import { createStore } from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";

export default createStore({
  state: {
    weatherData: [],
    timeOfDay: "",
    success: false,
  },
  getters: {
    WEATHER_DATA: (state) => {
      return state.weatherData;
    },
    TIME_OF_DAY: (state) => {
      return state.timeOfDay;
    },
  },
  mutations,
  actions,
  modules: {},
});
