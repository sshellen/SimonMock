import React from "react";
import ReactDOM from "react-dom";
/*/!*!/!*import connect from './db/connect';
import TicTacToe from './components/TicTacToe';

import Recipes from './components/Recipes'
import MouseTracker from './components/MouseTracker'
import Barrista from './components/Barrista'*!/
import Tribute from './tribute/src/Tribute'*!/
import Survey from './survey/src/Survey'*/
/*import Products from './products/src/Products'*/
//import Flexbox from './flexbox/src/Flexbox'
//import Grid from './grid/src/Grid'
//import CodePenApp from "./codepen/src/CodePenApp";
//import Calculator from "./Calculator/src/Calculator";
/*import Recipe from "./Recipes/src/Recipes";
import {Provider}  from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RecipeReducer from './Recipes/reducers/recipes';*/
import Simon from './SimonMock/src/Simon';

/*const store = createStore(
  RecipeReducer
);
*/
const { BrowserRouter, Route, Switch } = require("react-router-dom");

const Routes = (
    <BrowserRouter basename={"/SimonMock"}>
      <Switch>
        <Route path="/" exact component={Simon} />
      </Switch>
    </BrowserRouter>

);

ReactDOM.render(Routes, document.getElementById("app"));
