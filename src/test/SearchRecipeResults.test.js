import React from "react";
import { render, fireEvent, screen, act, } from "@testing-library/react";
import SearchRecipeResults from "../pages/SearchRecipeResults"; 

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

test("renders SearchRecipeResults component and handles search button click", () => {
  // Render the component
  render(<SearchRecipeResults />);

  // Find the search input and button
  const searchInput = screen.getByPlaceholderText("Search a recipe here");
  const searchButton = screen.getByText("Search");

  // Check if the search input and button are in the document
  expect(searchInput).toBeTruthy();
  expect(searchButton).toBeTruthy();

  // Simulate typing into the search input
  fireEvent.change(searchInput, { target: { value: "Chicken" } });

  // Simulate clicking the search button
  fireEvent.click(searchButton);
});

