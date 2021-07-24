import React, { useState, useEffect, Fragment } from "react";
import LittleCard from "../../components/littleCard/littleCard";
import Error from "../../components/error/error";
import "../breakingBad/breakingBad.css";
import Form from "../../components/form/form";
import Countries from "../../data/countries.json";
import '../weather/weather.css'
import Hero from '../../components/hero/hero'
const Weather = () => {
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(false)
  const kelvin = 273.15;

  useEffect(() => {
    let container = document.querySelector('.weather__container');
    let hero = document.querySelector('.weatherHero');

    if (result != null) {
      var classList = container.classList;
      var heroClassList = hero.classList;
      while (classList.length > 0) {
        classList.remove(classList.item(0));
      }

      while (heroClassList.length > 0) {
        heroClassList.remove(heroClassList.item(0));
      }

    
      container.classList.add('weather__container')
      hero.classList.add('weatherHero')
      if (result.imgDescription === 'Thunderstorm') {
        container.classList.add('thunderstorm');
        hero.classList.add('thunderstorm');
      } else if (result.imgDescription === 'Drizzle') {
        container.classList.add('drizzle');
        hero.classList.add('drizzle');
      } else if (result.imgDescription === 'Rain') {
        container.classList.add('rain');
        hero.classList.add('rain');
      } else if (result.imgDescription === 'Snow') {
        container.classList.add('snow');
        hero.classList.add('snow');
      } else if (result.imgDescription === 'Mist') {
        container.classList.add('mist');
        hero.classList.add('mist');
      } else if (result.imgDescription === 'Smoke') {
        container.classList.add('smoke');
        hero.classList.add('smoke');
      } else if (result.imgDescription === 'Haze') {
        container.classList.add('haze');
        hero.classList.add('haze');
      } else if (result.imgDescription === 'Dust') {
        container.classList.add('dust');
        hero.classList.add('dust');
      } else if (result.imgDescription === 'Fog') {
        container.classList.add('fog');
      } else if (result.imgDescription === 'Sand') {
        container.classList.add('sand');
        hero.classList.add('sand');
      } else if (result.imgDescription === 'Ash') {
        container.classList.add('ash');
        hero.classList.add('ash');
      } else if (result.imgDescription === 'Squall') {
        container.classList.add('squall');
        hero.classList.add('squall');
      } else if (result.imgDescription === 'Tornado') {
        container.classList.add('tornado');
        hero.classList.add('dust');
      } else if (result.imgDescription === 'Clear') {
        container.classList.add('clear');
        hero.classList.add('clear');
      } else if (result.imgDescription === 'Clouds') {
        container.classList.add('clouds');
        hero.classList.add('clouds');
      }
    }
  }, [result]);


  useEffect(() => {
    const getWeather = async () => {
      const apiKey = "7e8f193620b88542b93650b3e287e61f";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${apiKey}`;

      const request = await fetch(url);
      const response = await request.json();
      
      console.log(response);
      if (response.cod === "404") {
        setError(true)
        setResult(false)
      } else {
        setResult({
          topText: `The weather in ${response.name} is:`,
          principalText: parseFloat(response.main.temp - kelvin, 10).toFixed(2),
          firstBottomText: `The max temperature: ${parseFloat(response.main.temp_max - kelvin, 10).toFixed(2)} `,
          secondBottomText: `The min temperature: ${parseFloat(response.main.temp_min - kelvin, 10).toFixed(2)}`,
          img: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
          imgDescription: response.weather[0].main
        });
        setError(false)
      
    }
     
    };
    if(search.city !== '')
    getWeather();
  }, [search]);

  let component;

  if (error) {
    component = <Error message="No results found"/>
  } else {
    component = <LittleCard data={result} cardType={true} name={'weatherLittleCard'}/>
  }

  const handleSubmit = (data) => {
    console.log(data);
    setSearch({
      city: data[0],
      country: data[1],
    });
  };

  return (
    <Fragment>
          <Hero title={"Weather"} className={'weatherHero'} />
      <div className="weather__container">
        <Form
          name="weathe__form"
          inputs={[
            {
              label: "",
              type: "text",
              placeholder: "City",
              icon: "",
              name: "city",
            },
          ]}
          button={{ name: "btn__weather", type: "Submit", text: "Search" }}
          selects={[
            {
              name: "Select a country",
              id: "weather_select",
              placeholder: "City",
              icon: "",
              options: Countries,
              name: "Country",
            },
          ]}
          callback={handleSubmit}
        />
        {result != null && (
        <div className="weather__result">
        {component}
        </div>
      )}
      </div>
      
    </Fragment>
  );
};

export default Weather;
