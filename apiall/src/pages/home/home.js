import React from "react";
import Hero from '../../components/hero/hero'
import Card from '../../components/card/card'
import '../home/home.css'
import Search from '../../components/search/search'
import BreakingBadImg from '../../img/bb.jpg'
import WeatherImg from '../../img/openWeather.jpg'
import Cocktail from '../../img/cocktail.jpg'
import Lyrics from '../../img/lyrics.ovh.png'

const Home = () => {


  const searchApi = (e) => {
    let searchInput = document.querySelector('.search__input');
    console.log(searchInput.value);
    let titleCards = document.getElementsByClassName('cardTitleHome')
    let cards = document.getElementsByClassName('card')
    let hideCards = [];
    for (let i = 0; i < titleCards.length; i++){
      if (!titleCards[i].textContent.includes(searchInput.value)) {
        hideCards[i] = i
      }
    }

    for (let j = 0; j < cards.length; j++){
      if (hideCards[j] === j) {
      cards[j].classList.add("hidden")
      } else {
        cards[j].classList.remove("hidden") 
    }
    }
  }

  return (<div className="container">
    <Hero title={'Test all our diferents APIs'} text={'Have fun testing'} className={'hero'} />
    <div className="search_container">
      <h2>Search an especific API</h2>
      <Search className={'search__input'} name={'btn__search'} text={'Search'} placeholder={'Search an API'} callback={searchApi}/>
    
    </div>
    <hr/>
    <div className="cards_container">
    
      <Card imgSrc={BreakingBadImg} title={'Breaking Bad Quotes API'} description={'A free API to retrieve some quotes of Breaking Bad'} button={{ name: "btn_breakingBad", text: "Test Breaking Bad" }} link={'breakingBad'} />
      <Card imgSrc={WeatherImg} title={'OpenWeather API'} description={'Weather forecasts, nowcasts and history in fast and elegant way'} button={{ name: "btn__weather__main", text: "Test OpenWeather" }} link={'weather'} aling={'rigth'}/>
      <Card imgSrc={Cocktail} title={'TheCocktailDB'} description={'An open, crowd-sourced database of drinks and cocktails from around the world.'} button={{ name: "btn__searchCocktail__main", text: "Test CocktailDB" }} link={'cocktail'} />
      <Card imgSrc={Lyrics} title={'Lyrics.ovh'} description={'A free API to search songs Lyrics.'} button={{ name: "btn__lyrics__main", text: "Test Lyrics.ovh" }} link={'lyrics'} aling={'rigth'} />
    </div>
  </div>
  );
};

export default Home;