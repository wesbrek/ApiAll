import React from "react";
import '../button/button.css'
const Button = ({name, type, text, clickFunction = null, id = ''}) => {

  const onChange = (q) => {
    if (clickFunction != null) {
      clickFunction(q);
    }
  }
  
  
  return <button id={id} className={name} type={type} onClick={(e) => onChange(e)}> {text}</button>

};

export default Button;

