import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Textarea,
  Spacer,
  Flex,
  Box,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import { useTasks } from "../context/TaskManagement";
import { initialTask } from "../types/Task";
import type { Task, Priority } from "../types/Task";
import { DeleteDialog } from "./DeleteDialog";
import { TaskNavigation } from "./TaskNavigation";

export const TaskViewer = () => {
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const { tasks, addTask, editTask } = useTasks();
  const [task, setTask] = useState<Task>(initialTask);
  const [noTaskFound, setNoTaskFound] = useState(false);

  useEffect(() => {
    if (taskId === "new") {
      return;
    }
    const findTask = tasks.find((t) => t.id === Number(taskId));
    if (findTask) {
      setTask(findTask);
    } else {
      setNoTaskFound(true);
    }
  }, [taskId, tasks]);

  const handleChange = (
    e: React.ChangeEvent<{ value: string; name: string }> | string,
  ) => {
    if (typeof e === "string") {
      setTask((prev) => ({ ...prev, priority: e as Priority }));
    } else {
      setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSaveOrUpdate = () => {
    if (taskId === "new") {
      addTask({ ...task, id: Math.random(), createdAt: new Date() });
    } else {
      editTask(task);
    }
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const isValidTask = Boolean(task.title);

  if (noTaskFound) {
    return (
      <>
        <Button onClick={handleGoBack} leftIcon={<ArrowBackIcon />}>
          Go back
        </Button>
        <Box>No Task found.</Box>
      </>
    );
  }

  return (
    <>
      <Flex mb="2em">
        <Button onClick={handleGoBack} leftIcon={<ArrowBackIcon />}>
          Go back
        </Button>
        <Spacer />
        <Flex gap="1em">
          <TaskNavigation />
        </Flex>
      </Flex>
      <Flex direction="column" gap="1em">
        <Input
          name="title"
          placeholder="Title"
          value={task?.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={task?.description}
          onChange={handleChange}
        />
        <RadioGroup
          name="priority"
          value={task?.priority}
          onChange={handleChange}
          defaultValue="High"
        >
          <Stack direction="row">
            <Radio value="High">High</Radio>
            <Radio value="Medium">Medium</Radio>
            <Radio value="Low">Low</Radio>
          </Stack>
        </RadioGroup>
        <Flex gap="1em">
          <Button
            isDisabled={!isValidTask}
            onClick={handleSaveOrUpdate}
            leftIcon={<CheckIcon />}
            colorScheme="green"
          >
            {taskId === "new" ? "Save" : "Update"}
          </Button>
          {taskId && taskId !== "new" && (
            <DeleteDialog taskId={Number(taskId)} />
          )}
          <Spacer />
        </Flex>
      </Flex>
    </>
  );
};
