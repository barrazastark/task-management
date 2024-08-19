import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { TestProvider } from "./helpers";
import { TaskViewer } from "../components/TaskViewer";
import { useTasks } from "../context/TaskManagement";

jest.mock("../context/TaskManagement", () => ({
  useTasks: jest.fn(),
}));

const renderTaskViewer = (taskId: number | string) => {
  render(
    <TestProvider initialEntries={[`/task/${taskId}`]}>
      <Routes>
        <Route path="/task/:id" element={<TaskViewer />} />
      </Routes>
    </TestProvider>,
  );
};

describe("TaskViewer", () => {
  test("adds a new task", async () => {
    const newTaskTitle = "Task 1";
    const addTaskMock = jest.fn();
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      addTask: addTaskMock,
    });

    renderTaskViewer("new");

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: newTaskTitle },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(addTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: newTaskTitle,
        }),
      );
    });
  });

  test("updates an existing task", async () => {
    const taskId = 1;
    const newTaskTitle = "Task updated";
    const editTaskMock = jest.fn();
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [
        {
          id: taskId,
          title: "Old Task",
          description: "",
          priority: "High",
          completed: false,
          createdAt: new Date(),
        },
      ],
      editTask: editTaskMock,
    });

    renderTaskViewer(taskId);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: newTaskTitle },
    });
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(editTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: newTaskTitle,
        }),
      );
    });
  });
});
