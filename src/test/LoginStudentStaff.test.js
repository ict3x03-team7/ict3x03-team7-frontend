import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LoginStudentStaff from "../pages/LoginStudentStaff";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("LoginStudentStaff component (Front-end Testing)", () => {
  afterEach(() => {
    mock.reset();
  });

  it("renders the component without errors", () => {
    render(<LoginStudentStaff />);
  });

  it("handles email and password input correctly", async () => {
    render(<LoginStudentStaff />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("displays an error message for an invalid email format", async () => {
    render(<LoginStudentStaff />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    const emailError = screen.getByText("Invalid email format");
    expect(emailError).toBeTruthy();
  });

  it("displays an error message when the password is not entered", async () => {
    render(<LoginStudentStaff />);
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    fireEvent.change(passwordInput, { target: { value: "" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    const passwordError = screen.getByText("Password is required");
    expect(passwordError).toBeTruthy();
  });

  it("handles back button click correctly and navigates to the previous page", () => {
    render(<LoginStudentStaff />);
    const backButton = screen.getByText("Back");

    fireEvent.click(backButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("/");
  });

  it("handles 'Forgot Password?' link click correctly and navigates to ForgetPassword2", () => {
    render(<LoginStudentStaff />);
    const forgotPasswordLink = screen.getByText("Forgot Password?");

    fireEvent.click(forgotPasswordLink);

    expect(mockUseNavigate).toHaveBeenCalledWith("/FPOne");
  });

  it("handles 'Register Now!' link click correctly and navigates to Register", () => {
    render(<LoginStudentStaff />);
    const registerLink = screen.getByText("Register Now!");

    fireEvent.click(registerLink);

    expect(mockUseNavigate).toHaveBeenCalledWith("/Register");
  });

  it("handles successful login and navigation", async () => {
    // Mock the Axios request to simulate a successful login response
    mock.onPost("http://localhost:8085/api/v1/auth/login").reply(200, {
      result: { isSuccess: true, mfaEnabled: false },
    });

    render(
      <MemoryRouter>
        <LoginStudentStaff />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const loginButton = screen.getByText("Login");

    // Fill in email and password inputs
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    // Wait for the login request to complete
    await waitFor(() => {
      // Expect that the navigation function is called with the correct route
      expect(mockUseNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("handles API error and displays an error message", async () => {
    // Mock the Axios request to simulate an API error
    mock.onPost("http://localhost:8085/api/v1/auth/login").reply(500);

    render(
      <MemoryRouter>
        <LoginStudentStaff />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const loginButton = screen.getByText("Login");

    // Fill in email and password inputs
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    // Wait for the login request to complete
    await waitFor(() => {
      // Expect that the error message is displayed
      const errorMessage = screen.getByText("Incorrect email or password");
      expect(errorMessage).toBeTruthy();
    });
  });
});
