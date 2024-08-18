import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Spacer } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { Filters } from "./Filters";
import { TaskList } from "./TaskList";

export const Home = () => {
  return (
    <>
      <Flex mb="1em">
        <Link to="/task/new">
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Add new task
          </Button>
        </Link>
        <Spacer />
      </Flex>
      <Flex mb="1em" direction="column">
        <Filters />
      </Flex>
      <TaskList />
    </>
  );
};
