import React from "react";
import "../card/card.css";
import Button from "../button/button"
import { BrowserRouter as Router, Link } from "react-router-dom";
const Card = ({ imgSrc, title, description, button, link, aling = '' }) => {


  return (
    <div className="card" id={aling}>
          <div className="card__hero">
              <img className="card__image" alt={title} src={imgSrc}/>
      </div>
          <div className="card__content">
              <h1 className="cardTitleHome"> {title}</h1>
              <p>{description}</p>
              <Link to={link}> <Button name={button.name} text={button.text} /></Link> 

      </div>
    </div>
  );
};

export default Card;
