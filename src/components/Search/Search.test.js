import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import Search from "./Search";

import "@testing-library/jest-dom";
import store from "../../store";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [{ name: "Luke Skywalker" }] }),
  })
);

describe("Search Component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Search component", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByPlaceholderText("Search a character")).toBeInTheDocument();
  });

  it("fetches and displays search results", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText("Search a character");
    fireEvent.change(inputField, { target: { value: "Lu" } });

    expect(global.fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/?search=Lu");

    await screen.findByText("Luke Skywalker");

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("does not fetch data if input is empty", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText("Search a character");
    fireEvent.change(inputField, { target: { value: "" } });

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
