import {
  Box,
  Text,
  Flex,
  GridItem,
  AspectRatio,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { CodeExampleItemProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const CodeExampleItem = ({
  title,
  poster,
  source,
  onClick,
}: CodeExampleItemProps) => {
  return (
    <GridItem cursor="pointer">
      <Flex direction={"column"} gap="10px" alignItems={"flex-start"}>
        <LinkBox width="100%">
          <AspectRatio
            border="1px solid rgba(255, 255, 255, 0.4)"
            width="100%"
            ratio={1.33}
            marginBottom="10px"
            backgroundImage={poster}
            backgroundSize="contain"
            data-testid={TEST_DRIVERS.POSTER}
          >
            <Box height="100%" width="100%"></Box>
          </AspectRatio>
          <LinkOverlay
            href="#"
            onClick={onClick}
            data-testid={TEST_DRIVERS.ONCLICK}
          >
            <Text
              fontWeight="700"
              fontSize="xl"
              data-testid={TEST_DRIVERS.TITLE}
            >
              {title}
            </Text>
          </LinkOverlay>
        </LinkBox>
        <Link
          isExternal={true}
          color="brand.blue"
          fontSize="lg"
          href={source}
          data-testid={TEST_DRIVERS.SOURCE}
        >
          <Flex gap="5px" alignItems={"center"}>
            <Text>{"Source"}</Text>
            <TbExternalLink />
          </Flex>
        </Link>
      </Flex>
    </GridItem>
  );
};

export default CodeExampleItem;
