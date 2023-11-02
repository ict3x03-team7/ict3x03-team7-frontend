import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Recipes from "../pages/Recipes";
import axios from "axios";
import { MemoryRouter } from 'react-router-dom'; 


const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock('../App', () => {
    return {
      backendURL: '${backendURL}/api/v1/auth/session', 
    };
  });


jest.mock("axios");

describe("Recipes Component", () => {
  beforeEach(() => {
    mockUseNavigate.mockReset();
    axios.get.mockReset();
  });

  it("Handles search button click with valid input and empty result", async () => {
    axios.get.mockResolvedValue({ data: { result: [] } });

    render(<MemoryRouter>
      <Recipes />
    </MemoryRouter>);
    const searchInput = screen.getByPlaceholderText("Search a recipe here");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "Chicken" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const noRecipesFoundText = screen.getByText("No recipes found. Please try different ingredients.");
      expect(noRecipesFoundText).toBeTruthy();
    });
  });

  it("Handles successful search button click with results", async () => {
    const mockRecipes = [
      {
        recipeName: "Sample Recipe 1",
      },
      {
        recipeName: "Sample Recipe 2",
      },
    ];

    axios.get.mockResolvedValue({ data: { result: mockRecipes } });

    render(<MemoryRouter>
      <Recipes />
    </MemoryRouter>);
    const searchInput = screen.getByPlaceholderText("Search a recipe here");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "Chicken" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      for (const recipe of mockRecipes) {
        const recipeName = screen.getByText(recipe.recipeName);
        expect(recipeName).toBeTruthy();
      }
    });
  });
});