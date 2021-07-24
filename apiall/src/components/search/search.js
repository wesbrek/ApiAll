import React from "react";
import Button from '../button/button'
const Search = ({className, text, name, placeholder, callback}) => {

  return <div className="search">
    <input className={className} placeholder={placeholder}></input>
    <Button text={text} name={name} clickFunction={callback}/>
  </div>
};

export default Search;
