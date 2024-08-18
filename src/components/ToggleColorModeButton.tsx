import React from "react";
import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ToggleColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="color mode"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
};
