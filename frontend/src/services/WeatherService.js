export async function getWeatherData(city, country) {
  const response = await fetch(`/api/users?city=${city}&country=${country}`);
  return await response.json();
}
