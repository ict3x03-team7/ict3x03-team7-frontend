
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Recipes from "../pages/Recipes";

// Mock useNavigate function
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

// Mock Axios to return a resolved promise with dummy data
import axios from "axios";
jest.mock("axios");
axios.get.mockResolvedValue({ data: { result: [] } });

test("Renders Recipes component", () => {
  render(<Recipes />);
  const searchInput = screen.getByPlaceholderText("Search a recipe here");
  const searchButton = screen.getByText("Search");
  
  expect(searchInput).toBeTruthy();
  expect(searchButton).toBeTruthy();
});

test("Handles search input error for exceeding 100 characters", () => {
  render(<Recipes />);
  const searchInput = screen.getByPlaceholderText("Search a recipe here");

  fireEvent.change(searchInput, { target: { value: "a".repeat(101) } });

  const errorAlert = screen.getByText(/Search text should not exceed 100 characters/);
  expect(errorAlert).toBeTruthy();
});

test("Handles search button click with valid input", async () => {
  render(<Recipes />);
  const searchInput = screen.getByPlaceholderText("Search a recipe here");
  const searchButton = screen.getByText("Search");

  fireEvent.change(searchInput, { target: { value: "Chicken" } });
  fireEvent.click(searchButton);

  // Wait for the promise to resolve (Axios mock)
  await screen.findByText("No recipes found. Please try different ingredients.");
});