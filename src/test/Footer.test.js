import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test("renders the Footer component", () => {
  render(<Footer />);

  // Assert the presence of elements
  const copyrightText = screen.getByText(
    "Copyright © 2023 Singapore Institute of Technology. All Rights Reserved to Group 7."
  );

  expect(copyrightText).toBeTruthy();

});