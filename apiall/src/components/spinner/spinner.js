import React from "react";
import spinner from '../../img/spinner.gif'
import '../spinner/spinner.css'
const Spinner = () => {
    return <div className='spinner__container'>
      <img src={spinner} alt="spinner" className="spinner"/>
  </div>  
};

export default Spinner;
