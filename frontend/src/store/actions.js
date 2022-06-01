export const getWeatherData = ({ commit }, payload) => {
  fetch(`/api/weather?city=${payload.city}&country=${payload.country}`)
    .then((response) => {
      response.json().then((jsonRes) => {
        if (jsonRes) {
          commit("PUSH_WEATHERDATA", jsonRes);
        }
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getTimeOfDay = ({ commit }) => {
  let now = new Date();
  let hours = now.getHours();

  let time = "";
  if (6 <= hours && hours < 12) {
    time = "sunrise";
  } else if (12 <= hours && hours < 18) {
    time = "afternoon";
  } else if (18 <= hours && hours < 21) {
    time = "sunset";
  } else {
    time = "night";
  }
  commit("PUSH_TIMEOFDAY", time);
};
