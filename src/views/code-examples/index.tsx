import { createElement, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Heading,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { CodeExampleItem } from "../../components";
import demoComponents from "./demo-components";

const CodeExamples = () => {
  const [demoTitle, setDemoTitle] = useState<null | string>(null);
  const summaryTextColor = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.700"
  );
  const { view = null } =
    demoComponents.find(({ title }) => title === demoTitle) || {};

  return (
    <Box
      padding={[
        "100px 30px",
        "100px 30px",
        "100px 60px",
        "80px 90px",
        "80px 90px",
      ]}
    >
      {view ? (
        <Modal
          isOpen={view !== null}
          onClose={() => setDemoTitle(null)}
          size={["full", "full", "3xl"]}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{demoTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{createElement(view)}</ModalBody>
          </ModalContent>
        </Modal>
      ) : null}
      <Heading as={"h2"}>{"Code Examples"}</Heading>
      <Text margin="20px 0 60px" color={summaryTextColor}>
        {
          "Collection of demos using React, data sources, and libraries. Source code is on Github."
        }
      </Text>
      <Grid
        margin="30px 0 60px"
        width="100%"
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
        gap="40px"
      >
        {demoComponents.map(({ title, poster, source }, idx) => (
          <CodeExampleItem
            key={idx}
            title={title}
            poster={poster}
            onClick={() => setDemoTitle(title)}
            source={source}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default CodeExamples;
