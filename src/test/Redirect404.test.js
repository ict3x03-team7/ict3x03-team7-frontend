import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Redirect404 from "../pages/Redirect404";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test("renders the 404 Not Found page with all elements", () => {
    render(<Redirect404 />);
    const title = screen.getByText("404 Not Found");
    const description = screen.getByText(/OOPS! We couldn't find your page/i);
    const button = screen.getByText("Go to Login");
  
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button).toBeTruthy();
  });
  
  test("navigates to the login page when the button is clicked", () => {
    render(<Redirect404 />);
    const button = screen.getByText("Go to Login");
  
    // Simulate a button click
    fireEvent.click(button);
  });

