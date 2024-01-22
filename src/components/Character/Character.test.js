import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import Character from "./Character";

import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Character Component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      eye_color: "blue",
      skin_color: "fair",
      hair_color: "blond",
      birth_year: "19BBY",
      gender: "male",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Character component with properties", () => {
    render(<Character />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("height :")).toBeInTheDocument();
    expect(screen.getByText("172")).toBeInTheDocument();
    expect(screen.getByText("mass :")).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
  });
});
