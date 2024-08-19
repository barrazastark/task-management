import React from "react";
import { TaskProvider } from "../context/TaskManagement";
import { BrowserRouter as Router } from "react-router-dom";

export const Provider = ({ children }: { children: React.ReactElement }) => {
  return (
    <Router>
      <TaskProvider>{children}</TaskProvider>
    </Router>
  );
};
