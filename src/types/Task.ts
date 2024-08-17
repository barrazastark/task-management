export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
};

export const initialTask: Task = {
  id: Math.random(),
  title: "",
  description: "",
  completed: false,
  createdAt: new Date(),
  priority: "High",
};
