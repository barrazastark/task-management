import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  Badge,
  Flex,
  Box,
} from "@chakra-ui/react";
import { CheckIcon, ViewIcon } from "@chakra-ui/icons";
import { useTasks } from "../context/TaskManagement";

const priorityColors: Record<string, string> = {
  High: "red",
  Medium: "yellow",
  Low: "green",
};

export const TaskList = (): React.ReactElement => {
  const navigate = useNavigate();
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);
  const taskContext = useTasks();
  const { tasks, toggleComplete } = taskContext;
  const hoverBackgroundColor = useColorModeValue("red.50", "gray.600");

  if (tasks.length === 0) {
    return <Box>No tasks found.</Box>;
  }

  return (
    <Box sx={{ overflowY: "auto" }}>
      <List flex={1}>
        {tasks.map((t, i) => {
          const icon = t.completed ? <CheckIcon /> : undefined;
          const isLastTask = i === tasks.length - 1;
          const priorityColor = priorityColors[t.priority];

          return (
            <ListItem
              key={t.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: ".3em",
                borderRadius: ".5em",
              }}
              bg={hoveredTask === t.id ? hoverBackgroundColor : undefined}
              mb={!isLastTask ? "1em" : 0}
              onMouseEnter={() => setHoveredTask(t.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <Checkbox
                checked={t.completed}
                isChecked={t.completed}
                icon={icon}
                onChange={() => {
                  toggleComplete(t.id);
                }}
              />
              <Flex alignItems="center" ml="1em" flex={1}>
                <span>{t.title}</span>
                <Badge colorScheme={priorityColor} ml="1em">
                  {t.priority}
                </Badge>
              </Flex>
              <IconButton
                colorScheme="blue"
                size="sm"
                ml="1em"
                aria-label="view task"
                role="button"
                icon={<ViewIcon />}
                isRound
                visibility={hoveredTask === t.id ? "visible" : "hidden"}
                onClick={() => {
                  navigate(`/task/${t.id}`);
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
