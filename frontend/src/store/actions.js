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
