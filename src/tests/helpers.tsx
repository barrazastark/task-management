import React from "react";
import { MemoryRouter } from "react-router-dom";

export const TestProvider = ({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactElement;
  initialEntries?: string[];
}) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};
