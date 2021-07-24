import React, { useState, useEffect } from "react";
import Quote from "../../components/quote/quote";
import Button from '../../components/button/button'
import Logo from '../../img/bblogo.png'
import '../breakingBad/breakingBad.css'
import Spinner from '../../components/spinner/spinner'
import Hero from "../../components/hero/hero";
const BreakingBad = () => {
  const [quote, setQuote] = useState(null);

  const getQuote = () => {
    fetch(`https://breaking-bad-quotes.herokuapp.com/v1/quotes`)
      .then((resp) => resp.json())
      .then((res) => {
        setQuote(res[0]);
      })
      .catch((ex) => {
        console.error(ex);
      });
  }
  useEffect(() => {
    getQuote();
  }, []);

  return quote ? (

    <div className="breakingBad__container">
      <img className='breakingBad__logo' src={Logo}/>
      <Quote text={quote.quote} author={quote.author} />
      <Button name={'btn_breakingBad'} text={'Get quote'} type={'button'} clickFunction={() => getQuote()}/> 
    
    </div>
    
  ) : (
    <Spinner/>
  );
};

export default BreakingBad;
