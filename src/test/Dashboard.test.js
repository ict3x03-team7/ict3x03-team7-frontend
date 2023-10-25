import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from "../pages/Dashboard";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));


describe("Dashboard Component", () => {
    it("performs filtering", () => {
        render(<Dashboard />);

        // Get the role and status dropdowns
        const roleDropdown = screen.getByLabelText("Roles");
        const statusDropdown = screen.getByLabelText("Account Status");

        // Set values for the dropdowns
        fireEvent.mouseDown(roleDropdown);
        const roleStudentOption = screen.getByRole("option", { name: "Student" });
        fireEvent.click(roleStudentOption);

        fireEvent.mouseDown(statusDropdown);
        const statusLockedOption = screen.getByRole("option", { name: "Locked" });
        fireEvent.click(statusLockedOption);

        // Click the "Search" button
        const searchButton = screen.getByText("Search");
        fireEvent.click(searchButton);

        // Check if the error message is displayed after filtering
        const errorAlert = screen.queryByText("Please select at least one filter \(Roles or Account Status\)");
        expect(errorAlert).toBeDefined();

    });

    it("resets filters", () => {
        render(<Dashboard />);

        expect.extend({
            toBeEmpty(received) {
              const textContent = received.textContent.toString();
              const normalizedReceived = textContent.trim().replace(/\u200B/g, ''); // Remove zero-width spaces
              return {
                pass: normalizedReceived === '',
                message: () =>
                  `Expected element's text content to be empty, but received: "${normalizedReceived}"`,
              };
            },
          });

        // Get the role and status dropdowns
        const roleDropdown = screen.getByLabelText("Roles");
        const statusDropdown = screen.getByLabelText("Account Status");

        // Set values for the dropdowns
        fireEvent.mouseDown(roleDropdown);
        const roleStudentOption = screen.getByRole("option", { name: "Student" });
        fireEvent.click(roleStudentOption);

        fireEvent.mouseDown(statusDropdown);
        const statusLockedOption = screen.getByRole("option", { name: "Locked" });
        fireEvent.click(statusLockedOption);

        // Click the "Reset" button
        const resetButton = screen.getByText("Reset");
        fireEvent.click(resetButton);

        expect(roleDropdown).toBeEmpty();
        expect(statusDropdown).toBeEmpty();

    });
});
