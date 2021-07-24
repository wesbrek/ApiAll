import React from "react";
import '../quote/quote.css'
const Quote = ({text, author}) => {

    return <div className="quote__container">
        <h1 className="quote__text">{text}</h1>
        <p className="quote__author">{author}</p>
  </div> 
};

export default Quote;
