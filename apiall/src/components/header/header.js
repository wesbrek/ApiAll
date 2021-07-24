import React from "react";
import '../header/header.css'
import Cookies from "universal-cookie";
import Icon from '../../components/icon/icon'
import { BrowserRouter as Router, Link } from "react-router-dom";
const cookies = new Cookies();
const Header = () => {

  return cookies.get('token') ?
    (<div className="header">
      <ul className="navbar">
        <Link className="navbar_firstChild" to="/home"> <Icon icon="fas fa-book-reader"/>  <li>ApiAll</li></Link>
        <li>Home</li>
      </ul>
    </div>) : (<></>) 

};

export default Header;

