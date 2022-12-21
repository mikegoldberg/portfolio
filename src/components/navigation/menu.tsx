import {
  Box,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import NavLink from "./nav-link";
import { NavMenuProps } from "./types";

const NavMenu = ({ onNavClicked }: NavMenuProps) => {
  return (
    <VStack
      spacing="30px"
      padding={["30px", "30px", "60px 10px 0 40px", "80px", "80px"]}
      alignItems="flex-start"
      position={"fixed"}
      height="100%"
      overflowY={"auto"}
      overflowX={"hidden"}
    >
      <Box>
        <Link href="/" _hover={{ underline: "none" }}>
          <Text
            color={useColorModeValue("brand.blue", "white")}
            fontWeight="500"
            fontSize="3xl"
          >
            {"Mike Goldberg"}
          </Text>
        </Link>
        <Text fontWeight="300" fontSize="lg">
          {"Developer"}
        </Text>
      </Box>
      <HStack gap="8px">
        <Tooltip label="LinkedIn Profile">
          <Link href="https://www.linkedin.com/in/mike-goldberg/" isExternal>
            <AiFillLinkedin size={"26"} />
          </Link>
        </Tooltip>
        <Tooltip label="Github Code">
          <Link href="https://github.com/mikegoldberg/portfolio" isExternal>
            <AiFillGithub size={"26"} />
          </Link>
        </Tooltip>
      </HStack>
      <Box paddingTop={["10px", "10px", "10px", "40px", "40px"]}>
        <VStack gap="5px">
          <NavLink label={"Resume"} to={"/"} onNavClicked={onNavClicked} />
          <NavLink
            label={"Code Examples"}
            to={"/code-examples"}
            onNavClicked={onNavClicked}
          />
        </VStack>
      </Box>
    </VStack>
  );
};

export default NavMenu;
