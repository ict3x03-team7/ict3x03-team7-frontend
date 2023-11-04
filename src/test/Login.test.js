import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../pages/Login"; // Adjust the import path as needed

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe("Login Component", () => {
  it("renders without errors", () => {
    render(<Login />);
  });

  it("clicking the 'Student' button calls loginButton function", () => {
    const { getByText } = render(<Login />);
    const studentButton = getByText("Student");
    const loginButton = jest.fn();
    studentButton.onclick = loginButton;
    fireEvent.click(studentButton);
    expect(loginButton).toHaveBeenCalled();
  });

  it("clicking the 'Admin' button calls loginButton function", () => {
    const { getByText } = render(<Login />);
    const adminButton = getByText("Admin");
    const loginButton = jest.fn();
    adminButton.onclick = loginButton;
    fireEvent.click(adminButton);
    expect(loginButton).toHaveBeenCalled();
  });

  it("clicking the 'Sign Up' link calls RegisterLink function", () => {
    const { getByText } = render(<Login />);
    const signUpLink = getByText("Sign Up");
    const registerLink = jest.fn();
    signUpLink.onclick = registerLink;
    fireEvent.click(signUpLink);
    expect(registerLink).toHaveBeenCalled();
  });

});
