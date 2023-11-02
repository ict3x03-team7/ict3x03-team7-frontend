import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Redirect404 from "../pages/Redirect404";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test("renders all elements the 404 Not Found page", () => {
    render(<Redirect404 />);
    const title = screen.getByText("404 Not Found");
    const description = screen.getByText(/OOPS! We couldn't find your page/i);
    const button = screen.getByText("Go to Login");
  
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button).toBeTruthy();
  });
  
  test("navigates to Login page when button clicked", () => {
    render(<Redirect404 />);
    const button = screen.getByText("Go to Login");
    fireEvent.click(button);
  });

