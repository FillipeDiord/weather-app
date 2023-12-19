const cityForm =
  document.querySelector('[data-js="change-location"]');
const cityNameContainer =
  document.querySelector('[data-js="city-name"]');
const cityWeatherContainer =
  document.querySelector('[data-js="city-weather"]');
const cityTemperatureContainer =
  document.querySelector('[data-js="city-temperature"]');
const cityCard = document.querySelector('[data-js="city-card"]');
let timeImg = document.querySelector('[data-js="time"]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');

function createElementImg(WeatherIcon) {
  return `<img src="./src/icons/${WeatherIcon}.svg">`;
}

function isClassDnoneAtCard() {
  const isClassDnone = cityCard.classList.contains('d-none');

  if (isClassDnone) {
    cityCard.classList.remove('d-none');
  }
}

async function insertIconWeatherCity(inputValue) {
  const [{ Key, LocalizedName }] = await getCityData(inputValue);
  const [{ 
    WeatherText, 
    Temperature, 
    IsDayTime, 
    WeatherIcon }] = await getCityWeather(Key);
  const temperatureValue = Temperature.Metric.Value;
  const timeIcon = createElementImg(WeatherIcon);

  insertCardWeatherCity(IsDayTime);
  
  timeIconContainer.innerHTML = timeIcon;
  cityNameContainer.textContent = LocalizedName;
  cityWeatherContainer.textContent = WeatherText;
  cityTemperatureContainer.textContent = temperatureValue;

  isClassDnoneAtCard();
}

function insertCardWeatherCity(IsDayTime) {
  timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg';
}

function cleanForm() {
  cityForm.reset();
}

function searchCityWeatherHistory() {
  const city = localStorage.getItem('lastCity');

  if (city) {
    cityForm.city.value = city
    insertIconWeatherCity(city);
  } else {
    cleanForm();
  }
}

cityForm.addEventListener('submit', event => {
  event.preventDefault();

  const inputValue = event.target.city.value;

  localStorage.setItem('lastCity', inputValue);
  
  insertIconWeatherCity(inputValue);

});

searchCityWeatherHistory();