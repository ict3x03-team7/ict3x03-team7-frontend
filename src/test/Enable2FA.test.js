import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Enable2FA from "../pages/Enable2FA";
import { MemoryRouter } from 'react-router-dom';


jest.mock('../App', () => {
  return {
    backendURL: '${backendURL}/api/v1/auth/session', 
  };
});

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      get_MFA: "mocked_MFA",
    },
  }),
}));

const navigateMock = jest.fn();
describe("Enable2FA Component", () => {
  it("renders successfully", () => {
    render(
      <MemoryRouter>
        <Enable2FA />
      </MemoryRouter>
    );
    const enable2FAComponent = screen.getByText("Scan Your 2FA");
    expect(enable2FAComponent).toBeTruthy();
  });

  it("displays QR code image", () => {
    render(
      <MemoryRouter>
        <Enable2FA />
      </MemoryRouter>
    );
    const qrCodeImage = screen.getByAltText("2FA QR Code");
    expect(qrCodeImage).toBeTruthy();
  });

  it("initial checkbox unchecked", () => {
    render(
      <MemoryRouter>
        <Enable2FA />
      </MemoryRouter>
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeTruthy();
    expect(checkbox.checked).toBe(false);
  });

  it("toggles checkbox when clicked", () => {
    render(
      <MemoryRouter>
        <Enable2FA />
      </MemoryRouter>
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty("checked", true); // To check if checked
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty("checked", false); // To check if not checked
  });

  it("display alert when 'Go to Login' is clicked without scanning QR code", () => {
    render(
      <MemoryRouter>
        <Enable2FA />
      </MemoryRouter>
    );
    const button = screen.getByText("Go to Login");
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalledWith("Please scan the QR Code");
  });
});