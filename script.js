const button = document.getElementById("Search-btn");
const input = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const weatherIcon = document.getElementById("weather-icon");
const cityCondition = document.getElementById("city-condition");

async function getData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=ec39a4cd05074714a1775347251405&q=${city}&aqi=no`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Failed to fetch weather data.");
  }
}

function updateUI(data) {
  if (!data || !data.location) {
    cityName.innerText = "City not found!";
    cityTime.innerText = "-";
    cityTemp.innerText = "-";
    weatherIcon.src = "./images/weather-icon.png";
    cityCondition.innerText = "-";
    return;
  }

  cityName.innerText = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
  cityTime.innerText = `Local Time: ${data.location.localtime}`;
  cityTemp.innerText = `${data.current.temp_c}°C`;
  weatherIcon.src = data.current.condition.icon;
  cityCondition.innerText = data.current.condition.text;
}

button.addEventListener("click", async () => {
  const value = input.value.trim();
  if (!value) {
    alert("Please enter a city name!");
    return;
  }
  const result = await getData(value);
  updateUI(result);
});

window.onload = async () => {
  const defaultCity = "Toronto";
  const result = await getData(defaultCity);
  updateUI(result);
};
