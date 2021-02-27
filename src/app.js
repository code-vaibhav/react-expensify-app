import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
import "normalize.css/normalize.css";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.scss";
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({description: "water bill", amount: 500, createdAt: 12}));
store.dispatch(addExpense({description: "gas bill", amount: 400, createdAt: 200}));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));