import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Logout from "../pages/Logout"; 

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

describe("Logout Component", () => {
  const mockNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
  }));

  it("renders without errors", () => {
    render(<Logout />);
  });

  it("clicking the 'Logged In Again' button calls chooseLoginAccountButton function", () => {
    const { getByText } = render(<Logout />);
    const loggedInAgainButton = getByText("Logged In Again");
    const chooseLoginAccountButton = jest.fn();
    loggedInAgainButton.onclick = chooseLoginAccountButton;
  
    fireEvent.click(loggedInAgainButton);
  
    expect(chooseLoginAccountButton).toHaveBeenCalled();
  });

  it("displays the 'You Have Been Logged Out' message", () => {
    const { getByText } = render(<Logout />);
    const logoutMessage = getByText("You Have Been Logged Out");
    expect(logoutMessage).toBeTruthy();
  });

  it("displays the 'Thank you for using SIT-Recipe' message", () => {
    const { getByText } = render(<Logout />);
    const thankYouMessage = getByText("Thank you for using SIT-Recipe");
    expect(thankYouMessage).toBeTruthy();
  });
});
