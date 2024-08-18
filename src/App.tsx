import React from "react";
import { Box, Flex, useTheme, Text, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { TaskViewer } from "./components/TaskViewer";
import { ToggleColorModeButton } from "./components/ToggleColorModeButton";

function App() {
  const { colors } = useTheme();
  const mainBackgroundColor = useColorModeValue(
    colors.red["50"],
    colors.gray["600"],
  );
  const contentBackgroundColor = useColorModeValue("white", colors.gray["900"]);

  return (
    <Box
      bgColor="red"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: mainBackgroundColor,
        minHeight: "100vh",
        padding: 30,
        justifyContent: "center",
      }}
    >
      <Flex gap="1em" mb="1em" alignItems="baseline">
        <Text mb="1em" fontSize="2em">
          Task Management
        </Text>
        <ToggleColorModeButton />
      </Flex>
      <Flex
        direction="column"
        w={[300, 400, 500]}
        sx={{
          backgroundColor: contentBackgroundColor,
          padding: "1em",
          borderRadius: "1em",
          height: "calc(100vh - 160px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskViewer />} />
        </Routes>
      </Flex>
    </Box>
  );
}

export default App;
