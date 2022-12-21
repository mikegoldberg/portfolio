import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Box
      position={"fixed"}
      zIndex={100}
      right="0"
      margin="10px"
      color={["#fff", "#fff", useColorModeValue("#000", "#fff")]}
    >
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
      />
    </Box>
  );
};

export default ColorModeSwitcher;
