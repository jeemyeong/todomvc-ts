import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./store/store";
import TodoView from "./todo/TodoView";

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <TodoView/>
      </Provider>
    </Router>
  )
};
