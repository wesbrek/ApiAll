import React from "react";
import "./App.css";
import Login from "../src/pages/login/login";
import Home from "../src/pages/home/home";
import BreakingBad from '../src/pages/breakingBad/breakingBad'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header";
import Footer from './components/footer/footer'
import Cookies from "universal-cookie";
import Weather from './pages/weather/weather'
import Cocktail from './pages/cocktail/cocktail'
import Lyrics from './pages/lyrics/lyrics'
const cookies = new Cookies();
function App() {
  return (
    <Router>
    <Header/>
      <Switch>
        <Route path="/home/">
          {cookies.get("token") ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {cookies.get("token") ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/breakingbad">
          {cookies.get("token") ? <BreakingBad /> : <Redirect to="/login" />}
        </Route>
        <Route path="/weather">
          {cookies.get("token") ? <Weather /> : <Redirect to="/login" />}
        </Route>
        <Route path="/cocktail">
          {cookies.get("token") ? <Cocktail /> : <Redirect to="/login" />}
        </Route>
        <Route path="/lyrics">
          {cookies.get("token") ? <Lyrics /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">{cookies.get("token") ?  <Redirect to="/home" /> :  <Redirect to="/login" />}
        </Route>
    
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
