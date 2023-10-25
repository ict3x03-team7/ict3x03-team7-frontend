// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import LoginStudentStaff from "../pages/LoginStudentStaff";
// import { MemoryRouter, Routes, Route} from "react-router-dom";

// const mockUseNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockUseNavigate,
// }));

// describe("LoginStudentStaff component", () => {
//   it("renders the component without errors", () => {
//     render(<LoginStudentStaff />);
//   });

//   it("handles email and password input correctly", async () => {
//     const { getByPlaceholderText } = render(<LoginStudentStaff />);
//     const emailInput = getByPlaceholderText("Enter email");
//     const passwordInput = getByPlaceholderText("Enter Password");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });

//     expect(emailInput.value).toBe("test@example.com");
//     expect(passwordInput.value).toBe("password123");
//   });

//   it("displays an error message for an invalid email format", async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginStudentStaff />);
//     const emailInput = getByPlaceholderText("Enter email");
//     fireEvent.change(emailInput, { target: { value: "invalid-email" } });

//     const loginButton = getByText("Login");
//     fireEvent.click(loginButton);

//     const emailError = screen.getByText("Invalid email format");
//     expect(emailError).toBeTruthy();
//   });

//   it("displays an error message when the password is not entered", async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginStudentStaff />);
//     const passwordInput = getByPlaceholderText("Enter Password");

//     fireEvent.change(passwordInput, { target: { value: "" } });

//     const loginButton = getByText("Login");
//     fireEvent.click(loginButton);

//     const passwordError = screen.getByText("Password is required");
//     expect(passwordError).toBeTruthy();
//   });

//   it("handles back button click correctly and navigates to the previous page", () => {
//     render(<LoginStudentStaff />);
//     const backButton = screen.getByText("Back");

//     fireEvent.click(backButton);

//     expect(mockUseNavigate).toHaveBeenCalledWith("/");
//   });

//   it("handles 'Forgot Password?' link click correctly and navigates to ForgetPassword2", () => {
//     render(<LoginStudentStaff />);
//     const forgotPasswordLink = screen.getByText("Forgot Password?");

//     fireEvent.click(forgotPasswordLink);

//     expect(mockUseNavigate).toHaveBeenCalledWith("/ForgetPassword2");
//   });

//   it("handles 'Register Now!' link click correctly and navigates to Register", () => {
//     render(<LoginStudentStaff />);
//     const registerLink = screen.getByText("Register Now!");

//     fireEvent.click(registerLink);

//     expect(mockUseNavigate).toHaveBeenCalledWith("/Register");
//   });
// });


import React from "react";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import LoginStudentStaff from "../pages/LoginStudentStaff";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe("LoginStudentStaff component", () => {
  it("renders the component without errors", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("handles email and password input correctly", async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Enter email");
    const passwordInput = getByPlaceholderText("Enter Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("displays an error message for an invalid email format", async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Enter email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

    const emailError = screen.getByText("Invalid email format");
    expect(emailError).toBeTruthy();
  });

  it("displays an error message when the password is not entered", async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );

    const passwordInput = getByPlaceholderText("Enter Password");

    fireEvent.change(passwordInput, { target: { value: "" } });

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

    const passwordError = screen.getByText("Password is required");
    expect(passwordError).toBeTruthy();
  });

  it("handles back button click correctly and navigates to the previous page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );
    const backButton = screen.getByText("Back");

    fireEvent.click(backButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("/");
  });

  it("handles 'Forgot Password?' link click correctly and navigates to ForgetPassword2", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );
    const forgotPasswordLink = screen.getByText("Forgot Password?");

    fireEvent.click(forgotPasswordLink);

    expect(mockUseNavigate).toHaveBeenCalledWith("/ForgetPassword2");
  });

  it("handles 'Register Now!' link click correctly and navigates to Register", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );
    const registerLink = screen.getByText("Register Now!");

    fireEvent.click(registerLink);

    expect(mockUseNavigate).toHaveBeenCalledWith("/Register");
  });

  it("displays an error message for email length exceeding 100 characters", async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LoginStudentStaff />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Enter email");
    fireEvent.change(emailInput, {
      target: { value: "a".repeat(101) }, // Create a 101-character email
    });

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

    const emailError = screen.getByTestId("email-error");
    expect(emailError).toBeTruthy();
  });

  // it("displays an error message for password length exceeding 100 characters", async () => {
  //   const { getByPlaceholderText, getByText, getByTestId } = render(
  //     <MemoryRouter initialEntries={["/"]}>
  //       <Routes>
  //         <Route path="/" element={<LoginStudentStaff />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  
  //   const passwordInput = getByPlaceholderText("Enter Password");
  //   fireEvent.change(passwordInput, {
  //     target: { value: "a".repeat(101) }, // Create a 101-character password
  //   });
  
  //   const loginButton = getByText("Login");
  //   fireEvent.click(loginButton);
  
  //   const passwordError = getByTestId("password-error");
  //   expect(passwordError).toBeTruthy();
  // });
});
