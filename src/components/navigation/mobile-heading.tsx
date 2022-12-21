import { Button, Text, Flex } from "@chakra-ui/react";
import { MdDehaze } from "react-icons/md";
import { MobileHeadingProps } from "./types";

const MobileHeading = ({ onOpen }: MobileHeadingProps) => {
  return (
    <Flex
      position="fixed"
      background="brand.blue"
      padding="10px"
      width="100%"
      direction={"row"}
      alignItems="center"
      gap="10px"
      zIndex={50}
    >
      <Button
        onClick={onOpen}
        color="#fff"
        fontSize="2xl"
        padding="0"
        background="transparent"
        _hover={{
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <MdDehaze />
      </Button>
      <Text fontWeight={"700"} color="#fff">
        {"Mike Goldberg"}
      </Text>
    </Flex>
  );
};

export default MobileHeading;
