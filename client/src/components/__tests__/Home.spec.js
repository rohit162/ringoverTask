import React from "react";
import { render, screen, act } from "@testing-library/react";
import Home from "../Home";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../../reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router } from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

global.fetch = jest.fn().mockResolvedValue({
  json: () => [
    {
      header: "test header 1",
      subheader: "test subheader 1",
      category: "test category 1",
      content: "test content 1",
    },
    {
      header: "test header 2",
      subheader: "test subheader 2",
      category: "test category 2",
      content: "test content 2",
    },
  ],
});

describe("Testing Entry", () => {
  it("loads the entry and shows the data on screen", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Home />
          </Router>
        </Provider>
      );
    });

    expect(screen.getByText("test header 1")).toBeInTheDocument();
    expect(screen.getByText("test header 2")).toBeInTheDocument();
  });
});
