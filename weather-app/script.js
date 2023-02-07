const apikey = "4f0c5f237b428cfe861db9dc06e5875a";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();
  console.log(respData, KtoC(respData.main.temp));
  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");
  console.log(data.weather[0].icon);
  weather.innerHTML = `
  <small class="main">${data.weather[0].main}</small>
    <h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>${temp} °C</h2>
    <small class="city">in ${search.value}</small>`;

  //cleanup
  main.innerHTML = "";

  main.appendChild(weather);
}
function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(e);
  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
