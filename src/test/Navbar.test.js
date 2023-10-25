import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar"; // Adjust the import path as needed
import { MemoryRouter } from "react-router-dom";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("Navbar renders correctly", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

// Check if the logo is displayed
const logoElement = screen.getByAltText("Logo");
expect(logoElement).toBeTruthy();

// Check if the "Search Recipe" link is present
const searchRecipeLink = screen.getByText("Search Recipe");
expect(searchRecipeLink).toBeTruthy();

// Check if the "Admin Dashboard" link is present
const adminDashboardLink = screen.getByText("Admin Dashboard");
expect(adminDashboardLink).toBeTruthy();

// Check if the user account icon is present
const accountIcon = screen.getByLabelText("account of current user");
expect(accountIcon).toBeTruthy();

// Click on the user account icon to open the menu
fireEvent.click(accountIcon);

// Check if "My Profile" link is in the menu
const myProfileLink = screen.getByText("My Profile");
expect(myProfileLink).toBeTruthy();

// Check if "Logout" link is in the menu
const logoutLink = screen.getByText("Logout");
expect(logoutLink).toBeTruthy();

// Click on the "My Profile" link in the menu
fireEvent.click(myProfileLink);

// Click on the account icon again to reopen the menu
fireEvent.click(accountIcon);

// Click on the "Logout" link in the menu
fireEvent.click(logoutLink);

});

test("Handles the menu properly", () => {
render(
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
);

// Check if the menu is initially closed
const menuElement = screen.queryByRole("menu");
expect(menuElement).not.toBeTruthy();

// Click on the user account icon to open the menu
const accountIcon = screen.getByLabelText("account of current user");
fireEvent.click(accountIcon);

// Check if the menu is open
expect(screen.queryByRole("menu")).toBeTruthy();

// Click on the user account icon to close the menu
fireEvent.click(accountIcon);

});
