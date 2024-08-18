import React, { createContext, useContext, useState } from "react";
import { Task } from "../types/Task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Priority, SortOrder } from "../types/Task";

interface TaskContextProps {
  tasks: Task[];
  filter: "All" | Priority;
  order: SortOrder;
  setFilter: (priority: "All" | Priority) => void;
  toggleOrder: () => void;
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleComplete: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  filter: "All",
  order: SortOrder.ASC,
  setFilter: () => {},
  toggleOrder: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  toggleComplete: () => {},
});

export const TaskProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [tasks, dispatch] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<"All" | Priority>("All");
  const [order, setOrder] = useState<SortOrder>(SortOrder.DESC);

  const addTask = (task: Task) => {
    dispatch([task, ...tasks]);
  };

  const editTask = (task: Task) => {
    dispatch(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        }

        return t;
      }),
    );
  };

  const deleteTask = (taskId: number) => {
    dispatch(tasks.filter((t) => t.id !== taskId));
  };

  const toggleComplete = (taskId: number) => {
    dispatch(
      tasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            completed: !t.completed,
          };
        }

        return t;
      }),
    );
  };

  const toggleOrder = () => {
    setOrder(order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
  };

  let filteredTasks: Task[] = [];

  if (filter === "All") {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter((t) => t.priority === filter);
  }

  const sortedTasksByDate = filteredTasks.sort((a, b) => {
    if (order === SortOrder.ASC) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasksByDate,
        order,
        addTask,
        editTask,
        deleteTask,
        toggleComplete,
        filter,
        setFilter,
        toggleOrder,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
