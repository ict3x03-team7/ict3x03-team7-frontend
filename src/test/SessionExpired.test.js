import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SessionExpired from "../pages/SessionExpired"; 
import { MemoryRouter, useNavigate } from 'react-router-dom'; 

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

describe("SessionExpired Component", () => {
  it("Renders SessionExpired component", () => {
    render(<MemoryRouter>
      <SessionExpired />
    </MemoryRouter>);
    
    // Check main title is present
    const titleElement = screen.getByText("Session Expired");
    expect(titleElement).toBeTruthy();

    // Check session expired message is present
    const messageElement = screen.getByText("OOPS! Your session have been expired.");
    expect(messageElement).toBeTruthy();

    // Check "Go to Login" button is present
    const loginButton = screen.getByText("Go to Login");
    expect(loginButton).toBeTruthy();
  });

  it("Clicking the 'Go to Login' button navigates to the login page", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <SessionExpired />
      </MemoryRouter>
    );
    const loginButton = screen.getByText("Go to Login");
    fireEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});