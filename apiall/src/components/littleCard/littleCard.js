import React from "react";
import Button from "../button/button";
const LittleCard = ({ data, cardType = null, button = null, callback = null, name}) => {
  return data ? (
    <div className={name}>
      <h2 className="littleCard__toptext">{data.topText}</h2>
      <h3 className="littleCard__imgDescription">{data.imgDescription}</h3>
      <img className="littleCard__img" src={data.img} />
      <p className="littleCard__principaltext">
        {data.principalText} {cardType && <span> &#x2103; </span>}
      </p>
      <p className="littleCard__firstbottomtext">
        {data.firstBottomText} {cardType && <span> &#x2103; </span>}
      </p>
      <p className="littleCard__secondbottomtext">
        {data.secondBottomText} {cardType && <span> &#x2103; </span>}
      </p>
      {button != null && (
        <Button name={button.name} text={button.text} id={data.id} clickFunction={callback} />
      )}
    </div>
  ) : (
    <></>
  );
};

export default LittleCard;
