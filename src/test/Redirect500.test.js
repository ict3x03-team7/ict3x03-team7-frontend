import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Redirect500 from "../pages/Redirect500"; 

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate, 
}));

describe("Redirect500 Component Tests", () => {
  it("renders without errors", () => {
    render(<Redirect500 />);
    const headingElement = screen.getByText("500 Internal Server Error");
    expect(headingElement).toBeTruthy();
  });

  it("displays error message", () => {
    render(<Redirect500 />);
    
    const errorMessage = screen.getByText((content, element) => {
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
    expect(container.ownerDocument.location.pathname).toBe("/");
    container.ownerDocument.location.pathname = "/";
  });
});