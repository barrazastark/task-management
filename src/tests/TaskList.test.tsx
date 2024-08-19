import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TaskList } from "../components/TaskList";
import { Provider } from "./helpers";

describe("TaskList component", () => {
  test("render task list", () => {
    render(
      <Provider>
        <TaskList />
      </Provider>,
    );
    const noTasks = screen.getByText(/No tasks found./i);
    expect(noTasks).toBeInTheDocument();
  });
});
