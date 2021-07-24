import React, { useState, useEffect } from "react";
import Form from "../../components/form/form";
import LittleCard from "../../components/littleCard/littleCard";
import Hero from "../../components/hero/hero";
import "../cocktail/cocktail.css";
import Spinner from "../../components/spinner/spinner";
import Icon from "../../components/icon/icon";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,

  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "100%",
    maxHeight: 500,
    display: "block",
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
    },
   img: {
        width: "20rem"
  },
}));

const Cocktail = () => {
  const [list, setlist] = useState(null);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);
  const [information, setInformation] = useState({
    drinks: { strInstructions: "", strDrinkThumb: "" },
  });
  const [search, setSearch] = useState({
    ingredient: "",
    category: "",
  });
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getRecipes = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search.ingredient}&c=${search.category}`;

      const request = await fetch(url);
      const response = await request.json();

      if (response.drinks != null) {
        let dataFormat = [];
        for (let i = 0; i < response.drinks.length; i++) {
          dataFormat.push({
            topText: response.drinks[i].strDrink,
            img: response.drinks[i].strDrinkThumb,
            id: response.drinks[i].idDrink,
          });
        }
        setResult(dataFormat);
        setError(false);
      } else {
        setError(true);
      }
    };
    if (search.ingredient != "") getRecipes();
  }, [search]);

  const getList = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
      .then((resp) => resp.json())
      .then((res) => {
        let dataFormat = [];
        for (let i = 0; i < res.drinks.length; i++) {
          dataFormat.push({ name: res.drinks[i].strCategory });
        }
        setlist(dataFormat);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const handleSubmit = (data) => {
    console.log(data);
    setSearch({
      ingredient: data[0],
      category: data[1],
    });
  };

  const getSpecificRecipe = (e) => {
    let id = e.target.id;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((resp) => resp.json())
      .then((res) => {
        let ingredients = {};
        ingredients.drinks = res.drinks[0];
        let index = 1;
        let ingredientArray = [];
        while (ingredients.drinks["strIngredient" + index]) {
          ingredientArray.push({
            name: ingredients.drinks["strIngredient" + index],
            amount: ingredients.drinks["strMeasure" + index]
              ? ingredients.drinks["strMeasure" + index]
              : "A dash ",
          });
          index++;
        }
        ingredients.fullInfo = ingredientArray;
        setInformation(ingredients);
        console.log(ingredients);
        setOpen(true);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
  return list ? (
    <div className="cocktail__container">
      <Hero title={"Drinks recipes"} className={'cocktailHero'} />
      <Form
        name="cocktail__form"
        inputs={[
          {
            label: "",
            type: "text",
            placeholder: "Search Ingredients",
            icon: "",
            name: "ingredients",
          },
        ]}
        button={{ name: "btn__searchCocktail", type: "Submit", text: "Search" }}
        selects={[
          {
            name: "Select a category",
            id: "weather_select",
            placeholder: "Select a category",
            icon: "",
            options: list,
            name: "Category",
          },
        ]}
        callback={handleSubmit}
      />
      <div className="cocktail__cards">
        {result != null &&
          result.map((drink, i) => (
            <LittleCard
              key={i}
              data={drink}
              button={{ name: "btn__cocktail", text: "View Recipe", type: "" }}
                  callback={getSpecificRecipe}
                name = {'cocktail_card'}
            />
          ))}
      </div>

      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Ingredients</h2>
          <ul>
            {information.fullInfo != null &&
              information.fullInfo.map((ingredient, i) => (
                <li key={i}>
                  {ingredient.name} {ingredient.amount}
                </li>
              ))}
          </ul>

          <h2>Instructions</h2>
          <p>{information.drinks.strInstructions}</p>
          <img src={information.drinks.strDrinkThumb} />
        </div>
      </Modal>
    </div>
  ) : (
    <Spinner />
  );
};

export default Cocktail;
