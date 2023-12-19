const APIKey = '';
const nameCity = 'goiania';
const baseUrl = `http://dataservice.accuweather.com/`;

function getCityUrl(nameCity) {
  const findCityURL =
    `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${nameCity}`;

  return findCityURL;
}

function getWeatherUrl(cityKey) {
  return `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`
}

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados');
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`);
  }
}

const getCityData = (nameCity) => fetchData(getCityUrl(nameCity));

const getCityWeather = (cityKey) => fetchData(getWeatherUrl(cityKey));


