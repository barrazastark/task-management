import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

import { useTasks } from "../context/TaskManagement"

export const TaskNavigation = () => {
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const { tasks } = useTasks();
  const taskIndex = tasks.findIndex(t => t.id === Number(taskId))

  const handleGoToNextTask = () => {
    navigate(`/task/${tasks[taskIndex + 1].id}`);
  }

  const handleGoToPrevTask = () => {
    navigate(`/task/${tasks[taskIndex - 1].id}`);
  }
  
  if (taskId === "new") {
    return null;
  }

  return (
    <>
      <IconButton
        isDisabled={taskIndex === 0}
        icon={<ChevronLeftIcon />} 
        aria-label="previous task"
        onClick={handleGoToPrevTask}
      />
      <IconButton
        isDisabled={taskIndex === tasks.length - 1}
        icon={<ChevronRightIcon />} 
        aria-label="next task"
        onClick={handleGoToNextTask}

      />
    </>
  )
}