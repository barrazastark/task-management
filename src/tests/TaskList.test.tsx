import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../context/TaskManagement";
import { TestProvider } from "./helpers";
import type { Task } from "../types/Task";

jest.mock("../context/TaskManagement", () => ({
  useTasks: jest.fn(),
}));

describe("TaskList component", () => {
  test("renders task list empty message", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
    });

    render(
      <TestProvider>
        <TaskList />
      </TestProvider>,
    );

    expect(screen.getByText(/No tasks found./i)).toBeInTheDocument();
  });
  test("renders task list", () => {
    const title1 = "Task 1";
    const title2 = "Task 2";
    const mockTasks: Task[] = [
      {
        id: 1,
        title: title1,
        priority: "High",
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: title2,
        priority: "Medium",
        completed: true,
        createdAt: new Date(),
      },
    ];

    (useTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
    });

    render(
      <TestProvider>
        <TaskList />
      </TestProvider>,
    );

    expect(screen.getByText(title1)).toBeInTheDocument();
    expect(screen.getByText(title2)).toBeInTheDocument();
  });
});
