import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "../components/Home";

// A helper function to render the Home component with router
const renderHome = () => {
  render(
    <Router>
      <Home />
    </Router>,
  );
};

describe("Home Component", () => {
  test("renders Home component without crashing", () => {
    renderHome();
    // If the component renders without errors, this test will pass
  });

  test("renders Add new task button with correct text", () => {
    renderHome();

    const button = screen.getByRole("button", { name: /Add new task/i });
    expect(button).toBeInTheDocument();
  });

  test("renders Filters component", () => {
    renderHome();
    const filterElement = screen.getByText(/All/i);
    expect(filterElement).toBeInTheDocument();
  });

  test("renders empty TaskList component", () => {
    renderHome();
    const taskListElement = screen.getByText(/No tasks found/i);
    expect(taskListElement).toBeInTheDocument();
  });
});
