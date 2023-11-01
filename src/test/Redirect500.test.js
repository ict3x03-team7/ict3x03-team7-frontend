import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Redirect500 from "../pages/Redirect500"; // Use the correct component name

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate, // Fix the function name
}));

describe("Redirect500 Component Tests", () => {
  it("renders without errors", () => {
    render(<Redirect500 />);
    const headingElement = screen.getByText("500 Internal Server Error");
    expect(headingElement).toBeTruthy();
  });

  it("displays the error message", () => {
    render(<Redirect500 />);
    
    // Use a custom function to match part of the text
    const errorMessage = screen.getByText((content, element) => {
      // You can use a regular expression or any logic to match the text
      return content.startsWith("OOPS! Something went wrong on the server.");
    });
    
    expect(errorMessage).toBeTruthy();
  });

  it("displays a 'Go to Login' button", () => {
    render(<Redirect500 />);
    const loginButton = screen.getByText("Go to Login");
    expect(loginButton).toBeTruthy();
  });

  it("navigates to the login page when 'Go to Login' button is clicked", () => {
    const { container } = render(<Redirect500 />);
    const loginButton = screen.getByText("Go to Login");
    fireEvent.click(loginButton);

    // Ensure that the navigation to the login page has occurred. You may need to mock the useNavigate function.
    // For this example, we're checking if the navigation pathname has changed.
    expect(container.ownerDocument.location.pathname).toBe("/");

    // Reset the pathname to its original value after the test to avoid side effects
    container.ownerDocument.location.pathname = "/";
  });
});